import axios from "axios";

export default {
  //Posts register info
  submitRegisterInfo: registerData => {
    return axios.post('/register', registerData);
  },

  // Gets all parking spots
  getParkingSpots: () => {
    return axios.get("/api/parkingspots");
  },

  // Gets the parking spot with the given id
  getParkingSpot: id => {
    return axios.get("/api/parkingspots/" + id);
  },

  // Deletes the parking spot with the given id
  deleteParkingSpot: id => {
    return axios.delete("/api/parkingspots/" + id);
  },

  // Saves a parking spot to the database
  saveParkingSpot: parkingSpotData => {
    return axios.post("/api/parkingspots", parkingSpotData);
  },

   // Gets all posted spots by user
   getPostedSpots: () => {
    return axios.get("/api/postedspots");
  },

  // Gets all spots rented
  getRentedSpots: () => {
    return axios.get("/api/rentedspots");
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

  // Gets the eventsd from the database
  getJayhawkEvents: () => {
    return axios.get("/api/jayhawk")
  },

  getDistance: (origin, destination) => {
    return axios.get("/api/rentedspots/distance?origin=" + origin + "&destination="+ destination)
  }
}
