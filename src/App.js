import logo from './logo.svg';
import React, { useEffect, useReducer, useState, useRef} from 'react';
import { Box, Stack, createTheme, ThemeProvider } from '@mui/material';
import { MJSelect } from './views/Select'
import { MainView } from './views/MainView';
import { AddInColumn } from './views/AddInColumn';
import { useImmer } from 'use-immer';
import { Model } from './schema/model'
import { UsersPage } from './views/UsersPage';

// PLEASE REPLACE IT WITH YOUR OPENAI (OR ANY OTHER AI SERVICE) URI AND API_KEY
export const BASE_URI = ""
export const API_KEY = ""

const theme = createTheme({
  status: {

  },
  palette: {
  }
});

export const AppContext = React.createContext()

const App = () => {
  const [model, chgModel] = useImmer(Model())
  return (
    <ThemeProvider theme={theme}>
      <AppContext.Provider value={[model, chgModel]}>
        <Stack direction="row" sx={{ margin: 0, border: 0, padding: 0, width: '360px', height: '100vh', background: "transparent" }}>
          <MJSelect/>
          {model.当前页面==="+"?<UsersPage/>:<MainView/>}
        </Stack>
      </AppContext.Provider>
    </ThemeProvider>
  );
}

export default App;
