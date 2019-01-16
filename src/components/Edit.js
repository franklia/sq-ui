import React, { Component } from 'react';
import EditAccordion from './EditAccordion';

export default class Edit extends Component {
    render() {
        return (
            <div>
                <p>Click on a category to edit questions</p>
                <EditAccordion />
            </div>
        )
    }
}
