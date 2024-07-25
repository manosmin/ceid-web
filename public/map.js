var blueMarker = L.AwesomeMarkers.icon({
    icon: "home",
    markerColor: "lightgray",
});
var redMarker = L.AwesomeMarkers.icon({
    icon: "star",
    markerColor: "darkpurple",
});
var greenMarker = L.AwesomeMarkers.icon({
    icon: "star",
    markerColor: "pink",
});
var orangeMarker = L.AwesomeMarkers.icon({
    icon: "star",
    markerColor: "purple",
});

const d = new Date();
const fixWeek = [6, 0, 1, 2, 3, 4, 5];
const fixTime = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23, 0, 1,
];

const myMap = L.map("map");

const tileUrl =
    'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png';
const attribution =
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';
const tiles = L.tileLayer(tileUrl, {
    attribution
});

tiles.addTo(myMap);
const myLayer = L.layerGroup().addTo(myMap);
const circlesLayer = L.layerGroup().addTo(myMap);
L.control
    .locate({
        initialZoomLevel: 13.5,
        position: "bottomleft",
        drawMarker: false,
        drawCircle: true,
    })
    .addTo(myMap);

/*
if (!navigator.geolocation) {
    console.log("geolocation is not supported");
} else {
    console.log("geolocation is supported");
    navigator.geolocation.getCurrentPosition((position) => {
        const data = {
            lat: position.coords.latitude,
            long: position.coords.longitude,
        };
        const marker = L.marker([data.lat, data.long], {
                icon: blueMarker
            })
            .bindPopup("<b> Η τοποθεσία μου", { maxWidth: 200 })
            .addTo(myMap);
        L.circle([data.lat, data.long], 20).addTo(myMap);
        const myMapBounds = myMap.getBounds();
    });
}
*/

const fake = {
    lat: 38.250021,
    lng: 21.737892,
};

const marker = L.marker([fake.lat, fake.lng], {
        icon: blueMarker
    })
    .bindPopup(`<div class="signnew"><b> Η τοποθεσία μου</div>`, {
        maxWidth: 200
    })
    .addTo(myMap);
L.circle([fake.lat, fake.lng], 20).setStyle({
    fillColor: 'gray',
    color: 'gray'
}).addTo(myMap);
myMap.setView([fake.lat, fake.lng], 15);

function submitData() {
    const userQuery = document.getElementById("search-box");
    const searchResults = document.getElementById("searchResults");

    let match = userQuery.value.match(/\s*/);
    if (match[0] === userQuery.value) {
        searchResults.innerHTML = "";
        return;
    }

    fetch("getPOIS", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                payload: userQuery.value
            })
        })
        .then((res) => res.json())
        .then((data) => {
            const payload = data.payload;
            searchResults.innerHTML = "";

            payload.forEach((item, index) => {
                const POIdata = {
                    id: item.id,
                    name: item.name,
                    address: item.address,
                    lat: item.coordinates.lat,
                    lng: item.coordinates.lng,
                    cur: item.current_popularity,
                    day: item.populartimes[fixWeek[d.getDay()]].name,
                    popnow: item.populartimes[fixWeek[d.getDay()]].data[fixTime[d.getHours()]],
                    pop1hr: item.populartimes[fixWeek[d.getDay()]].data[fixTime[d.getHours() + 1]],
                    pop2hr: item.populartimes[fixWeek[d.getDay()]].data[fixTime[d.getHours() + 2]]
                };

                if (isWithinMapBounds(POIdata.lat, POIdata.lng)) {
                    if (index >= 0) {
                        searchResults.innerHTML += "<hr>";
                        searchResults.innerHTML += `<button type="button" class="btn btn-link" onclick="focusOnMarker(${item.coordinates.lat}, ${item.coordinates.lng})"><span style="font-family: 'Ubuntu', sans-serif; color: #4c27b0; font-weight: bold;">${item.name}</span></button>`;
                    }

                    const distance = calculateDistance(POIdata.lat, POIdata.lng, fake.lat, fake.lng);
                    const averagePop3hr = (POIdata.popnow + POIdata.pop1hr + POIdata.pop2hr) / 3;
                    const popupContent = createPopupContent(POIdata, averagePop3hr, distance);
                    const markerIcon = getMarkerIcon(averagePop3hr);

                    L.marker([POIdata.lat, POIdata.lng], {
                            icon: markerIcon
                        })
                        .bindPopup(popupContent, {
                            maxWidth: 200
                        })
                        .addTo(myLayer)
                        .on('click', () => {
                            circlesLayer.clearLayers();
                            L.circle([POIdata.lat, POIdata.lng], 20).setStyle({
                                fillColor: 'pink',
                                color: 'purple'
                            }).addTo(circlesLayer);
                        })
                        .on('popupopen', () => {
                            let elem = document.getElementById(`insertbut_${POIdata.id}`);
                            elem.disabled = !(distance <= 20);
                        });


                }
            });
        });
}

