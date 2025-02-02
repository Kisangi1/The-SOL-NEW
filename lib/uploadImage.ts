import { cloudinary } from './cloudinary';

export async function uploadImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const upload = cloudinary.uploader.upload_stream((error, result) => {
      if (error) reject(error);
      else resolve(result!.secure_url);
    });

    file.arrayBuffer().then((buffer) => {
      upload.end(Buffer.from(buffer));
    });
  });
}