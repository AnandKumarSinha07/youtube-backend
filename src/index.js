import dotenv from "dotenv"
import connectDB from "./db/db.js";


connectDB()
.then(()=>{
    app.listen(process.env.PORT || 8000 ,()=>{
        console.log(`Server is running at PORT ${PORT}`);
    })
})
.catch((err)=>{
    console.log("Mongodb connection failed",err);
})

dotenv.config({path:'./env'})
