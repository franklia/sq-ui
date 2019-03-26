import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { blue, blueGrey } from '@material-ui/core/colors';
import './css/Styles.css';

import Test from './Test';
import CreateQuestion from './CreateQuestion';
import ViewQuestions from './ViewQuestions';
import Notfound from './Notfound';
import NavMenu from './NavMenu';
import EditQuestion from './EditQuestion';

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
                    <Route exact path='/' component={ Test } />
                    <Route exact path='/question/create' component={ CreateQuestion } />
                    <Route exact path='/questions/index' component={ ViewQuestions } />
                    <Route exact path='/question/:id' component={ EditQuestion } />
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
