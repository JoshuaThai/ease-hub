const API_KEY = "AIzaSyAtzHuQq0sNFysPDj5uHrtO0xcEM3lI6sI"; // don't ship this to public repos

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type !== "getQuote") return;

  (async () => {
    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            contents: [
              {
                role: "user",
                parts: [
                  { text: "Give me a short original inspirational quote." }
                ]
              }
            ]
          })
        }
      );

      const data = await res.json();
      console.log("Gemini status:", res.status);
      console.log("Gemini data:", data);

      if (!res.ok || data.error) {
        const msg = data.error?.message || `HTTP error ${res.status}`;
        sendResponse({ error: msg });
        return;
      }

      const parts = data.candidates?.[0]?.content?.parts || [];
      const text =
        parts.map(p => p.text).join("").trim() ||
        "No quote found in response.";

      sendResponse({ quote: text });
    } catch (err) {
      console.error("Gemini fetch failed:", err);
      sendResponse({ error: err.message || "Unknown error" });
    }
  })();

  return true; // keep channel open for async sendResponse
});
