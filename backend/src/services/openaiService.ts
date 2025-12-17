import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const COACH_SYSTEM_PROMPT = `You are a supportive and encouraging habit coach. Your role is to help users build and maintain healthy habits through personalized advice, motivation, and accountability.`;

const sendChatMessage = async (userMessage: string): Promise<void> => {
  try {
    const messages: any[] = [
      { role: "system", content: COACH_SYSTEM_PROMPT },
      { role: "user", content: userMessage },
    ];

    const completion = await openai.chat.completions.create({
      model: "gpt-4.1-nano",
      messages: messages,
    });

    console.log(completion.choices[0].message.content);
  } catch (err) {}
};

export default { sendChatMessage };
