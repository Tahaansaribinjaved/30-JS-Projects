document.getElementById("sendMessage").addEventListener("click", () => {
    const userMessage = document.getElementById("userInput").value.trim();
    if (userMessage) {
        addMessageToChat("User", userMessage);
        fetchNlpResponse(userMessage);
        document.getElementById("userInput").value = ""; // Clear input after sending
    }
});

// Function to add message to chat window
function addMessageToChat(sender, message) {
    const chatWindow = document.getElementById("chatWindow");
    const messageElement = document.createElement("div");
    messageElement.classList.add("my-2", "p-2", "rounded-lg", "text-white");
    messageElement.classList.add(sender === "User" ? "bg-blue-500" : "bg-green-500");
    messageElement.textContent = `${sender}: ${message}`;
    chatWindow.appendChild(messageElement);
    chatWindow.scrollTop = chatWindow.scrollHeight; // Scroll to bottom of chat window
}
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchNlpResponse(message) {
    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer `
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [
                    { role: "system", content: "You are a helpful assistant." },
                    { role: "user", content: message }
                ],
                max_tokens: 150
            })
        });

        if (response.status === 429) {
            console.log("Too many requests, retrying after a short delay...");
            await delay(5000);  // Delay 5 seconds and retry
            return fetchNlpResponse(message);  // Retry the request
        }

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        const nlpResponse = data.choices?.[0]?.message?.content?.trim();

        if (nlpResponse) {
            addMessageToChat("Chatbot", nlpResponse);
        } else {
            addMessageToChat("Chatbot", "Sorry, I didn't get that. Please try again.");
        }

    } catch (error) {
        console.error("Error fetching NLP response:", error);
        addMessageToChat("Chatbot", "Oops! Too many requests. Please wait and try again later.");
    }
}


