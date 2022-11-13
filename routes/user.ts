import express from 'express';
const router = express.Router();
import { getSpecific, create } from '../controllers/user-controller';

router.get('/:userId', getSpecific);
router.post('/', create);

export default router;
