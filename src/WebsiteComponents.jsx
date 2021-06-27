import React, {Component} from 'react';
import { Redirect } from 'react-router'
import axios from 'axios';
import $ from 'jquery';
import { Link } from "react-router-dom";
import {api_link, cart_items, SearchBox, server_link} from './Home';
import moment from 'moment'
// var moment = require('moment'); 
import Parser from 'html-react-parser';

class ContactUs extends Component{
  
    constructor()
    {
        super();
        this.state = {
            fname: '',
            lname: '',
            m_num: '',
            email:'',
            message:''
        }
        this.handleFormSubmit=this.handleFormSubmit.bind(this);
    }
    
        handleFormSubmit=(event)=>{
            var obj = this
            event.preventDefault();
            let formData = new FormData();
            formData.append("contact_us",true);
            formData.append("f_name",this.state.fname);
            formData.append("l_name",this.state.lname);
            formData.append("contact_number",this.state.m_num);
            formData.append("email",this.state.email);
            formData.append("message",this.state.message);
            axios({
                method: 'post',
                url: api_link+'contactUs.php',
                data: formData,
                config: { headers: {'Content-Type': 'multipart/form-data' }}
            })
            .then(response => response.data)
            .then((data) => {
            if(data.msg === "success")
            {	
                $("#update_msg").html("<strong>Success! </strong> Your Request Successfully Processed")
                $("#update_msg").removeClass("alert-danger").addClass("alert-success")
            }
            else
            {
                $("#update_msg").html("<strong>Error! </strong> Unable to Process Your Request")
                $("#update_msg").removeClass("alert-success").addClass("alert-danger")
            }
            $("#update_msg").show()
            window.scrollTo({top: 0, behavior: 'smooth'});
                setTimeout(function(){ $("#update_msg").hide(); }, 4000)
            })
        }
  
