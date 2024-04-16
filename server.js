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
const db = require('./db');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

const sendEmail = require('./emailSender');

app.post('/sendEmail', async (req, res) => {
  try {
    const { recipient, subject, text } = req.body;
    const result = await sendEmail(recipient, subject, text);
    res.json(result);
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
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
app.get("/getState/:id_projects", (req, res) => {
    const id_projects = req.params.id_projects;
    db.query(
      "SELECT * FROM status_project WHERE id_projects = ? ORDER BY id_projects DESC LIMIT 1",
      [id_projects],
      (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).send("Error retrieving project");
        } else {
          res.send(result);
        }
      }
    );
  });
app.put("/updateState/:id_projects", async (req, res) => {
    const id_projects = req.params.id_projects;
    const { project_phase,editor_name } = req.body; // Extract updated data from the request body
    const updated_at = new Date();
    // Create an object to hold the updated data
    const updatedData = {
      project_phase,
      updated_at,
      editor_name // Assuming last_time_edit corresponds to updated_at
    };
  
    // Update the project with the given id_project in the database
    db.query(
      "UPDATE status_project SET ? WHERE id_projects = ?",
      [updatedData, id_projects],
      (err, result) => {
        if (err) {
          console.error(err);

          res.status(500).send("Error updating project data"); // Handle the error and send an appropriate response
        } else {

          res.status(200).send("Project data updated successfully");
        }
      }
    );
    
});
  


const PORT = process.env.PORT || 3001;
// const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
