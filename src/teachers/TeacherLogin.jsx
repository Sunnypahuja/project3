import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import $ from 'jquery';
import TeacherHome from './TeacherHome'
export const api_link="http://drive.local/react-lms/api/";
export const serverBase_link="http://drive.local/react-lms/";
class LoginForm extends React.Component {
	state = {
		email: '',
		password: '',
	}

	handleFormSubmit( event ) {
		event.preventDefault();
		$("#invalid_message").hide();

		let formData = new FormData();
		var email=this.state.email;
		formData.append('email', this.state.email)
		formData.append('password', this.state.password)

		axios({
			method: 'post',
			url: api_link+'TeacherLogin.php',
			data: formData,
			config: { headers: {'Content-Type': 'multipart/form-data' }}
		})
		.then(function (response) {
			//handle success
			if(response.data.includes("ok"))
			{	
				console.log(response.data)
				LoginAuth.isAuthenticated = true
				window.sessionStorage.setItem(window.btoa("teacher_in"), window.btoa(email));
				window.sessionStorage.setItem(window.btoa("teacher_id"), window.btoa(response.data.replace('ok',''))); 
				document.title="Welcome Teacher"
				$("body").removeClass("login-page").addClass("sidebar-mini")
				window.history.pushState(null, null, '/Teacher/')
				ReactDOM.render(<TeacherHome />, document.getElementById('root'));
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

	render(){
		return (
		<div className="login-box">
			<div className="login-logo">
			  <b>Teacher Login </b>
			</div>

			<div className="alert alert-danger" id="invalid_message" style={{display: 'none'}}><strong>Error! </strong>invalid user & Password</div> 

			<div className="login-box-body">
			  <p className="login-box-msg">Sign in to start your session</p> 
			  <form onSubmit={this.handleFormSubmit.bind(this)}>
				<div className="form-group has-feedback">
				  <input type="email" name="email" className="form-control" placeholder="Email" required onChange={e => this.setState({ email: e.target.value })} />
				  <span className="glyphicon glyphicon-envelope form-control-feedback"></span>
				</div>
				<div className="form-group has-feedback">
				  <input type="password" name="password" className="form-control" placeholder="Password" required onChange={e => this.setState({ password: e.target.value })} />
				  <span className="glyphicon glyphicon-lock form-control-feedback"></span>
				</div>
				<div className="row">
				  <div className="col-xs-8">

				  </div>
				  
				  <div className="col-xs-4">
					<button type="submit" name ="login" className="btn btn-primary btn-block btn-flat">Sign In</button>
				  </div>
				  
				</div>
			  </form> 
			</div> 
		  </div>);
	}


}


class TeacherLogin extends React.Component {
    
    constructor(props) {
        super(props);
        $("link[for='Home']").remove();
        $("script[for='Home']").remove();
		
		$(".scroll-to-top").remove()
    }
    
  render() {
	$("body").attr("style","background-color:#e9ecef")
	return (
		<React.Fragment>
			<LoginForm />
		</React.Fragment>
	);
  }
}

export const LoginAuth = {
    isAuthenticated: false,
  };

export default TeacherLogin;