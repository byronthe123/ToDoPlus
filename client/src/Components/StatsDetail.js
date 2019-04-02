import React from 'react';

const StatsDetail = ({entry, timeFormatter}) => {
    // methods

    // return
    return(
        entry &&
        <div className='stats-detail'>
            {console.log(entry)}
            <h5>Task: {entry.taskName}</h5>
            <h5>Productive Time: {timeFormatter(entry.productiveTime)}</h5>
        </div>
    );
}

export default StatsDetail;