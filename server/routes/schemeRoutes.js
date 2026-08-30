import { Router } from 'express';
import { listSchemes } from '../controllers/schemeController.js';
const router = Router(); router.get('/', listSchemes); export default router;
