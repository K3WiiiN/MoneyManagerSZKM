

function addStepData(){
    let date = document.querySelector('#dateField');
    let tipus = document.querySelector('#tipus');
    let osszeg = document.querySelector('#osszeg');
    let tag = document.querySelector('#tag');

    if (date.value == "" || osszeg.value == "" || osszeg.value == 0 || tipus.value == "" || tag.value == "" ){
        showMessage('Nem adtál meg minden adatot!'); 
    }
    else
    {
        axios.get(`${serverUrl}/items/userID/eq/${loggedUser.ID}`).then(res =>{
            let upd = false;
            let updID = -1;
     
            res.data.forEach(item => {
                if (item.date.toString().split("T")[0] === date.value.toString()){
                    upd = true;
                    updID = item.ID;
                    return;
                }
            });
          
            if (upd){

                let updData = {
                    amount: osszeg.value,	
                }

                axios.patch(`${serverUrl}/items/ID/eq/${updID}`, updData).then(()=>{

                    alert('A bevétel/kiadás adatok módosultak!');
                });
                
            }
            else
            {   
             

                let newData = {
                    userID: loggedUser.ID, 	
                    date: date.value, 	
                    amount: osszeg.value,
                    type: tipus.value,
                    tag: tag.value,
                }
            
                axios.post(`${serverUrl}/items`, newData).then(()=>{
                    alert('A bevétel/kiadás adatok felvéve!');
                });
            }

            osszeg.value = "";
            date.value = "";
            tipus.value = "";
            tag.value = "";
        });
    }

   
}

function setMaxDate(){
    let date = document.querySelector('#dateField');
    date.max =  new Date().toISOString().split("T")[0];
}

setTimeout(()=>{setMaxDate();
}, 500);
