import { v2 as cloudinary } from 'cloudinary';
import fs from "fs"


cloudinary.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINAR_SECRET_KEY
});

const  uploadOncloudinary=async(localFilepath)=>{
   try {
      if(!localFilepath) return null
      //upload the file on cloudinary
      const respone=await cloudinary.uploader.upload(localFilepath,{
        resource_type:"auto"
      })
      // file has been uploaded successfully
      console.log("file is uploaded on cloudinary",respone.url);
      return respone.url 

   } catch (error) {
       fs.unlinkSync(localFilepath) //remove the locally
       // saved temporary file as they upload operation 
       //get failed
       return null
   }
}

export {uploadOncloudinary}