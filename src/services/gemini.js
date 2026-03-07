const API_KEY = import.meta.env.VITE_GEMINI_API_KEY
const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent'

export async function fetchBattleResult(animal1, animal2) {
  if (!API_KEY) {
    throw new Error('Gemini API key not configured. Add VITE_GEMINI_API_KEY to your .env file.')
  }

  const prompt = `You are a fun, kid-friendly animal expert. Compare these two animals in a hypothetical battle: "${animal1}" vs "${animal2}".

IMPORTANT: Respond with ONLY valid JSON, no markdown, no code fences, no extra text. Just the raw JSON object.

Use this exact JSON structure:
{
  "animal1": {
    "name": "${animal1}",
    "stats": {
      "strength": <number 1-10>,
      "speed": <number 1-10>,
      "size": <number 1-10>,
      "defense": <number 1-10>,
      "specialAbility": <number 1-10>
    },
    "specialAbilityName": "<name of their coolest special ability>",
    "funFacts": ["<fact 1>", "<fact 2>", "<fact 3>"]
  },
  "animal2": {
    "name": "${animal2}",
    "stats": {
      "strength": <number 1-10>,
      "speed": <number 1-10>,
      "size": <number 1-10>,
      "defense": <number 1-10>,
      "specialAbility": <number 1-10>
    },
    "specialAbilityName": "<name of their coolest special ability>",
    "funFacts": ["<fact 1>", "<fact 2>", "<fact 3>"]
  },
  "winner": "<name of the winner or 'draw'>",
  "explanation": "<A fun, exciting, 2-3 sentence kid-friendly explanation of why this animal wins. Use exciting language like a sports announcer! No violence - focus on abilities and skills.>",
  "isDraw": <true or false>
}

Rules for stats:
- Base stats on real animal abilities relative to the entire animal kingdom
- Strength: physical power relative to body size
- Speed: top movement speed
- Size: overall body mass and height
- Defense: natural armor, evasion ability, or protective features
- Special Ability: how powerful their unique skill is (venom, camouflage, echolocation, etc.)
- Stats must be integers from 1 to 10
- Be accurate but make it fun!

Rules for fun facts:
- Each fact should be genuinely true and surprising
- Keep them short (one sentence each)
- Make them exciting and kid-appropriate

Rules for the explanation:
- Must be appropriate for children ages 6+
- No graphic violence or scary descriptions
- Focus on the amazing abilities of the animals
- Use exciting, enthusiastic language like a sports announcer`

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-goog-api-key': API_KEY,
    },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
    }),
  })

  if (!response.ok) {
    const errorBody = await response.text()
    throw new Error(`Gemini API error (${response.status}): ${errorBody}`)
  }

  const data = await response.json()
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text

  if (!text) {
    throw new Error('No response from Gemini')
  }

  // Clean potential markdown code fences
  const cleaned = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
  return JSON.parse(cleaned)
}
