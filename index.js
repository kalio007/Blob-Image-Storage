require('dotenv').config();
const {
  BlobServiceClient,
  StorageSharedKeyCredential,
} = require("@azure/storage-blob");
const express = require('express');
const app = express();
const multer = require('multer');
const port = 3000;
app.use(express.static('public'))



//checking environmet
console.log(process.env.CONN_STR)

const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.CONN_STR);

//multer config
const storage = multer.memoryStorage(); // Store the file in memory
const upload = multer({ storage: storage });

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/views/index.html')
})

app.post('/upload', upload.single('image'), function async (req, res) {
    
    const blobName = `image_${Date.now()}.jpg`;
    const content = req.file.buffer;
    const containerName = `videos`;
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    const uploadBlobResponse = blockBlobClient.upload(
      content,
      content.length
    );
    console.log(
      `Upload block blob ${blobName} successfully`,
      uploadBlobResponse.requestId
    );
}) 

app.listen(port, () => {
    console.log(`server is listening on ${port}`)
})
