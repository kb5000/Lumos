import React, { useEffect, useReducer, useState, useRef } from "react";
import {
  MJButton,
  MJNameDropList,
  MJDropButton,
  MJDropList,
  MJTextBox,
  MJMetaBox,
  MJCircleButton,
} from "../components/Components";
import { Box } from "@mui/material";
import { auto } from "@popperjs/core";
import { Stack } from "@mui/system";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import { InputButtom } from "../components/InputButtom.jsx";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Update } from "@mui/icons-material";

import util from "util"

export const UsersPage = ({UsersData, getBack}) => {
  const [usersData, setUsersData] = useState({
    name: "username",
    account: "account",
    phonenumber: "phonenumber",
    email: "email",
    job: "职业",
    collage: "院校",
    wechat: "未绑定",
    QQ: "未绑定",
  });
  const [focus, setFocus] = useState(0);

  function Focused(ID) {
    setFocus(ID);
  }
  function updateInfo(ID, text) {
    usersData[ID] = text;
    setUsersData(usersData);
    setFocus(0);
  }
  function tryGetBack(){
    if(focus === 0)
      getBack()
  }

  return (
    <Box
      sx={{
        backgroundColor: "#1f1f1f",
        float: "left",
        width: "300px",
        height: "720px",
      }}
    >
      <Box
        sx={{
          padding: "10px",
        }}
      >
        <Stack spacing={1} direction="row">
          <AutoFixHighIcon sx={{color:"white", marginLeft: "auto"}}/>
          <h1 style={{ color: "white", fontSize: "16px", marginRight: "auto" }}>
            Lumos
          </h1>
        </Stack>
      </Box>

      <Box sx={{ color: "white" }}>
        <button style={{backgroundColor:"transparent", border:"0px", color:"white" }} onClick={tryGetBack}>  
          <ArrowBackIosNewIcon
            sx={{ position: "relative", left:"20px"}}
          />
        </button>
      </Box>
      <Box sx={{ margin: "10px", left: "200px", position: "relative" }}>
        <MJButton title={"简/EN"} />
      </Box>
      <Box sx={{ lineHeight: "10px" }}>
        <br />
      </Box>
      <Box
        sx={{
          width: "40px",
          backgroundColor: "rgb(241, 169, 52)",
          position: "absolute",
          height: "40px",
          zIndex: "1",
          borderRadius: "20px",
          left: "190px",
        }}
      ></Box>
      <Box
        sx={{
          position: "relative",
          textAlign: "center",
          zIndex: "2",
          height: "5px",
          color: "white",
        }}
      >
        <AccountCircleOutlinedIcon
          sx={{ fontSize: "40px", position: "relative", margin: "0px" }}
        />
      </Box>
      <Box
        sx={{
          zIndex: "0",
          margin: "0 auto",
          position: "relative",
          width: "240px",
          backgroundImage:
            "linear-gradient(to bottom, rgb(241, 169, 52), rgb(185, 60, 158), #1f1f1f, #1f1f1f)",
          // right:"0px",
          // top:"50px",
          borderRadius: "16px",
        }}
      >
        <p style={{ lineHeight: "5px" }}>
          <br />
        </p>
        <InputButtom
          InputType={1}
          Text={"姓名"}
          DefaultInfo={usersData.name}
          clickAble={focus === 0 || focus === 1}
          onEnter={() => Focused(1)}
          onCommit={(text) => updateInfo("name", text)}
        />
        <InputButtom
          InputType={0}
          Text={"账号"}
          DefaultInfo={usersData.account}
          clickAble={focus === 0}
        />
        <InputButtom
          InputType={1}
          Text={"手机号码"}
          DefaultInfo={usersData.phonenumber}
          clickAble={focus === 0 || focus === 2}
          onEnter={() => Focused(2)}
          onCommit={(text) => updateInfo("phonenumber", text)}
        />
        <InputButtom
          InputType={1}
          Text={"邮箱"}
          DefaultInfo={usersData.email}
          clickAble={focus === 0 || focus === 3}
          onEnter={() => Focused(3)}
          onCommit={(text) => updateInfo("email", text)}
        />
        <InputButtom InputType={2} Text={"修改密码"} clickAble={focus === 0} />
        <p style={{ lineHeight: "5px" }}>
          <br />
        </p>
        <InputButtom
          InputType={1}
          Text={"职业"}
          DefaultInfo={usersData.job}
          clickAble={focus === 0 || focus === 4}
          onEnter={() => Focused(4)}
          onCommit={(text) => updateInfo("job", text)}
        />
        <InputButtom
          InputType={1}
          Text={"院校"}
          DefaultInfo={usersData.collage}
          clickAble={focus === 0 || focus === 5}
          onEnter={() => Focused(5)}
          onCommit={(text) => updateInfo("collage", text)}
        />
        <p style={{ lineHeight: "5px" }}>
          <br />
        </p>
        <InputButtom
          InputType={3}
          Text={"微信账号"}
          DefaultInfo={usersData.wechat}
          clickAble={focus === 0}
        />
        <InputButtom
          InputType={3}
          Text={"QQ账号"}
          DefaultInfo={usersData.QQ}
          clickAble={focus === 0}
        />
        <p style={{ lineHeight: "5px" }}>
          <br />
        </p>
        <InputButtom InputType={4} Text={"历史记录"} clickAble={focus === 0} />
        <p style={{ lineHeight: "5px" }}>
          <br />
        </p>
      </Box>
    </Box>
  );
};
