import express from 'express';

const router = express.Router();

router.get('/all', allUsers);

router.post('/new', register);

router.post('/login');
