import axios from 'axios';
import config from '../config';

export default {
  minData: async () => {
    try {
      const { data } = await axios.get(`${config.rest.api}/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}`);
      return data;
    } catch (err) {
      throw err;
    }
  },
  maxData: async () => {
    try {
      const { data } = await axios.get(`${config.rest.api}/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}`);
      if (!Array.isArray(data)) {
        throw new Error('данные некорректны')
      }
      return data;
    } catch (err) {
      throw err;
    }
  },
};