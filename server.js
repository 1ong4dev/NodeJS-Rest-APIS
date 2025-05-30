const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path'); 
const authRouter = require('./routers/auth.router'); // Importing auth router
const postRouter = require('./routers/post.router'); // Importing post router   
dotenv.config();  

const app = express();
//middlewares
app.use(cors());
app.use(express.json()); // to parse JSON bodies
app.use(express.urlencoded({ extended: false })); // to parse URL-encoded bodies
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // to serve static files from the upload directory
app.use("/api/v1/auth", authRouter); // Using auth router for authentication related routes
app.use("/api/v1/post", postRouter); // Using post router for post related routes

//wellcome routers
app.get('/', (req, res) => {
    res.send('Welcome to the API');
})


//connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
.then((result) => console.log('Connected to MongoDB'))
.catch((error) => console.error('Failed to connect to MongoDB :', error));

//listen port
const PORT = process.env.PORT || 5000; 
app.listen(PORT, () => {
    console.log(`Server is running at localhost:${PORT}`);   
});