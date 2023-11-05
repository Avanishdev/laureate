import axios from 'axios';

const URL = '/data/data.json';

export const fetchPrizes = async () => {
  try {
    const response = await axios.get(URL);
    // const data=await response.json();
    // console.log(data.prizes);
    return response.data.prizes;
  } catch (error) {
    console.log(error);
  }
};