  render(){
    return(
        <React.Fragment>
          <section className="page-title">
              <div className="auto-container">
                  <h1>Contact Us</h1>
              </div>
          </section>
          <section>
            <div id="update_msg" className="alert" style={{display: 'none'}}></div> 
        </section>
          <section className="contact-page-section">
              <div className="patern-layer-one paroller" data-paroller-factor="0.40" data-paroller-factor-lg="0.20" data-paroller-type="foreground" data-paroller-direction="vertical" style={{backgroundImage: 'url(images/icons/icon-1.png)'}} />
              <div className="patern-layer-two paroller" data-paroller-factor="0.40" data-paroller-factor-lg="-0.20" data-paroller-type="foreground" data-paroller-direction="vertical" style={{backgroundImage: 'url(images/icons/icon-2.png)'}} />
              <div className="auto-container">
              <div className="inner-container">
                  {/* Sec Title */}
                  <div className="sec-title centered">
                      <h2>Get in touch</h2>
                  </div>
                  {/* Contact Form */}
                  <div className="contact-form">
                      {/* Profile Form */}
                      <form method="post" id="contact-form" onSubmit={this.handleFormSubmit.bind(this)}>
                          <div className="row clearfix">
                              <div className="col-lg-6 col-md-6 col-sm-12 form-group">
                                  <input type="text" name="username" onChange={e=>this.setState({fname: e.target.value})}  placeholder="First Name*" required />
                              </div>
                              <div className="col-lg-6 col-md-6 col-sm-12 form-group">
                                  <input type="text" name="lastname" onChange={e=>this.setState({lname: e.target.value})}  placeholder="Last Name*" required />
                              </div>
                              <div className="col-lg-6 col-md-6 col-sm-12 form-group">
                                  <input type="email" name="email" onChange={e=>this.setState({email: e.target.value})}  placeholder="Email Address*" required />
                              </div>
                              <div className="col-lg-6 col-md-6 col-sm-12 form-group">
                                  <input type="text" name="phone" onChange={e=>this.setState({m_num: e.target.value})}  placeholder="Phone Number*" required />
                              </div>
                              <div className="col-lg-12 col-md-12 col-sm-12 form-group">
                                  <textarea onChange={e=>this.setState({message: e.target.value})} className name="message" placeholder="Send Message" defaultValue={""} />
                              </div>
                              <div className="col-lg-12 col-md-12 col-sm-12 form-group text-right">
                                  <button className="theme-btn btn-style-three" type="submit" name="submit-form"><span className="txt">Send Message <i className="fa fa-angle-right" /></span></button>
                              </div>
                          </div>
                      </form>
                  </div>
              </div>
              {/* Contact Info Section */}
              <div className="contact-info-section">
              <div className="title-box">
                  <h2>Contact Information</h2>
                  <div className="text">Lorem Ipsum is simply dummy text of the printing <br /> and typesetting industry.</div>
              </div>
              <div className="row clearfix">
              {/* Info Column */}
              <div className="info-column col-lg-4 col-md-6 col-sm-12">
                  <div className="info-inner">
                      <div className="icon fa fa-phone" />
                          <strong>Phone</strong>
                          <ul>
                              <li><a href="tel:+1-123-456-7890">+1 (123) 456-7890</a></li>
                              <li><a href="tel:+1-123-456-7890">+1 (123) 456-7890</a></li>
                          </ul>
                      </div>
                  </div>
                  {/* Info Column */}
                  <div className="info-column col-lg-4 col-md-6 col-sm-12">
                      <div className="info-inner">
                          <div className="icon fa fa-envelope-o" />
                              <strong>Email</strong>
                              <ul>
                                  <li><a href="mailto:info@yourcompany.com">info@yourcompany.com</a></li>
                                  <li><a href="mailto:infobootcamp@gmail.com">infobootcamp@gmail.com</a></li>
                              </ul>
                          </div>
                      </div>
                      {/* Info Column */}
                      <div className="info-column col-lg-4 col-md-6 col-sm-12">
                          <div className="info-inner">
                              <div className="icon fa fa-map-marker" />
                                  <strong>Address</strong>
                                  <ul>
                                      <li>Portfolio Technology 07, Capetown 12 Road, Chicago, 2436, USA</li>
                                  </ul>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </section>
          
          <section className="map-section">
              {/* Map Boxed */}
              <div className="map-boxed">
                  {/*Map Outer*/}
                  <div className="map-outer">
                      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3443.4179233037007!2d78.05012431522482!3d30.339070411548732!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3908d559c160878b%3A0xcf605b7f0773a86d!2sAgadhanimus%20Technologies%20Pvt.%20Ltd!5e0!3m2!1sen!2sin!4v1614788929786!5m2!1sen!2sin" allowfullscreen></iframe>
                  </div>
              </div>
          </section>
        </React.Fragment>
    );
  }
}

class Pages extends Component{
    constructor(props){
        super();
        
        const base = document.querySelector('base');
        base.setAttribute('href', '../');
        
        this.state = {
            link: props.match.params.token,
            page_data: [],
            refresh: false,
        }
    
        var obj=this;
      
        //FETCH CATEGORIES
        let formData2 = new FormData();
		formData2.append('get_page_data_link', this.state.link)
        axios({
			method: 'post',
			url: api_link+'EditSiteFetch.php',
			data: formData2,
		})
		.then(response => response.data)
        .then((data) => {
            if(data === "invalid")
            {
                obj.setState({ 
                    refresh: true,
                })
            }
            else
            {
                obj.setState({ 
                    page_data: data,
                })
            }
         })
		.catch(function (response) {
			//handle error
			console.log(response)
		});
    }

    UNSAFE_componentWillReceiveProps(props) {
        if (this.state.link !== props.match.params.token) {
            var obj=this;
      
            //FETCH CATEGORIES
            let formData2 = new FormData();
            formData2.append('get_page_data_link', props.match.params.token)
            axios({
                method: 'post',
                url: api_link+'EditSiteFetch.php',
                data: formData2,
            })
            .then(response => response.data)
            .then((data) => {
                if(data === "invalid")
                {
                    obj.setState({ 
                        refresh: true,
                    })
                }
                else
                {
                    obj.setState({ 
                        page_data: data,
                    })
                    this.childKey++
                }
                window.scrollTo(0,0)
             })
            .catch(function (response) {
                //handle error
                console.log(response)
            }); 
        }
    }

