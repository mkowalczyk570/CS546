// Set-Up Routes
import path from 'path'
import express from 'express'
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const router = express.Router()
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

router.use('/static', express.static(path.join(__dirname, '../static')));

router
  .route('/')
  .get(async (req, res) => {
    res.sendFile(path.join(__dirname, "../static/webpage.html"));
  })

export default router
