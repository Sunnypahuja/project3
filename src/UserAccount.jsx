import React, {Component} from 'react';
//import ReactDOM from 'react-dom';
import { Link } from "react-router-dom";
import axios from 'axios';
import $ from 'jquery';

import {cart_items, user_details, api_link, removeItem, LoginUserAuth, SearchBox} from './Home';

const parse = require('html-react-parser');

var checkout_final_status='';

class Dashboard extends Component{
  /*constructor(){
        super();
        if(!LoginUserAuth.isAuthenticated)
        {
            window.history.pushState('', '', '/register')
            this.props.history.push('/register');
        }
    
        this.state={
            orders:[],
        }
    
        this.cancelOrder=this.cancelOrder.bind(this);
    
        var obj=this;  
    
        let formData = new FormData();
            formData.append('token', window.atob(window.sessionStorage.getItem(window.btoa("user_id"))))
      
            axios({
                method: 'post',
                url: api_link+'CustomerOrdersFetch.php',
                data: formData,
                config: { headers: {'Content-Type': 'multipart/form-data' }}
            })
            .then(response => response.data)
            .then((data) => {
                obj.setState({
                    orders: data,
                })
             })
            .catch(function (response) {
                //handle error
                console.log(response)
            });
  }
  
  cancelOrder(id){
      var obj=this;
      
      if(window.confirm("Do You Really Want To Cancel This Order?"))
      {
          
          let formData = new FormData();
          formData.append('cancel_order', id)

          axios({
              method: 'post',
              url: api_link+'OrdersManagement.php',
              data: formData,
              config: { headers: {'Content-Type': 'multipart/form-data' }}
          })
          .then(response => response.data)
          .then((data) => {
              if(data === "ok")
              {
                  $("#update_message").show()
                  setTimeout(function(){ $("#update_message").hide();; }, 4000);
                  let formData2 = new FormData();
                  formData2.append('token', window.atob(window.sessionStorage.getItem(window.btoa("user_id"))))

                  axios({
                      method: 'post',
                      url: api_link+'CustomerOrdersFetch.php',
                      data: formData2,
                      config: { headers: {'Content-Type': 'multipart/form-data' }}
                  })
                  .then(response => response.data)
                  .then((data) => {
                      obj.setState({
                          orders: data,
                      })
                   })
                  .catch(function (response) {
                      //handle error
                      console.log(response)
                  });
              }
              else
              {
                $("#invalid_message").show();
                setTimeout(function(){ $("#invalid_message").hide();; }, 4000);
              }
           })
          .catch(function (response) {
              //handle error
              console.log(response)
          });
      }
  }*/
  
  componentDidMount(){
    $("script[src='js/script.js']").remove();
    const script = document.createElement("script");
    script.src = "js/script.js";
    document.body.appendChild(script);
  }
    
