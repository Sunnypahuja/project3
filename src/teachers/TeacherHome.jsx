import React from 'react';
import ReactDOM from 'react-dom';

import { Link, Route, Switch, BrowserRouter } from "react-router-dom";

import TeacherLogin, { LoginAuth, api_link } from './TeacherLogin';
// import { Categories, StudyMaterial } from './Categories';
//import { ActiveCustomers, BlockCustomers } from './Customers';
//import { CustomerOrderDetails, SingleOrderDetails } from './OrderDetails';
// import { DynamicPages, SliderSetup, SocialSetup, FAQs } from './EditSite';
// import { Email, PushNotifications, EmailSubscribers } from './Marketing';
//import { PendingOrders, DeliveredOrders, CancelOrders, FailedOrders } from './Orders';
// import { PendingQueries, RespondedQueries } from './Queries';
// import { Programs, AddProgram, EditProgram, Courses, AddCourses, EditCourses } from './ProgramsAndCourses';
// import { Quiz, AddQuiz, EditQuiz } from './Quiz';
// import { FeaturedCourses, Reviews, FooterLinks, WhyUs } from './Setup';
// import StudyMaterial from './StudyMaterial';
// import Mains from './Mains';
// import Prelims from './Prelims';
// import EvaluatedQuiz from './EvaluatedQuiz';
// import UploadedQuiz from './UploadedQuiz';
// import Previousmains from './Previousmains';
import LiveClass from './LiveClass';
import PastLiveClass from './PastLiveClass';
import EvaluateQuiz from './EvaluateQuiz';
import ChangePassword from './ChangePassword';
import {Articles , Editarticle ,Approve,Pending,Rejected} from './Article';
// import Programmes from './Programmes';
// import Dashboard from './Dashboard';
import axios from 'axios';
import $ from 'jquery';
// import Courses from './Courses';
// import Payment from './Payment';
// import PrelimsQuiz from './PrelimsQuiz';
//import CKEditor from "react-ckeditor-component";

class Header extends React.Component{
    
    logout(e){
        e.preventDefault();
        LoginAuth.isAuthenticated = false
        window.sessionStorage.removeItem(window.btoa("signed_in"));
        window.sessionStorage.removeItem(window.btoa("user_type"));
        window.sessionStorage.removeItem(window.btoa("user_id"));				
        document.title="Teacher | Login"
        window.history.pushState(null, null, '/teacher/')
        ReactDOM.render(<TeacherLogin />, document.getElementById('root'));
    }
    
    componentWillUnmount(){
        $("body").attr("style","background-color:#e9ecef")
    }
    
	render()
    {
        $("head").append(`<div id="loader-wrapper" style="display:none">
            <div id="loader"> <img src="dist/img/loading.gif" style="width:100px"></div>
        </div>`);
        $("body").attr("class","hold-transition skin-yellow-light fixed sidebar-mini").attr("style","color:#000");
        return(
            <header className="main-header">
                {/* Logo */}
                <Link to="/teacher/dashboard" className="logo">
                  {/* mini logo for sidebar mini 50x50 pixels */}
                  <img src="/images/logo.png" alt="Logo" style={{width: '40%', objectFit: 'contain'}} />
                </Link>
                {/* Header Navbar: style can be found in header.less */}
                <nav className="navbar navbar-static-top">
                  {/* Sidebar toggle button*/}
                  <div className="sidebar-toggle" data-toggle="push-menu" role="button">
                    <span className="sr-only">Toggle navigation</span>
                  </div>
                  {/* Navbar Right Menu */}
                  <div className="navbar-custom-menu">
                    <ul className="nav navbar-nav">
                      {/* User Account: style can be found in dropdown.less */}
                      <li className="dropdown user user-menu">
                          <Link to="/teacher/" onClick={this.logout.bind(this)} name="logout" className="btn btn-success btn-flat">Sign out</Link>
                      </li>
                    </ul>
                  </div>
                </nav>
              </header>
	   );
    }
}

class Navbar extends React.Component{
  
