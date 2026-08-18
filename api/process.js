import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({
  apiKey: process.env.CLAUDE_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ error: "Text is required" });
    }

    const message = await client.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 1024,
      messages: [
        {
          role: "user",
          content: `Du bist ein intelligenter Notiz-Assistent. Der Nutzer hat folgende Eingabe gemacht:

"${text}"

Bitte:
1. Erkenne die Art der Eingabe (Einkaufsliste, To-Do-Liste, Ideen, Text, etc.)
2. Strukturiere sie intelligent und formatiert
3. Nutze Bulletpoints (•) für Listen
4. Nutze ✓ für abgehakte Items, wenn sinnvoll
5. Gib das Ergebnis als natürlich strukturierten Text zurück

Antwort nur mit dem strukturierten Text, keine Erklärungen.`,
        },
      ],
    });

    const processed =
      message.content[0].type === "text" ? message.content[0].text : text;

    res.status(200).json({ processed });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Processing failed" });
  }
}
