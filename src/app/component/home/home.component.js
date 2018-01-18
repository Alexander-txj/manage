import React from 'react';
import { render } from 'react-dom';

export class Home extends React.Component {

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
                {'xxx' ? 'xxxx' : 'xxxxxxx'}
            </div>
        );
    }
}