    state = {
        navbar: [],
        data:null
    }
  
     
      navbar = [
        {
          class:'',
          drop_i:'no',
          head:"Change Password",
          icon:"fas fa-tachometer-alt",
          link:"changepassword"
        },
        {
            class:'',
            drop_i:'no',
            head:"Live Class",
            icon:"fa fa-calendar-check-o",
            link:"liveclass"
        },
        {
            class:'',
            drop_i:'no',
            head:"Past Live Class",
            icon:"fa fa-calendar-times-o",
            link:"pastliveclass"
        },
        {
            class:'',
            drop_i:'no',
            head:"Evaluate Quiz",
            icon:"fa fa-calendar-times-o",
            link:"evaluatequiz"
        },
        {
          class:'treeview',
          drop_i:'<span class="pull-right-container"><i class="fa fa-angle-left pull-right">    </i></span>',
          head:"Articles",
          icon:"fas fa-book",
          link:"#",
          child:[
            {
              class:'',
              drop_i:'no',
              head:"New",
              icon:"fas fa-book",
              link:"new"
            },
            {
              class:'',
              drop_i:'no',
              head:"Pending",
              icon:"fas fa-book",
              link:"pending"
            },
            
            {
              class:'',
              drop_i:'no',
              head:"Approve",
              icon:"fas fa-book",
              link:"approve"
            },
            {
              class:'',
              drop_i:'no',
              head:"Rejected",
              icon:"fas fa-book",
              link:"rejected"
            }]
          },
//        {
//         class:'treeview',
//         drop_i:'<span class="pull-right-container"><i class="fa fa-angle-left pull-right">    </i></span>',
//         head:"Prevoius Quizes",
//         icon:"fas fa-book",
//         link:"#",
//         child:[
//           {
//             class:'',
//             drop_i:'no',
//             head:"Pending",
//             icon:"fas fa-book",
//             link:"Previousmains",
//           },
//           { 
//             class:'',
//             drop_i:'no',
//             head:"Submitted",
//             icon:"fas fa-book",
//             link:"UploadedQuiz",
//           },
//           { 
//             class:'',
//             drop_i:'no',
//             head:"Evaluated",
//             icon:"fas fa-book",
//             link:"EvaluatedQuiz",
//           },
        ]
//       },

//     ];
    teacherNav = (e) => {
      
      if(e.currentTarget.className === "")
      {
          $(".sidebar-menu > li").attr("class","");
          $(".sidebar-menu > li > ul > li").attr("class","");
          e.currentTarget.className="active";
      }
      else
      {
          if(!e.currentTarget.querySelector("ul"))
          {
              $(".sidebar-menu > li").attr("class","");
              e.currentTarget.className="";
          }
      }
        
      if(!e.currentTarget.innerHTML.includes("treeview-menu"))
      {
          if( window.innerWidth <= 800 )
          {
              $(".sidebar-toggle").click();
          }
      }
    }
    
    teacherNavChild = (e) => {
      
      
      if(e.currentTarget.className === "")
      {
          $(".sidebar-menu > li > ul > li").attr("class","");
          e.currentTarget.parentElement.parentElement.className="active";
          e.currentTarget.className="active";
      }
      else
      {
          $(".sidebar-menu > li > ul > li").attr("class","");
          e.currentTarget.parentElement.parentElement.className="";
          e.currentTarget.className="";
      }
        
      if( window.innerWidth <= 800 )
      {
          $(".sidebar-toggle").click();
      }
    }
  
    render()
    {
        function detectMob() {
            return ( ( window.innerWidth <= 800 ) && ( window.innerHeight <= 600 ) );
        }
        
        function closeNav()
        {
            if(detectMob())
            {
                $(".sidebar-toggle").click();
            }
        }
        
        return(
            <section className="sidebar">
                {/* Sidebar user panel */}
                <div className="user-panel">
                  <div className="image">
                    <form encType="multipart/form-data" action="image_upload_demo_submit.php" method="post" name="image_upload_form" id="image_upload_form">
                      <div id="imgArea" className="pull-left image">
                        <img src="/images/logo.png" alt="Logo" width={48} height={48} />
                        <div className="progressBar">
                          <div className="bar" />
                          <div className="percent">0%</div>
                        </div>
                      </div>
                    </form>
                  </div>
                  <div className="pull-left info">
                    <p>
                      teacher
                    </p>
                  </div>
                </div>
                {/* /.search form */}
                {/* sidebar menu: : style can be found in sidebar.less */}
            {/*<ul className="sidebar-menu" data-widget="tree" dangerouslySetInnerHTML={{__html: this.state.navbar }}></ul>*/}
                <ul className="sidebar-menu" data-widget="tree">
                        {this.navbar.map((d, idx) => (
                            <li onClick={this.teacherNav.bind(this)} key={idx}>
                                {(d.link === "#" ? 
                                    <React.Fragment>
                                      <Link to="#" className="nav-link"> 
                                        <i className={d.icon}></i> 
                                        &nbsp;{d.head}
                                        <span className="pull-right-container"><i className="fa fa-angle-left pull-right">&nbsp;&nbsp;&nbsp;&nbsp;</i></span>
                                      </Link>
                                      <ul className="treeview-menu" style={{paddingLeft: "20px"}}>
                                          {d.child.map((c, cid) => (
                                            <li onClick={this.teacherNavChild.bind(this)} className={c.class} key={cid}> 
                                              <Link to={'/teacher/'+c.link} className="nav-link">
                                                <i className={'fa ' + c.icon}></i>
                                                {c.head}
                                              </Link>
                                            </li>
                                          ))}
                                      </ul>
                                    </React.Fragment>
                                    : 
                                    <Link to={'/teacher/'+d.link} className="nav-link" onClick={() => closeNav()}> 
                                      <i className={d.icon}></i> 
                                        &nbsp; {d.head}
                                    </Link>
                                )}
                            </li>
                        ))} 
                </ul>
                
              </section>
        );
    }
}

