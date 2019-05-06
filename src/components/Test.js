import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
// import PropTypes from 'prop-types';
// import { withStyles } from '@material-ui/core/styles';
import ConfirmUserCredentials from './helpers/ConfirmUserCredentials.js';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Button, Grid, Paper } from '@material-ui/core';
// import TouchApp from '@material-ui/icons/TouchApp';
import axios from 'axios';

// const styles = theme => ({
//   wrapper: {
//
//   },
//   header: {
//     marginTop: 50,
//     marginBottom: 40,
//     textAlign: 'center',
//   },
//   categoryPaper: {
//     textTransform: 'uppercase',
//     padding: '40px 20px',
//   },
//   cardColumn: {
//     maxWidth: 500,
//   },
//   question: {
//     background: '#fff',
//     marginTop: 15,
//     whiteSpace: 'pre-line'
//   },
//   answer: {
//     background: '#f6f8ff'
//   },
//   cardActions: {
//     color: 'grey',
//   },
//   capitalize: {
//     textTransform: 'capitalize'
//   }
// });

export default class Test extends Component {

  constructor(props) {
    super(props);

    this.state = {
      parentQuestionAsked: [],
      subQuestionsAsked: [],
      subQuestionBeingAsked: [],
      subQuestionsToAsk: [],
      adminCategories: [],
      userCategories: [],
      testCategoryId: '',
      testCategoryName: '',
      auth0_id: '',
      parentCardDisplayed: true,
      childCardDisplayed: true,
      subAnswerDisplayed: false,
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
        this.setState({
          parentQuestionAsked: [parentQuestion],
          subQuestionBeingAsked: [firstSubQuestion],
          subQuestionsToAsk: subsequentSubQuestions,
          subQuestionsAsked: [],
          subAnswerDisplayed: !this.state.subAnswerDisplayed,
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
      testCategoryId: '',
      testCategoryName: '',
      subQuestionsToAsk: [],
      subQuestionsAsked: []
    });
  };

  // goTo(route) {
  //   this.props.history.replace(`/${route}`)
  // }

  login() {
    this.props.auth.login();
  };

  logout() {
    this.props.auth.logout();
  };

  renderHeader = () => {
    // const { classes } = this.props;

    if(this.state.testCategoryId === undefined || this.state.testCategoryId === '') {
      return (
        <div className='header'>
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
                    className='categoryPaper'
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
        <div className='header'>
          <h1>You're currently testing <span className='capitalize'>{this.state.testCategoryName}</span></h1>
          <span style={{cursor: 'pointer', color: 'blue'}} onClick={this.resetCategory}>(change category)</span>
        </div>
      );
    }
  };

  setCardHeight = () => {
    const backOfCard = document.getElementById('back-of-card');
    const backOfCardHeight = backOfCard.offsetHeight;
    console.log(backOfCardHeight);
    // const frontOfCard = document.getElementById('front-of-card');
    // const frontOfCardHeight = frontOfCard.offsetHeight;
    // if (backOfCardHeight === '' || backOfCardHeight === null){
      document.getElementById('question-card').style.height = `${backOfCardHeight}px`;
    // }
    // else {
    //   document.getElementById('question-card').style.height = `${backOfCardHeight}px`;
    // }

  }

  flipCard = () => {
    document.querySelector('#question-card').classList.toggle('flip');
    // this.setCardHeight();
  };

  revealAnswer = () => {
    this.setState(
      { subAnswerDisplayed: !this.state.subAnswerDisplayed },
      // this.setCardHeight()
    );
  }

  // renderNewQuestion = () => {
  //   // const removeAnswer = null;
  //   ReactDOM.render(null, document.getElementById('answer'));
  //   this.getQuestion();
  // };

  // renderAnswer = () => {
  //   const answerContent = (
  //     <div>
  //       <p style={{whiteSpace: 'pre-line'}}>{this.state.subQuestionsToAsk[0].sub_answer}</p>
  //       <Button onClick={this.renderNewQuestion} variant='contained' color='secondary' style={{marginTop: 25, marginRight: 15}}>New Question</Button>
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
      const updateSubQuestionsAsked = this.state.subQuestionsAsked.concat(this.state.subQuestionBeingAsked);
      const updateSubQuestionsToAsk = this.state.subQuestionsToAsk.splice(1);
      this.setState({
        subQuestionBeingAsked: nextSubQuestion,
        subQuestionsAsked: updateSubQuestionsAsked,
        subQuestionsToAsk: updateSubQuestionsToAsk,
        subAnswerDisplayed: !this.state.subAnswerDisplayed,
      });
    }
  }


  renderQuestionAsked = () => {
    // const { classes } = this.props;

    // const displayClickPrompt = (
    //   <>
    //     <TouchApp/>
    //     <p>Click card to reveal answer</p>
    //   </>
    // );

    if(this.state.subQuestionBeingAsked === undefined || this.state.subQuestionBeingAsked.length === 0) {
      return null;
    } else {
      return (
        <>
        {/* Transitions for minimised sub questions already asked */}
        <TransitionGroup>
        <CSSTransition
          key={this.state.parentQuestionAsked[0]}
          in={this.state.parentCardDisplayed}
          appear={true}
          timeout={1200}
          classNames='sub-questions'
        >
          <Grid container >
            {this.state.subQuestionsAsked.map(subQuestion => (
              <TransitionGroup>
              <CSSTransition
                key={this.state.subQuestionsAsked[0]}
                in={this.state.parentCardDisplayed}
                appear={true}
                timeout={1200}
                classNames='sub-questions'
              >
              <Grid item lg={1} md={1} sm={2} xs={3} className='sub-question-asked'>
                {subQuestion.id}
              </Grid>
              </CSSTransition>
              </TransitionGroup>
            ))}
          </Grid>
        </CSSTransition>
        </TransitionGroup>
        {/* Transition for parent question */}
        <TransitionGroup>
        <CSSTransition
          key={this.state.parentQuestionAsked[0]}
          in={this.state.parentCardDisplayed}
          appear={true}
          onEntered={this.flipCard}
          timeout={1200}
          classNames='flip-container'
        >
        <div id='question-card' class='flip-container' onTouchStart={() => "this.classList.toggle('hover');"}>
        	<div class='flipper'>
        		<div class='front' id='front-of-card'>
        			<h1>Let's Play!</h1>
              <h1>?</h1>
        		</div>
            {/* Transition for sub question currently being asked */}
            <TransitionGroup>
            <CSSTransition
              key={this.state.subQuestionBeingAsked[0]}
              in={this.state.parentCardDisplayed}
              appear={true}
              timeout={1200}
              classNames='flip-container'
            >
        		<div class='back' id='back-of-card'>
              <div class='back-card-question'>
          			<p>{this.state.subQuestionBeingAsked[0].sub_question}</p>

                <Button
                  onClick={this.revealAnswer}
                  variant='contained' color='secondary'
                >
                  Show Answer
                </Button>

              </div>
              {/* Transition for displaying sub answer currently being asked */}
              {this.state.subAnswerDisplayed === true ?
                <TransitionGroup>
                  <CSSTransition
                    key={this.state.subQuestionBeingAsked[0]}
                    in={this.state.parentCardDisplayed}
                    appear={true}
                    timeout={1200}
                    classNames='sub-question-displayed'
                  >
                    <div class='back-card-answer'>
                      <p>{this.state.subQuestionBeingAsked[0].sub_answer}</p>
                      <Button
                        onClick={this.renderNewQuestion}
                        variant='contained' color='secondary'
                      >
                        {this.state.subQuestionsToAsk.length >= 1 ? 'Next' : 'New Question'}
                      </Button>
                    </div>
                  </CSSTransition>
                </TransitionGroup>
                : null
              }
        		</div>
            </CSSTransition>
          </TransitionGroup>
        	</div>
        </div>
        </CSSTransition>
        </TransitionGroup>
{
        // <Button
        //   onClick={this.flipCard}
        //   variant='contained' color='secondary'
        //   style={{marginTop: 25, marginRight: 15}}
        // >
        //   Flip Card
        // </Button>
}

        {
        // <Grid
        //   container
        //   direction='row'
        //   justify='center'
        //   alignItems='flex-start'
        // >
        //   <Grid item lg={12} className='cardColumn' onClick={this.revealAnswerClick}>
        //     <Card className='questionAskedCard'>
        //       <CardHeader subheader='Sub question 1 of 3' />
        //       <CardContent className='question'>
        //         <p>{this.state.subQuestionsAsked[0].sub_question}</p>
        //       </CardContent>
        //       <CardActions className='cardActions'>
        //         { this.state.questionAskedExpanded === false ? displayClickPrompt : null }
        //       </CardActions>
        //       <Collapse in={this.state.questionAskedExpanded} className='answer' timeout='auto' unmountOnExit>
        //         <CardContent>
        //           <p style={{whiteSpace: 'pre-line'}}>{this.state.subQuestionsAsked[0].sub_answer}</p>
        //           <Button
        //             onClick={this.renderNewQuestion}
        //             variant='contained' color='secondary'
        //             style={{marginTop: 25, marginRight: 15}}
        //           >
        //             {this.state.subQuestionsToAsk.length >= 1 ? 'Next' : 'New Question'}
        //           </Button>
        //         </CardContent>
        //       </Collapse>
        //     </Card>
        //   </Grid>
        // </Grid>
      }

      </>
      );
    }
  };

  render() {

    // const { classes } = this.props;

    return (
      <div className='wrapper'>
        {this.renderHeader()}
        {this.renderQuestionAsked()}
      </div>
    )
  }
}

// Test.propTypes = {
//   classes: PropTypes.object.isRequired,
// };
//
// export default withStyles(styles)(Test);
