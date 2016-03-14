class AnimatedIcon extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      weather: {}
    }
  }
  componentWillReceiveProps(nextProps){
    this.setState({weather: nextProps.weather.weather?nextProps.weather.weather[0]:{}})
  }

  render(){
    if(!this.state.weather.icon){
      return <p>loading...</p>
    }else{
      switch(this.state.weather.icon){
        case "10d":
        case "10n":
          return(
            <div class="icon sun-shower">
              <div class="cloud"></div>
              <div class="sun">
                    <div class="rays"></div>
              </div>
              <div class="rain"></div>
            </div>
          )
        case "11d":
        case "11n":
          return(
            <div class="icon thunder-storm">
              <div class="cloud"></div>
              <div class="lightning">
                <div class="bolt"></div>
                <div class="bolt"></div>
              </div>
            </div>
          )
        case "04d":
        case "04n":
        case "03d":
        case "03n":
          return(
            <div className="icon cloudy">
              <div className="cloud"></div>
              <div className="cloud"></div>
            </div>
          )
        case "13d":
        case "13n":
          return(
            <div class="icon flurries">
              <div class="cloud"></div>
              <div class="snow">
                <div class="flake"></div>
                <div class="flake"></div>
              </div>
            </div>
          )
        case "01d":
        case "01n":
        case "02d":
        case "02n":
          return(
            <div className="icon sunny">
              <div className="sun">
                <div className="rays"></div>
              </div>
            </div>
          )
        case "09d":
        case "09n":
          return(
            <div class="icon rainy">
              <div className="cloud"></div>
              <div className="rain"></div>
            </div>
          )
        default:
          return <p>{this.state.weather.main}</p>
      }
    }
  }
}

class Weather extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      weatherJson: {}
    }
  }

  componentWillReceiveProps(nextProps) {
    $.getJSON('http://api.openweathermap.org/data/2.5/weather?q='+nextProps.location.city+','+nextProps.location.countryCode+'&appid=aff3931a89437efd06e933e4504f19d6', function(weather){
      this.setState({weatherJson: weather})
    }.bind(this))
  }

  render() {
    return(
      <div>
        <h1>{this.state.weatherJson.main ? Math.floor(this.state.weatherJson.main.temp-273)+"°C" : null }, {this.state.weatherJson.weather ? this.state.weatherJson.weather[0].main : null}</h1>
        <AnimatedIcon weather={this.state.weatherJson}/>
      </div>
    )
  }
}

class Application extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      location: {}
    }
  }

  componentWillMount(){//or componentDidMount
    $.getJSON('http://ip-api.com/json', function(location){
      this.setState({location: location})
    }.bind(this))
  }

  render(){
    return(
      <div>
        <h1>{this.state.location.city}, {this.state.location.countryCode}</h1>
        <Weather location={this.state.location}/>
        <p>Based on <a href="http://codepen.io/joshbader/full/EjXgqr" target="_blank">kylor</a> by <a href="http://fb.com/paxfgf" target="_blank">paxf</a></p>
      </div>
    )
  }
}

ReactDOM.render(<Application />, document.getElementById('app'))
