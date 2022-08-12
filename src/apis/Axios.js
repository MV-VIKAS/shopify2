import axios from "axios";


//creating Axios instance

export default axios.create({
  baseURL: "http://localhost:8080/shopping-kart-ty-api-0.0.1-SNAPSHOT",
  headers: {
    "content-type": "application/json",
  },
});