  render(){
    return(
        <React.Fragment>
            <section className="page-title">
                <div className="auto-container">
                    <h1>Student Profile</h1>
                    <SearchBox/>
                </div>
            </section>
            
            <section className="student-profile-section">
                <div className="patern-layer-one paroller" data-paroller-factor="0.40" data-paroller-factor-lg="0.20" data-paroller-type="foreground" data-paroller-direction="vertical" style={{backgroundImage: 'url(images/icons/icon-1.png)'}} />
                <div className="patern-layer-two paroller" data-paroller-factor="0.40" data-paroller-factor-lg="-0.20" data-paroller-type="foreground" data-paroller-direction="vertical" style={{backgroundImage: 'url(images/icons/icon-2.png)'}} />
                <div className="circle-one" />
                <div className="circle-two" />
                <div className="auto-container">
                    <div className="row clearfix">
                        {/* Image Section */}
                        <div className="image-column col-lg-3 col-md-12 col-sm-12">
                            <div className="inner-column">
                                <div className="image">
                                    <img src="/images/home/user.png" alt="" />
                                </div>
                                <h4>Marvin Zona</h4>
                                <div className="text">Pro Member</div>
                                <div className="social-box">
                                    <a href="#!" className="fa fa-facebook-square" />
                                    <a href="#!" className="fa fa-twitter-square" />
                                    <a href="#!" className="fa fa-linkedin-square" />
                                    <a href="#!" className="fa fa-github" />
                                </div>
                                <ul className="student-editing">
                                <li><Link to={"/edit-profile"}>Edit Account</Link></li>
                                <li><a href="#!">Notification</a></li>
                                <li><Link to={"/edit-profile"}>Membership Upgrade</Link></li>
                                </ul>
                            </div>
                        </div>
                        {/* Content Section */}
                        <div className="content-column col-lg-9 col-md-12 col-sm-12">
                            <div className="inner-column">
                                {/* Profile Info Tabs*/}
                                <div className="profile-info-tabs">
                                    {/* Profile Tabs*/}
                                    <div className="profile-tabs tabs-box">
                                        {/*Tab Btns*/}
                                        <ul className="tab-btns tab-buttons clearfix">
                                            <li data-tab="#prod-overview" className="tab-btn active-btn">Overview</li>
                                            <li data-tab="#prod-bookmark" className="tab-btn">Bookmarks</li>
                                            <li data-tab="#prod-billing" className="tab-btn">Billing</li>
                                            <li data-tab="#prod-setting" className="tab-btn">Settings</li>
                                        </ul>
                                        {/*Tabs Container*/}
                                        <div className="tabs-content">
                                            {/*Tab / Active Tab*/}
                                            <div className="tab active-tab" id="prod-overview">
                                                <div className="content">
                                                    {/* Sec Title */}
                                                    <div className="sec-title">
                                                        <h2>Courses In Progress</h2>
                                                    </div>
                                                    <div className="row clearfix">
                                                        {/* Cource Block Two */}
                                                        <div className="cource-block-two col-lg-4 col-md-6 col-sm-12">
                                                            <div className="inner-box">
                                                                <div className="image">
                                                                    <Link to={"/course-details/course-link"}><img src="/images/home/course.png" alt="Course" /></Link>
                                                                </div>
                                                                <div className="lower-content">
                                                                    <h5><Link to={"/course-details/course-link"}>Interaction Design</Link></h5>
                                                                    <div className="text">Replenish of  third creature and meat blessed void a fruit gathered waters.</div>
                                                                    <div className="clearfix">
                                                                        <div className="pull-left">
                                                                            <div className="students">12 Lecturer</div>
                                                                        </div>
                                                                        <div className="pull-right">
                                                                            <div className="hours">54 Hours</div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {/* Cource Block Two */}
                                                        <div className="cource-block-two col-lg-4 col-md-6 col-sm-12">
                                                            <div className="inner-box">
                                                                <div className="image">
                                                                    <Link to={"/course-details/course-link"}><img src="/images/home/course.png" alt="Course" /></Link>
                                                                </div>
                                                                <div className="lower-content">
                                                                    <h5><Link to={"/course-details/course-link"}>Visual Design</Link></h5>
                                                                    <div className="text">Replenish of  third creature and meat blessed void a fruit gathered waters.</div>
                                                                    <div className="clearfix">
                                                                        <div className="pull-left">
                                                                            <div className="students">12 Lecturer</div>
                                                                        </div>
                                                                        <div className="pull-right">
                                                                            <div className="hours">54 Hours</div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {/* Cource Block Two */}
                                                        <div className="cource-block-two col-lg-4 col-md-6 col-sm-12">
                                                            <div className="inner-box">
                                                                <div className="image">
                                                                    <Link to={"/course-details/course-link"}><img src="/images/home/course.png" alt="Course" /></Link>
                                                                </div>
                                                                <div className="lower-content">
                                                                    <h5><Link to={"/course-details/course-link"}>Wireframe Protos</Link></h5>
                                                                    <div className="text">Replenish of  third creature and meat blessed void a fruit gathered waters.</div>
                                                                    <div className="clearfix">
                                                                        <div className="pull-left">
                                                                            <div className="students">12 Lecturer</div>
                                                                        </div>
                                                                        <div className="pull-right">
                                                                            <div className="hours">54 Hours</div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {/* Cource Block Two */}
                                                        <div className="cource-block-two col-lg-4 col-md-6 col-sm-12">
                                                            <div className="inner-box">
                                                                <div className="image">
                                                                    <Link to={"/course-details/course-link"}><img src="/images/home/course.png" alt="Course" /></Link>
                                                                </div>
                                                                <div className="lower-content">
                                                                    <h5><Link to={"/course-details/course-link"}>Color Theory</Link></h5>
                                                                    <div className="text">Replenish of  third creature and meat blessed void a fruit gathered waters.</div>
                                                                    <div className="clearfix">
                                                                        <div className="pull-left">
                                                                            <div className="students">12 Lecturer</div>
                                                                        </div>
                                                                        <div className="pull-right">
                                                                            <div className="hours">54 Hours</div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {/* Cource Block Two */}
                                                        <div className="cource-block-two col-lg-4 col-md-6 col-sm-12">
                                                            <div className="inner-box">
                                                                <div className="image">
                                                                    <Link to={"/course-details/course-link"}><img src="/images/home/course.png" alt="Course" /></Link>
                                                                </div>
                                                                <div className="lower-content">
                                                                    <h5><Link to={"/course-details/course-link"}>Typography</Link></h5>
                                                                    <div className="text">Replenish of  third creature and meat blessed void a fruit gathered waters.</div>
                                                                    <div className="clearfix">
                                                                        <div className="pull-left">
                                                                            <div className="students">12 Lecturer</div>
                                                                        </div>
                                                                        <div className="pull-right">
                                                                            <div className="hours">54 Hours</div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {/* Cource Block Two */}
                                                        <div className="cource-block-two col-lg-4 col-md-6 col-sm-12">
                                                            <div className="inner-box">
                                                                <div className="image">
                                                                    <Link to={"/course-details/course-link"}><img src="/images/home/course.png" alt="Course" /></Link>
                                                                </div>
                                                                <div className="lower-content">
                                                                    <h5><Link to={"/course-details/course-link"}>Picture Selection</Link></h5>
                                                                    <div className="text">Replenish of  third creature and meat blessed void a fruit gathered waters.</div>
                                                                    <div className="clearfix">
                                                                        <div className="pull-left">
                                                                            <div className="students">12 Lecturer</div>
                                                                        </div>
                                                                        <div className="pull-right">
                                                                            <div className="hours">54 Hours</div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* Tab */}
                                            <div className="tab" id="prod-bookmark">
                                                <div className="content">
                                                    <div className="row clearfix">
                                                        {/* Cource Block Two */}
                                                        <div className="cource-block-two col-lg-4 col-md-6 col-sm-12">
                                                            <div className="inner-box">
                                                                <div className="image">
                                                                    <Link to={"/course-details/course-link"}><img src="/images/home/course.png" alt="Course" /></Link>
                                                                </div>
                                                                <div className="lower-content">
                                                                    <h5><Link to={"/course-details/course-link"}>Interaction Design</Link></h5>
                                                                    <div className="text">Replenish of  third creature and meat blessed void a fruit gathered waters.</div>
                                                                    <div className="clearfix">
                                                                        <div className="pull-left">
                                                                            <div className="students">12 Lecturer</div>
                                                                        </div>
                                                                        <div className="pull-right">
                                                                            <div className="hours">54 Hours</div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {/* Cource Block Two */}
                                                        <div className="cource-block-two col-lg-4 col-md-6 col-sm-12">
                                                            <div className="inner-box">
                                                                <div className="image">
                                                                    <Link to={"/course-details/course-link"}><img src="/images/home/course.png" alt="Course" /></Link>
                                                                </div>
                                                                <div className="lower-content">
                                                                    <h5><Link to={"/course-details/course-link"}>Visual Design</Link></h5>
                                                                    <div className="text">Replenish of  third creature and meat blessed void a fruit gathered waters.</div>
                                                                    <div className="clearfix">
                                                                        <div className="pull-left">
                                                                            <div className="students">12 Lecturer</div>
                                                                        </div>
                                                                        <div className="pull-right">
                                                                            <div className="hours">54 Hours</div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {/* Cource Block Two */}
                                                        <div className="cource-block-two col-lg-4 col-md-6 col-sm-12">
                                                            <div className="inner-box">
                                                                <div className="image">
                                                                    <Link to={"/course-details/course-link"}><img src="/images/home/course.png" alt="Course" /></Link>
                                                                </div>
                                                                <div className="lower-content">
                                                                    <h5><Link to={"/course-details/course-link"}>Wireframe Protos</Link></h5>
                                                                    <div className="text">Replenish of  third creature and meat blessed void a fruit gathered waters.</div>
                                                                    <div className="clearfix">
                                                                        <div className="pull-left">
                                                                            <div className="students">12 Lecturer</div>
                                                                        </div>
                                                                        <div className="pull-right">
                                                                            <div className="hours">54 Hours</div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {/* Cource Block Two */}
                                                        <div className="cource-block-two col-lg-4 col-md-6 col-sm-12">
                                                            <div className="inner-box">
                                                                <div className="image">
                                                                    <Link to={"/course-details/course-link"}><img src="/images/home/course.png" alt="Course" /></Link>
                                                                </div>
                                                                <div className="lower-content">
                                                                    <h5><Link to={"/course-details/course-link"}>Color Theory</Link></h5>
                                                                    <div className="text">Replenish of  third creature and meat blessed void a fruit gathered waters.</div>
                                                                    <div className="clearfix">
                                                                        <div className="pull-left">
                                                                            <div className="students">12 Lecturer</div>
                                                                        </div>
                                                                        <div className="pull-right">
                                                                            <div className="hours">54 Hours</div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {/* Cource Block Two */}
                                                        <div className="cource-block-two col-lg-4 col-md-6 col-sm-12">
                                                            <div className="inner-box">
                                                                <div className="image">
                                                                    <Link to={"/course-details/course-link"}><img src="/images/home/course.png" alt="Course" /></Link>
                                                                </div>
                                                                <div className="lower-content">
                                                                    <h5><Link to={"/course-details/course-link"}>Typography</Link></h5>
                                                                    <div className="text">Replenish of  third creature and meat blessed void a fruit gathered waters.</div>
                                                                    <div className="clearfix">
                                                                        <div className="pull-left">
                                                                            <div className="students">12 Lecturer</div>
                                                                        </div>
                                                                        <div className="pull-right">
                                                                            <div className="hours">54 Hours</div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {/* Cource Block Two */}
                                                        <div className="cource-block-two col-lg-4 col-md-6 col-sm-12">
                                                            <div className="inner-box">
                                                                <div className="image">
                                                                    <Link to={"/course-details/course-link"}><img src="/images/home/course.png" alt="Course" /></Link>
                                                                </div>
                                                                <div className="lower-content">
                                                                    <h5><Link to={"/course-details/course-link"}>Picture Selection</Link></h5>
                                                                    <div className="text">Replenish of  third creature and meat blessed void a fruit gathered waters.</div>
                                                                    <div className="clearfix">
                                                                        <div className="pull-left">
                                                                            <div className="students">12 Lecturer</div>
                                                                        </div>
                                                                        <div className="pull-right">
                                                                            <div className="hours">54 Hours</div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* Tab */}
                                            <div className="tab" id="prod-billing">
                                                <div className="content">
                                                    <div className="row clearfix">
                                                        {/* Cource Block Two */}
                                                        <div className="cource-block-two col-lg-4 col-md-6 col-sm-12">
                                                            <div className="inner-box">
                                                                <div className="image">
                                                                    <Link to={"/course-details/course-link"}><img src="/images/home/course.png" alt="Course" /></Link>
                                                                </div>
                                                                <div className="lower-content">
                                                                    <h5><Link to={"/course-details/course-link"}>Interaction Design</Link></h5>
                                                                    <div className="text">Replenish of  third creature and meat blessed void a fruit gathered waters.</div>
                                                                    <div className="clearfix">
                                                                        <div className="pull-left">
                                                                            <div className="students">12 Lecturer</div>
                                                                        </div>
                                                                        <div className="pull-right">
                                                                            <div className="hours">54 Hours</div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {/* Cource Block Two */}
                                                        <div className="cource-block-two col-lg-4 col-md-6 col-sm-12">
                                                            <div className="inner-box">
                                                                <div className="image">
                                                                    <Link to={"/course-details/course-link"}><img src="/images/home/course.png" alt="Course" /></Link>
                                                                </div>
                                                                <div className="lower-content">
                                                                    <h5><Link to={"/course-details/course-link"}>Visual Design</Link></h5>
                                                                    <div className="text">Replenish of  third creature and meat blessed void a fruit gathered waters.</div>
                                                                    <div className="clearfix">
                                                                        <div className="pull-left">
                                                                            <div className="students">12 Lecturer</div>
                                                                        </div>
                                                                        <div className="pull-right">
                                                                            <div className="hours">54 Hours</div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {/* Cource Block Two */}
                                                        <div className="cource-block-two col-lg-4 col-md-6 col-sm-12">
                                                            <div className="inner-box">
                                                                <div className="image">
                                                                    <Link to={"/course-details/course-link"}><img src="/images/home/course.png" alt="Course" /></Link>
                                                                </div>
                                                                <div className="lower-content">
                                                                    <h5><Link to={"/course-details/course-link"}>Wireframe Protos</Link></h5>
                                                                    <div className="text">Replenish of  third creature and meat blessed void a fruit gathered waters.</div>
                                                                    <div className="clearfix">
                                                                        <div className="pull-left">
                                                                            <div className="students">12 Lecturer</div>
                                                                        </div>
                                                                        <div className="pull-right">
                                                                            <div className="hours">54 Hours</div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {/* Cource Block Two */}
                                                        <div className="cource-block-two col-lg-4 col-md-6 col-sm-12">
                                                            <div className="inner-box">
                                                                <div className="image">
                                                                    <Link to={"/course-details/course-link"}><img src="/images/home/course.png" alt="Course" /></Link>
                                                                </div>
                                                                <div className="lower-content">
                                                                    <h5><Link to={"/course-details/course-link"}>Color Theory</Link></h5>
                                                                    <div className="text">Replenish of  third creature and meat blessed void a fruit gathered waters.</div>
                                                                    <div className="clearfix">
                                                                        <div className="pull-left">
                                                                            <div className="students">12 Lecturer</div>
                                                                        </div>
                                                                        <div className="pull-right">
                                                                            <div className="hours">54 Hours</div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {/* Cource Block Two */}
                                                        <div className="cource-block-two col-lg-4 col-md-6 col-sm-12">
                                                            <div className="inner-box">
                                                                <div className="image">
                                                                    <Link to={"/course-details/course-link"}><img src="/images/home/course.png" alt="Course" /></Link>
                                                                </div>
                                                                <div className="lower-content">
                                                                    <h5><Link to={"/course-details/course-link"}>Typography</Link></h5>
                                                                    <div className="text">Replenish of  third creature and meat blessed void a fruit gathered waters.</div>
                                                                    <div className="clearfix">
                                                                        <div className="pull-left">
                                                                            <div className="students">12 Lecturer</div>
                                                                        </div>
                                                                        <div className="pull-right">
                                                                            <div className="hours">54 Hours</div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {/* Cource Block Two */}
                                                        <div className="cource-block-two col-lg-4 col-md-6 col-sm-12">
                                                            <div className="inner-box">
                                                                <div className="image">
                                                                    <Link to={"/course-details/course-link"}><img src="/images/home/course.png" alt="Course" /></Link>
                                                                </div>
                                                                <div className="lower-content">
                                                                    <h5><Link to={"/course-details/course-link"}>Picture Selection</Link></h5>
                                                                    <div className="text">Replenish of  third creature and meat blessed void a fruit gathered waters.</div>
                                                                    <div className="clearfix">
                                                                        <div className="pull-left">
                                                                            <div className="students">12 Lecturer</div>
                                                                        </div>
                                                                        <div className="pull-right">
                                                                            <div className="hours">54 Hours</div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* Tab */}
                                            <div className="tab" id="prod-setting">
                                                <div className="content">
                                                    <div className="row clearfix">
                                                        {/* Cource Block Two */}
                                                        <div className="cource-block-two col-lg-4 col-md-6 col-sm-12">
                                                            <div className="inner-box">
                                                                <div className="image">
                                                                    <Link to={"/course-details/course-link"}><img src="/images/home/course.png" alt="Course" /></Link>
                                                                </div>
                                                                <div className="lower-content">
                                                                    <h5><Link to={"/course-details/course-link"}>Interaction Design</Link></h5>
                                                                    <div className="text">Replenish of  third creature and meat blessed void a fruit gathered waters.</div>
                                                                    <div className="clearfix">
                                                                        <div className="pull-left">
                                                                            <div className="students">12 Lecturer</div>
                                                                        </div>
                                                                        <div className="pull-right">
                                                                            <div className="hours">54 Hours</div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {/* Cource Block Two */}
                                                        <div className="cource-block-two col-lg-4 col-md-6 col-sm-12">
                                                            <div className="inner-box">
                                                                <div className="image">
                                                                    <Link to={"/course-details/course-link"}><img src="/images/home/course.png" alt="Course" /></Link>
                                                                </div>
                                                                <div className="lower-content">
                                                                    <h5><Link to={"/course-details/course-link"}>Visual Design</Link></h5>
                                                                    <div className="text">Replenish of  third creature and meat blessed void a fruit gathered waters.</div>
                                                                    <div className="clearfix">
                                                                        <div className="pull-left">
                                                                            <div className="students">12 Lecturer</div>
                                                                        </div>
                                                                        <div className="pull-right">
                                                                            <div className="hours">54 Hours</div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {/* Cource Block Two */}
                                                        <div className="cource-block-two col-lg-4 col-md-6 col-sm-12">
                                                            <div className="inner-box">
                                                                <div className="image">
                                                                    <Link to={"/course-details/course-link"}><img src="/images/home/course.png" alt="Course" /></Link>
                                                                </div>
                                                                <div className="lower-content">
                                                                    <h5><Link to={"/course-details/course-link"}>Wireframe Protos</Link></h5>
                                                                    <div className="text">Replenish of  third creature and meat blessed void a fruit gathered waters.</div>
                                                                    <div className="clearfix">
                                                                        <div className="pull-left">
                                                                            <div className="students">12 Lecturer</div>
                                                                        </div>
                                                                        <div className="pull-right">
                                                                            <div className="hours">54 Hours</div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {/* Cource Block Two */}
                                                        <div className="cource-block-two col-lg-4 col-md-6 col-sm-12">
                                                            <div className="inner-box">
                                                                <div className="image">
                                                                    <Link to={"/course-details/course-link"}><img src="/images/home/course.png" alt="Course" /></Link>
                                                                </div>
                                                                <div className="lower-content">
                                                                    <h5><Link to={"/course-details/course-link"}>Color Theory</Link></h5>
                                                                    <div className="text">Replenish of  third creature and meat blessed void a fruit gathered waters.</div>
                                                                    <div className="clearfix">
                                                                        <div className="pull-left">
                                                                            <div className="students">12 Lecturer</div>
                                                                        </div>
                                                                        <div className="pull-right">
                                                                            <div className="hours">54 Hours</div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {/* Cource Block Two */}
                                                        <div className="cource-block-two col-lg-4 col-md-6 col-sm-12">
                                                            <div className="inner-box">
                                                                <div className="image">
                                                                    <Link to={"/course-details/course-link"}><img src="/images/home/course.png" alt="Course" /></Link>
                                                                </div>
                                                                <div className="lower-content">
                                                                    <h5><Link to={"/course-details/course-link"}>Typography</Link></h5>
                                                                    <div className="text">Replenish of  third creature and meat blessed void a fruit gathered waters.</div>
                                                                    <div className="clearfix">
                                                                        <div className="pull-left">
                                                                            <div className="students">12 Lecturer</div>
                                                                        </div>
                                                                        <div className="pull-right">
                                                                            <div className="hours">54 Hours</div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {/* Cource Block Two */}
                                                        <div className="cource-block-two col-lg-4 col-md-6 col-sm-12">
                                                            <div className="inner-box">
                                                                <div className="image">
                                                                    <Link to={"/course-details/course-link"}><img src="/images/home/course.png" alt="Course" /></Link>
                                                                </div>
                                                                <div className="lower-content">
                                                                    <h5><Link to={"/course-details/course-link"}>Picture Selection</Link></h5>
                                                                    <div className="text">Replenish of  third creature and meat blessed void a fruit gathered waters.</div>
                                                                    <div className="clearfix">
                                                                        <div className="pull-left">
                                                                            <div className="students">12 Lecturer</div>
                                                                        </div>
                                                                        <div className="pull-right">
                                                                            <div className="hours">54 Hours</div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </React.Fragment>
    );
  }
}

