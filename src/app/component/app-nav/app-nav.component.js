import React from 'react';
import { render } from 'react-dom';

import './app-nav.scss';

export class AppNav extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <header className="app-nav">
                <div className="nav">This is A Title</div>
                <div className="nav-right">
                    <span className="email">account_name</span>
                    <a>
                        <span>
                            <i className="fa fa-key"></i>
                            修改密码
                            </span>
                    </a>
                    <a>
                        <span>
                            <i className="fa fa-power-off"></i>
                            退出
                        </span>
                    </a>
                    {/*<a>*/}
                        {/*<span>*/}
                            {/*登录*/}
                        {/*</span>*/}
                    {/*</a>*/}
                </div>
            </header>
        );
    }
}