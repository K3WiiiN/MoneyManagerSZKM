function getCalendar() {
  let events = [];
 
  axios.get(`${serverUrl}/items/userID/eq/${loggedUser.ID}`).then(res=>{
    res.data.forEach(item => {
      if (item.type == "Kiadás")
      {
        events.push(
          {
            title: item.amount,
            start: item.date,
            backgroundColor: "red",
           
          }
        );
        return;
      }
     
      events.push(
        {
          title: item.amount,
          start: item.date,
          backgroundColor: "green",
         
        }
      );
      });
 
     
  });
 
  setTimeout(() => {
    var calendarEl = document.getElementById("calendar");
   
    var calendar = new FullCalendar.Calendar(calendarEl, {
      headerToolbar: {
        left: "prevYear,prev,next,nextYear today",
        center: "title",
        right: "dayGridMonth,dayGridWeek,dayGridDay",
      },
      initialDate: new Date(),
      navLinks: true, // can click day/week names to navigate views
      editable: false,
      dayMaxEvents: true, // allow "more" link when too many events
      events: events,
      displayEventTime: false
    });
 
    calendar.render();
  }, 500);
}