class MyAccount extends Component{
  
  /*constructor(){
      super();
      if(!LoginUserAuth.isAuthenticated)
      {
          window.history.pushState('', '', '/register')
          this.props.history.push('/register');
      }

      this.state={
          u_details:[],
      }

      this.updateUser=this.updateUser.bind(this);

      var obj=this;
    
      //FETCH USER DETAILS
      let formData2 = new FormData();
      formData2.append('customer_details', window.atob(window.sessionStorage.getItem(window.btoa("user_id"))))
      axios({
          method: 'post',
          url: api_link+'AdminLogin.php',
          data: formData2,
      })
      .then(response => response.data)
      .then((data) => {
          if(data === "error")
          {
              LoginUserAuth.isAuthenticated = false
              window.sessionStorage.removeItem(window.btoa("session_user"));
              window.sessionStorage.removeItem(window.btoa("user_id"));		
              window.history.pushState('', '', '/register')
              this.props.history.push('/register');
          }
          else
          {
              obj.setState({
                  u_details: data,
              })
              user_details.details=data;
          }
       })
      .catch(function (response) {
          //handle error
          console.log(response)
      });  
  }
  
  updateUser(e){
        e.preventDefault();
        $("#invalid_message").hide();
        if(window.confirm('Are You Sure To Update The Details?'))
        {
            $("#invalid_message").hide();

            let formData = new FormData();
            formData.append('update_user', window.atob(window.sessionStorage.getItem(window.btoa("user_id"))))
            formData.append('fname', $("#fname").val())
            formData.append('lname', $("#lname").val())
            formData.append('email', $("#email").val())
            formData.append('contact', $("#contact").val())

            //var obj=this

            axios({
                method: 'post',
                url: api_link+'CustomersManagement.php',
                data: formData,
                config: { headers: {'Content-Type': 'multipart/form-data' }}
            })
            .then(function (response) {
                //handle success
                if(response.data === "ok")
                {	
                    $("#update_message").show()
                    setTimeout(function(){ $("#update_message").hide(); }, 4000);
                }
                else if(response.data.includes("already"))
                {
                    $("#custom_message").html("<strong>Error! </strong> Duplicate Entry For "+response.data.replace('already',''))
                    setTimeout(function(){ $("#custom_message").hide(); }, 4000);
                }
                else
                {
                    $("#invalid_message").show();
                    setTimeout(function(){ $("#invalid_message").hide(); }, 4000);
                }
            })
            .catch(function (response) {
                //handle error
                console.log(response)
            });
        }
  }*/
    
