const { readdirSync, writeFileSync } = require("fs");
const { join } = require("path");

const dir = join(process.cwd(), "public/img/testimonials");
const files = readdirSync(dir);
const imageFiles = files.filter((f) => /\.(jpe?g|png|webp|gif)$/i.test(f));
writeFileSync(
  "content/testimonials.json",
  JSON.stringify({
    body: imageFiles.map((file) => `/img/testimonials/${file}`),
  })
);
