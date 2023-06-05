const mongoose = require('mongoose')

mongoose.model(
"Book",{
    title:{
        type:String,
        require:true
    },
    author:{
        type:String,
        require:true
    },
    numberPages:{
        type:String,
        require:false
    },
    publisher:{
        type:String,
        require:false
    }
});
