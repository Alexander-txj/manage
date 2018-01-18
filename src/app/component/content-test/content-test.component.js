import React from 'react';
import { render } from 'react-dom';
import './content-test.scss';

function Welcome(props) {
    return <h1>{props.title}</h1>
}

class Clock extends React.Component {

    constructor(props) {
        super(props);
        this.state = {date: new Date()};
    }

    componentDidMount() {
        this.timer = setInterval(() => this.tick(), 1000)
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    tick() {
        this.setState({
            date: new Date()
        });
    }

    render() {
        return (
            <div>
                <h2>时间: {this.state.date.toLocaleTimeString()}</h2>
            </div>
        );
    }
}

export class ContentTest extends React.Component {

    alertString() {
        alert('string');
    }

    render() {
        return (
            <div className='content'>
                <Clock/>
                <Welcome title="德玛西亚万岁"/>
                <h1 onClick={this.alertString}>{this.props.name}</h1>
                {!'1233' ? <h1>{this.props.name}</h1> : <h1>1233</h1>}
            </div>
        );
    }
}