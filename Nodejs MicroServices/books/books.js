const express = require('express');
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json())


// Mongoose Connect -- >
mongoose.connect('mongodb+srv://saumyaranjansp20:mongodb123@cluster0.3wolhmm.mongodb.net/BooksService',{useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{
    console.log("Connection Established")
})
require('./Book.js')
const Book = mongoose.model('Book')

app.get('/',(req,res)=>{
    res.send("This is the Book Service")
})

app.post("/book",(req,res)=>{
    var newBook = {
        title:req.body.title,
        author: req.body.author,
        numberPages: req.body.numberPages,
        publisher: req.body.publisher
    }
    console.log(newBook)
    var book = new Book(newBook)
    book.save().then(()=>{
        console.log("New Book Created")
    }).catch((err)=>{
        if(err){
            throw err
        }
    })
    res.send("Book Created With Success")
})

app.get("/books",(req,res)=>{
    Book.find().then((books)=>{
        res.json(books)
    }).catch((err)=>{
        console.log(err)
    })
})


app.get("/books/:id",(req,res)=>{
    Book.findById(req.params.id).then((book)=>{
        if (book){
            res.send(book)
        }
    }).catch((err)=>{
        res.send(err)
    })
})


app.listen("3000",()=>{
    console.log("Running on port 3000")
})
