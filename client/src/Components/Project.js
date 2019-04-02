import React from 'react';
import {Route, NavLink} from 'react-router-dom';
import moment from 'moment';

// Context
import {Consumer} from './Context';

// Components
import AddToDoForm from './AddToDoForm';
import EditForm from './EditForm';
import { runInNewContext } from 'vm';

const Project = ({project}) => {
    // methods
    const handleClick = () => {
        alert('clicked');
    }

    const checkHasDueTask = (project) => {
    //     const hasDueDate = project.tasks.reduce((hasDueTask, task) => {
    //         return hasDueTask += (moment(task.dueDate) >= moment() ? 1 : 0);
    //         // return hasDueTask += (moment(task.dueDate).format('L') === moment().format('L') ? 1 : 0);
    //    }, 0);
    //    if(hasDueDate > 0) {
    //        return 'true';
    //    }
    //    return 'false';
        // project.tasks.map(task => moment(task.dueDate) >= moment() ? console.log(`${moment(task.dueDate)} >= ${moment()} = ${moment(task.dueDate) >= moment()}`) : console.log(`${moment(task.dueDate)} >= ${moment()} = ${moment(task.dueDate) >= moment()}`));
    }

    // return
    return (
        <Consumer>
            {({deleteProject, editProjectId, completeProject, toggleEditProject, setSelectedProject}) => (
                <div className='project mb-3' onContextMenu={() => handleClick()}>
                    {editProjectId === project._id ? 
                        <EditForm type='project' initialValue={project.projectName} projectId={project._id} /> : 
                        <NavLink to={`/profile/todos/project/${project._id}`} onClick={() => setSelectedProject(project)}>
                            <h5 className='project-item'>
                                {project.projectName}
                                <span className='show-on-hover-project ml-2'>
                                    <i className="fas fa-edit mr-1" onClick={() => toggleEditProject(project._id)}></i>
                                    <i className="far fa-trash-alt mr-2" onClick={() => deleteProject(project._id)}></i>
                                    <i className="fas fa-clipboard-check" onClick={() => completeProject(project._id)}></i>
                                </span>
                            </h5>
                        </NavLink>
                    }
                </div>
            )}
        </Consumer>

    );
}

export default Project;