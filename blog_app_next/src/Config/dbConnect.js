import mongoose from "mongoose";

function dbConnect(){
    if(mongoose.connections[0].readyState){
        console.log("already connected...")
        return
    }
    mongoose.connect(process.env.DB_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
    mongoose.connection.on("connect",()=>{
        console.log("connected")
    })
    mongoose.connection.on("error",(err)=>{
        console.log("connected",err)
    })
}

 export default dbConnect;