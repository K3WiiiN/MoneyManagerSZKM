function register() {
    let name = document.querySelector('#nameField');
    let email = document.querySelector('#emailField');
    let passwd = document.querySelector('#passwdField');
    let confirm = document.querySelector('#confirmField');

    if (name.value == "" || email.value == "" || passwd.value == "" || confirm.value == "") {
        showMessage('Nem adtál meg minden adatot!');
    } else {
        if (!email.value.includes("@")) {
            showMessage('Hibás e-mail cím formátum! Tartalmaznia kell "@"');
        } else if (!isValidName(name.value)) {
            showMessage('A név csak betűket tartalmazhat!');
        } else if (!isValidPassword(passwd.value)) {
            showMessage('A jelszónak tartalmaznia kell legalább egy kisbetűt, egy nagybetűt, egy számot, egy speciális karaktert, és legalább 8 karakter hosszúnak kell lennie!');
        } else if (passwd.value != confirm.value) {
            showMessage('A megadott jelszavak nem egyeznek meg!');
        } else {
            axios.get(`${serverUrl}/users/email/eq/${email.value}`).then(res => {
                if (res.data.length > 0) {
                    showMessage('A megadott e-mail cím már regisztrálva van!');
                } else {
                    let newUser = {
                        name: name.value,
                        email: email.value,
                        passwd: passwd.value
                    };
                    axios.post(`${serverUrl}/users`, newUser).then(res => {
                        alert('Sikeres regisztráció! Most már beléphetsz!');
                        document.location.href = 'index.html';
                    });
                }
            });
        }
    }
}

function isValidName(name) {
    const nameRegex = /^[a-zA-Z]+$/;
    return nameRegex.test(name);
}

function isValidPassword(password) {
    const lowercaseRegex = /[a-z]/;
    const uppercaseRegex = /[A-Z]/;
    const digitRegex = /[0-9]/;
    const specialCharRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/;

    return (
        lowercaseRegex.test(password) &&
        uppercaseRegex.test(password) &&
        digitRegex.test(password) &&
        specialCharRegex.test(password) &&
        password.length >= 8
    );
}
