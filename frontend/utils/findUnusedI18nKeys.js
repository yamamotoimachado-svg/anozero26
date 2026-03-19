// Script to find missing i18n keys used in the code but not present in en.json or pt.json
// Usage: node utils/findUnusedI18nKeys.js

const fs = require('fs');
const path = require('path');

const i18nDir = path.join(__dirname, '../i18n');
const enPath = path.join(i18nDir, 'en.json');
const ptPath = path.join(i18nDir, 'pt.json');

function getAllKeys(obj, prefix = '') {
  return Object.keys(obj).flatMap(key => {
    const value = obj[key];
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (typeof value === 'object' && value !== null) {
      return getAllKeys(value, fullKey);
    }
    return [fullKey];
  });
}

function findKeysInCode(dir, exts = ['.ts', '.tsx', '.js', '.jsx']) {
  let keys = new Set();
  function search(filePath) {
    if (fs.statSync(filePath).isDirectory()) {
      fs.readdirSync(filePath).forEach(f => search(path.join(filePath, f)));
    } else if (exts.includes(path.extname(filePath))) {
      const content = fs.readFileSync(filePath, 'utf8');
      const regex = /t\(['"`]([\w.-]+)['"`]/g;
      let match;
      while ((match = regex.exec(content))) {
        keys.add(match[1]);
      }
    }
  }
  search(path.join(__dirname, '../'));
  return Array.from(keys);
}

const en = JSON.parse(fs.readFileSync(enPath, 'utf8'));
const pt = JSON.parse(fs.readFileSync(ptPath, 'utf8'));
const enKeys = new Set(getAllKeys(en));
const ptKeys = new Set(getAllKeys(pt));
const usedKeys = findKeysInCode(path.join(__dirname, '../'));

const missingEn = usedKeys.filter(k => !enKeys.has(k));
const missingPt = usedKeys.filter(k => !ptKeys.has(k));

console.log('Missing keys in en.json:', missingEn);
console.log('Missing keys in pt.json:', missingPt);
