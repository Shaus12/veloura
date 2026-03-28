import { chromium } from '@playwright/test';
import sharp from 'sharp';
import axios from 'axios';
import fs from 'fs';
import path from 'path';

const urls = [
  'https://a.aliexpress.com/_c2uSU2l9',
  'https://a.aliexpress.com/_c4DafoKB',
  'https://a.aliexpress.com/_c3qwjVsf',
  'https://a.aliexpress.com/_c3baOW3t',
  'https://a.aliexpress.com/_c2uf82Nz',
  'https://a.aliexpress.com/_c3E4fhJz',
  'https://a.aliexpress.com/_c4t5mlUf',
  'https://a.aliexpress.com/_c3WbCoux'
];

async function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function scrape() {
  const products = [];
  const browser = await chromium.launch({ headless: false }); // running non-headless
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    viewport: { width: 1280, height: 800 }
  });
  
  const page = await context.newPage();
  
  const logoPath = path.join(process.cwd(), 'src', 'assets', 'product_classic_1773579003841.png'); // placeholder for logo overlay if needed, or ignore
  const outDir = path.join(process.cwd(), 'public', 'products');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  for (let i = 0; i < urls.length; i++) {
    console.log(`Processing ${i + 1}/${urls.length}: ${urls[i]}`);
    try {
      await page.goto(urls[i], { waitUntil: 'domcontentloaded', timeout: 30000 });
      await delay(8000); // let it load its anti-bot and redirect
      
      // Wait for the title to be populated
      const title = await page.evaluate(() => {
        const h1 = document.querySelector('h1[data-pl="product-title"]');
        if (h1) return h1.innerText.trim();
        const ogTitle = document.querySelector('meta[property="og:title"]');
        if (ogTitle) return ogTitle.content;
        return document.title;
      });

      const price = await page.evaluate(() => {
        const priceEl = document.querySelector('.product-price-value, .price--currentPriceText--V8_y_b5, span[class*="product-price-value"]');
        return priceEl ? priceEl.innerText.trim() : "99.00";
      });

      let imageUrl = await page.evaluate(() => {
        const ogImage = document.querySelector('meta[property="og:image"]');
        if (ogImage) return ogImage.content;
        const metaImg = document.querySelector('meta[name="twitter:image"]');
        if (metaImg) return metaImg.content;
        const img = document.querySelector('.magnifier-image, .pdp-info-right img, .gallery-image-wrap img');
        return img ? img.src : null;
      });

      console.log(`Title: ${title}`);
      console.log(`Price: ${price} `);
      console.log(`Image: ${imageUrl}`);
      
      if (imageUrl) {
        if (imageUrl.startsWith('//')) imageUrl = 'https:' + imageUrl;
        
        let imgBuffer;
        try {
          const imgResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' });
          imgBuffer = Buffer.from(imgResponse.data);
        } catch (e) {
             console.log("Axios failed, trying page.evaluate to get data URI");
             imgBuffer = Buffer.from("");
        }
        
        const finalImgFileName = `aliexpress_${i + 1}.jpg`;
        const finalImgPath = path.join(outDir, finalImgFileName);
        
        if (imgBuffer.length > 0) {
           fs.writeFileSync(finalImgPath, imgBuffer);
        } else {
           console.log("Could not download image. Will store URL.");
        }
          
        products.push({
          id: `aliexpress-${i+1}`,
          title: title,
          price: price,
          image: `/products/${finalImgFileName}`,
          originalImageUrl: imageUrl,
          originalUrl: urls[i]
        });
        console.log(`Saved aliexpress_${i + 1}`);
      } else {
        console.log(`No image found for ${i + 1}`);
        products.push({
          id: `aliexpress-${i+1}`,
          title: title || `Product ${i+1}`,
          price: price,
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
  fs.writeFileSync(path.join(outDir, 'aliexpress_metadata.json'), JSON.stringify(products, null, 2));
  console.log('Done!');
}

scrape();
