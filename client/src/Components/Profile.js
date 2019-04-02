import React from 'react';
import {Route, NavLink} from 'react-router-dom';
import moment from 'moment';
import PropTypes from 'prop-types';
import {Consumer} from './Context';

// Components
import AddToDoForm from './AddToDoForm';
import ProjectList from './ProjectList';
import TaskList from './TaskList';
import SubtaskList from './SubtaskList';
import StatusBar from './StatusBar';
import GoalPromptModal from './GoalPromptModal';

// Bootstrap
import {Container, Row, Col} from 'react-bootstrap';

const Profile = (props) => {

    // methods

    // return
    return (
        <Consumer>
            {({user,selectedProject, selectedTask, setTaskDueDate, selectedSubtask, updateNote}) => (
                <Container fluid={true}>
                    <Row className="status-bar" >
                        <StatusBar />
                    </Row>
                    <Row className='main-row'>
                        <Col lg={3} md={3} className='div-projects'>
                            <Row className='subtitle'>
                                <h3>Projects:</h3>
                            </Row>
                            <Row className='row-projects-list full-height'>
                                <ProjectList/>
                            </Row>
                        </Col>
                        <Col lg={selectedTask ? 6 : 9} md={selectedTask ? 6 : 9} id='tasks'>
                            <Row className='task-subtitle'>
                                {
                                    selectedProject ? 
                                    <h3>Tasks for {selectedProject.projectName}</h3> :
                                    <h3>Tasks</h3>
                                }
                            </Row>
                            <Row className='div-task-list full-height' >
                                {selectedProject ? <TaskList/> : <div className='taskdiv-logo'></div>}
                            </Row>
                        </Col>
                        <Col lg={3} className={`col-subtask-list ${!selectedTask ? 'hidden' : null}`}> 
                            <Row className='subtask-subtitle'>
                                <h3 className='ml-2'>Subtasks</h3>
                            </Row>
                            <Row className='div-subtask-list' style={{"height": '50%'}}>
                                <SubtaskList/>
                            </Row>
                            <Row className='col-subtask-list' style={{"height": '50%'}}> 
                                <Col>
                                    <Row className='subtask-subtitle'>
                                        <h3 className='ml-2'>{selectedTask && selectedTask.dueDate ? `Due ${moment(selectedTask.dueDate).format('L')}` : 'Set Task Due Date'}</h3>
                                    </Row>
                                    <Row>
                                        <input type='date' className='in-date' onChange={(e) => setTaskDueDate(selectedProject._id, selectedTask._id, moment(e.target.value))}/>
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    {user && user.weeklyProductivityGoal === 0 ? <GoalPromptModal type='weekly'/> : null}
                    {user && user.weeklyProductivityGoal > 0 && user.productivityRecords && user.productivityRecords[user.productivityRecords.length - 1].productivityGoal === 0? <GoalPromptModal type='daily'/> : null}
                </Container>
            )}
        </Consumer>
    );
}

Profile.propTypes = {
    id: PropTypes.number,
    name: PropTypes.string,
}

export default Profile;