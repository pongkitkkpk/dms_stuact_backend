const path = require('path');
const express = require('express');
const router = express.Router();
require('dotenv').config({ path: path.resolve(__dirname, '.env') });
const axios = require("axios");

const login = async (username, password) => {
    try {
        console.log("Come in")
        // Step 1: Authenticate with ICIT server
        const authResponse = await axios({
            
            method: "post", // Explicitly specify the method
            url: process.env.ICIT_AUTHENTICATION,
            data: {
                username,
                password,
                scopes: "student",
            },
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: "Bearer " + process.env.ICIT_TOKEN,
            },
            maxBodyLength: Infinity,
        });

        // Step 2: Process authentication response
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
    } catch (error) {
        console.error("Authentication error:", error);
        return {
            status: 'error',
            message: 'Internal server error' // or any relevant error message
        };
    }
};

module.exports = login;
