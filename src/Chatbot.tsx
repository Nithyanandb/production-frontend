import React, { useState, useEffect } from "react";
import LlamaAI from "llamaai";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);

  // Initialize LlamaAI with your API token
  const apiToken = "LA-bb589606676648b8b22c0538a92df7ab749b6bc7181a484caa312f3412edce38";
  const llamaAPI = new LlamaAI(apiToken);

  // Greeting message when the chatbot opens
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const greetingMessage = {
        text: "Hi! How can I assist you today?",
        sender: "bot",
      };
      setMessages([greetingMessage]);
    }
  }, [isOpen]);

  // Toggle chatbot visibility
  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  // Handle sending a message
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
        text: "Sorry, I'm having trouble responding right now. Please try again later. If the issue persists, contact support.",
        sender: "bot",
      };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle voice input
  const handleVoiceInput = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Your browser does not support voice input.");
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.start();
    setIsListening(true);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInputValue(transcript);
      setIsListening(false);
    };

    recognition.onerror = (event) => {
      console.error("Voice recognition error:", event.error);
      setIsListening(false);
    };
  };

  // Fetch response from LlamaAI
  const getLlamaAPIResponse = async (userInput) => {
    const apiRequestJson = {
      messages: [{ role: "user", content: userInput }],
      stream: false,
    };

    try {
      const response = await llamaAPI.run(apiRequestJson);
      console.log("API Response:", response); // Log the response for debugging
      return response.choices[0].message.content;
    } catch (error) {
      console.error("API Error:", error); // Log the error for debugging
      throw error;
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chatbot Toggle Button */}
      <button
        onClick={toggleChatbot}
        className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:from-blue-600 hover:to-blue-700 transition-all transform hover:scale-105"
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
        <div className="fixed top-0 right-0 h-screen w-96 bg-gradient-to-br from-gray-900 to-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out">
          {/* Header */}
          <div className="flex justify-between items-center p-4 bg-gradient-to-br from-gray-800 to-gray-700 text-white rounded-t-lg">
            <h2 className="text-lg font-semibold">AI Assistant</h2>
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
          <div className="p-4 h-[calc(100vh-128px)] overflow-y-auto">
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
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce mr-1"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce mr-1 delay-100"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Chat Input */}
          <div className="p-4 border-t border-gray-700">
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
                onClick={handleVoiceInput}
                className="bg-gray-700 text-white p-2 hover:bg-gray-600 transition-all"
                disabled={isLoading || isListening}
              >
                {isListening ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 animate-pulse"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0-4H3m15 0h3m-3-7a7 7 0 00-7-7m0 0a7 7 0 00-7 7m7-7v4m0-4h14m-14 0H3"
                    />
                  </svg>
                ) : (
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
                      d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0-4H3m15 0h3m-3-7a7 7 0 00-7-7m0 0a7 7 0 00-7 7m7-7v4m0-4h14m-14 0H3"
                    />
                  </svg>
                )}
              </button>
              <button
                onClick={handleSendMessage}
                className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-2 rounded-r-lg hover:from-blue-600 hover:to-blue-700 transition-all disabled:opacity-50"
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