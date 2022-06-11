const redis = require('redis');




const REDIS_PORT = process.env.REDIS_PORT || 6379;

 const client = redis.createClient(REDIS_PORT);

 //Cache middleware
 const catchValue = (req, res, next) => {
 const { url } = req;

 client.get(url, (err, data) => {
    if (err) {
    next();
    } else {
    res.send(data);
    }
 })
 }

 module.exports = catchValue;

// const client = redis.createClient({
//     host: 'localhost:7005/api/v1/',
//     port: process.env.HOST_REDIS,
//    // password: process.env.PASSWORD_REDIS
// });

// client.on('error', err => {
//     console.log('Error ' + err);
// }); 


// app.get('/api/v1/', (req, res, next) => {
//  try {
//     const respose = await axios.get('http://localhost:7005/api/v1/');
//     const saveResult = await client.set('/api/v1/', JSON.stringify(respose.data));
//     console.log(saveResult);
//     res.send(respose.data);
//  } catch (error) {
//     res.status(StatusCodes.OK).json({
//         message: "error"
//     })
//  }
// })