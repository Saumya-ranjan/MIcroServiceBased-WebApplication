const express = require("express")
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json())


// Mongoose Connect -- >
mongoose.connect('mongodb+srv://saumyaranjansp20:mongodb123@cluster0.3wolhmm.mongodb.net/CustomerService',{useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{
    console.log("Connection Established")
})

// Load Our Model -- > 
require('./Customer')
const Customer = mongoose.model('Customer')

app.post("/customer",(req,res)=>{
    var newCustomer = {
        name:req.body.name,
        age: req.body.age,
        address: req.body.address
        }
    console.log(newCustomer)
    var customer = new Customer(newCustomer)
    customer.save().then(()=>{
        console.log("New Customer Created")
    }).catch((err)=>{
        if(err){
            throw err
        }
    })
    res.send("Customer Created With Success")
})

app.get("/customer",(req,res)=>{
    Customer.find().then((customer)=>{
        res.json(customer)
    }).catch((err)=>{
        console.log(err)
    })
})

app.get("/customer/:id",(req,res)=>{
    Customer.findById(req.params.id).then((customer)=>{
        if (customer){
            res.send(customer)
        }
    }).catch((err)=>{
        res.send(err)
    })
})


app.listen('2000' , ()=>{
    console.log("Running on Port 2000")
})

