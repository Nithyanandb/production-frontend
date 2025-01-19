import React, { useState, useEffect, useRef } from "react";
import LlamaAI from "llamaai";
import { toast } from "react-hot-toast";
import useAuth from "./components/hooks/useAuth";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [closeTimeout, setCloseTimeout] = useState(null); // Timeout for closing the sidebar
  const [lastActivityTime, setLastActivityTime] = useState(Date.now()); // Track last activity time
  const inactivityTimeoutRef = useRef(null); // Ref to store the inactivity timeout

  // Use the useAuth hook to get authentication state
  const { token, logout } = useAuth();

  // Greeting message when the chatbot opens
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const greetingMessage = {
        text: token ? "Hi! How can I assist you today?" : "Please log in to use the chatbot.",
        sender: "bot",
      };
      setMessages([greetingMessage]);
    }
  }, [isOpen, token]);

  // Handle hover to open the sidebar (desktop only)
  const handleMouseEnter = () => {
    if (window.innerWidth > 768) { // Only for desktop
      if (closeTimeout) {
        clearTimeout(closeTimeout);
        setCloseTimeout(null);
      }
      setIsOpen(true);
      resetInactivityTimeout(); // Reset inactivity timeout on hover
    }
  };

  // Handle hover to close the sidebar after 3 seconds (desktop only)
  const handleMouseLeave = () => {
    if (window.innerWidth > 768) { // Only for desktop
      const timeout = setTimeout(() => {
        setIsOpen(false);
        setCloseTimeout(null); // Clear the timeout reference
      }, 500); // 3 seconds delay
      setCloseTimeout(timeout); // Store the timeout ID
    }
  };

  // Handle sending a message
  const handleSendMessage = async () => {
    if (inputValue.trim() === "") return;

    const userMessage = { text: inputValue, sender: "user" };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInputValue("");

    setIsLoading(true);

    if (!token) {
      setIsLoading(false);
      toast.error("Please log in to continue.");
      return;
    }

    try {
      const botResponse = await getLlamaAPIResponse(inputValue, token);
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

    resetInactivityTimeout(); // Reset inactivity timeout on sending a message
  };

  // Fetch response from LlamaAI
  const getLlamaAPIResponse = async (userInput, token) => {
    if (!token) {
      throw new Error("User not authenticated");
    }

    const apiRequestJson = {
      messages: [{ role: "user", content: userInput }],
      stream: false,
    };

    const llamaAPI = new LlamaAI(token);

    try {
      const response = await llamaAPI.run(apiRequestJson);
      console.log("API Response:", response); // Log the response for debugging
      return response.choices[0].message.content;
    } catch (error) {
      console.error("API Error:", error); // Log the error for debugging
      throw error;
    }
  };

  // Reset chatbot state when user logs out
  useEffect(() => {
    if (!token) {
      setMessages([]);
      setInputValue("");
    }
  }, [token]);

  // Reset inactivity timeout
  const resetInactivityTimeout = () => {
    setLastActivityTime(Date.now()); // Update last activity time
    if (inactivityTimeoutRef.current) {
      clearTimeout(inactivityTimeoutRef.current);
    }
    inactivityTimeoutRef.current = setTimeout(() => {
      setIsOpen(false); // Close the chatbot after inactivity
    }, 30000); // 30 seconds of inactivity
  };

  // Set up inactivity timeout on component mount and clean up on unmount
  useEffect(() => {
    resetInactivityTimeout();
    return () => {
      if (inactivityTimeoutRef.current) {
        clearTimeout(inactivityTimeoutRef.current);
      }
    };
  }, []);

  // Close chatbot on mobile
  const handleCloseChatbot = () => {
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chatbot Toggle Button */}
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative"
      >
        <button
          onClick={() => setIsOpen(!isOpen)} // Toggle chatbot on mobile
          className="bg-black/80 backdrop-blur-lg border border-white/10 rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:bg-black/90 transition-all transform hover:scale-105"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-white"
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
          <div
            className={`fixed md:absolute bottom-0 right-0 w-full md:w-96 h-[90vh] md:h-[80vh] bg-black/80 backdrop-blur-lg border border-white/10 rounded-t-xl md:rounded-xl shadow-lg overflow-hidden transition-all transform ${
              isOpen ? "translate-y-0" : "translate-y-full"
            }`}
            onMouseEnter={handleMouseEnter} // Keep open if mouse re-enters
            onMouseLeave={handleMouseLeave} // Start closing timeout on leave
          >
            {/* Apple Notch Design */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-6 bg-black/80 border-b border-white/10 rounded-b-lg"></div>

            {/* Header */}
            <div className="flex justify-between items-center p-4 border-b border-white/10">
              <h2 className="text-lg font-semibold text-white">AI Assistant</h2>
              {/* Close Button for Mobile */}
              <button
                onClick={handleCloseChatbot}
                className="md:hidden text-white hover:text-gray-300"
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
            <div className="p-4 h-[calc(100%-128px)] overflow-y-auto">
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
                        ? "bg-blue-500 text-white"
                        : "bg-white/10 text-white shadow-sm"
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="text-left">
                  <div className="inline-block p-3 rounded-lg bg-white/10 text-white shadow-sm">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-white rounded-full animate-bounce mr-1"></div>
                      <div className="w-2 h-2 bg-white rounded-full animate-bounce mr-1 delay-100"></div>
                      <div className="w-2 h-2 bg-white rounded-full animate-bounce delay-200"></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Chat Input */}
            <div className="p-4 border-t border-white/10">
              <div className="flex">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => {
                    setInputValue(e.target.value);
                    resetInactivityTimeout(); // Reset inactivity timeout on typing
                  }}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  placeholder="Type your message..."
                  className="flex-1 p-2 border border-white/10 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/10 text-white placeholder-white/50"
                  disabled={isLoading || !token}
                />
              
                  
               
                <button
                  onClick={handleSendMessage}
                  className="bg-blue-500 text-white p-2 rounded-r-lg hover:bg-blue-600 transition-all disabled:opacity-50"
                  disabled={isLoading || !token}
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chatbot;