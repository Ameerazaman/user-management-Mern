const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const jwt = require('jsonwebtoken');

const userRouter = require('./routes/user/User/user');
const adminRouter = require('./routes/user/Admin/Admin');

dotenv.config();

const app = express();
const uploadDir = path.join(__dirname, 'uploads');

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

mongoose.connect('mongodb://localhost:27017/react-crud', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.log('MongoDB connection failed:', err));

app.use('/api/users', userRouter);
app.use('/api/admin',adminRouter)
const PORT=process.env.PORT_NO
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
