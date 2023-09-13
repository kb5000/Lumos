import { Box, Stack, Divider, Input, Typography } from "@mui/material";
import {
  MJButton,
  MJNameDropList,
  MJDropList,
  MJMetaBox,
  MJSelectTextBox,
  MJSimpleDropButton,
  MJTraceButton,
  MJSchoolButton,
  MJCollectionButton,
  MJShareButton,
} from "../components/Components";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import { auto } from "@popperjs/core";
import TextFormatIcon from "@mui/icons-material/TextFormat";

import BorderColorIcon from "@mui/icons-material/BorderColor";
import { MJDraft } from "./DraftPage";
import { AppContext } from "../App";
import { useContext, useRef } from "react";
import { MJConcept } from "./ConceptPage";
import { AddTag, ProcessSentence } from "../schema/model";
import { MainSubpage } from "./MainSubpage";


export const MainView = ({ selectMode }) => {
  const [model, chgModel] = useContext(AppContext);
  const reference = useRef(null);
  return (
    <Stack
      sx={{
        backgroundColor: "#1f1f1f",
        float: "left",
        width: "300px",
        height: "auto",
      }}
    >
      <Box
        sx={{
          padding: "10px",
        }}
      >
        <Stack spacing={1} direction="row" sx={{ justifyContent: "center", alignItems: "center" }}>
          <AutoFixHighIcon sx={{ color: "white",width:"20px"}} />
          <Typography variant="h1" style={{ color: "white", fontSize: "16px", fontWeight: "bold" }}>
            Lumos
          </Typography>
        </Stack>
      </Box>
      <Box
        sx={{
          padding: "0px 10px 10px 10px",
        }}
      >
        <Stack spacing={1} direction="row" sx={{ padding: "4px 4px", justifyContent: "center", alignItems: "center" }}>
          <Box sx={{paddingTop:"4px"}}>
          <MJNameDropList
            name={"用户名"}
            data={["个人信息", "账户充值", "反馈意见", "退出登录"]}
          ></MJNameDropList>
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <Box>
            <MJButton title={"如何垫图"} height={"24px"} />
          </Box>
          <Box>
            <MJButton title={"简/EN"} height={"24px"} />  
          </Box>
        </Stack>
        {model.当前子页面 === "主子页面" ? <MainSubpage /> : <></>}

      </Box>
      <Box sx={{ flexGrow: 1 }} />
      <Box sx={{ padding: "0px 4px" }} >
        <Box sx={{ padding: "0px 6px" }} ref={reference}>
          <Stack spacing={auto} direction="row">
            <MJTraceButton reference={reference} />
            <MJSchoolButton />
            <MJCollectionButton reference={reference} />
            <MJShareButton />
          </Stack>
        </Box>
        <Box sx={{ padding: "8px" }} />
      </Box>
    </Stack>
  );
};





