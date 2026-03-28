import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3001;

// Admin password (change in .env if desired)
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

app.use(cors());
// Need larger payload limit in case JSON gets big
app.use(express.json({ limit: '50mb' }));

// Middleware to check admin password
const requireAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || authHeader !== `Bearer ${ADMIN_PASSWORD}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
};

const dataFile = path.join(__dirname, 'src/data/portfolio.json');

// Ensure data directory exists
const dataDir = path.dirname(dataFile);
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Ensure the json file exists
if (!fs.existsSync(dataFile)) {
  fs.writeFileSync(dataFile, JSON.stringify({ categories: [] }, null, 2));
}

// API Routes

// Verify password
app.post('/api/verify', (req, res) => {
  const { password } = req.body;
  if (password === ADMIN_PASSWORD) {
    res.json({ success: true });
  } else {
    res.status(401).json({ error: 'Invalid password' });
  }
});

// Get current portfolio JSON data (useful for admin panel to fetch the raw data directly if needed, though vite handles it via import for the main site)
app.get('/api/portfolio', (req, res) => {
  try {
    const rawData = fs.readFileSync(dataFile, 'utf-8');
    res.json(JSON.parse(rawData));
  } catch (err) {
    res.status(500).json({ error: 'Failed to read data file' });
  }
});

// Overwrite the entire dataset (from the admin panel)
app.post('/api/portfolio', requireAuth, (req, res) => {
  try {
    const newData = req.body;
    // Basic validation
    if (!newData || !Array.isArray(newData.categories)) {
      return res.status(400).json({ error: 'Invalid data format' });
    }
    fs.writeFileSync(dataFile, JSON.stringify(newData, null, 2));
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to write data file' });
  }
});

app.listen(port, () => {
  console.log(`JSON CMS API attached! Admin running on port ${port}`);
});
