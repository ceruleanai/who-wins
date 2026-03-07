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
    "funFacts": ["<fact 1>", "<fact 2>", "<fact 3>"],
    "extra": {
      "scientificName": "<Latin binomial name, e.g. Panthera leo>",
      "taxonomy": "<class, e.g. Mammal, Reptile, Bird, Insect, Fish, Amphibian, Arachnid>",
      "habitat": "<short description of where it lives>",
      "habitatEmoji": "<single emoji representing the habitat>",
      "diet": "<Carnivore/Herbivore/Omnivore - plus key foods>",
      "dietEmoji": "<single emoji representing the diet>",
      "weightKg": <average adult weight in kg as a number>,
      "heightCm": <average adult height/length in cm as a number>,
      "sizeComparison": "<fun kid-friendly size comparison, e.g. 'About as heavy as two grown-up adults!'>",
      "superpower": "<one amazing real ability described in an exciting way>",
      "conservationStatus": "<Least Concern, Near Threatened, Vulnerable, Endangered, or Critically Endangered>",
      "conservationEmoji": "<🟢 for Least Concern, 🟡 for Near Threatened/Vulnerable, 🟠 for Endangered, 🔴 for Critically Endangered>",
      "battleCry": "<a fun, exciting battle cry in the voice of this animal, 5-15 words, ALL CAPS>"
    }
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
    "funFacts": ["<fact 1>", "<fact 2>", "<fact 3>"],
    "extra": {
      "scientificName": "<Latin binomial name>",
      "taxonomy": "<class>",
      "habitat": "<short description>",
      "habitatEmoji": "<single emoji>",
      "diet": "<diet type - key foods>",
      "dietEmoji": "<single emoji>",
      "weightKg": <number>,
      "heightCm": <number>,
      "sizeComparison": "<fun comparison>",
      "superpower": "<amazing real ability>",
      "conservationStatus": "<status>",
      "conservationEmoji": "<emoji>",
      "battleCry": "<ALL CAPS battle cry>"
    }
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

Rules for the extra object:
- scientificName must be the real Latin binomial name
- taxonomy should be the common class name (Mammal, Bird, Reptile, etc.)
- habitat should be 3-8 words describing where the animal lives
- diet should start with Carnivore/Herbivore/Omnivore then list 2-3 key foods
- weightKg and heightCm must be realistic average adult values (numbers only, no units)
- sizeComparison should be a fun, relatable comparison a kid would understand
- superpower should describe a real ability in an exciting, kid-friendly way (one sentence)
- conservationStatus must be one of: Least Concern, Near Threatened, Vulnerable, Endangered, Critically Endangered
- battleCry should be fun, in-character, and ALL CAPS

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
