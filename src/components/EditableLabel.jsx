import React, { useEffect, useReducer, useState, useRef } from 'react';
import FormControl, { useFormControl } from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import Box from '@mui/material/Box';
import FormHelperText from '@mui/material/FormHelperText';
import { Pattern } from '@mui/icons-material';


export const EditableLabel = ({Text, onCommit, checker, onEnter}) => {
    const [isEditing, setIsEditing] = useState(false)
    const [value, setValue] = useState(Text)
    const [helperText, setHelperText] = useState("")

    function handleEditClick(){
        onEnter()
        setIsEditing(true)
    }

    function handleSubmit(){
        const {status, text} = checker(value)
        if(status === false){
            setHelperText(text)
        }else{
            setHelperText("")
            setIsEditing(false)
            onCommit(value)
        }
    }

    return isEditing 
        ? (
            <Box component="form" noValidate autoComplete="off" sx={{
                position:"relative",
                height:"20px",
                width:"100px",
                margin:"0"
            }}>
                <FormControl sx={{ width: '100px', padding:"0px"}}>
                    <OutlinedInput sx={{
                        fontSize:"14px",
                        padding:"0px",
                        "> input":{
                        padding:"0px 5px",
                        backgroundColor:"white"
                        }
                    }} 
                    value={value} onChange={(e) => setValue(e.target.value)} onBlur={handleSubmit}/>
                    <FormHelperText sx={{
                        color:"red",
                        position:"relative",
                        fontSize:"9px",
                        margin:"0px",
                        padding:"0px",
                        border:"0px",
                        textAlign:"center"
                        }}>
                            {helperText}
                    </FormHelperText>
                </FormControl>
            </Box>
        ):(
            <a style={{position:"relative", width:"100px", height:"20px"}} onClick={handleEditClick}>{value}</a>
        )
}