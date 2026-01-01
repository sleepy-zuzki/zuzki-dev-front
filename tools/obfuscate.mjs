import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import JavaScriptObfuscator from "javascript-obfuscator";

const root = path.resolve(fileURLToPath(import.meta.url), "../../");
const distDir = path.resolve(root, "dist/cloudflare");

console.log("🔒 Starting code obfuscation...");

function getFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(getFiles(file));
    } else {
      if (file.endsWith(".js") || file.endsWith(".mjs")) {
        results.push(file);
      }
    }
  });
  return results;
}

const files = getFiles(distDir);
let obfuscatedCount = 0;

files.forEach(filePath => {
  // Skip polyfills or specific files if needed to avoid breaking them
  // if (filePath.includes('polyfills')) return;

  const content = fs.readFileSync(filePath, "utf8");
  
  // Skip if already empty or very small
  if (content.length < 100) return;

  // Reduced options for server files to avoid URI malformed errors
  const isServerFile = filePath.includes('server.mjs') || filePath.includes('_worker.js');
  
  if (filePath.includes('_worker.js')) {
    console.log(`⏩ Skipping server file: ${path.relative(root, filePath)}`);
    return;
  }
  
  const options = {
      compact: true,
      controlFlowFlattening: !isServerFile,
      controlFlowFlatteningThreshold: 0.75,
      deadCodeInjection: !isServerFile,
      deadCodeInjectionThreshold: 0.4,
      debugProtection: false, 
      debugProtectionInterval: 0,
      disableConsoleOutput: true,
      identifierNamesGenerator: 'hexadecimal',
      log: false,
      numbersToExpressions: !isServerFile,
      renameGlobals: false,
      selfDefending: !isServerFile,
      simplify: true,
      splitStrings: !isServerFile,
      splitStringsChunkLength: 10,
      stringArray: !isServerFile,
      stringArrayCallsTransform: !isServerFile,
      stringArrayCallsTransformThreshold: 0.75,
      stringArrayEncoding: ['rc4'],
      stringArrayIndexShift: true,
      stringArrayRotate: true,
      stringArrayShuffle: true,
      stringArrayWrappersCount: 2,
      stringArrayWrappersChainedCalls: true,
      stringArrayWrappersParametersMaxCount: 4,
      stringArrayWrappersType: 'function',
      stringArrayThreshold: 0.75,
      transformObjectKeys: !isServerFile,
      unicodeEscapeSequence: false
  };

  try {
    const obfuscationResult = JavaScriptObfuscator.obfuscate(content, options);

    fs.writeFileSync(filePath, obfuscationResult.getObfuscatedCode());
    obfuscatedCount++;
    console.log(`✅ Obfuscated: ${path.relative(root, filePath)}`);
  } catch (error) {
    console.error(`❌ Error obfuscating ${path.relative(root, filePath)}:`, error);
  }
});

console.log(`🎉 Obfuscation complete. Processed ${obfuscatedCount} files.`);
