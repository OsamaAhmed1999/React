import React, {Component} from 'react'
import { isAuthenticated } from '../auth/index'
import { Redirect, Link} from 'react-router-dom'
import { read } from './apiUser'
import DefaultPic from '../images/user.png'
import DeleteUser from './deleteUser'


class Profile extends Component{
    constructor(){
        super()
        this.state = {
            user: "",
            redirectTSignin: false

        }
    }

    init = userId => {
        const token = isAuthenticated().token
        read(userId, token)
        .then(data => {
            if(data.error){
                console.log("ERROR")
            }
            else{
                this.setState({user: data[0]});
            }
        })
    }

    componentDidMount(){
        const userId = this.props.match.params.userId
        this.init(userId)
    }

    componentWillReceiveProps(props){
        const userId = props.match.params.userId
        this.init(userId)
    }

    render(){
        const {redirectTSignin, user} = this.state
        if(redirectTSignin) return <Redirect to="/signin" />
        return(
            <div className="container">
                <h2 className="mt-5 mb-5">Profile</h2>
                <div className="row">
                    <div className="col-md-6">
                        <img className="card-img-top"
                        src={DefaultPic}
                        alt={user.Name}
                        style={{width: "100%", height: '15vw', objectFit: "cover"}} />
                    </div>

                    <div className="col-md-6">
                        <div className="lead mt-2">
                            <p>Hello {user.Name}</p>
                            <p>Your Email is {user.Email}</p>
                            <p>{`Joined ${new Date(user.Creation_Date).toDateString()}`}</p>
                        </div>
                        {isAuthenticated().user && isAuthenticated().user.User_id === user.User_id && (
                            <div className="d-inline-block">
                                <Link className="btn btn-raised btn-success mr-5" to={`/user/edit/${user.User_id}`}>
                                    Edit Profile
                                </Link>
                                <DeleteUser userId={user.User_id}/>
                            </div>
                        )}

                    </div>
                </div>

            </div>
            
        )
    }
}

export default Profile