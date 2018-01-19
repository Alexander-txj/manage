import { HashRouter as Router, Route, Switch, Link, withRouter } from 'react-router-dom';
import React from 'react';
import { Breadcrumb } from 'antd';
import './breadcrumb.scss';

const breadcrumbNameMap = {
    '/ContentTest': 'ContentTest'
};

const BreadcrumbComponent = withRouter((props) => {
    const {location} = props;
    const pathSnippets = location.pathname.split('/').filter(i => i);
    const extraBreadcrumbItems = pathSnippets.map((_, index) => {
        const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
        return (
            <Breadcrumb.Item key={url}>
                <Link to={url}>
                    {breadcrumbNameMap[url]}
                </Link>
            </Breadcrumb.Item>
        );
    });

    const breadcrumbItems = [(
        <Breadcrumb.Item key="/">
            <Link to="/">Admin</Link>
        </Breadcrumb.Item>
    )].concat(extraBreadcrumbItems);

    return (
        <div className="breadcrumb">
            <Breadcrumb>
                {breadcrumbItems}
            </Breadcrumb>
        </div>
    );
});

export { BreadcrumbComponent }