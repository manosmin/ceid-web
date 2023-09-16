
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

To import sample data to database download mongotools and run

```bash
  mongorestore pois.bson
  mongorestore users.bson
  mongorestore visits.bson
  mongorestore cases.bson
```

You can log-in as any user using the following credentials:
```bash
  Username: User0
  Password: user0pass
  Username: admin
  Password: admin
```
## Screenshots
*Map View*
![App Screenshot](https://github.com/manosmin/ceid-web/blob/master/screenshots/ss3.png)
*Location Check-In*
![App Screenshot](https://github.com/manosmin/ceid-web/blob/master/screenshots/ss2.png)
*Health status updates*
![App Screenshot](https://github.com/manosmin/ceid-web/blob/master/screenshots/ss1.png)
*Contact Tracing*
![App Screenshot](https://github.com/manosmin/ceid-web/blob/master/screenshots/ss4.png)

