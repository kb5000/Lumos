import { Box, Stack } from "@mui/material";
import {
  MJDropButton,
  MJPageSelectButton
} from "../components/Components";
import { auto } from "@popperjs/core";
import React, { useContext, useMemo } from "react";
import { AppContext } from "../App";
import { AddTag, HasTag, RemoveTag } from "../schema/model";

export const MJDraft = (props) => {
  const [model, chgModel] = useContext(AppContext);
  var bgCount = 0
  var stCount = 0
  var odCount = 0
  for (let x in model.草图.草图背景) {
    if (HasTag(model, x)) {
      bgCount++;
    }
  }
  for (let x in model.草图.草图风格) {
    if (HasTag(model, x)) {
      stCount++;
    }
  }
  for (let x in model.草图.草图排列) {
    if (HasTag(model, x)) {
      odCount++;
    }
  }

  return (
    <Stack spacing={1} sx={{ padding: "8px 5px" }}>
      <Stack spacing={auto} direction="row" sx={{ padding: "0px 10px" }}>
        <Box sx={{ padding: "0px 10px" }}>
          <MJDropButton
            name={"作图方式"}
            height={"32px"}
            data={[
              {
                itemName: "铅笔",
                itemEvent: () => {
                  chgModel((newModel) => {
                    newModel.草图.作图方式 = "铅笔";
                    AddTag(newModel, "铅笔")
                    RemoveTag(newModel, "钢笔")
                    RemoveTag(newModel, "马克笔")
                  });
                },
              },
              {
                itemName: "钢笔",
                itemEvent: () => {
                  chgModel((newModel) => {
                    newModel.草图.作图方式 = "钢笔";
                    AddTag(newModel, "钢笔")
                    RemoveTag(newModel, "铅笔")
                    RemoveTag(newModel, "马克笔")
                  });
                },
              },
              {
                itemName: "马克笔",
                itemEvent: () => {
                  chgModel((newModel) => {
                    newModel.草图.作图方式 = "马克笔";
                    AddTag(newModel, "马克笔")
                    RemoveTag(newModel, "铅笔")
                    RemoveTag(newModel, "钢笔")
                  });
                },
              },
            ]}
          />
        </Box>
        <Box sx={{ padding: "0px 10px" }}>
          <MJPageSelectButton
            name={"草图背景"}
            height={"32px"}
            num={bgCount}
            view={"草图"}
            category={"草图背景"}
          />
        </Box>
      </Stack>
      <Stack spacing={auto} direction="row" sx={{ padding: "0px 10px" }}>
        <Box sx={{ padding: "0px 10px" }}>
          <MJPageSelectButton
            name={"草图风格"}
            height={"32px"}
            num={stCount}
            view={"草图"}
            category={"草图风格"}
          />
        </Box>
        <Box sx={{ padding: "0px 10px" }}>
          <MJPageSelectButton
            name={"草图排列"}
            height={"32px"}
            num={odCount}
            view={"草图"}
            category={"草图排列"}
          />
        </Box>
      </Stack>
    </Stack>
  );
};
