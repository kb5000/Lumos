import { Box, Stack } from "@mui/material";
import { AppContext } from "../App";
import React, { useContext } from "react";

export const MJSelect = (props) => {
  const [model, chgModel] = useContext(AppContext);
  return (
    <Box>
      <Stack
        sx={{
          backgroundColor: "#3a3a3a",
          margin: "0",
          padding: "0",
          border: "0",
          outline: "0",
          width: "34px",
          height: "100%",
        }}
      >
        {model.可选页面.map((value) => {
          console.log(value)
          return <Box
            onClick={() => {
              chgModel((newModel) => {
                newModel.当前页面 = value
              });
            }}
            sx={{
              fontSize: "16px",
              fontWeight: "bold",
              color: "white",
              padding: "12px 12px 12px 8px",
              cursor: "pointer",
              backgroundColor: model.当前页面 === value ? "#6c6c6c" : "#454545",
              backgroundImage: model.当前页面 === value ?
                "linear-gradient(to bottom, rgb(248, 211, 5), #9f0592)" : "",
              "&:hover": {
                backgroundColor: "#6c6c6c",
              },
            }}
          >
            {value}
          </Box>
        })}

        <Box
          onClick={() => {
            chgModel((newModel) => {
              newModel.当前页面 = "+"
            });
          }}
          sx={{
            fontSize: "40px",
            fontWeight: "bold",
            color: "white",
            padding: "0px 4px 4px 2px",
            backgroundColor: model.当前页面 === "+" ? "#6c6c6c" : "#454545",
            backgroundImage: model.当前页面 === "+" ?
              "linear-gradient(to bottom, rgb(248, 211, 5), #9f0592)" : "",
            cursor: "pointer",
            "&:hover": {
              backgroundColor: "#6c6c6c",
            },
          }}
        >
          {"+"}
        </Box>
      </Stack>
    </Box>
  );
};
