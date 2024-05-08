import axios from "axios";

const baseURL = "http://localhost:7071";


export const getEvents = () => {
  return axios
    .get(`${baseURL}/events`)
    .then(function (response) {
      return response.data.scanResults;
    })
    .catch(function (error) {
      throw error;
    });
};

export const getCameras = () => {
    return axios
      .get(`${baseURL}/camera`)
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        throw error;
      });
  };