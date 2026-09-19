import dotenv from "dotenv"
dotenv.config()
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"
const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
})
console.log("BUCKET:", process.env.AWS_BUCKET_NAME)
console.log("REGION:", process.env.AWS_REGION)
try {
    await s3.send(new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: "test.txt",
        Body: "hello",
        ContentType: "text/plain"
    }))
    console.log("Upload SUCCESS")
} catch(e) {
    console.log("Upload FAILED:", e.message)
    console.log("ERROR CODE:", e.Code)
}