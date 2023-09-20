
# Web Programming & Systems Project @CEID

A web application created to help users track and manage their potential exposure to virus carriers by crowd-sourcing data about their visits to various places.




## Features

- User authentication
- Location check-in
- Health status updates
- Contact tracing

## Tech Stack

**Front End:** Javascript, HTML, CSS3, Bootstrap, jQuery

**Back End:** Node, Express, MongoDB



## Deployment

To deploy this project run

```bash
  node app.js
```

To import sample data download [mongotools](https://fastdl.mongodb.org/tools/db/mongodb-database-tools-windows-x86_64-100.8.0.zip) and run at auth_demo_app folder

```bash
  mongorestore pois.bson
  mongorestore users.bson
  mongorestore visits.bson
  mongorestore cases.bson
```

Then, you can log-in as any user "X" using the following credentials </br>
`Username: UserX`</br>
`Password: userXpass` </br>
or as admin </br>
`Username: admin`</br>
`Password: admin`


## Screenshots
*User Authentication*
![App Screenshot](https://github.com/manosmin/ceid-web/blob/master/screenshots/ss5.png)
*Map View*
![App Screenshot](https://github.com/manosmin/ceid-web/blob/master/screenshots/ss3.png)
*Location Check-In*
![App Screenshot](https://github.com/manosmin/ceid-web/blob/master/screenshots/ss2.png)
*Health Status Updates*
![App Screenshot](https://github.com/manosmin/ceid-web/blob/master/screenshots/ss1.png)
*Contact Tracing*
![App Screenshot](https://github.com/manosmin/ceid-web/blob/master/screenshots/ss4.png)

