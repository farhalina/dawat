import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic();

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { recipe } = req.body;

  if (!recipe || typeof recipe !== 'string') {
    return res.status(400).json({ error: 'Missing recipe text' });
  }

  try {
    const message = await client.messages.create({
      model: 'claude-sonnet-4-5',
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: `Extract every ingredient from this recipe with quantity and unit.

Output ONLY a JSON array. No markdown fences, no explanation, no preamble. Start your response with [ and end with ].

Each item shape: { "name": "chicken thighs", "quantity": 1.5, "unit": "lb" }

Rules:
- If quantity isn't given, use null
- If unit isn't given (e.g. "2 onions"), use null
- Lowercase ingredient names
- Strip brand names and adjectives like "fresh" or "organic"
- Combine duplicates

Recipe:
${recipe}`
        }
      ]
    });

    const textBlock = message.content.find(block => block.type === 'text');
    if (!textBlock || textBlock.type !== 'text') {
      return res.status(500).json({ error: 'No text response from Claude' });
    }

    let raw = textBlock.text.trim();

    // Strip markdown code fences if Claude added them
    raw = raw.replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/\s*```$/i, '');

    // Try to extract JSON array if Claude wrapped it in prose
    const arrayMatch = raw.match(/\[[\s\S]*\]/);
    if (arrayMatch) {
      raw = arrayMatch[0];
    }

    let ingredients;
    try {
      ingredients = JSON.parse(raw);
    } catch (e) {
      return res.status(500).json({
        error: 'Could not parse ingredients',
        raw: textBlock.text
      });
    }

    return res.status(200).json({ ingredients });
  } catch (error: any) {
    console.error('Anthropic API error:', error);
    return res.status(500).json({ error: error.message || 'Unknown error' });
  }
}
