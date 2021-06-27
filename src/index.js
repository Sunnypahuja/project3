import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import axios from 'axios';
import Home, {LoginUserAuth} from './Home';
import AdminLogin, {LoginAuth} from './admin/AdminLogin';
import AdminHome from './admin/AdminHome';
import {Login} from './LoginRegister';
import StudentHome from './student/StudentHome';
import TeacherHome from './teachers/TeacherHome';
import TeacherLogin from './teachers/TeacherLogin';
//const link_call="../api/";
const link_call="http://drive.local/react-lms/api/";

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

if(window.location.pathname.includes("/admin/"))
{
    $("link[for='Home']").remove();
    $("script[for='Home']").remove();
    
    if(window.sessionStorage.getItem(window.btoa("session_admin")) === null || window.sessionStorage.getItem(window.btoa("id")) === null)
    {
        document.title="Admin Login";
        $(".scroll-to-top").remove()
        $("body").addClass("hold-transition login-page")
        ReactDOM.render(<AdminLogin />, document.getElementById('root'));
    }
    else
    {
        let formData = new FormData();
        formData.append('email', window.atob(window.sessionStorage.getItem(window.btoa("session_admin"))))
        formData.append('id', window.atob(window.sessionStorage.getItem(window.btoa("id"))))
        axios({
                method: 'post',
                url: link_call+'AdminAuth.php',
                data: formData,
                config: { headers: {'Content-Type': 'multipart/form-data' }}
            })
            .then(function (response) {
                //handle success
                if(response.data === "ok")
                {	
                    LoginAuth.isAuthenticated = true
                    document.title="React LMS | Admin Panel"
                    $("body").removeClass("login-page").addClass("sidebar-mini")
                    ReactDOM.render(<AdminHome />, document.getElementById('root'));
                }
                else
                {
                    document.title="Admin Login";
                    $("body").addClass("hold-transition login-page")
                    ReactDOM.render(<AdminLogin />, document.getElementById('root'));
                }
            })
            .catch(function (response) {
                //handle error
    //			alert(JSON.stringify(response));
                console.log(response)
            });
    }
    ReactDOM.render(<AdminLogin />, document.getElementById('root'));
}
else if(window.location.pathname.includes("/student/"))
{
    if(window.sessionStorage.getItem(window.btoa("signed_in")) === null || window.sessionStorage.getItem(window.btoa("user_type")) === null || window.sessionStorage.getItem(window.btoa("user_id")) === null)
    {
        document.title="Student Login";
        $(".scroll-to-top").remove()
        $("body").addClass("hold-transition login-page")
        // ReactDOM.render(<Login />, document.getElementById('root'));
        window.location.href ='/login'
    }
    else
    {
        let formData = new FormData();
        formData.append('email', window.atob(window.sessionStorage.getItem(window.btoa("signed_in"))))
        formData.append('id', window.atob(window.sessionStorage.getItem(window.btoa("user_id"))))
        axios({
                method: 'post',
                url: link_call+'StudentAuth.php',
                data: formData,
                config: { headers: {'Content-Type': 'multipart/form-data' }}
            })
            .then(function (response) {
                //handle success
                if(response.data === "ok")
                {	
                    LoginAuth.isAuthenticated = true
                    document.title="React LMS | Student Panel"
                    $("body").removeClass("login-page").addClass("sidebar-mini")
                    ReactDOM.render(<StudentHome />, document.getElementById('root'));
                }
                else
                {
                    document.title="Student Login";
                    $(".scroll-to-top").remove()
                    $("body").addClass("hold-transition login-page")
                    // ReactDOM.render(<Login />, document.getElementById('root'));
                    window.location.href ='/login'
                }
            })
            .catch(function (response) {
                //handle error
    //			alert(JSON.stringify(response));
                console.log(response)
            });
    }
}else if(window.location.pathname.includes("/teacher/"))
{
    if(window.sessionStorage.getItem(window.btoa("teacher_in")) === null ||  window.sessionStorage.getItem(window.btoa("teacher_id")) === null)
    {
        document.title="Teacher Login";
        $(".scroll-to-top").remove()
        $("body").addClass("hold-transition login-page")
        ReactDOM.render(<TeacherLogin />, document.getElementById('root'));
    }
    else
    {
        let formData = new FormData();
        formData.append('email', window.atob(window.sessionStorage.getItem(window.btoa("teacher_in"))))
        formData.append('id', window.atob(window.sessionStorage.getItem(window.btoa("teacher_id"))))
        axios({
                method: 'post',
                url: link_call+'TeacherAuth.php',
                data: formData,
                config: { headers: {'Content-Type': 'multipart/form-data' }}
            })
            .then(function (response) {
                //handle success
                if(response.data === "ok")
                {	
                    LoginAuth.isAuthenticated = true
                    document.title="React LMS | Teacher Panel"
                    $("body").removeClass("login-page").addClass("sidebar-mini")
                    ReactDOM.render(<TeacherHome />, document.getElementById('root'));
                }
                else
                {
                    document.title="Teacher Login";
                    $(".scroll-to-top").remove()
                    $("body").addClass("hold-transition login-page")
                    ReactDOM.render(<TeacherLogin />, document.getElementById('root'));
                }
            })
            .catch(function (response) {
                //handle error
    //			alert(JSON.stringify(response));
                console.log(response)
            });
    }
}
else
{
    if(navigator.cookieEnabled && (getCookie(window.btoa("session_user"))!== "" && getCookie(window.btoa("user_id"))!=="") && (window.sessionStorage.getItem(window.btoa("session_user")) === null || window.sessionStorage.getItem(window.btoa("user_id")) === null))
    {
        let formData = new FormData();
        formData.append('user_email', window.atob(getCookie(window.btoa("session_user"))))
        formData.append('user_id', window.atob(getCookie(window.btoa("user_id"))))
        axios({
            method: 'post',
            url: link_call+'AdminLogin.php',
            data: formData,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
        .then(function (response) {
            //handle success
            if(response.data === "ok")
            {	
                // $("link[for=Admin]").remove();
                // $("script[for=Admin]").remove();
                $("style").remove()
                $("#root").addClass("wrapper");
                
                window.sessionStorage.setItem(window.btoa("session_user"), getCookie(window.btoa("session_user")));
				window.sessionStorage.setItem(window.btoa("user_id"), getCookie(window.btoa("user_id")));
                
                axios({
                    method: 'post',
                    url: link_call+'CustomersManagement.php',
                    data: {
                        get_default_pincode: window.atob(getCookie(window.btoa("user_id"))),
                    },
                    config: { headers: {'Content-Type': 'multipart/form-data' }}
                })
                .then(function (response) {
                    if(response.data === "no")
                    {
                        localStorage.setItem("default_pincode", "")
                        let d = new Date();
                        d.setTime(d.getTime() + (365*24*60*60*1000));
                        document.cookie = "default_pincode=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT";
                    }
                    else
                    {
                        localStorage.setItem("default_pincode", response.data);
                        let d = new Date();
                        d.setTime(d.getTime() + (365*24*60*60*1000));
                        let expires = "expires="+ d.toUTCString();
                        document.cookie = "default_pincode=" + response.data + ";" + expires + ";path=/";
                    }
                })
                LoginUserAuth.isAuthenticated = true
                
                document.title="React LMS | Home"
                ReactDOM.render(<Home />, document.getElementById('root'));
            }
            else
            {
                $("link[for=Admin]").remove();
                $("script[for=Admin]").remove();
                $("style").remove()
                $("#root").addClass("wrapper");
                LoginUserAuth.isAuthenticated = false
                window.sessionStorage.removeItem(window.btoa("session_user"));
                window.sessionStorage.removeItem(window.btoa("user_id"));				
                document.title="React LMS | Home"
                ReactDOM.render(<Home />, document.getElementById('root'));

            }
        })
        .catch(function (response) {
            //handle error
//			alert(JSON.stringify(response));
            console.log(response)
        });
    }
    else if(window.sessionStorage.getItem(window.btoa("session_user")) !== null || window.sessionStorage.getItem(window.btoa("user_id")) !== null)
    {
        let formData = new FormData();
        formData.append('user_email', window.atob(window.sessionStorage.getItem(window.btoa("session_user"))))
        formData.append('user_id', window.atob(window.sessionStorage.getItem(window.btoa("user_id"))))
        axios({
            method: 'post',
            url: link_call+'AdminLogin.php',
            data: formData,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
        .then(function (response) {
            //handle success
            if(response.data === "ok")
            {	
                $("link[for=Admin]").remove();
                $("script[for=Admin]").remove();
                $("style").remove()
                $("#root").addClass("wrapper");
                
                let defaultForm = new FormData();
                defaultForm.append("get_default_pincode", window.atob(window.sessionStorage.getItem(window.btoa("user_id"))));
                axios({
                    method: 'post',
                    url: link_call+'CustomersManagement.php',
                    data: defaultForm,
                    config: { headers: {'Content-Type': 'multipart/form-data' }}
                })
                .then(function (response) {
                    if(response.data === "no")
                    {
                        localStorage.setItem("default_pincode", "")
                        let d = new Date();
                        d.setTime(d.getTime() + (365*24*60*60*1000));
                        document.cookie = "default_pincode=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT";
                    }
                    else
                    {
                        localStorage.setItem("default_pincode", response.data);
                        let d = new Date();
                        d.setTime(d.getTime() + (365*24*60*60*1000));
                        let expires = "expires="+ d.toUTCString();
                        document.cookie = "default_pincode=" + response.data + ";" + expires + ";path=/";
                    }
                })
                
                LoginUserAuth.isAuthenticated = true
                document.title="React LMS | Home"
                ReactDOM.render(<Home />, document.getElementById('root'));
            }
            else
            {
                $("link[for=Admin]").remove();
                $("script[for=Admin]").remove();
                $("style").remove()
                $("#root").addClass("wrapper");
                LoginUserAuth.isAuthenticated = false
                window.sessionStorage.removeItem(window.btoa("session_user"));
                window.sessionStorage.removeItem(window.btoa("user_id"));				
                document.title="React LMSs | Home"
                ReactDOM.render(<Home />, document.getElementById('root'));

            }
        })
        .catch(function (response) {
            //handle error
//			alert(JSON.stringify(response));
            console.log(response)
        });
    }
    else
    {
        $("link[for=Admin]").remove();
        $("script[for=Admin]").remove();
        $("style").remove()
        $("#root").addClass("page-wrapper");
        
        ReactDOM.render(<Home />, document.getElementById('root'));
    }
}