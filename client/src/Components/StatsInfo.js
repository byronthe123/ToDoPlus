import React from 'react';
import moment from 'moment';

// Components
import GoalPromptModal from './GoalPromptModal';

const StatsInfo = ({user}) => {
    // methods
    const timeFormatter = (seconds) => {
        return moment().startOf('day').seconds(seconds).format('HH:mm:ss');
    }

    const getStats = (range=7, trim=0) => {
      console.log(`trim = ${trim}`);
      const {productivityRecords} = user;
      const weekDates = [];
      const stats = [];
  
      for(let i = range - 1; i > -1; i--) {
        weekDates.push(moment().subtract(i, 'days').format('L'));
      }

      weekDates.length = (range - trim);
  
      console.log(weekDates);
  
      for(let i = 0; i < weekDates.length; i++) {
          // console.log(weekDates[i]);
          const stat = {
            date: weekDates[i]
          };
        
          for(let j = (productivityRecords.length - 1); j > (productivityRecords.length - range); j--) {
            if(productivityRecords[j]) {
              if(moment(productivityRecords[j].date).format('L') === weekDates[i]) {
                  // console.log(`${moment(productivityRecords[j].date).format('L')} === ${weekDates[i]} = ${moment(productivityRecords[j].date).format('L') === weekDates[i]}`);
                stat.productivityData = productivityRecords[j];
              }
            }
          }
  
          stats.push(stat);
      }

      console.log(stats);
        
      const weeksProductivityTime = stats.reduce((productivityTime, stat) => {
          return productivityTime += stat.productivityData ? stat.productivityData.productivityAchieved : 0;
      }, 0);

      const weeksProductivityGoal = stats.reduce((productivityTime, stat) => {
        return productivityTime += stat.productivityData ? stat.productivityData.productivityGoal : 0;
      }, 0);

      console.log(weeksProductivityTime);

      const finalStats = {
        pastWeeksProductivity: weeksProductivityTime,
        productivityScore: Math.round(weeksProductivityTime / weeksProductivityGoal * 100),
        weeksAverageDailyProductivityTime: (weeksProductivityTime / range)
      }

      // ({Math.round(getStats().pastWeeksProductivity / user.weeklyProductivityGoal * 100)}%)

      return finalStats;
    }

    const weeksAverageDailyProductivityTime = () => {
        return getStats();
    }

    const averageDailyProductivity = () => {
        const totalProductivityTime = user.productivityRecords.reduce((productivityTime, record) => {
            return productivityTime += record.productivityAchieved;
        }, 0);
        // const totalProductivityGoals = user.productivityRecords.reduce((productivityGoals, record) => {
        //     return productivityGoals += record.productivityGoal; 
        // }, 0);
        const startDate = user.productivityRecords[0].date;
        const today = moment();
        const daysSinceStart = today.diff(startDate, 'days');
        return timeFormatter(totalProductivityTime / daysSinceStart);
    }

    const productivityNeededForWeekyGoal = () => {
      // return (user.weeklyProductivityGoal / 7);
      return timeFormatter((user.weeklyProductivityGoal / 7));
    }

    const highestProductivityAchieved = () => {
        const {productivityRecords} = user;
        console.log(productivityRecords);
        console.log(productivityRecords.sort((a, b) => b.productivityAchieved - a.productivityAchieved));
        const highestProductivityRecord = (productivityRecords.sort((a, b) => b.productivityAchieved - a.productivityAchieved))[0];
        return `${timeFormatter(highestProductivityRecord.productivityAchieved)} on ${moment(highestProductivityRecord.date).format('L')}`;
    }

    const productivityDelta = () => {
        const delta = getStats(7) - getStats(7,1);
        console.log(`${getStats(7)} - ${getStats(7,1)} = ${getStats(7) - getStats(7,1)}`);
        console.log(delta);
        return delta;
    }

    // return
    return(
        user && 
          <>
            <div>
              <h3>Productivity Score: {getStats().productivityScore}%</h3>
              <h3>Average Daily Productivity: {averageDailyProductivity()}</h3>
              <h3>Average Daily Productivity Time for the Past Week: {timeFormatter(getStats().weeksAverageDailyProductivityTime)}</h3>
              <h3>Daily Productivity Needed to Meet Weekly Goal: {productivityNeededForWeekyGoal()}</h3>
              <h3>Productivity for the Past Week: {timeFormatter(getStats().pastWeeksProductivity)} ({Math.round(getStats().pastWeeksProductivity / user.weeklyProductivityGoal * 100)}% of Goal)</h3>
            </div>
          </>
    );
}

export default StatsInfo;