const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const sourceDir = './image/gallery/';
const targetDir = './image/gallery/thumbnails/';

// Create target directory if it doesn't exist
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// Process all jpg files
fs.readdirSync(sourceDir).forEach(file => {
  if (file.endsWith('.jpg')) {
    sharp(path.join(sourceDir, file))
      .resize(300) // 300px width, maintain aspect ratio
      .toFile(path.join(targetDir, file.replace('.jpg', '-thumbnail.jpg')))
      .then(() => console.log(`Created thumbnail for ${file}`))
      .catch(err => console.error(`Error processing ${file}:`, err));
  }
});