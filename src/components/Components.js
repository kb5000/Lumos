import {
  Button,
  Box,
  Popover,
  Input,
  IconButton,
  Dialog,
  Divider,
  Grid,
  Chip,
  Typography,
  TextField,
  Popper,
  CircularProgress,
} from "@mui/material";
import { Stack } from "@mui/system";
import { useRef, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";
import { auto } from "@popperjs/core";
import FileDownloadDoneIcon from "@mui/icons-material/FileDownloadDone";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import SearchIcon from "@mui/icons-material/Search";
import { useContext } from "react";
import { AppContext } from "../App";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PublicOffIcon from "@mui/icons-material/PublicOff";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import CopyAllIcon from '@mui/icons-material/CopyAll';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { AddTag, ExchangeTag, GetQuery, HasTag, RemoveTag } from "../schema/model";
import CancelIcon from "@mui/icons-material/Cancel";
import { ReactDOM } from "react";
export const MJSelectTextBox = ({ height, data }) => {
  const [model, chgModel] = useContext(AppContext);
  const [selectMode, setSelectMode] = useState(data[0].name);
  return (
    <Box sx={{ width: "100%" }}>
      <Stack direction="row" spacing={1}>
        {data.map((item) => {
          const { icon, name, placeholder } = item;
          return (
            <Button
              variant="contained"
              onClick={() => {
                setSelectMode(name);
              }}
              sx={{
                position: "relative",
                px: "8px",
                color: "white",
                height: height,
                fontSize: "8px",
                whiteSpace: "break-spaces",
                cursor: "pointer",
                borderTopLeftRadius: "8px",
                borderTopRightRadius: "8px",
                borderBottomLeftRadius: "0px",
                borderBottomRightRadius: "0px",
                backgroundColor:
                  selectMode === name ? "rgb(210, 170, 5)" : "#545454",
                boxShadow: "0",
                "&:hover": {
                  backgroundColor: "rgb(210, 170, 5)",
                  boxShadow: "0",
                },
              }}
            >
              <Stack direction="row">
                {icon}
                <Box sx={{ paddingLeft: "4px" }}></Box>
                {name}
              </Stack>
            </Button>
          );
        })}
      </Stack>
      {data.map((item) => {
        const { icon, name, placeholder, content, clearEvent, submitEvent } = item;
        return selectMode !== name ? (
          <></>
        ) : (
          <Box
            disabled
            placeholder={placeholder}
            variant="filled"
            disableUnderline="true"
            sx={{
              fontSize: "8px",
              color: "black",
              borderRadius: "0px 10px 10px 10px",
              backgroundImage:
                "linear-gradient(to bottom, rgb(210, 170, 5), #9f0592)",
              width: "100%",
              padding: "2px",
            }}
          >
            <Stack sx={{ position: "relative", width: "100%", borderRadius: "10px", backgroundColor: "#3c3c3c" }} spacing={1}>
              {content}
              <Stack direction="row" sx={{ padding: "8px" }}>
                <Box>
                  <IconButton
                    onClick={() => {
                      if (clearEvent !== undefined) {
                        clearEvent()
                      }
                    }}
                    sx={{
                      backgroundColor: "#3c3c3c",
                      width: "24px",
                      height: "24px",
                    }}
                  >
                    <CleaningServicesIcon
                      sx={{
                        color: "#f9f9f9",
                        width: "16px",
                        "&:hover": {
                          color: "#a9a9a9",
                        },
                      }}
                    />
                  </IconButton>
                </Box>
                <Box sx={{ flexGrow: 1 }}></Box>
                <Button
                  variant="contained"
                  disabled={model.禁用优化}
                  onClick={submitEvent}
                  sx={{
                    color: "white",
                    padding: "2px 4px",
                    backgroundColor: "#2c2c2c",
                    fontSize: "12px",
                    borderRadius: "20px",
                    cursor: "pointer",
                    boxShadow: "0",
                    "&:hover": {
                      backgroundColor: "#9c9c9c",
                    },
                  }}
                >
                  <FileDownloadDoneIcon sx={{ fontSize: "16px", mr: "4px" }} />
                  {"优化"}
                </Button>
              </Stack>
            </Stack>
            <Dialog onClose={() => { }} open={model.处理中}>
              <Box sx={{
                width: "64px",
                height: "64px",
                backgroundColor:"#3c3c3c"
              }}>
                <CircularProgress sx={{position:"relative",left:"12px",top:"12px",color:"#ddaa00"}}/>
              </Box>
            </Dialog>
          </Box>
        );
      })}
    </Box>
  );
};

export const MJDropList = ({ icon, name, children, height, boxHeight, direction }) => {
  const [model, chgModel] = useContext(AppContext);
  const mouseState = model.弹出框 === name;
  return (
    <Box
      sx={{
        position: "relative",
        display: "inline-block",
      }}
    >
      <Box
        onClick={() => {
          chgModel((newModel) => {
            if (newModel.弹出框 === name) {
              newModel.弹出框 = "";
            } else {
              newModel.弹出框 = name;
            }
          });
        }}
        sx={{
          width: "134px",

          color: "white",
          padding: "4px 0px 0px 0px",
          backgroundColor: mouseState ? "#3a3a3a" : "#545454",
          fontSize: "12px",
          borderTopLeftRadius: "16px",
          borderTopRightRadius: "16px",
          borderBottomLeftRadius: mouseState ? "0px" : "16px",
          borderBottomRightRadius: mouseState ? "0px" : "16px",
          cursor: "pointer",
          height: height,
          transition: "0.25s",
          "&:hover": {
            backgroundColor: "#3a3a3a",
          },
        }}
      >
        <Stack spacing={2} direction="row">
          <Box sx={{ paddingTop: "2px" }}>{icon}</Box> <Box sx={{ paddingTop: "3px" }}>{name}</Box>{" "}
          <Box sx={{ paddingTop: "2px" }}>
            <ExpandMoreIcon sx={{ height: "20px" }} />
          </Box>{" "}
        </Stack>
      </Box>
      <Stack
        direction="row"
        sx={{
          position: "absolute",
        }}
      >
        {direction === "left" ? (
          <Box
            sx={{
              position: "absolute",
              left: mouseState ? "-12px" : "12px",
              transition: "0.25s",
              width: mouseState ? "12px" : "0px",
              height: mouseState ? "12px" : "0px",
              backgroundColor: mouseState ? "#3a3a3a" : "#545454",
            }}
          >
            <Box
              sx={{
                backgroundColor: "#1f1f1f",
                width: mouseState ? "12px" : "0px",
                height: mouseState ? "12px" : "0px",
                borderBottomRightRadius: "24px",
              }}
            />
          </Box>
        ) : (
          <></>
        )}
        <Box
          sx={{
            transition: "0.25s",
            width: mouseState ? "0px" : "24px",
          }}
        />
        <Box
          sx={{
            transition: "0.25s",
            backgroundColor: mouseState ? "#3a3a3a" : "#545454",
            height: mouseState ? "12px" : "0px",
            width: mouseState ? "134px" : "84px",
          }}
        />
        {direction === "right" ? (
          <Box
            sx={{
              transition: "0.25s",
              width: mouseState ? "12px" : "0px",
              height: mouseState ? "12px" : "0px",
              backgroundColor: mouseState ? "#3a3a3a" : "#545454",
            }}
          >
            <Box
              sx={{
                backgroundColor: "#1f1f1f",
                width: mouseState ? "12px" : "0px",
                height: mouseState ? "12px" : "0px",
                borderBottomLeftRadius: "24px",
              }}
            />
          </Box>
        ) : (
          <></>
        )}
      </Stack>
      <Box
        sx={{
          transition: "0.25s",
          height: mouseState ? "12px" : "0px",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          backgroundColor: "#3a3a3a",
          left: mouseState ? (direction === "right" ? "0px" : "auto") : "20px",
          right: mouseState ? (direction === "left" ? "0px" : "auto") : "20px",
          height: mouseState ? "auto" : "0px",
          width: mouseState ? "auto" : "0px",
          border: "#3a3a3a solid",
          borderWidth: mouseState ? "5px" : "0px",
          borderTopLeftRadius: direction === "right" ? "0px" : "16px",
          borderTopRightRadius: direction === "left" ? "0px" : "16px",
          borderBottomLeftRadius: "16px",
          borderBottomRightRadius: "16px",
          overflow: "hidden",
          transition: "0.25s",
          zIndex: "8888",
        }}
      >
        {children}
      </Box>
      <Box
        sx={{
          transition: "0.5s",
          height: mouseState ? boxHeight : "0px",
        }}
      ></Box>
    </Box>
  );
};

export const MJDropButton = ({ name, data, height }) => {
  const buttonRef = useRef(null);
  const [model, chgModel] = useContext(AppContext);
  const [pushed, setPushed] = useState(false);
  var selectItem = ""
  for (let i = 0; i < data.length; i++) {
    if (HasTag(model, data[i].itemName)) {
      selectItem = data[i].itemName
    }
  }

  return (
    <Box
      sx={{
        position: "relative",
      }}
    >
      <Button
        variant="contained"
        sx={{
          width: "108px",
          position: "relative",
          color: "white",
          height: height,
          fontSize: "12px",
          whiteSpace: "break-spaces",
          backgroundColor: "#545454",
          borderTopLeftRadius: "8px",
          borderTopRightRadius: "8px",
          borderBottomLeftRadius: pushed ? "0px" : "8px",
          borderBottomRightRadius: pushed ? "0px" : "8px",
          border: "1px",
          borderStyle: "solid",
          borderColor: "transparent",
          backgroundClip:
            selectItem === "" ? "" : pushed ? "" : "padding-box, border-box",
          backgroundOrigin:
            selectItem === "" ? "" : pushed ? "" : "padding-box, border-box",
          backgroundImage:
            "linear-gradient(to right, #545454, #545454), linear-gradient(to bottom, rgb(248, 211, 5), #9f0592)",
          "&:hover": {
            backgroundColor: "#212121",
          },
        }}
        onClick={() => setPushed(true)}
        ref={buttonRef}
      >
        {selectItem === "" ? name : selectItem}
      </Button>
      <Popover
        open={pushed}
        onClose={() => setPushed(false)}
        anchorEl={buttonRef.current}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        sx={{
          borderTopLeftRadius: "0px",
          borderTopRightRadius: "0px",
          "& .MuiPaper-rounded": {
            borderTopLeftRadius: "0px",
            borderTopRightRadius: "0px",
            borderBottomLeftRadius: "12px",
            borderBottomRightRadius: "12px",
          },
        }}
      >
        <Stack
          spacing={0}
          sx={{
            backgroundColor: "#545454",
          }}
        >
          {data.map((x) => {
            const { itemName, itemEvent } = x;
            return (
              <Button
                variant="contained"
                onClick={() => {
                  itemEvent();
                }}
                sx={{
                  margin: "4px",
                  width: "100px",
                  height: height,
                  padding: "10px",
                  color: "white",
                  fontSize: "10px",
                  borderRadius: "4px",
                  borderStyle: "solid",
                  borderColor: "transparent",
                  cursor: "pointer",
                  boxShadow: "0",
                  borderWidth: selectItem === itemName ? "1px" : "0px",
                  backgroundClip:
                    selectItem === itemName ? "padding-box, border-box" : "",
                  backgroundOrigin:
                    selectItem === itemName ? "padding-box, border-box" : "",
                  backgroundImage:
                    "linear-gradient(to right, #545454, #545454), linear-gradient(to bottom, rgb(248, 211, 5), #9f0592)",
                  "&:hover": {
                    borderWidth: "0px",
                    backgroundColor: "transparent",
                    backgroundImage:
                      "linear-gradient(to right bottom,#9f0592, rgb(248, 211, 5))",
                  },
                }}
              >
                {itemName}
              </Button>
            );
          })}
        </Stack>
      </Popover>
    </Box>
  );
};

export const MJTextBox = ({ id, placeholder, height, width }) => {
  const ariaLabel = { "aria-label": "description" };
  return (
    <>
      <Input
        id={id}
        placeholder={placeholder}
        variant="filled"
        disableUnderline="true"
        sx={{
          fontSize: "8px",
          color: "black",
          padding: "8px",
          border: "3px solid transparent",
          borderRadius: "10px",
          backgroundClip: "padding-box, border-box",
          backgroundOrigin: "padding-box, border-box",
          backgroundImage:
            "linear-gradient(to right, #f9f9f9, #f9f9f9), linear-gradient(to bottom, rgb(248, 211, 5), #9f0592)",
          height: height,
          width: width,
        }}
      />
    </>
  );
};

export const MJMetaBox = ({ height, width }) => {
  const [model, chgModel] = useContext(AppContext);
  return (
    <Box
      sx={{
        fontSize: "8px",
        color: "black",
        border: "2px solid transparent",
        borderRadius: "10px",
        backgroundClip: "padding-box, border-box",
        backgroundOrigin: "padding-box, border-box",
        backgroundImage:
          "linear-gradient(to right, #3c3c3c, #3c3c3c), linear-gradient(to bottom, rgb(248, 211, 5), #9f0592)",
        minHeight: height,
        width: "calc(100% - 4px)",
      }}
    >
      <Stack>
        <Box sx={{ m: 1, minHeight: "40px" }} onDragOver={e => e.preventDefault()}>
          <Grid container>
            {model.标签.map(({ content, enabled }, idx) => {
              return (
                <Grid
                  onClick={() => {
                    chgModel((newModel) => {
                      if (newModel.标签[idx] !== undefined) {
                        newModel.标签[idx].enabled = !enabled;
                      }
                    });
                  }}
                >
                  <MJMetaTag content={content} enabled={enabled} idx={idx} />
                </Grid>
              );
            })}
          </Grid>
        </Box>
        <Stack direction="row" p={1}>
          <IconButton
            onClick={() => {
              chgModel((newModel) => {
                newModel.标签 = []
              })
            }}
            sx={{
              position: "relative",
              backgroundColor: "#3c3c3c",
              width: "24px",
              height: "24px",
            }}
          >
            <CleaningServicesIcon
              sx={{
                color: "#f9f9f9",
                width: "16px",
                "&:hover": {
                  color: "#a9a9a9",
                },
              }}
            />
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
          <Button
            variant="contained"
            sx={{
              color: "white",
              backgroundColor: "#2c2c2c",
              padding: "2px 4px",
              fontSize: "12px",
              borderRadius: "20px",
              cursor: "pointer",
              boxShadow: "0",
              "&:hover": {
                backgroundColor: "#9c9c9c",
              },
            }}
            onClick={() => {
              const prompt = GetQuery(model)
              navigator.clipboard.writeText(prompt);
            }}
          >
            {"复制"}
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

const MJMetaTag = ({ content, enabled, idx }) => {
  const [model, chgModel] = useContext(AppContext);
  const reference = useRef()
  return <Box
    id={"meta_tag_" + content}
    draggable={true}
    onDragStart={(event) => {
      chgModel((newModel) => {
        newModel.拖放位置 = content
      })
    }}
    onDragEnd={(event) => {
      if (model.拖放位置 !== undefined) {
        chgModel((newModel) => {
          ExchangeTag(newModel, newModel.拖放位置, content)
        })
      }
    }}
    onDragEnter={(event) => {
      if (event.target.id.substr(0, 8) === "meta_tag") {
        chgModel((newModel) => {
          newModel.拖放位置 = content
        })
      }
    }}
    onDragOver={e => e.preventDefault()}
    ref={reference}
    sx={{
      padding: "3px",
      position: "relative",
    }}
  >
    <Stack direction="row">
      <Box
        sx={{
          color: enabled ? "#2f2f2f" : "#8f8f8f",
          transition: "0.25s",
          backgroundColor: enabled ? "#fcfcfc" : "#afafaf",
          borderTopLeftRadius: "6px",
          borderBottomLeftRadius: "6px",
          borderWidth: "1px 0px 1px 1px",
          borderColor: enabled ? "#5c5c5c" : "#7c7c7c",
          borderStyle: "solid",
          "&:hover": {
            backgroundColor: "#7c7c7c",
          },
        }}
      >
        <Box sx={{ padding: "0px 5px" }}>
          {content}
        </Box>
      </Box>
      <Box
        sx={{
          color: enabled ? "#2f2f2f" : "#8f8f8f",
          transition: "0.25s",
          backgroundColor: enabled ? "rgb(248, 190, 5)" : "#afafaf",
          borderTopRightRadius: "6px",
          borderBottomRightRadius: "6px",
          borderWidth: "1px 1px 1px 0px",
          borderColor: enabled ? "#5c5c5c" : "#7c7c7c",

          borderStyle: "solid",
          "&:hover": {
            backgroundColor: "#5c5c5c",
          },
        }}
      >
        <Box sx={{ padding: "0px 5px" }}>
          {(() => {
            if (content.indexOf(':') === -1) {
              return model.翻译[content]
            } else {
              return model.翻译[content.substr(0, content.indexOf(':'))] + content.substr(content.indexOf(':'))
            }
          })()}
        </Box>

      </Box>
      {enabled ? (
        <></>
      ) : (
        <CancelIcon
          onClick={() => {
            chgModel((newModel) => {
              RemoveTag(newModel, content)
            })
          }}
          sx={{
            height: "16px",
            position: "absolute",
            right: "-2px",
            top: "0px",
            color: "#3c3c3c",
            "&:hover": {
              color: "#a93232",
            },
          }}
        />
      )}
    </Stack>
  </Box>
}

export const MJButton = ({ title, event, height }) => {
  return (
    <Button
      sx={{
        position: "relative",
        color: "white",
        backgroundColor: "#545454",
        borderRadius: "16px",
        borderStyle: "solid",
        borderColor: "#545454",
        cursor: "pointer",
        whiteSpace: "break-spaces",
        height: height,
      }}
      onClick={event}
    >
      <Box sx={{ WebkitTransform: "scale(0.7)", position: "absolute" }}>{title}</Box>

    </Button>
  );
};

export const MJNameDropList = ({ name, data }) => {
  const buttonRef = useRef(null);

  const [pushed, setPushed] = useState(false);

  return (
    <Box sx={{ position: "relative" }}>
      <Button
        variant="contained"
        sx={{
          position: "relative",

          color: "white",
          padding: "0px 4px 0px 8px",
          backgroundColor: "#545454",
          borderTopLeftRadius: "16px",
          borderTopRightRadius: "16px",
          borderBottomLeftRadius: pushed ? "0px" : "16px",
          borderBottomRightRadius: pushed ? "0px" : "16px",
          borderStyle: "solid",
          height: "32px",
          borderColor: "#545454",
          cursor: "pointer",
          "&:hover": {
            backgroundColor: "#242424",
          },
        }}
        onClick={() => setPushed(true)}
        ref={buttonRef}
      >
        <Stack spacing={1} direction="row" sx={{ alignItems: "center", justifyContent: "center" }}>
          <AccountCircleIcon fontSize="small" />
          <Typography sx={{ fontSize: '12px' }}>{name}</Typography>
          <ExpandMoreIcon fontSize="small" />
        </Stack>
      </Button>

      <Popover
        open={pushed}
        onClose={() => setPushed(false)}
        anchorEl={buttonRef.current}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        sx={{
          borderTopLeftRadius: "0px",
          borderTopRightRadius: "0px",
          boxShadow: "0",
          "& .MuiPaper-rounded": {
            borderTopLeftRadius: "0px",
            borderTopRightRadius: "0px",
            borderBottomLeftRadius: "16px",
            borderBottomRightRadius: "16px",
          },
        }}
      >
        <Box
          sx={{
            backgroundColor: "#545454",
            border: "0px",
            width: "104px",
          }}
        >
          <Stack
            sx={{
              boxShadow: "0",
            }}
          >
            {data.map((x) => {
              return (
                <Button
                  variant="contained"
                  sx={{
                    height: "24px",
                    color: "white",
                    backgroundColor: "transparent",
                    fontSize: "10px",
                    borderRadius: "10px",
                    borderStyle: "solid",
                    borderColor: "transparent",
                    cursor: "pointer",
                    boxShadow: "0",
                    "&:hover": {
                      backgroundColor: "transparent",
                      backgroundImage:
                        "linear-gradient(to right bottom,#9f0592, rgb(248, 211, 5))",
                    },
                  }}
                >
                  {x}
                </Button>
              );
            })}
          </Stack>
        </Box>
      </Popover>
    </Box>
  );
};

export const MJPageSelectButton = ({ height, name, num, view, category }) => {
  const [isOpen, setOpen] = useState(false);
  const [model, chgModel] = useContext(AppContext);
  return (
    <Box>
      <Button
        onClick={() => {
          setOpen(true)
          chgModel((newModel) => {
            newModel.弹出框 = ""
          })
        }}
        variant="contained"
        sx={{
          width: "108px",
          position: "relative",
          color: "white",
          height: height,
          fontSize: "12px",
          whiteSpace: "break-spaces",
          cursor: "pointer",
          backgroundColor: "#545454",
          borderRadius: "8px",
          border: "1px",
          borderStyle: "solid",
          borderColor: "transparent",
          backgroundClip: num > 0 ? "padding-box, border-box" : "",
          backgroundOrigin: num > 0 ? "padding-box, border-box" : "",
          backgroundImage:
            "linear-gradient(to right, #545454, #545454), linear-gradient(to bottom, rgb(248, 211, 5), #9f0592)",
          "&:hover": {
            backgroundColor: "#212121",
          },
        }}
      >
        <Stack
          direction="row"
          sx={{ justifyContent: "center", alignItems: "center" }}
        >
          {name}
          {num > 0 ? (
            <Box sx={{ position: "relative", width: "16px", height: "16px" }}>
              <Box sx={{ position: "absolute", top: "1px", left: "8px" }}>
                <Box
                  sx={{
                    backgroundColor: "#2c2c2c",
                    width: "16px",
                    height: "16px",
                    borderRadius: "100px",
                  }}
                ></Box>
                <Box sx={{ position: "relative", top: "-19px", left: "-1px" }}>
                  {String(num)}
                </Box>
              </Box>
            </Box>
          ) : (
            <></>
          )}
        </Stack>
      </Button>
      <Dialog
        open={isOpen}
        onClose={() => { }}
        sx={{
          "& .MuiPaper-rounded": {
            borderRadius: "16px",
          },
          width: "350px",
        }}
      >
        <Box>
          <Box
            sx={{
              backgroundColor: "#5c5c5c",
              padding: "10px 5px 0px 5px",

              color: "white",
            }}
          >
            <Stack direction="row" spacing={auto}>
              <Box sx={{ paddingLeft: "6px" }}></Box>
              <Box sx={{ position: "relative", top: "-3px" }}>{name}</Box>
              <Box sx={{ paddingLeft: "6px" }}></Box>
              <Stack
                direction="row"
                divider={<Divider orientation="vertical" flexItem />}
                sx={{
                  backgroundColor: "#f9f9f9",
                  borderRadius: "16px",
                  height: "20px"
                }}
              >
                <SearchIcon
                  sx={{
                    color: "#8c8c8c",
                    padding: "0px 0px 0px 5px",
                    transition: "0.25s",
                    width: "20px",
                    "&:hover": {
                      color: "#555555"
                    }
                  }}
                />
                <Input
                  placeholder={"查询"}
                  variant="filled"
                  disableUnderline="true"
                  sx={{
                    fontSize: "8px",
                    color: "black",
                    padding: "8px 8px 8px 8px",
                    borderRadius: "16px",
                    backgroundColor: "transparent",
                    height: "22px",
                    width: "128px",
                  }}
                />
              </Stack>
              <Box sx={{ paddingLeft: "4px" }}></Box>
              <HighlightOffIcon
                sx={{
                  position: "relative",
                  top: "-2px",
                  transition: "0.25s",
                  "&:hover": {
                    color: "#AAAAAA"
                  }
                }}
                onClick={() => setOpen(false)}
              />
              <Box sx={{ paddingLeft: "8px" }}></Box>
            </Stack>
            <Box sx={{ height: "2px" }} />
          </Box>

          <Box
            sx={{
              border: "2px solid #5c5c5c",
              borderBottomLeftRadius: "16px",
              borderBottomRightRadius: "16px",
              backgroundColor: "#3c3c3c",
            }}
          >
            <MJDraftPage view={view} category={category} />
            <Box sx={{
              paddingLeft: "98px"
            }}>
              <Box sx={{ height: "8px" }} />
              <Button
                variant="contained"
                onClick={() => setOpen(false)}
                sx={{
                  padding: "10px",
                  width: "84px",
                  height: "24px",

                  color: "white",
                  backgroundColor: "transparent",
                  backgroundImage:
                    "linear-gradient(to right bottom,#9f0592, rgb(248, 211, 5))",
                  fontSize: "8px",
                  borderRadius: "10px",
                  borderStyle: "solid",
                  borderColor: "transparent",
                  cursor: "pointer",
                  boxShadow: "0",
                }}
              >
                <FileDownloadDoneIcon
                  sx={{ width: "16px", height: "16px" }}
                />
                优化
              </Button>
            </Box>
            <Box sx={{
              paddingTop: "10px"
            }}></Box>
          </Box>
        </Box>

      </Dialog>
    </Box>
  );
};

export const MJSelectButton = ({ icon, name, event, isSelected }) => {
  return (
    <Box
      onClick={() => {
        event(isSelected);
      }}
      sx={{
        height: "108px",
        width: "88px",
        borderRadius: "16px",
        backgroundColor: "#5c5c5c",
        transition: "0.25s",
        backgroundImage: isSelected
          ? "linear-gradient(to bottom, rgb(248, 211, 5), #9f0592)"
          : "",
        "&:hover": {
          backgroundColor: "#3c3c3c",
        },
        fontSize: "16px",

        color: "#f9f9f9",
      }}
    >
      <Stack>
        <Box sx={{ height: "2px" }} />
        <Box sx={{ margin: "auto", borderRadius: "12px", overflow: "hidden" }}>{icon}</Box>
        <Box sx={{ margin: "auto", fontSize: "12px" }}>{name}</Box>
      </Stack>
    </Box>
  );
};

export const MJDraftPage = ({ view, category }) => {
  const [model, chgModel] = useContext(AppContext);
  return (
    <Box sx={{ height: "400px", width: "276px" }}>
      <Box
        sx={{
          height: "400px",
          width: "264px",
          paddingLeft: "12px",
          overflowY: "scroll"
        }}
      >
        <Grid container>
          {Object.values(model[view][category]).map((x) => {
            const enabled = HasTag(model, x.name)
            return (
              <Grid xs={5.4} key={x.name} sx={{ padding: "5px" }}>
                <Box
                  sx={{
                    padding: "16px",
                  }}
                >
                  <MJSelectButton
                    name={x.name}
                    icon={x.icon}
                    event={(isSelected) => {
                      chgModel((newModel) => {
                        if (enabled) {
                          RemoveTag(newModel, x.name)
                        }
                        else {
                          AddTag(newModel, x.name);
                        }
                      });
                    }}
                    isSelected={enabled}
                  />
                </Box>
              </Grid>
            );
          })}
        </Grid>
      </Box>
      <Box sx={{
        width: "276px",
        height: "20px",
        position: "absolute",
        bottom: "44px",
        backgroundImage: "linear-gradient(to bottom, transparent,#3c3c3c )"
      }} />
    </Box>

  );
};

export const MJSimpleDropButton = ({ name, data, height }) => {
  const buttonRef = useRef(null);
  const [pushed, setPushed] = useState(false);
  const [model, chgModel] = useContext(AppContext);
  var selectItem = ""
  for (let i = 0; i < data.length; i++) {
    if (HasTag(model, data[i].itemName)) {
      selectItem = data[i].itemName
    }
  }

  return (
    <Box
      sx={{
        position: "relative",
      }}
    >
      <Button
        variant="contained"
        sx={{
          width: "72px",
          position: "relative",
          color: "white",
          padding: "5px 0px",
          height: height,
          fontSize: "10px",
          whiteSpace: "break-spaces",
          cursor: "pointer",
          backgroundColor: "#545454",
          borderTopLeftRadius: "8px",
          borderTopRightRadius: "8px",
          borderBottomLeftRadius: pushed ? "0px" : "8px",
          borderBottomRightRadius: pushed ? "0px" : "8px",
          border: "3px",
          borderStyle: "solid",
          borderColor: "transparent",
          "&:hover": {
            backgroundColor: "#212121",
          },
        }}
        onClick={() => setPushed(true)}
        ref={buttonRef}
      >
        {selectItem === "" ? name : selectItem}
      </Button>
      <Popover
        open={pushed}
        onClose={() => setPushed(false)}
        anchorEl={buttonRef.current}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        sx={{
          borderTopLeftRadius: "0px",
          borderTopRightRadius: "0px",
          zIndex: "9999",
          // "& .MuiPaper-rounded": {
          //   borderTopLeftRadius: "0px",
          //   borderTopRightRadius: "0px",
          //   borderBottomLeftRadius: "12px",
          //   borderBottomRightRadius: "12px",
          // },
        }}
      >
        <Stack
          spacing={0}
          sx={{
            backgroundColor: "#545454",
          }}
        >
          {data.map((x) => {
            const { itemName, itemEvent } = x;
            return (
              <Button
                variant="contained"
                onClick={() => {
                  itemEvent(itemName);
                }}
                sx={{
                  margin: "4px",
                  width: "64px",
                  height: height,
                  padding: "10px",
                  // 
                  color: "white",
                  fontSize: "10px",
                  cursor: "pointer",
                  boxShadow: "0",
                  backgroundColor: "#5c5c5c",
                  "&:hover": {
                    backgroundColor: "#3c3c3c",
                  },
                }}
              >
                {itemName}
              </Button>
            );
          })}
        </Stack>
      </Popover>
    </Box>
  );
};

export const MJTraceButton = ({ reference }) => {
  const [model, chgModel] = useContext(AppContext);
  return (
    <Stack>
      <Box sx={{ height: model.痕迹底框 ? "0px" : "12px" }} />
      <Stack direction="row">
        <Box sx={{
          height: model.痕迹底框 ? "12px" : "0px",
          width: "12px",
          backgroundColor: "#9f0592"
        }}>
          <Box sx={{
            height: model.痕迹底框 ? "12px" : "0px",
            width: "12px",
            borderTopRightRadius: "24px",
            backgroundColor: "#1f1f1f",
          }} />
        </Box>
        <Box sx={{
          height: model.痕迹底框 ? "12px" : "0px",
          width: "44px",
          backgroundColor: "#9f0592"
        }}></Box>
        <Box sx={{
          height: model.痕迹底框 ? "12px" : "0px",
          width: "12px",
          backgroundColor: "#9f0592"
        }}>
          <Box sx={{
            height: model.痕迹底框 ? "12px" : "0px",
            width: "12px",
            borderTopLeftRadius: "24px",
            backgroundColor: "#1f1f1f"
          }} />
        </Box>
      </Stack>

      <Stack direction="row">
        <Box sx={{ width: "12px" }} />
        <Box>
          <Box
            onClick={() => {
              chgModel((newModel) => {
                newModel.收藏底框 = newModel.分享底框 = false
                newModel.痕迹底框 = !newModel.痕迹底框
              })
            }}
            sx={{
              backgroundColor: "#4c4c4c",
              borderTopLeftRadius: model.痕迹底框 ? "0px" : "32px",
              borderTopRightRadius: model.痕迹底框 ? "0px" : "32px",
              borderBottomLeftRadius: "32px",
              borderBottomRightRadius: "32px",
              width: "44px",
              height: "44px",
              backgroundImage: model.痕迹底框 ? "linear-gradient(to bottom,#9f0592, rgb(248, 211, 5))" : "",
            }}
          >
            <AccessTimeIcon sx={{ color: "white", padding: "8px 10px" }} />
          </Box>
          <Box
            sx={{
              fontSize: "10px",
              color: "white",

              textAlign: "center",
              paddingTop: "5px",
            }}
          >
            {"痕迹"}
          </Box>
        </Box>
        <Popper open={model.痕迹底框} anchorEl={reference.current} placement={"top"}>
          <Box sx={{
            border: "3px",
            borderStyle: "solid",
            borderColor: "transparent",
            borderRadius: "12px",
            backgroundClip: "padding-box, border-box",
            backgroundOrigin: "padding-box, border-box",
            backgroundImage: "linear-gradient(to right, #545454, #545454), linear-gradient(to bottom, rgb(248, 211, 5), #9f0592)",
          }}>
            <MJTracePage />
          </Box>
        </Popper>
      </Stack>
    </Stack>
  );
};
const MJTracePage = () => {
  const [model, chgModel] = useContext(AppContext);
  return <Box sx={{
    width: "287px",
    height: "99px",
    background: "#3c3c3c",
    borderRadius: "9px",
  }}>
    <Stack spacing={1} divider={<Divider orientation="horizontal" flexItem />} sx={{ padding: "8px" }}>
      {Object.entries(model.痕迹).map(([trace, time]) => {
        return <Stack direction="row" spacing={1}>
          <Box sx={{
            fontSize: "8px",
            color: "#bbbbbb"
          }}>
            {trace}
          </Box>
          <Box sx={{ width: "64px" }}></Box>
          <Box sx={{
            fontSize: "8px",
            color: "#bbbbbb"
          }}>
            {time}
          </Box>
        </Stack>
      })}
    </Stack>
  </Box>

}

export const MJSchoolButton = () => {
  const [model, chgModel] = useContext(AppContext);
  return (
    <Stack>
      <Box sx={{ height: "12px" }} />
      <Stack direction="row">
        <Box sx={{ width: "12px" }} />
        <Box>
          <Box
            onClick={() => {
              chgModel((newModel) => {
                newModel.痕迹底框 = newModel.收藏底框 = newModel.分享底框 = false
              })
            }}
            sx={{
              backgroundColor: "#4c4c4c",
              borderRadius: "32px",
              width: "44px",
              height: "44px",
              "&:hover": {
                backgroundImage: "linear-gradient(to bottom,#9f0592, rgb(248, 211, 5))",
              }
            }}
          >
            <PublicOffIcon sx={{ color: "white", padding: "8px 10px" }} />
          </Box>
          <Box
            sx={{
              fontSize: "10px",
              color: "white",

              textAlign: "center",
              paddingTop: "5px",
            }}
          >
            {"学院"}
          </Box>
        </Box>
        <Box sx={{ width: "12px" }} />
      </Stack>
    </Stack>
  );
};

export const MJCollectionButton = ({ reference }) => {
  const [model, chgModel] = useContext(AppContext);
  return (
    <Stack>
      <Box sx={{ height: model.收藏底框 ? "0px" : "12px" }} />
      <Stack direction="row">
        <Box sx={{
          height: model.收藏底框 ? "12px" : "0px",
          width: "12px",
          backgroundColor: "#9f0592"
        }}>
          <Box sx={{
            height: model.收藏底框 ? "12px" : "0px",
            width: "12px",
            borderTopRightRadius: "24px",
            backgroundColor: "#1f1f1f",
          }} />
        </Box>
        <Box sx={{
          height: model.收藏底框 ? "12px" : "0px",
          width: "44px",
          backgroundColor: "#9f0592"
        }}></Box>
        <Box sx={{
          height: model.收藏底框 ? "12px" : "0px",
          width: "12px",
          backgroundColor: "#9f0592"
        }}>
          <Box sx={{
            height: model.收藏底框 ? "12px" : "0px",
            width: "12px",
            borderTopLeftRadius: "24px",
            backgroundColor: "#1f1f1f"
          }} />
        </Box>
      </Stack>

      <Stack direction="row">
        <Box sx={{ width: "12px" }} />
        <Box>
          <Box
            onClick={() => {
              chgModel((newModel) => {
                newModel.痕迹底框 = newModel.分享底框 = false
                newModel.收藏底框 = !newModel.收藏底框
              })
            }}
            sx={{
              backgroundColor: "#4c4c4c",
              borderTopLeftRadius: model.收藏底框 ? "0px" : "32px",
              borderTopRightRadius: model.收藏底框 ? "0px" : "32px",
              borderBottomLeftRadius: "32px",
              borderBottomRightRadius: "32px",
              width: "44px",
              height: "44px",
              backgroundImage: model.收藏底框 ? "linear-gradient(to bottom,#9f0592, rgb(248, 211, 5))" : "",
            }}
          >
            <FavoriteIcon sx={{ color: "white", padding: "8px 10px" }} />
          </Box>
          <Box
            sx={{
              fontSize: "10px",
              color: "white",

              textAlign: "center",
              paddingTop: "5px",
            }}
          >
            {"收藏"}
          </Box>
        </Box>
        <Popper open={model.收藏底框} anchorEl={reference.current} placement={"top"} sx={{ zIndex: "9999", }}>
          <Box sx={{
            border: "2px",
            borderStyle: "solid",
            borderColor: "transparent",
            borderRadius: "12px",
            backgroundClip: "padding-box, border-box",
            backgroundOrigin: "padding-box, border-box",
            backgroundImage: "linear-gradient(to right, #545454, #545454), linear-gradient(to bottom, rgb(248, 211, 5), #9f0592)",

          }}>
            <MJCollectionPage />
          </Box>
        </Popper>
      </Stack>
    </Stack>
  );
};
const MJCollectionPage = () => {
  const [model, chgModel] = useContext(AppContext);
  return <Box><Box sx={{
    width: "280px",
    height: "476px",
    background: "#3c3c3c",
    borderRadius: "9px 9px 0px 0px",
  }}>
    <Box sx={{ padding: "16px 16px 0px 16px" }}>
      <Stack
        direction="row"
        divider={<Divider orientation="vertical" flexItem />}
        sx={{
          backgroundColor: "#f9f9f9",
          borderRadius: "16px",
          height: "24px"
        }}
      >
        <SearchIcon
          sx={{
            height: "20px",
            width: "20px",
            color: "#8c8c8c",
            padding: "5px 0px 0px 5px",
            transition: "0.25s",
            "&:hover": {
              color: "#AAAAAA"
            }
          }}
        />
        <Input
          placeholder={"查询"}
          variant="filled"
          disableUnderline="true"
          sx={{
            fontSize: "8px",
            color: "black",
            padding: "8px 8px 8px 8px",
            borderRadius: "16px",
            backgroundColor: "#f9f9f9",
            height: "24px",
            width: "128px",
          }}
        />
      </Stack>
    </Box>
    <Box sx={{
      overflowY: "scroll",
      width: "272px",
      height: "435px",
      paddingLeft: "8px",
    }}>
      <Grid container >
        {Object.entries(model.收藏).map(([key, [value, icon]]) => {
          return (
            <Grid xs={6} key={key}>
              <Box
                sx={{
                  padding: "16px",
                }}
              >
                <MJSelectCollectionButton
                  name={key}
                  icon={icon}
                  event={(isSelected) => {
                    chgModel((newModel) => {
                      newModel.收藏[key][0] = !isSelected;
                    });
                  }}
                  isSelected={value}
                />
              </Box>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  </Box>
    <Box sx={{ height: "8px", backgroundColor: "#3c3c3c", borderRadius: "0px 0px 12px 12px" }} />
  </Box>
}
const MJSelectCollectionButton = ({ icon, name, event, isSelected }) => {
  function truncate(str, limit) {
    if (str.length > limit) {
      str = str.substr(0, limit) + "...";
    } else {
      return str;
    }
    return str;
  }
  return (
    <Box
      onClick={() => {
        if (event !== undefined) event(isSelected);
      }}
      sx={{
        height: "112px",
        width: "96px",
        borderRadius: "16px",
        backgroundColor: "#5c5c5c",
        transition: "0.25s",
        backgroundImage: isSelected
          ? "linear-gradient(to bottom, rgb(248, 211, 5), #9f0592)"
          : "",
        "&:hover": {
          backgroundColor: "#3c3c3c",
        },
        fontSize: "16px",

        color: "#f9f9f9",
      }}
    >
      <Stack>
        <Box sx={{ height: "4px" }} />
        <Box sx={{ margin: "auto", backgroundColor: "#f9f9f9", width: "84px", height: "84px", borderRadius: "12px", overflow: "hidden", }}>
          <Box sx={{ margin: "auto" }}></Box>
          {icon}
        </Box>
        <Stack direction="row">
          <FavoriteBorderIcon sx={{ height: "16px", width: "16px", paddingLeft: "4px", paddingTop: "2px" }} />
          <Box sx={{ fontWeight: "normal", fontSize: "8px", paddingTop: "2px" }}>{truncate(name, 5)}</Box>
        </Stack>

      </Stack>
    </Box>
  );
};

export const MJShareButton = () => {
  const [model, chgModel] = useContext(AppContext);
  return (
    <Stack>
      <Box sx={{ height: "12px" }} />
      <Stack direction="row">
        <Box sx={{ width: "12px" }} />
        <Box>
          <Box
            onClick={() => {
              chgModel((newModel) => {
                newModel.分享底框 = true
              })
            }}
            sx={{
              backgroundColor: "#4c4c4c",
              borderRadius: "32px",
              width: "44px",
              height: "44px",
              backgroundImage: model.分享底框 ? "linear-gradient(to bottom,#9f0592, rgb(248, 211, 5))" : "",
            }}
          >
            <ShareIcon sx={{ color: "white", padding: "8px 10px" }} />
          </Box>
          <Box
            sx={{
              fontSize: "10px",
              color: "white",

              textAlign: "center",
              paddingTop: "5px",
            }}
          >
            {"分享"}
          </Box>
        </Box>
        <Box sx={{ width: "12px" }} />
      </Stack>

      <Popover
        open={model.分享底框}
        onClose={() => {
          chgModel((newModel) => {
            newModel.分享底框 = false
          })
        }}
        sx={{
          top: "200px",
          left: "54px",
          zIndex: "9999",
          "& .css-3bmhjh-MuiPaper-root-MuiPopover-paper": {
            boxShadow: "0",
          },
          "& .MuiPaper-rounded": {
            borderTopLeftRadius: "12px",
            borderTopRightRadius: "12px",
            borderBottomLeftRadius: "12px",
            borderBottomRightRadius: "12px",
          },
        }}
      >
        <Box sx={{
          border: "3px",
          borderStyle: "solid",
          borderColor: "transparent",
          borderRadius: "12px",
          backgroundClip: "padding-box, border-box",
          backgroundOrigin: "padding-box, border-box",
          backgroundImage: "linear-gradient(to right, #545454, #545454), linear-gradient(to bottom, rgb(248, 211, 5), #9f0592)",
        }}>
          <Box sx={{
            width: "232px",
            height: "140px",
            padding: "20px",
            background: "#3c3c3c",
            borderRadius: "9px",
          }}>
            <MJSharePage />
          </Box>
        </Box>
      </Popover>
    </Stack>
  );
};
const MJSharePage = () => {
  const [model, chgModel] = useContext(AppContext);
  return <Stack spacing={1}>
    <Stack direction="row" spacing={1}>
      <ShareOutlinedIcon sx={{
        width: "20px",
        height: "20px",
        color: "#f9f9f9"
      }} />
      <Box sx={{
        fontSize: "16px",

        color: "#f9f9f9"
      }}>
        {"分享"}
      </Box>
    </Stack>
    <Box sx={{
      height: "64px",
      width: "auto",
      padding: "0px 6px",
      borderRadius: "6px",
      backgroundColor: "#f9f9f9"
    }}>
      <Box sx={{
        height: "36px",
        width: "auto",
        color: "#3c3c3c",

        fontSize: "16px",
      }}>
        {model.邀请码}
      </Box>

      <Box sx={{
        padding: "0px",
        height: "16px",
        width: "auto",

      }}>
        <Stack direction="row" spacing={1}>
          <Box sx={{
            width: "100%"
          }}></Box>
          <CopyAllIcon sx={{
            color: "0f0f0f",
            transition: "0.25s",
            "&:hover": {
              color: "#888888"
            }
          }} />
        </Stack>
      </Box>
    </Box>
    <Box sx={{
      fontSize: "14px",
      color: "white"
    }}>{"有其他用户注册使用你的邀请码,便可获得一天VIP使用权限"}</Box>
  </Stack>
}