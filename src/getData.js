import axios from "axios";

const API__URL = 'https://recruitment.hal.skygate.io/';

const getData = dataType => axios
    .get(`${API__URL}${dataType}`)
    .then(response => response.data);

export default getData;
