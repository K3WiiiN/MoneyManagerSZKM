function getBarChart() {
    let labels = [];
    let datas = [];

  axios.get(`${serverUrl}/items/userID/eq/${loggedUser.ID}`).then((res) => {
    res.data.sort((a,b) => a.date.localeCompare(b.date));
    res.data.forEach((item) => {
      labels.push(item.date.toString().split("T")[0]);
      datas.push(item.amount);
    });

   
  });

  setTimeout(() => {
    const ctx = document.getElementById("myBarChart");

    new Chart(ctx, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Összeg:",
            data: datas,
            borderWidth: 3,
            backgroundColor: "rgb(61, 133, 161)",
            borderColor:"rgb(61, 133, 161)",
          },
        ],
      },
    
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }, 500);

}
