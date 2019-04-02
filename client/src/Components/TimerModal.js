import React, {Component} from 'react';
import {Consumer} from './Context';
import {withRouter} from 'react-router-dom';

// Bootstrap 
import {Button, Modal} from 'react-bootstrap';

// Components:
import Timer from './Timer';

class TimerModal extends Component {
    constructor(props, context) {
      super(props, context);
  
      this.state = {
        show: false,
      };
  
      this.handleShow = () => {
        this.setState({ show: true });
      };
  
      this.handleHide = (selectedProject, selectedTask) => {
        this.setState({ 
          show: false 
        }, () => {  
            this.props.history.push(`/profile/todos/project/${selectedProject._id}/task/${selectedTask._id}`);
        }); 
      };
    }
    
    render() {
      return (
        <Consumer>
          {({selectedProject, selectedTask, updateEntryProductiveTime, timeFormatter}) => (
            <>
              <i className="fas fa-stopwatch" onClick={this.handleShow}></i>
              <Modal
                show={this.state.show}
                onHide={() => this.handleHide(selectedProject, selectedTask)}
                dialogClassName="modal-90w"
                aria-labelledby="example-custom-modal-styling-title"
                className='timer-modal d-flex justify-content-center mx-auto'
              >
                <Modal.Header className='d-flex justify-content-center' closeButton>
                  <Modal.Title id="example-custom-modal-styling-title">
                    {selectedTask && selectedTask.taskName}
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body className='d-flex justify-content-center mx-auto'>
                    <Timer updateEntryProductiveTime={updateEntryProductiveTime} timeFormatter={timeFormatter}/>
                </Modal.Body>
              </Modal>
            </>
          )}
        </Consumer>
      );
    }
  }
  
  export default withRouter(TimerModal);