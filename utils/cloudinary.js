// import {v2 as cloudinary} from 'cloudinary';
const {v2} = require('cloudinary');
const fs = require('fs');



    // Configuration
    v2.config({ 
        cloud_name: 'dd9vydkvn', 
        api_key: '239289953952689', 
        api_secret: "T-hwJpxn2NSWp1s9295OkDuGKwk" // Click 'View Credentials' below to copy your API secret
    });
    
    const uploadOnCloudinary = async (localPath)=>{
         try {
            if(!localPath)return null;
            const response = await v2.uploader.upload(localPath,{
                resource_type: "auto"
            });
            console.log("response",response);
            fs.unlinkSync(localPath)
            return response.secure_url;
             
         } catch (error) {
            console.log("error",error);
            fs.unlinkSync(localPath)
            return null;
         }

    }
  
    //  uploadOnCloudinary('/home/admin123/Desktop/projject-1/backend/public/defauldProfile.jpeg')

   module.exports = {
     uploadOnCloudinary
   }
