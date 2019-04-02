import React, {Component} from 'react';
import {Route, NavLink} from 'react-router-dom';
import moment from 'moment';
import {Consumer} from './Context';

// Bootstrap:
import {Row, Col, Dropdown} from 'react-bootstrap';

// Components:
import StatusBarGraph from './StatusBarGraph';
import GoalPromptModal from './GoalPromptModal';
import NavBar from './NavBar';

class StatusBar extends Component {

    state = {
        workTimeAvailableFormatted: null,
    }

    eod = () => {
        const eod = moment().hour(24).minute(0).second(0);
        return eod;
    }

    setWorkTimeAvailable = () => {
        // let timeToEnd = eod().subtract({hours: '19', minutes: '05'});
        let timeToEnd = this.eod().subtract({hours: moment().format('HH'), minutes: moment().format('mm'), seconds: moment().format('ss')});
        const workTimeAvailableFormatted =  moment(timeToEnd).format('HH:mm:ss');

        this.setState({
            timeToEnd,
            workTimeAvailableFormatted
        }, () => {
            // if(this.state.workTimeAvailableFormatted === '00:30:00') {
            //     alert('Please start your final productivty session - the app will reload at midnight and running productivity timers will be reset');
            // }
            if(this.state.workTimeAvailableFormatted === '00:00:01') {
                window.location.href = 'https://todoplus.herokuapp.com/profile/todos';
            }
        })
    }

    componentDidMount() {
        this.intervalId = setInterval(() => {
            this.setWorkTimeAvailable();
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.intervalId);
    }

    // methods
    timeFormatter = (seconds) => {
        return moment().startOf('day').seconds(seconds).format('HH:mm:ss');
    }

    productivityTime = (user) => {
        return user.productivityRecords && (user.productivityRecords[user.productivityRecords.length - 1].productivityAchieved)
    }

    productivityGoal = (user) => {
        return user.productivityRecords && (user.productivityRecords[user.productivityRecords.length - 1].productivityGoal);
    }

    // return
    render() {
        return (
            <Consumer>
                {({user}) => (
                    user && 
                    <React.Fragment>
                        <Col lg={4} className="justify-content-end">
                            <StatusBarGraph productivityGoal={this.productivityGoal(user)} productivityTime={this.productivityTime(user)}/>
                            <Row>
                                <Col lg={4}>
                                    <div class="dropdown">
                                        <h3 class="status-percent" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            {this.productivityGoal(user) > 0 ? ((Math.round(this.productivityTime(user) / this.productivityGoal(user) * 100)) + '%') : '0%'}
                                        </h3>
                                        <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
                                            <button class="dropdown-item" type="button">Current Productive Time: {this.timeFormatter(this.productivityTime(user))}</button>
                                            <button class="dropdown-item" type="button">Productivity Goal: {this.timeFormatter(this.productivityGoal(user))}<NavLink to={'/profile/todos/updateGoal'}><i className="fas fa-edit ml-1"></i></NavLink></button>
                                            <button class="dropdown-item" type="button">Weekly Goal: {this.timeFormatter(user.weeklyProductivityGoal)}<NavLink to={'/profile/todos/updateWeeklyGoal'}><i className="fas fa-edit ml-1"></i></NavLink></button>
                                        </div>
                                    </div>
                                </Col>
                                <Col>
                                    <h3 className='out-time'>{this.state.workTimeAvailableFormatted}</h3>
                                </Col>
                            </Row>
                            <Route path='/profile/todos/updateGoal' render={() => <GoalPromptModal type='daily' history={true}/>}/>
                            <Route path='/profile/todos/updateWeeklyGoal' render={() => <GoalPromptModal type='weekly' history={true}/>}/>
                        </Col>
                        <Col lg={4} className='text-center align-middle'>
                            <NavLink to='/profile/todos'><h1 className='title'>To Do Plus</h1></NavLink>
                        </Col>
                        <Col lg={4}>
                            <NavBar/>
                        </Col>
                    </React.Fragment>
    
                )}
            </Consumer>
        );
    }
}

export default StatusBar;