import cloudinary from "../config/cloudinary.js";

export const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "No file uploaded"
      });
    }

    const base64 = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;

    const result = await cloudinary.uploader.upload(base64, {
      folder: "cleanwatch"
    });

    res.status(200).json({
      imageUrl: result.secure_url
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message
    });
  }
};