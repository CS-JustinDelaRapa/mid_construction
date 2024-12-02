import React from 'react';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import TaskList from './components/TaskList';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FF8534', // Updated to lighter orange
      dark: '#FF6B00',
    },
    secondary: {
      main: '#1E3A8A', // MidConstruction dark blue
      dark: '#152B67',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <TaskList />
      </div>
    </ThemeProvider>
  );
}

export default App;