class Dashboard extends React.Component{
    constructor() {
        super();
        this.state = {
            orders: [],
            customers: 0,
            active_customers: 0,
            blocked_customers: 0,
            new_products: 0,
            active_products: 0,
            blocked_products: 0,
            returns: 0,
            coupons: 0,
            notifications: 0,
            sms_sent: 0,
            no_orders: 0,
            pending_orders: 0,
            delivered_orders: 0,
            cancelled_orders: 0,
            total_orders: 0,
            total_sales: 0,
            total_payable: 0,
            total_paid: 0,
            total_outstanding: 0,
        };
      
        let formData = new FormData();
		formData.append('agent_counters', "get_data")
      
        var obj = this
      
		axios({
			method: 'post',
			url: api_link+'AgentsFetch.php',
			data: formData,
		})
		.then(response => response.data)
        .then((data) => {
            obj.setState({ 
              total_orders: data['total_orders'],
              total_sales: data['total_sales'],
              total_payable: data['total_payable'],
              total_paid: data['total_paid'],
              total_outstanding: data['outstanding'],
            })
            obj.counterKey++;
         })
		.catch(function (response) {
			//handle error
			console.log(response)
		});  
    }

    componentDidMount(){
        let formData = new FormData();
		formData.append('pending', "pending")

        this.childKey=0;
        
        const url = api_link+'FetchCounters.php'
        axios.get(url).then(response => response.data)
        .then((data) => {
          this.setState({ 
            new_products: data['new_products'],
            active_products: data['active_products'],
            blocked_products: data['blocked_products'],
            no_orders: data['orders'],
            pending_orders: data['pending_orders'],
            delivered_orders: data['delivered_orders'],
            cancelled_orders: data['cancelled_orders'],
            returns: data['returns'],
            customers: data['customers'],
            active_customers: data['active_customers'],
            blocked_customers: data['blocked_customers'],
            coupons: data['coupons'],
            sms_sent: data['sms_sent'],
            notifications: data['notifications'],
          })
         })
      
		axios({
			method: 'post',
			url: api_link+'OrdersFetch.php',
			data: formData,
		})
		.then(response => response.data)
        .then((data) => {
            this.setState({ orders: data })
            this.childKey+=1;
            $("script[src='js/dataTable.js']").remove();
                
            const script = document.createElement("script");
            script.src = "js/dataTable.js";
            document.body.appendChild(script);
         })
		.catch(function (response) {
			//handle error
			console.log(response)
		});  
    }
    
    shouldComponentUpdate(nextProps,nextState){
      if(JSON.stringify(this.state.orders) === JSON.stringify(nextState.orders))
      {
          return true;
      }
      else
      {
        return true;
      }
    }

