const sharp = require('sharp');
const path = require('path');

const inputPath = path.join(__dirname, 'public/herosection-photo-transparent.png');
const outputPath = path.join(__dirname, 'public/herosection-photo-transparent-cropped.png');

async function cropImage() {
  try {
    const image = sharp(inputPath);
    const metadata = await image.metadata();
    
    // We keep 82% of the height from the top (dropping the very bottom 18% perfectly per the blue line)
    const newHeight = Math.floor(metadata.height * 0.82);
    
    await image
      .extract({ left: 0, top: 0, width: metadata.width, height: newHeight })
      .toFile(outputPath);
      
    console.log(`Cropped successfully! Old height: ${metadata.height}, New height: ${newHeight}`);
  } catch (error) {
    console.error('Error cropping image:', error);
  }
}

cropImage();
