import React, {Component} from 'react';
import {Row} from 'react-bootstrap';
import {Consumer} from './Context';
import moment from 'moment';

// Components:
import StatsModal from './StatsModal';
import StatsGraphs from './StatsGraphs';
import NavBar from './NavBar';
import StatusBar from './StatusBar';

// const daysProductiveTime = record.entries.reduce((totalTime, entry) => {
//     return totalTime += entry.productiveTime;
// }, 0);

class Stats extends Component{

    // state
    state = {
        showStatsDetails: false
    }
    
    // methods
    toggleShowStatsDetails = () => {
        this.setState(prevState => ({
            showStatsDetails: !prevState.showStatsDetails
        }))
    }

    timeFormatter = (seconds) => {
        return moment().startOf('day').seconds(seconds).format('HH:mm:ss');
    }

    // return
    render() {
        return(
            <Consumer>
                {({user}) => (
                    user &&
                    <> 
                        <Row className="status-bar" >
                            <StatusBar />
                        </Row>
                        <h3 className='stats-subtitle'>Stats for {`${moment().subtract(6, 'days').format('dddd LL')} - ${moment().format('dddd LL')}`} <StatsModal className='pl-2'/></h3>
                        <StatsGraphs user={user} showStatsDetails={this.state.showStatsDetails}/>
                    </>
                )}
            </Consumer>
        );
    }
}

export default Stats;