import React from 'react';
import { render } from 'react-dom';

export class Home extends React.Component {

    render() {
        return (
            <div className='content'>
                {!'1233' ? <h1>{this.props.name}</h1> : <h1>1233</h1>}
            </div>
        );
    }
}