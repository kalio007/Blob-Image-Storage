require('dotenv').config();
const {
  BlobServiceClient,
  StorageSharedKeyCredential,
} = require("@azure/storage-blob");


console.log(process.env.CONN_STR)

const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.CONN_STR);

async function main() {
  // Create a container
  const blobName = "fucker.txt";
  const content = "Hello world!";
  const containerName = `videos`;
  const containerClient = blobServiceClient.getContainerClient(containerName);
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);
  const uploadBlobResponse = await blockBlobClient.upload(
    content,
    content.length
  );
  console.log(
    `Upload block blob ${blobName} successfully`,
    uploadBlobResponse.requestId
  );
}

main();
