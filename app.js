require('dotenv').config();
require('express-async-errors');




const express = require('express');
const app = express();
const morgan = require('morgan');
const  bodyParser = require('body-parser');
const mongoSanitize = require('express-mongo-sanitize');
const path = require('path');
const routers = require('./routes/index');



// database
const connectDB = require('./DB/connect');


//Routes
app.use('/api/v1/', routers);



app.use(morgan('dev'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public"))); // Static files.


app.use(mongoSanitize());

//errorHandlerMiddleware
const notFoundMiddleware = require('./middleware/not-Found');
const errorHandlerMiddleware = require('./middleware/error-handler');



// "localhost:PORT/" endpoint
app.get('/', (req,res)=> {
    res.send("Stackoverflow back end clone with Node.js.");
});



app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)




//port
port = process.env.PORT || 7005;



//server
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, () => {
            console.log(`listing on port ${port}...`)
        });
         
    } catch (error) {
      console.log(error)  
    }
};


start();



