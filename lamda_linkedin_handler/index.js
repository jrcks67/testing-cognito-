const axios = require('axios');

const CLIENT_ID = '867vpybjp53bk6';
const CLIENT_SECRET = 'WPL_AP1.YwamyXtTWsRUdD6R./1u9YQ=='; 
const REDIRECT_URI = 'http://localhost:5173/talent/dashboard'; 

exports.handler = async (event) => {
  try {
    const { code } = JSON.parse(event.body); // Extract code from request body

    if (!code) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'No authorization code provided' }),
      };
    }

    // Exchange code for access token
    const tokenResponse = await axios.post(
      'https://www.linkedin.com/oauth/v2/accessToken',
      new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: REDIRECT_URI,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
      }).toString(),
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    );

    const { access_token } = tokenResponse.data;

    // Fetch user info
    const userInfoResponse = await axios.get('https://api.linkedin.com/v2/userinfo', {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*', // Allow all origins (adjust for production)
      },
      body: JSON.stringify({ access_token, userInfo: userInfoResponse.data }),
    };
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ error: 'Authentication failed' }),
    };
  }
};
