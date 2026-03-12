import { chromium } from '@playwright/test';
import sharp from 'sharp';
import axios from 'axios';
import fs from 'fs';
import path from 'path';

const urls = [
  'https://hebrew.alibaba.com/product-detail/subject-1601490500876.html?from=share&ckvia=share_CA236170546C45328A78A5659B451FDA&needReward=true',
  'https://hebrew.alibaba.com/product-detail/subject-1601448231552.html?from=share&ckvia=share_E1A8283528BF43048E7BBB0200F873D9&needReward=true',
  'https://hebrew.alibaba.com/product-detail/subject-1601636799480.html?from=share&ckvia=share_854F8DD3E1B142E2A53EC82C88107579&needReward=true',
  'https://hebrew.alibaba.com/product-detail/subject-1601541446206.html?from=share&ckvia=share_955E84763C8045FBB6D34E269B78A119&needReward=true',
  'https://alibaba.com/x/1lAQKWN?ck=pdp',
  'https://hebrew.alibaba.com/product-detail/subject-1600801432628.html?from=share&ckvia=share_3CFAF3A643F24B02AC6430DBA8ECF7EB&needReward=true',
  'https://hebrew.alibaba.com/product-detail/subject-1601566774348.html?from=share&ckvia=share_6874F7AC2DFB4C84B999421BBA73EEE3&needReward=true',
  'https://hebrew.alibaba.com/product-detail/subject-1600565330574.html?from=share&ckvia=share_51778CB991A54D999440009B75654BC5&needReward=true',
  'https://hebrew.alibaba.com/product-detail/subject-1601518304062.html?from=share&ckvia=share_578BB2B0A61B45839AEE75BACA5679E0&needReward=true'
];

async function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function scrape() {
  const products = [];
  const browser = await chromium.launch({ headless: false }); // running non-headless briefly to avoid instant bot block
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  });
  
  const page = await context.newPage();
  
  const logoPath = path.join(process.cwd(), 'public', 'veloura-logo.png');
  const outDir = path.join(process.cwd(), 'public', 'products');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  for (let i = 0; i < urls.length; i++) {
    console.log(`Processing ${i + 1}/${urls.length}...`);
    try {
      await page.goto(urls[i], { waitUntil: 'domcontentloaded', timeout: 30000 });
      await delay(5000); // let it load

      // If there's a captcha, taking a screenshot so we know
      const isCaptcha = await page.$('.nc-container');
      if (isCaptcha) {
        console.log(`Captcha on item ${i}, screenshotting...`);
        await page.screenshot({ path: `captcha_${i}.png` });
        // We can't proceed with this URL easily, but we'll try grabbing OG tags just in case
      }

      // get titles via raw og tag or primary h1
      let title = await page.evaluate(() => {
        const ogTitle = document.querySelector('meta[property="og:title"]');
        if (ogTitle) return ogTitle.content;
        return document.title;
      });

      // get main image via og:image or first gallery image
      let imageUrl = await page.evaluate(() => {
        const ogImage = document.querySelector('meta[property="og:image"]');
        if (ogImage) return ogImage.content;
        const img = document.querySelector('.main-image-img, .detail-next-slick-slide img');
        return img ? img.src : null;
      });

      console.log(`Title: ${title}, Image: ${imageUrl}`);
      
      if (imageUrl) {
        if (imageUrl.startsWith('//')) imageUrl = 'https:' + imageUrl;
        
        // download image
        const imgResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' });
        const imgBuffer = Buffer.from(imgResponse.data);
        
        // overlay logo using sharp
        const baseImgPath = path.join(outDir, `product_${i + 1}.jpg`);
        const finalImgPath = path.join(outDir, `product_${i + 1}_logo.jpg`);
        
        // Save original just in case
        fs.writeFileSync(baseImgPath, imgBuffer);
        
        // Read the base image to get its dimensions
        const baseMeta = await sharp(imgBuffer).metadata();
        
        // Resize logo to be 20% of the image width
        const logoWidth = Math.max(Math.floor(baseMeta.width * 0.2), 100);
        
        const logoBuffer = await sharp(logoPath)
          .resize(logoWidth)
          .toBuffer();
          
        await sharp(imgBuffer)
          .composite([{ input: logoBuffer, gravity: 'center' }])
          .toFile(finalImgPath);
          
        products.push({
          id: `alibaba-${i+1}`,
          title: title,
          image: `/products/product_${i+1}_logo.jpg`,
          originalUrl: urls[i]
        });
        console.log(`Saved product_${i + 1}`);
      } else {
        console.log(`No image found for ${i + 1}`);
        products.push({
          id: `alibaba-${i+1}`,
          title: title || `Product ${i+1}`,
          image: null,
          originalUrl: urls[i]
        });
      }

    } catch (err) {
      console.error(`Error on url ${i}:`, err.message);
    }
  }

  await browser.close();
  
  // write metadata
  fs.writeFileSync(path.join(outDir, 'metadata.json'), JSON.stringify(products, null, 2));
  console.log('Done!');
}

scrape();
