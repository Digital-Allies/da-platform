const fs = require('fs');
const path = require('path');

const srcDir = '/Users/cuus/Claude/projects/da-platform/sites/atomic-finds/scroll-animation-hero-component/assets/jf';
const destDir = '/Users/cuus/Claude/projects/da-platform/sites/atomic-finds/scroll-animation-hero-2/assets/jenny';

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

const frameSources = {
  1: { file: 'Frame (2)/Frame/001_Frame_1_DHN9MVCO.png', ext: 'png' },
  2: { file: '031_Frame_2_uUIE9MxP.jpg', ext: 'jpg' },
  3: { file: '030_Frame_3_xCG9J_3-.png', ext: 'png' },
  4: { file: '029_Frame_4_igqbSLO7.png', ext: 'png' },
  5: { file: '028_Frame_6_OgFPIlMR.png', ext: 'png' },
  6: { file: '027_Frame_7_tUGJK7T9.png', ext: 'png' },
  7: { file: '026_Frame_8_8Ex4sq90.png', ext: 'png' }
};

console.log('Copying frames...');
for (const [frameNum, info] of Object.entries(frameSources)) {
  const srcPath = path.join(srcDir, info.file);
  const destPath = path.join(destDir, `frame-${frameNum}.${info.ext}`);
  
  if (!fs.existsSync(srcPath)) {
    console.error(`Source file not found: ${srcPath}`);
    continue;
  }
  
  console.log(`Copying ${srcPath} -> ${destPath}`);
  try {
    fs.copyFileSync(srcPath, destPath);
    console.log(`Successfully copied frame ${frameNum}`);
  } catch (err) {
    console.error(`Error copying frame ${frameNum}:`, err.message);
  }
}
console.log('Done.');
