 function createCharts() {
     const visitResults = document.getElementById("charts");

     fetch("chartVisit", {
             method: "POST",
             headers: {
                 "Content-Type": "application/json"
             },
             body: JSON.stringify({}),
         })
         .then((res) => res.json())
         .then((data) => {
             let countVisit = 0;
             data.forEach((item, index) => {
                 countVisit++;
             });
             const casesResults = document.getElementById("charts");
             fetch("chartCases", {
                     method: "POST",
                     headers: {
                         "Content-Type": "application/json"
                     },
                     body: JSON.stringify({}),
                 })
                 .then((res) => res.json())
                 .then((data) => {
                     let countCases = 0;
                     data.forEach((item, index) => {
                         countCases++;
                     });
                     const resulto = document.getElementById("charts");
                     fetch("chartActiveCases", {
                             method: "POST",
                             headers: {
                                 "Content-Type": "application/json"
                             },
                             body: JSON.stringify({}),
                         })
                         .then((res) => res.json())
                         .then((data) => {
                             let counter = 0;
                             data.forEach((item, index) => {
                                 const d = new Date(item.date);

                                 const d2 = new Date(item.mergerman.timestamp);

                                 const time = Math.abs(d2 - d) / (1000 * 60 * 60 * 24);
                                 console.log(time)
                                 const a = time <= 7;
                                 const b = time <= 14;
                                 if (d.getTime() > d2.getTime()) {
                                     if (a) {
                                         console.log("less than 7 days before");
                                         counter++;
                                     } else console.log("more than 7 days before");
                                 } else {
                                     if (b) {
                                         console.log("less than 14 days after");
                                         counter++;
                                     } else {
                                         console.log("more than 14 days after");
                                     }
                                 }
                             });
                             const ctx = document.getElementById("myChart").getContext("2d");
                             const myChart = new Chart(ctx, {
                                 type: "bar",
                                 data: {
                                     labels: ["Επισκέψεις", "Κρούσματα", "Ενεργά Κρούσματα"],
                                     datasets: [{
                                         label: "# επισκέψεων", 
                                         data: [countVisit, countCases, counter],
                                         backgroundColor: [
                                             "rgba(255, 99, 132, 0.2)",
                                             "rgba(54, 162, 235, 0.2)",
                                             "rgba(255, 206, 86, 0.2)",
                                             "rgba(75, 192, 192, 0.2)",
                                             "rgba(153, 102, 255, 0.2)",
                                             "rgba(255, 159, 64, 0.2)",
                                         ],
                                         borderColor: [
                                             "rgba(255, 99, 132, 1)",
                                             "rgba(54, 162, 235, 1)",
                                             "rgba(255, 206, 86, 1)",
                                             "rgba(75, 192, 192, 1)",
                                             "rgba(153, 102, 255, 1)",
                                             "rgba(255, 159, 64, 1)",
                                         ],
                                         borderWidth: 1,
                                     }, ],
                                 },
                                 options: {
                                     scales: {
                                         y: {
                                             beginAtZero: true,
                                         },
                                     },
                                 },
                             });
                         });
                 });
         });
 }