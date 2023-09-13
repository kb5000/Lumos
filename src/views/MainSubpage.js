import { Box, Stack, Divider, Input, Typography, CircularProgress } from "@mui/material";
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
import { API_KEY, AppContext, BASE_URI } from "../App";
import { useContext } from "react";
import { MJConcept } from "./ConceptPage";
import { AddTag, AddVarTag, GetVarTagValue, RemoveTag, RemoveVarTag } from "../schema/model";
import axios from "axios";
import { generateSketchPrompt, generateTranslation } from "../schema/template";
import { getPromptTag, parsePrompt, processQuery } from "../tools/parsePrompt";
import { ContactSupportOutlined } from "@mui/icons-material";


export const MainSubpage = () => {
  const [model, chgModel] = useContext(AppContext);
  function truncate(str, limit) {
    if (str.length > limit) {
      str = "..." + str.substr(str.length - limit);
    } else {
      return str;
    }
    return str;
  }
  return <Box>
    <Stack spacing={1} sx={{ padding: "8px 5px" }}>
      <Stack spacing={auto} direction="row" sx={{ padding: "3px 0px" }}>
        <MJSelectTextBox
          height={"28px"}
          data={[
            {
              icon: (
                <Box sx={{ position: "relative", width: "12px", height: "12px", top: "1.5px" }}>
                  <BorderColorIcon sx={{ width: "12px", height: "12px" }} />
                </Box>
              ),
              name: "输入咒语",
              content: (
                <Box
                  component="textarea"
                  value={model.咒语}
                  onChange={(event) => {
                    chgModel((newModel) => {
                      newModel.标签 = []
                      var parses = event.target.value.split(/[,|，|.]/)
                      for (let i = 0; i < parses.length; i++) {
                        if (newModel.翻译[parses[i]] !== undefined) {
                          AddTag(newModel, parses[i])
                        }
                      }
                      newModel.咒语 = event.target.value
                    })
                  }}
                  sx={{
                    flexGrow: "1",
                    display: "block",
                    backgroundColor: "transparent",
                    padding: '8px',
                    borderWidth: "0px",
                    resize: "none",
                    top: "8px",
                    position: "relative",
                    width: "calc(100% - 20px)",
                    minHeight: "80px",
                    outline: "medium",
                    color: "#f9f9f9",
                    fontSize: '10px',
                    fontFamily: "roboto",
                  }}>

                </Box>
              ),
              clearEvent: () => {
                chgModel((newModel) => {
                  newModel.咒语 = ""
                })
              },
              submitEvent: async () => {
                if (model.咒语.length === 0) {
                  return
                }
                chgModel((newModel) => {
                  newModel.禁用优化 = true
                  newModel.处理中 = true
                })
                const response = await axios.post(
                  BASE_URI,
                  generateSketchPrompt(model.咒语),
                  { headers: { 'Authorization': `Bearer ${API_KEY}` } }
                )

                var content = response.data.choices[0].message.content;

                content = content.slice(content.indexOf("<<<") + 3)
                content = content.slice(0, content.indexOf(">>>"))
                console.log(content)
                content = content.replace("[", "")
                content = content.replace("]", "")
                content = content.replace("{", "")
                content = content.replace("}", "")
                var key_values = content.split(",")
                chgModel((newModel) => {
                  newModel.禁用优化 = false
                  newModel.处理中 = false
                  newModel.标签 = []
                  for (let i = 0; i < key_values.length; i++) {
                    const key_value = key_values[i]
                    console.log(key_value)
                    var [chn, eng] = key_value.split(":")
                    chn = chn.slice(1, chn.length - 1)
                    eng = eng.slice(1, eng.length - 1)
                    if (chn.endsWith("的")) {
                      chn = chn.slice(0, chn.length - 1)
                    }
                    if (newModel.翻译[chn] === undefined) {
                      newModel.翻译[chn] = eng
                      newModel.表达式[chn] = eng
                    }
                    AddTag(newModel, chn)
                  }
                })
              }
            },
          ]}
        />
      </Stack>
      <Stack spacing={1} direction="row" sx={{ padding: "3px 0px" }}>
        <MJDropList
          name={"细节调整"}
          direction="right"
          height="28px"
          icon={<TextFormatIcon sx={{ height: "20px" }} />}
          boxHeight="80px"
        >
          <MJDetailAdjust />
        </MJDropList>
        <MJDropList
          direction="left"
          name={"数值调整"}
          height="28px"
          icon={<TextFormatIcon sx={{ height: "20px" }} />}
          boxHeight="30px"
        >
          <MJNumericalAdjust />
        </MJDropList>
      </Stack>
    </Stack>
    <Box sx={{ backgroundColor: "#2c2c2c", borderRadius: "16px" }}>
      {model.当前页面 === "草图" ? <MJDraft /> : model.当前页面 === "效果图" ? <MJConcept /> : <></>}
    </Box>
    <Box sx={{ my: "8px", position: "relative", width: "100%" }}>
      <MJMetaBox height={"240"} />
    </Box>
  </Box>
}

