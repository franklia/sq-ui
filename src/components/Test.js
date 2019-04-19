import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ConfirmUserCredentials from './helpers/ConfirmUserCredentials.js';
// import { CSSTransitionGroup } from 'react-transition-group'
import { Button, Card, CardHeader, CardContent, CardActions, Collapse, Grid, Paper } from '@material-ui/core';
import TouchApp from '@material-ui/icons/TouchApp';
import axios from 'axios';

const styles = theme => ({
  wrapper: {

  },
  header: {
    marginTop: 50,
    marginBottom: 40,
    textAlign: 'center',
  },
  categoryPaper: {
    textTransform: 'uppercase',
    padding: '40px 20px',
  },
  cardColumn: {
    maxWidth: 500,
  },
  question: {
    background: '#fff',
    marginTop: 15,
    whiteSpace: 'pre-line'
  },
  answer: {
    background: '#f6f8ff'
  },
  cardActions: {
    color: 'grey',
  },
  capitalize: {
    textTransform: 'capitalize'
  }
});

class Test extends Component {

  constructor(props) {
    super(props);

    this.state = {
      subQuestionsAsked: [],
      subQuestionsToAsk: [],
      adminCategories: [],
      userCategories: [],
      testCategoryId: '',
      testCategoryName: '',
      auth0_id: '',
      questionAskedExpanded: false
    }
  }

  componentDidMount = () => {
    const { auth } = this.props;
    ConfirmUserCredentials(auth, this.setAuth0Id, this.getCategories);
  }

  setAuth0Id = id => {
    this.setState({ auth0_id: id })
  }

  getCategories = (userId) => {
    axios.get('http://localhost:3001/api/questions/index/category?', { params: { userId: userId } })
      .then((res) => {
        // console.log(res.data.adminCategories);
        this.setState({
          adminCategories: res.data.adminCategories,
          userCategories: res.data.userCategories,
        }, () => console.log(this.state))

      })
      .catch(error => console.log(error))
  }

  getQuestion = () => {
    const { testCategoryId } = this.state;
    axios.get(`http://localhost:3001/api/question/test/${testCategoryId}`)
      .then((res) => {
        const firstQuestion = res.data.questions[0];
        const subsequentQuestions = res.data.questions.slice(1);
        this.setState({
          subQuestionsAsked: [firstQuestion],
          subQuestionsToAsk: subsequentQuestions,
          questionAskedExpanded: false
        }, () => console.log(this.state));
      }
    )
      .catch(error => console.log(error))
  };

  setCategory = event => {
    this.setState({
      testCategoryId: event.target.getAttribute('categoryid'),
      testCategoryName: event.target.getAttribute('categoryname')
    }, () => {
      this.getQuestion();
    });
  };

  resetCategory = () => {
    this.setState({
      testCategory: '',
      subQuestionsToAsk: [],
      subQuestionsAsked: []
    });
  }

  revealAnswerClick = () => {
    this.setState({
      questionAskedExpanded: !this.state.questionAskedExpanded
    });
  };

  // goTo(route) {
  //   this.props.history.replace(`/${route}`)
  // }

  login() {
    this.props.auth.login();
  }

  logout() {
    this.props.auth.logout();
  }

  renderHeader = () => {
    const { classes } = this.props;

    if(this.state.testCategoryId === undefined || this.state.testCategoryId === '') {
      return (
        <div className={classes.header}>
          <h1>Choose a category to test</h1>
          <Grid
            container
            direction='row'
            justify='center'
            alignItems='flex-start'
            spacing={40}
          >
            {this.state.adminCategories.map(category => (

                <Grid item lg={3} key={category._id}>
                  <Paper
                    className={classes.categoryPaper}
                    onClick={this.setCategory}
                    categoryid={category._id}
                    categoryname={category.name}
                  >
                    {category.name}
                  </Paper>
                </Grid>
            ))}
          </Grid>
        </div>
      );
    } else {
      return (
        <div className={classes.header}>
          <h1>You're currently testing <span className={classes.capitalize}>{this.state.testCategoryName}</span></h1>
          <span style={{cursor: 'pointer', color: 'blue'}} onClick={this.resetCategory}>(change category)</span>
        </div>
      );
    }
  };

  // renderNewQuestion = () => {
  //   // const removeAnswer = null;
  //   ReactDOM.render(null, document.getElementById('answer'));
  //   this.getQuestion();
  // };

  // renderAnswer = () => {
  //   const answerContent = (
  //     <div>
  //       <p style={{whiteSpace: 'pre-line'}}>{this.state.subQuestionsToAsk[0].sub_answer}</p>
  //       <Button onClick={this.renderNewQuestion} variant="contained" color="secondary" style={{marginTop: 25, marginRight: 15}}>New Question</Button>
  //     </div>
  //   );
  //
  //   ReactDOM.render(answerContent, document.getElementById('answer'));
  // };

  renderNewQuestion = () => {
    if (this.state.subQuestionsToAsk === undefined || this.state.subQuestionsToAsk.length === 0) {
      this.getQuestion();
    } else {
      const nextSubQuestion = [this.state.subQuestionsToAsk[0]];
      const updateSubQuestionsAsked = nextSubQuestion.concat(this.state.subQuestionsAsked);
      const updateSubQuestionsToAsk = this.state.subQuestionsToAsk.splice(1);
      this.setState({
        questionAskedExpanded: !this.state.questionAskedExpanded,
        subQuestionsAsked: updateSubQuestionsAsked,
        subQuestionsToAsk: updateSubQuestionsToAsk,
      });
    }
  }


  renderQuestionAsked = () => {
    const { classes } = this.props;

    const displayClickPrompt = (
      <>
        <TouchApp/>
        <p>Click card to reveal answer</p>
      </>
    );

    if(this.state.subQuestionsAsked === undefined || this.state.subQuestionsAsked.length === 0) {
      return null;
    } else {
      return (
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="flex-start"
        >
          <Grid item lg={12} className={classes.cardColumn} onClick={this.revealAnswerClick}>
            <Card className={classes.questionAskedCard}>
              <CardHeader subheader="Sub question 1 of 3" />
              <CardContent className={classes.question}>
                <p>{this.state.subQuestionsAsked[0].sub_question}</p>
              </CardContent>
              <CardActions className={classes.cardActions}>
                { this.state.questionAskedExpanded === false ? displayClickPrompt : null }
              </CardActions>
              <Collapse in={this.state.questionAskedExpanded} className={classes.answer} timeout="auto" unmountOnExit>
                <CardContent>
                  <p style={{whiteSpace: 'pre-line'}}>{this.state.subQuestionsAsked[0].sub_answer}</p>
                  <Button
                    onClick={this.renderNewQuestion}
                    variant="contained" color="secondary"
                    style={{marginTop: 25, marginRight: 15}}
                  >
                    {this.state.subQuestionsToAsk.length >= 1 ? 'Next' : 'New Question'}
                  </Button>
                </CardContent>
              </Collapse>
            </Card>
          </Grid>
        </Grid>
      );
    }
  };

  render() {

    const { classes } = this.props;

    return (
      <div className={classes.wrapper}>
        {this.renderHeader()}
        {this.renderQuestionAsked()}
      </div>
    )
  }
}

Test.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Test);
