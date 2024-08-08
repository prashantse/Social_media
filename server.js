require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { sequelize } = require('./models/index');
const multer = require('multer');
const cors = require('cors');

//social media routes impoting 
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const commentRoutes = require('./routes/commentRoutes');
const likeRoutes = require('./routes/likeRoutes');

//market place routes impoting 
const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const brandRoutes = require('./routes/brandRoutes');
const addAddressRoutes = require('./routes/addressesRoutes');


const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"))
app.use(bodyParser.json());
app.use(cors({
  origin: '*', // Allows all domains
}));

// social media routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/posts', postRoutes);
app.use('/api/v1/likes', likeRoutes);
app.use('/api/v1/comments', commentRoutes);

// market place routes
app.use('/api/v1/products',productRoutes);
app.use('/api/v1/category',categoryRoutes);
app.use('/api/v1/brand',brandRoutes);
app.use('/api/v1/address', addAddressRoutes);

const PORT = 3001


sequelize.sync()  
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });