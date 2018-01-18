import React from 'react';
import { render } from 'react-dom';
import { Link, Route, BrowserRouter as Router } from 'react-router-dom'

import { AppNav } from './component/app-nav/app-nav.component';
import { AppSidebar } from './component/app-sidebar/app-sidebar.component';
import { BreadcrumbComponent } from "./component/breadcrumb/breadcrumb.component";

import 'antd/dist/antd.css';

class App extends React.Component {
    render() {
        return (
            <div>
                <AppNav/>
                <Router>
                    <BreadcrumbComponent/>
                </Router>
                <AppSidebar/>
            </div>
        );
    }
}

render(
    <App/>,
    document.getElementById('root')
);