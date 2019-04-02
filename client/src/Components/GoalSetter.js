import React, {Component} from 'react';
import {Button} from 'react-bootstrap';
import {Consumer} from './Context';
import moment from 'moment';

class GoalSetter extends Component {

    state = {
        workTimeAvailable: null,
        hours: null,
        min: null
    }

    eod = () => {
        const eod = moment().hour(24).minute(0).second(0);
        return eod;
    }

    updateHours = (e) => {
        this.setState({
            hours: e.target.value
        }, () => {
            console.log(this.state.hours);
        })
    }

    updateMin = (e) => {
        this.setState({
            min: e.target.value
        }, () => {
            console.log(this.state.min);
        })
    }

    setWorkTimeAvailableFormatted = () => {
        // let timeToEnd = eod().subtract({hours: '19', minutes: '05'});
        let timeToEnd = this.eod().subtract({hours: moment().format('HH'), minutes: moment().format('mm'), seconds: moment().format('ss')});
        // return moment(timeToEnd).format('HH:mm:ss');
        this.setState({
            workTimeAvailable: moment(timeToEnd).format('HH:mm:ss')
        })
    }

    checkNaNorZero = (value) => {
        if(parseInt(value) === 0 || isNaN(parseInt(value))) {
            return true;
        }
        return false;
    }

    goalTimeToSeconds = (hoursDelta, minuteDelta) => {
        hoursDelta = isNaN(parseInt(hoursDelta)) ? 0 : parseInt(hoursDelta);
        minuteDelta = isNaN(parseInt(minuteDelta)) ? 0 : parseInt(minuteDelta);
        const hoursToSeconds = (hoursDelta * 60 * 60);
        const minutesToSeconds = (minuteDelta * 60);
        const seconds = hoursToSeconds + minutesToSeconds;
        return seconds;
    } 

    validateGoalTime = (setProductivityGoal, updateGoalStatus) => {
        const hourDelta = this.state.hours;
        const minuteDelta = this.state.min;
        const nowPlusGoalTime = moment().add({ hours: hourDelta, minutes: minuteDelta});

        const overTimeGoal = nowPlusGoalTime.isAfter(this.eod());

        const noGoalTime = (this.checkNaNorZero(hourDelta) && this.checkNaNorZero(minuteDelta)) ? true : false;

        let result;

        if(overTimeGoal) {
            result = 1;
        } else if(noGoalTime) {
            result = -1;
        } else {
            result =  {
                seconds: this.goalTimeToSeconds(hourDelta, minuteDelta)
            }
            setProductivityGoal(this.goalTimeToSeconds(hourDelta, minuteDelta));
        }
        updateGoalStatus(result);


        console.log(result);
    }

    componentDidMount() {
        this.intervalId = setInterval(() => {
            this.setWorkTimeAvailableFormatted();
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.intervalId);
    }

    render() {
        return(
            <Consumer>
                {({setProductivityGoal, updateGoalStatus, user}) => (
                    <div>
                        <h1>{this.state.workTimeAvailable}</h1>
                        <input type='number' min='0' max='18' placeholder='HH' onChange={this.updateHours}></input>
                        <input type='number' min='0' max='59' placeholder='MM' onChange={this.updateMin}></input>
                        <div>
                            <Button className='btn-login' onClick={() => this.validateGoalTime(setProductivityGoal, updateGoalStatus)}>Set Goal</Button>
                        </div>
                    </div>
                )}
            </Consumer>
        );
    }
}

export default GoalSetter;