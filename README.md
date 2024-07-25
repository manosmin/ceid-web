
# Web Programming & Systems Project @CEID

A website created to help users track and manage their potential exposure to virus carriers by crowd-sourcing data about their visits to various places in [Patras, Greece](https://en.wikipedia.org/wiki/Patras).

* Users can create a new account, or log in as any `UserX` entering `userXpass` as password and as `admin` entering `admin` as password. 

* The map view page consists of a map and a search box, where users can search for places by typing their type (e.g. `car_rental`, `food`, `store`, `establishment`) or can show all the available points on the map by typing `POI` in search box. The markers have 3 different colors (pink, purple and dark purple) based on the `current_popularity` percentage. Users can only register a visit at places less than 20 meters far from their location and can optionally enter an estimate of visitors. 

* Users can also register themselves as cases at a chosen date, but they can't register a case unless 14 days have passed since the previous. When a case is found, other users are able to see if they had visited the same place within +-2 hours with that user, for the past 7 days. 

* Finally, users can edit their username and password, show their cases and visits history, while admin has the ability to upload/delete data from the database, simulate data and view various charts based on users statistics.


 *It's strongly advised to upload sample data from `virus_contact_tracing_app` folder, or upload `.json` data from `json` folder manually and run the simulation, by logging in as admin.*



## Acknowledgements

This project was made in collaboration with two of my fellow students, in order to fulfill the requirements of Web Programming & Systems course during the 4th year of our studies.


## Features

- User authentication, login and register page (implemented with [Passport.js](https://www.passportjs.org/))
- Users can check-in at various points on the map of Patras, Greece (implemented with [Leaflet.js](https://leafletjs.com/))
- Users can update their health status in order to notify other users about a potential exposure
- Users can track their potential exposure to other users, which are declared as virus carriers
- Admin can upload/delete data and see various statistics on users (implemented with [Chart.js](https://www.chartjs.org/))

## Tech Stack

**Front End:** Javascript, HTML, CSS, Bootstrap.js

**Back End:** Node.js, Express.js, MongoDB

## Deployment

To run the server type

```bash
  node app.js
```

To import sample data download [mongotools](https://fastdl.mongodb.org/tools/db/mongodb-database-tools-windows-x86_64-100.8.0.zip) and run at `virus_contact_tracing_app` folder

```bash
  mongorestore pois.bson
```
```bash
  mongorestore users.bson
```
```bash
  mongorestore visits.bson
```
```bash
  mongorestore cases.bson
```

## Database Schema

![Schema Diagram](https://github.com/manosmin/ceid-web/blob/master/screenshots/schema.png)

## Screenshots
**Register Page**
![Register Page](https://github.com/manosmin/ceid-web/blob/master/screenshots/ss5.png)


**Map View Page**
![Map View Page](https://github.com/manosmin/ceid-web/blob/master/screenshots/ss3.png)


**Location Check-In**
![Location Check-In](https://github.com/manosmin/ceid-web/blob/master/screenshots/ss2.png)


**Health Status Update Page**
![Health Status Update Page](https://github.com/manosmin/ceid-web/blob/master/screenshots/ss1.png)


**Contact Tracing Page**
![Contact Tracing Page](https://github.com/manosmin/ceid-web/blob/master/screenshots/ss4.png)


**History Page**
![History Page](https://github.com/manosmin/ceid-web/blob/master/screenshots/ss6.png)

**Admin Charts Page**
![Admin Charts Page](https://github.com/manosmin/ceid-web/blob/master/screenshots/ss7.png)

