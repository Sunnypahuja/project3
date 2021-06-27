import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { Link, Redirect } from "react-router-dom";
import axios from 'axios';
import $ from 'jquery';
import { api_link, LoginUserAuth, LoginAuth } from './Home';
import HomeAfterLogin from './HomeAfterLogin';
import StudentHome from './student/StudentHome'

function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

class Login extends Component {
  
  handleFormSubmit( event ) {
		event.preventDefault();
		$("#invalid_message").hide();

		let formData = new FormData();
		var email=this.state.email;
		formData.append('email', this.state.email)
		formData.append('password', this.state.password)

		axios({
			method: 'post',
			url: api_link+'StudentLogin.php',
			data: formData,
			config: { headers: {'Content-Type': 'multipart/form-data' }}
		})
		.then(function (response) {
			//handle success
			if(response.data.includes("ok"))
			{	
				console.log(response.data)
				LoginAuth.isAuthenticated = true
				window.sessionStorage.setItem(window.btoa("signed_in"), window.btoa(email));
				window.sessionStorage.setItem(window.btoa("user_id"), window.btoa(response.data.replace('ok','')));
                window.sessionStorage.setItem(window.btoa("user_type"), window.btoa("2"));
				document.title="Welcome User"
				$("body").removeClass("login-page").addClass("sidebar-mini")
				window.history.pushState(null, null, '/student/')
				// ReactDOM.render(<StudentHome />, document.getElementById('root'));
        window.location.href='./student/dashboard'
			}
			else
			{
				document.title="Invalid Username & Password!"
				$("#invalid_message").show();
			}
		})
		.catch(function (response) {
			//handle error 
			console.log(response)
		});
	}
  render() {
    ++this.childKey;
	
    return (
		<React.Fragment>
			<section className="page-title" key={this.childKey} style={{padding: '150px 0px 0px'}}>
			</section>
			
			<section className="login-section" style={{paddingTop: '100px'}}>
			  <div className="auto-container">
				<div className="login-box">
				  {/* Title Box */}
				  <div className="title-box">
					<h2>Login</h2>
					<div className="text"><span className="theme_color">Welcome!</span> Please confirm that you are visiting</div>
				  </div>
				  {/* Login Form */}
				  <div className="styled-form">
					<form method="post"  onSubmit={this.handleFormSubmit.bind(this)}>
					  <div className="form-group">
						<label>User Name</label>
						<input type="text" name="username"  placeholder="User Name" required onChange={e => this.setState({ email: e.target.value })}/>
					  </div>
					  <div className="form-group">
						<label>Password</label>
						<span className="eye-icon flaticon-eye" />
						<input type="password" name="password"  placeholder="Password" required onChange={e => this.setState({ password: e.target.value })}/>
					  </div>
					  <div className="form-group">
						<div className="clearfix">
						  <div className="pull-left">
							{/* <div className="check-box">
							  <input type="checkbox" name="remember-password" id="type-1" /> 
							  <label htmlFor="type-1">Remember Password</label>
							</div> */}
						  </div>
						  <div className="pull-right">
                            <Link to={"/forgot-password"} className="forgot">Forget Password?</Link>
						  </div>
						</div>
					  </div>
					  <div className="form-group text-center">
						<button type="submit" className="theme-btn btn-style-three"><span className="txt">Login <i className="fa fa-angle-right" /></span></button>
					  </div>
					  <div className="form-group">
                        <div className="users">New User? <Link to={"/register"}>Sign Up</Link></div>
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

class Register extends Component {

  
  /*constructor(){
      super();
      this.handleFormSubmit=this.handleFormSubmit.bind(this);
    }
  
    handleFormSubmit(event){
        event.preventDefault();
		$("#invalid_message").hide();

		let formData = new FormData();
		formData.append('register_user', "register")
		formData.append('fname', $("#fname").val())
		formData.append('lname', $("#lname").val())
		formData.append('email', $("#email").val())
		formData.append('contact', $("#contact").val())
		formData.append('pass', $("#pass").val())

        //var obj=this
       
		axios({
			method: 'post',
			url: api_link+'CustomersManagement.php',
			data: formData,
			config: { headers: {'Content-Type': 'multipart/form-data' }}
		})
		.then(function (response) {
			//handle success
			if(response.data.includes("ok"))
			{	
				LoginUserAuth.isAuthenticated = true
				window.sessionStorage.setItem(window.btoa("session_user"), window.btoa($("#email").val()));
				window.sessionStorage.setItem(window.btoa("user_id"), window.btoa(response.data.replace('ok','')));
                
                if(navigator.cookieEnabled)
                {
                    //SET COOKIE 
                    setCookie(window.btoa("session_user"), window.btoa($("#email").val()), 30)
                    setCookie(window.btoa("user_id"), window.btoa(response.data.replace('ok','')), 30)
                }
                
				document.title="Welcome User"
				$("body").removeClass("login-page").addClass("sidebar-mini")
				window.history.pushState(null, null, '/home')
				ReactDOM.render(<HomeAfterLogin />, document.getElementById('root'));
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
    }*/
  
  render() {
    ++this.childKey;
      
    $("#contact").keypress(function (e) {
        if (String.fromCharCode(e.keyCode).match(/[^0-9]/g)) return false;
    });
	
    return (
		<React.Fragment>
            <section className="page-title" key={this.childKey} style={{padding: '150px 0px 0px'}}>
			</section>
			
            <section className="register-section" style={{paddingTop: '100px'}}>
              <div className="auto-container">
                <div className="register-box">
                  {/* Title Box */}
                  <div className="title-box">
                    <h2>Register</h2>
                    <div className="text"><span className="theme_color">Welcome!</span> Please confirm that you are visiting</div>
                  </div>
                  {/* Login Form */}
                  <div className="styled-form">
                    <form method="post" >
                      <div className="row clearfix">
                        {/* Form Group */}
                        <div className="form-group col-lg-6 col-md-12 col-sm-12">
                          <label>First Name</label>
                          <input type="text" name="username" placeholder="First Name" required />
                        </div>
                        {/* Form Group */}
                        <div className="form-group col-lg-6 col-md-12 col-sm-12">
                          <label>Last Name</label>
                          <input type="text" name="username" defaultValue placeholder="Last Name" required />
                        </div>
                        {/* Form Group */}
                        <div className="form-group col-lg-6 col-md-12 col-sm-12">
                          <label>Email Address</label>
                          <input type="email" name="email" defaultValue placeholder="abcd@gmail.com" required />
                        </div>
                        {/* Form Group */}
                        <div className="form-group col-lg-6 col-md-12 col-sm-12">
                          <label>Phone Number</label>
                          <input type="text" name="phone" defaultValue placeholder="+1 (800) 123-4567" required />
                        </div>
                        {/* Form Group */}
                        <div className="form-group col-lg-6 col-md-12 col-sm-12">
                          <label>Password</label>
                          <span className="eye-icon flaticon-eye" />
                          <input type="password" name="password" defaultValue placeholder="Password" required />
                        </div>
                        {/* Form Group */}
                        <div className="form-group col-lg-6 col-md-12 col-sm-12">
                          <label>Confirm Password</label>
                          <span className="eye-icon flaticon-eye" />
                          <input type="password" name="password" defaultValue placeholder="Password" required />
                        </div>
                        <div className="form-group col-lg-12 col-md-12 col-sm-12">
                          <div className="row clearfix">
                            {/* Column */}
                            <div className="column col-lg-3 col-md-4 col-sm-12">
                              <div className="radio-box">
                                <input type="radio" name="remember-password" id="type-1" /> 
                                <label htmlFor="type-1">Male</label>
                              </div>
                            </div>
                            {/* Column */}
                            <div className="column col-lg-3 col-md-4 col-sm-12">
                              <div className="radio-box">
                                <input type="radio" name="remember-password" id="type-2" /> 
                                <label htmlFor="type-2">Female</label>
                              </div>
                            </div>
                            {/* Column */}
                            <div className="column col-lg-3 col-md-4 col-sm-12">
                              <div className="radio-box">
                                <input type="radio" name="remember-password" id="type-3" /> 
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
                          <button type="button" className="theme-btn btn-style-three"><span className="txt">Sign Up <i className="fa fa-angle-right" /></span></button>
                        </div>
                        <div className="form-group col-lg-12 col-md-12 col-sm-12">
                          <div className="users">Already have an account? <Link to={"/login"}>Sign In</Link></div>
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

class ForgotPassword extends Component {
      
      state={
          userEmail: '',
          loader: false,
          enterEmail: true,
          otp: '',
          newPass: '',
          confirmPass: '',
          LoginPage: false
      }

      forgotPass=()=>{
          this.setState({loader: true});
          let formData = new FormData();
          formData.append('email', this.state.userEmail)
          formData.append('forgotPass', true)

          axios({
              method: 'post',
              url: api_link+'ForgotPass.php',
              data: formData,
              config: { headers: {'Content-Type': 'multipart/form-data' }}
          })
          .then(response => response.data)
          .then((data) => { 
              this.setState({loader: false});
              if(data.msg=="success")
              {
                this.setState({enterEmail: false})
                $("#email").val(" ")
                $("#otp").val(" ")
                $("#update_msg").html("<strong>Success! </strong>Otp has been sent to your email Address")
                $("#update_msg").removeClass("alert-danger").addClass("alert-success")
              }
              else if(data.msg=="no_user")
              {
                    $("#update_msg").html("<strong>Error! </strong>Please Enter Registered Email Address")
                    $("#update_msg").removeClass("alert-success").addClass("alert-danger")
              }
              else
              {
                $("#update_msg").html("<strong>Error! </strong>Something Went Wrong!! Please Try Again Later")
                $("#update_msg").removeClass("alert-success").addClass("alert-danger")
              }
          })
          .catch(function (response) {
            $("#update_msg").html("<strong>Error! </strong> Unable to Process Your Request")
            $("#update_msg").removeClass("alert-success").addClass("alert-danger")
            $("#update_msg").show()
            window.scrollTo({top: 0, behavior: 'smooth'});
            setTimeout(function(){ $("#update_msg").hide(); }, 4000);
        });
      }


      checkPass=()=>{
        console.log(this.state.newPass)
        console.log(this.state.confirmPass)
        console.log(this.state.otp)
        if(this.state.newPass==this.state.confirmPass)
        {
            this.setState({loader: true});
              let formData = new FormData();
              formData.append('otp', this.state.otp)
              formData.append('newPass', this.state.newPass)
              formData.append('confirmPass', this.state.confirmPass)
              formData.append('checkOtp', true)

              axios({
                  method: 'post',
                  url: api_link+'ForgotPass.php',
                  data: formData,
                  config: { headers: {'Content-Type': 'multipart/form-data' }}
              })
              .then(response => response.data)
              .then((data) => { 
                  this.setState({loader: false});
                  if(data.msg=="success")
                  {
                    $("#update_msg").html("<strong>Success! </strong> Password Reset Successfully")
                    $("#update_msg").removeClass("alert-danger").addClass("alert-success")
                    this.setState({LoginPage: true})
                  }
                  else if(data.msg=="Invalid Otp")
                  {
                        $("#update_msg").html("<strong>Error! </strong>Invalid OTP please try again")
                        $("#update_msg").removeClass("alert-success").addClass("alert-danger")
                  }
                  else
                  {
                    $("#update_msg").html("<strong>Error! </strong>Something Went Wrong!! Please Try Again Later")
                    $("#update_msg").removeClass("alert-success").addClass("alert-danger")
                  }
              })
              .catch(function (response) {
                $("#update_msg").html("<strong>Error! </strong> Unable to Process Your Request")
                $("#update_msg").removeClass("alert-success").addClass("alert-danger")
                $("#update_msg").show()
                window.scrollTo({top: 0, behavior: 'smooth'});
                setTimeout(function(){ $("#update_msg").hide(); }, 4000);
            });
        }
        else
        {
          $("#update_msg").html("<strong>Error! </strong>Password Mismatched!! Try Again")
          $("#update_msg").removeClass("alert-success").addClass("alert-danger")
          $("#update_msg").show()
          window.scrollTo({top: 0, behavior: 'smooth'});
          setTimeout(function(){ $("#update_msg").hide(); }, 4000);
        }
      }
  
  render() {
    return (
      <React.Fragment>
            {this.state.LoginPage?(<Redirect to='/login' />):(null)}
            <section className="page-title">
              
            </section>
            <section>
              <div id="update_msg" className="alert" style={{display: 'none'}}></div> 
            </section>
            <section className="register-section">
              <div className="auto-container">
                <div className="register-box">
                  {/* Title Box */}
                  <div className="title-box">
                    <h2>Account Recovery</h2>
                  </div>
                  {/* Login Form */}
                  <div className="styled-form">
                    <form id="confirm_form">
                      <input name="form_key" type="hidden"/>
                      {this.state.enterEmail?(
                      <div className="row clearfix">
                          <div className="form-group col-12">
                            <label>Registered Contact or Email <em className="required">*</em></label>
                            <div className="input-box">
                                <input type="text" id="email" onChange={(e)=>this.setState({userEmail:  e.target.value})} required className="input-text"/>
                            </div>
                          </div>
                          <div className="form-group col-lg-12 col-md-12 col-sm-12 text-center">
                            <button type="button" className="theme-btn btn-style-three" name="send" id="otp_submit_btn1" onClick={()=>this.forgotPass()}><span className="txt">Submit <i className="fa fa-angle-right" /></span> 
                              {this.state.loader?(<div id="spinspin" className="spinner-border" role="status"><span class="sr-only"></span></div>):(null)}
                            </button>
                          </div>
                          <div className="form-group col-lg-12 col-md-12 col-sm-12">
                            <div className="users">Already have an account? <Link to={"/login"}>Back To Login</Link></div>
                          </div>
                      </div>
                      ):(
                      <div className="row clearfix">
                          <div className="form-group col-12">
                            <label>OTP<em className="required">*</em></label>
                            <div className="input-box">
                                <input type="text" id="otp" onChange={(e)=>this.setState({otp: e.target.value})} required className="input-text"/>
                            </div>
                          </div>
                          <div className="form-group col-12">
                            <label>New Password<em className="required">*</em></label>
                            <div className="input-box">
                                <input type="password" id="newpassword" onChange={(e)=>this.setState({newPass:  e.target.value})} required className="input-text"/>
                            </div>
                          </div>
                          <div className="form-group col-12">
                            <label>Confirm Password<em className="required">*</em></label>
                            <div className="input-box">
                                <input type="password" id="password" onChange={(e)=>this.setState({confirmPass:  e.target.value})} required className="input-text"/>
                            </div>
                          </div>
                          <div className="form-group col-lg-12 col-md-12 col-sm-12 text-center">
                            <button type="button" className="theme-btn btn-style-three" name="send" id="otp_submit_btn2" onClick={()=>this.checkPass()}>
                            <span className="txt">Submit {this.state.loader?(
                                <div id="spinspin" className="spinner-border" role="status"><span class="sr-only"></span></div>
                                  ):(<i className="fa fa-angle-right" />)}
                            </span> 
                              
                            </button>
                          </div>
                          <div className="form-group col-lg-12 col-md-12 col-sm-12">
                            <div className="users">Already have an account? <Link to={"/login"}>Back To Login</Link></div>
                          </div>
                      </div>
                      )}
                    </form>
                    
                    {/*CHECK OTP*/}
                    <form id="check_otp_form" onSubmit={(e) => this.handleOTPFormSubmit(e)} style={{display: 'none'}}>
                      <input name="form_key" type="hidden"/>
                      <div className="row">
                          <div className="col-2 registered-users">
                            <ul className="form-list">
                              <li>
                                <label>Please check your mail and enter OTP <em className="required">*</em></label>
                                <div className="input-box">
                                  <input type="text" id="otp" required className="input-text"/>
                                </div>
                              </li>
                            </ul>
                            <p className="required">* Required Fields</p>
                            <div className="buttons-set">
                              <button type="submit" className="button login" title="Login" name="send" id="send"><span>Submit</span></button>
                                <Link to="/login" className="forgot-word"><br/>Back To Login</Link>
                            </div>
                          </div>
                        </div>
                    </form>
                    
                    {/*CREATE NEW PASS*/}
                    <form id="password_form" onSubmit={(e) => this.handlePassFormSubmit(e)} style={{display: 'none'}}>
                      <input name="form_key" type="hidden"/>
                      <div className="row">
                          <div className="col-2 registered-users">
                            <ul className="form-list">
                              <li>
                                <label>New Password <em className="required">*</em></label>
                                <div className="input-box">
                                  <input type="password" id="new_pass" required className="input-text"/>
                                </div>
                              </li>
                              <li>
                                <label>Confirm Password <em className="required">*</em></label>
                                <div className="input-box">
                                  <input type="password" id="confirm_pass" required className="input-text"/>
                                </div>
                              </li>
                            </ul>
                            <p className="required">* Required Fields</p>
                            <div className="buttons-set">
                              <button type="submit" className="button login" title="Login" name="send" id="send2"><span>Submit</span></button>
                                <Link to="/login" id="backtologin" className="forgot-word"><br/>Back To Login</Link>
                            </div>
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

export{ 
    Login,
    Register,
	ForgotPassword,
};