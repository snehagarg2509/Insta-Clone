const express = require('express')
const app = express()
const cors = require('cors');
const mongoose  = require('mongoose')
const PORT = 5000
const MONGOURI = process.env.MONGOURI
const JWT_SEC = process.env.JWT_SEC

mongoose.connect("mongodb+srv://insta:1234@cluster0.46k2knt.mongodb.net/?retryWrites=true&w=majority",{
    useNewUrlParser:true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
mongoose.connection.on('connected',()=>{
    console.log("Connected to Mongo, Yeahh!")
})
mongoose.connection.on('error',(err)=>{
    console.log("ERROR in Connecting: ",err)
})

require('./models/user')
require('./models/post')

app.use(express.json())
app.use(cors());
app.use(require('./routes/auth'))
app.use(require('./routes/post'))
app.use(require('./routes/user'))


if(process.env.NODE_ENV=="production"){
    app.use(express.static('client/build'))
    const path = require('path')
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}

app.listen(PORT,()=>{
    console.log("server is running on",PORT)
})

