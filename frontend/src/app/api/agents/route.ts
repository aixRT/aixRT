import { NextResponse } from 'next/server';
import { getAgentUID, getAccessToken } from '@/lib/virtualsApi';

export async function GET() {
  try {
    // For testing, we'll use Luna's ID (68)
    const agentData = await getAgentUID('68');
    
    // Add mock data for now
    const mockAgents = [
      {
        id: agentData.data.uid,
        name: "Luna",
        ticker: "LUNA",
        category: "IP_MIRROR",
        marketCap: 50000,
        holders: 1200
      },
      {
        id: "39c50d2e-345f-457a-b021-8b2d83dc67ef", // Example agent ID
        name: "GAME",
        ticker: "GAME",
        category: "FUNCTIONAL",
        marketCap: 500,
        holders: 0
      }
    ];

    return NextResponse.json({ agents: mockAgents });
  } catch (error) {
    console.error('Error in agents route:', error);
    return NextResponse.json(
      { error: 'Failed to fetch agents' },
      { status: 500 }
    );
  }
}