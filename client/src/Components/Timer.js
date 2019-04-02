import React, {Component} from 'react';
import { XYPlot, ArcSeries } from "react-vis";

class Timer extends Component {

    state = {
        seconds: 10,
        isRunning: false
    }

    toggleTimer = () => {
        this.setState(prevState => ({
            isRunning: !prevState.isRunning
        }));
    }

    tick = () => {
        if(this.state.isRunning) {
            this.setState(prevState => ({
                seconds: prevState.seconds -= 1
            }), () => {
                if(this.state.seconds === 0) {
                    clearInterval(this.intervalId);
                    this.props.updateEntryProductiveTime();
                }
            });
        }
    }

    componentDidMount() {
        this.intervalId = setInterval(() => {
            this.tick();
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.intervalId);
    }

    render() {
        const {seconds} = this.state;
        return (
            <div>
                <h1>{this.props.timeFormatter(this.state.seconds)}</h1>
                {/* <h4>Task: {this.props.task.taskName}</h4> */}
                <button onClick={this.toggleTimer}>{this.state.isRunning ? 'Stop' : 'Start'}</button>
                <XYPlot
                    xDomain={[-3, 3]}
                    yDomain={[-3, 3]}
                    width={300}
                    getAngle={d => d.total} //this refers to the total data
                    getAngle0={d => 0}
                    height={300}
                    className='timer-modal-graph'
                    >
                    <ArcSeries
                        animation={{
                        damping: 9,
                        stiffness: 300
                        }}
                        style={{
                        // stroke: "black", //specify stroke here
                        strokeWidth: 2
                        }}
                        radiusDomain={[0, 3]}
                        data={[
                        { total: 1500, radius0: 2, radius: 2.5, color: "#b5b5b7" },
                        {
                            total: ((10 - seconds) / 10) * 6.3,
                            radius0: 2,
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

export default Timer;