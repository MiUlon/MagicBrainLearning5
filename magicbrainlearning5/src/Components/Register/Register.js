import React from 'react';

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            registerName: '',
            registerEmail: '',
            registerPassword: ''
        }
    };

    onRegisterName = (event) => {
        this.setState({registerName: event.target.value});
    };

    onRegisterEmail = (event) => {
        this.setState({registerEmail: event.target.value});
    };

    onRegisterPassword = (event) => {
        this.setState({registerPassword: event.target.value});
    };

    onRegisterButtonSubmit = () => {
        fetch('http://localhost:3001/register', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: this.state.registerName,
                email: this.state.registerEmail,
                password: this.state.registerPassword
            })
        })
        .then(response => response.json())
        .then(user => {
            if(user.id) {
                this.props.loadUser(user);
                this.props.onRouteChange('home');
            }
        })
    };

    render() {
        return (
            <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 center shadow-5">
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f1 fw6 ph0 mh0">Register</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" forhtml="name">Name</label>
                            <input 
                                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="text" 
                                name="name" 
                                id="name"
                                onChange={this.onRegisterName}
                            />
                        </div>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" forhtml="email-address">Email</label>
                            <input 
                                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="email" 
                                name="email-address" 
                                id="email-address"
                                onChange={this.onRegisterEmail}
                            />
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" forhtml="password">Password</label>
                            <input 
                                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="password" 
                                name="password" 
                                id="password"
                                onChange={this.onRegisterPassword}
                            />
                        </div>
                        </fieldset>
                        <div className="">
                        <input onClick={this.onRegisterButtonSubmit} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib br2" type="submit" value="Register"/>
                        </div>
                    </div>
                </main>
            </article>
        )
    }
}

export default Register;