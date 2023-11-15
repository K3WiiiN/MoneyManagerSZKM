function login(){

    let email = document.querySelector('#emailField');
    let passwd = document.querySelector('#passwdField');
 
     if (email.value == "" || passwd.value == ""){
         showMessage('Nem adtál meg minden adatot!'); 
     }
     else
     {
         let user = {
             email: email.value,
             passwd: passwd.value
         };
 
         axios.post(`${serverUrl}/logincheck`, user).then(res => {
             if (res.data.length == 0){
                 showMessage('Hibás belépési adatok!'); 
             }
             else
             {
                 sessionStorage.setItem('MoneyManagerUser', JSON.stringify(res.data[0]));
                 document.location.href = 'index.html';
             }
         });
     }
 }
 
 function logout(){
     sessionStorage.removeItem('MoneyManagerUser');
     document.location.href = 'index.html';
 }