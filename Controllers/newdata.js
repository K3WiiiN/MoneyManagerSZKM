

function addStepData(){
    let date = document.querySelector('#dateField');
    let bevetel = document.querySelector('#osszegbevetel');
    let kiadas = document.querySelector('#osszegkiadas');
    let valasszon = document.querySelector('#valasszon');
    let ruhazat =document.querySelector('#ruhazat');
    let elelmiszer = document.querySelector('#elelmiszer');
    let szolgaltatas = document.querySelector('#szolgaltatas');

    if (date.value == "" || bevetel.value == "" || bevetel.value == 0 ){
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
                    steps: steps.value 	
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
                    amount: bevetel.value,
                    amount: kiadas.value,
                    type: ruhazat.value,
                    type: elelmiszer.value,
                    type: szolgaltatas.value,	
                }
            
                axios.post(`${serverUrl}/items`, newData).then(()=>{
                    alert('A bevétel/kiadás adatok felvéve!');
                });
            }

            amount.value = "";
            date.value = "";
            type.value = "";
        });
    }

   
}

function setMaxDate(){
    let date = document.querySelector('#dateField');
    date.max =  new Date().toISOString().split("T")[0];
}

setTimeout(()=>{setMaxDate();
}, 500);
