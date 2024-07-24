function showCaseHistory() {
    const history = document.getElementById("history");

    history.innerHTML = "";
    fetch("caseSearch", {
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
                    <p>Δεν βρέθηκαν δηλώσεις</p>
                  </div></div>`;
            } else {
                data.forEach((item, index) => {
                    let localDate = new Date(item.date);
                    if (index >= 0) {
                        history.innerHTML +=
                            `<div class="boxforgenericreasons box">
                  <div class="panel-body">
                    <p>Δηλώθηκες ως κρούσμα στις ${localDate.toLocaleString()}</p>
                  </div>
                </div>`;
                    }
                });
            }
        });
}