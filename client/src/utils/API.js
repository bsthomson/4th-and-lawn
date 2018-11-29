import axios from "axios";

export default {
  //Posts register info
  submitRegisterInfo: registerData => {
    return axios.post('/register', registerData);
  },

  // Gets all parking spots
  getParkingSpots: () => {
    return axios.get("/api/parkingSpots");
  },

  // Gets all parking spots
  getParkingSpotsByEvent: (eventId) => {
    return axios.get("/api/parkingSpots/-1/" + eventId);
  },

  // Gets the parking spot with the given id
  getParkingSpot: id => {
    return axios.get("/api/parkingSpots/" + id);
  },

  // Deletes the parking spot with the given id
  deleteParkingSpot: id => {
    return axios.delete("/api/parkingSpots/" + id);
  },

  // Updates the parking spot with the given id
  updateParkingSpot: (id, body) => {
    console.log('client side parking spots update')
    return axios.put(
      "/api/parkingSpots/" + id,
      body
    );
  },

  // Deletes the parking spot with the given id
  createParkingSpot: body => {
    console.log({
      message: 'client side parking spots create',
      body
    })
    
    return axios.post(
      "/api/parkingSpots",
      body
    );
  },

  // Saves a parking spot to the database
  saveParkingSpot: parkingSpotData => {
    return axios.post("/api/parkingSpots", parkingSpotData);
  },

  // Gets all posted spots by user
  getPostedSpots: () => {
    return axios.get("/api/postedspots");
  },

  // Gets all spots rented
  getRentedSpots: () => {
    return axios.get("/api/rentedspots");
  },

  // Get all renters for a spot
  getRentersForSpot: id => {
    return axios.get("/api/postedspots/" + id);
  },

  deleteRenter: id => {
    return axios.delete("/api/rentedspots/" + id);
  },

  // Gets the rented spot with the given id
  getRentedSpot: id => {
    return axios.get("/api/rentedspots/" + id);
  },

  // Deletes the rented spot with the given id
  deleteRentedSpot: id => {
    return axios.delete("/api/rentedspots/" + id);
  },

  // Saves a parking spot to the database
  saveRentedSpot: rentedSpotData => {
    return axios.post("/api/rentedspot", rentedSpotData);
  },

  // Gets the events from the database
  getEvents: () => {
    return axios.get("/api/event")
  },

  // Gets the events from the database
  getUser: id => {
    return axios.get("/api/user/" + id)
  },

  getDistance: (origin, destination) => {
    return axios.get("/api/rentedspots/distance?origin=" + origin + "&destination=" + destination)
  }
}
