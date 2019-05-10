import React from 'react';
import { Container} from 'reactstrap';
import { ToastContainer } from 'react-toastify';

export const Layout =(props)=>(
            <div>
                <ToastContainer />
                <Container className="p-4">
                    {props.children}
                </Container>
            </div>
        )