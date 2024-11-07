import axios from "axios";
import { getLocations } from "../locations";
import { getUserAuth } from "../auth";

axios.defaults.withCredentials = true;

const getUserStatus = async ([baseUrl = "http://localhost:5000", id]) => {
  let res;
  const epURL = `${baseUrl}/api/users/status`;

  try {
    res = await axios.get(epURL);
  } catch (e) {
    console.log("Error getting user status." + epURL);
    throw e;
  }

  return res?.data.find((statusData) => statusData.user === id);
};

const getUserProfile = async ([baseUrl = "http://localhost:5000", id]) => {
  try {
    const [resUser, status, locations] = await Promise.all([
      getUserAuth([baseUrl, id]),
      getUserStatus([baseUrl, id]),
      getLocations(baseUrl),
    ]);
    const userLocation = locations.find((l) => l._id === resUser.locationGroup);
    const {
      municipality,
      province,
      region,
      location: { coordinates },
    } = userLocation;
    const fullLocation = `${municipality}, ${province}, ${region}`;
    const wew = {
      user: {
        ...resUser,
        status,
        fullLocation,
        address: [coordinates[1], coordinates[0]],
      },
      locations,
    };
    return wew;
  } catch (e) {
    throw e;
  }
};

const sendStatus = async ([baseUrl = "http://localhost:5000", id, status = 'SAFE']) => {
  const epURL = `${baseUrl}/api/users/status/${id}`;

  try {
    await axios.put(epURL, {
        status,
    });
  } catch (e) {
    console.log("Error sending user status." + epURL);
    throw e;
  }
};

const getContactNumbers = async (baseUrl = "http://localhost:5000") => {
  const epURL = `${baseUrl}/api/users/contacts`;

  try {
    const res = await axios.get(epURL);
    return res?.data[0]
  } catch (e) {
    console.log("Error getting user contact numbers." + epURL);
    throw e;
  }
};

export { getUserStatus, getUserProfile, sendStatus, getContactNumbers };
