import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';
import { isAuthenticated } from '../auth/index'
import { read, update } from './apiUser'


class EditProfile extends Component {
    constructor(){
        super()
        this.state = {
            Name: "",
            Email: "",
            User_id: "",
            Password: "",
            redirectToProfile: false,
            error: "",
            loading: false,
            fileSize: 0
        }

    }

    init = userId => {
        const token = isAuthenticated().token
        read(userId, token)
        .then(data => {
            if(data.error){
                this.setState({redirectToProfile: true})
            }
            else{
                this.setState({
                    User_id: data[0].User_id,
                    Name: data[0].Name, 
                    Email: data[0].Email,
                    error: ""
                });
            }
        })
    }

    componentDidMount(){
        this.userData = new FormData()
        const userId = this.props.match.params.userId
        this.init(userId)
    }

    isValid = () => {
        const {Name, Email, Password, fileSize} = this.state
        if(fileSize > 100000){
            this.setState({error: "File size should be less than 100kb"})
            return false
        }
        if(Name.length === 0){
            this.setState({error: "Name is required"})
            return false
        }
        if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).test(Email)){
            this.setState({error: "A valid Email is required"})
            return false
        }
        if(Password.length >= 1 && Password.length <= 5){
            this.setState({error: "Password must be at least 6 character long"})
            return false
        }
        return true
    }

    handleChange = (Name) => (event) => {
        this.setState({error: ""})
        const value = Name === "photo" ? event.target.files[0] : event.target.value
        const fileSize = Name === "photo" ? event.target.files[0].size : 0
        this.userData.set(Name, value)
        this.setState({[Name]: value, fileSize});

    }

    clickSubmit = event => {
        event.preventDefault()
        // this.setState({loading: true})
        if(this.isValid()){
            const token = isAuthenticated().token
            const userId = this.props.match.params.userId
            update(userId, token, this.userData)
            .then(data => {
                if(data.error){
                    this.setState({error: data.error})
                }
                else{
                    this.setState({
                        redirectToProfile: true
                    })
                }
            })
        }
        
    }

    render(){
        const {User_id, Name, Email, Password, redirectToProfile, error, loading} = this.state
        if(redirectToProfile){
            return <Redirect to={`/user/${User_id}`} />
        }

        return(
            <div className="container">
                <h2 className="mt-5 mb-5">Edit Profile</h2>

                <div className="alert alert-danger" style={{display: error ? "" : "none"}}>
                    {error}
                </div>

                { loading ? ( <div className="jumbotron text-center">
                        <h2>Loading...</h2>
                </div>) :( "" )}

                <form>
                    <div className="form-group">
                        <label className="text-muted">Profile Photo</label>
                        <input 
                            onChange={this.handleChange("photo")} 
                            type="file"
                            accept="image/*" 
                            className="form-control"/>
                    </div>
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
                    <button onClick={this.clickSubmit} className="btn btn-raised btn-primary">Update</button>
                </form>
            </div>
        )
    }
}

export default EditProfile