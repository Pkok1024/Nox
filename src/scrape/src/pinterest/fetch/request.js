/** @format */

import axios from 'axios';
export default async function fetchRequest(url, body) {
  try {
    const response = await axios.get(url, body);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}
