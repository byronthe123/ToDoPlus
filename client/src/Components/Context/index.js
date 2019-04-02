import React, {Component} from 'react';
import moment from 'moment';
import Push from 'push.js';
import axios from 'axios';
import auth0Client from '../Auth/Auth';

const AppContext = React.createContext();

export class Provider extends Component {
    // ------------- state
    state = {
        user: null,
        selectedProject: null,
        editProjectId: null,
        selectedTask: null,
        editTaskId: null,
        viewCompletedProjects: false,
        viewCompletedTasks: false,
        selectedSubtask: null,
        selectedSubtaskId: null,
        displayGoalModal: true,
        goalStatus: 0,
        stats: []
    }

    // methods
    setUser = (email, name, token) => {
        axios.post('/api/user', {
            email,
            name,
        }, {
            headers: {'Authorization': `Bearer ${token}`}
        }).then((res) => {
            // console.log(res.data);
            this.setState({
                user: res.data
            });
        }).catch((err) => {
            console.log('Error');
            console.log(err);
        });
    }

    
    // setSelectedProject
    setSelectedProject = (project) => {
        this.setState({
            selectedProject: project
        }, () => {
            // console.log(`called set selected project`);
            // console.log(this.state.selectedProject);
            this.setSelectedTask(null);
        });
    }

    // addProject (project)
    addProject = (name) => {
        axios.post('/api/addProject', {
            _id: this.state.user._id,
            projectName: name 
        }, {
            headers: {'Authorization': `Bearer ${auth0Client.getIdToken()}`}
        }).then((res) => {
            // console.log(res);
            this.setState({
                user: res.data
            });
        }).catch((err) => {
            // console.log(err);
        }) 
    }

    updateProject = (projectId, updatedName) => {
        axios.put('/api/project/update', {
            _id: this.state.user._id,
            projectId,
            updatedName
        }, {
            headers: {'Authorization': `Bearer ${auth0Client.getIdToken()}`}
        }).then((res) => {
            this.setState({
                user: res.data
            });
        })
    }

    deleteProject = (projectId) => {
        axios.post('/api/project/delete', {
            _id: this.state.user._id,
            projectId,
        }, {
            headers: {'Authorization': `Bearer ${auth0Client.getIdToken()}`}
        }).then((res) => {
            // console.log(res);
            this.setState({
                user: res.data
            });
        }).catch((err) => {
            // console.log(err);
        }) 
    }

    completeProject = (projectId) => {
        axios.put('/api/project/complete', {
            _id: this.state.user._id,
            projectId
        }, {
            headers: {'Authorization': `Bearer ${auth0Client.getIdToken()}`}
        }).then(res => {
            this.setState({
                user: res.data
            }, () => {
                this.setSelectedProject(null);
            });
        }).catch(err => {
            console.log(err);
        })
    }

    // toggleEditProject:
    toggleEditProject = (projectId) => {
        this.setState({
            editProjectId: projectId
        }, () => {
            // console.log('editProjectId');
            // console.log(this.state.editProjectId);
        })
    }

    
    toggleViewCompletedProjects = () => {
        this.setState(prevState => ({
            viewCompletedProjects: !prevState.viewCompletedProjects
        }), () => {
            // if(!this.state.viewCompletedTasks) {
            //     this.setSelectedProject(this.state.user.projects.filter((project) => project._id === selectedProject._id)[0]);
            // }
        });
    }


    // ----------------------------------------- tasks: ----------------------------------------- //

    // setSelectedTask
    setSelectedTask = (task) => {
        this.setState({
            selectedTask: task
        }, () => {
            // console.log(`called set selected task`);
            // console.log(this.state.selectedTask);
        });
    }

    // addTask
    addTask = (projectId, task) => {
        axios.post('/api/project/addTask', {
            _id: this.state.user._id,
            projectId,
            task
        }, {
            headers: {'Authorization': `Bearer ${auth0Client.getIdToken()}`}
        }).then((res) => {
            // console.log(res);
            this.setState({
                user: res.data
            }, () => {
                // console.log(`setSelectedProject in addTask()`);
                // let test = (this.state.user.projects.filter((project) => project._id === projectId)[0]);
                // console.log(test);
                this.setSelectedProject(this.state.user.projects.filter((project) => project._id === projectId)[0]);
            });
        }).catch((err) => {
            console.log(err);
        }) 
    }

