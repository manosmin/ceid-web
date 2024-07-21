
# Web Programming & Systems Project @CEID

A web application created to help users track and manage their potential exposure to virus carriers by crowd-sourcing data about their visits to various places.




## Features

- User authentication
- Location check-in
- Health status updates
- Contact tracing

## Tech Stack

**Front End:** Javascript, HTML, CSS, Bootstrap.js, Leaflet.js

**Back End:** Node.js, Express.js, Passport.js, MongoDB



## Deployment

To run this project run

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

You can show all the available markers by typing "POI" in search box.


## Screenshots
**Sign Up Page**
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

