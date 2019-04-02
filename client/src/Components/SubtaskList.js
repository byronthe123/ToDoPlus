import React from 'react';
import {Route, NavLink} from 'react-router-dom';
import {Consumer} from './Context';

// Components
import Subtask from './Subtask';
import AddToDoForm from './AddToDoForm';

const SubtaskList = () => {
    // methods

    // return
    return (
        <Consumer>
            {({selectedProject, selectedTask}) => (
                selectedProject && selectedTask &&
                <div className='div-subtask-list full-width ml-4'>
                    <div className='active-subtasks'>
                        {selectedTask.subtasks.map((subtask) => !subtask.completed ?
                            <Subtask key={subtask._id} id={subtask._id} subtask={subtask} /> :
                            null
                        )}
                    </div>
                    <div className='completed-subtasks'>
                        {selectedTask.subtasks.map((subtask) => subtask.completed ?
                            <Subtask key={subtask._id} id={subtask._id} subtask={subtask} /> :
                            null
                        )}
                    </div>
                    {<Route path={`/profile/todos/project/${selectedProject._id}/task/${selectedTask._id}/add-task`} render={() => <AddToDoForm type={'subtask'} projectId={selectedProject._id} taskId={selectedTask._id}/>} />}
                    {<NavLink to={`/profile/todos/project/${selectedProject._id}/task/${selectedTask._id}/add-task`}><i class="fas fa-plus add-subtask"></i></NavLink>}
                </div>
            )}
        </Consumer>
    );
}

export default SubtaskList;