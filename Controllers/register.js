function register(){
    let name = document.querySelector('#nameField');
    let email = document.querySelector('#emailField');
    let passwd = document.querySelector('#passwdField');
    let confirm = document.querySelector('#confirmField');
 
    if (name.value == "" || email.value == "" || passwd.value == "" || confirm.value == ""){
        showMessage('Nem adtál meg minden adatot!');    }
    else
    {
        if (passwd.value != confirm.value){
            showMessage('A megadott jelszavak nem egyeznek meg!'); 
        }
        else
        {
            axios.get(`${serverUrl}/users/email/eq/${email.value}`).then(res =>{
                if (res.data.length > 0){
                    showMessage('A megadott e-mail cím már regisztrálva van!'); 
                }
                else
                {
                    let newUser = {
                        name: name.value,
                        email: email.value,
                        passwd: passwd.value
                    }
                    axios.post(`${serverUrl}/users`, newUser).then(res =>{
                        alert('Sikeres regisztráció! Most már beléphetsz!');
                        document.location.href = 'index.html';
                    });
                }
            });
           
        }
    }
}

