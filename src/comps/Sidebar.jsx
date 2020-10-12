import { Avatar, IconButton } from "@material-ui/core";
import {
  Add,
  Call,
  ExpandMore,
  Headset,
  InfoOutlined,
  Mic,
  Settings,
  SignalCellularAlt,
} from "@material-ui/icons";
import React, { useState, useEffect } from "react";
import "./Sidebar.css";
import SidebarChannel from "./SidebarChannel";
import db, { auth } from "../firebase/Config";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";

const Sidebar = () => {
  const user = useSelector(selectUser);
  // The States
  const [channels, setChannels] = useState([]);
  // Functions
  useEffect(() => {
    db.collection("channels").onSnapshot((snapshot) => {
      setChannels(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, []);

  const addChannel = () => {
    const channelName = prompt("Please, enter your channel name");
    if (channelName) {
      db.collection("channels").add({
        channelName,
      });
    }
  };
  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <div className="sidebar__headerTop">
          <h2>Youssef Shaaban</h2>
          <IconButton>
            <ExpandMore />
          </IconButton>
        </div>
      </div>

      <div className="sidebar__channels">
        <div className="sidebar__channelsHeader">
          <div className="sidebar__channelsHeaderLeft">
            <ExpandMore />
            <h3>Text Channels</h3>
          </div>
          <IconButton>
            <Add className="sidebar__addChannel" onClick={addChannel} />
          </IconButton>
        </div>
        <div className="sidebar__channelsList">
          {channels.map(({ id, data }) => (
            <SidebarChannel
              key={id}
              id={id}
              channelName={data.channelName}
              email={user.email}
            />
          ))}
        </div>
      </div>

      <div className="sidebar__voice">
        <SignalCellularAlt />
        <div className="sidebar__voiceInfo">
          <h3>Vioce Connected</h3>
          <p>Stream</p>
        </div>
        <div className="sidebar__voiceIcons">
          <InfoOutlined />
          <Call />
        </div>
      </div>

      <div className="sidebar__profile">
        <Avatar
          className="sidebar__profileAva"
          onClick={() => auth.signOut()}
          src={user.photo}
        />
        <div className="sidebar__profileInfo">
          <h3>@{user.displayName}</h3>
          <p>#{user.uid.substring(0, 5)}</p>
        </div>
        <div className="sidebar__profileIcons">
          <Mic />
          <Headset />
          <Settings />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
