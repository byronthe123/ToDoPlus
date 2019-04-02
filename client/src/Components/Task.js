import React from 'react';
import {Route, NavLink} from 'react-router-dom';
import {Consumer} from './Context';

// Components:
import EditForm from './EditForm';
import TimerModal from './TimerModal';

// Bootstrap
import {Card} from 'react-bootstrap';

const Task = ({task}) => {
    // methods

    // return
    return (
        <Consumer>
            {({editTaskId, toggleEditTask, selectedProject, deleteTask, setSelectedTask, selectedTask, completeTask}) => (
                <div>
                    {editTaskId === task._id ? 
                        <EditForm type='task' initialValue={task.taskName} projectId={selectedProject._id} taskId={task._id} /> : 
                        <NavLink to={`/profile/todos/project/${selectedProject._id}/task/${task._id}`} onClick={() => setSelectedTask(task)}>
                            <Card className={task.completed ? 'completed-task-card' :'task-card'}>
                                <Card.Body className={`py-3 ${selectedTask && task._id === selectedTask._id ? 'selected-task' : null}`}>
                                    <i className={task.completed ? 'far fa-check-square mr-2' : "far fa-square mr-2"} onClick={() => completeTask(selectedProject._id, task._id)}></i>
                                    {task.taskName}
                                    <div className='align-right show-on-hover-tasks'>
                                        <NavLink exact to={`/profile/todos/project/${selectedProject._id}/task/${task._id}/timer`} className='mx-1'><TimerModal/></NavLink>
                                        <i className="fas fa-edit mx-1" onClick={() => toggleEditTask(task._id)}></i>
                                        <i className="far fa-trash-alt ml-1" onClick={() => deleteTask(selectedProject._id, task._id)}></i>
                                    </div>
                                </Card.Body>
                            </Card>
                        </NavLink>
                    }
                    <Route exact path={`/profile/todos/project/${selectedProject._id}/task/${task._id}/timer`} render={() => <TimerModal/>} />
                </div>
            )}
        </Consumer>
    );
}

export default Task;