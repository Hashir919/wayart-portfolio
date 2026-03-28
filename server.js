import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Define __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
// Render sets PORT automatically. Default to 3001 locally.
const port = process.env.PORT || 3001;

// Admin password (change in .env if desired)
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

// Middleware
app.use(cors());
// Need larger payload limit in case JSON gets big
app.use(express.json({ limit: '50mb' }));

// Helper to check admin password
const requireAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || authHeader !== `Bearer ${ADMIN_PASSWORD}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
};

// Data path - keep it in the src directory as original
const dataFile = path.join(__dirname, 'src/data/portfolio.json');

// Ensure data directory exists
const dataDir = path.dirname(dataFile);
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Ensure the json file exists
if (!fs.existsSync(dataFile)) {
  fs.writeFileSync(dataFile, JSON.stringify({ categories: [], about: {}, contact: {} }, null, 2));
}

// --- API Routes ---

// Verify password
app.post('/api/verify', (req, res) => {
  const { password } = req.body;
  if (password === ADMIN_PASSWORD) {
    res.json({ success: true });
  } else {
    res.status(401).json({ error: 'Invalid password' });
  }
});

// Get current portfolio JSON data
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
    if (!newData || !newData.categories) {
      return res.status(400).json({ error: 'Invalid data format' });
    }
    fs.writeFileSync(dataFile, JSON.stringify(newData, null, 2));
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to write data file' });
  }
});

// --- Frontend Serving (Production Only) ---

// Define path to build output
const distPath = path.resolve(__dirname, 'dist');

// Serve static files from the 'dist' directory
// This MUST come before the catch-all (*) route
app.use(express.static(distPath));

// Support for Single Page Application (SPA) routing
// If a request doesn't match an API route or a static file, return index.html
app.get('*', (req, res) => {
  const indexPath = path.join(distPath, 'index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(404).send("Not Found. Frontend build (dist folder) is missing or incomplete.");
  }
});

// Start Server
app.listen(port, '0.0.0.0', () => {
  console.log(`Server is live on port ${port}`);
  console.log(`Serving frontend from: ${distPath}`);
});
