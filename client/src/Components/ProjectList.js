import React from 'react';
import {Route, NavLink} from 'react-router-dom';
import {Consumer} from './Context';

// Components
import Project from './Project';
import AddToDoForm from './AddToDoForm';

const ProjectList = () => {
    // methods

    // return
    return (
        <Consumer>
            {({user, toggleViewCompletedProjects, viewCompletedProjects}) => (
                user && user.projects &&
                <div className='div-project-list full-width ml-1'>
                    <div className='active-projects'>
                        {user.projects.map((project, i) => !project.completed ? <Project key={i} project={project}/> : null)}
                    </div>
                    <div className={`completed-projects ${!viewCompletedProjects ? 'hidden' : null}`}>
                        {user.projects.map((project, i) => project.completed ? <Project key={i} project={project}/> : null)}
                    </div>
                    <Route path={`/profile/todos/add-project`} render={() => <AddToDoForm type={'project'}/>} />
                    <NavLink to={`/profile/todos/add-project`}><i class="fas fa-plus add-project"></i></NavLink>
                    <span className='buttonless d-flex align-right add-project ml-2' onClick={() => toggleViewCompletedProjects()}>{viewCompletedProjects ? 'Hide' : 'Show'} Completed Projects</span>
                </div>
            )}
        </Consumer>
    );
}

export default ProjectList;
