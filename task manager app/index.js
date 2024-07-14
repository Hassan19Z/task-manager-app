import express from 'express';
import { connectDB } from './databases/models/dbconnection.js';
import { globalErrorHandling } from './src/middleWare/asyncHandler.js';

const app = express()
const port = 3000
connectDB()
bootstrap(app)
app.use(express.json())
app.use(globalErrorHandling)
app.listen(port, () => console.log(`Example app listening on port ${port}!`))