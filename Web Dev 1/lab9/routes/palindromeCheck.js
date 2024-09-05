/*
Require express and express router as shown in lecture code and worked in previous labs.
Your server this week should not be doing any of the processing! Your server only exists to allow someone to get to the HTML Page and download the associated assets to run the palindrome check page.

you just need one route to send the static homepage.html file
*/

import { Router } from 'express';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import express from 'express'
import path from 'path'

const router = Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

router.use('/static', express.static(path.join(__dirname, '../static')));

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../static/homepage.html'));
});

export default router;