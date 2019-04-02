import React from 'react';
import {NavLink} from 'react-router-dom';
import {Consumer} from './Context';

// Components:
import EditForm from './EditForm';

const Subtask = ({subtask}) => {
    // methods

    // return
    return (
        <Consumer>
            {({editSubtaskId, setSelectedSubtask, toggleEditSubtask, deleteSubtask, completeSubtask, selectedProject, selectedTask}) => (
                <div className='subtask'>
                    {editSubtaskId === subtask._id ? 
                        <EditForm type='subtask' initialValue={subtask.subtaskName} projectId={selectedProject._id} taskId={selectedTask._id} subtaskId={subtask._id}/> : 
                        <NavLink to={`/profile/todos/project/${selectedProject._id}/task/${selectedTask._id}/subtask/${subtask._id}`} onClick={() => setSelectedSubtask(subtask)}>
                            <p>
                                <i class={`far mr-2 ${subtask.completed ? 'fa-check-square' : 'fa-square' }`} onClick={() => completeSubtask(selectedProject._id, selectedTask._id, subtask._id)}></i>
                                    {subtask.subtaskName}
                                    <i className="fas fa-edit" onClick={() => toggleEditSubtask(subtask._id)}></i>
                                    <i className="far fa-trash-alt" onClick={() => deleteSubtask(selectedProject._id, selectedTask._id, subtask._id)}>
                                </i>
                            </p>
                        </NavLink>
                    }
                </div>
            )}
        </Consumer>
    );
}

export default Subtask;