import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {Consumer} from './Context';
import GoalSetter from './GoalSetter';

// Bootstrap 
import {Button, Modal} from 'react-bootstrap';
import WeeklyGoalSetter from './WeeklyGoalSetter';

// Components:

class GoalPromptModal extends Component {

    state = {
      show: true
    }

    handleShow = () => {
      this.setState({ 
        show: true 
      }, () => {
        console.log(`called handleshow`);
      });
    };

    handleHide = () => {
      console.log(this.props);
      if(this.props.match.path === '/profile/todos/updateGoal' || this.props.match.path === '/profile/todos/updateWeeklyGoal' ) {
        this.props.history.replace('/profile/todos');
      }
      this.setState({ show: false });
    };

    handleHideOnGoalChange = (toggleDisplayGoalPromptModal) => {
      console.log(this.props);
      if(this.props.match.path === '/profile/todos/updateGoal' || this.props.match.path === '/profile/todos/updateWeeklyGoal' ) {
        this.props.history.replace('/profile/todos');
      }
      this.setState({ show: false });
      toggleDisplayGoalPromptModal();
    };

    render() {
      return (
        <Consumer>
          {({user, displayGoalModal, toggleDisplayGoalPromptModal, goalStatus, timeFormatter}) => (
            <div className='goal-modal d-flex justify-content-center'>
              {displayGoalModal === false ? this.handleHideOnGoalChange(toggleDisplayGoalPromptModal) : null}
              <Modal
                show={this.state.show}
                onHide={this.handleHide}
                backdrop='static'
                keyboard={false}
              >
                <h4>Set{this.props.type === 'weekly' ? ` the Week's` : ` Today's`} Productivity Goal</h4>
                  <Modal.Header className='d-flex justify-content-center pt-0'>
                  <Modal.Title id="">

                  {this.props.type === 'weekly' ? <WeeklyGoalSetter/> : <GoalSetter/>}
                  
                  </Modal.Title>
                </Modal.Header>
                    <Modal.Body>
                      {
                        this.props.type === 'daily' ?
                        <>
                          <h5>Daily Work time to meet weekly goal: {timeFormatter(user.weeklyProductivityGoal / 7)}</h5>
                          {
                            goalStatus === 1 ? 
                            <h3>Goal is over the avaialble time</h3> :
                            goalStatus === -1 ?
                            <h3>Goal cannot be 0</h3> :
                            null
                          }
                        </> :
                        null
                      }
                      {
                        user && user.productivityRecords && (user.productivityRecords[user.productivityRecords.length - 1].productivityGoal > 0 && user.weeklyProductivityGoal > 0) ? 
                        <div>
                          <Button onClick={this.handleHide} className='btn btn-light'>Cancel</Button>
                        </div> :
                        null
                      }
                  </Modal.Body>
              </Modal>
            </div>
          )}
        </Consumer>
      );
    }
  }
  
  export default withRouter(GoalPromptModal);