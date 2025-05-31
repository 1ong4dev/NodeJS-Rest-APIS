const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path'); 
const authRouter = require('./routers/auth.router'); // Importing auth router
const postRouter = require('./routers/post.router'); // Importing post router   
dotenv.config();  
const dataRouter = require('./controllers/data.controller'); // Importing data controller for user posts
const app = express();
const session = require('express-session'); // Importing express-session for session management
const mongoStore = require('connect-mongo'); // Importing connect-mongo for session storage in MongoDB
const swaggerUi = require('swagger-ui-express');
const fs = require('fs');
const swaggerAPIOptions = require('./swagger/swagger.option'); // Importing Swagger options

//Session management
// app.use(session({
//     secret: process.env.SERVER_SESION,
//     resave: false,
//     saveUninitialized: true,
//     store: mongoStore.create({
//         mongoUrl: process.env.MONGODB_URI,
//         collectionName: 'sessions', // Name of the collection where sessions will be stored
//     })
//   }))

//middlewares
app.use(cors());
app.use(express.json()); // to parse JSON bodies
app.use(express.urlencoded({ extended: false })); // to parse URL-encoded bodies
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // to serve static files from the upload directory
app.use("/api/v1/auth", authRouter); // Using auth router for authentication related routes
app.use("/api/v1/post", postRouter); // Using post router for post related routes
app.use("/api/v1", dataRouter); // Using data router for user posts

//Swagger documentation setup
const swaggerDocument = JSON.parse(fs.readFileSync('./openapi.json', 'utf8'));

app.use('/api-docs-method-1', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//swagger documentation setup using swagger-jsdoc
// app.use('/api-docs-method-2', swaggerUi.serve, swaggerUi.setup(swaggerAPIOptions));

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