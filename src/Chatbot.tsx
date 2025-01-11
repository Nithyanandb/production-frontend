import React, { useState } from "react";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = async () => {
    if (inputValue.trim() === "") return;

    const userMessage = { text: inputValue, sender: "user" };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInputValue("");

    setIsLoading(true);

    try {
      const botResponse = await getLlamaAPIResponse(inputValue);
      const botMessage = { text: botResponse, sender: "bot" };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error("Error fetching response from LlamaAPI:", error);
      const botMessage = {
        text: "Sorry, I'm having trouble responding right now. Please try again later.",
        sender: "bot",
      };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const getLlamaAPIResponse = async (userInput) => {
    const proxyUrl = "http://localhost:5000/proxy/chat"; // Proxy server endpoint
    const apiKey = "LA-bb589606676648b8b22c0538a92df7ab749b6bc7181a484caa312f3412edce38";

    const response = await fetch(proxyUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "llama3.1-70b",
        messages: [
          { role: "user", content: userInput },
        ],
        stream: false,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch response from LlamaAPI");
    }

    const data = await response.json();
    return data.choices[0].message.content;
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 ">
      {/* Chatbot Toggle Button */}
      <button
        onClick={toggleChatbot}
        className="bg-black text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:from-gray-700 hover:to-gray-800 transition-all transform hover:scale-105"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
      </button>

      {/* Chatbot Sidebar */}
      {isOpen && (
        <div className="fixed top-0 right-0 h-screen w-96 bg-gray-900 shadow-lg transform transition-transform duration-300 ease-in-out">
          {/* Header */}
          <div className="flex justify-between items-center p-4 bg-black text-white rounded-t-lg">
           
            <button
              onClick={toggleChatbot}
              className="text-white hover:text-gray-300 transition-all"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Chatbot Content */}
          <div className="p-4 h-[calc(100vh-128px)] overflow-y-auto bg-black">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`mb-4 ${
                  message.sender === "user" ? "text-right" : "text-left"
                }`}
              >
                <div
                  className={`inline-block p-3 rounded-lg max-w-[80%] ${
                    message.sender === "user"
                      ? "bg-gradient-to-br from-blue-500 to-blue-600 text-white"
                      : "bg-gray-700 text-gray-200 shadow-sm"
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="text-left">
                <div className="inline-block p-3 rounded-lg bg-gray-700 text-gray-200 shadow-sm">
                  Typing...
                </div>
              </div>
            )}
          </div>

          {/* Chat Input */}
          <div className="p-4 border-t border-gray-700 bg-black">
            <div className="flex">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Type your message..."
                className="flex-1 p-2 border border-gray-700 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-800 text-white"
                disabled={isLoading}
              />
              <button
                onClick={handleSendMessage}
                className="bg-black text-white p-2 rounded-r-lg hover:from-blue-600 hover:to-blue-700 transition-all disabled:opacity-50"
                disabled={isLoading}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;