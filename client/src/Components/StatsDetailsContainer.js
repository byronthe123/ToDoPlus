import React from 'react';
import moment from 'moment';

// Components:
import StatsDetail from './StatsDetail';

const StatsDetailsContainer = ({record, hideDetails}) => {
    // methods
    const timeFormatter = (seconds) => {
        return moment().startOf('day').seconds(seconds).format('HH:mm:ss');
    }

    // return
    return(
        record && 
        <div className='stats-details-container'>
            {console.log(record)}
            <h3>Details for {moment(record.productivityData.date).format('L')}</h3>
            <h5>Productivity Goal: {timeFormatter(record.productivityData.productivityGoal)}</h5>
            <h5>Productivity Achieved: {timeFormatter(record.productivityData.productivityAchieved)}</h5>
            <h4>Tasks:</h4>
            {record.productivityData.entries.map(entry => <StatsDetail entry={entry} timeFormatter={timeFormatter}/>)}
            <button onClick={() => hideDetails()}>Hide</button>
        </div>
    );
}

export default StatsDetailsContainer;