    toggleEditTask = (taskId) => {
        this.setState({
            editTaskId: taskId
        }, () => {
            // console.log(this.state.editTaskId);
        })
    }

    updateTask = (projectId, taskId, updatedTaskName) => {
        axios.put('/api/project/task/update', {
            _id: this.state.user._id,
            projectId,
            taskId,
            updatedTaskName
        }, {
            headers: {'Authorization': `Bearer ${auth0Client.getIdToken()}`}
        }).then((res) => {
            // console.log('updateTask data returned:');
            // console.log(res);
            this.setState({
                user: res.data
            }, () => {
                this.setSelectedProject(this.state.user.projects.filter((project) => project._id === projectId)[0]);
            });
        })
    }

    deleteTask = (projectId, taskId) => {
        axios.post('/api/project/task/delete', {
            _id: this.state.user._id,
            projectId, 
            taskId
        }, {
            headers: {'Authorization': `Bearer ${auth0Client.getIdToken()}`}
        }).then(res => {
            this.setState({
                user: res.data
            }, () => {
                this.setSelectedProject(this.state.user.projects.filter((project) => project._id === projectId)[0]);    
            });
        });
    }

    completeTask = (projectId, taskId) => {
        axios.put('/api/project/task/complete', {
            _id: this.state.user._id,
            projectId,
            taskId,
        }, {
            headers: {'Authorization': `Bearer ${auth0Client.getIdToken()}`}
        }).then((res) => {
            // console.log('updatedTask data returned after marking complete:');
            // console.log(res);
            this.setState({
                user: res.data
            }, () => {
                this.setSelectedProject(this.state.user.projects.filter((project) => project._id === projectId)[0]);
            });
        })
    }

    setTaskDueDate = (projectId, taskId, dueDate) => {
        axios.put('/api/project/task/setDueDate', {
            _id: this.state.user._id,
            projectId,
            taskId,
            dueDate
        }, {
            headers: {'Authorization': `Bearer ${auth0Client.getIdToken()}`}
        }).then(res => {
            this.setState({
                user: res.data
            }, () => {
                // this.setSelectedProject(this.state.user.projects.filter((project) => project._id === projectId)[0]);
                this.setSelectedTask(this.state.user.projects.filter((project) => project._id === projectId)[0].tasks.filter((task) => task._id === taskId)[0]);
            })
        })
    }

    toggleViewCompletedTasks = (selectedProject) => {
        this.setState(prevState => ({
            viewCompletedTasks: !prevState.viewCompletedTasks
        }), () => {
            if(!this.state.viewCompletedTasks) {
                this.setSelectedProject(this.state.user.projects.filter((project) => project._id === selectedProject._id)[0]);
            }
        });
    }

    updateNote = (projectId, taskId, note) => {
        axios.post('/api/project/task/updateNote', {
            _id: this.state.user._id,
            projectId,
            taskId,
            note
        }, {
            headers: {'Authorization': `Bearer ${auth0Client.getIdToken()}`}
        }).then((res) => {
            // console.log(res);
            this.setState({
                user: res.data
            }, () => {
                this.setSelectedTask(this.state.user.projects.filter((project) => project._id === projectId)[0].tasks.filter((task) => task._id === taskId)[0]);
            });
        }).catch((err) => {
            console.log(err);
        }) 
    }

    // ----------------------------------------- subtasks: ----------------------------------------- //

    toggleEditSubtask = (subtaskId) => {
        this.setState({
            editSubtaskId: subtaskId
        })
    }

