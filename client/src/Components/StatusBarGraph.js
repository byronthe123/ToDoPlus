import React, {Component} from 'react';
import { XYPlot, ArcSeries } from "react-vis";

import moment from 'moment';

class StatusBarGraph extends Component {

    state = {
        workTimeAvailableSeconds: null,
        workTimeAvailableFormatted: null
    }

    eod = () => {
        const eod = moment().hour(24).minute(0).second(0);
        return eod;
    }

    setWorkTimeAvailable = () => {
        // let timeToEnd = eod().subtract({hours: '19', minutes: '05'});
        let timeToEnd = this.eod().subtract({hours: moment().format('HH'), minutes: moment().format('mm'), seconds: moment().format('ss')});
        const timeToEndForSeconds =  moment(timeToEnd).format('HH:mm:ss');

        this.setState({
            workTimeAvailableSeconds: moment.duration(timeToEndForSeconds).asSeconds(),
            workTimeAvailableFormatted: timeToEndForSeconds
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

    render() {
        return (
            <div className='status-bar-graph-wrapper1 mb-3'>
                {/* <div className='out-time-container'>
                    <h3 className='out-time'>{this.state.workTimeAvailableFormatted}</h3>
                </div> */}
                <XYPlot
                    xDomain={[-3, 3]}
                    yDomain={[-3, 3]}
                    width={150}
                    getAngle={d => d.total} //this refers to the total data
                    getAngle0={d => 0}
                    height={150}
                    className='statusbar-graph'
                    >
                    <ArcSeries
                        animation={{
                        damping: 9,
                        stiffness: 300
                        }}
                        style={{
                        strokeWidth: 2
                        }}
                        radiusDomain={[0, 3]}
                        data={[
                        { total: this.props.productivityGoal, radius0: 3, radius: 2.5, color: "white" },
                        {
                            total: (this.props.productivityTime / this.props.productivityGoal) * 6.3,
                            radius0: 3,
                            radius: 2.5,
                            color: "#f2b632"
                        }
                        ]}
                        colorType={"literal"}
                    />
                </XYPlot>
            </div>
        );
    }
}

export default StatusBarGraph;