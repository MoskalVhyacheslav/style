import { v4 as uuidv4 } from 'uuid';

const OUTFIT_TITLES = [
  'Weekend Essentials',
  'Office Ready',
  'Casual Friday',
  'Date Night',
  'Smart Casual',
  'Relaxed Vibes',
  'Urban Explorer',
  'Minimalist Look',
  'Evening Out'
];

/**
 * Fetch images from Unsplash API
 * Fallback: use Unsplash Source (no API key) for demo
 */
export async function fetchOutfitImages(keywords, count = 7) {
  const accessKey = process.env.UNSPLASH_ACCESS_KEY;
  
  if (accessKey) {
    return fetchFromUnsplashAPI(keywords, count);
  }
  
  // Demo fallback: Unsplash Source (no auth)
  const keyword = keywords[0]?.replace(/\s+/g, ',') || 'menswear';
  const baseUrl = `https://images.unsplash.com/photo-`;
  
  // Curated menswear/fashion placeholder IDs from Unsplash
  const demoImageIds = [
    '1507003211169-0a1dd7228f2d', // casual outfit
    '1617137969907-62d4c41e2f1e', // smart casual
    '1507679799987-c73779587ccf', // businessman
    '1562157873-818bc0726f68',   // street style
    '1515886657613-9f3515b0c78f', // fashion
    '1489987707025-afc232f7ea0f', // outfit
    '1582552938357-32b906df40cb', // casual
    '1594938298603-c8148c4dae35', // style
    '1516259762381-22954d7d3ad2', // street
    '1525811902-fa6cf35932b3'    // fashion
  ];

  const outfits = [];
  const usedIds = new Set();
  
  for (let i = 0; i < Math.min(7, demoImageIds.length); i++) {
    const id = demoImageIds[i % demoImageIds.length];
    const url = `https://images.unsplash.com/photo-${id}?w=600&q=80`;
    outfits.push({
      id: uuidv4(),
      title: OUTFIT_TITLES[i % OUTFIT_TITLES.length],
      images: [{ url, alt: `Outfit ${i + 1}` }]
    });
  }
  
  return outfits;
}

async function fetchFromUnsplashAPI(keywords, count) {
  const accessKey = process.env.UNSPLASH_ACCESS_KEY;
  const query = keywords[0] || 'menswear casual';
  
  const res = await fetch(
    `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=${count}&orientation=portrait`,
    { headers: { Authorization: `Client-ID ${accessKey}` } }
  );
  
  if (!res.ok) {
    throw new Error('Unsplash API error');
  }
  
  const data = await res.json();
  const photos = data.results || [];
  
  return photos.slice(0, 7).map((photo, i) => ({
    id: photo.id,
    title: OUTFIT_TITLES[i % OUTFIT_TITLES.length],
    images: [{
      url: photo.urls?.regular,
      alt: photo.alt_description || `Outfit ${i + 1}`
    }]
  }));
}

/**
 * Generate moodboard with 5-10 outfit cards
 */
export async function generateMoodboard(styleProfile) {
  const keywords = styleProfile.keywords || ['menswear casual'];
  const outfits = await fetchOutfitImages(keywords, 7);
  return outfits;
}
