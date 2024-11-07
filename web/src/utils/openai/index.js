import OpenAI from "openai";
const openai = new OpenAI({
    apiKey: process.env.REACT_APP_OPENAI_TOKEN,
    dangerouslyAllowBrowser: true
});

const sendChat = async (message, setReply, onEnd) => {
    const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo-16k",
        messages: [
          {"role": "system", "content": "You are an emergency responder helper. Provide clear, concise, and actionable advice for emergency situations."},
          {"role": "user", "content": `Reply should be in markdown format: ${message}`}
        ],
        stream: true,
      });
    
      for await (const chunk of completion) {
        if(chunk.choices[0].finish_reason === 'stop') {
            onEnd();
            return;
        }
        setReply((prev) => prev + chunk.choices[0].delta.content);
      }
}

export {
    sendChat,
};