    setSelectedSubtask = (subtask) => {
        this.setState({
            selectedSubtask: subtask
        }, () => {
            // console.log('setSelectedSubtask');
            // console.log(this.state.selectedSubtask);
        })
    }

    
    addSubtask = (projectId, taskId, subtask) => {
        axios.post('/api/project/task/addSubtask', {
            _id: this.state.user._id,
            projectId,
            taskId,
            subtask
        }, {
            headers: {'Authorization': `Bearer ${auth0Client.getIdToken()}`}
        }).then((res) => {
            // console.log(res);
            this.setState({
                user: res.data
            }, () => {
                // let test = (this.state.user.projects.filter((project) => project._id === projectId)[0].tasks.filter((task) => task._id === taskId)[0]);
                // console.log(test);
                this.setSelectedTask(this.state.user.projects.filter((project) => project._id === projectId)[0].tasks.filter((task) => task._id === taskId)[0]);
            });
        }).catch((err) => {
            console.log(err);
        }) 
    }

    deleteSubtask = (projectId, taskId, subtaskId) => {
        axios.post('/api/project/task/subtask/delete', {
            _id: this.state.user._id,
            projectId,
            taskId,
            subtaskId
        }, {
            headers: {'Authorization': `Bearer ${auth0Client.getIdToken()}`}
        }).then((res) => {
            this.setState({
                user: res.data
            }, () => {
                this.setSelectedTask(this.state.user.projects.filter((project) => project._id === projectId)[0].tasks.filter((task) => task._id === taskId)[0]);
            })
        })
    }

    updateSubtask = (projectId, taskId, subtaskId, updatedSubtaskName) => {
        // console.log('updateSubtask called');
        axios.put('/api/project/task/subtask/update', {
            _id: this.state.user._id,
            projectId,
            taskId,
            subtaskId,
            updatedSubtaskName
        }, {
            headers: {'Authorization': `Bearer ${auth0Client.getIdToken()}`}
        }).then((res) => {
            // console.log('updateTask data returned:');
            // console.log(res);
            this.setState({
                user: res.data
            }, () => {
                this.setSelectedTask(this.state.user.projects.filter((project) => project._id === projectId)[0].tasks.filter((task) => task._id === taskId)[0]);
            });
        })
    }

    completeSubtask = (projectId, taskId, subtaskId) => {
        // console.log('updateSubtask called');
        axios.put('/api/project/task/subtask/complete', {
            _id: this.state.user._id,
            projectId,
            taskId,
            subtaskId,
        }, {
            headers: {'Authorization': `Bearer ${auth0Client.getIdToken()}`}
        }).then((res) => {
            // console.log('updateSubtask data returned:');
            // console.log(res);
            this.setState({
                user: res.data
            }, () => {
                this.setSelectedTask(this.state.user.projects.filter((project) => project._id === projectId)[0].tasks.filter((task) => task._id === taskId)[0]);
            });
        })
    }

    // ----------------------------------------- productivity: ----------------------------------------- //
    updateEntryProductiveTime = () => {
        axios.post('/api/project/task/updateEntryProductiveTime', {
            _id: this.state.user._id,
            taskId: this.state.selectedTask._id,
            taskName: this.state.selectedTask.taskName
        }, {
            headers: {'Authorization': `Bearer ${auth0Client.getIdToken()}`}
        }).then((res) => {
            this.setState({
                user: res.data,
            }, () => {
                this.updateTodaysProductiveTime();
                Push.create('To Do Plus', {
                    body: "Study session complete!",
                    icon: '/favicon.png',
                });
            });
        }) 
    }

    updateTodaysProductiveTime = () => {
        // console.log('called updateTodaysProductiveTime');
        axios.post('/api/profile/updateTodaysProductiveTime',  {
            _id: this.state.user._id
        }, {
            headers: {'Authorization': `Bearer ${auth0Client.getIdToken()}`}
        }).then((res) => {
            this.setState({
                user: res.data
            }, () => {

            })
        });
    }

    setProductivityGoal = (seconds) => {
        axios.post('/api/profile/setProductivityGoal', {
            _id: this.state.user._id,
            productivityGoalSeconds: seconds
        }, {
            headers: {'Authorization': `Bearer ${auth0Client.getIdToken()}`}
        }).then((res) => {
            this.setState({
                user: res.data
            }, () => {
                // console.log(res);
                this.setState({
                    displayGoalModal: false
                })
            })
        })
        // console.log(`setGoal seconds = ${seconds}`);
    }

