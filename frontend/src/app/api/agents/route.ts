import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const API_URL = 'https://api.virtuals.io/api/virtuals';
const MONITORED_AGENTS_FILE = path.join(process.cwd(), 'config', 'monitored-agents.json');

async function fetchAllAgents() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`API error: Status ${response.status}`);
    }
    
    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error('Error fetching all agents:', error);
    return [];
  }
}

async function fetchAgentData(agentId: string) {
  const params = new URLSearchParams({
    'pagination[page]': '1',
    'filters[id][$eq]': agentId,
  });

  try {
    const response = await fetch(`${API_URL}?${params}`);
    if (!response.ok) {
      throw new Error(`API error: Status ${response.status}`);
    }
    
    const data = await response.json();
    const agents = data.data || [];
    
    if (!agents.length) {
      console.error("No agent found with ID:", agentId);
      return null;
    }
    
    const agent = agents[0];
    return {
      id: agent.id,
      name: agent.name || `Agent #${agent.id}`,
      category: (agent.category || 'BASE').toUpperCase(),
      mcapInVirtual: agent.mcapInVirtual || 0,
      holderCount: agent.holderCount || 0,
    };
  } catch (error) {
    console.error('Error fetching agent data:', error);
    return null;
  }
}

// Get all available agents or monitored agents
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const getAll = searchParams.get('all') === 'true';

  try {
    if (getAll) {
      // Fetch all available agents
      const allAgents = await fetchAllAgents();
      const formattedAgents = allAgents.map((agent: any) => ({
        id: agent.id,
        name: agent.name || `Agent #${agent.id}`,
        category: (agent.category || 'BASE').toUpperCase(),
        mcapInVirtual: agent.mcapInVirtual || 0,
        holderCount: agent.holderCount || 0,
      }));
      return NextResponse.json({ agents: formattedAgents });
    }

    // Otherwise, fetch only monitored agents
    let monitoredAgents = ['15729']; // Default to H1DR4
    if (fs.existsSync(MONITORED_AGENTS_FILE)) {
      const fileContent = fs.readFileSync(MONITORED_AGENTS_FILE, 'utf-8');
      monitoredAgents = JSON.parse(fileContent);
    } else {
      // Create config directory if it doesn't exist
      const configDir = path.dirname(MONITORED_AGENTS_FILE);
      if (!fs.existsSync(configDir)) {
        fs.mkdirSync(configDir, { recursive: true });
      }
      // Save default agent list
      fs.writeFileSync(MONITORED_AGENTS_FILE, JSON.stringify(monitoredAgents));
    }

    // Fetch data for each monitored agent
    const agentPromises = monitoredAgents.map(fetchAgentData);
    const agents = await Promise.all(agentPromises);
    
    // Filter out null results and return valid agents
    const validAgents = agents.filter(agent => agent !== null);
    
    return NextResponse.json({ agents: validAgents });
  } catch (error) {
    console.error('Error in GET /api/agents:', error);
    return NextResponse.json(
      { error: 'Failed to fetch agents' },
      { status: 500 }
    );
  }
}

// Add new agent to monitor
export async function POST(request: Request) {
  try {
    const { agentId } = await request.json();
    
    // Validate agent ID
    if (!agentId) {
      return NextResponse.json(
        { error: 'Agent ID is required' },
        { status: 400 }
      );
    }

    // Read current monitored agents
    let monitoredAgents = [];
    if (fs.existsSync(MONITORED_AGENTS_FILE)) {
      const fileContent = fs.readFileSync(MONITORED_AGENTS_FILE, 'utf-8');
      monitoredAgents = JSON.parse(fileContent);
    }

    // Check if agent is already being monitored
    if (monitoredAgents.includes(agentId)) {
      return NextResponse.json(
        { error: 'Agent is already being monitored' },
        { status: 400 }
      );
    }

    // Add new agent
    monitoredAgents.push(agentId);
    fs.writeFileSync(MONITORED_AGENTS_FILE, JSON.stringify(monitoredAgents));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in POST /api/agents:', error);
    return NextResponse.json(
      { error: 'Failed to add agent' },
      { status: 500 }
    );
  }
}

// Remove agent from monitoring
export async function DELETE(request: Request) {
  try {
    const { agentId } = await request.json();
    
    // Validate agent ID
    if (!agentId) {
      return NextResponse.json(
        { error: 'Agent ID is required' },
        { status: 400 }
      );
    }

    // Read current monitored agents
    if (!fs.existsSync(MONITORED_AGENTS_FILE)) {
      return NextResponse.json(
        { error: 'No agents are being monitored' },
        { status: 404 }
      );
    }

    const fileContent = fs.readFileSync(MONITORED_AGENTS_FILE, 'utf-8');
    let monitoredAgents = JSON.parse(fileContent);

    // Remove agent
    monitoredAgents = monitoredAgents.filter(id => id !== agentId);
    fs.writeFileSync(MONITORED_AGENTS_FILE, JSON.stringify(monitoredAgents));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in DELETE /api/agents:', error);
    return NextResponse.json(
      { error: 'Failed to remove agent' },
      { status: 500 }
    );
  }
}

// Handle OPTIONS requests for CORS
export async function OPTIONS() {
  return NextResponse.json({}, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}
