import React, { Component } from "react";
import API from "../../utils/API";
import ProfileCard from "../../components/ProfileCard";
import Sidenav from "../../components/Sidenav";


class Profile extends Component {
  
  state = {
    stud:[],
    loggedUser:[],
    filterUser:[]

  };

   componentDidMount() {
    this.loadStudents();
    this.getUserDetails(); 
    this.filterLoggedUser();     
    }

    getUserDetails=async ()=>{
      const loggedInUserId = window.location.toString().split("/").pop().split('#')[0];
     console.log("loggedInUserId", loggedInUserId);
      await API.getUserByGoogleId(loggedInUserId)
      .then(async (res) =>{
        await this.setState({ loggedUser: res.data })
        console.log('datta',this.state.loggedUser)
      })
    }
  
     loadStudents = () => {  
      API.getStudents()
        .then(async (res) =>{
          await this.setState({ stud: res.data })
          await this.props.isAuthenticated(true)
        }
        )
        .catch(err => console.log(err));
    };

  deleteStudent = ({target}) => {
const {dataset} =target;
    API.deleteStudent(dataset.id)
      .then(res => this.loadStudents())
      .catch(err => console.log(err));
  };

  filterLoggedUser= async ()=>{
   await this.getUserDetails();
const userFilter =(this.state.loggedUser.map(userdetails=>userdetails.firstName +' '+ userdetails.lastName ));
this.setState({ filterUser: userFilter[0].toLowerCase().trim() })
  }
  
  render() {

  return (
      <div className="d-flex flex-row">
                    <div className="d-flex flex-column align-self-center mr-5">
                         <Sidenav loggedUserDetails={this.state.loggedUser}/>   
                     </div>
                     <div className="d-flex flex-column mt-5">
                        
                         <div className="row text-center mt-5" id="cardDiv">
                         
                           <ProfileCard 
                           results={this.state.stud.filter(
                             (myfilter)=>
                                myfilter.name.toLowerCase().trim()!==this.state.filterUser)} 
                                />

</div>
</div>
</div>
    )
  }
}

export default Profile;