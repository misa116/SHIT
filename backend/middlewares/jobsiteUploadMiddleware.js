import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const jobsiteStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "jobsites",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  },
});

const jobsiteUpload = multer({ storage: jobsiteStorage });

export default jobsiteUpload;
