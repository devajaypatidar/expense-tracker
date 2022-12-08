const mongoose = require('mongoose');

const url = "mongodb+srv://ajay:Ys79j4Lric0WwX2Y@transactions.mk4pbvc.mongodb.net/?retryWrites=true&w=majority";
const connectDB = async()=>{
    try{
        const conn = await mongoose.connect(url,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        console.log(`mongoDB connected : ${conn.connection.host}`.cyan.underline.bold)
    }catch(e){
        console.log(`error : ${e.message}`.red);
        process.exit(1);
    }
}

module.exports = connectDB;