    render()
    {
        return(
            <div className="content-wrapper">
                <section className="content-header">
                  <h1> Dashboard</h1>
                </section>
                {/* Main content */}
                <section className="content">

                  {/* Info boxes */}
                  <div className="row">
                        <div className="col-md-12" style={{clear: 'both'}}>    
                            <h3>Orders</h3>
                      </div>
                      
                      <div className="col-md-3 col-sm-6 col-xs-6">
                        <div className="info-box">
                          <span className="info-box-icon bg-aqua"><i className="fa  fa-handshake" /></span>
                          <div className="info-box-content one">
                            <span className="info-box-text"><i className="fa fa-handshake m_icon" /> Total Orders</span>
                            <span className="info-box-number">{this.state.no_orders}</span>
                          </div>
                        </div>
                      </div>

                      <div className="col-md-3 col-sm-6 col-xs-6">
                        <div className="info-box">
                          <span className="info-box-icon bg-yellow"><i className="fa fa-credit-card" /></span>
                          <div className="info-box-content two">
                            <span className="info-box-text"><i className="fa fa-credit-card m_icon" /> Pending Orders</span>
                            <span className="info-box-number">{this.state.pending_orders}</span>
                          </div>
                        </div>
                      </div>

                      <div className="col-md-3 col-sm-6 col-xs-6">
                        <div className="info-box">
                          <span className="info-box-icon bg-aqua"><i className="fa fa-percent" /></span>
                          <div className="info-box-content one">
                            <span className="info-box-text"><i className="fa fa-percent m_icon" /> Cancelled Orders</span>
                            <span className="info-box-number">{this.state.cancelled_orders}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="col-md-3 col-sm-6 col-xs-6">
                        <div className="info-box">
                          <span className="info-box-icon bg-green "><i className="ion ion-thumbsup" /></span>
                          <div className="info-box-content two">
                            <span className="info-box-text"><i className="ion ion-thumbsup m_icon" /> Delivered Orders</span>
                            <span className="info-box-number">{this.state.delivered_orders}</span>
                          </div>
                        </div>
                      </div>

                      <div className="col-md-12" style={{clear: 'both'}}>    
                            <h3>teachers</h3>
                      </div>
                      
                      <div className="col-md-3 col-sm-6 col-xs-6">
                        <div className="info-box">
                          <span className="info-box-icon bg-aqua"><i className="fa  fa-handshake" /></span>
                          <div className="info-box-content one">
                            <span className="info-box-text"><i className="fa fa-handshake m_icon" /> Total</span>
                            <span className="info-box-number">{this.state.customers}</span>
                          </div>
                        </div>
                      </div>

                      <div className="col-md-3 col-sm-6 col-xs-6">
                        <div className="info-box">
                          <span className="info-box-icon bg-yellow"><i className="fa fa-credit-card" /></span>
                          <div className="info-box-content two">
                            <span className="info-box-text"><i className="fa fa-credit-card m_icon" /> Active</span>
                            <span className="info-box-number">{this.state.active_customers}</span>
                          </div>
                        </div>
                      </div>

                      <div className="col-md-3 col-sm-6 col-xs-6">
                        <div className="info-box">
                          <span className="info-box-icon bg-aqua"><i className="fa fa-percent" /></span>
                          <div className="info-box-content one">
                            <span className="info-box-text"><i className="fa fa-percent m_icon" /> Blocked</span>
                            <span className="info-box-number">{this.state.blocked_customers}</span>
                          </div>
                        </div>
                      </div>
                  </div>
                  
                  {/* /.row */}
                </section>
                <div className="control-sidebar-bg" />
            </div>
        );
    }
}

class Profile extends React.Component{
    constructor() {
        super();
        this.state = {
            name: '',
            email: '',
            contact: '',
            alt_contact: '',
            address: '',
            pin: '',
            tech_contact: '',
            tech_email: '',
            gstin: '',
            logo: '',
            elogo: '',
            icon: '',
            eicon: '',
            current_pass: '',
            new_pass: '',
            confirm_pass: '',
        };
      
        let formData = new FormData();
		formData.append('profile', "profile")

        this.childKey=0;
      
		axios({
			method: 'post',
			url: api_link+'SetupFetch.php',
			data: formData,
		})
		.then(response => response.data)
        .then((data) => {
            this.setState({ 
              name: data[0]['name'],
              email: data[0]['email'],
              contact: data[0]['contact'],
              alt_contact: data[0]['alternate_contact'],
              address: data[0]['address'],
              pin: data[0]['pin'],
              tech_contact: data[0]['technical_contact'],
              tech_email: data[0]['technical_email'],
              gstin: data[0]['gstin'],
              logo: data[0]['logo'],
              icon: data[0]['icon'],
            })
         })
    }

    componentDidMount(){
        document.title = "Profile Setup";
    }

