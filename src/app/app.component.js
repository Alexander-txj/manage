import React from 'react';
import { render } from 'react-dom';
import { Router, Route } from 'react-router-dom';

import { AppNav } from './component/app-nav/app-nav.component';
import { AppSidebar } from './component/app-sidebar/app-sidebar.component';
import { ContentTest } from "./component/content-test/content-test.component";

import 'antd/dist/antd.css';

class App extends React.Component {
    render() {
        return (
            <div>
                <AppNav/>
                <AppSidebar/>
                <ContentTest name="诺克萨斯"/>
            </div>
        );
    }
}

render(
    <Router>
        <App/>
    </Router>,
    document.getElementById('root')
);