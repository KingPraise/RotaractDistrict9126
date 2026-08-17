const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// Load environment variables from .env.local
function loadEnv() {
  const envPath = path.resolve(process.cwd(), '.env.local');
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf-8');
    envContent.split('\n').forEach((line) => {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) return;
      const equalsIdx = trimmed.indexOf('=');
      if (equalsIdx > 0) {
        const key = trimmed.substring(0, equalsIdx).trim();
        let val = trimmed.substring(equalsIdx + 1).trim();
        if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
          val = val.substring(1, val.length - 1);
        }
        process.env[key] = val;
      }
    });
  }
}

loadEnv();

async function testCloudinaryPipeline() {
  console.log('🚀 Testing Cloudinary Upload Signature Generation & Live Upload...');

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  console.log(`☁️ Cloud Name: ${cloudName}`);
  console.log(`🔑 API Key:    ${apiKey}`);
  console.log(`🔒 Secret configured: ${apiSecret ? 'Yes' : 'No'}`);

  if (!cloudName || !apiKey || !apiSecret) {
    throw new Error('Cloudinary environment variables missing!');
  }

  const folder = 'rotaract_district_9126/verification';
  const timestamp = Math.round(new Date().getTime() / 1000);

  // Cloudinary signature algorithm: alphabetically sorted parameters + secret
  const paramsToSign = `folder=${folder}&timestamp=${timestamp}${apiSecret}`;
  const signature = crypto.createHash('sha1').update(paramsToSign).digest('hex');

  console.log(`\n📝 Generated Signature: ${signature}`);
  console.log(`⏱️ Timestamp: ${timestamp}`);
  console.log(`📁 Target Folder: ${folder}`);

  // Test Direct Upload to Cloudinary using Form Data
  console.log('\n📤 Testing live signed direct upload to Cloudinary API...');
  
  // 1x1 transparent PNG data URI
  const testBase64Image = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';

  const formData = new FormData();
  formData.append('file', testBase64Image);
  formData.append('api_key', apiKey);
  formData.append('timestamp', timestamp.toString());
  formData.append('signature', signature);
  formData.append('folder', folder);

  const uploadUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
  const res = await fetch(uploadUrl, {
    method: 'POST',
    body: formData,
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Cloudinary upload failed: ${errorText}`);
  }

  const result = await res.json();
  console.log('✅ Cloudinary direct upload SUCCESSFUL!');
  console.log(`🖼️ Secure URL: ${result.secure_url}`);
  console.log(`🆔 Public ID:  ${result.public_id}`);
  console.log(`📐 Format:     ${result.format} (${result.bytes} bytes)`);

  console.log('\n🎉 CLOUDINARY SIGNATURE GENERATOR & UPLOAD PIPELINE FULLY VERIFIED!');
  process.exit(0);
}

testCloudinaryPipeline().catch((err) => {
  console.error('\n❌ Cloudinary verification failed:', err);
  process.exit(1);
});
