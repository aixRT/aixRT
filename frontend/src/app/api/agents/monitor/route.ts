import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const CONFIG_PATH = path.join(process.cwd(), 'config');
const MONITORED_AGENTS_FILE = path.join(CONFIG_PATH, 'monitored-agents.json');

// Ensure config directory exists
if (!fs.existsSync(CONFIG_PATH)) {
  fs.mkdirSync(CONFIG_PATH, { recursive: true });
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { agents } = data;

    if (!Array.isArray(agents)) {
      return NextResponse.json(
        { error: 'Invalid agents data' },
        { status: 400 }
      );
    }

    // Save to config file
    fs.writeFileSync(MONITORED_AGENTS_FILE, JSON.stringify(agents, null, 2));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating monitored agents:', error);
    return NextResponse.json(
      { error: 'Failed to update monitored agents' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    if (!fs.existsSync(MONITORED_AGENTS_FILE)) {
      return NextResponse.json({ agents: [] });
    }

    const data = fs.readFileSync(MONITORED_AGENTS_FILE, 'utf-8');
    const agents = JSON.parse(data);

    return NextResponse.json({ agents });
  } catch (error) {
    console.error('Error reading monitored agents:', error);
    return NextResponse.json(
      { error: 'Failed to read monitored agents' },
      { status: 500 }
    );
  }
}
