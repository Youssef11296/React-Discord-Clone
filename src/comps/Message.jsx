import { Avatar, IconButton } from "@material-ui/core";
import React from "react";
import "./Message.css";
import { selectChannelId } from "../features/appSlice";
import db from "../firebase/Config";
import { Delete } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";

const Message = ({
  id,
  email,
  text,
  timestamp,
  user: { displayName, photo },
}) => {
  // Variables
  const user = useSelector(selectUser);
  const channelId = useSelector(selectChannelId);
  const dispatch = useDispatch();
  return (
    <div className="message">
      <Avatar src={photo} className="message__avatar" />
      <div className="message__info">
        <div className="message__username">{displayName}</div>
        <div className="message__text">{text}</div>
      </div>
      <p>{new Date(timestamp?.toDate()).toUTCString()}</p>
      <IconButton className="deleteIcon">
        <Delete
          disabled={user.email !== email}
          onClick={() => {
            if (channelId && user.email === email) {
              db.collection("channels")
                .doc(channelId)
                .collection("messages")
                .doc(id)
                .delete();
            }
          }}
        />
      </IconButton>
    </div>
  );
};

export default Message;