    componentDidMount(){
        window.scrollTo(0, 0)
    }

    componentDidUpdate(prevProps) {
        if (this.props.path === this.props.location.pathname && this.props.location.pathname !== prevProps.location.pathname) {
            window.scrollTo(0, 0)
        }
    }
    
    componentWillUnmount(){
        const base = document.querySelector('base');
        base.setAttribute('href', '');
    }
  
    render(){
        if(this.state.refresh)
        {
            return <Redirect to="/home" />
        }

        this.childKey++

        return(
        <React.Fragment key={this.childKey}>
                <section className="page-title">
                    <div className="auto-container" style={{paddingBottom: '90px'}}>
                        <h1>{this.state.page_data['title']}</h1>
                    </div>
                </section>
                
                <section className="privacy-section" style={{paddingTop: '40px'}}>
                    <div className="auto-container">
                        {/* Privacy Content */}
                        <div className="privacy-content">
                            <h2>{this.state.page_data['title']}</h2>
                            {Parser(''+this.state.page_data['page_data']+'')}
                        </div>
                    </div>
                </section>
        </React.Fragment>
        );
    }
}

class Error extends Component{
    
    render(){
        return(
            <React.Fragment>
                <section className="page-title style-two">
                    <div className="auto-container">
                        <h1>Not Found</h1>
                    </div>
                </section>
                
                <section className="error-section">
                    <div className="auto-container">
                        <div className="content">
                            <div className="image">
                                <img src="/images/home/error.png" alt="Error" />
                            </div>
                            <Link to={"/"} className="theme-btn btn-style-two"><span className="txt">Back to the homepage <i className="fa fa-angle-right" /></span></Link>
                        </div>
                    </div>
                </section>
            </React.Fragment>
        );
    }
}

class Blogs extends Component{
    



state = {}

    fetch_blog_posts=()=>{
        let formData6 = new FormData();
		formData6.append('fetch_recent_blogs', "fetch_recent_blogs")
        axios({
			method: 'post',
			url: api_link+'EditSiteFetch.php',
			data: formData6,
		})
		.then(response => response.data)
        .then((data) => {
            if(data.msg=="ok"){
                console.log(data)
            this.setState({ recentBlogs: data.data})}
         })
		.catch(function (response) {
			//handle error
			console.log(response)
		}); 
    }

