import express from 'express';
const router = express.Router()
import {create} from '../controllers/game-controller'

router.post('/', create)

export default router