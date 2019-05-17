import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import ConfirmUserCredentials from '../helpers/ConfirmUserCredentials.js';
import axios from 'axios';
import CategoryDropdown from '../ui-elements/CategoryDropdown';
import { Tooltip, Button, TextField, Link } from '@material-ui/core';
import AddCircle from '@material-ui/icons/AddCircle';
import HelpOutline from '@material-ui/icons/HelpOutline';
import { DragDropContext } from 'react-beautiful-dnd';
import Column from '../ui-elements/Column';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory({
  forceRefresh: true
});

const styles = theme => ({
  addSubQuestionRow: {
    margin: '10px 0 40px 0',
  },
  addCircleIcon: {
    position: 'relative',
    top: 5,
    margin: '0 5px 0 7px',
  },
  helpOutlineIcon: {
    margin: '0 0 0 5px',
    fontSize: 18,
    position: 'relative',
    top: 3,
  },
  topic: {
    display: 'block',
    margin: '0 0 40px 0',
    '& p': {
      margin: '10px 0'
    },
  },
  htmlTooltip: {
    backgroundColor: '#627a9c',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 250,
    border: '1px solid #dadde9',
    opacity: 1,
    padding: 20,
  },
  toolTipPopper: {
    opacity: 1,
  },
  toolTipSubText: {
    lineHeight: 1.3,
    color: '#fff',
  },
  addSubQuestionLink: {
    color: '#627a9c',
  },
});

class CreateOrUpdateQuestion extends Component {
  constructor(props){
    super(props);

    // The "columns" and "columnOrder" are used by the react-beautiful-dnd package to order the sub questions. The actual order on the page is stored in this.state.columns['column-1'].questionIds. There is only one column displayed on the page currently but it is set up to accommodate more than one in future if required.

    this.state = {
      category: '',
      userCategories: [],
      receivedCategories: false,
      topic: '',
      auth0Id: '',
      questions: {
        1: {
          id: 1,
          sub_question: '',
          sub_answer: '',
          position: 1
        },
      },
      columns: {
        'column-1': { id: 'column-1', title: 'Questions', questionIds: [1] }
      },
      columnOrder: ['column-1'],
    }
  };

    componentDidMount = () => {
      if (this.props.type === 'update') {
        ConfirmUserCredentials(this.props.auth, this.setUserData, this.getQuestion);
      } else {
        ConfirmUserCredentials(this.props.auth, this.setUserData, () => {});
      }
    };

    setUserData = id => {
      axios.get(`${process.env.REACT_APP_API_URI}/user/categories?`, { params: { auth0Id: id } })
        .then((res) => {
          console.log('categories data');
          console.log(res.data);
          if (res.data.length < 1){
            this.setState({
              ...this.state,
              auth0Id: id,
              receivedCategories: true
            })
          } else {
            this.setState({
              ...this.state,
              auth0Id: id,
              userCategories: res.data[0].categories,
              receivedCategories: true
            })
          }
        })
        .catch(error => console.log(error))
    }

    getQuestion = () => {
      axios.get(`${process.env.REACT_APP_API_URI}/question/` + this.props.id)
        .then((res) => {

          // Check if topic exists and if so, update state
          const topicExists = Object.keys(res.data[0]).includes('topic');
          if (topicExists === true) { this.setState({topic: res.data[0].topic })};

          // Prepare const categoryData for eventual update to this.state.category
          const categoryData = res.data[0].category;
          console.log('categoryData');
          console.log(categoryData);

          // Prepare const questionsDataObject for eventual update to this.state.questions
          // We need to convert questions array into a nested object to match this.state.questions format
          let questionsData = {};
          const questionsDataArray = res.data[0].questions;
          questionsDataArray.forEach(function(element, index) {
            questionsData[element.id] = element;
          });

          // Prepare const columnData for eventual update to this.state.columns (sort by position)
          function comparePositions(a, b) {
            if (a.position < b.position) {
              return -1;
            }
            if (a.position > b.position) {
              return 1;
            }
            return 0;
          }

          const initialQuestionsSort = questionsDataArray.sort(comparePositions);
          const columnDataArray = initialQuestionsSort.map(question => question.id);

          const columnData = {
            ...this.state.columns['column-1'],
            questionIds: columnDataArray
          };

          // Update state
          this.setState({
            ...this.state,
            category: categoryData,
            questions: questionsData,
            columns: {
              'column-1': columnData
            }
          });
        }
      )
        .catch(error => console.log(error))
    };

