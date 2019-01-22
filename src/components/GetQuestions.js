import React, { Component } from 'react';
import QuestionList from './QuestionList';

export default class GetQuestions extends Component {
    render() {
        return (
            <div>
                <p>Click on a category to edit questions</p>
                <QuestionList />
            </div>
        )
    }
}
