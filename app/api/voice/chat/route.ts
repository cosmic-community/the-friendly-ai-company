import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Missing message' }, { status: 400 });
    }

    const bucketSlug = process.env.COSMIC_BUCKET_SLUG;
    const agentSlug = 'hal';

    if (!bucketSlug) {
      return NextResponse.json({ error: 'Cosmic bucket not configured' }, { status: 500 });
    }

    // Send message to HAL via Cosmic Agent API
    const response = await fetch(
      `https://agents-api.cosmicjs.com/v1/${bucketSlug}/agents/${agentSlug}/messages`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: `[VOICE ASSISTANT] ${message}`,
          stream: false,
        }),
      }
    );

    if (!response.ok) {
      const errText = await response.text();
      console.error('Cosmic Agent API error:', response.status, errText);
      return NextResponse.json(
        { reply: "I'm having trouble connecting right now. Please try again in a moment." },
        { status: 200 }
      );
    }

    const data = await response.json();
    
    // Extract the reply text from the agent response
    let reply = '';
    if (data.message) {
      reply = data.message;
    } else if (data.response) {
      reply = data.response;
    } else if (data.content) {
      reply = data.content;
    } else if (typeof data === 'string') {
      reply = data;
    } else {
      reply = JSON.stringify(data);
    }

    // Clean up markdown formatting for speech
    reply = reply
      .replace(/\*\*([^*]+)\*\*/g, '$1') // bold
      .replace(/\*([^*]+)\*/g, '$1') // italic
      .replace(/`([^`]+)`/g, '$1') // code
      .replace(/```[\s\S]*?```/g, '') // code blocks
      .replace(/#{1,6}\s/g, '') // headings
      .replace(/!\[.*?\]\(.*?\)/g, '') // images
      .replace(/\[([^\]]+)\]\(.*?\)/g, '$1') // links
      .replace(/<[^>]+>/g, '') // HTML tags
      .replace(/\n{3,}/g, '\n\n') // excessive newlines
      .trim();

    return NextResponse.json({ reply });
  } catch (err) {
    console.error('Chat route error:', err);
    return NextResponse.json(
      { reply: "Sorry, something went wrong. Please try again." },
      { status: 200 }
    );
  }
}
