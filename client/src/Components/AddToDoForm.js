import React, {Component} from 'react';
import {Consumer} from './Context';
import {Form, Button} from 'react-bootstrap';
import {withRouter} from 'react-router-dom';

class AddToDoForm extends Component {
    // state
    state = {
        value: null
    }

    // methods
    handleNameChange = (e) => {
        this.setState({
            value: e.target.value
        }, () => {
            console.log(this.state.value);
        });
    }

    handleSubmit = (e, addProject, addTask, addSubtask) => {
        e.preventDefault();
        console.log(this.state.value);
        if(this.props.type === 'project') {
            addProject(this.state.value);
            this.props.history.push(`/profile/todos`);
        } else if(this.props.type === 'task') {
            addTask(this.props.projectId, this.state.value);
            this.props.history.push(`/profile/todos/project/${this.props.projectId}`);
        } else if(this.props.type === 'subtask') {
            addSubtask(this.props.projectId, this.props.taskId, this.state.value);
            this.props.history.push(`/profile/todos/project/${this.props.projectId}/task/${this.props.taskId}`);
        }
        this.setState({
            value: ''
        });
        // this.props.history.replace(`/profile/project/${this.props.projectId}`);
    }

    handleCancel = () => {
        ///profile/todos/add-project
        ///profile/todos/5c898f9eda3cd73580888fe1/add-task
        this.props.history.goBack();
    }

    // render
    render() {
        return(
            <Consumer>
                {({addProject, addTask, addSubtask}) => (
                    <div>
                        <Form onSubmit={(e) => this.handleSubmit(e, addProject, addTask, addSubtask)}>
                            <Form.Group>
                                <Form.Control type="text" onChange={this.handleNameChange}/>
                            </Form.Group>
                            <p id='btnCancel' class='buttonless' onClick={this.handleCancel}>Cancel</p>
                        </Form>
                    </div>
                )}
            </Consumer>
        );
    }
}

export default withRouter(AddToDoForm);