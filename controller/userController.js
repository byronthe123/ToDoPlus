const db = require('../models/User');

module.exports = {
    login: (req, res) => {
        console.log('API call made to /login');
        console.log(req.body);
        
        db.findOne({username: req.body.name}, null, (err, user) => {
            if(err) {
                return res.json(err);
            } else if(!user) {
                db.create({
                    email: req.body.email,
                    username: req.body.name
                }, (err, user) => {
                    if(err) {
                        return console.log(err);
                    } else {
                        db.checkProductivityRecord(user._id, (err, doc) => {
                            if(err) {
                                console.log(err);
                                return res.json(err);
                            }
                            return res.json(doc);
                        })
                    }
                })
            } else {
                db.checkProductivityRecord(user._id, (err, doc) => {
                    if(err) {
                        return res.json(err);
                    } 
                    console.log(doc);
                    return res.json(doc);
                });
            }
        })
    },

    addProject: (req, res) => {
        db.addProject(req.body._id, {projectName: req.body.projectName}, (err, doc) => {
            if(err) {
                console.log(err);
                return res.json(err);
            }
            return res.json(doc);
        })
    },

    deleteProject: (req, res) => {
        db.deleteProject(req.body._id, req.body.projectId, (err, doc) => {
            if(err) {
                console.log(err);
                return res.json(err);
            }
            return res.json(doc);
        })
    },

    updateProject: (req, res) => {
        db.updateProject(req.body._id, req.body.projectId, req.body.updatedName, (err, doc) => {
            if(err) {
                console.log(err);
                return res.json(err);
            }
            return res.json(doc);
        })
    },

    completeProject: (req, res) => {
        db.completeProject(req.body._id, req.body.projectId, (err, doc) => {
            if(err) {
                console.log(err);
                return res.json(err);
            }
            return res.json(doc);
        });
    },

    addTask: (req, res) => {
        db.addTask(req.body._id, req.body.projectId, {taskName: req.body.task}, (err, doc) => {
            if(err) {
                console.log(err);
                return res.json(err);
            }
            console.log(doc);
            return res.json(doc);
        })
    },

    updateTask: (req, res) => {
        db.updateTask(req.body._id, req.body.projectId, req.body.taskId, req.body.updatedTaskName, (err, doc) => {
            if(err) {
                console.log(err);
                return res.json(err);
            }
            return res.json(doc);
        });
    },

    deleteTask: (req, res) => {
        db.deleteTask(req.body._id, req.body.projectId, req.body.taskId, (err, doc) => {
            if(err) {
                console.log(err);
                return res.json(err);
            }
            return res.json(doc);
        })
    },

    setTaskDueDate: (req, res) => {
        db.setTaskDueDate(req.body._id, req.body.projectId, req.body.taskId, req.body.dueDate, (err, doc) => {
            if(err) {
                console.log(err);
                return res.json(err);
            }
            return res.json(doc);
        });
    },

    addSubtask: (req, res) => {
        db.addSubtask(req.body._id, req.body.projectId, req.body.taskId, {subtaskName: req.body.subtask}, (err, doc) => {
            if(err) {
                console.log(err);
                return res.json(err);
            }
            return res.json(doc);
        }); 
    },

    completeTask: (req, res) => {
        db.completeTask(req.body._id, req.body.projectId, req.body.taskId, (err, doc) => {
            if(err) {
                console.log(err);
                return res.json(err);
            }
            return res.json(doc);
        });
    },

    updateSubtask: (req, res) => {
        db.updateSubtask(req.body._id, req.body.projectId, req.body.taskId, req.body.subtaskId, req.body.updatedSubtaskName, (err, doc) => {
            if(err) {
                console.log(err);
                return res.json(err);
            }
            return res.json(doc);
        });
    },

    completeSubtask: (req, res) => {
        db.completeSubtask(req.body._id, req.body.projectId, req.body.taskId, req.body.subtaskId, (err, doc) => {
            if(err) {
                console.log(err);
                return res.json(err);
            }
            return res.json(doc);
        });
    },

    deleteSubtask: (req, res) => {
        db.deleteSubtask(req.body._id, req.body.projectId, req.body.taskId, req.body.subtaskId, (err, doc) => {
            if(err) {
                console.log(err);
                return res.json(err);
            }
            return res.json(doc);
        })
    },

    updateEntryProductiveTime: (req, res) => {
        db.updateEntryTime(req.body._id, req.body.taskId, req.body.taskName, (err, doc) => {
            if(err) {
                console.log(err);
                return res.json(err);
            }
            console.log(doc);
            return res.json(doc);
        })
    },

    updateTodaysProductiveTime: (req, res) => {
        db.updateTodaysProductiveTime(req.body._id, (err, doc) => {
            if(err) {
                console.log(err);
                return res.json(err);
            }
            // notifier.notify({
            //     'title': 'To Do Plus',
            //     'message': 'You completed a productivity session!',
            //     'icon': path.join(__dirname, '../client/public/assets/images/concept2small.png'),
            //     'contentImage': path.join(__dirname, '../client/public/assets/images/concept2small.png')
            // });
            return res.json(doc);
        });
    },

    setProductivityGoal: (req, res) => {
        db.setProductivityGoal(req.body._id, req.body.productivityGoalSeconds, (err, doc) => {
            if(err) {
                console.log(err);
            }
            return res.json(doc);
        });
    },

    setWeeklyProductivityGoal: (req, res) => {
        db.setWeeklyProductivityGoal(req.body._id, req.body.weeklyProductivityGoalSeconds, (err, doc) => {
            if(err) {
                return res.json(err);
            }
            return res.json(doc);
        });
    }
}