import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
// import { CSSTransitionGroup } from 'react-transition-group'
import { Typography, Button, Card, CardHeader, CardContent, CardActions, Collapse, Grid, Paper } from '@material-ui/core';
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
      allCategories: [],
      testCategory: '',
      questionAskedExpanded: false
    }
  }

  componentDidMount() {
    this.getCategories();
  }

  getCategories = () => {
    axios.get('http://localhost:3001/api/questions/index/category')
      .then((res) => {
        this.setState({allCategories: res.data});
      }
    )
      .catch(error => console.log(error))
  };

  getQuestion = () => {
    const { testCategory } = this.state;
    axios.get(`http://localhost:3001/api/question/test/${testCategory}`)
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

  setCategory = category => {
    this.setState({ testCategory: category }, () => {
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

  renderHeader = () => {
    const { classes } = this.props;
    if(this.state.testCategory === undefined || this.state.testCategory === '') {
      return (
        <div className={classes.header}>
          <h1>Choose a category to test</h1>
          <Grid
            container
            direction='row'
            justify='center'
            alignItems='flex-start'
            spacing='40'
          >
            {this.state.allCategories.map(category => (

                <Grid item lg={3}>
                  <Paper
                    className={classes.categoryPaper}
                    onClick={() => this.setCategory(category)}
                    key={category}
                    name={category}
                  >
                    {category}
                  </Paper>
                </Grid>
            ))}
          </Grid>
        </div>
      );
    } else {
      return (
        <div className={classes.header}>
          <h1>You're currently testing <span className={classes.capitalize}>{this.state.testCategory}</span></h1>
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
      console.log('updateSubQuestionsAsked');
      console.log(updateSubQuestionsAsked);
      this.setState({
        questionAskedExpanded: !this.state.questionAskedExpanded,
        subQuestionsAsked: updateSubQuestionsAsked,
        subQuestionsToAsk: updateSubQuestionsToAsk,
      }, () => console.log(this.state));
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
    console.log(this.state);

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
