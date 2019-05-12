import React, { Component } from 'react';
import ConfirmUserCredentials from './helpers/ConfirmUserCredentials.js';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Button, Grid, Paper, Hidden } from '@material-ui/core';
// import TouchApp from '@material-ui/icons/TouchApp';
import axios from 'axios';

export default class Test extends Component {

  constructor(props) {
    super(props);

    this.state = {
      parentQuestionAsked: [],
      subQuestionsAsked: [],
      subQuestionBeingAsked: [],
      subQuestionsToAsk: [],
      subQuestionsNumber: '',
      adminCategories: [],
      userCategories: [],
      testCategoryId: '',
      testCategoryName: '',
      auth0_id: '',
      subAnswerDisplayed: true,
      showAnswerButtonDisplayed: true,
    }
  }

  componentDidMount = () => {
    const { auth } = this.props;
    ConfirmUserCredentials(auth, this.setAuth0Id, this.getCategories);
  };

  setAuth0Id = id => {
    this.setState({ auth0_id: id })
  };

  getCategories = (userId) => {
    axios.get('http://localhost:3001/api/questions/index/category?', { params: { userId: userId } })
      .then((res) => {
        this.setState({
          adminCategories: res.data.adminCategories,
          userCategories: res.data.userCategories,
        }, () => console.log(this.state))
      })
      .catch(error => console.log(error))
  };

  getQuestion = () => {
    const { testCategoryId } = this.state;
    axios.get(`http://localhost:3001/api/question/test/${testCategoryId}`)
      .then((res) => {
        const parentQuestion = res.data._id;
        const firstSubQuestion = res.data.questions[0];
        const subsequentSubQuestions = res.data.questions.slice(1);
        const subQuestionsNumber = res.data.questions.length;
        this.setState({
          parentQuestionAsked: [parentQuestion],
          subQuestionBeingAsked: [firstSubQuestion],
          subQuestionsToAsk: subsequentSubQuestions,
          subQuestionsAsked: [],
          subQuestionsNumber: subQuestionsNumber,
          subAnswerDisplayed: !this.state.subAnswerDisplayed,
          showAnswerButtonDisplayed: true,
        });
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
      testCategoryId: '',
      testCategoryName: '',
      subQuestionsToAsk: [],
      subQuestionsAsked: [],
      subQuestionBeingAsked: []
    });
  };

  renderHeader = () => {
    if(this.state.testCategoryId === undefined || this.state.testCategoryId === '') {
      return (
        <>
          <h1 className='center-align'>Choose a category to test</h1>
          <Grid
            container
            direction='row'
            alignItems='flex-start'
            justify='center'
            spacing={40}
          >
            {this.state.adminCategories.map(category => (

                <Grid item lg={3} md={3} sm={6} xs={12} key={category._id}>
                  <Paper
                    className='test-category-paper'
                    onClick={this.setCategory}
                    categoryid={category._id}
                    categoryname={category.name}
                  >
                    {category.name}
                  </Paper>
                </Grid>
            ))}
          </Grid>
        </>
      );
    } else {
      return (
        <div className='test-header'>
          <Grid
            container
            direction='row'
            alignItems='flex-start'
            justify='center'
            spacing={40}
          >
            <Grid item lg={6} className='test-in-progress-text-container'>
              <Hidden xsDown>
                <h1 className='center-align test-in-progress-heading'>Test in progress...</h1>
              </Hidden>
              <h6 className='test-sub-heading center-align'>Category being tested: <span className='word-highlight'>{this.state.testCategoryName}</span></h6>
              <button onClick={this.resetCategory} className='test-change-categories-button'>Change Category</button>
            </Grid>
          </Grid>
        </div>
      );
    }
  };

  flipCard = () => {
    setTimeout(
      () => {
        document.querySelector('#question-card').classList.toggle('flip');
      }, 100
    )
  };

  revealAnswer = () => {
    this.setState({
      subAnswerDisplayed: !this.state.subAnswerDisplayed,
      showAnswerButtonDisplayed: !this.state.showAnswerButtonDisplayed,
    });
  }

