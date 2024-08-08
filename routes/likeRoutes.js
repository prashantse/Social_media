const router = require('express').Router();
const likeControllers = require('../controller/likeControllers');
const { verifyToken } = require('../middleware/tokenVerify')
const QRCode = require('qrcode');

router.route('/:postId/doLike').post(verifyToken, likeControllers.likePost);
router.route('/:postId/doDislike').delete(verifyToken, likeControllers.unlikePost);

// a api that returns QRCode image of given URL
router.route('/generateQR').get (async (req, res) => {
    try {
      const url = req.query.url || 'https://google.com';
      const qrCodeImage = await QRCode.toDataURL(url);
      res.send(`
        <div style="
          display: flex; 
          flex-direction: column; 
          justify-content: center; 
          align-items: center; 
          height: 97vh; 
          background: linear-gradient(135deg, #f6d365 0%, #fda085 100%);">
          <h1 style="
            color: #fff; 
            font-family: Arial, sans-serif; 
            font-size: 2.5em; 
            margin-bottom: 20px; 
            text-shadow: 2px 12px 12px rgba(0, 0, 0, 0.5);">
            Your QR Code
          </h1>
          <p style="
            color: #fff; 
            font-family: Arial, sans-serif; 
            font-size: 1.2em; 
            margin-bottom: 30px; 
            text-shadow: 2px 12px 12px rgba(0, 0, 0, 0.8);">
            Scan the QR code below to get started
          </p>
          <div style="
            padding: 20px; 
            background: radial-gradient(circle, #ff9a9e, #fad0c4); 
            border: 4px solid #fff; 
            box-shadow: 0 12px 12px rgba(0, 0, 0, 0.5); 
            border-radius: 15px;">
            <img style="height: 380px; display: block; margin: auto;" src="${qrCodeImage}" alt="QR Code"/>
          </div>
        </div>
      `);
    } catch (err) {
      console.error('Error generating QR code:', err);
      res.status(500).send('Internal Server Error');
    }
  });

module.exports = router