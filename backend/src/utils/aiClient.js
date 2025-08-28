const axios = require("axios")

const aIClient = async (route, data = {}, method = 'POST') => {
  try {
    const res = await axios({
      method,
      url: `${process.env.AI_SERVICE_URL}/${route}`,
      data,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return res.data;
  } catch (err) {
    console.log({err})
    console.error('AI Client Error:', err.response?.data || err.message);
    throw err;
  }
};

module.exports = {aIClient}
