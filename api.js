import axios from 'axios';
import { url } from './app.json';

const POST = (endPoint, payload) => {
    return new Promise( (resolve, reject) => {
        const config = {};
        const fullUrl = url + endPoint;      
        axios.post(fullUrl , payload, config)
          .then(function (response) {
            //API response
            resolve(response);
          })
          .catch(function (error) {
            //API error
            reject(error);
          });
    });
}

const PUT = (endPoint, payload) => {
    return new Promise( (resolve, reject) => {
        const config = {};
        const fullUrl = url + endPoint;
        axios.put(fullUrl, payload, config)
          .then(function (response) {
            //API response
            resolve(response);
          })
          .catch(function (error) {
            //API error
            reject(error);
          });
    });
}

const GET = (endPoint) => {
    return new Promise( (resolve, reject) => {
        const config = {};
         const fullUrl = url + endPoint;
        axios.get(fullUrl, payload, config)
          .then(function (response) {
            //API response
            resolve(response);
          })
          .catch(function (error) {
            //API error
            reject(error);
          });
    });
}

const DELETE = endPoint => {
    return new Promise( (resolve, reject) => {
        const config = {};
         const fullUrl = url + endPoint;
        axios.delete(fullUrl, config)
          .then(function (response) {
            //API response
            resolve(response);
          })
          .catch(function (error) {
            //API error
            reject(error);
          });
    });
}

export default {
    GET,
    POST,
    PUT,
    DELETE
}