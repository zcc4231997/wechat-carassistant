import fs from 'node:fs/promises';
import QRCode from 'qrcode';
const url=process.argv[2];
if(!url||!/^https:\/\//.test(url))throw new Error('Usage: npm run qr -- https://YOUR-DOMAIN/download.html');
await QRCode.toFile('public/assets/download-qr.svg',url,{type:'svg',margin:4,errorCorrectionLevel:'M',color:{dark:'#173b33',light:'#ffffff'}});
const p='public/release.json',data=JSON.parse(await fs.readFile(p,'utf8'));data.siteUrl=new URL('./',url).href;await fs.writeFile(p,JSON.stringify(data,null,2)+'\n');
console.log('Updated QR + siteUrl:',url);
