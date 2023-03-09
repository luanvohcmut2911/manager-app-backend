const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const routerAuth = require('./routes/AuthServer.route');
const routerAPI = require('./routes/DataServer.route');
const dirname = __dirname;

dotenv.config();
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(express.json());
app.use(cors({ origin : '*', optionsSuccessStatus: 200}));

app.use('/auth', routerAuth);
app.use('/api', routerAPI);

const port = process.env.PORT || 5000;

mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log('Connect successfully to Auth Database');
}).catch(()=>{
    console.log('Database unavailable');
})



app.get('/*', (req, res)=>{
    res.status(404).send('ERROR 404: Not Found');
});

app.post('/*', (req, res)=>{
    res.status(404).send('ERROR 404: Not Found');
})

app.listen(port, ()=>{
    console.log(`App is listening on port ${port}`);
})

module.exports = dirname;