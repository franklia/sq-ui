import React, { Component } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { blue, blueGrey } from '@material-ui/core/colors';
import './components/css/Styles.css';

import Home from './components/Test';
import Create from './components/Create';
import GetQuestions from './components/GetQuestions';
import Notfound from './components/Notfound';
import NavMenu from './components/NavMenu';
import EditQuestion from './components/EditQuestion';

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: blueGrey,
  },
  typography: {
    useNextVariants: true,
  },
});

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <MuiThemeProvider theme={theme}>
          <Router>
            <div className='container'>
              <NavMenu />
              <div className='page-content-wrapper'>
                <Switch>
                    <Route exact path='/' component={ Home } />
                    <Route path='/questions/create' component={ Create } />
                    <Route exact path='/questions/index' component={ GetQuestions } />
                    <Route path='/question/:id' component={ EditQuestion } />
                    <Route component={ Notfound } />
                </Switch>
              </div>
            </div>
          </Router>
        </MuiThemeProvider>
      </React.Fragment>
    );
  }
}

export default App;
