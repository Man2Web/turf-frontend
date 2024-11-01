import axios from "axios";

export const citiesList = async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}court/getLocations`
    );
    return response.data.locations;
  } catch (error) {
    console.error(error);
  }
};
