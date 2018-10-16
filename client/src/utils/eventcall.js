import axios from "axios";

export default { 
  events: () => {
    axios.get('/api/jayhawk')
    .then( response => {
        console.log(response)
        this.setState(response => ({
            jayhawk: response.data
        }))
        console.log(this.state)
    })
    .catch( error => {
        console.log(error)
    })
  }
}