import React, { Component } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import ConfirmUserCredentials from '../helpers/ConfirmUserCredentials.js';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Button, Grid, Paper, Hidden, CircularProgress, Link, Tooltip } from '@material-ui/core';
import axios from 'axios';
import HelpOutline from '@material-ui/icons/HelpOutline';

export default class Test extends Component {

  constructor(props) {
    super(props);

    this.state = {
      parentQuestionDataReceived: false,
      parentQuestionAsked: [],
      subQuestionsAsked: [],
      subQuestionAskingNow: [],
      subQuestionsToAsk: [],
      subQuestionsNumber: '',
      adminCategoriesDataReceived: false,
      adminCategories: [],
      userCategoriesDataReceived: false,
      userCategories: [],
      testCategoryId: '',
      testCategoryName: '',
      auth0_id: '',
      subAnswerDisplayed: false,
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
        if (res.data.length > 0){
          this.setState({
            adminCategoriesDataReceived: true,
            adminCategories: res.data[0].categories,
          });
        } else {
          this.setState({
            adminCategoriesDataReceived: true,
            adminCategories: [],
          });
        }
      })
      .catch(error => console.log(error))
  };

  getUserCategories = (auth0Id) => {
    axios.get(`${process.env.REACT_APP_API_URI}/user/categories?`, { params: { auth0Id: auth0Id } })
      .then((res) => {
        if (res.data.length > 0){
          this.setState({
            userCategoriesDataReceived: true,
            userCategories: res.data[0].categories,
          });
        } else {
          this.setState({
            userCategoriesDataReceived: true,
            userCategories: [],
          });
        }
      })
      .catch(error => console.log(error))
  };

  getQuestion = () => {
    const { testCategoryId } = this.state;
    axios.get(`${process.env.REACT_APP_API_URI}/question/test/${testCategoryId}`)
      .then((res) => {
        if (res.data.length === 0){
          this.setState({
            parentQuestionDataReceived: true,
            parentQuestionAsked: []
          })
        } else {
        const parentQuestion = res.data._id;
        const firstSubQuestion = res.data.questions[0];
        const subsequentSubQuestions = res.data.questions.slice(1);
        const subQuestionsNumber = res.data.questions.length;
        this.setState({
          parentQuestionDataReceived: true,
          parentQuestionAsked: [parentQuestion],
          subQuestionAskingNow: [firstSubQuestion],
          subQuestionsToAsk: subsequentSubQuestions,
          subQuestionsAsked: [],
          subQuestionsNumber: subQuestionsNumber,
          subAnswerDisplayed: false,
          showAnswerButtonDisplayed: true,
        }, console.log(this.state));
      }
    })
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
      subQuestionAskingNow: [],
      parentQuestionDataReceived: false,
      parentQuestionAsked: [],
    });
  };

  renderHeader = () => {
    const { testCategoryId, testCategoryName, adminCategoriesDataReceived, userCategoriesDataReceived, adminCategories, userCategories } = this.state;

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
                      <h6
                        className='test-paper-headings test-move-under'
                        categoryid={category._id}
                        categoryname={category.name}
                      >
                        {category.name}
                      </h6>
                      <img
                        className='test-move-under'
                        src={process.env.PUBLIC_URL + `/images/${category.image}.png`}
                        width='80' height='80'
                        alt={category.image_alt}
                        categoryid={category._id}
                        categoryname={category.name}
                      />
                      <p
                        className='test-paper-paragraph'
                        categoryid={category._id}
                        categoryname={category.name}
                      >
                        System Generated
                      </p>
                      <Tooltip
                        classes={{
                          tooltip: 'test-tooltip',
                          popper: 'test-tooltip-popper'
                        }}
                        title={
                          <>
                            <p className='test-tooltip-p'>System generated categories are created by the software provider. </p>
                            <p className='test-tooltip-p'>The category name and it's associated questions cannot be edited.</p>
                          </>
                        }
                        aria-label='Add'
                      >
                        <HelpOutline className='test-helpOutlineIcon' />
                      </Tooltip>
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
                          <p
                            className='test-paper-paragraph'
                            categoryid={category._id}
                            categoryname={category.name}
                          >
                            User Generated
                          </p>
                          <Tooltip
                            classes={{
                              tooltip: 'test-tooltip',
                              popper: 'test-tooltip-popper'
                            }}
                            title={
                              <>
                                <p className='test-tooltip-p'>User generated categories are created by you, the user. </p>
                                <p className='test-tooltip-p'>You can edit the name of the category and all it's questions.</p>
                              </>
                            }
                            aria-label='Add'
                          >
                            <HelpOutline className='test-helpOutlineIcon' />
                          </Tooltip>
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
              <h6 className='test-sub-heading center-align'>Category being tested: <span className='word-highlight'>{testCategoryName}</span></h6>
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
      subAnswerDisplayed: true,
      showAnswerButtonDisplayed: false,
    });
  }

  renderNewQuestion = () => {
    const { subQuestionsToAsk, subQuestionsAsked } = this.state;

    if (subQuestionsToAsk === undefined || subQuestionsToAsk.length === 0) {
       this.setState({
         parentQuestionDataReceived: false,
         subQuestionAskingNow: [],
       },this.getQuestion());
    } else {
      const nextSubQuestion = [subQuestionsToAsk[0]];
      const updateSubQuestionsAsked = subQuestionsAsked.concat(this.state.subQuestionAskingNow);
      const updateSubQuestionsToAsk = subQuestionsToAsk.splice(1);

      this.setState({
        subQuestionAskingNow: nextSubQuestion,
        subQuestionsAsked: updateSubQuestionsAsked,
        subQuestionsToAsk: updateSubQuestionsToAsk,
        subAnswerDisplayed: false,
        showAnswerButtonDisplayed: true,
      })
    }
  }

  renderSpinner = () => {
    const { parentQuestionDataReceived, parentQuestionAsked, testCategoryId } = this.state;

    if (testCategoryId === '') {
      return null;
    } else if (parentQuestionDataReceived === false) {
      return (
        <div className='test-spinner'>
          <CircularProgress />
        </div>
      )
    } else if (parentQuestionDataReceived === true && parentQuestionAsked.length === 0) {
      return (
        <p className='test-no-questions'>You haven't added any questions for this category yet. <Link component={RouterLink} to='/question/create'  className='link'>Add some now</Link></p>
      )
    }
  };

  renderQuestionAsked = () => {
    const { parentQuestionAsked, subQuestionAskingNow, subQuestionsAsked, subQuestionsToAsk, subQuestionsNumber, showAnswerButtonDisplayed, subAnswerDisplayed } = this.state;

    if (subQuestionAskingNow.length === 0 || subQuestionAskingNow === undefined) {
      return null;
    } else {
      return (
        <>
        {/* Container and transition for parent question */}
        <TransitionGroup>
          <CSSTransition
            key={parentQuestionAsked[0]}
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
            <div id='question-card' className='flip-container'>
            	<div className='flipper'>
                {/* Front of card */}
            		<div className='front' id='front-of-card'>
            			<h1>Question</h1>
                  <h1 className='front-question-mark'>?</h1>
            		</div>
                {/* Back of card containing sub questions */}
        		    <div className='back' id='back-of-card'>
                  {/* Display summary and transition for sub questions already asked */}
                  {subQuestionsAsked !== [] || subQuestionsAsked !== null ?
                    subQuestionsAsked.map(subQuestion => (
                      <TransitionGroup>
                        <CSSTransition
                          key={subQuestionsAsked[0]}
                          in={true}
                          appear={true}
                          timeout={300}
                          classNames='sub-questions'
                        >
                          <div className='sub-questions-asked-container'>
                            <span className='test-question-numbering'>{`${subQuestion.id} of ${subQuestionsNumber}`}</span>
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
                  <div className='sub-question-being-asked-container'>
                    <span className='test-question-numbering'>{`${subQuestionAskingNow[0].id} of ${subQuestionsNumber}`}</span>
              			<p className='test-question-paragraph'>{subQuestionAskingNow[0].sub_question}</p>
                    {showAnswerButtonDisplayed === true ?
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
                    {subAnswerDisplayed === true ?
                      <div className='back-card-answer'>
                        <p>{subQuestionAskingNow[0].sub_answer}</p>
                      </div>
                      : null
                    }
                    {/* Display button to trigger new question */}
                    {subAnswerDisplayed === true ?
                      <Button
                        onClick={this.renderNewQuestion}
                        variant='contained' color='secondary'
                        className='test-new-question-button'
                      >
                        {subQuestionsToAsk.length >= 1 ? 'Next' : 'New Question'}
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
        {this.renderSpinner()}
        {this.renderQuestionAsked()}
      </div>
    )
  }
}
