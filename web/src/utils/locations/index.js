import axios from "axios";

axios.defaults.withCredentials = true;

const getLocations = async (baseUrl = 'http://localhost:5000') => {
    let res;
    const epURL = `${baseUrl}/api/locations/groups`;

    try {
        res = await axios.get(epURL);
    } catch (e) {
        console.log("Error getting locations"+epURL);
        throw e;
    }

    return res?.data;
};

const getAmenities = async ([baseUrl = "http://localhost:5000", id = '']) => {
    const epURL = `${baseUrl}/api/locations/amenities/${id}`;
  
    try {
      const res = await axios.get(epURL);
      return res?.data.amenities
    } catch (e) {
      console.log("Error getting user amenities." + epURL);
      throw e;
    }
  };

export {
    getLocations,
    getAmenities
};