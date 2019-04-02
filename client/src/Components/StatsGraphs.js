import React from 'react';
import {
  FlexibleWidthXYPlot, 
  FlexibleXYPlot,
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  VerticalBarSeries,
  LabelSeries,
  Hint
} from 'react-vis';
import moment from 'moment';
import {Row, Col} from 'react-bootstrap';
import {Consumer} from './Context';

// Components
import StatsDetailsContainer from './StatsDetailsContainer';

class StatsGraphs extends React.Component {
  state = {
    useCanvas: false,
    value: null,
    stats: [],
    greenData: [],
    blueData: [],
    labelData: null,
    user: null,
    showDetails: false,
    detailsRecord: null,
  };

  timeFormatter = (seconds) => {
    return new Date(seconds * 1000).toISOString().substr(11, 8)
  }

  getStats = (range=7) => {
    console.log(`called getStats`);
    const {productivityRecords} = this.props.user;
    const weekDates = [];
    const stats = [];

    // for(let i = 0; i < range; i++) {
    //     weekDates.push(moment().subtract(i, 'days').format('L'));
    // }

    for(let i = range - 1; i > -1; i--) {
      weekDates.push(moment().subtract(i, 'days').format('L'));
    }

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
    /*
      {date, productivityData}
    */

    this.setState({
        stats,
        greenData: stats.map(function (stat){
            const entry = {x: stat.date, y: stat.productivityData ? stat.productivityData.productivityAchieved/3600 : null, num: stat.productivityData ?  stat.productivityData.productivityAchieved: 0}
            return entry;
        }),
        blueData: stats.map(function (stat){
            const entry = {x: stat.date, y: stat.productivityData ? stat.productivityData.productivityGoal/3600 : null, num: stat.productivityData ?  stat.productivityData.productivityGoal: 0}
            return entry;
        })       
    }, () => {
        this.setState({
            labelData: this.state.greenData.map((d, idx) => ({
                x: d.x,
                y: this.state.greenData[idx].y,
                z: (this.state.greenData[idx].y !== null || this.state.blueData[idx].y !== null) ? Math.round((this.state.greenData[idx].y / this.state.blueData[idx].y) * 100) + '%' : 'No Data',
                a: this.timeFormatter(this.state.greenData[idx].num),
                b: this.timeFormatter(this.state.blueData[idx].num)
            }))
        }, () => {
            console.log(this.state);
        })
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.user !== this.state.user) {
      let user=this.state.user;
      this.setState({
          user
        }, () => {
            console.log(`user updated`);
            // console.log(this.state.user);
            this.getStats();
        });
    }
  }

  componentDidMount() {
    this.props.user && 
    this.getStats();
  }

  static getDerivedStateFromProps(nextProps, prevState){
    if(nextProps.user!==prevState.user){
      return {user : nextProps.user};
    }
    else return null;
  }

  _forgetValue = () => {
    this.setState({
      value: null
    });
  };

  _rememberValue = (captureValue) => {
    // console.log(captureValue);
    // console.log(this.state.labelData);
    // console.log(this.state.stats);
    let match = this.state.labelData.filter((data) => data.x === captureValue.x);
    const value = {
      Achieved: match[0].a,
      Goal: match[0].b,
      x: captureValue.x,
      y: captureValue.y,
    };

    console.log(match[0]);
    this.setState({
      value
    }, () => {
      console.log(this.state.value);
    });
  };

  showDetails = () => {
    // console.log(this.state.value && this.state.value.x);
    const selectedDate = this.state.value && this.state.value.x;
    const matchedRecord = this.state.stats.filter(stat => stat.date === selectedDate)[0];
    console.log(matchedRecord);
    const entry = matchedRecord.productivityData.entries[0]; //entry.productivityTime, entry.taskName
    this.setState({
      showDetails: true,
      detailsRecord: matchedRecord
    }, () => {
      // alert(this.state.showDetails);
    })
  }

  hideDetails = () => {
    this.setState({
      showDetails: false
    }, () => {
      this.forceUpdate()
    });
  }

  render() {
    // const BarSeries = useCanvas ? VerticalBarSeriesCanvas : VerticalBarSeries;
    const BarSeries = VerticalBarSeries;
    return (
      <Consumer>
        {({user}) => (
          user && 
            <Row className='full-height'>
              <Col className='full-height' lg={this.state.showDetails ? 9 : 12} md={this.state.showDetails ? 9 : 12}>
              <FlexibleXYPlot xType="ordinal" xDistance={this.state.showDetails ? 50 : this.props.showStatsDetails ? 50 : 100}>
                {/* <XYPlot xType="ordinal" width={this.state.showDetails ? 600 : 1200} height={600} xDistance={this.state.showDetails ? 50 : 100}> */}
                  <VerticalGridLines />
                  <HorizontalGridLines />
                  <XAxis />
                  <YAxis />
                  <BarSeries className="vertical-bar-series-example" onValueClick={this.showDetails} data={this.state.greenData} onValueMouseOver={this._rememberValue} onValueMouseOut={this._forgetValue} color={'#f2b632'}/>
                  <BarSeries data={this.state.blueData} color={'#b5b5b7'}/>
                  <LabelSeries data={this.state.labelData} getLabel={d => d.z} />
                  {
                    this.state.value ? 
                    <Hint value={this.state.value}>
                      <div className='hint'>
                        <h5>Achieved: {this.state.value.Achieved}</h5>
                        <h5>Goal: {this.state.value.Goal}</h5>
                      </div>
                    </Hint> :
                    null
                  }
                </FlexibleXYPlot >
              </Col>
              <Col lg={3} md={3} className={!this.state.showDetails ? 'hidden' : null}>
                <StatsDetailsContainer record={this.state.detailsRecord} hideDetails={this.hideDetails}/>
              </Col> 
            </Row>
        )}
      </Consumer>
    );
  }
}

export default StatsGraphs;