  handleCategoryChange = event => {
    const categoryId = event.target.value;
    this.setState({
      category: categoryId
    });
  };

  // handleTopicChange = event => {
  //   // const value = event.target.value;
  //   this.setState({
  //     topic: event.target.value
  //   });
  // }

  // Refactor the two functions above into this one
  handleDataChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  onChangeInput = event => {
    const questionId = event.target.id;
    const key = event.target.name;
    const value = event.target.value;
    let question = {...this.state.questions[questionId], [key]: value};
    this.setState({
      ...this.state,
      questions: {...this.state.questions, [questionId]: question}
    });
  };

  addSubQuestion = () => {
    // Determine the new question key
    const questionIdsArray = this.state.columns['column-1'].questionIds;
    const questionsHighestKey = Math.max(...questionIdsArray);
    const questionNewKey = questionsHighestKey + 1;

    //Determine the new quesiton position (in hindsight I should have simply held the positions in this.state.columns because I'm really duplicating it here. It should be refactored)
    const questionsIdsNumber = questionIdsArray.length;
    const questionNewPosition = questionsIdsNumber + 1;

    // Create new question object
    const subQuestion = { id: questionNewKey, sub_question: '', sub_answer: '', position: questionNewPosition };

    // Create new questionIds array
    const newQuestionIdsArray = questionIdsArray.concat(questionNewKey);

    // Update state
    this.setState({
      ...this.state,
      questions: {...this.state.questions, [questionNewKey]: subQuestion},
      columns: {'column-1': {id: 'column-1', title: 'Questions', questionIds: newQuestionIdsArray}},
    });
  };

  deleteSubQuestion = id => {
    console.log(id);
    // Remove question from this.state.questions object
    const questionsObject = this.state.questions;
    delete questionsObject[id];

    // Remove question id from this.state.columns['column-1'].questionIds
    let questionIdsArray = this.state.columns['column-1'].questionIds;

    for (let i = 0; i < questionIdsArray.length; i++){
      if (questionIdsArray[i] === id) {
        questionIdsArray.splice(i, 1);
      }
    }

    // Update state
    this.setState({
      ...this.state,
      questions: questionsObject,
      columns: {'column-1': {id: 'column-1', title: 'Questions', questionIds: questionIdsArray}},
    });
  };

  // This function reorders the questions in our column
  // It was set up using this tutorial for the react-beautiful-dnd library https://egghead.io/lessons/react-course-introduction-beautiful-and-accessible-drag-and-drop-with-react-beautiful-dnd
  onDragEnd = result => {
    const { destination, source, draggableId } = result;

    // If there is no destination, abort.
    if (!destination) {
      return;
    };

    // If the starting position and the end position is the same, abort.
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    };

    // Reorder column.questionIds to match the new positions of the sub questions
    const column = this.state.columns[source.droppableId];
    const newQuestionIds = Array.from(column.questionIds);
    newQuestionIds.splice(source.index, 1);
    newQuestionIds.splice(destination.index, 0, parseInt(draggableId));

    // Prepare const columnUpdate for eventual update to this.state.columns
    const columnUpdate = {
      ...column,
      questionIds: newQuestionIds,
    };

    // Update the position of each question in this.state.questions (in hindsight I should have simply held the positions in this.state.columns because I'm really duplicating it here - this is yet to be refactored)
    const questionsArrayUpdatePositions = newQuestionIds.map(
      (question_id, arrayIndex) => {
        const adjustArrayIndex = arrayIndex + 1;
        const newQuestion = {
          ...this.state.questions[question_id], position: adjustArrayIndex
        }
        return newQuestion;
      }
    );

    // Prepare const questionsObject for eventual update to this.state.questions
    let questionsObject = {};

    questionsArrayUpdatePositions.forEach(function(element, index) {
      questionsObject[element.id] = element;
    });