  componentDidMount(){
    $("script[src='js/script.js']").remove();
    const script = document.createElement("script");
    script.src = "js/script.js";
    document.body.appendChild(script);
  }
  
  render(){
    return(
        <React.Fragment>
            <section className="page-title style-two">
                <div className="auto-container">
                    <h1>Edit Profile</h1>
                </div>
            </section>
            
            <section className="edit-profile-section">
                <div className="patern-layer-one paroller" data-paroller-factor="0.40" data-paroller-factor-lg="0.20" data-paroller-type="foreground" data-paroller-direction="vertical" style={{backgroundImage: 'url(images/icons/icon-1.png)'}} />
                <div className="patern-layer-two paroller" data-paroller-factor="0.40" data-paroller-factor-lg="-0.20" data-paroller-type="foreground" data-paroller-direction="vertical" style={{backgroundImage: 'url(images/icons/icon-2.png)'}} />
                <div className="auto-container">
                    <div className="row clearfix">
                        {/* Image Section */}
                        <div className="image-column col-lg-3 col-md-12 col-sm-12">
                            <div className="inner-column">
                                <div className="image">
                                    <img src="/images/home/user.png" alt="" />
                                </div>
                                <a href="#!" className="theme-btn btn-style-three"><span className="txt">Upload Picture <i className="fa fa-angle-right" /></span></a>
                                <a href="#!" className="theme-btn btn-style-two"><span className="txt">Delete Picture <i className="fa fa-angle-right" /></span></a>
                            </div>
                        </div>
                        {/* Content Section */}
                        <div className="content-column col-lg-9 col-md-12 col-sm-12">
                            <div className="inner-column">
                                {/* Edit Profile Info Tabs*/}
                                <div className="edit-profile-info-tabs">
                                    {/* Profile Tabs*/}
                                    <div className="edit-profile-tabs tabs-box">
                                        {/*Tab Btns*/}
                                        <ul className="tab-btns tab-buttons clearfix">
                                            <li data-tab="#prod-overview" className="tab-btn active-btn">Overview</li>
                                            <li data-tab="#prod-bookmark" className="tab-btn">Bookmarks</li>
                                            <li data-tab="#prod-billing" className="tab-btn">Billing</li>
                                            <li data-tab="#prod-setting" className="tab-btn">Settings</li>
                                            <li data-tab="#prod-billing" className="tab-btn">Billing</li>
                                            <li data-tab="#prod-setting" className="tab-btn">Settings</li>
                                        </ul>
                                        {/*Tabs Container*/}
                                        <div className="tabs-content">
                                            {/*Tab / Active Tab*/}
                                            <div className="tab active-tab" id="prod-overview">
                                                <div className="content">
                                                    {/* Title Box */}
                                                    <div className="title-box">
                                                        <h5>Edit Profile</h5>
                                                    </div>
                                                    {/* Profile Form */}
                                                    <div className="profile-form">
                                                        {/* Profile Form */}
                                                        <form method="post" action="blog.html">
                                                            <div className="row clearfix">
                                                                <div className="col-lg-6 col-md-6 col-sm-12 form-group">
                                                                    <input type="text" name="username" placeholder="First Name" required />
                                                                    <span className="icon flaticon-edit-1" />
                                                                </div>
                                                                <div className="col-lg-6 col-md-6 col-sm-12 form-group">
                                                                    <input type="text" name="username" placeholder="Last Name" required />
                                                                    <span className="icon flaticon-edit-1" />
                                                                </div>
                                                                <div className="col-lg-6 col-md-6 col-sm-12 form-group">
                                                                    <input type="email" name="email" placeholder="Email" required />
                                                                    <span className="icon flaticon-edit-1" />
                                                                </div>
                                                                <div className="col-lg-6 col-md-6 col-sm-12 form-group">
                                                                    <input type="text" name="phone" placeholder="Phone" required />
                                                                    <span className="icon flaticon-edit-1" />
                                                                </div>
                                                                <div className="col-lg-12 col-md-12 col-sm-12 form-group">
                                                                    <select className="custom-select-box">
                                                                        <option>Member Type</option>
                                                                        <option>Member 01</option>
                                                                        <option>Member 02</option>
                                                                        <option>Member 03</option>
                                                                        <option>Member 04</option>
                                                                        <option>Member 05</option>
                                                                    </select>
                                                                </div>
                                                                <div className="col-lg-12 col-md-12 col-sm-12 form-group">
                                                                    <textarea className name="message" placeholder="Your Message" defaultValue={""} />
                                                                </div>
                                                                <div className="col-lg-12 col-md-12 col-sm-12 form-group text-right">
                                                                    <button className="theme-btn btn-style-two" type="submit" name="submit-form"><span className="txt">Cancel <i className="fa fa-angle-right" /></span></button>
                                                                    <button className="theme-btn btn-style-three" type="submit" name="submit-form"><span className="txt">Save Change <i className="fa fa-angle-right" /></span></button>
                                                                </div>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* Tab */}
                                            <div className="tab" id="prod-bookmark">
                                                <div className="content">
                                                    {/* Title Box */}
                                                    <div className="title-box">
                                                        <h5>Edit Bookmark</h5>
                                                    </div>
                                                    {/* Profile Form */}
                                                    <div className="profile-form">
                                                        {/* Profile Form */}
                                                        <form method="post" action="blog.html">
                                                            <div className="row clearfix">
                                                                <div className="col-lg-6 col-md-6 col-sm-12 form-group">
                                                                    <input type="text" name="username" placeholder="First Name" required />
                                                                    <span className="icon flaticon-edit-1" />
                                                                </div>
                                                                <div className="col-lg-6 col-md-6 col-sm-12 form-group">
                                                                    <input type="text" name="username" placeholder="Last Name" required />
                                                                    <span className="icon flaticon-edit-1" />
                                                                </div>
                                                                <div className="col-lg-6 col-md-6 col-sm-12 form-group">
                                                                    <input type="email" name="email" placeholder="Email" required />
                                                                    <span className="icon flaticon-edit-1" />
                                                                </div>
                                                                <div className="col-lg-6 col-md-6 col-sm-12 form-group">
                                                                    <input type="text" name="phone" placeholder="Phone" required />
                                                                    <span className="icon flaticon-edit-1" />
                                                                </div>
                                                                <div className="col-lg-12 col-md-12 col-sm-12 form-group">
                                                                    <select className="custom-select-box">
                                                                        <option>Member Type</option>
                                                                        <option>Member 01</option>
                                                                        <option>Member 02</option>
                                                                        <option>Member 03</option>
                                                                        <option>Member 04</option>
                                                                        <option>Member 05</option>
                                                                    </select>
                                                                </div>
                                                                <div className="col-lg-12 col-md-12 col-sm-12 form-group">
                                                                    <textarea className name="message" placeholder="Your Message" defaultValue={""} />
                                                                </div>
                                                                <div className="col-lg-12 col-md-12 col-sm-12 form-group text-right">
                                                                    <button className="theme-btn btn-style-two" type="submit" name="submit-form"><span className="txt">Cancel <i className="fa fa-angle-right" /></span></button>
                                                                    <button className="theme-btn btn-style-three" type="submit" name="submit-form"><span className="txt">Save Change <i className="fa fa-angle-right" /></span></button>
                                                                </div>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* Tab */}
                                            <div className="tab" id="prod-billing">
                                                <div className="content">
                                                    {/* Title Box */}
                                                    <div className="title-box">
                                                        <h5>Edit Billing</h5>
                                                    </div>
                                                    {/* Profile Form */}
                                                    <div className="profile-form">
                                                        {/* Profile Form */}
                                                        <form method="post" action="blog.html">
                                                            <div className="row clearfix">
                                                                <div className="col-lg-6 col-md-6 col-sm-12 form-group">
                                                                    <input type="text" name="username" placeholder="First Name" required />
                                                                    <span className="icon flaticon-edit-1" />
                                                                </div>
                                                                <div className="col-lg-6 col-md-6 col-sm-12 form-group">
                                                                    <input type="text" name="username" placeholder="Last Name" required />
                                                                    <span className="icon flaticon-edit-1" />
                                                                </div>
                                                                <div className="col-lg-6 col-md-6 col-sm-12 form-group">
                                                                    <input type="email" name="email" placeholder="Email" required />
                                                                    <span className="icon flaticon-edit-1" />
                                                                </div>
                                                                <div className="col-lg-6 col-md-6 col-sm-12 form-group">
                                                                    <input type="text" name="phone" placeholder="Phone" required />
                                                                    <span className="icon flaticon-edit-1" />
                                                                </div>
                                                                <div className="col-lg-12 col-md-12 col-sm-12 form-group">
                                                                    <select className="custom-select-box">
                                                                        <option>Member Type</option>
                                                                        <option>Member 01</option>
                                                                        <option>Member 02</option>
                                                                        <option>Member 03</option>
                                                                        <option>Member 04</option>
                                                                        <option>Member 05</option>
                                                                    </select>
                                                                </div>
                                                                <div className="col-lg-12 col-md-12 col-sm-12 form-group">
                                                                    <textarea className name="message" placeholder="Your Message" defaultValue={""} />
                                                                </div>
                                                                <div className="col-lg-12 col-md-12 col-sm-12 form-group text-right">
                                                                    <button className="theme-btn btn-style-two" type="submit" name="submit-form"><span className="txt">Cancel <i className="fa fa-angle-right" /></span></button>
                                                                    <button className="theme-btn btn-style-three" type="submit" name="submit-form"><span className="txt">Save Change <i className="fa fa-angle-right" /></span></button>
                                                                </div>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* Tab */}
                                            <div className="tab" id="prod-setting">
                                                <div className="content">
                                                    {/* Title Box */}
                                                    <div className="title-box">
                                                        <h5>Edit Setting</h5>
                                                    </div>
                                                    {/* Profile Form */}
                                                    <div className="profile-form">
                                                        {/* Profile Form */}
                                                        <form method="post" action="blog.html">
                                                            <div className="row clearfix">
                                                                <div className="col-lg-6 col-md-6 col-sm-12 form-group">
                                                                    <input type="text" name="username" placeholder="First Name" required />
                                                                    <span className="icon flaticon-edit-1" />
                                                                </div>
                                                                <div className="col-lg-6 col-md-6 col-sm-12 form-group">
                                                                    <input type="text" name="username" placeholder="Last Name" required />
                                                                    <span className="icon flaticon-edit-1" />
                                                                </div>
                                                                <div className="col-lg-6 col-md-6 col-sm-12 form-group">
                                                                    <input type="email" name="email" placeholder="Email" required />
                                                                    <span className="icon flaticon-edit-1" />
                                                                </div>
                                                                <div className="col-lg-6 col-md-6 col-sm-12 form-group">
                                                                    <input type="text" name="phone" placeholder="Phone" required />
                                                                    <span className="icon flaticon-edit-1" />
                                                                </div>
                                                                <div className="col-lg-12 col-md-12 col-sm-12 form-group">
                                                                    <select className="custom-select-box">
                                                                        <option>Member Type</option>
                                                                        <option>Member 01</option>
                                                                        <option>Member 02</option>
                                                                        <option>Member 03</option>
                                                                        <option>Member 04</option>
                                                                        <option>Member 05</option>
                                                                    </select>
                                                                </div>
                                                                <div className="col-lg-12 col-md-12 col-sm-12 form-group">
                                                                    <textarea className name="message" placeholder="Your Message" defaultValue={""} />
                                                                </div>
                                                                <div className="col-lg-12 col-md-12 col-sm-12 form-group text-right">
                                                                    <button className="theme-btn btn-style-two" type="submit" name="submit-form"><span className="txt">Cancel <i className="fa fa-angle-right" /></span></button>
                                                                    <button className="theme-btn btn-style-three" type="submit" name="submit-form"><span className="txt">Save Change <i className="fa fa-angle-right" /></span></button>
                                                                </div>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* Tab */}
                                            <div className="tab" id="prod-billing">
                                                <div className="content">
                                                    {/* Title Box */}
                                                    <div className="title-box">
                                                        <h5>Edit Billing</h5>
                                                    </div>
                                                    {/* Profile Form */}
                                                    <div className="profile-form">
                                                        {/* Profile Form */}
                                                        <form method="post" action="blog.html">
                                                            <div className="row clearfix">
                                                                <div className="col-lg-6 col-md-6 col-sm-12 form-group">
                                                                    <input type="text" name="username" placeholder="First Name" required />
                                                                    <span className="icon flaticon-edit-1" />
                                                                </div>
                                                                <div className="col-lg-6 col-md-6 col-sm-12 form-group">
                                                                    <input type="text" name="username" placeholder="Last Name" required />
                                                                    <span className="icon flaticon-edit-1" />
                                                                </div>
                                                                <div className="col-lg-6 col-md-6 col-sm-12 form-group">
                                                                    <input type="email" name="email" placeholder="Email" required />
                                                                    <span className="icon flaticon-edit-1" />
                                                                </div>
                                                                <div className="col-lg-6 col-md-6 col-sm-12 form-group">
                                                                    <input type="text" name="phone" placeholder="Phone" required />
                                                                    <span className="icon flaticon-edit-1" />
                                                                </div>
                                                                <div className="col-lg-12 col-md-12 col-sm-12 form-group">
                                                                    <select className="custom-select-box">
                                                                        <option>Member Type</option>
                                                                        <option>Member 01</option>
                                                                        <option>Member 02</option>
                                                                        <option>Member 03</option>
                                                                        <option>Member 04</option>
                                                                        <option>Member 05</option>
                                                                    </select>
                                                                </div>
                                                                <div className="col-lg-12 col-md-12 col-sm-12 form-group">
                                                                    <textarea className name="message" placeholder="Your Message" defaultValue={""} />
                                                                </div>
                                                                <div className="col-lg-12 col-md-12 col-sm-12 form-group text-right">
                                                                    <button className="theme-btn btn-style-two" type="submit" name="submit-form"><span className="txt">Cancel <i className="fa fa-angle-right" /></span></button>
                                                                    <button className="theme-btn btn-style-three" type="submit" name="submit-form"><span className="txt">Save Change <i className="fa fa-angle-right" /></span></button>
                                                                </div>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* Tab */}
                                            <div className="tab" id="prod-setting">
                                                <div className="content">
                                                    {/* Title Box */}
                                                    <div className="title-box">
                                                        <h5>Edit Setting</h5>
                                                    </div>
                                                    {/* Profile Form */}
                                                    <div className="profile-form">
                                                        {/* Profile Form */}
                                                        <form method="post" action="blog.html">
                                                            <div className="row clearfix">
                                                                <div className="col-lg-6 col-md-6 col-sm-12 form-group">
                                                                    <input type="text" name="username" placeholder="First Name" required />
                                                                    <span className="icon flaticon-edit-1" />
                                                                </div>
                                                                <div className="col-lg-6 col-md-6 col-sm-12 form-group">
                                                                    <input type="text" name="username" placeholder="Last Name" required />
                                                                    <span className="icon flaticon-edit-1" />
                                                                </div>
                                                                <div className="col-lg-6 col-md-6 col-sm-12 form-group">
                                                                    <input type="email" name="email" placeholder="Email" required />
                                                                    <span className="icon flaticon-edit-1" />
                                                                </div>
                                                                <div className="col-lg-6 col-md-6 col-sm-12 form-group">
                                                                    <input type="text" name="phone" placeholder="Phone" required />
                                                                    <span className="icon flaticon-edit-1" />
                                                                </div>
                                                                <div className="col-lg-12 col-md-12 col-sm-12 form-group">
                                                                    <select className="custom-select-box">
                                                                        <option>Member Type</option>
                                                                        <option>Member 01</option>
                                                                        <option>Member 02</option>
                                                                        <option>Member 03</option>
                                                                        <option>Member 04</option>
                                                                        <option>Member 05</option>
                                                                    </select>
                                                                </div>
                                                                <div className="col-lg-12 col-md-12 col-sm-12 form-group">
                                                                    <textarea className name="message" placeholder="Your Message" defaultValue={""} />
                                                                </div>
                                                                <div className="col-lg-12 col-md-12 col-sm-12 form-group text-right">
                                                                    <button className="theme-btn btn-style-two" type="submit" name="submit-form"><span className="txt">Cancel <i className="fa fa-angle-right" /></span></button>
                                                                    <button className="theme-btn btn-style-three" type="submit" name="submit-form"><span className="txt">Save Change <i className="fa fa-angle-right" /></span></button>
                                                                </div>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </React.Fragment>
    );
  }
}

export {
    Dashboard,
    MyAccount,
}