const MJDetailAdjust = () => {
  const [model, chgModel] = useContext(AppContext);
  return <Box>
    <Stack spacing={1} sx={{ padding: "8px 5px" }}>
      <Stack spacing={1} direction="row" sx={{ padding: "0px 10px" }}>
        <MJSimpleDropButton name={"图像比例"}
          height={"24px"}
          data={[
            {
              itemName: "1:1",
              itemEvent: (name) => {
                chgModel((newModel) => {
                  RemoveTag(newModel, "1:1")
                  RemoveTag(newModel, "1:2")
                  RemoveTag(newModel, "2:1")
                  AddTag(newModel, name)
                });
              },
            },
            {
              itemName: "1:2",
              itemEvent: (name) => {
                chgModel((newModel) => {
                  RemoveTag(newModel, "1:1")
                  RemoveTag(newModel, "1:2")
                  RemoveTag(newModel, "2:1")
                  AddTag(newModel, name)
                });
              },
            },
            {
              itemName: "2:1",
              itemEvent: (name) => {
                chgModel((newModel) => {
                  RemoveTag(newModel, "1:1")
                  RemoveTag(newModel, "1:2")
                  RemoveTag(newModel, "2:1")
                  AddTag(newModel, name)
                });
              },
            },
          ]}
        />
        <MJSimpleDropButton name={"图片质量"}
          height={"24px"}
          data={[
            {
              itemName: "低质量",
              itemEvent: (name) => {
                chgModel((newModel) => {
                  RemoveTag(newModel, "低质量")
                  RemoveTag(newModel, "中质量")
                  RemoveTag(newModel, "高质量")
                  AddTag(newModel, name)
                });
              },
            },
            {
              itemName: "中质量",
              itemEvent: (name) => {
                chgModel((newModel) => {
                  RemoveTag(newModel, "低质量")
                  RemoveTag(newModel, "中质量")
                  RemoveTag(newModel, "高质量")
                  AddTag(newModel, name)
                });
              },
            },
            {
              itemName: "高质量",
              itemEvent: (name) => {
                chgModel((newModel) => {
                  RemoveTag(newModel, "低质量")
                  RemoveTag(newModel, "中质量")
                  RemoveTag(newModel, "高质量")
                  AddTag(newModel, name)
                });
              },
            },
          ]}
        />
        <MJSimpleDropButton name={"景深"}
          height={"24px"}
          data={[
            {
              itemName: "浅景深",
              itemEvent: (name) => {
                chgModel((newModel) => {
                  RemoveTag(newModel, "浅景深")
                  RemoveTag(newModel, "中景深")
                  RemoveTag(newModel, "深景深")
                  AddTag(newModel, name)
                });
              },
            },
            {
              itemName: "中景深",
              itemEvent: (name) => {
                chgModel((newModel) => {
                  RemoveTag(newModel, "浅景深")
                  RemoveTag(newModel, "中景深")
                  RemoveTag(newModel, "深景深")
                  AddTag(newModel, name)
                });
              },
            },
            {
              itemName: "深景深",
              itemEvent: (name) => {
                chgModel((newModel) => {
                  RemoveTag(newModel, "浅景深")
                  RemoveTag(newModel, "中景深")
                  RemoveTag(newModel, "深景深")
                  AddTag(newModel, name)
                });
              },
            },
          ]}
        />
      </Stack>
      <Stack spacing={1} direction="row" sx={{ padding: "0px 10px" }}>
        <MJSimpleDropButton name={"风格化"}
          height={"24px"}
          data={[
            {
              itemName: "低风格化",
              itemEvent: (name) => {
                chgModel((newModel) => {
                  RemoveTag(newModel, "低风格化")
                  RemoveTag(newModel, "高风格化")
                  AddTag(newModel, name)
                });
              },
            },
            {
              itemName: "高风格化",
              itemEvent: (name) => {
                chgModel((newModel) => {
                  RemoveTag(newModel, "低风格化")
                  RemoveTag(newModel, "高风格化")
                  AddTag(newModel, name)
                });
              },
            },
          ]}
        />
        <MJSimpleDropButton name={"色调"}
          height={"24px"}
          data={[
            {
              itemName: "黑色",
              itemEvent: (name) => {
                chgModel((newModel) => {
                  RemoveTag(newModel, "黑色")
                  RemoveTag(newModel, "蓝色")
                  RemoveTag(newModel, "紫色")
                  RemoveTag(newModel, "灰色")
                  RemoveTag(newModel, "红色")
                  RemoveTag(newModel, "绿色")
                  RemoveTag(newModel, "黄色")
                  AddTag(newModel, name)
                });
              },
            },
            {
              itemName: "蓝色",
              itemEvent: (name) => {
                chgModel((newModel) => {
                  RemoveTag(newModel, "黑色")
                  RemoveTag(newModel, "蓝色")
                  RemoveTag(newModel, "紫色")
                  RemoveTag(newModel, "灰色")
                  RemoveTag(newModel, "红色")
                  RemoveTag(newModel, "绿色")
                  RemoveTag(newModel, "黄色")
                  AddTag(newModel, name)
                });
              },
            },
            {
              itemName: "紫色",
              itemEvent: (name) => {
                chgModel((newModel) => {
                  RemoveTag(newModel, "黑色")
                  RemoveTag(newModel, "蓝色")
                  RemoveTag(newModel, "紫色")
                  RemoveTag(newModel, "灰色")
                  RemoveTag(newModel, "红色")
                  RemoveTag(newModel, "绿色")
                  RemoveTag(newModel, "黄色")
                  AddTag(newModel, name)
                });
              },
            },
            {
              itemName: "灰色",
              itemEvent: (name) => {
                chgModel((newModel) => {
                  RemoveTag(newModel, "黑色")
                  RemoveTag(newModel, "蓝色")
                  RemoveTag(newModel, "紫色")
                  RemoveTag(newModel, "灰色")
                  RemoveTag(newModel, "红色")
                  RemoveTag(newModel, "绿色")
                  RemoveTag(newModel, "黄色")
                  AddTag(newModel, name)
                });
              },
            },
            {
              itemName: "红色",
              itemEvent: (name) => {
                chgModel((newModel) => {
                  RemoveTag(newModel, "黑色")
                  RemoveTag(newModel, "蓝色")
                  RemoveTag(newModel, "紫色")
                  RemoveTag(newModel, "灰色")
                  RemoveTag(newModel, "红色")
                  RemoveTag(newModel, "绿色")
                  RemoveTag(newModel, "黄色")
                  AddTag(newModel, name)
                });
              },
            },
            {
              itemName: "绿色",
              itemEvent: (name) => {
                chgModel((newModel) => {
                  RemoveTag(newModel, "黑色")
                  RemoveTag(newModel, "蓝色")
                  RemoveTag(newModel, "紫色")
                  RemoveTag(newModel, "灰色")
                  RemoveTag(newModel, "红色")
                  RemoveTag(newModel, "绿色")
                  RemoveTag(newModel, "黄色")
                  AddTag(newModel, name)
                });
              },
            },
            {
              itemName: "黄色",
              itemEvent: (name) => {
                chgModel((newModel) => {
                  RemoveTag(newModel, "黑色")
                  RemoveTag(newModel, "蓝色")
                  RemoveTag(newModel, "紫色")
                  RemoveTag(newModel, "灰色")
                  RemoveTag(newModel, "红色")
                  RemoveTag(newModel, "绿色")
                  RemoveTag(newModel, "黄色")
                  AddTag(newModel, name)
                });
              },
            },
          ]}
        />
        <MJSimpleDropButton name={"版本"}
          height={"24px"}
          data={[
            {
              itemName: "V1",
              itemEvent: (name) => {
                chgModel((newModel) => {
                  RemoveTag(newModel, "V1")
                  RemoveTag(newModel, "V2")
                  RemoveTag(newModel, "V3")
                  RemoveTag(newModel, "V4")
                  RemoveTag(newModel, "V5")
                  AddTag(newModel, name)
                });
              },
            },
            {
              itemName: "V2",
              itemEvent: (name) => {
                chgModel((newModel) => {
                  RemoveTag(newModel, "V1")
                  RemoveTag(newModel, "V2")
                  RemoveTag(newModel, "V3")
                  RemoveTag(newModel, "V4")
                  RemoveTag(newModel, "V5")
                  AddTag(newModel, name)
                });
              },
            },
            {
              itemName: "V3",
              itemEvent: (name) => {
                chgModel((newModel) => {
                  RemoveTag(newModel, "V1")
                  RemoveTag(newModel, "V2")
                  RemoveTag(newModel, "V3")
                  RemoveTag(newModel, "V4")
                  RemoveTag(newModel, "V5")
                  AddTag(newModel, name)
                });
              },
            },
            {
              itemName: "V4",
              itemEvent: (name) => {
                chgModel((newModel) => {
                  RemoveTag(newModel, "V1")
                  RemoveTag(newModel, "V2")
                  RemoveTag(newModel, "V3")
                  RemoveTag(newModel, "V4")
                  RemoveTag(newModel, "V5")
                  AddTag(newModel, name)
                });
              },
            },
            {
              itemName: "V5",
              itemEvent: (name) => {
                chgModel((newModel) => {
                  RemoveTag(newModel, "V1")
                  RemoveTag(newModel, "V2")
                  RemoveTag(newModel, "V3")
                  RemoveTag(newModel, "V4")
                  RemoveTag(newModel, "V5")
                  AddTag(newModel, name)
                });
              },
            },
          ]}
        />
      </Stack>
    </Stack>
  </Box>
}

