import React from "react";
import "./SidebarChannel.css";
import { setChannelInfo } from "../features/appSlice";
import { useDispatch } from "react-redux";
import { Delete } from "@material-ui/icons";
import { useSelector } from "react-redux";
import { selectChannelId } from "../features/appSlice";
import db from "../firebase/Config";
import { selectUser } from "../features/userSlice";
import { IconButton } from "@material-ui/core";

const SidebarChannel = ({ id, channelName, email }) => {
  // Variables
  const user = useSelector(selectUser);
  const channelId = useSelector(selectChannelId);
  const dispatch = useDispatch();

  return (
    <div
      className="sidebarChannel"
      onClick={() =>
        dispatch(
          setChannelInfo({
            channelId: id,
            channelName,
          })
        )
      }
    >
      <div className="sidebarChannel__left">
        <span className="sidebarChannel__hash">#</span>
        <div className="sidebarChannel__name">{channelName}</div>
      </div>
      <IconButton className="deleteIcon">
        <Delete
          disabled={user.email !== email}
          onClick={() => {
            if (channelId && user.email === email) {
              db.collection("channels").doc(channelId).delete();
            }
          }}
        />
      </IconButton>
    </div>
  );
};

export default SidebarChannel;
