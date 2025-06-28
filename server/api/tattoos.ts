import { readFileSync, readdirSync } from "fs";
import { join } from "path";

export default defineEventHandler(() => {
  const dirPath = join(process.cwd(), "public/img/minified");
  const files = readdirSync(dirPath);
  // Filter only image files (optional)
  const imageFiles = files.filter((f) => /\.(jpe?g|png|webp|gif)$/i.test(f));
  return imageFiles.map((file) => `/img/minified/${file}`);
});
