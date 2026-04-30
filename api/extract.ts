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
          content: `You are an ingredient extractor for a grocery shopping app. Read the recipe below and extract every ingredient with its quantity and unit.

Respond with ONLY a JSON array, no other text. Each item should have this shape:
{ "name": "chicken thighs", "quantity": 1.5, "unit": "lb" }

If a quantity isn't given, use null. If a unit isn't given (e.g. "2 onions"), use null. Use lowercase for ingredient names. Strip out brand names and adjectives like "fresh" or "organic" — just the core ingredient. Combine duplicates if the same ingredient appears more than once.

Recipe:
${recipe}`
        }
      ]
    });

    const textBlock = message.content.find(block => block.type === 'text');
    if (!textBlock || textBlock.type !== 'text') {
      return res.status(500).json({ error: 'No text response from Claude' });
    }

    let ingredients;
    try {
      ingredients = JSON.parse(textBlock.text);
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
