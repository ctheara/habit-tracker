import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const COACH_SYSTEM_PROMPT = `You are a supportive and encouraging habit coach. Your role is to help users build and maintain healthy habits through personalized advice, motivation, and accountability.

When responding:
- Reference the user's specific habits when relevant
- Provide actionable advice when asked
- Keep responses concise (1-4 paragraphs)

You have access to the user's current habits. Use this information to provide personalized guidance.`;

const formatHabitContent = (habits: any[]): string => {
  if (!habits || habits.length === 0) {
    return "The user hasn't created any habits yet";
  }

  const formattedHabits = habits
    .map((habit, index) => {
      const parts: string[] = [`${index + 1}. ${habit.name}`];

      if (habit.targetDate) {
        const date = new Date(habit.targetDate).toLocaleDateString();

        if (habit.duration) {
          parts.push(`(Target: ${date}, Duration: ${habit.duration})`);
        } else {
          parts.push(`(Target: ${date})`);
        }
      }

      if (habit.description) {
        parts.push(`\nDescription: ${habit.description}`);
      }

      if (habit.motivation) {
        parts.push(`\nMotivation: ${habit.motivation}`);
      }

      return parts.join(" ");
    })
    .join("\n\n");

  return `User's Current Habits:\n\n${formattedHabits}`;
};

const sendChatMessage = async (
  userMessage: string,
  conversationHistory: Array<{ role: string; content: string }>,
  userHabits: any[]
): Promise<string> => {
  try {
    const habitContent = formatHabitContent(userHabits);

    const messages: any[] = [
      { role: "developer", content: COACH_SYSTEM_PROMPT },
      { role: "developer", content: habitContent },
      ...conversationHistory,
      { role: "user", content: userMessage },
    ];

    const completion = await openai.chat.completions.create({
      model: "gpt-5-mini",
      messages: messages,
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
