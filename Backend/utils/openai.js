import "dotenv/config";

const getGeminiResponse = async (message) => {
  try {
    if (!message || message.trim() === "") {
      return "Message is empty";
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.OPENAI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: message,
                },
              ],
            },
          ],
        }),
      }
    );

    const data = await response.json();

    console.log("Gemini Response:", JSON.stringify(data, null, 2));

    if (!response.ok) {
      throw new Error(
        data.error?.message || "Failed to get Gemini response"
      );
    }

    return (
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No response from Gemini"
    );
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Error generating response";
  }
};

export default getGeminiResponse;