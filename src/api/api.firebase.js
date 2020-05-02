import * as axios from "axios";

const apiFirebase = axios.create({
  baseURL: "https://fir-8e045.firebaseio.com/",
});

export default apiFirebase;
