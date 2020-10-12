import {
  AddCircle,
  CardGiftcard,
  EmojiEmotions,
  Gif,
} from "@material-ui/icons";
import React, { useState, useEffect } from "react";
import "./Chat.css";
import ChatHeader from "./ChatHeader";
import Message from "./Message";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { selectChannelId, selectChannelName } from "../features/appSlice";
import db from "../firebase/Config";
import firebase from "firebase";

const Chat = () => {
  // Variables
  const user = useSelector(selectUser);
  const channelId = useSelector(selectChannelId);
  const channelName = useSelector(selectChannelName);
  // The States
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);

  // Fetching The Messages From The DB
  useEffect(() => {
    if (channelId) {
      db.collection("channels")
        .doc(channelId)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setMessages(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              message: doc.data(),
            }))
          );
        });
    }
  }, [channelId]);
  // Functions
  const sendMessage = (e) => {
    e.preventDefault();

    // Some Firebase Stuff
    db.collection("channels").doc(channelId).collection("messages").add({
      text,
      user: user,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    // Reset
    setText("");
  };
  return (
    <div className="chat">
      <ChatHeader channelId={channelId} channelName={channelName} />

      <div className="chat__messages">
        {messages.map((message) => (
          <Message
            id={message.id}
            email={user.email}
            text={message.message.text}
            timestamp={message.message.timestamp}
            user={message.message.user}
          />
        ))}
      </div>
      <div className="chat__input">
        <AddCircle fontSize="large" />
        <form onSubmit={sendMessage}>
          <input
            placeholder={`Message # ${channelName}`}
            disabled={!channelId}
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button type="sbumit" disabled={!text || !channelId}>
            Send
          </button>
        </form>
        <div className="chat__inputIcons">
          <CardGiftcard fontSize="large" />
          <Gif fontSize="large" />
          <EmojiEmotions fontSize="large" />
        </div>
      </div>
    </div>
  );
};

export default Chat;
