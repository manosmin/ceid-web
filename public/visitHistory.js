function showVisitHistory() {
    const history = document.getElementById("history");

    history.innerHTML = "";
    fetch("visitSearch", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({}),
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data.length)
            if (data.length == 0) {
                history.innerHTML += `<div class="box boxforgenericreasons"><div class="panel-body">
                  <p>Δεν βρέθηκαν επισκέψεις</p>
                </div></div>`;
            } else {
                data.forEach((item, index) => {
                    let localDate = new Date(item.timestamp);
                    if (index >= 0) {
                        history.innerHTML +=
                            `<div class="box boxforgenericreasons"> 
                <div class="panel-body">
                  <p>Δήλωσες επίσκεψη στην τοποθεσία ${item.name} στις ${localDate.toLocaleString()} με ${item.people_estimate} επισκέπτες</p>
                </div>
              </div>`;
                    }
                });
            }
        });
}