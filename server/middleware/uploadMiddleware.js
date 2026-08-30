import multer from 'multer';
const imageOnly = (_, file, cb) => cb(null, file.mimetype.startsWith('image/'));
export const upload = multer({ storage: multer.memoryStorage(), fileFilter: imageOnly, limits: { fileSize: 8 * 1024 * 1024, files: 6 } });
