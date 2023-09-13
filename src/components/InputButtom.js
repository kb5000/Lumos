import { useEffect, useReducer, useState, useRef } from 'react';
import { Box } from '@mui/material';
import {EditableLabel} from "./EditableLabel"

export const InputButtom = ({Text, InputType, DefaultInfo, InfoType, onEnter, onCommit, clickAble}) => {
    function commitChange(NewText){
        Text = NewText
        onCommit(NewText)
    }

    function handleClick(Type){
        console.log(clickAble)
    }

    function checker(Text, type){
        if(Text === "")
            return {status : false, text : "内容不能为空"}
        return {status : true, text : ""}
    }

    return (
        <Box sx={{
            position:"relative",
            height:"20px",
            width:"200px",
            backgroundColor: "white", 
            margin:"15px auto",
            borderRadius:"16px",
            color:"black",
            fontSize:"14px"
        }} >
            <Box sx={{
                position:"absolute",
                textAlign:"left",
                margin:"auto 10px",
                width:"50%",
                top:"0px"
            }}>
                <a style={{position:"relative"}}>{Text}</a>
            </Box>

            <Box sx={{
                position:"absolute",
                textAlign:"right",
                margin:"auto 10px",
                width:"50%",
                top:"0px",
                right:"0px"
            }}>
                {
                    InputType === 0 || clickAble === false
                    ? <a style={{position:"relative"}}>{DefaultInfo}</a>
                    : null
                }
                {
                    InputType === 1 && clickAble !== false
                    ? <EditableLabel Text={DefaultInfo} onCommit={commitChange} checker={(text) => checker(text, InfoType)} onEnter={onEnter}></EditableLabel>
                    : null
                }
                {
                    InputType === 2 && clickAble !== false
                    ? <a style={{position:"relative"}} onClick={() => handleClick(2)}>{DefaultInfo}</a> 
                    : null
                }
                {
                    InputType === 3 && clickAble !== false
                    ? <a style={{position:"relative"}} onClick={() => handleClick(3)}>{DefaultInfo}</a> 
                    : null
                }
                {
                    InputType === 4 && clickAble !== false
                    ? <a style={{position:"relative"}} onClick={() => handleClick(4)}>{DefaultInfo}</a> 
                    : null
                }
            </Box>
        </Box>
    )
}