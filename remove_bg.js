const { removeBackground } = require('@imgly/background-removal-node');
const fs = require('fs');

async function processImage() {
  const image_path = 'public/about-me.png';
  try {
    console.log("Removing background from about-me photo...");
    const blob = await removeBackground(image_path);
    const buffer = Buffer.from(await blob.arrayBuffer());
    fs.writeFileSync('public/about-me-transparent.png', buffer);
    console.log('Background removed successfully: public/about-me-transparent.png');
  } catch(e) {
    console.error('Error removing background:', e);
    process.exit(1);
  }
}

processImage();
