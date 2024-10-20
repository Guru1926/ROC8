import express from 'express'
import {validateUser} from '../middleware/auth.js'
import data from '../sampleData.js';
import { getData, updateData } from '../controller/analytics.controller.js';

const router = express.Router();

router.get('/', async (req, res) => {
res.send("Analytics route")
});

router.post('/update-data',validateUser, async (req, res) => {
  try {
    const response =await  updateData(data)
    res.send(response)
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get('/list',validateUser, async (req, res) => {
  const { gender,
    startDate ,
    endDate ,
    age} = req?.query ?? {}
  try {
    const resp = await getData(gender,startDate, endDate,age)
    res.send(resp)
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router