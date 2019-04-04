import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
// import { blue, blueGrey, teal } from '@material-ui/core/colors';
import './css/Styles.css';

import Test from './Test';
import CreateQuestion from './CreateQuestion';
import ViewQuestions from './ViewQuestions';
import Notfound from './Notfound';
import NavMenu from './NavMenu';
import EditQuestion from './EditQuestion';

const theme = createMuiTheme({
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: '#ff5c72', // main orange color eg. logo and buttons
      dark: '#f23f57', // darker orange for hover over buttons
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      light: '#fafcff', // background color of pages
      main: '#7d93b2', // paragraph text color
      dark: '#4c6280', // heading text color
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    background: {
      default: '#fafcff', // this is applied to the html <body> tag
    }
  },
  typography: {
    useNextVariants: true,
    fontFamily: [
      'Nunito',
      'sans-serif',
    ].join(','),
    fontWeight: 400,
    color: '#4c6280',
  },
});

const styles = theme => ({
  bodyBackground: {
    maxWidth: 1280,
    margin: 'auto'
  },
});

class App extends Component {

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <MuiThemeProvider theme={theme}>
        <CssBaseline />
          <Router>
            <div className={classes.bodyBackground}>
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

// export default ;
export default withStyles(styles)(App);
