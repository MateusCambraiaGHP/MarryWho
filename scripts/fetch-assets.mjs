import { mkdir, readFile, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const userAgent =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36';

const heroPath = 'dados/sitenoivos/wed1588950/custom/tema48_img_color_master_6aa3fc84332cb1789131908.jpg';
const heroImages = [
  {
    url: `https://cdn-assets-legacy.casar.com/thumb/1920x1080x1/${heroPath}`,
    target: 'public/img/hero-1920.jpg',
  },
  {
    url: `https://cdn-assets-legacy.casar.com/thumb/960x540x1/${heroPath}`,
    target: 'public/img/hero-960.jpg',
  },
];

const coupleBase = 'https://cdn-assets-legacy.casar.com/dados/sitenoivos/wed1588950/paginas/';
const coupleImages = [
  { file: '50azu_1791646528.jpg', target: 'public/img/casal-01.jpg' },
  { file: 'fNWI4_1791645922.jpg', target: 'public/img/casal-02.jpg' },
  { file: 'LmpV0_1789133063.jpg', target: 'public/img/casal-03.jpg' },
  { file: 'CXzF2_1791646642.jpg', target: 'public/img/casal-04.jpg' },
].map((entry) => ({ url: `${coupleBase}${entry.file}`, target: entry.target }));

const giftImageBase = 'https://cdn-assets-legacy.casar.com/thumb/208x208x1';

async function buildGiftImages() {
  const raw = await readFile(path.join(projectRoot, 'research/gifts-raw.txt'), 'utf8');
  return raw
    .split(/\r?\n/)
    .filter((line) => line.trim().length > 0)
    .map((line) => {
      const [id, , , imageFile] = line.split('|');
      const extension = path.extname(imageFile).toLowerCase();
      const remote =
        imageFile.startsWith('casamento/')
          ? `${giftImageBase}/img/presentes/${imageFile}`
          : `${giftImageBase}/dados/sitenoivos/wed1588950/presentes/${imageFile}`;
      return { url: remote, target: `public/img/gifts/${id}${extension}` };
    });
}

async function downloadAsset({ url, target }, failures) {
  const absoluteTarget = path.join(projectRoot, target);

  try {
    const existing = await stat(absoluteTarget);
    if (existing.size > 0) {
      console.log(`skip   ${target} (${existing.size} bytes)`);
      return;
    }
  } catch {
    // File does not exist yet.
  }

  try {
    const response = await fetch(url, {
      headers: { 'User-Agent': userAgent },
      signal: AbortSignal.timeout(45000),
    });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    const buffer = Buffer.from(await response.arrayBuffer());
    if (buffer.byteLength === 0) {
      throw new Error('empty response');
    }
    await mkdir(path.dirname(absoluteTarget), { recursive: true });
    await writeFile(absoluteTarget, buffer);
    console.log(`ok     ${target} (${buffer.byteLength} bytes)`);
  } catch (error) {
    failures.push({ url, target, message: error instanceof Error ? error.message : String(error) });
    console.error(`FAIL   ${target} — ${error instanceof Error ? error.message : String(error)}`);
  }
}

const fontCssUrl =
  'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400&family=Lato:wght@300;400;700&display=swap';

function slugifyFamily(family) {
  return family.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

async function downloadFonts(failures) {
  const response = await fetch(fontCssUrl, { headers: { 'User-Agent': userAgent } });
  if (!response.ok) {
    throw new Error(`Google Fonts CSS HTTP ${response.status}`);
  }
  const css = await response.text();
  const blocks = css.split('/*').slice(1);
  const fontTargetDirectory = 'src/styles/fonts';
  const faces = [];

  for (const block of blocks) {
    const subset = block.slice(0, block.indexOf('*/')).trim();
    if (subset !== 'latin') {
      continue;
    }
    const body = block.slice(block.indexOf('*/') + 2);
    const family = body.match(/font-family: '([^']+)'/)?.[1];
    const style = body.match(/font-style: (\w+)/)?.[1];
    const weight = body.match(/font-weight: (\d+)/)?.[1];
    const fontUrl = body.match(/url\((https:[^)]+\.woff2)\)/)?.[1];
    const unicodeRange = body.match(/unicode-range: ([^;]+);/)?.[1];
    if (!family || !style || !weight || !fontUrl) {
      continue;
    }

    const fileName = `${slugifyFamily(family)}-${weight}-${style}.woff2`;
    const target = `${fontTargetDirectory}/${fileName}`;
    await downloadAsset({ url: fontUrl, target }, failures);
    faces.push({ family, style, weight, fileName, unicodeRange });
  }

  const cssLines = faces.flatMap((face) => [
    '@font-face {',
    `  font-family: '${face.family}';`,
    `  font-style: ${face.style};`,
    `  font-weight: ${face.weight};`,
    '  font-display: swap;',
    `  src: url('./fonts/${face.fileName}') format('woff2');`,
    ...(face.unicodeRange ? [`  unicode-range: ${face.unicodeRange};`] : []),
    '}',
    '',
  ]);

  await writeFile(path.join(projectRoot, 'src/styles/fonts.css'), cssLines.join('\n'));
  console.log(`wrote  src/styles/fonts.css (${faces.length} faces)`);
}

async function main() {
  const failures = [];
  const giftImages = await buildGiftImages();
  const assets = [...heroImages, ...coupleImages, ...giftImages];

  console.log(`Downloading ${assets.length} images...`);
  for (const asset of assets) {
    await downloadAsset(asset, failures);
  }

  console.log('Downloading self-hosted fonts...');
  try {
    await downloadFonts(failures);
  } catch (error) {
    failures.push({
      url: fontCssUrl,
      target: 'src/styles/fonts.css',
      message: error instanceof Error ? error.message : String(error),
    });
    console.error(`FAIL   fonts — ${error instanceof Error ? error.message : String(error)}`);
  }

  console.log(`\nDone. ${assets.length} images, ${failures.length} failure(s).`);
  if (failures.length > 0) {
    for (const failure of failures) {
      console.error(`- ${failure.target}: ${failure.message} (${failure.url})`);
    }
    process.exitCode = 1;
  }
}

await main();
