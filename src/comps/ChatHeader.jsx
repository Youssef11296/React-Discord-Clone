import {
  EditLocationRounded,
  HelpRounded,
  PeopleAltRounded,
  SearchRounded,
  SendRounded,
  Notifications,
} from "@material-ui/icons";
import React from "react";
import "./ChatHeader.css";

const ChatHeader = ({ channelId, channelName }) => {
  return (
    <div className="chatHeader">
      <div className="chatHeader__left">
        <h3>
          <span className="chatHeader__hash">#</span>
          {channelId && channelName}
        </h3>
      </div>

      <div className="chatHeader__right">
        <Notifications />
        <EditLocationRounded />
        <PeopleAltRounded />
        <div className="chatHeader__search">
          <input placeholder="Search" />
          <SearchRounded />
        </div>
        <SendRounded />
        <HelpRounded />
      </div>
    </div>
  );
};

export default ChatHeader;
