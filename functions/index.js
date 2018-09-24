const functions = require('firebase-functions');
const cors = require('cors')({ origin: true });
const fs = require('fs');
const UUID = require('uuid-v4');
const os = require("os");
const path = require("path");

const gcconfig = {
    projectId: 'rn-course-1537651935516',
    keyFilename: 'awesome-places.json'
}

const gcs = require('@google-cloud/storage')(gcconfig);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.storeImage = functions.https.onRequest((request, response) => {
    cors(request, response, () => {
        const body = JSON.parse(request.body);
        fs.writeFileSync(path.join(os.tmpdir(), "uploaded-image.jpg"), body.image, "base64", err => {
            console.log(err);
            return response.status(500).json({ error: err });
        });
        const bucket = gcs.bucket('rn-course-1537651935516.appspot.com');
        const uuid = UUID();

        return bucket.upload(
            "/tmp/uploaded-image.jpg", {
                uploadType: "media",
                destination: "/places/" + uuid + ".jpg",
                metadata: {
                    metadata: {
                        contentType: "image/jpeg",
                        firebaseStorageDownloadTokens: uuid
                    }
                }
            },
            (err, file) => {
                if (!err) {
                    return response.status(201).json({
                        imageUrl: "https://firebasestorage.googleapis.com/v0/b/" +
                            bucket.name +
                            "/o/" +
                            encodeURIComponent(file.name) +
                            "?alt=media&token=" +
                            uuid
                    });
                } else {
                    console.log(err);
                    return response.status(500).json({ error: err });
                }
            }
        );
    });
});