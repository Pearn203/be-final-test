import express from 'express';
import { uploadImage } from '../controller/imageController.js';
import multer from'multer';

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/upload', upload.single('image'), uploadImage);

export default router;