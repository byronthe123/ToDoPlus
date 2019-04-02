import React, {Component} from 'react';
import {Form, Button} from 'react-bootstrap';
import {Consumer} from './Context';
import {withRouter} from 'react-router-dom';

class EditForm extends Component {
    // state
    state = {
        value: ''
    }

    componentDidMount() {
        this.setState({
            value: this.props.initialValue
        })
    }

    handleValueChange = (e) => {
        this.setState({
            value: e.target.value
        });
    }

    // methods
    handleSubmit = (e, updateProject, toggleEditProject, updateTask, toggleEditTask, updateSubtask, toggleEditSubtask) => {
        e.preventDefault();
        if(this.props.type === 'project') {
            updateProject(this.props.projectId, this.state.value);
            toggleEditProject();
        } else if(this.props.type === 'task') {
            updateTask(this.props.projectId, this.props.taskId, this.state.value);
            toggleEditTask();
        } else if(this.props.type === 'subtask') {
            updateSubtask(this.props.projectId, this.props.taskId, this.props.subtaskId, this.state.value);
            toggleEditSubtask();
        }

        this.setState({
            value: ''
        });
    }

    handleCancel = (toggleEditProject, toggleEditTask, toggleEditSubtask) => {
        if(this.props.type === 'project') {
            toggleEditProject(null);
        } else if(this.props.type === 'task'){
            toggleEditTask(null);
        } else {
            toggleEditSubtask(null);
        }
    }

    // render:
    render() {
        return (
            <Consumer>
                {({updateProject, toggleEditProject, updateTask, toggleEditTask, updateSubtask, toggleEditSubtask}) => (
                    <div>
                        <Form onSubmit={(e) => this.handleSubmit(e, updateProject, toggleEditProject, updateTask, toggleEditTask, updateSubtask, toggleEditSubtask)}>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Control type="text" value={this.state.value} onChange={this.handleValueChange}/>
                                <i class="fas fa-check" onClick={(e) => this.handleSubmit(e, updateProject, toggleEditProject, updateTask, toggleEditTask, updateSubtask, toggleEditSubtask)}></i>
                                {/* <p id='btnCancel' className='buttonless' onClick={() => this.handleCancel(toggleEditProject, toggleEditTask, toggleEditSubtask)}>Cancel</p> */}
                                <i class="fas fa-times ml-3" onClick={() => this.handleCancel(toggleEditProject, toggleEditTask, toggleEditSubtask)}></i>
                            </Form.Group>
                        </Form>
                    </div>
                )}
            </Consumer>
        );
    }
}

export default withRouter(EditForm);