const MJNumericalAdjust = () => {
  const [model, chgModel] = useContext(AppContext);
  return (
    <Box>
      <Stack direction="row" spacing={1}>
        <Stack
          direction="row"
          divider={<Divider orientation="vertical" flexItem />}
          sx={{
            backgroundColor: "#f9f9f9",
            borderRadius: "16px",
          }}
        >
          <Box
            sx={{
              paddingTop: "3px",
              paddingLeft: "8px",
              color: "#a0a0a0",
              width: "54px",
              fontSize: "8px",
            }}
          >
            {"种子编号"}
          </Box>
          <Input
            onChange={(event) => {
              chgModel((newModel) => {
                event.target.value = event.target.value.replace(/[^0-9]/g, '')
                if (event.target.value.length > 9) event.target.value = event.target.value.substring(0, 9)
                if (event.target.value > 12345678) event.target.value = 12345678
                if (event.target.value === "") {
                  RemoveVarTag(newModel, "种子编号")
                } else {
                  AddVarTag(newModel, "种子编号", event.target.value)
                }
              })
            }}
            placeholder={"0-123456789"}
            variant="filled"
            disableUnderline="true"
            onInput={(value) => {
              chgModel((newModel) => {
                newModel.种子编号 = value;
              });
            }}
            sx={{
              fontSize: "8px",
              color: "black",
              padding: "8px",
              borderRadius: "16px",
              backgroundColor: "#f9f9f9",
              height: "24px",
              width: "78px",
            }}
          />
        </Stack>
        <Stack
          direction="row"
          divider={<Divider orientation="vertical" flexItem />}
          sx={{
            backgroundColor: "#f9f9f9",
            borderRadius: "16px",
          }}
        >
          <Box
            sx={{
              paddingTop: "3px",
              paddingLeft: "8px",
              color: "#a0a0a0",
              width: "40px",
              fontSize: "8px",
            }}
          >
            {"混沌值"}
          </Box>
          <Input
            onChange={(event) => {
              chgModel((newModel) => {
                event.target.value = event.target.value.replace(/[^0-9]/g, '')
                if (event.target.value.length > 3) event.target.value = event.target.value.substring(0, 3)
                if (event.target.value > 100) event.target.value = 100
                if (event.target.value === "") {
                  RemoveVarTag(newModel, "混沌值")
                } else {
                  AddVarTag(newModel, "混沌值", event.target.value)
                }
              })

            }}
            placeholder={"0-100"}
            variant="filled"
            disableUnderline="true"
            onInput={(value) => {
              chgModel((newModel) => {
                newModel.混沌值 = value;
              });
            }}
            sx={{
              fontSize: "8px",
              color: "black",
              padding: "8px",
              borderRadius: "16px",
              backgroundColor: "#f9f9f9",
              height: "24px",
              width: "64px",
            }}
          />
        </Stack>
      </Stack>
    </Box>
  );
};