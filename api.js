import axios from 'axios';
import {url} from './Constant/index';
import AsyncStorage from '@react-native-community/async-storage';


// var result =  AsyncStorage.getItem('CompanyLoggedInData');
// result = JSON.parse(result)

 const  POST = async (endPoint, payload) => {
  var result =  await AsyncStorage.getItem('token');
result = JSON.parse(result)
  console.log('result Post',result)
  return new Promise((resolve, reject) => {
    const config = {
      headers:{
      Authorization: 'Bearer '+ result
      }
    };
    const fullUrl = url + endPoint;
    axios
      .post(fullUrl, payload, config)
      .then(function (response) {
        //API response
        resolve(response);
      })
      .catch(function (error) {
        //API error
        reject(error);
      });
  });
};

const PUT = (endPoint, payload) => {
  return new Promise((resolve, reject) => {
    const config = {};
    const fullUrl = url + endPoint;
    axios
      .put(fullUrl, payload, config)
      .then(function (response) {
        //API response
        resolve(response);
      })
      .catch(function (error) {
        //API error
        reject(error);
      });
  }); 
};

const GET = async (endPoint) => {
  var result =  await AsyncStorage.getItem('token');
  result = JSON.parse(result)
console.log('result get',result)
  return new Promise((resolve, reject) => {
    const config = {
        headers :
{
  'Authorization': 'Bearer ' + result
} 
    };
    const fullUrl = url + endPoint;
    axios
      .get(fullUrl, config)
      .then(function (response) {
        //API response
        resolve(response);
      })
      .catch(function (error) {
        //API error
        reject(error);
      });
  });
};

const DELETE = (endPoint) => {
  return new Promise((resolve, reject) => {
    const config = {};
    const fullUrl = url + endPoint;
    axios
      .delete(fullUrl, config)
      .then(function (response) {
        //API response
        resolve(response);
      })
      .catch(function (error) {
        //API error
        reject(error);
      });
  });
};

export default {
  GET,
  POST,
  PUT,
  DELETE,
};
