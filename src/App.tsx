import React from 'react';
import createStore from './store';
import { Provider } from 'react-redux';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import 'react-toastify/dist/ReactToastify.css';
import Wrapper from './components/Wrapper';
import CardControlWrapper from "./components/CardControlWrapper"
import ChartWrapper from "./components/ChartWrapper"

const store = createStore();
const theme = createMuiTheme({
  palette: {
    primary: {
      main: 'rgb(39,49,66)',
    },
    secondary: {
      main: 'rgb(197,208,222)',
    },
    background: {
      default: 'rgb(226,231,238)',
    },
  },
});

const App = () => (
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    <Provider store={store}>
      <Wrapper>
        {/* <Header />
        <NowWhat />
        <ToastContainer />
        <CardHeader></CardHeader> */}
        <CardControlWrapper></CardControlWrapper>
        <ChartWrapper></ChartWrapper>
        
      </Wrapper>
    </Provider>
  </MuiThemeProvider>
);

export default App;
