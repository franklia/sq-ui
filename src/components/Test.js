import React, { Component } from 'react';
import ConfirmUserCredentials from './helpers/ConfirmUserCredentials.js';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Button, Grid, Paper, Hidden, CircularProgress } from '@material-ui/core';
import axios from 'axios';
import reactLogo from '../images/react.png';
import javascriptLogo from '../images/javascript.png';
import htmlLogo from '../images/html.png';

export default class Test extends Component {

  constructor(props) {
    super(props);

    this.state = {
      parentQuestionDataReceived: false,
      parentQuestionAsked: [],
      subQuestionsAsked: [],
      subQuestionBeingAsked: [],
      subQuestionsToAsk: [],
      subQuestionsNumber: '',
      adminCategoriesDataReceived: false,
      adminCategories: [],
      userCategoriesDataReceived: false,
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
    this.getAdminCategories();
    ConfirmUserCredentials(auth, this.setAuth0Id, this.getUserCategories);
  };

  setAuth0Id = id => {
    this.setState({ auth0_id: id })
  };

  getAdminCategories = () => {
    axios.get(`${process.env.REACT_APP_API_URI}/admin/categories`)
      .then((res) => {
        this.setState({
          adminCategoriesDataReceived: true,
          adminCategories: res.data,
        })
      })
      .catch(error => console.log(error))
  };

  getUserCategories = (userId) => {
    axios.get(`${process.env.REACT_APP_API_URI}/user/categories?`, { params: { userId: userId } })
      .then((res) => {
        this.setState({
          userCategoriesDataReceived: true,
          userCategories: res.data,
        })
      })
      .catch(error => console.log(error))
  };

  getQuestion = () => {
    const { testCategoryId } = this.state;
    axios.get(`${process.env.REACT_APP_API_URI}/question/test/${testCategoryId}`)
      .then((res) => {
        const parentQuestion = res.data._id;
        const firstSubQuestion = res.data.questions[0];
        const subsequentSubQuestions = res.data.questions.slice(1);
        const subQuestionsNumber = res.data.questions.length;
        this.setState({
          parentQuestionDataReceived: true,
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

    const { testCategoryId, adminCategoriesDataReceived, userCategoriesDataReceived, adminCategories, userCategories } = this.state;

    if( testCategoryId === undefined || testCategoryId === '') {
      return (
        <>
          <h1 className='center-align'>Choose a category to test</h1>

          {
            adminCategoriesDataReceived === false && (
              <div className='test-spinner'>
                <CircularProgress />
              </div>
            )
          }

          {
            adminCategoriesDataReceived === true && (
              <Grid
                container
                direction='row'
                alignItems='flex-start'
                justify='center'
                spacing={40}
              >
                {adminCategories.map(category => (
                  <Grid item lg={3} md={3} sm={6} xs={12} key={category._id}>
                    <Paper
                      className='test-category-paper'
                      onClick={this.setCategory}
                      categoryid={category._id}
                      categoryname={category.name}
                    >
                      <h6 className='test-paper-headings'>{category.name}</h6>
                      <img src={process.env.PUBLIC_URL + `/images/${category.image}.png`} width='80' height='80' alt={category.image_alt} />
                      <p className='test-paper-paragraph'>(System Generated)</p>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            )
          }

          {
            userCategoriesDataReceived === true && (
              <>
                <Grid
                  container
                  direction='row'
                  alignItems='flex-start'
                  justify='center'
                  spacing={40}
                >
                  {userCategories.map(category => (

                      <Grid item lg={3} md={3} sm={6} xs={12} key={category._id}>
                        <Paper
                          className='test-category-paper'
                          onClick={this.setCategory}
                          categoryid={category._id}
                          categoryname={category.name}
                        >
                          {category.name}
                          <p>(User Generated)</p>
                        </Paper>
                      </Grid>
                  ))}
                </Grid>
              </>
            )
          }
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
       this.setState({
         parentQuestionDataReceived: false,
       },this.getQuestion());
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
        { /*
          this.state.parentQuestionDataReceived === false && (
            <div className='test-spinner'>
              <CircularProgress />
            </div>
          )
        */}
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
