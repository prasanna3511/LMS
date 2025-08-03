import React, { useEffect, useState } from "react";
import apiRequest from "../utils/apiRequest";
import SendMessagePopup from "./SendAndShowMessages"; // new popup component

const MessageBox = () => {
  const [sendersList, setSendersList] = useState([]);
  const [selectedSender, setSelectedSender] = useState(null);
  const [showSenderDropdown, setShowSenderDropdown] = useState(false);
  const [messageText, setMessageText] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const userData = JSON.parse(localStorage.getItem("userData"));

  useEffect(() => {
    const fetchAllChatUsers = async () => {
      try {
        const result = await apiRequest({
          endpoint: "users/getUser_forChatMessages.php",
          method: "POST",
          data: {
            id: Number(userData.id),
            school_id: Number(userData.school_id),
            role: userData.role,
          },
        });
        if (result.status === "success") {
          setSendersList(result.data);
        }
      } catch (err) {
        alert(err.message || "Something went wrong");
      }
    };
    fetchAllChatUsers();
  }, []);

  const handleSenderSelect = (sender) => {
    setSelectedSender(sender);
    setShowSenderDropdown(false);
  };

//   const handleSendMessage = async () => {
//     if (!selectedSender || !messageText.trim()) {
//       alert("Please select a sender and enter a message");
//       return;
//     }

//     try {
//       const result = await apiRequest({
//         endpoint: "chat_messages/insert_chat_messaged.php",
//         method: "POST",
//         data: {
//           receiver_id: Number(selectedSender.id),
//           message: messageText,
//           sender_id: Number(userData.id),
//           school_id: Number(userData.school_id),
//           status: "active",
//         },
//       });

//       if (result.status === "success") {
//         alert("Message sent successfully");
//         setMessageText("");
//         setSelectedSender(null);
//       } else {
//         alert(result.message || "Failed to send message");
//       }
//     } catch (err) {
//       alert(err.message || "Something went wrong");
//     }
//   };

const handleSendMessage = async ({ receiver_id, message }) => {
    if (!receiver_id || !message.trim()) {
      alert("Please select a sender and enter a message");
      return;
    }
  
    try {
      const result = await apiRequest({
        endpoint: "chat_messages/insert_chat_messaged.php",
        method: "POST",
        data: {
          receiver_id: Number(receiver_id),
          message,
          sender_id: Number(userData.id),
          school_id: Number(userData.school_id),
          status: "active",
        },
      });
  
      if (result.status === "success") {
        alert("Message sent successfully");
      } else {
        alert(result.message || "Failed to send message");
      }
    } catch (err) {
      alert(err.message || "Something went wrong");
    }
  };
  
  return (
    <div style={{
      backgroundColor: "#f5f7fb",
      padding: "20px",
      borderRadius: "10px",
      width: "100%",
      boxSizing: "border-box",
      marginLeft: 10,
    }}>
      <h4 style={{ margin: "0 0 15px 0" }}>Message box:</h4>

      {/* Sender dropdown */}
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
            {selectedSender ? `${selectedSender.full_name} (${selectedSender.role})` : "Select Sender"}
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
                  borderBottom: "1px solid #eee",
                }}
              >
                <div style={{ fontWeight: "bold" }}>{sender.full_name}</div>
                <div style={{ fontSize: "12px", color: "#666" }}>{sender.role}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Message input */}
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
              handleSendMessage({receiver_id:selectedSender.id,message:messageText});
            }
          }}
        />
        <button
          onClick={()=>handleSendMessage({receiver_id:selectedSender.id,message:messageText})}
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

      {/* Show Popup Button */}
      <button
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          backgroundColor: "#1c6ed5",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer"
        }}
        onClick={() => setShowPopup(true)}
      >
        Show Messages
      </button>

      {/* Popup */}
      {showPopup && (
        <SendMessagePopup
          sendersList={sendersList}
          userData={userData}
          onSendMessage={handleSendMessage}
          onClose={() => setShowPopup(false)}
        />
      )}
    </div>
  );
};

export default MessageBox;
