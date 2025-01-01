const fs = require('fs');
const path = require('path');

// Get the project root directory (two levels up from frontend)
const projectRoot = path.resolve(__dirname, '..', '..');
const configDir = path.join(projectRoot, 'config');
const agentsFile = path.join(configDir, 'monitored-agents.json');

console.log('Project root:', projectRoot);
console.log('Config directory:', configDir);
console.log('Agents file:', agentsFile);

// Default agents data
const defaultAgents = [
  {
    id: "1",
    name: "G.A.M.E",
    ticker: "GAME",
    category: "FUNCTIONAL",
    holders: 158807,
    marketCap: 0,
    price: 0
  }
];

// Create config directory if it doesn't exist
if (!fs.existsSync(configDir)) {
  console.log('Creating config directory...');
  fs.mkdirSync(configDir, { recursive: true });
}

// Create or update the monitored-agents.json file
console.log('Writing default agents data...');
fs.writeFileSync(agentsFile, JSON.stringify(defaultAgents, null, 2));

console.log('Configuration initialized successfully!');
