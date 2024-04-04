const path = require('path');
const express = require('express');
const router = express.Router();
require('dotenv').config({ path: path.resolve(__dirname, '.env') });
const axios = require("axios");
const https = require("https"); // Import https module for creating agents

const userInfo = async (username) => {
    try {
        const authResponse = await axios.post(
            process.env.ICIT_INFORMATION,
            {
                username,
            },
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    Authorization: "Bearer " + process.env.ICIT_TOKEN,
                },
                maxBodyLength: Infinity,
                httpsAgent: new https.Agent({
                    rejectUnauthorized: false,
                }),
            }
        );
        if (authResponse.status === 200 && authResponse.data.api_status === 'success') {
            // Authentication successful
            return {
                status: 'success',
                message: authResponse.data.userInfo // or any relevant user information
            };
        } else {
            // Authentication failed
            return {
                status: 'error',
                message: 'Invalid username or password' // or any relevant error message
            };
        }
        return {
            status: authResponse.status,
            message: authResponse.data.api_status,
            userInfo: authResponse.data.userInfo,
        };

    } catch (error) {
        console.error(error);
        // Handle errors here
        return {
            status: 500, // Internal server error
            message: "Internal server error",
        };
    }
};

module.exports = userInfo;
