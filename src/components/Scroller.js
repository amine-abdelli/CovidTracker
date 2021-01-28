import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { FixedSizeList } from "react-window";
import axios from "axios";
import { Divider } from "antd";

const useStyles = makeStyles((theme) => ({
  root: {
    color: "#1a1a1a",
    width: "100%",
    height: 250,
    maxWidth: 600,
    borderRadius: "10px",
    backgroundColor: theme.palette.background.paper,
  },
}));

export function Scroller() {
  const [myState, setMyState] = useState({});
  const [loader, setLoader] = useState(true);

  const urlList = "https://covid19.mathdro.id/api/confirmed";

  useEffect(() => {
    const fetch = async () => {
      const newList = await axios.get(urlList);
      setMyState(newList);
      setLoader(false);
    };
    fetch();
  }, []);

  if (loader) {
    <p>loader</p>;
  }

  const data = myState.data;
  console.log("SCROLLER DATA", myState.data);
  console.log("SCROLLER DATA", typeof data);
  return "";
  // BOUCLE INFINI
  // Object.entries(data).map((data) => console.log("MAP SCROLLER TEST", data, data));
}
