const express = require('express')
const cors = require('cors')
const multer = require('multer')


const app = express()
const port = process.env.PORT || 5000
//

// var storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, './uploads')
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + path.extname(file.originalname)) //Appending extension
//   }
// })

var storage = multer.diskStorage(
  {
      destination: './uploads',
      filename: function (req, file, cb ) {
          cb( null, file.originalname);
      }
  }
);
var upload=multer({ storage: storage } )
// any request coming in, transfer all body into JSON
app.use(express.json())

// allow cross origin from client localhost
app.use(cors())

// creating POST endpoint /file
app.post('/file', upload.single('file'), (req, res) => {
  console.log('body', req.file.length, req.file)

  // here you can do anything that you want for the file
  // ex: you want to save it to database here
  // var upload=multer({ storage: storage });
  // console.log("saved into disk "+upload.Date)
  // res.json({ success: true })

})
// app.use(express.static(__dirname + "/../build"));
// app.post("/api/uploadfile", upload.single('myFile'), (req, res, next) => {
//   console.log(req.file.originalname + " file successfully uploaded !!");
//   res.sendStatus(200);
// });

app.listen(port, error => {
  if (error) throw error
  console.log('Server running on port ' + port)
})
