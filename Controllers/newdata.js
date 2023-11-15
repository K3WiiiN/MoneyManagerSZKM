

function addStepData(){
    let date = document.querySelector('#dateField');
    let steps = document.querySelector('#stepField');

    if (date.value == "" || steps.value == "" || steps.value == 0){
        showMessage('Nem adtál meg minden adatot!'); 
    }
    else
    {
        axios.get(`${serverUrl}/steps/userID/eq/${loggedUser.ID}`).then(res =>{
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

                axios.patch(`${serverUrl}/steps/ID/eq/${updID}`, updData).then(()=>{

                    alert('A lépésszám adatok módosultak!');
                });
                
            }
            else
            {
                let newData = {
                    userID: loggedUser.ID, 	
                    date: date.value, 	
                    steps: steps.value 	
                }
            
                axios.post(`${serverUrl}/steps`, newData).then(()=>{
                    alert('A lépésszám adatok felvéve!');
                });
            }

            steps.value = "";
            date.value = "";
        });
    }

   
}

function setMaxDate(){
    let date = document.querySelector('#dateField');
    date.max =  new Date().toISOString().split("T")[0];
}

setTimeout(()=>{setMaxDate();
}, 500);
