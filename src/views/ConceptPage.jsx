import { Box, Stack } from '@mui/material';
import { MJDropButton, MJPageSelectButton } from '../components/Components';
import { auto } from '@popperjs/core';
import React, { useContext } from 'react';
import { AppContext } from '../App';
import { AddTag, HasTag, RemoveTag } from '../schema/model';

export const MJConcept = (props) => {
    const [model, chgModel] = useContext(AppContext)
    var maCount = 0
    var stCount = 0
    var bgCount = 0
    for (let x in model.概念效果图.产品材质) {
        if (HasTag(model, x)) {
            maCount++;
        }
    }
    for (let x in model.概念效果图.产品风格) {
        if (HasTag(model, x)) {
            stCount++;
        }
    }
    for (let x in model.概念效果图.环境背景) {
        if (HasTag(model, x)) {
            bgCount++;
        }
    }
    return <Stack spacing={1} sx={{ padding: "8px 5px" }}>
        <Stack spacing={auto} direction="row" sx={{ padding: "0px 10px" }}>
            <Box sx={{ padding: "0px 10px" }}><MJDropButton name={"视角"} height={"32px"} data={[
                {
                    itemName: "正视图", itemEvent: () => {
                        chgModel((newModel) => {
                            newModel.概念效果图.视角 = "正视图"
                            AddTag(newModel, "正视图")
                            RemoveTag(newModel, "侧视图")
                            RemoveTag(newModel, "俯视图")
                            RemoveTag(newModel, "三视图")
                        })
                    }
                },
                {
                    itemName: "俯视图", itemEvent: () => {
                        chgModel((newModel) => {
                            newModel.概念效果图.视角 = "俯视图"
                            AddTag(newModel, "俯视图")
                            RemoveTag(newModel, "正视图")
                            RemoveTag(newModel, "侧视图")
                            RemoveTag(newModel, "三视图")
                        })
                    }
                },
                {
                    itemName: "侧视图", itemEvent: () => {
                        chgModel((newModel) => {
                            newModel.概念效果图.视角 = "侧视图"
                            AddTag(newModel, "侧视图")
                            RemoveTag(newModel, "正视图")
                            RemoveTag(newModel, "俯视图")
                            RemoveTag(newModel, "三视图")
                        })
                    }
                },
                {
                    itemName: "三视图", itemEvent: () => {
                        chgModel((newModel) => {
                            newModel.概念效果图.视角 = "三视图"
                            AddTag(newModel, "三视图")
                            RemoveTag(newModel, "正视图")
                            RemoveTag(newModel, "俯视图")
                            RemoveTag(newModel, "侧视图")
                        })
                    }
                }
            ]} />
            </Box>
            <Box sx={{ padding: "0px 10px" }}>
                <MJPageSelectButton name={"产品材质"} height={"32px"} num={maCount} view={"概念效果图"} category={"产品材质"} />
            </Box>
        </Stack>
        <Stack spacing={auto} direction="row" sx={{ padding: "0px 10px" }}>
            <Box sx={{ padding: "0px 10px" }}>
                <MJPageSelectButton name={"产品风格"} height={"32px"} num={stCount} view={"概念效果图"} category={"产品风格"} />
            </Box>
            <Box sx={{ padding: "0px 10px" }}>
                <MJPageSelectButton name={"环境背景"} height={"32px"} num={bgCount} view={"概念效果图"} category={"环境背景"} />
            </Box>
        </Stack>
    </Stack>
}