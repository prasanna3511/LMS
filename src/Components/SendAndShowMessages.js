// src/components/SendMessagePopup.js
import React, { useEffect, useState } from "react";
import apiRequest from "../utils/apiRequest";

const SendMessagePopup = ({
  sendersList,
  userData,
  onSendMessage,
  onClose
}) => {
  const [selectedSender, setSelectedSender] = useState(null);
  const [showSenderDropdown, setShowSenderDropdown] = useState(false);
  const [messageText, setMessageText] = useState("");
  const [chatMessages, setChatMessages] = useState([]);

  const handleSenderSelect = async (sender) => {
    setSelectedSender(sender);
    setShowSenderDropdown(false);
    try {
      const result = await apiRequest({
        endpoint: "chat_messages/get_chatMessages.php",
        method: "POST",
        data: {
          user1_id: Number(userData?.id),
          user2_id: Number(sender.id),
        },
      });
      if (result.status === "success") {
        setChatMessages(result.data || []);
      }
    } catch (err) {
      console.error("Error fetching chat messages:", err.message);
    }
  };

  const handleSend = async () => {
    if (!selectedSender || !messageText.trim()) {
      alert("Please select a sender and enter a message");
      return;
    }

    const messagePayload = {
      receiver_id: Number(selectedSender.id),
      message: messageText,
    };

    await onSendMessage(messagePayload);

    // Append message to chatMessages
    const newMessage = {
      sender_id: userData.id,
      receiver_id: selectedSender.id,
      school_id: userData.school_id,
      status: "active",
      message: messageText,
      time: new Date().toISOString().slice(0, 19).replace("T", " "),
    };

    setChatMessages((prev) => [...prev, newMessage]);
    setMessageText("");
  };

  return (
    <div style={{
      position: "fixed",
      top: 0, left: 0,
      width: "100%", height: "100%",
      backgroundColor: "rgba(0,0,0,0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 2000
    }}>
      <div style={{
        backgroundColor: "white",
        padding: "30px",
        borderRadius: "10px",
        width: "400px",
        maxHeight: "90vh",
        overflowY: "auto",
        position: "relative",
        display: "flex",
        flexDirection: "column",
      }}>
        <h3 style={{ marginTop: 0 }}>Send Message</h3>

        {/* Sender Dropdown */}
        <div style={{ marginBottom: "15px", position: "relative" }}>
          <button
            onClick={() => setShowSenderDropdown(!showSenderDropdown)}
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              backgroundColor: "white",
              textAlign: "left",
              cursor: "pointer",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <span>
              {selectedSender
                ? `${selectedSender.full_name} (${selectedSender.role})`
                : "Select Sender"}
            </span>
            <span>{showSenderDropdown ? "▲" : "▼"}</span>
          </button>

          {showSenderDropdown && (
            <div style={{
              position: "absolute",
              top: "100%",
              left: 0,
              right: 0,
              backgroundColor: "white",
              border: "1px solid #ccc",
              borderRadius: "5px",
              maxHeight: "200px",
              overflowY: "auto",
              zIndex: 1000,
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
            }}>
              {sendersList.map((sender) => (
                <div
                  key={sender.id}
                  onClick={() => handleSenderSelect(sender)}
                  style={{
                    padding: "10px",
                    cursor: "pointer",
                    borderBottom: "1px solid #eee"
                  }}
                >
                  <div style={{ fontWeight: "bold" }}>{sender.full_name}</div>
                  <div style={{ fontSize: "12px", color: "#666" }}>{sender.role}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Chat Message Display */}
        <div style={{
          flex: 1,
          overflowY: "auto",
          padding: "10px",
          border: "1px solid #ccc",
          borderRadius: "5px",
          marginBottom: "10px",
          backgroundColor: "#f9f9f9"
        }}>
          {chatMessages.map((msg, index) => {
            const isUser = msg.sender_id === userData.id;
            return (
              <div
                key={index}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: isUser ? "flex-end" : "flex-start",
                  marginBottom: "10px",
                }}
              >
                {!isUser && selectedSender && (
                  <div style={{ fontSize: "12px", color: "#666", marginBottom: "3px" }}>
                    {selectedSender.full_name}
                  </div>
                )}
                <div style={{
                  backgroundColor: isUser ? "#dcf8c6" : "#fff",
                  padding: "10px",
                  borderRadius: "10px",
                  maxWidth: "75%",
                  boxShadow: "0 1px 2px rgba(0,0,0,0.1)"
                }}>
                  {msg.message}
                </div>
                <div style={{ fontSize: "10px", color: "#999", marginTop: "2px" }}>
                  {msg.time}
                </div>
              </div>
            );
          })}
        </div>

        {/* Message input + send button */}
        <div style={{ display: "flex", gap: "10px", alignItems: "flex-end" }}>
          <input
            type="text"
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            placeholder="Type your message here..."
            style={{
              flex: 1,
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              fontSize: "14px"
            }}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleSend();
              }
            }}
          />
          <button
            onClick={handleSend}
            style={{
              padding: "10px 20px",
              backgroundColor: "#241F63",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "bold"
            }}
          >
            Send
          </button>
        </div>

        {/* Close button */}
        <button
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            backgroundColor: "transparent",
            border: "none",
            fontSize: "20px",
            cursor: "pointer"
          }}
          onClick={onClose}
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default SendMessagePopup;
