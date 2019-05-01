import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import './css/Styles.css';

import Home from './pages/Home';
import Test from './Test';
import CreateQuestion from './CreateQuestion';
import ViewQuestions from './ViewQuestions';
import Notfound from './Notfound';
import NavMenu from './NavMenu';
import EditQuestion from './EditQuestion';
import Categories from './pages/Categories';

import Callback from './helpers/Callback';
import Auth from './helpers/Auth';
import history from './helpers/history';

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

const auth = new Auth();

const handleAuthentication = ({location}) => {
  if (/access_token|id_token|error/.test(location.hash)) {
    auth.handleAuthentication();
  }
}

class App extends Component {

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <MuiThemeProvider theme={theme}>
        <CssBaseline />
          <Router history={history} component={Home}>
            <div className={classes.bodyBackground}>
              <NavMenu auth={auth} />
              <div className='page-content-wrapper'>
                <Switch>
                  <Route exact path="/" render={(props) => <Home auth={auth} {...props} />} />
                  <Route exact path="/test" render={(props) => <Test auth={auth} {...props} />} />
                  <Route exact path='/question/create' render={(props) => <CreateQuestion auth={auth} {...props} />} />
                  <Route exact path='/questions/index' render={(props) => <ViewQuestions auth={auth} {...props} />} />
                  <Route exact path='/question/:id' render={(props) => <EditQuestion auth={auth} {...props} />} />
                  <Route exact path='/callback' render={(props) => {
                    handleAuthentication(props);
                    return <Callback {...props} />
                  }}/>
                  <Route exact path="/categories" render={(props) => <Categories auth={auth} {...props} />} />
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
