import axios from "axios";

const Axios = axios.create({
    baseURL: `${process.env.REACT_APP_BASE_URL}`,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'ContentType': 'application/json',
        'Accept': 'application/json',
        // 'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGRjY2JlYzZiNTVkYTAwMTc1OTcyMmMiLCJpYXQiOjE1NzQ3NTE2ODh9.GPbsl9FLX4VrsGVErodiXypjuz1us4tfD0jwg2_UrzY`,
    }
});

export default Axios;

//  DELETE 'https://api-nodejs-todolist.herokuapp.com/task/5ddcd1566b55da0017597239'
// https://api-nodejs-todolist.herokuapp.com/
// Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGRjY2JlYzZiNTVkYTAwMTc1OTcyMmMiLCJpYXQiOjE1NzQ3NTE2ODh9.GPbsl9FLX4VrsGVErodiXypjuz1us4tfD0jwg2_UrzY'