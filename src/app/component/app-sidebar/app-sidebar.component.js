import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Link } from 'react-router-dom';

import { Menu, Icon, Button } from 'antd';

import { Home } from '../home/home.component';

import './app-sidebar.scss';

const SubMenu = Menu.SubMenu;

const menuData = [
    {
        key: '1',
        title: '测试1',
        icon: 'pie-chart',
        src: 'home',
        component: Home
    },
    {
        key: '2',
        title: '测试2',
        icon: 'desktop',
        src: ''
    },
    {
        key: '3',
        title: '测试3',
        icon: 'inbox',
        src: ''
    },
    {
        key: '4',
        title: '测试4',
        icon: 'mail',
        nodes: [
            {
                key: '4、1',
                title: '测试4、1',
                src: ''
            },
            {
                key: '4、2',
                title: '测试4、2',
                src: ''
            }
        ]
    }
];

export class AppSidebar extends React.Component {
    state = {
        collapsed: false
    };

    toggleCollapsed = () => {
        this.setState({
            collapsed: !this.state.collapsed
        });
    };

    chooseRouter(item) {
        console.log(item);
    }

    getSubData(data) {
        return data.map(item => {
            return (
                <Menu.Item key={item.key}>
                    <Icon type={item.icon}/>
                    <span>{item.title}</span>
                </Menu.Item>
            );
        });
    }

    render() {
        return (
            <div className="app-sidebar">
                <div className="logo">
                    <span>Admin</span>
                </div>
                <Menu onClick={this.chooseRouter.bind(this)}
                      defaultSelectedKeys={['1']}
                      defaultOpenKeys={['4']}
                      mode="inline"
                      theme="dark"
                      inlineCollapsed={this.state.collapsed}
                >
                    {menuData.map(item => {
                        return item.nodes ? (
                            <SubMenu key={item.key}
                                     title={<span><Icon type={item.icon}/><span>{item.title}</span></span>}>
                                {this.getSubData(item.nodes)}
                            </SubMenu>
                        ) : (
                            <Menu.Item key={item.key}>
                                <Icon type={item.icon}/>
                                <span>{item.title}</span>
                            </Menu.Item>
                        );
                    })}
                </Menu>
            </div>
        );
    }
}