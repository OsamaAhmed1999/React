import React, {Component} from 'react'
import {signup} from '../auth/index'
import {Link} from 'react-router-dom'

export class Signup extends Component {
    constructor(){
        super()
        this.state = {
            Name: "",
            Email: "",
            Password: "",
            error: "",
            open: false
        }
    }

    handleChange = (Name) => (event) => {
        this.setState({error: ""})
        this.setState({[Name]: event.target.value});

    }

    clickSubmit = event => {
        event.preventDefault()
        const {Name, Email, Password} = this.state
        const user = {
            Name,
            Email,
            Password
        }
        console.log(user)
        signup(user)
        .then(data => {
            if(data.error){
                this.setState({error: data.error})
            }
            else{
                this.setState({
                    error: "",
                    Name: "",
                    Email: "",
                    Password: "",
                    open: true
                })
            }
        })
        
    }

    render(){
        const {Name, Email, Password, error, open} = this.state
        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Signup</h2>
                <div className="alert alert-danger" style={{display: error ? "" : "none"}}>
                    {error}
                </div>
                <div className="alert alert-info" style={{display: open ? "" : "none"}}>
                    Account is successfully created. Please <Link to="/signin">Signin</Link>
                </div>
                <form>
                   <div className="form-group">
                         <label className="text-muted">Name</label>
                         <input 
                            onChange={this.handleChange("Name")} 
                            type="text" 
                            className="form-control"
                            value={Name} />
                    </div>
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

export default Signup