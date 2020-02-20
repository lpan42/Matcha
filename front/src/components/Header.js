//rce from es7 react extension
import React, { Component } from 'react'
import PropTypes from 'prop-types';//shortcut impt 

export class Header extends Component {
    static defaultProps = {title : 'Matcha'};

    static propTypes = {
        title: PropTypes.string.isRequired
    };

    render() {
        return (
            <nav className='navbar bg-primary'>
                <h1>{this.props.title}</h1>
            </nav>
        )
    }
}

export default Header
