const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });
const express = require('express');
const app = express();
const cors = require('cors');
const axios = require('axios');
const routes = require('./routes');
const port = process.env.PORT || 3001;
const login = require('./src/login');
// const userinfo = require('./src/userinfo');
const userInfo = require('./src/getUserInfo');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});
app.get('/api/status', (req, res) => {
    res.json({ status: 'ok', message: 'Server is running' });
});
app.post('/api/authen', async (req, res) => {
    console.log("Backend")
    try {
        const { username, password } = req.body;
        // console.log(req.body);
        const response = await login(username, password);
        if (response.status === 'success') {
            
            console.log(response.message.firstname_en + " " + response.message.lastname_en + " is login success as " + req.body.username);

        } else {
            console.log("(" + response.message + ") Is login failed as " + req.body.username);
        }
        
        delete response.message.pid;
        
        res.json({ status: response.status, message: response.message ,message2:response.message2});
    } catch (error) {
        console.error( error);
        res.status(500).json({ message: 'Internal server error' });
    }

});

app.post('/api/userInfo', async (req, res) => {
    
    try {
        const { username } = req.body;

        // console.log(req.body);
        const response = await userInfo(username);
        if (response.status === 'success') {
            console.log(response.message)
            console.log(response.message.firstname_en + " " + response.message.lastname_en + " is getuser success as " + req.body.username);

        } else {
            console.log("(" + response.message + ") Is userino failed as " + req.body.username);
        }
        delete response.message.pid;

        res.json({ status: response.status, message: response.message ,message2:response.message2});
    } catch (error) {
        console.error( error);
        res.status(500).json({ message: 'Internal userinfoserver error' });
    }

});

const PORT = process.env.PORT || 3001;
// const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});