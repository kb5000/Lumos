import { useEffect, useReducer, useState, useRef } from 'react';
import { MJButton, MJNameDropList, MJDropButton, MJDropList, MJTextBox, MJMetaBox, MJCircleButton } from '../components/Components';
import { Box, containerClasses } from '@mui/material';
import { auto } from '@popperjs/core';
import { Stack } from "@mui/system";
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import { InputButtom } from '../components/InputButtom.js';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import EditIcon from '@mui/icons-material/Edit';
import { UsersPage } from './UsersPage';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
export const AddInColumn = ({UsersData}) => {
    const [usersData, setUsersData] = useState({
        name:"username",
        account:"account",
        phonenumber:"phonenumber",
        email:"email",
        job:"职业",
        collage:"院校",
        wechat:"未绑定",
        QQ:"未绑定",
        likes:"0",
        subscribe:"0",
        share:"0",
    })

    const [isEditing, setIsEditing] = useState(0)

    function handleEditingReqest(){
        setIsEditing(1)
    }

    function getBack(){
        setIsEditing(0)
    }

    return isEditing
        ? <UsersPage UsersData={usersData} getBack={getBack}/>
        :(
        <Box sx={{
            backgroundColor: "#1f1f1f",
            float: "left",
            width: "300px",
            height: "720px"
        }}>
            <Box sx={{
            padding: "10px"
        }}><Stack spacing={1} direction="row"><AutoFixHighIcon sx={{ color: "white", marginLeft: "auto" }} /><h1 style={{ color: "white", fontSize: "16px", marginRight: "auto" }}>Flagrate</h1></Stack></Box>

            {/* <Box sx={{color:"white"}}>
                <ArrowBackIosNewIcon sx={{position:"absolute", top:"30px", left:"80px"}}/>
            </Box> */}
            <Box sx={{margin:"10px", left:"200px", position:"relative"}}>
                <MJButton title={"简/EN"} />
            </Box>
            <Box sx={{lineHeight:"10px"}}><br/></Box>
            <Box sx={{width:"40px", backgroundColor:"rgb(241, 169, 52)", position:"absolute", height:"40px", zIndex:"1", borderRadius:"20px", left:"190px"}}>

            </Box>
            <Box sx={{position:"relative", textAlign:"center", zIndex:"2", height:"5px", color:"white"}}>
                <AccountCircleOutlinedIcon sx={{fontSize:"40px", position:"relative", margin:"0px"}}/>
            </Box>
            <Box sx={{
                zIndex:"0",
                margin:"0 auto",
                position:"relative",
                width:"240px",
                height:"150px",
                backgroundImage: "linear-gradient(to bottom, rgb(241, 169, 52), rgb(185, 60, 158))",
                // right:"0px",
                // top:"50px",
                borderRadius: "16px",
            }}>
                <p style={{lineHeight:"5px"}}><br/></p>
                <Box sx={{textAlign:"center", color:"white"}}>
                    <Box sx={{margin:"5px", fontSize:"15px", fontWeight :"bold"}}>{usersData.name}</Box>
                    <Box sx={{margin:"5px", fontSize:"10px"}}>{usersData.email}</Box>
                    <Box sx={{margin:"5px", fontSize:"15px", fontWeight :"bold"}}>{usersData.job}</Box>
                    <Box sx={{margin:"5px", fontSize:"10px"}}>{usersData.likes}喜欢·{usersData.share}分享</Box>
                    <button style={{backgroundColor:"transparent",border:"0px",color:"white",width:"240px"}} onClick={handleEditingReqest}><Box sx={{margin:"5px", fontSize:"10px", position:"relative", top:"5px", display:"flex", justifyContent:"flex-end"}} >
                        
                            <Box sx={{height:"20px",margin:"4px 0px 3px 0px"}} >编辑个人资料</Box>
                            <EditIcon sx={{margin:"0px"}}/>
                        
                    </Box></button>
                </Box>
            </Box>
            <Box sx={{
                zIndex:"0",
                margin:"30px auto",
                position:"relative",
                width:"240px",
                height:"150px",
                backgroundColor:"#272727",
                borderRadius: "16px",
            }}>
                <Stack sx={{
                    color:"white",
                    margin:"10px",
                    position:"relative",
                    top:"5px",
                    fontSize:"15px"
                }} direction="row">
                    <AddIcon sx={{fontSize:"20px"}}/> 添加侧栏
                </Stack>
                <Stack sx={{
                    color:"white",
                    margin:"10px",
                    position:"relative",
                    top:"5px",
                    fontSize:"10px"
                }} direction="row">
                    <Box sx={{backgroundColor:"#494949", borderRadius:"16px", width:"55px", padding:"5px", margin:"auto", textAlign:"center"}}>草图</Box>
                    <Box sx={{backgroundColor:"#494949", borderRadius:"16px", width:"55px", padding:"5px", margin:"auto", textAlign:"center"}}>精细草图</Box>
                    <Box sx={{backgroundColor:"#494949", borderRadius:"16px", width:"55px", padding:"5px", margin:"auto", textAlign:"center"}}>草模</Box>
                </Stack>
                <Stack sx={{
                    color:"white",
                    margin:"10px",
                    position:"relative",
                    top:"5px",
                    fontSize:"10px"
                }} direction="row">
                    <Box sx={{backgroundColor:"#494949", borderRadius:"16px", width:"55px", padding:"5px", margin:"auto", textAlign:"center"}}>概念/效果图</Box>
                    <Box sx={{backgroundColor:"#494949", borderRadius:"16px", width:"55px", padding:"5px", margin:"auto", textAlign:"center"}}>IP形象</Box>
                    <Box sx={{backgroundColor:"#494949", borderRadius:"16px", width:"55px", padding:"5px", margin:"auto", textAlign:"center"}}>插画设计</Box>
                </Stack>
            </Box>
        </Box>
    )
}