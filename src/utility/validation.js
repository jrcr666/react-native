const validate = (val, rules = {}, connectedValue = '') => {
    let isValid = true;
    for (let rule in rules) {
   		switch (rule){
        case 'isEmail':
          isValid = isValid && emailvalidator(val);
        break;
        case 'isRequired':
          isValid = isValid && val.trim() !== '';
   			break;
   			case 'minLength':
   				isValid = isValid && val.length >= rules[rule];
   			break;
   			case 'equalTo':
   				isValid = isValid && val === connectedValue;
   			break;
   		}
    }
    return isValid;
}

const emailvalidator = val => /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
.test(val);

export default validate;