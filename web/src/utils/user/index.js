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

  return res?.data.find((statusData) => statusData.user === id).status;
};

const getUserProfile = async ([baseUrl = "http://localhost:5000", id]) => {
  try {
    const [resUser, status, locations] = await Promise.all([
      getUserAuth([baseUrl, id]),
      getUserStatus([baseUrl, id]), getLocations(baseUrl),
    ]);
    const userLocation = locations.find(
      (l) => l._id === resUser.locationGroup
    );
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
    return wew
  } catch (e) {
    throw e;
  }
};

export { getUserStatus, getUserProfile };
