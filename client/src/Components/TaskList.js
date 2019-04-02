import React from 'react';
import {Route, NavLink} from 'react-router-dom';
import AddToDoForm from './AddToDoForm';
import {Consumer} from './Context';

// Components
import Task from './Task';

const TaskList = () => {
    // methods

    // return 
    return (
        <Consumer>
            {({selectedProject, viewCompletedTasks, toggleViewCompletedTasks}) => (
                selectedProject &&
                <div className='full-width div-tasks-list'>
                    <div className='active-tasks'>
                        {selectedProject.tasks && selectedProject.tasks.map((task) => !task.completed ? <Task key={task._id} task={task}/> : null)}
                    </div>
                    <div className={`completed-tasks ${!viewCompletedTasks ? 'hidden' : null}`}>
                        {selectedProject.tasks && selectedProject.tasks.map((task) => task.completed ? <Task key={task._id} task={task}/> : null)}
                    </div>
                    {<Route path={`/profile/todos/${selectedProject._id}/add-task`} render={() => <AddToDoForm type={'task'} projectId={selectedProject._id}/>} />}
                    {<NavLink to={`/profile/todos/${selectedProject._id}/add-task`}><i class="fas fa-plus add-task ml-3"></i></NavLink>}
                    <span className='buttonless d-flex align-right add-task ml-2' onClick={() => toggleViewCompletedTasks(selectedProject)}>{viewCompletedTasks ? 'Hide' : 'Show'} Completed Tasks</span>
                </div>
            )}
        </Consumer>
    );
}

export default TaskList;