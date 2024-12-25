const asyncHandler=(func)=>{
       (req,res,next)=>{
        Promise.resolve(func(require,res,next)).catch((error)=>next(error))
       }
}


export {asyncHandler}


// const asyncHandler=()=>{}
// const asyncHandler=(func)=>{}
// const asyncHandler=async()=>{}
// const asyncHandler=(fn)=>async(req,res,next)=>{
//     try {
//         await fn(req,res,next)
//     } catch (error) {
//         res.status(error.code).json({
//             success:false,
//             message:'Glt Hai'
//         })
//     }
// }