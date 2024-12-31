import multer from 'multer';
console.log("Here comes");

const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"./Public/Temp")
    },
    filename:function(req,file,cb){
        cb(null,file.originalname)
    }
})

export const upload=multer({
    storage
})

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, "./public/uploads/temp/");
//     },
//     filename: function (req, file, cb) {
//       const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//       cb(null, file.fieldname + "-" + uniqueSuffix);
//     },
//   });
//   const upload = multer({ storage: storage });