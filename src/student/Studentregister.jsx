import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { Link ,Redirect } from "react-router-dom";
import axios from 'axios';
import $ from 'jquery';
import StudentHome from './StudentHome'

import { api_link, LoginUserAuth, LoginAuth } from '../Home';

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }


class Studentregister extends React.Component {

    constructor(){
        super();
        this.state = {
            fname:'',
            lname:'',
            email:'',
            phn:0,
            pswd:'',
            gender:'',
           
        };
       this.handleFormSubmit=this.handleFormSubmit.bind(this);
      }
      componentDidMount() {
    }
    
      handleFormSubmit(event){
       var obj = this
          event.preventDefault();
          $("#invalid_message").hide();
     
          let formData = new FormData();
          formData.append('register_student', "true")
          formData.append('fname', this.state.fname)
          formData.append('lname', this.state.lname)
          formData.append('email', this.state.email)
          formData.append('contact',this.state.phn)
          formData.append('pass', this.state.pswd)
         formData.append('gender',this.state.gender)
  
          //var obj=this
         
          axios({
              method: 'post',
              url: api_link+'CategoriesManagement.php',
              data: formData,
              config: { headers: {'Content-Type': 'multipart/form-data' }}
          })
          .then(function (response) {

           
              //handle success
              if(response.data.includes("ok"))
              {	
                 
				/*console.log(obj.state.email)
				LoginAuth.isAuthenticated = true
				window.sessionStorage.setItem(window.btoa("signed_in"), window.btoa(obj.state.email));
				window.sessionStorage.setItem(window.btoa("user_id"), window.btoa(response.data.replace('ok','')));
                window.sessionStorage.setItem(window.btoa("user_type"), window.btoa("2"));
				document.title="Welcome User"
				$("body").removeClass("login-page").addClass("sidebar-mini")
				window.history.pushState(null, null, '/student/')
				ReactDOM.render(<StudentHome />, document.getElementById('root'));*/
                console.log("yes");
                <Redirect to="/student" />
              }
              else
              {
                  document.title="User Already Registered!"
                  $("#invalid_message").show();
              }
          })
          .catch(function (response) {
              //handle error
  //			alert(JSON.stringify(response));
              console.log(response)
          });
      } 
    
    render() {
      ++this.childKey;
        
      $("#contact").keypress(function (e) {
          if (String.fromCharCode(e.keyCode).match(/[^0-9]/g)) return false;
      });
      
      return (
          <React.Fragment>
              <section className="page-title" key={this.childKey} style={{padding: '150px 0px 0px'}}>
              </section>


              <div className="alert alert-danger" id="invalid_message" style={{display: 'none'}}><strong>Error! </strong>User Already Registered</div> 

              <section className="register-section" style={{paddingTop: '100px'}}>

                <div className="auto-container">
                  <div className="register-box">
                    {/* Title Box */}
                    <div className="title-box">
                      <h2>Student Register</h2>
                      <div className="text"><span className="theme_color">Welcome!</span> Please confirm that you are visiting</div>
                    </div>
                    {/* Login Form */}
                    <div className="styled-form">
                      <form method="post"> 
                        <div className="row clearfix">
                          {/* Form Group */}
                          <div className="form-group col-lg-6 col-md-12 col-sm-12">
                            <label>First Name</label>
                            <input type="text" name="username" placeholder="First Name" onChange={e => this.setState({ fname: e.target.value })} required />
                          </div>
                          {/* Form Group */}
                          <div className="form-group col-lg-6 col-md-12 col-sm-12">
                            <label>Last Name</label>
                            <input type="text" name="username"  placeholder="Last Name" onChange={e => this.setState({ lname: e.target.value })} required />
                          </div>
                          {/* Form Group */}
                          <div className="form-group col-lg-6 col-md-12 col-sm-12">
                            <label>Email Address</label>
                            <input type="email" name="email"  placeholder="abcd@gmail.com" onChange={e => this.setState({ email: e.target.value })} required />
                          </div>
                          {/* Form Group */}
                          <div className="form-group col-lg-6 col-md-12 col-sm-12">
                            <label>Phone Number</label>
                            <input type="text" name="phone"  placeholder="+1 (800) 123-4567" onChange={e => this.setState({ phn: e.target.value })} required />
                          </div>
                          {/* Form Group */}
                          <div className="form-group col-lg-6 col-md-12 col-sm-12">
                            <label>Password</label>
                            <span className="eye-icon flaticon-eye" />
                            <input type="password" name="password"  placeholder="Password" onChange={e => this.setState({ pswd: e.target.value })} required />
                          </div>
                          {/* Form Group */}
                         
                          <div className="form-group col-lg-12 col-md-12 col-sm-12">
                            <div className="row clearfix">
                              {/* Column */}
                              <div className="column col-lg-3 col-md-4 col-sm-12">
                                <div className="radio-box">
                                  <input type="radio" name="remember-password"value="Male" id="type-1" onChange={e => this.setState({ gender: e.target.value })}/> 
                                  <label htmlFor="type-1">Male</label>
                                </div>
                              </div>
                              {/* Column */}
                              <div className="column col-lg-3 col-md-4 col-sm-12">
                                <div className="radio-box">
                                  <input type="radio" name="remember-password" value="Female" id="type-2" onChange={e => this.setState({ gender: e.target.value })} /> 
                                  <label htmlFor="type-2">Female</label>
                                </div>
                              </div>
                              {/* Column */}
                              <div className="column col-lg-3 col-md-4 col-sm-12">
                                <div className="radio-box">
                                  <input type="radio" name="remember-password" value="Other" id="type-3" onChange={e => this.setState({ gender: e.target.value })} /> 
                                  <label htmlFor="type-3">Others</label>
                                </div>
                              </div>
                              {/* Column */}
                              <div className="column col-lg-12 col-md-12 col-sm-12">
                                <div className="check-box">
                                  <input type="checkbox" name="remember-password" id="type-4" /> 
                                  <label htmlFor="type-4">I agree the user agreement and <a href="privacy.html">Terms &amp; Conditions</a></label>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="form-group col-lg-12 col-md-12 col-sm-12 text-center">
                            <button type="button" className="theme-btn btn-style-three"  onClick={this.handleFormSubmit}><span className="txt">Sign Up <i className="fa fa-angle-right" /></span></button>
                          </div>


                          <div className="form-group col-lg-12 col-md-12 col-sm-12">
                            <div className="users">Already have an account? <Link to={"/student/dashboard"}>Sign In</Link></div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </section>
          </React.Fragment>
      );
    }
  }

  export default Studentregister;