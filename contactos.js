let genderValue = male.checked ? "Male" : "Female"

function getGender() {
    return document.querySelector('input[name="gender"]:checked')
}
document.addEventListener("DOMContentLoaded", function() {
    fields.firstName = document.getElementById('Name');
    fields.lastName = document.getElementById('lastName');
    fields.email = document.getElementById('email');
    fields.country = document.getElementById('Country');
    fields.password = document.getElementById('password');
    fields.passwordCheck = document.getElementById('passwordCheck');
    fields.newsletter = document.getElementById('newsletter');
    fields.question = document.getElementById('question');
})

function isNotEmpty(value) {
    if (value == null || typeof value == 'undefined') return false;
    return (value.length > 0);
}

function isNumber(num) {
    return (num.length > 0) && !isNaN(num);
}

function isEmail(email) {
    let regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return regex.test(String(email).toLowerCase());
}

function isPasswordValid(password) {
    if (password.length > 5) {
        return true;
    }
    return false
}

function fieldValidation(field, validationFunction) {
    if (field == null) return false;

    let isFieldValid = validationFunction(field.value)
    if (!isFieldValid) {
        field.className = 'placeholderRed';
    } else {
        field.className = '';
    }

    return isFieldValid;

    function isValid() {
        var valid = true;

        valid &= fieldValidation(fields.firstName, isNotEmpty);
        valid &= fieldValidation(fields.lastName, isNotEmpty);
        valid &= fieldValidation(fields.gender, isNotEmpty);
        valid &= fieldValidation(fields.country, isNotEmpty);
        valid &= fieldValidation(fields.email, isEmail);
        valid &= fieldValidation(fields.password, isPasswordValid);
        valid &= fieldValidation(fields.passwordCheck, isPasswordValid);
        valid &= fieldValidation(fields.question, isNotEmpty);
        valid &= arePasswordsEqual();

        return valid;
    }

    function arePasswordsEqual() {
        if (fields.password.value == fields.passwordCheck.value) {
            field.password.className = 'placeholderRed';
            field.passwordCheck.className = 'placeholderRed';
            return true;
        }
        return false
    }

    function sendContact() {
        fields.gender = getGender();
        if (isValid()) {
            let usr = new User(firstName.value, lastName.value, fields.gender.value, country.value, email.value, newsletter.checked);
            alert(`${usr.firstName} Gracias por registrarse.`)
        } else {
            alert("Hubo un error")
        }
    }
}