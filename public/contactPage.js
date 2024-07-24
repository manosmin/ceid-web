function showContacts() {
    const history = document.getElementById("history");

    history.innerHTML = "";
    fetch("contactSearch", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({}),
        })
        .then((res) => res.json())
        .then((data) => {
            if (data.length == 0) {
                history.innerHTML += `<div class="boxforgenericreasons box"><div class="panel-body">
                    <p class="sign">Δεν βρέθηκαν επαφές με κρούσματα</p>
                  </div></div>`;
            } else {
                data.forEach((item, index) => {
                    x = new Date(item.timestamp);
                    y = new Date(item.merge1.timestamp);
                    z = new Date(item.merge2.date);
                    a = x.getTime();
                    b = y.getTime();
                    c = z.getTime();
                    if ((Math.abs(a - b) / (1000 * 60 * 60) <= 2) && ((c - b) / (1000 * 60 * 60 * 24) <= 7) && ((c - b) /
                            (1000 * 60 * 60 * 24) >= 0)) {
                        if (index >= 0) {
                            if (item.merge2.username != item.username) {
                                history.innerHTML +=
                                    `<div class="boxforgenericreasons box">
                  <div class="panel-heading">
                    <p class="sign">Ένα κρούσμα επισκέφθηκε την τοποθεσία ${item.name}</p>
                  </div>  
                  <div class="panel-body">
                    <p>Επισκέφθηκες στις ${x.toLocaleString()}</p>
                    <p>Το κρούσμα επισκέφθηκε στις ${y.toLocaleString()}</p>
                    <p>Η δήλωση έγινε στις ${z.toLocaleString()}</p>
                  </div>
                </div>`;
                            } else {
                                console.log("ο χρήστης είναι το κρούσμα!!!");
                            }
                        }
                    }
                });
            }
        });
}