function isWithinMapBounds(lat, lng) {
    const bounds = myMap.getBounds();
    return lat <= bounds._northEast.lat && lat >= bounds._southWest.lat && lng <= bounds._northEast.lng && lng >= bounds._southWest.lng;
}

function calculateDistance(lat1, lng1, lat2, lng2) {
    const latlng1 = L.latLng([lat1, lng1]);
    const latlng2 = L.latLng([lat2, lng2]);
    return latlng1.distanceTo(latlng2);
}

function createPopupContent(POIdata, averagePop3hr) {
    const visitText = POIdata.cur == null ?
        `<span style="color: red">Δεν υπάρχουν δεδομένα</span>` :
        `<span>${POIdata.cur} επισκέπτες τώρα</span>`;

    const popupContent2 = `
        <div class="signnew"><b>Τοποθεσία: </b>${POIdata.name} - ${POIdata.address}
        <br><b>Επισκεψιμότητα: </b>${averagePop3hr.toFixed(1)}%
        <br>${visitText}
        <button id="insertbut_${POIdata.id}" style="padding: 3px; margin-top: 5px; background: linear-gradient(to right, #4c27b0, #6840fb); border-radius: 15px;" class="btn btn-primary btn-block btn-sm" data-toggle="collapse" data-target="#demo_${POIdata.id}" disabled>Βρίσκομαι εδώ</button><div class="signnew">`;

    return `
        ${popupContent2}
        <div id="demo_${POIdata.id}" class="signnew collapse">
            <form action="/visit" method="POST" onsubmit="return confirm('Είστε σίγουροι ότι θέλετε να καταχωρήσετε την επίσκεψη;');">
                <button style="padding: 3px; margin-top: 5px; background: linear-gradient(to right, #4c27b0, #6840fb); border-radius: 15px;" class="btn btn-primary btn-block btn-sm" type="button" data-toggle="collapse" data-target="#demo2_${POIdata.id}"/>Εκτίμηση επισκεπτών</button>
                <div id="demo2_${POIdata.id}" class="collapse">
                    <input placeholder="Εισάγετε αριθμό" style="height: 30px; margin-top: 5px; border-radius: 15px; font-size: 12px" class="form-control" type="number" min="1" name="ppl" id="ppl" />
                    <input class="form-control" type="hidden" name="poiname" id="poiname" value="${POIdata.name}" />
                    <input class="form-control" type="hidden" name="poiid" id="poiid" value="${POIdata.id}" />
                </div>
                <input style="padding: 3px; margin-top: 5px; background: linear-gradient(to right, #4c27b0, #6840fb); border-radius: 15px;" class="btn btn-primary btn-block btn-sm" type="submit" name="submit" id="submit" value="Καταχώρηση"/><br/>
            </form>
        </div>`;
}

function getMarkerIcon(averagePop3hr) {
    if (averagePop3hr <= 32) {
        return greenMarker;
    } else if (averagePop3hr <= 65) {
        return orangeMarker;
    } else {
        return redMarker;
    }
}


function clearMap() {
    myLayer.clearLayers();
    circlesLayer.clearLayers();
    return;
}

function focusOnMarker(x, y) {
    myMap.closePopup();
    circlesLayer.clearLayers();
    myMap.setView([x, y], 18);
    L.circle([x, y], 20).setStyle({
        fillColor: 'pink',
        color: 'purple'
    }).addTo(circlesLayer);
    return;
}