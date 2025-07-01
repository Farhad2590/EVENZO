const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const Authrouter = require('./Routes/AuthRouter.js')
const EventRouter = require('./Routes/EventRouter')


require('dotenv').config();
require('./Models/db')

const PORT = process.env.PORT || 9000;

app.get('/',(req,res)=>{
    res.send(`Evenzo Server is running at port ${PORT}`)
})

app.use(bodyParser.json());
app.use(cors());
app.use('/auth',Authrouter)
app.use('/events', EventRouter);

app.listen(PORT,()=>{
    console.log(`Evenzo Server is running at port ${PORT}`);
})