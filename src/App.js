import React from 'react'
import {BrowserRouter} from 'react-router-dom'
import MainRouter from "./MainRouter"
// import axios from 'axios';
// import Loading from './Loading'

const App = () => (
  <BrowserRouter>
    <MainRouter/>
  </BrowserRouter>

)

export default App;













// class App extends Component {

  // constructor(props){
  //   super(props);

  //   // state
  //   this.state = {
  //     users: [],
  //     loading: false
  //   }

  //   // bind
  //   this.handleSubmit = this.handleSubmit.bind(this)
  // }

  // getUsers(){
  //   this.setState({
  //     loading: true
  //   })
  //   axios('https://randomuser.me/api/?results=5')
  //   .then(response => this.setState({
  //     users: [...this.state.users,...response.data.results],
  //     loading: false
  //   }))
  // }
  // componentDidMount(){
  //   this.getUsers();
  // }

  // handleSubmit(e){
  //   e.preventDefault()
  //   this.getUsers()
  //   console.log('more users loaded')
  // }

  // render(){
  //   const {loading, users} = this.state
  //   return ( 
  //     <div className="App">
  //       <form onSubmit = {this.handleSubmit}>
  //         <input type = "submit" value= "load users"/>
  //       </form>
  //       <hr/>
  //       { !loading ?
  //         users.map(user => (
  //         <div key={user.id.value}>
  //           <h3 style={{color: 'red'}}>{user.name.first}</h3>
  //           <p>{user.email}</p>
  //           <hr/> 

  //         </div>
  //       ))
  //       : (<Loading message= "Wait"/>)}
  //     </div> 
  //   )
  // }

// }

// export default App;
