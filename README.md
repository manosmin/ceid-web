
# Web Programming & Systems Project @CEID

A web application created to help users track and manage their potential exposure to virus carriers by crowd-sourcing data about their visits to various places. 


## Acknowledgements

This project was made in collaboration with two of my fellow students, to fulfill the requirements of Web Programming & Systems course during the 4th year of my studies.


## Features

- User authentication, login and register page (implemented with [Passport.js](https://www.passportjs.org/))
- Users can check-in at various points on the map of Patras, Greece (implemented with [Leaflet.js](https://leafletjs.com/))
- Users can update their health status in order to notify other users about a potential exposure
- Users can track their potential exposure to other users declared as virus carriers

## Tech Stack

**Front End:** Javascript, HTML, CSS, Bootstrap.js, Leaflet.js

**Back End:** Node.js, Express.js, MongoDB



## Deployment

To deploy this project run

```bash
  node app.js
```

To import sample data download [mongotools](https://fastdl.mongodb.org/tools/db/mongodb-database-tools-windows-x86_64-100.8.0.zip) and run at auth_demo_app folder

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

Then, you can log-in as any user "X" entering `userXpass` as password, or as admin entering `admin` as password.

You can show all the available points on the map, by typing `POI` in search box.


## Screenshots
**Register Page**
![App Screenshot](https://github.com/manosmin/ceid-web/blob/master/screenshots/ss5.png)


**Map View Page**
![App Screenshot](https://github.com/manosmin/ceid-web/blob/master/screenshots/ss3.png)


**Location Check-In**
![App Screenshot](https://github.com/manosmin/ceid-web/blob/master/screenshots/ss2.png)


**Health Status Update Page**
![App Screenshot](https://github.com/manosmin/ceid-web/blob/master/screenshots/ss1.png)


**Contact Tracing Page**
![App Screenshot](https://github.com/manosmin/ceid-web/blob/master/screenshots/ss4.png)


**History Page**
![App Screenshot](https://github.com/manosmin/ceid-web/blob/master/screenshots/ss6.png)