    handleBasicFormSubmit( event ) {
		event.preventDefault();
		$("#invalid_message").hide();

        let formData = new FormData();
        formData.append('profile', "update")
        formData.append('name', this.state.name)
        formData.append('contact', this.state.contact)
        formData.append('alt_contact', this.state.alt_contact)
        formData.append('technical_contact', this.state.tech_contact)
        formData.append('email', this.state.email)
        formData.append('technical_email', this.state.tech_email)
        formData.append('address', this.state.address)
        formData.append('pin', this.state.pin)
        formData.append('gstin', this.state.gstin)

        axios({
            method: 'post',
            url: api_link+'ProfileManagement.php',
            data: formData,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
        .then(function (response) {
            //handle success
            if(response.data === "ok")
            {	
                $("#update_message").html("<strong>Success! </strong> Your Request Successfully Processed")
                $("#update_message").removeClass("alert-danger").addClass("alert-success")
            }
            else
            {
                $("#update_message").html("<strong>Error! </strong> Unable to Process Your Request")
                $("#update_message").removeClass("alert-success").addClass("alert-danger")
            }
            $("#update_message").show()
             setTimeout(function(){ $("#update_message").hide();; }, 4000);


        })
        .catch(function (response) {
            //handle error
            console.log(response)
        });	
	} 
  
    handleLogoFormSubmit( event ) {
		event.preventDefault();
		$("#invalid_message").hide();
        let formData1 = new FormData();
        formData1.append('update_logo', "update_logo")
        formData1.append('logo', this.state.elogo)
        axios({
            method: 'post',
            url: api_link+'ProfileManagement.php',
            data: formData1,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
        .then(function (response) 
        {
            //handle success
            if(response.data === "ok")
            {
                $("#update_message").html("<strong>Success! </strong> Your Request Successfully Processed")
                $("#update_message").removeClass("alert-danger").addClass("alert-success")
            }
            else
            {
                $("#update_message").html("<strong>Error! </strong> Unable to Process Your Request")
                $("#update_message").removeClass("alert-success").addClass("alert-danger")
            }
            $("#update_message").show();
            setTimeout(function(){ $("#update_message").hide();; }, 4000);
        })
	}
  
    handleIconFormSubmit( event ) {
		event.preventDefault();
		$("#invalid_message").hide();
        let reader = new FileReader()
        reader.readAsDataURL(this.state.eicon)
        reader.onload=(e)=>{
            let formData = new FormData();
            formData.append('update_icon', "update_icon")
            formData.append('icon', this.state.eicon)

            axios({
                method: 'post',
                url: api_link+'ProfileManagement.php',
                data: formData,
                config: { headers: {'Content-Type': 'multipart/form-data' }}
            })
            .then(function (response) {
                //handle success
                if(response.data === "ok")
                {
                    $("#update_message").html("<strong>Success! </strong> Your Request Successfully Processed")
                    $("#update_message").removeClass("alert-danger").addClass("alert-success")
                }
                else
                {
                    $("#update_message").html("<strong>Error! </strong> Unable to Process Your Request")
                    $("#update_message").removeClass("alert-success").addClass("alert-danger")
                }
                $("#update_message").show()
                 setTimeout(function(){ $("#update_message").hide();; }, 4000);


            })
            .catch(function (response) {
                //handle error
                $(".loader_gif").fadeOut("slow");
                console.log(response)
            });
        }
	}
  
    handlePasswordFormSubmit( event ) {
		event.preventDefault();
		$("#invalid_message").hide();

        if(this.state.new_pass === this.state.confirm_pass)
        {
          let formData = new FormData();
          formData.append('current_pass', this.state.current_pass)
          formData.append('new_pass', this.state.new_pass)
          formData.append('confirm_pass', this.state.confirm_pass)
          formData.append('update_password', "update_password")
          formData.append('email', window.atob(window.sessionStorage.getItem(window.btoa("signed_in"))))

          axios({
              method: 'post',
              url: api_link+'ProfileManagement.php',
              data: formData,
              config: { headers: {'Content-Type': 'multipart/form-data' }}
          })
          .then(function (response) {
              //handle success
              if(response.data === "ok")
              {	
                  $("#update_message").html("<strong>Success! </strong> Your Request Successfully Processed")
                  $("#update_message").removeClass("alert-danger").addClass("alert-success")
              }
              else
              {
                  $("#update_message").html("<strong>Error! </strong> Unable to Process Your Request")
                  $("#update_message").removeClass("alert-success").addClass("alert-danger")
              }
              window.scrollTo({top: 0, behavior: 'smooth'});
              $("#update_message").show()
               setTimeout(function(){ $("#update_message").hide();; }, 4000);


          })
          .catch(function (response) {
              //handle error
              console.log(response)
          });	
        }
        else
        {
            window.scrollTo({top: 0, behavior: 'smooth'});
            $("#update_message").html("<strong>Error! </strong> Please Enter Same Password!");
            $("#update_message").removeClass("alert-success").addClass("alert-danger");
            $("#update_message").show();
            setTimeout(function(){ $("#update_message").hide();; }, 4000);
        }
	} 
  
    render()
    {
        return(
            <div className="content-wrapper">
                <section>
                    <div id="update_message" className="alert" style={{display: 'none'}}></div> 
                </section>
                <section className="content-header">
                  <h1> Profile Setup</h1>
                </section>
                <section className="content">
                    	<div className="box">
                          <div className="box-body">
                            
                            {/*CHANGE BASIC DETAILS*/}
                            <form method="post" onSubmit={this.handleBasicFormSubmit.bind(this)}>
                              <div className="row">
                                <div className="col-md-6 form-group">
                                  <label>Shop Title*</label>
                                  <input type="text" id="name" required name="name" pattern="[a-zA-Z ]{3,50}" defaultValue={this.state.name} className="form-control" placeholder="Name" title="Enter characters only" onChange={e => this.setState({ name: e.target.value })}/>
                                </div>
                                <div className="col-md-6 form-group">
                                  <label>Email*</label>
                                  <input type="email" id="email" required name="email" defaultValue={this.state.email} className="form-control" placeholder="Email" onChange={e => this.setState({ email: e.target.value })} />
                                </div>
                                <div className="col-md-6 form-group">
                                  <label>Contact No*</label>
                                  <input type="text" id="contact" required name="contact" pattern="[0-9]{10,15}" defaultValue={this.state.contact} className="form-control" placeholder="Contact No" title="Enter valid number" max={15} onChange={e => this.setState({ contact: e.target.value })} />
                                </div>
                                <div className="col-md-6 form-group">
                                  <label>Alternate Contact No</label>
                                  <input type="text" id="contact" name="alternate_contact" pattern="[0-9]{10,15}" defaultValue={this.state.alt_contact} className="form-control" placeholder="Contact No" title="Enter valid number" max={15} onChange={e => this.setState({ alt_contact: e.target.value })} />
                                </div>
                                <div className="col-md-6 form-group">
                                  <label>Technical Contact Number</label>
                                  <input type="text" required name="technical_contact" defaultValue={this.state.tech_contact} className="form-control" placeholder="Technical Contact" onChange={e => this.setState({ tech_contact: e.target.value })} />
                                </div>
                                <div className="col-md-6 form-group">
                                  <label>Technical Email</label>
                                  <input type="email" required name="technical_email" defaultValue={this.state.tech_email} className="form-control" placeholder="Technical Email" onChange={e => this.setState({ tech_email: e.target.value })} />
                                </div>
                                <div className="col-md-12">
                                  <label>Complete Address*</label>
                                  <textarea style={{resize: 'none'}} className="form-control" name="add" row={5} required defaultValue={this.state.address} onChange={e => this.setState({ address: e.target.value })} />
                                </div>
                                <div className="col-md-6">
                                  <div className="form-group">
                                    <br/>
                                    <label>Zip Code</label>
                                    <input className="form-control" defaultValue={this.state.pin} name="zip" type="text" required onChange={e => this.setState({ pin: e.target.value })} />
                                  </div>
                                </div>
                                <div className="col-md-6 form-group">
                                  <br/>
                                  <label>GSTIN</label>
                                  <input type="text" required name="gstin" defaultValue={this.state.gstin} className="form-control" placeholder="Company GSTIN" onChange={e => this.setState({ gstin: e.target.value })} />
                                </div>
                                <div className="col-md-12">
                                  <button type="submit" name="profile" className="btn btn-primary wdt-bg">Update Profile</button>
                                </div>
                              </div>
                            </form>
                            
                            <br />
                            <div className="box-header with-border">
                              <h3 className="box-title">Change Logo</h3>
                            </div>
                            <br />
                            
                            {/*CHANGE LOGO*/}
                            <form onSubmit={this.handleLogoFormSubmit.bind(this)}>
                              <div className="row">
                                <div className="col-sm-2">
                                  <img src={"/images/"+this.state.logo} alt="logo" style={{width: '100px'}} />
                                </div>
                                <div className="col-sm-10">
                                  <div className="input-group col-md-5">
                                    <input type="file" name="image_upload_file" required onChange={(e) => this.setState({ elogo: e.target.files[0] })} />
                                  </div>
                                  <br />
                                  <button type="submit" name="changelogo" className="btn btn-primary wdt-bg">Update Logo</button>
                                </div>
                              </div>          
                            </form>
                            <br />
                            
                            <div className="box-header with-border">
                              <h3 className="box-title">Change Icon</h3>
                            </div>
                            <br />
                            {/*Changing Icon*/}
                            <form onSubmit={this.handleIconFormSubmit.bind(this)}>
                              <div className="row">
                                <div className="col-sm-2">
                                  <img id="icon_img" src={"/images/"+this.state.icon} alt="icon" style={{width: '100px'}} />
                                </div>
                                <div className="col-sm-10">
                                  <div className="input-group col-md-5">
                                    <input type="file" id="icon_file" required onChange={e => this.setState({ eicon: e.target.files[0] })} />
                                  </div><br />
                                  <button type="submit" name="changeicon" className="btn btn-primary wdt-bg">Update Icon</button>
                                </div>
                              </div>          
                            </form>
                            <br />
                            <div className="box-header with-border">
                              <h3 className="box-title">Change Password</h3>
                            </div>
                            <br />
                            <form method="post" onSubmit={this.handlePasswordFormSubmit.bind(this)}>
                              <div className="row">
                                <div className="col-md-12 form-group">
                                  <label>Current password*</label>
                                  <input type="password" required name="current_pass" className="form-control" placeholder="Current Password" onChange={e => this.setState({ current_pass: e.target.value })} />
                                </div>
                                <div className="col-md-6 form-group">
                                  <label>New Password*</label>
                                  <input type="password" required name="new_pass" className="form-control" placeholder="New Password" onChange={e => this.setState({ new_pass: e.target.value })} />
                                </div>
                                <div className="col-md-6 form-group">
                                  <label>Confirm New Password*</label>
                                  <input type="password" required name="confirm_pass" className="form-control" placeholder="Confirm Password" onChange={e => this.setState({ confirm_pass: e.target.value })} />
                                </div>
                                <div className="col-md-12">
                                  <button type="submit" name="change" className="btn btn-primary wdt-bg">Update Password</button>
                                </div>
                              </div>
                            </form>
                          </div>
                      </div>
                </section>
                <div className="control-sidebar-bg" />
            </div>
        );
    }
}

class TeacherHome extends React.Component {    
  state={
    user_purchase_lib:[]
  }
  constructor(props) 
  {
    super(props);
    $("link[for='Home']").remove();
    $("script[for='Home']").remove();
    $(".scroll-to-top").remove()
  }

  fetch_user_purchase_lib=()=>
  {

    
        let formData = new FormData();
        formData.append('user_purchase_lib', "1")
        formData.append('user_id', window.atob(window.sessionStorage.getItem(window.btoa("user_id"))))
                 
        var obj=this 
        axios({
            method: 'post',
            url: api_link+'Fetch_user_purchase_lib.php',
            data: formData,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
        .then(response => response.data)
        .then((data) => { 
            obj.setState({ user_purchase_lib: data})
            
         })
  }

  updateUserPurchaseLib =(item)=>
  {
    let lib = this.state.user_purchase_lib
    lib.push(item);
    this.setState({ user_purchase_lib: lib })
  }

  componentDidMount() 
  {
    this.fetch_user_purchase_lib()
  }

  render() {
	return (
		<React.Fragment>
            <div id="loader-wrapper" className="loader_gif" style={{display: "none"}}>
              <div id="loader"> 
                  <img src="/images/loading.gif" alt="loader" style={{width: "100px"}} />
              </div>
            </div>
            <BrowserRouter>
                    <Header />
                    <aside className="main-sidebar">
                        <Navbar />
                    </aside>
                
                    <Switch>
                        {/* <Route exact path="/teacher/categories" component={Categories} /> 
                        <Route exact path="/teacher/programmes" component={Programs} />
                        <Route exact path="/teacher/add-programme" component={AddProgram} />
                        <Route exact path="/teacher/edit-programme/:token" component={EditProgram} />
                        <Route exact path="/teacher/courses" component={Courses} />
                        <Route exact path="/teacher/add-course" component={AddCourses} />
                        <Route exact path="/teacher/edit-course/:token" component={EditCourses} />

                        <Route exact path="/teacher/quiz" component={Quiz} />
                        <Route exact path="/teacher/add-quiz" component={AddQuiz} />
                        <Route exact path="/teacher/edit-quiz/:token" component={EditQuiz} />
                        
                        <Route exact path="/teacher/page_setup" component={DynamicPages} />
                        <Route exact path="/teacher/slider_setup" component={SliderSetup} />
                        <Route exact path="/teacher/social_links" component={SocialSetup} />
                        <Route exact path="/teacher/faq" component={FAQs} />
                        
                        <Route exact path="/teacher/email" component={Email} />
                        <Route exact path="/teacher/view-subscribers" component={EmailSubscribers} />
                        <Route exact path="/teacher/push_notifications" component={PushNotifications} />
                      
                        <Route exact path="/teacher/pending_queries" component={PendingQueries} />
                        <Route exact path="/teacher/responded_queries" component={RespondedQueries} />
                      
                        <Route exact path="/teacher/profiles" component={Profile} />
                        <Route exact path="/teacher/featured-courses" component={FeaturedCourses} />
                        <Route exact path="/teacher/reviews" component={Reviews} />
                        <Route exact path="/teacher/useful-links" component={FooterLinks} />
                        <Route exact path="/teacher/why-us" component={WhyUs} /> */}

                        {/* <Route exact path="/teacher/study-material" 
                          render={(props) => (
                              <StudyMaterial {...props} user_purchase_lib={this.state.user_purchase_lib}  />
                            )} />
                        <Route exact path="/teacher/mains"  
                            render={(props) => (
                              <Mains {...props}  user_purchase_lib={this.state.user_purchase_lib} />
                            )}
                        />
                        <Route exact path="/teacher/prelims"  
                           render={(props) => (
                            <Prelims {...props} user_purchase_lib={this.state.user_purchase_lib}  />
                          )}
                        />
                        <Route exact path="/teacher/programmes"  
                            render={(props) => (      
                              <Programmes {...props}  user_purchase_lib={this.state.user_purchase_lib} update_user_p_lib={this.updateUserPurchaseLib} />
                            )}
                        />
                        <Route exact path="/teacher/payments/:token/:type"  
                         render={(props) => (
                          <Payment {...props}   update_user_p_lib={this.updateUserPurchaseLib}/>
                        )}
                        />
                        <Route exact path="/teacher/prelimsquiz/:id/:name"  
                         render={(props) => (
                          <PrelimsQuiz {...props}   />
                        )}
                        />
                        <Route exact path="/teacher/UploadedQuiz"  
                         render={(props) => (
                          <UploadedQuiz {...props} />
                        )}
                        />
                        <Route exact path="/teacher/Previousmains"  
                         render={(props) => (
                          <Previousmains {...props} />
                        )}
                        />
                        <Route exact path="/teacher/EvaluatedQuiz"  
                         render={(props) => (
                          <EvaluatedQuiz {...props} />
                        )}
                        />
                        
                        

                        <Route exact path="/teacher/courses"
                          render={(props) => (
                            <Courses {...props}  user_purchase_lib={this.state.user_purchase_lib} update_user_p_lib={this.updateUserPurchaseLib}/>
                          )}
                        />
                        <Route exact path="/teacher/endClass/:class_id/:ispresenter"
                        />  */}

                        {/* <Route exact path="/teacher/pastliveclass"  
                         render={(props) => (
                          <PastLiveClass {...props} />
                        )}
                        /> */}

                        <Route exact path="/teacher/pastliveclass" component={PastLiveClass} />
                        <Route exact path="/teacher/evaluatequiz" component={EvaluateQuiz} />
                        <Route exact path="/teacher/pending" component={Pending} /> 
                        <Route exact path="/teacher/approve" component={Approve} /> 
                        <Route exact path="/teacher/changepassword" component={ChangePassword} /> 
                        <Route exact path="/teacher/new" component={Articles} /> 
                        <Route exact path="/teacher/rejected" component={Rejected} /> 
                        <Route exact path="/teacher/add-article/:token" component={Editarticle} />
                        <Route exact path="/teacher/*" component={LiveClass} />
                        <Route exact path="/teacher/" component={LiveClass} /> 
                        
                    </Switch>
            </BrowserRouter>
            
		</React.Fragment>
	);
  }
}
export default TeacherHome;