  renderNewQuestion = () => {
    if (this.state.subQuestionsToAsk === undefined || this.state.subQuestionsToAsk.length === 0) {
      this.getQuestion();
    } else {
      const nextSubQuestion = [this.state.subQuestionsToAsk[0]];
      const updateSubQuestionsAsked = this.state.subQuestionsAsked.concat(this.state.subQuestionBeingAsked);
      const updateSubQuestionsToAsk = this.state.subQuestionsToAsk.splice(1);

      this.setState({
        subQuestionBeingAsked: nextSubQuestion,
        subQuestionsAsked: updateSubQuestionsAsked,
        subQuestionsToAsk: updateSubQuestionsToAsk,
        subAnswerDisplayed: !this.state.subAnswerDisplayed,
        showAnswerButtonDisplayed: !this.state.showAnswerButtonDisplayed,
      })
    }
  }

  renderQuestionAsked = () => {
    if(this.state.subQuestionBeingAsked === undefined || this.state.subQuestionBeingAsked.length === 0) {
      return null;
    } else {
      return (
        <>
        {/* Container and transition for parent question */}
        <TransitionGroup>
          <CSSTransition
            key={this.state.parentQuestionAsked[0]}
            in={true}
            appear={true}
            onEntered={this.flipCard}
            timeout={900}
            classNames='flip-container'
          >
          <Grid
            container
            direction='row'
            alignItems='flex-start'
            justify='center'
            spacing={40}
          >
            <Grid item lg={6}>
            <div id='question-card' class='flip-container'>
            	<div class='flipper'>
                {/* Front of card */}
            		<div class='front' id='front-of-card'>
            			<h1>Question</h1>
                  <h1 class='front-question-mark'>?</h1>
            		</div>
                {/* Back of card containing sub questions */}
        		    <div className='back' id='back-of-card'>
                  {/* Display summary and transition for sub questions already asked */}
                  {this.state.subQuestionsAsked !== [] || this.state.subQuestionsAsked !== null ?
                    this.state.subQuestionsAsked.map(subQuestion => (
                      <TransitionGroup>
                        <CSSTransition
                          key={this.state.subQuestionsAsked[0]}
                          in={true}
                          appear={true}
                          timeout={300}
                          classNames='sub-questions'
                        >
                          <div className='sub-questions-asked-container'>
                            <span className='test-question-numbering'>{`${subQuestion.id} of ${this.state.subQuestionsNumber}`}</span>
                            <p className='test-question-paragraph'>{subQuestion.sub_question}</p>
                            <div className='test-line-separator'></div>
                            <div className='sub-question-asked-answer-wrapper'>
                              <p className='sub-question-asked-answer'>{subQuestion.sub_answer}</p>
                            </div>
                          </div>
                        </CSSTransition>
                      </TransitionGroup>
                    ))
                    : null
                  }
                  {/* Display sub question currently being asked */}
                  <div class='sub-question-being-asked-container'>
                    <span className='test-question-numbering'>{`${this.state.subQuestionBeingAsked[0].id} of ${this.state.subQuestionsNumber}`}</span>
              			<p className='test-question-paragraph'>{this.state.subQuestionBeingAsked[0].sub_question}</p>
                    {this.state.showAnswerButtonDisplayed === true ?
                      <Button
                        onClick={this.revealAnswer}
                        variant='contained' color='secondary'
                        className='test-show-answer-button'
                      >
                        Show Answer
                      </Button>
                      : <div className='test-line-separator'></div>
                    }
                    {/* Display sub answer currently being asked */}
                    {this.state.subAnswerDisplayed === true ?
                      <div class='back-card-answer'>
                        <p>{this.state.subQuestionBeingAsked[0].sub_answer}</p>
                      </div>
                      : null
                    }
                    {/* Display button to trigger new question */}
                    {this.state.subAnswerDisplayed === true ?
                      <Button
                        onClick={this.renderNewQuestion}
                        variant='contained' color='secondary'
                        className='test-new-question-button'
                      >
                        {this.state.subQuestionsToAsk.length >= 1 ? 'Next' : 'New Question'}
                      </Button>
                      : null
                    }
                  </div> {/* Finish sub-question-being-asked-container */}
                </div> {/* Finish back-of-card */}
            	</div> {/* Finish flipper */}
            </div> {/* Finish flip-container */}
            </Grid>
          </Grid>
          </CSSTransition>
        </TransitionGroup>
      </>
      );
    }
  };

  render() {
    return (
      <div className='wrapper'>
        {this.renderHeader()}
        {this.renderQuestionAsked()}
      </div>
    )
  }
}
