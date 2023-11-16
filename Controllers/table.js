function getStepdatas(){
    axios.get(`${serverUrl}/items/userID/eq/${loggedUser.ID}`).then(res => {
        let i = 0;
        let sum = 0;
        let tbody = document.querySelector('tbody');

        res.data.forEach(data => {
            let tr = document.createElement('tr');
            let td1 = document.createElement('td');
            let td2 = document.createElement('td');
            let td3 = document.createElement('td');
            let td4 = document.createElement('td');
            let td5 = document.createElement('td');

            td5.classList.add('text-end');

            i++;
            sum += data.amount;

            td1.innerText = i+'.';
            td2.innerText = data.date.toString().split("T")[0];
            td3.innerText = data.type;
            td4.innerText = data.tag;
            td5.innerText = data.amount;
            
            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
            tr.appendChild(td4);
            tr.appendChild(td5);

            tbody.appendChild(tr);
        });

        let sumField = document.querySelector('#sumField');
        sumField.innerText = sum;
    });
}