    // Update state
    this.setState({
      ...this.state,
      questions: questionsObject,
      columns: {
        ...this.state.columns,
        [columnUpdate.id]: columnUpdate,
      }
    });
  };

  onSubmit = (event) => {
    event.preventDefault();
    // Convert nested questions object into an array of the questions
    const questionValues = Object.values(this.state.questions);

    // Check component type (create or update) and post accordingly
    if (this.props.type === 'create') {

      const dataObject = {
        auth0_id: this.state.auth0Id,
        category: this.state.category,
        questions: questionValues,
        status: false,
      };

      // Add topic text to the dataObject if a value exists
      if (this.state.topic !== ''){ dataObject['topic'] = this.state.topic };

      axios.post(`${process.env.REACT_APP_API_URI}/question/create`, dataObject)
        .then(res => console.log(res))
        .catch(error => console.log(error));

      this.setState({
        category: '',
        questions: {
          1: {
            id: '1',
            sub_question: '',
            sub_answer: '',
            position: 1
          },
        },
        columns: {
          'column-1': { id: 'column-1', title: 'Questions', questionIds: [1] }
        },
        columnOrder: ['column-1'],
      });

    } else if (this.props.type === 'update') {

      const dataObject = {
        _id: this.props.id,
        auth0_id: this.state.auth0Id,
        category: this.state.category,
        questions: questionValues,
        status: false
      };

      // Add topic text to the dataObject if a value exists
      if (this.state.topic !== '' && this.state.columns['column-1'].questionIds > 1){
        dataObject['topic'] = this.state.topic;
      };
      console.log(dataObject);

      axios.post(`${process.env.REACT_APP_API_URI}/question/${dataObject._id}`, dataObject)
        .then(res => console.log(res))
        .then(history.replace('/questions/index'))
        .catch(error => console.log(error));
    }
  };

  render() {
    const { classes } = this.props;

    const topic = (
      <TextField
      id='topic'
      name='topic'
      type='text'
      label='Topic'
      className={classes.topic}
      value={this.state.topic}
      placeholder='Enter a topic'
      helperText='For two or more sub questions, add a topic to describe the subject (e.g. "ES6 Functions")'
      required={true}
      InputLabelProps={{ shrink: true }}
      onChange={this.handleDataChange('topic')}
      margin='normal'
      variant='outlined'
      />
    );

    return (
      <>
        <form onSubmit={this.onSubmit}>
          <CategoryDropdown
            category={this.state.category}
            userCategories={this.state.userCategories}
            receivedCategories={this.state.receivedCategories}
            handleCategoryChange={this.handleCategoryChange}
            required={true}
            handleModalOpen={this.handleModalOpen}
            handleModalClose={this.handleModalClose}
            auth0Id={this.state.auth0Id}
            setUserData={this.setUserData}
          />

          { /* Dislay topic input field if there is more than one sub question */ }
          { this.state.columns['column-1'].questionIds.length > 1 ? topic : null }

          <DragDropContext onDragEnd={this.onDragEnd}>
            {this.state.columnOrder.map(columnId => {
              const column = this.state.columns[columnId];
              const questions = column.questionIds.map(questionId => this.state.questions[questionId]);
              const displayHeadingAndDeleteIcon = (() => column.questionIds.length >= 2 ? true : false)();

              return <Column
                        key={column.id}
                        column={column}
                        questions={questions}
                        updateInput={this.onChangeInput.bind(this)} deleteSubQuestion={this.deleteSubQuestion.bind(this)}
                        displayHeadingAndDeleteIcon={displayHeadingAndDeleteIcon}
                      />;
            })}
          </DragDropContext>
          <div className={classes.addSubQuestionRow}>
            <AddCircle className={classes.addCircleIcon} />
            <Link className={classes.addSubQuestionLink} onClick={this.addSubQuestion}>Add sub question</Link>
            <Tooltip
              classes={{
                tooltip: classes.htmlTooltip,
                popper: classes.toolTipPopper,
              }}
              title={
                <React.Fragment>
                  <p className={classes.toolTipSubText}>Sometimes you'll want to ask a series of questions in a row. For example:</p>
                  <p className={classes.toolTipSubText}>1. What is ES6?</p>
                  <p className={classes.toolTipSubText}>2. What is the syntax for writing javascript functions in ES6?</p>
                  <p className={classes.toolTipSubText}>By adding sub questions you can ensure these questions are asked consecutively during otherwise random tests.</p>
                </React.Fragment>
              }
              aria-label='Add'
            >
              <HelpOutline className={classes.helpOutlineIcon} />
            </Tooltip>
          </div>
          <div>
            <Button variant='contained' className='button-general' type='submit'>
              {this.props.buttonText} Question
            </Button>
          </div>
        </form>
      </>
    );
  }
}

export default withStyles(styles)(CreateOrUpdateQuestion);
