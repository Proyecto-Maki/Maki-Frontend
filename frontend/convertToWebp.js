import fs from "fs";
import path from "path";
import sharp from "sharp";

const inputFolder = "./src/img/sub_cat_roedor"; 
const outputFolder = "./src/img-webp/sub_cat_roedor"; 

fs.mkdirSync(outputFolder, { recursive: true });

fs.readdirSync(inputFolder).forEach((file) => {
  const ext = path.extname(file).toLowerCase();
  const validFormats = [".jpg", ".jpeg", ".png"];

  if (validFormats.includes(ext)) {
    const inputPath = path.join(inputFolder, file);
    const outputPath = path.join(outputFolder, file.replace(ext, ".webp"));

    sharp(inputPath)
      .toFormat("webp")
      .toFile(outputPath)
      .then(() => console.log(`✅ Convertido: ${file} -> ${outputPath}`))
      .catch((err) => console.error(`❌ Error en ${file}:`, err.message));
  }
});
