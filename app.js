var express = require("express"),
  mongoose = require("mongoose"),
  passport = require("passport"),
  bodyParser = require("body-parser"),
  LocalStrategy = require("passport-local"),
  User = require("./models/user"),
  POI = require("./models/POI"),
  Case = require("./models/case"),
  Visit = require("./models/visit");


mongoose.connect("mongodb://localhost/virus_contact_tracing_app", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
var db = mongoose.connection;
db.on("error", console.log.bind(console, "connection error"));
db.once("open", function (callback) {
  console.log("connection succeeded");
});

var app = express();
app.use(express.json(), express.static(__dirname + "/public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  require("express-session")({
    secret: "Rusty is a dog",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Handling admin signup
User.findOne({ username: "admin" }, function (err, user) {
  if (err) {
    console.log(err);
    return;
  }
  if (user) {
    console.log("admin user already exists");
    return;
  }
  User.register(
    new User({ username: "admin", email: null, role: 2 }),
    "admin",
    function (err) {
      if (err) {
        console.log(err);
        return;
      }
      passport.authenticate("local")(null, null, function () {
        console.log("admin user registered successfully");
      });
    }
  );
});


// Showing home page
app.get("/", function (req, res) {
  res.render("login");
});

// Showing mapview page
app.get("/mapview", isLoggedIn, function (req, res) {
  res.render("mapview");
});

// Inserting visit to database
app.post("/visit", function (req, res) {
  const username = req.user.username;
  let ppl = parseInt(req.body.ppl);
  if (isNaN(ppl)) {
    ppl = null;
  }
  const timestamp = new Date();
  const poiname = req.body.poiname;
  const poiid = req.body.poiid;
  let update = {
    $set: {
      current_popularity: ppl,
    },
  };
  let element = {
    id: { $eq: poiid },
  };
  db.collection("visits")
    .insertOne({
      username: username,
      timestamp: timestamp,
      people_estimate: ppl,
      name: poiname,
      id: poiid,
    })
    .then((insertedVisit) => {
      if (insertedVisit) {
        console.log(`${username} inserted a visit at ${poiname}.`);
        db.collection("pois").findOneAndUpdate(element, update);
      } else {
        console.log("visit was not inserted.");
      }
      return insertedVisit;
    })
    .catch((err) => console.error(`failed to insert visit: ${err}`));
  res.render("mapview");
});

// Showing register form
app.get("/register", function (req, res) {
  res.render("register");
  return;
});

// Handling user signup
app.post("/register", function (req, res) {
  var username = req.body.username;
  var password = req.body.password;
  var email = req.body.email;
  User.register(
    new User({ username: username, email: email }),
    password,
    function (err, user) {
      if (err) {
        console.log(err);
        return res.render("register");
      }
      passport.authenticate("local")(req, res, function () {
        res.render("mapview");
      });
    }
  );
});


// Showing login form
app.get("/login", function (req, res) {
  res.render("login");
});

// Handling user login
app.post( "/login", passport.authenticate("local", {
    successRedirect: "/mapview",
    failureRedirect: "/login",
  }),
  function (req, res) {}
);

// Handling user logout
app.get("/logout", function (req, res) {
  req.logout();
  res.redirect("/");
});

// Handling POI search
app.post("/getPOIS", async (req, res) => {
  let payload = req.body.payload.trim();
  let search = await POI.find({
    types: { $regex: new RegExp("^" + payload + ".*", "i") },
  }).exec();
  res.send({ payload: search });
});

// Showing cases page
app.get("/cases", isLoggedIn, function (req, res) {
  res.render("cases");
});

// Inserting case to database
app.post("/cases", function (req, res) {
  const username = req.user.username;
  const date = new Date(req.body.dateInput);
  db.collection("cases")
    .find(
      { username: username },
      { projection: { _id: 0, username: 1, date: 2 } }
    )
    .sort({ date: -1 })
    .limit(1)
    .toArray(function (err, result) {
      if (err) throw err;
      if (result == 0) {
        db.collection("cases").insertOne({ username: username, date: date });
        console.log(`${username} inserted a case`);
      } else {
        var x =
          (date.getTime() - result[0].date.getTime()) / (1000 * 60 * 60 * 24);
        if (x > 14) {
          db.collection("cases").insertOne({ username: username, date: date });
          console.log(`${username} inserted a case`);
        } else {
          console.log("case already exists");
        }
      }
    });
  res.render("cases");
});

// Showing admin page
app.get("/admin", isLoggedInAsAdmin, function (req, res) {
  res.render("admin");
});

// Showing simulation page
app.get("/simulation", isLoggedInAsAdmin, function (req, res) {
  res.render("simulation");
});


// Showing user settings, update username
app.get("/settings", isLoggedIn, function (req,res) {
  res.render("settings");
  return;
  
});

// Showing user contact with covid
app.get("/contact", isLoggedIn, function (req,res) {
  res.render("contact");
  return;
  
});

// Showing user update password
app.get("/updatepassword", isLoggedIn, function (req,res) {
  res.render("updatepassword");
  return;
  
});

// Uploading json files
app.post("/adminUpload", function (req, res) {
  const json = req.body.json;
  const fs = require("fs");
  let raw = fs.readFileSync(`json/${json}`);
  let places = JSON.parse(raw);
  places.forEach((element) => {
    let update = {
      $set: {
        id: element.id,
        name: element.name,
        address: element.address,
        types: element.types,
        coordinates: element.coordinates,
        rating: element.rating,
        rating_n: element.rating_n,
        current_popularity: element.current_popularity,
        populartimes: element.populartimes,
        time_spent: element.time_spent,
        time_wait: element.time_wait,
      },
    };
    db.collection("pois")
      .updateMany(
        {
          id: { $eq: element.id },
        },
        update,
        { upsert: true, ordered: true }
      )
      .then((updatedDocument) => {
        if (updatedDocument) {
          console.log(`successfully updated document: ${element.name}.`);
        } else {
          console.log("no document matches the provided query.");
        }
        return updatedDocument;
      })
      .catch((err) =>
        console.error(`failed to find and update document: ${err}`)
      );
  });
  res.redirect("admin");
});

// Handling simulation
app.post("/simulate", function (req, res) {
  let start = new Date(req.body.start);
  let end = new Date(req.body.end);
  const n = req.body.n;
  const v = req.body.v;
  const c = req.body.c;
  // Create a number of users
  for (let i = 0; i < n; i++) {
    User.register(
      new User({ username: `User${i}`, email: null }),
      `user${i}pass`
    );
    // Insert a number of visits for each
    for (let w = 0; w < v; w++) {
      db.collection("pois")
        .aggregate([{ $sample: { size: 1 } }])
        .toArray((err, docs1) => {
          let insert = {
            username: `User${i}`,
            timestamp: new Date(
              start.getTime() +
                Math.random() * (end.getTime() - start.getTime())
            ),
            people_estimate: Math.floor(Math.random() * 15) + 1,
            name: docs1[0]["name"],
            id: docs1[0]["id"]
          };
          db.collection("visits").insertOne(insert);
        });
    }
  }
  // Insert a number of cases
  for (let z = 0; z < Math.floor((n * c) / 100); z++)
    db.collection("cases").insertOne({
      // Pick a random user
      username: `User${Math.floor(Math.random() * (n - 0) + 0)}`,
      // Pick a random date between chosen dates
      date: new Date(
        start.getTime() + Math.random() * (end.getTime() - start.getTime())
      ),
    });

    console.log("simulation completed");
    res.redirect("simulation");
});

// Erasing data
app.post("/adminDelete", function (req, res) {
  // Remove all users except admin
  User.deleteMany({ username: { $ne: "admin" } }, function (err) {
    if (err) {
      console.log("error deleting users:", err);
    } else {
      console.log("all users except admin deleted");
    }
  });

  // Drop and recreate collections
  db.collection("pois").drop(function (err) {
    if (err) {
      console.log("error dropping POIs collection:", err);
    } else {
      db.createCollection("pois", function (err) {
        if (err) {
          console.log("error creating POIs collection:", err);
        } else {
          console.log("POIs collection recreated");
        }
      });
    }
  });

  db.collection("visits").drop(function (err) {
    if (err) {
      console.log("error dropping visits collection:", err);
    } else {
      db.createCollection("visits", function (err) {
        if (err) {
          console.log("error creating visits collection:", err);
        } else {
          console.log("visits collection recreated");
        }
      });
    }
  });

  db.collection("cases").drop(function (err) {
    if (err) {
      console.log("error dropping cases collection:", err);
    } else {
      db.createCollection("cases", function (err) {
        if (err) {
          console.log("error creating cases collection:", err);
        } else {
          console.log("cases collection recreated");
        }
      });
    }
  });

  console.log("all data erased");
  res.redirect("admin");
});

// Tests if logged in as Αdmin
function isLoggedInAsAdmin(req, res, next) {
  if (req.isAuthenticated() && req.user.role == 2) {
    return next();
  }
  res.redirect("/login");
}

// Tests if logged in
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/login");
}
// Showing contact page
app.get("/contact", isLoggedIn, function (req, res) {
  res.render("contact");
});

// Showing history page
app.get("/history", isLoggedIn, function (req, res) {
  res.render("history");
});

// Showing visits page
app.get("/visits", isLoggedIn, function (req, res) {
  res.render("visits");
});

// Handling user's case search
app.post("/caseSearch", async (req, res) => {
  const user = req.user.username;
  let find = await Case.find({ username: user });
  res.send(find);
});

// Handling user's visit search
app.post("/visitSearch", async (req, res) => {
  const user = req.user.username;
  let find = await Visit.find({ username: user });
  res.send(find);
});

// Handling user's encounter with active case
app.post("/contactSearch", async (req, res) => {
  const user = req.user.username;
  let find = await Visit.aggregate([
    {
      $match: { username: user },
    },
    {
      $lookup: {
        from: "visits",
        localField: "name",
        foreignField: "name",
        as: "merge1",
      },
    },
    {
      $unwind: {
        path: "$merge1",
        preserveNullAndEmptyArrays: false,
      },
    },
    {
      $lookup: {
        from: "cases",
        localField: "merge1.username",
        foreignField: "username",
        as: "merge2",
      },
    },
    {
      $unwind: {
        path: "$merge2",
        preserveNullAndEmptyArrays: false,
      },
    },
  ]);
  res.send(find);
});

// Showing charts page
app.get("/chart", isLoggedInAsAdmin, function (req, res) {
  res.render("chart");
});

// Handling visit chart
app.post("/chartVisit", async (req, res) => {
  let x = await db
    .collection("visits")
    .find({})
    .toArray((err, result) => {
      if (err) throw err;

      res.send(result);
    });
});

// Handling case chart
app.post("/chartCases", async (req, res) => {
  let x = await db
    .collection("cases")
    .find({})
    .toArray((err, result) => {
      if (err) throw err;

      res.send(result);
    });
});

// Handling active case chart
app.post("/chartActiveCases", async (req, res) => {
  let x = await db
    .collection("cases")
    .aggregate([
      {
        $lookup: {
          from: "visits",
          localField: "username",
          foreignField: "username",
          as: "mergerman",
        },
      },
      { $unwind: "$mergerman" },
    ])
    .toArray((err, result) => {
      if (err) throw err;
      res.send(result);
    });
});

var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("server listening at port 3000");
});
