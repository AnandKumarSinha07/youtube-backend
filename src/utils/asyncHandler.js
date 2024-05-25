
const asyncHandler =(fn)=>async(req,res,next)=>{
    try{
         await fn(req,res,next)
    }
    catch(error){
        res.status(500).json({
            success:false,
            message:"Error Bhag"
        })
    }
}


// const asyncHandler=(requestHandler)=>{
//    (req,res,next)=>{
//     Promise.resolve(requestHandler(req,res,next)).catch((err)=>next(err))
//    }
// }

export default asyncHandler;