    search=(word)=>{
        console.log(word)
        let formData = new FormData();
        formData.append('search_blog', true)              
        formData.append('search_for', word);              

        axios({
            method: 'post',
            url: api_link+'Search.php',
            data: formData,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
        .then(response => response.data)
        .then((data)=> {
                this.setState({recentBlogs: data.data})
        })
    }
    
    componentDidMount() {
        this.fetch_blog_posts()
    }
    render(){
        return(
            <React.Fragment>
                <section className="page-title">
                    <div className="auto-container">
                        <h1>Blogs</h1>
                        <SearchBox search={this.search}/>
                    </div>
                </section>
                
                <div className="sidebar-page-container">
                <div className="patern-layer-one paroller" data-paroller-factor="0.40" data-paroller-factor-lg="0.20" data-paroller-type="foreground" data-paroller-direction="vertical" style={{backgroundImage: 'url(images/icons/icon-1.png)'}} />
                <div className="patern-layer-two paroller" data-paroller-factor="0.40" data-paroller-factor-lg="-0.20" data-paroller-type="foreground" data-paroller-direction="vertical" style={{backgroundImage: 'url(images/icons/icon-2.png)'}} />
                <div className="circle-one" />
                <div className="circle-two" />
                    <div className="auto-container">
                        <div className="row clearfix">
                            {/* Content Side */}
                            <div className="content-side col-md-12 col-sm-12">
                                <div className="our-courses">
                                    {/* Options View */}
                                    {/* <div className="options-view">
                                        <div className="clearfix">
                                            <div className="pull-left">
                                                <h3>Featured Posts</h3>
                                            </div>
                                            <div className="pull-right clearfix">
                                           
                                                <div className="type-form">
                                                    <form method="post">
                                                      
                                                        <div className="form-group">
                                                            <select className="custom-select-box">
                                                                <option>Newest</option>
                                                                <option>Old</option>
                                                            </select>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div> */}
                                    
                                    <div className="row clearfix">
                                        {/* Cource Block Two */}
                                        {this.state.recentBlogs&&this.state.recentBlogs.map((item)=>(
                                            <div className="cource-block-two col-lg-4 col-md-6 col-sm-12">
                                                <div className="inner-box">
                                                    <div className="image">
                                                        <Link to={"/blog-details/"+item.page_name}><img src={server_link+"api/"+item.file} alt="Blog Title" /></Link>
                                                    </div>
                                                    <div className="lower-content">
                                                        <h5><Link to={"/blog-details/"+item.page_name}>{item.title}</Link></h5>
                                                        <div className="text" dangerouslySetInnerHTML={{__html:item.page_data.substr(0,50)+'...'}}/>
                                                        <div className="clearfix">
                                                            <div className="pull-left">
                                                                <div className="students">By Admin</div>
                                                            </div>
                                                            <div className="pull-right">
                                                                <div className="hours">{moment(item.time_stamp).format("MMM Do YY")}</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                      
                                        {/* <div className="cource-block-two col-lg-4 col-md-6 col-sm-12">
                                            <div className="inner-box">
                                                <div className="image">
                                                    <Link to={"/blog-details/blog-title"}><img src="/images/home/blog.png" alt="Blog Title" /></Link>
                                                </div>
                                                <div className="lower-content">
                                                    <h5><Link to={"/blog-details/blog-title"}>10 amazing web of demos Developers</Link></h5>
                                                    <div className="text">And meat blessed void a fruit gathered waters.</div>
                                                    <div className="clearfix">
                                                        <div className="pull-left">
                                                            <div className="students">By David Smith</div>
                                                        </div>
                                                        <div className="pull-right">
                                                            <div className="hours">11 Jan 20</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                      
                                        <div className="cource-block-two col-lg-4 col-md-6 col-sm-12">
                                            <div className="inner-box">
                                                <div className="image">
                                                    <Link to={"/blog-details/blog-title"}><img src="/images/home/blog.png" alt="Blog Title" /></Link>
                                                </div>
                                                <div className="lower-content">
                                                    <h5><Link to={"/blog-details/blog-title"}>10 amazing web of demos Developers</Link></h5>
                                                    <div className="text">And meat blessed void a fruit gathered waters.</div>
                                                    <div className="clearfix">
                                                        <div className="pull-left">
                                                            <div className="students">By David Smith</div>
                                                        </div>
                                                        <div className="pull-right">
                                                            <div className="hours">11 Jan 20</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                      
                                        <div className="cource-block-two col-lg-4 col-md-6 col-sm-12">
                                            <div className="inner-box">
                                                <div className="image">
                                                    <Link to={"/blog-details/blog-title"}><img src="/images/home/blog.png" alt="Blog Title" /></Link>
                                                </div>
                                                <div className="lower-content">
                                                    <h5><Link to={"/blog-details/blog-title"}>10 amazing web of demos Developers</Link></h5>
                                                    <div className="text">And meat blessed void a fruit gathered waters.</div>
                                                    <div className="clearfix">
                                                        <div className="pull-left">
                                                            <div className="students">By David Smith</div>
                                                        </div>
                                                        <div className="pull-right">
                                                            <div className="hours">11 Jan 20</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                      
                                        <div className="cource-block-two col-lg-4 col-md-6 col-sm-12">
                                            <div className="inner-box">
                                                <div className="image">
                                                    <Link to={"/blog-details/blog-title"}><img src="/images/home/blog.png" alt="Blog Title" /></Link>
                                                </div>
                                                <div className="lower-content">
                                                    <h5><Link to={"/blog-details/blog-title"}>10 amazing web of demos Developers</Link></h5>
                                                    <div className="text">And meat blessed void a fruit gathered waters.</div>
                                                    <div className="clearfix">
                                                        <div className="pull-left">
                                                            <div className="students">By David Smith</div>
                                                        </div>
                                                        <div className="pull-right">
                                                            <div className="hours">11 Jan 20</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                      
                                        <div className="cource-block-two col-lg-4 col-md-6 col-sm-12">
                                            <div className="inner-box">
                                                <div className="image">
                                                    <Link to={"/blog-details/blog-title"}><img src="/images/home/blog.png" alt="Blog Title" /></Link>
                                                </div>
                                                <div className="lower-content">
                                                    <h5><Link to={"/blog-details/blog-title"}>10 amazing web of demos Developers</Link></h5>
                                                    <div className="text">And meat blessed void a fruit gathered waters.</div>
                                                    <div className="clearfix">
                                                        <div className="pull-left">
                                                            <div className="students">By David Smith</div>
                                                        </div>
                                                        <div className="pull-right">
                                                            <div className="hours">11 Jan 20</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                      
                                        <div className="cource-block-two col-lg-4 col-md-6 col-sm-12">
                                            <div className="inner-box">
                                                <div className="image">
                                                    <Link to={"/blog-details/blog-title"}><img src="/images/home/blog.png" alt="Blog Title" /></Link>
                                                </div>
                                                <div className="lower-content">
                                                    <h5><Link to={"/blog-details/blog-title"}>10 amazing web of demos Developers</Link></h5>
                                                    <div className="text">And meat blessed void a fruit gathered waters.</div>
                                                    <div className="clearfix">
                                                        <div className="pull-left">
                                                            <div className="students">By David Smith</div>
                                                        </div>
                                                        <div className="pull-right">
                                                            <div className="hours">11 Jan 20</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                      
                                        <div className="cource-block-two col-lg-4 col-md-6 col-sm-12">
                                            <div className="inner-box">
                                                <div className="image">
                                                    <Link to={"/blog-details/blog-title"}><img src="/images/home/blog.png" alt="Blog Title" /></Link>
                                                </div>
                                                <div className="lower-content">
                                                    <h5><Link to={"/blog-details/blog-title"}>10 amazing web of demos Developers</Link></h5>
                                                    <div className="text">And meat blessed void a fruit gathered waters.</div>
                                                    <div className="clearfix">
                                                        <div className="pull-left">
                                                            <div className="students">By David Smith</div>
                                                        </div>
                                                        <div className="pull-right">
                                                            <div className="hours">11 Jan 20</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                      
                                        <div className="cource-block-two col-lg-4 col-md-6 col-sm-12">
                                            <div className="inner-box">
                                                <div className="image">
                                                    <Link to={"/blog-details/blog-title"}><img src="/images/home/blog.png" alt="Blog Title" /></Link>
                                                </div>
                                                <div className="lower-content">
                                                    <h5><Link to={"/blog-details/blog-title"}>10 amazing web of demos Developers</Link></h5>
                                                    <div className="text">And meat blessed void a fruit gathered waters.</div>
                                                    <div className="clearfix">
                                                        <div className="pull-left">
                                                            <div className="students">By David Smith</div>
                                                        </div>
                                                        <div className="pull-right">
                                                            <div className="hours">11 Jan 20</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    */}
                                    </div>
                                    {/* Post Share Options */}
                                    {/* <div className="styled-pagination">
                                        <ul className="clearfix">
                                            <li className="prev"><a href="#!"><span className="fa fa-angle-left" /> </a></li>
                                            <li><a href="#!">1</a></li>
                                            <li><a href="#!">2</a></li>
                                            <li className="active"><a href="#!">3</a></li>
                                            <li><a href="#!">4</a></li>
                                            <li><a href="#!">5</a></li>
                                            <li><a href="#!">6</a></li>
                                            <li><a href="#!">7</a></li>
                                            <li><a href="#!">8</a></li>
                                            <li className="next"><a href="#!"><span className="fa fa-angle-right" /> </a></li>
                                        </ul>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* <section className="popular-courses-section">
                    <div className="auto-container">
                        <div className="sec-title">
                            <h2>Most Popular Posts</h2>
                        </div>
                        <div className="row clearfix">
                           
                            <div className="cource-block-two col-lg-4 col-md-6 col-sm-12">
                                <div className="inner-box wow fadeInLeft" data-wow-delay="0ms" data-wow-duration="1500ms">
                                    <div className="image">
                                        <Link to={"/blog-details/blog-title"}><img src="/images/home/blog.png" alt="Blog Title" /></Link>
                                    </div>
                                    <div className="lower-content">
                                        <h5><Link to={"/blog-details/blog-title"}>How to Create and Use Bash Scripts</Link></h5>
                                        <div className="text">Replenish him third creature and meat blessed void a fruit gathered you’re, they’re two waters.</div>
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
                           
                            <div className="cource-block-two col-lg-4 col-md-6 col-sm-12">
                                <div className="inner-box wow fadeInUp" data-wow-delay="0ms" data-wow-duration="1500ms">
                                    <div className="image">
                                        <Link to={"/blog-details/blog-title"}><img src="/images/home/blog.png" alt="Blog Title" /></Link>
                                    </div>
                                    <div className="lower-content">
                                        <h5><Link to={"/blog-details/blog-title"}>How to Create and Use Bash Scripts</Link></h5>
                                        <div className="text">Replenish him third creature and meat blessed void a fruit gathered you’re, they’re two waters.</div>
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
                           
                            <div className="cource-block-two col-lg-4 col-md-6 col-sm-12">
                                <div className="inner-box wow fadeInRight" data-wow-delay="0ms" data-wow-duration="1500ms">
                                    <div className="image">
                                        <Link to={"/blog-details/blog-title"}><img src="/images/home/blog.png" alt="Blog Title" /></Link>
                                    </div>
                                    <div className="lower-content">
                                        <h5><Link to={"/blog-details/blog-title"}>How to Create and Use Bash Scripts</Link></h5>
                                        <div className="text">Replenish him third creature and meat blessed void a fruit gathered you’re, they’re two waters.</div>
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
                </section> */}
            </React.Fragment>
        );
    }
}

class BlogDetails extends Component{
    constructor(props){
        super();
        const base = document.querySelector('base');
        base.setAttribute('href', '../');
        this.state={
            blog_link:props.match.params.token,
            blogsDetails:{}
        }
        console.log(props)
    }

    componentDidMount(){
        window.scrollTo(0, 0)
        this.fetch_blog_details()
    }

    componentDidUpdate(prevProps) {
        if (this.props.path === this.props.location.pathname && this.props.location.pathname !== prevProps.location.pathname) {
            window.scrollTo(0, 0)
        }
    }
    
    componentWillUnmount(){
        const base = document.querySelector('base');
        base.setAttribute('href', '');
    }
    fetch_blog_details=()=>{
        let formData6 = new FormData();
		formData6.append('get_page_data_link', this.state.blog_link)
        axios({
			method: 'post',
			url: api_link+'EditSiteFetch.php',
			data: formData6,
		})
		.then(response => response.data)
        .then((data) => {
             
            this.setState({ blogsDetails: data})    
         })
		.catch(function (response) {
			//handle error
			console.log(response)
		}); 
    }
    
    render(){
        return(
            <React.Fragment>
                <section className="page-title">
                    <div className="auto-container">
                        <h1>Blogs Details</h1>
                       
                    </div>
                </section>
                
                <div className="sidebar-page-container">
                    <div className="patern-layer-one paroller" data-paroller-factor="0.40" data-paroller-factor-lg="0.20" data-paroller-type="foreground" data-paroller-direction="vertical" style={{backgroundImage: 'url(images/icons/icon-1.png)'}} />
                    <div className="patern-layer-two paroller" data-paroller-factor="0.40" data-paroller-factor-lg="-0.20" data-paroller-type="foreground" data-paroller-direction="vertical" style={{backgroundImage: 'url(images/icons/icon-2.png)'}} />
                    <div className="circle-one" />
                    <div className="circle-two" />
                    <div className="auto-container">
                        <div className="row clearfix">
                            <div className="content-side blog-detail-column col-md-12 col-sm-12">
                                <div className="blog-detail">
                                    <div className="inner-box">
                                        <h2>{this.state.blogsDetails.title}</h2>
                                        <ul className="author-info">
                                            <li>By Admin</li>
                                            <li><span className="theme_color">{moment(this.state.blogsDetails.time_stamp).format("MMM Do YY")}</span></li>
                                            {/* <li>15 Commnets</li>/ */}
                                        </ul>
                                        <div className="image">
                                            <img src={server_link+"api/"+this.state.blogsDetails.file} alt="Blog Title" />
                                        </div>
                                        <h4>{this.state.blogsDetails.title}</h4>
                                        <p dangerouslySetInnerHTML={{__html: this.state.blogsDetails.page_data}}></p>
                                        
                                        {/* <div className="social-box">
                                            <span>Share this article on </span>
                                            <a href="#!" className="fa fa-facebook-square" />
                                            <a href="#!" className="fa fa-twitter-square" />
                                            <a href="#!" className="fa fa-linkedin-square" />
                                            <a href="#!" className="fa fa-github" />
                                        </div> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

/*class Faq extends Component{
  constructor()
  {
      super();
      this.state = {
        faqs: []
      }
    
      this.childKey = 0;
      //FETCH CATEGORIES
      let formData2 = new FormData();
      formData2.append('fetch_faq', "all")
      axios({
          method: 'post',
          url: api_link+'SetupFetch.php',
          data: formData2,
      })
      .then(response => response.data)
      .then((data) => {
          this.setState({
            faqs: data,
          })
       })
      .catch(function (response) {
          //handle error
          console.log(response)
      }); 
  }
  
  render(){
    return(
      <React.Fragment>
            <div className="page-heading">
                <div className="breadcrumbs">
                    <div className="container">
                        <div className="row">
                            <div className="page-title">
                                <h2>FAQ</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="main-container col1-layout wow bounceInUp animated animated" style={{visibility: 'visible'}}>
              <div className="main container">
                <div className="container">
                  <h2>Frequently Asked Questions</h2>
                  <hr />
                  <div className="bs-example">
                    <div className="panel-group" id="accordion">
                      {this.state.faqs.map((f, key) => (
                        
                          <div className="panel panel-default">
                            <div className="panel-heading" style={{backgroundColor: '#FFEA00'}} data-toggle="collapse" data-parent="#accordion" href={"#collapse"+key}>
                              <h4 className="panel-title">
                                  {f.question}
                              </h4>
                            </div>
                            <div id={"collapse"+key} className="panel-collapse collapse">
                              <div className="panel-body">
                                <p>{f.answer}</p>
                              </div>
                            </div>
                          </div>
                        
                      ))}
                      
                    </div>
                  </div>
                </div>
              </div>
            </div>
      </React.Fragment>
    );
  }
}

class OrderResponse extends Component {
    
  constructor(props) {
        super();
        this.state = {
            response: props.match.params.response,
        }
        this.childKey = 0;
        
        let formData = new FormData();
        formData.append('order_id_for_response', cart_items.order_id)
        formData.append('order_status_for_response', props.match.params.response)
        
      
        axios({
            method: 'post',
            url: api_link+'CreateOrdersAjax.php',
            data: formData,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
        .then(response => response.data)
        .then((data) => { 
            //handle success
        });
    }
    
    UNSAFE_componentWillReceiveProps(props) {
        if (this.state.name !== props.match.params.name) {
         
            this.setState({
                id: props.match.params.token,
                name: props.match.params.name,
            })
        }
      }
    
    
  render() {
    ++this.childKey;
	
    if(this.state.response === "success")
    {
        return (
            <div className="main-container col2-right-layout" style={{marginTop: '150px'}}>
                <div className="main container">
                  <div className="row">
                    <div className="col-md-3" />
                    <div className="col-md-6">
                      <div className="alert alert-success">
                        <strong>Success ! Your order #{cart_items.order_id} has been successfully placed.</strong>
                      </div>
                    </div>
                    <div className="col-md-3" />
                  </div>
                </div>
            </div>
        );
    }
    else
    {
        return (
            <div className="main-container col2-right-layout" style={{marginTop: '150px'}}>
                <div className="main container">
                  <div className="row">
                    <div className="col-md-3" />
                    <div className="col-md-6">
                      <div className="alert alert-danger">
                        <strong>Error! Your order could not be placed.</strong>
                      </div>
                    </div>
                    <div className="col-md-3" />
                  </div>
                </div>
            </div>
        );
    }
  }
}

class GatewayResponse extends Component {
    
  constructor(props) {
        super();
        this.state={
          payment_id: this.findGetParameter("payment_id"),
          payment_status: this.findGetParameter("payment_status"),
          payment_request_id: this.findGetParameter("payment_request_id"),
          o_id: '',
        }
    
        this.childKey = 0;
    
        if(this.state.payment_status === "Credit")
        {
            //FETCH PAYMENT DETAILS AND UPDATE STATUS
            let formData = new FormData();
            formData.append('payment_details_fid', this.state.payment_request_id)
            formData.append('payment_details_sid', this.state.payment_id)
            axios({
                method: 'post',
                url: api_link+'CreateOrdersAjax.php',
                data: formData,
            })
            .then(response => response.data)
            .then((data) => {
                  var amount=data['payment_request']['amount'];
                  var email=data['payment_request']['email'];
                  var order_id=data['payment_request']['purpose'].replace("Market Boi Order #", "");
                  //var status=data['payment_request']['status'];
              
                  this.setState({
                    o_id: order_id
                  })
                
                  cart_items.order_id=order_id;

                  //UPDATE ORDER FOR SUCCESS
                  let formData5 = new FormData();
                  formData5.append('gateway_order_id', order_id)
                  formData5.append('gateway_order_amount', amount)
                  formData5.append('gateway_order_email', email)
              
                  axios({
                      method: 'post',
                      url: api_link+'CreateOrdersAjax.php',
                      data: formData5,
                  })
                  .then(response => response.data)
                  .then((data) => {
                      
                   })
                  .catch(function (response) {
                      //handle error
                      console.log(response)
                  });               
             })
            .catch(function (response) {
                //handle error
                console.log(response)
            }); 
        }
        else
        {
            
        }
    }
  
  findGetParameter(parameterName) {
    var result = null,
        tmp = [];
    var items = window.location.search.substr(1).split("&");
    for (var index = 0; index < items.length; index++) {
        tmp = items[index].split("=");
        if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
    }
    return result;
  }
    
    
  render() {
    ++this.childKey;
	
    if(this.state.payment_status === "Credit")
    {
        return (
            <div className="main-container col2-right-layout" style={{marginTop: '150px'}}>
                <div className="main container">
                  <div className="row">
                    <div className="col-md-3" />
                    <div className="col-md-6">
                      <div className="alert alert-success">
                        <strong>Success ! Your order #{this.state.o_id} has been successfully placed.</strong>
                      </div>
                    </div>
                    <div className="col-md-3" />
                  </div>
                </div>
            </div>
        );
    }
    else
    {
        return (
            <div className="main-container col2-right-layout" style={{marginTop: '150px'}}>
                <div className="main container">
                  <div className="row">
                    <div className="col-md-3" />
                    <div className="col-md-6">
                      <div className="alert alert-danger">
                        <strong>Error! Your order could not be placed.</strong>
                      </div>
                    </div>
                    <div className="col-md-3" />
                  </div>
                </div>
            </div>
        );
    }
  }
}*/

export {
  Blogs, 
  BlogDetails, 
  Error, 
  Pages, 
  ContactUs,
}