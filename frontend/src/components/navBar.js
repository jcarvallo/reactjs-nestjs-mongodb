import React, { Component } from 'react';
import {Navbar,NavbarBrand} from 'reactstrap';

export class NavBar extends Component {
    
    render() {
        return (
            <div>
                <Navbar color="light" light expand="md">
                    <NavbarBrand href="/">Reactjs & Nestjs</NavbarBrand>
                    
                </Navbar>
            </div>
        );
    }
}