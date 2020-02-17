import React, {Component} from 'react'
import { Redirect } from 'react-router-dom'
import {signin, authenticate} from "../auth/index"

export class Signin extends Component {
    constructor(){
        super()
        this.state = {
            Email: "",
            Password: "",
            error: "",
            loading: false,
            redirectToRefer: false
        }
    }

    handleChange = (Name) => (event) => {
        this.setState({error: ""})
        this.setState({[Name]: event.target.value});

    } 

    clickSubmit = event => {
        event.preventDefault()
        this.setState({loading: true})
        const {Email, Password} = this.state
        const user = {
            Email,
            Password
        }
        // console.log(user)
        signin(user)
        .then(data => {
            if(data.error) this.setState({error: data.error, loading: false})
            else {
                authenticate(data, () => {
                    this.setState({redirectToRefer: true})
                })
            }
        })
        
    }

    render(){
        const {Email, Password, error, redirectToRefer, loading} = this.state

        if (redirectToRefer){
            return <Redirect to="/" />
        }
        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Signin</h2>
                <div className="alert alert-danger" style={{display: error ? "" : "none"}}>
                    {error}
                </div>

                { loading ? ( <div className="jumbotron text-center">
                        <h2>Loading...</h2>
                </div>) :( "" )}

                <form>
                    <div className="form-group">
                        <label className="text-muted">Email</label>
                        <input 
                            onChange={this.handleChange("Email")} 
                            type="Email"
                            className="form-control"
                            value={Email} />
                    </div>
                    <div className="form-group">
                        <label className="text-muted">Password</label>
                        <input 
                            onChange={this.handleChange("Password")} 
                            type="Password" 
                            className="form-control"
                            value={Password} />
                    </div>
                    <button onClick={this.clickSubmit} className="btn btn-raised btn-primary">Submit</button>
                </form>
            </div>
        )
    }
}

export default Signin