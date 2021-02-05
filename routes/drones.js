const express = require('express');

// require the Drone model here
let DroneModel = require("../models/Drone.model.js");

const router = express.Router();

router.get('/drones', (req, res, next) => {
  // Iteration #2: List the drones
  // ... your code here
  DroneModel.find()
    .then((dronesFromMongo) => {
      // please create this page in your views folder
      
      res.render(`drones/list.hbs`, { dronesFromMongo });
      
    })
    .catch(() => {
      console.log("Something went wrong while finding");
    });
    
});

router.get("/drones/create", (req, res, next) => {
  // Iteration #3: Add a new drone
  // ... your code here
  res.render(`drones/create-form.hbs`)
})

router.post("/drones/create", (req, res, next) => {
  // Iteration #3: Add a new drone
  // ... your code here

  const { myDrone, propellers, maxSpeed } = req.body;
  let myNewDrone = {
    name: myDrone,
    propellers: propellers,
    maxSpeed: maxSpeed,
  };

  DroneModel.create(myNewDrone)
    .then(() => {
      res.redirect("/drones");
    })
    .catch(() => {
      console.log("something went wrong creating");
    });
});

router.get('/drones/:id/edit', (req, res, next) => {
  // Iteration #4: Update the drone
  // ... your code here
    // grab the todo id from the url
    let id = req.params.id;

    DroneModel.findById(id)
      .then((drones) => {
        res.render("drones/update-form.hbs", { drones });
      })
      .catch(() => {
        console.log("Something went wrong while getting a drone");
      });
  });


router.post('/drones/:id/edit', (req, res, next) => {
  // Iteration #4: Update the drone
  // ... your code here
    let id = req.params.id
    const { myDrone, propellers, maxSpeed } = req.body;
    let myUpdatedDrone = {
      name: myDrone,
      propellers: propellers,
      maxSpeed: maxSpeed,
    };

    DroneModel.findByIdAndUpdate(id, myUpdatedDrone)
      .then(() => {
        res.redirect("/drones");
      })
      .catch(() => {
        console.log("something went wrong creating");
      });
  });


router.get('/drones/:id/delete', (req, res, next) => {
  // Iteration #5: Delete the drone
  // ... your code here
    let id = req.params.id
    DroneModel.findByIdAndDelete(id)
      .then(() => {
        // when deleted successfully
        // redirect the user to the /todos page

        res.redirect("/drones")
      })
      .catch(() => {
        console.log("Delete failed!")
      });
  });


module.exports = router;
