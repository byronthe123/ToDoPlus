import React, {Component} from 'react';
import {Consumer} from './Context';

// Bootstrap 
import {Button, Modal} from 'react-bootstrap';

// Components:
import StatsInfo from './StatsInfo';

class StatsModal extends Component {

    state = {
      show: false
    }

    handleShow = () => {
      this.setState({ 
        show: true 
      });
    };

    handleHide = () => {
      this.setState({ show: false });
    };

    render() {
      return (
        <Consumer>
          {({user}) => (
            <>
              <Button className='btn-secondary' onClick={this.handleShow}>Extended Stats</Button>
              <Modal
                show={this.state.show}
                onHide={this.handleHide}
                keyboard={true}
                size='lg'
              >
                <h4>Extended Stats</h4>
                <Modal.Body>
                    <StatsInfo user={user}/>
                </Modal.Body>
              </Modal>
            </>
          )}
        </Consumer>
      );
    }
  }
  
  export default StatsModal;