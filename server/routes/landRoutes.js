import { Router } from 'express';
import { search, reverse, saveLand, uploadAttachments } from '../controllers/landController.js';
import { upload } from '../middleware/uploadMiddleware.js';
const router = Router();
router.get('/search', search); router.get('/reverse', reverse); router.post('/', saveLand);
router.post('/uploads', upload.fields([{ name:'landImages', maxCount:5 }, { name:'soilReport', maxCount:1 }]), uploadAttachments);
export default router;
