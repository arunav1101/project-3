import React, { Component } from "react";
import Modal from '../../components/Modal';

class Login extends Component{

    componentDidMount(){
        /* Hook for initializing stuff */
    }
    
    render(){
        return (
            <div>
                    <Modal />
                {/* Login page components go here */}
            </div>
        )
    }
}

export default Login;