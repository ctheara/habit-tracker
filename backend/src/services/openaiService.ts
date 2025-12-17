import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const COACH_SYSTEM_PROMPT = `You are a supportive and encouraging habit coach. Your role is to help users build and maintain healthy habits through personalized advice, motivation, and accountability.`;

const sendChatMessage = async (
  userMessage: string,
  conversationHistory: Array<{ role: string; content: string }>
): Promise<string> => {
  try {
    const messages: any[] = [
      { role: "system", content: COACH_SYSTEM_PROMPT },
      ...conversationHistory,
      { role: "user", content: userMessage },
    ];

    const completion = await openai.chat.completions.create({
      model: "gpt-4.1-nano",
      messages: messages,
      temperature: 0.7,
      max_tokens: 400,
    });

    const aiResponse = completion.choices[0]?.message?.content;

    if (!aiResponse) {
      throw new Error("No response from AI");
    }

    return aiResponse;
  } catch (err: any) {
    console.error(`OpenAI API Error`, err);

    if (err.status === 429) {
      throw new Error(`OpenAI rate limit exceeded. Please try again later.`);
    }

    if (err.status === 401) {
      throw new Error(`Invalid OpenAI API Key`);
    }

    throw new Error(`Failed to get reponse from OpenAI`);
  }
};

export default { sendChatMessage };