    setWeeklyProductivityGoal = (seconds) => {
        axios.post('/api/profile/setWeeklyProductivityGoal', {
            _id: this.state.user._id,
            weeklyProductivityGoalSeconds: seconds
        }, {
            headers: {'Authorization': `Bearer ${auth0Client.getIdToken()}`}
        }).then((res) => {
            this.setState({
                user: res.data
            }, () => {
                // console.log(res);
                if(this.state.user.weeklyProductivityGoal > 0 && this.state.user.productivityRecords[this.state.user.productivityRecords.length - 1].productivityGoal > 0) {
                    this.setState({
                        displayGoalModal: false
                    })
                }
            })
        })
        // console.log(`setGoal seconds = ${seconds}`);
    }

    toggleDisplayGoalPromptModal = () => {
        this.setState({
            displayGoalModal: true
        })
    }

    updateGoalStatus = (num) => {
        this.setState({
            goalStatus: num
        })
    }

    timeFormatter = (seconds) => {
        return moment().startOf('day').seconds(seconds).format('HH:mm:ss');
    }

    // getStats = (range) => {
    //     axios.get('', {
    //         _id: this.state.user._id,
    //         range
    //     }, {
    //         headers: {'Authorization': `Bearer ${auth0Client.getIdToken()}`}
    //     }).then((res) => {
    //         this.setState({
    //             stats: res.data
    //         })
    //     })
    // }

    // ----------- render
    render() {
        return (
            <AppContext.Provider value={
                {
                    setUser: this.setUser,
                    user: this.state.user,
                    setSelectedProject: this.setSelectedProject,
                    selectedProject: this.state.selectedProject,
                    addProject: this.addProject,
                    deleteProject: this.deleteProject,
                    updateProject: this.updateProject,
                    completeProject: this.completeProject,
                    viewCompletedProjects: this.state.viewCompletedProjects,
                    toggleViewCompletedProjects: this.toggleViewCompletedProjects,
                    editProjectId: this.state.editProjectId,
                    toggleEditProject: this.toggleEditProject,
                    selectedTask: this.state.selectedTask,
                    setSelectedTask: this.setSelectedTask,
                    addTask: this.addTask,
                    editTaskId: this.state.editTaskId,
                    toggleEditTask: this.toggleEditTask,
                    updateTask: this.updateTask,
                    completeTask: this.completeTask,
                    setTaskDueDate: this.setTaskDueDate,
                    deleteTask: this.deleteTask,
                    setSelectedSubtask: this.setSelectedSubtask,
                    toggleEditSubtask: this.toggleEditSubtask,
                    addSubtask: this.addSubtask,
                    updateSubtask: this.updateSubtask,
                    deleteSubtask: this.deleteSubtask,
                    viewCompletedTasks: this.state.viewCompletedTasks,
                    toggleViewCompletedTasks: this.toggleViewCompletedTasks,
                    selectedSubtask: this.state.selectedSubtask,
                    selectedSubtaskId: this.state.selectedSubtaskId,
                    editSubtaskId: this.state.editSubtaskId,
                    completeSubtask: this.completeSubtask,
                    updateEntryProductiveTime: this.updateEntryProductiveTime,
                    setProductivityGoal: this.setProductivityGoal,
                    setWeeklyProductivityGoal: this.setWeeklyProductivityGoal,
                    displayGoalModal: this.state.displayGoalModal,
                    toggleDisplayGoalPromptModal: this.toggleDisplayGoalPromptModal,
                    goalStatus: this.state.goalStatus,
                    updateGoalStatus: this.updateGoalStatus,
                    timeFormatter: this.timeFormatter,
                    updateNote: this.updateNote
                }
            }>
                {this.props.children}
            </AppContext.Provider>
        );
    }
}

export const Consumer = AppContext.Consumer;