import React, {Component } from 'react';
import ReactDOM from 'react-dom';
import { Link, Route, Switch, BrowserRouter  } from "react-router-dom";
import axios from 'axios';
import $ from 'jquery';

import Home from './Home';

const responsive = {
        0: {
            items: 3,
        },
        450: {
            items: 3,
        },
        600: {
            items: 4,
        },
        1000: {
            items: 6,
        },
    };

//const api_link="/api/";
const api_link="http://drive.local/react-lms/api/";

export const LoginUserAuth = {
  isAuthenticated: false,
};

//FOR AGENT
export const LoginAuth = {
  isAuthenticated: false,
};

export const dynamic_pages = {
  pages: [],
};

export const user_details={
  details: [],
};

export const last_order={
  details: [],
};

export const cart_items={
      items: [],
      price: 0,
};

export const createCookie = (name, value, days) => {
        var expires;
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toGMTString();
        }
        else {
            expires = "";
        }
        document.cookie = name + "=" + value + expires + "; path=/";
}

export const  getCookie = (c_name) => {
        if (document.cookie.length > 0) {
            var c_start = document.cookie.indexOf(c_name + "=");
            if (c_start !== -1) {
                c_start = c_start + c_name.length + 1;
                var c_end = document.cookie.indexOf(";", c_start);
                if (c_end === -1) {
                    c_end = document.cookie.length;
                }
                return unescape(document.cookie.substring(c_start, c_end));
            }
        }
        return "";
}

export const removeItem = (product_id) => {
    
//    var final_arr=getCookie("cart_items").split("|");
    var final_arr=cart_items.items.slice();
    
    var count_empty=0;
    for(var p=0; p<final_arr.length;p++)
    {
        if (typeof final_arr[p] == 'undefined') {count_empty++;}
    }
    if(count_empty === final_arr.length-1)
    {
        cart_items.items=[];
        cart_items.price=0;
//        createCookie("cart_items",cart_items.items.join("|"),30)
//        createCookie("cart_price",cart_items.price,30)
    }
    else
    {
        cart_items.price=cart_items.price-window.parseInt(cart_items.items[product_id]['final_price']);
        final_arr.splice(product_id,1);

        cart_items.items=final_arr;
        
//        createCookie("cart_items",cart_items.items.join("|"),30)
//        createCookie("cart_price",cart_items.price,30)
    }
}

export const addItem = (product_id,product_quantity,quantity_type,price,final_price, arr) => {
    
//    var final_arr=getCookie("cart_items").split("|");
    var final_arr=cart_items.items.slice();
    //var count_empty=0;
    
    if (typeof final_arr[product_id] !== 'undefined') {
        cart_items.price-=window.parseInt(final_arr[product_id]['final_price']);
        cart_items.price+=window.parseInt(arr['final_price']);
        final_arr[product_id]=arr;  
        cart_items.items=final_arr;  
    }
    else
    {
        final_arr[product_id]=arr;  
        cart_items.items=final_arr;
        cart_items.price+=window.parseInt(arr['final_price']);
    }
    
//    final_arr[product_id]=arr;  
//    cart_items.items=final_arr;
//    cart_items.price+=window.parseInt(final_price);
//
//    console.log(cart_items.items)
//
//    createCookie("cart_items",cart_items.items.join("|"),30)
//    createCookie("cart_price",cart_items.price,30)
//
//    console.log(getCookie("cart_items").split("|"))
}

class Header extends Component{
    
    /*constructor(props){
        super(props);
        this.state={
            side_menu: true,
            refresh: true,
            categories: [],
            shop_details: [],
			default_address_type:'',
        }
        
        var obj=this;
        
        //FETCH CATEGORIES
        let formData2 = new FormData();
		formData2.append('get_categories_for_home', "get_categories")
        axios({
			method: 'post',
			url: api_link+'CategoriesFetch.php',
			data: formData2,
		})
		.then(response => response.data)
        .then((data) => {
            obj.setState({ 
              categories: data,
            })
         })
		.catch(function (response) {
			//handle error
			console.log(response)
		}); 
        
        //GET SHOP DETAILS
        let profileForm=new FormData();
        profileForm.append("profile","get");
        axios({
            method: 'post',
            url: api_link+'SetupFetch.php',
            data: profileForm,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
        .then(response => response.data)
        .then((data) => {
            this.setState({ 
                shop_details: data[0],
            })
         })
    }
        
    componentDidMount(){
		var obj=this;
		//FETCH DEFAULT ADDRESS TYPE
        let formData = new FormData();
		formData.append('default_address', window.atob(window.sessionStorage.getItem(window.btoa("user_id"))))
        axios({
			method: 'post',
			url: api_link+'CustomersFetch.php',
			data: formData,
		})
		.then(response => response.data)
        .then((data) => {
            obj.setState({ 
              default_address_type: data,
            })
         })
		.catch(function (response) {
			//handle error
			console.log(response)
		}); 
        
        let count=0;
                
        $.each(cart_items.items, function(key, value){
            if (value === "" || value == null){
            }
            else
            {
                count++;
            }
        });      

        $("#number_of_items_in_cart").html(count);
    }
    
    handleMobileMenu(){
        
        if(this.state.side_menu)
        {
            $("#mobile-menu").attr("style","left: 0px; width: 250px; height: 2015px; display: block; overflow: hidden;")        
            $("#page").attr("style","left: 250px;")        
            this.setState({
                side_menu: false
            })
        }
        else
        {
            $("#mobile-menu").attr("style","")        
            $("#page").attr("style","")        
            this.setState({
                side_menu: true
            })
        }
    }*/
    
	render()
    {
		//var obj=this;
        /*const css=`@media (max-width:600px) {
            .GlobalNavSearch{
                display: none !important;
            }
        }
        @media only screen and (max-width: 479px) and (min-width: 320px){.logo img{width:100px !important;}}
        `;
		$(".mobile-menu a").click(function(){
			$("#mobile-menu").attr("style","")        
            $("#page").attr("style","")        
            obj.setState({
                side_menu: true
            })
		});*/
		
        return(
			<header className="main-header header-style-one">
				
				<div className="header-top">
					<div className="auto-container">
						<div className="clearfix">
							{/* Top Left */}
							<div className="top-left pull-left clearfix">
								{/* Info List */}
								<ul className="info-list">
									<li><span>Call Us:</span><a href="tel:+123-456-7890"> +1 (800) 123-4567</a></li>
									<li><span>Email Us:</span><a href="mailto:info@yourcompany.com"> info@yourcompany.com</a></li>
								</ul>
							</div>
							{/* Top Right */}
							<div className="top-right pull-right clearfix">
								{/* Login Nav */}
								<ul className="login-nav">
									<li><a href="login.html">Log In</a></li>
									<li><a href="register.html">Register</a></li>
								</ul>
							</div>
						</div>
					</div>
				</div>
				
				<div className="header-upper">
					<div className="auto-container">
						<div className="clearfix">
							<div className="pull-left logo-box">
								<div className="logo"><a href="index.html"><img src="https://via.placeholder.com/230x60" alt="" title="Bootcamp" /></a></div>
							</div>
							<div className="nav-outer clearfix">
								{/*Mobile Navigation Toggler*/}
								<div className="mobile-nav-toggler"><span className="icon flaticon-menu" /></div>
								{/* Main Menu */}
								<nav className="main-menu show navbar-expand-md">
									<div className="navbar-header">
										<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
										<span className="icon-bar" />
										<span className="icon-bar" />
										<span className="icon-bar" />
										</button>
									</div>
									<div className="navbar-collapse collapse clearfix" id="navbarSupportedContent">
										<ul className="navigation clearfix">
											<li>
                                                <Link to={"/home"}>Home</Link>
											</li>
											<li className="dropdown">
												<a href="#">Pages</a>
												<ul>
													<li><a href="price.html">Pricing</a></li>
													<li><a href="login.html">Login</a></li>
													<li><a href="register.html">Register</a></li>
													<li><a href="privacy.html">Privacy Policy</a></li>
													<li><a href="comming-soon.html">Coming Soon</a></li>
												</ul>
											</li>
											<li className="dropdown">
												<a href="#">Courses</a>
												<ul>
													<li><a href="course.html">Courses As Grid</a></li>
													<li><a href="course-list.html">Courses As List</a></li>
													<li><a href="course-path.html">Course Topics</a></li>
													<li><a href="course-lesson.html">Course Lesson</a></li>
													<li><a href="course-detail.html">Course Details</a></li>
												</ul>
											</li>
											<li className="dropdown">
												<a href="#">Books</a>
												<ul>
													<li><a href="books.html">Books</a></li>
													<li><a href="books-detail.html">Book Detail</a></li>
												</ul>
											</li>
											<li className="dropdown">
												<a href="#">Profiles</a>
												<ul>
													<li><a href="intro-profile.html">Instructor Profile</a></li>
													<li><a href="student-profile.html">Student Profile</a></li>
													<li><a href="edit-profile.html">Edit Profile</a></li>
												</ul>
											</li>
											<li className="dropdown">
												<a href="#">Blog</a>
												<ul>
													<li><a href="blog.html">Blog</a></li>
													<li><a href="blog-detail.html">Blog Detail</a></li>
													<li><a href="error.html">Not Found / 404</a></li>
												</ul>
											</li>
											<li><a href="contact.html">Contact Us</a></li>
										</ul>
									</div>
								</nav>
							</div>
						</div>
					</div>
				</div>
				
				<div className="mobile-menu">
					<div className="menu-backdrop" />
						<div className="close-btn"><span className="icon flaticon-multiply" /></div>
						<nav className="menu-box">
							<div className="nav-logo"><a href="index.html"><img src="https://via.placeholder.com/230x60" alt="" title /></a></div>
							<div className="menu-outer">
							{/*Here Menu Will Come Automatically Via Javascript / Same Menu as in Header*/}
						</div>
					</nav>
				</div>
			</header>
	   );
    }
}

class Index extends Component{
    
    /*constructor() {
        super();
        this.state = {
            sliders: [],
            offers: [],
            categories: [],
            brands: [],
            home_kitchen: [],
        };
      
        var obj = this
        
        //FETCH SLIDER
        let formData = new FormData();
		formData.append('sliders_for_home', "get_sliders")
        axios({
			method: 'post',
			url: api_link+'EditSiteFetch.php',
			data: formData,
		})
		.then(response => response.data)
        .then((data) => {
            obj.setState({ 
              sliders: data,
            })
         })
		.catch(function (response) {
			//handle error
			console.log(response)
		});   
        
        //FETCH HOT OFFER PRODUCTS
        let formData1 = new FormData();
		formData1.append('hot_offer_products', "get_offers")
        axios({
			method: 'post',
			url: api_link+'ProductsFetch.php',
			data: formData1,
		})
		.then(response => response.data)
        .then((data) => {
            obj.setState({ 
              offers: data,
            })
         })
		.catch(function (response) {
			//handle error
			console.log(response)
		});   
        
        //FETCH CATEGORIES
        let formData2 = new FormData();
		formData2.append('get_categories_for_home', "get_categories")
        axios({
			method: 'post',
			url: api_link+'CategoriesFetch.php',
			data: formData2,
		})
		.then(response => response.data)
        .then((data) => {
            obj.setState({ 
              categories: data,
            })
         })
		.catch(function (response) {
			//handle error
			console.log(response)
		});   
        
        //FETCH BRANDS
        let formData3 = new FormData();
		formData3.append('brands_for_home', "brands")
        axios({
			method: 'post',
			url: api_link+'CategoriesFetch.php',
			data: formData3,
		})
		.then(response => response.data)
        .then((data) => {
            obj.setState({ 
              brands: data,
            })
         })
		.catch(function (response) {
			//handle error
			console.log(response)
		});   
        
        //FETCH HOME AND KITCHEN
        let formData4 = new FormData();
		formData4.append('home_and_kitchen_for_home', "home")
        axios({
			method: 'post',
			url: api_link+'CategoriesFetch.php',
			data: formData4,
		})
		.then(response => response.data)
        .then((data) => {
            obj.setState({ 
              home_kitchen: data,
            })
         })
		.catch(function (response) {
			//handle error
			console.log(response)
		});   
    }*/
    
    componentDidMount(){
        $("script[src='js/script.js']").remove();
        const script = document.createElement("script");
        script.src = "js/script.js";
        document.body.appendChild(script);
    }
    
    render(){
		var i=0;
        return(
            <React.Fragment>
                <section className="banner-section">
                    <div className="pattern-layer" style={{backgroundImage: 'url(images/background/1.png)'}} />
                    <div className="auto-container">
                        {/* Content Boxed */}
                        <div className="content-boxed">
                            <div className="inner-column">
                                <h1>Learn Math, Science, English and Test <br /> Prep from our Experts</h1>
                                <div className="buttons-box">
                                    <a href="course.html" className="theme-btn btn-style-one"><span className="txt">Get Stared <i className="fa fa-angle-right" /></span></a>
                                    <a href="course.html" className="theme-btn btn-style-two"><span className="txt">All Courses <i className="fa fa-angle-right" /></span></a>
                                </div>
                            </div>
                        </div>
                        {/* Image Boxed */}
                        <div className="image titlt" data-tilt data-tilt-max={4}>
                            <a href="https://via.placeholder.com/1180x504" data-fancybox="banner" data-caption className><img src="https://via.placeholder.com/1180x504" alt="" /></a>
                        </div>
                        {/* Search Boxed */}
                        <div className="search-boxed">
                            <div className="search-box">
                                <form method="post" action="contact.html">
                                    <div className="form-group">
                                        <input type="search" name="search-field" defaultValue placeholder="What do you want to learn?" required />
                                        <button type="submit"><span className="icon fa fa-search" /></button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
                {/* End Banner Section */}
                {/* Education Section */}
                <section className="education-section">
                    <div className="patern-layer-one paroller" data-paroller-factor="0.60" data-paroller-factor-lg="0.20" data-paroller-type="foreground" data-paroller-direction="vertical" style={{backgroundImage: 'url(images/icons/icon-1.png)'}} />
                    <div className="patern-layer-two paroller" data-paroller-factor="0.60" data-paroller-factor-lg="-0.20" data-paroller-type="foreground" data-paroller-direction="vertical" style={{backgroundImage: 'url(images/icons/icon-2.png)'}} />
                    <div className="auto-container">
                        <div className="row clearfix">
                            {/* Image Column */}
                            <div className="image-column col-lg-6 col-md-12 col-sm-12">
                                <div className="inner-column parallax-scene-1">
                                    <div className="image parallax-layer" data-depth="0.30">
                                        <img src="https://via.placeholder.com/580x475" alt="" />
                                    </div>
                                </div>
                            </div>
                            {/* Content Column */}
                            <div className="content-column col-lg-6 col-md-12 col-sm-12">
                                <div className="inner-column">
                                    <h2>Our education system <br /> works for you</h2>
                                    <div className="text">Replenish him third creature and meat blessed void a fruit gathered you’re, they’re two waters own morning gathered greater shall had behold had seed.</div>
                                    <a href="course.html" className="theme-btn btn-style-two"><span className="txt">Learn More <i className="fa fa-angle-right" /></span></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* End Education Section */}
                {/* Courses Section */}
                <section className="courses-section">
                    <div className="auto-container">
                        <div className="row clearfix">
                            {/* Title Column */}
                            <div className="title-column col-lg-4 col-md-12 col-sm-12">
                                <div className="inner-column">
                                    {/* Sec Title */}
                                    <div className="sec-title">
                                        <h2>Our top courses</h2>
                                        <div className="text">Replenish him third creature and meat blessed void a fruit gathered you’re, they’re two waters own morning gathered.</div>
                                    </div>
                                    <a href="course.html" className="theme-btn btn-style-three"><span className="txt">Get Stared <i className="fa fa-angle-right" /></span></a>
                                </div>
                            </div>
                            {/* Cource Block */}
                            <div className="cource-block col-lg-4 col-md-6 col-sm-12">
                                <div className="inner-box">
                                    <div className="image">
                                        <a href="course-detail.html"><img src="https://via.placeholder.com/370x253" alt="" /></a>
                                    </div>
                                    <div className="lower-content">
                                        <div className="clearfix">
                                            <div className="pull-left">
                                                <h5><a href="course-detail.html">Computer Science</a></h5>
                                            </div>
                                            <div className="pull-right">
                                                <div className="price">$140</div>
                                            </div>
                                        </div>
                                        <div className="text">Replenish him third creature and meat blessed void a fruit gathered you’re, they’re two waters.</div>
                                        <div className="clearfix">
                                            <div className="pull-left">
                                                <div className="students">125 Student</div>
                                            </div>
                                            <div className="pull-right">
                                                <a href="course-detail.html" className="enroll">Enroll Now</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Cource Block */}
                            <div className="cource-block col-lg-4 col-md-6 col-sm-12">
                                <div className="inner-box">
                                    <div className="image">
                                        <a href="course-detail.html"><img src="https://via.placeholder.com/370x253" alt="" /></a>
                                    </div>
                                    <div className="lower-content">
                                        <div className="clearfix">
                                            <div className="pull-left">
                                                <h5><a href="course-detail.html">Data Science</a></h5>
                                            </div>
                                            <div className="pull-right">
                                                <div className="price">$140</div>
                                            </div>
                                        </div>
                                        <div className="text">Replenish him third creature and meat blessed void a fruit gathered you’re, they’re two waters.</div>
                                        <div className="clearfix">
                                            <div className="pull-left">
                                                <div className="students">125 Student</div>
                                            </div>
                                            <div className="pull-right">
                                                <a href="course-detail.html" className="enroll">Enroll Now</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Cource Block */}
                            <div className="cource-block col-lg-4 col-md-6 col-sm-12">
                                <div className="inner-box">
                                    <div className="image">
                                        <a href="course-detail.html"><img src="https://via.placeholder.com/370x253" alt="" /></a>
                                    </div>
                                    <div className="lower-content">
                                        <div className="clearfix">
                                            <div className="pull-left">
                                                <h5><a href="course-detail.html">Development Course</a></h5>
                                            </div>
                                            <div className="pull-right">
                                                <div className="price">$140</div>
                                            </div>
                                        </div>
                                        <div className="text">Replenish him third creature and meat blessed void a fruit gathered you’re, they’re two waters.</div>
                                        <div className="clearfix">
                                            <div className="pull-left">
                                                <div className="students">125 Student</div>
                                            </div>
                                            <div className="pull-right">
                                                <a href="course-detail.html" className="enroll">Enroll Now</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Cource Block */}
                            <div className="cource-block col-lg-4 col-md-6 col-sm-12">
                                <div className="inner-box">
                                    <div className="image">
                                        <a href="course-detail.html"><img src="https://via.placeholder.com/370x253" alt="" /></a>
                                    </div>
                                    <div className="lower-content">
                                        <div className="clearfix">
                                            <div className="pull-left">
                                                <h5><a href="course-detail.html">Language Course</a></h5>
                                            </div>
                                            <div className="pull-right">
                                                <div className="price">$140</div>
                                            </div>
                                        </div>
                                        <div className="text">Replenish him third creature and meat blessed void a fruit gathered you’re, they’re two waters.</div>
                                        <div className="clearfix">
                                            <div className="pull-left">
                                                <div className="students">125 Student</div>
                                            </div>
                                            <div className="pull-right">
                                                <a href="course-detail.html" className="enroll">Enroll Now</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Cource Block */}
                            <div className="cource-block col-lg-4 col-md-6 col-sm-12">
                                <div className="inner-box">
                                    <div className="image">
                                        <a href="course-detail.html"><img src="https://via.placeholder.com/370x253" alt="" /></a>
                                    </div>
                                    <div className="lower-content">
                                        <div className="clearfix">
                                            <div className="pull-left">
                                                <h5><a href="course-detail.html">Business Course</a></h5>
                                            </div>
                                            <div className="pull-right">
                                                <div className="price">$140</div>
                                            </div>
                                        </div>
                                        <div className="text">Replenish him third creature and meat blessed void a fruit gathered you’re, they’re two waters.</div>
                                        <div className="clearfix">
                                            <div className="pull-left">
                                                <div className="students">125 Student</div>
                                            </div>
                                            <div className="pull-right">
                                                <a href="course-detail.html" className="enroll">Enroll Now</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* End Courses Section */}
                {/* Call To Action Section */}
                <section className="call-to-action-section">
                    <div className="auto-container">
                        <div className="row clearfix">
                            {/* Title Column */}
                            <div className="title-column col-lg-6 col-md-12 col-sm-12">
                                <div className="inner-column">
                                    {/* Sec Title */}
                                    <div className="sec-title">
                                        <h2>Live the experience <br /> learn at your own pace</h2>
                                        <div className="text">Replenish him third creature and meat blessed void a fruit gathered you’re, they’re two waters.</div>
                                    </div>
                                </div>
                            </div>
                            {/* Form Column */}
                            <div className="form-column col-lg-6 col-md-12 col-sm-12">
                                <div className="inner-column">
                                    <div className="help">For Help?</div>
                                    <div className="search-box">
                                        <form method="post" action="contact.html">
                                            <div className="form-group">
                                                <input type="search" name="search-field" defaultValue placeholder="What do you want to learn?" required />
                                                <button type="submit"><span className="icon fa fa-search" /></button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* End Call To Action Section */}
                {/* Video Section */}
                <section className="video-section" style={{backgroundImage: 'url(https://via.placeholder.com/1920x1200)'}}>
                <div className="auto-container">
                    <a href="https://www.youtube.com/watch?v=kxPCFljwJws" className="lightbox-image video-box"><span className="fa fa-play"><i className="ripple" /></span></a>
                    <h4>Watch Intro Video</h4>
                </div>
                </section>
                {/* End Video Section */}
                {/* Achievement Section */}
                <section className="achievements-section">
                    <div className="auto-container">
                        {/* Sec Title */}
                        <div className="sec-title centered">
                            <h2>Our achievements</h2>
                            <div className="text">Replenish him third creature and meat blessed void a fruit gathered you’re, they’re <br /> two waters own morning gathered greater shall had behold had seed.</div>
                        </div>
                        {/* Fact Counter */}
                        <div className="fact-counter">
                            <div className="row clearfix">
                                {/* Column */}
                                <div className="column counter-column col-lg-4 col-md-6 col-sm-12">
                                    <div className="inner wow fadeInLeft" data-wow-delay="0ms" data-wow-duration="1500ms">
                                        <div className="content">
                                            <div className="icon-box">
                                                <span className="icon flaticon-course" />
                                            </div>
                                            <h4 className="counter-title">Total Courses</h4>
                                            <div className="count-outer count-box">
                                                <span className="count-text" data-speed={2000} data-stop={50}>0</span>+
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* Column */}
                                <div className="column counter-column col-lg-4 col-md-6 col-sm-12">
                                    <div className="inner wow fadeInUp" data-wow-delay="0ms" data-wow-duration="1500ms">
                                        <div className="content">
                                            <div className="icon-box">
                                                <span className="icon flaticon-course-1" />
                                            </div>
                                            <h4 className="counter-title">Total Student</h4>
                                            <div className="count-outer count-box alternate">
                                                <span className="count-text" data-speed={3000} data-stop={45}>0</span>K+
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* Column */}
                                <div className="column counter-column col-lg-4 col-md-6 col-sm-12">
                                    <div className="inner wow fadeInRight" data-wow-delay="0ms" data-wow-duration="1500ms">
                                        <div className="content">
                                            <div className="icon-box">
                                                <span className="icon flaticon-world" />
                                            </div>
                                            <h4 className="counter-title">Global Position</h4>
                                            <div className="count-outer count-box">
                                                <span className="count-text" data-speed={4000} data-stop={115}>0</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* End Achievement Section */}
                {/* Fluid Section One */}
                <section className="fluid-section-one">
                    <div className="patern-layer-one paroller" data-paroller-factor="0.60" data-paroller-factor-lg="0.20" data-paroller-type="foreground" data-paroller-direction="vertical" style={{backgroundImage: 'url(images/icons/icon-1.png)'}} />
                    <div className="outer-container clearfix">
                        {/* Image Column */}
                        <div className="image-column" style={{backgroundImage: 'url(https://via.placeholder.com/845x830)'}}>
                        <figure className="image-box"><img src="https://via.placeholder.com/845x830" alt="" /></figure>
                    </div>
                    {/* Content Column */}
                    <div className="content-column">
                        <div className="inner-column">
                            <div className="clearfix">
                                <div className="pull-left">
                                    <h2>Upcoming events</h2>
                                </div>
                                <div className="pull-right">
                                    <a href="course-detail.html" className="events">All Events</a>
                                </div>
                            </div>
                            {/* Blocks Outer */}
                            <div className="blocks-outer">
                                {/* Event Block */}
                                <div className="event-block">
                                    <div className="inner-box">
                                        <div className="clearfix">
                                            {/* Event Date */}
                                            <div className="event-date clearfix"><span className="date">21</span>JAN 2020</div>
                                            {/* Event List */}
                                            <ul className="event-list">
                                                <li><a href="course-detail.html">ART &amp; DESIGN</a></li>
                                                <li><a href="course-detail.html">PAINTING</a></li>
                                            </ul>
                                        </div>
                                        <h3><a href="course-detail.html">Workshop on UI/ UX</a></h3>
                                    </div>
                                </div>
                                {/* Event Block */}
                                <div className="event-block">
                                    <div className="inner-box">
                                        <div className="clearfix">
                                            {/* Event Date */}
                                            <div className="event-date clearfix"><span className="date">15</span>Mar 2020</div>
                                            {/* Event List */}
                                            <ul className="event-list">
                                                <li><a href="course-detail.html">ART &amp; DESIGN</a></li>
                                                <li><a href="course-detail.html">PAINTING</a></li>
                                            </ul>
                                        </div>
                                        <h3><a href="course-detail.html">Amsterdam art weekend</a></h3>
                                    </div>
                                </div>
                                {/* Event Block */}
                                <div className="event-block">
                                    <div className="inner-box">
                                        <div className="clearfix">
                                            {/* Event Date */}
                                            <div className="event-date clearfix"><span className="date">21</span>mar 2020</div>
                                            {/* Event List */}
                                            <ul className="event-list">
                                                <li><a href="course-detail.html">ART &amp; DESIGN</a></li>
                                                <li><a href="course-detail.html">PAINTING</a></li>
                                            </ul>
                                        </div>
                                        <h3><a href="course-detail.html">Outside fashion - Group exhibition</a></h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                </section>
                {/* News Section */}
                <section className="news-section">
                    <div className="auto-container">
                        <div className="row clearfix">
                            {/* Title Column */}
                            <div className="title-column col-lg-6 col-md-12 col-sm-12">
                                <div className="inner-column">
                                    {/* Sec Title */}
                                    <div className="sec-title">
                                        <h2>Our Latest blog posts</h2>
                                        <div className="text">Replenish him third creature and meat blessed void a fruit gathered you’re, they’re two waters own morning gathered greater shall had behold had seed.</div>
                                    </div>
                                    <a href="course.html" className="theme-btn btn-style-three"><span className="txt">All Blog Post <i className="fa fa-angle-right" /></span></a>
                                </div>
                            </div>
                            {/* News Column */}
                            <div className="news-block col-lg-6 col-md-12 col-sm-12">
                                <div className="inner-box">
                                    <div className="image">
                                        <a href="blog-detail.html"><img src="https://via.placeholder.com/500x260" alt="" /></a>
                                    </div>
                                    <div className="lower-content">
                                        <h3><a href="blog-detail.html">To apply signal detection theory</a></h3>
                                        <div className="text">Replenish him third creature and meat blessed void a fruit gathered you’re, they’re two waters</div>
                                        <a href="blog-detail.html" className="read-more">Continue Reading</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* End News Section */}
                {/* Testimonial Section */}
                <section className="testimonial-section">
                    <div className="auto-container">
                    {/* Sec Title */}
                    <div className="sec-title centered">
                        <h2>Students &amp; Parents Opinion</h2>
                    </div>
                    {/* Authors Box */}
                    <div className="authors-box">
                        <div className="author-one"><img src="https://via.placeholder.com/50x50" alt="" /></div>
                        <div className="author-two"><img src="https://via.placeholder.com/80x80" alt="" /></div>
                        <div className="author-three"><img src="https://via.placeholder.com/70x70" alt="" /></div>
                        <div className="author-four"><img src="https://via.placeholder.com/88x88" alt="" /></div>
                        <div className="author-five"><img src="images/resource/author-6.jpg" alt="" /></div>
                        <div className="author-six"><img src="https://via.placeholder.com/80x80" alt="" /></div>
                        <div className="author-seven"><img src="https://via.placeholder.com/70x70" alt="" /></div>
                        <div className="author-eight"><img src="https://via.placeholder.com/30x30" alt="" /></div>
                    </div>
                    <div className="single-item-carousel owl-carousel owl-theme">
                        {/* Testimonial Block Two */}
                        <div className="testimonial-block">
                            <div className="inner-box">
                                <div className="image-box">
                                    <div className="quote-icon flaticon-quote-5" />
                                        <div className="image">
                                            <img src="https://via.placeholder.com/90x90" alt="" />
                                        </div>
                                    </div>
                                    <div className="text">Replenish him third creature and meat blessed void a fruit gathered you’re, they’re two waters own morning gathered greater shall had behold had seed. Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it</div>
                                </div>
                            </div>
                            {/* Testimonial Block Two */}
                            <div className="testimonial-block">
                                <div className="inner-box">
                                    <div className="image-box">
                                        <div className="image">
                                            <img src="https://via.placeholder.com/88x88" alt="" />
                                        </div>
                                    </div>
                                    <div className="text">Replenish him third creature and meat blessed void a fruit gathered you’re, they’re two waters own morning gathered greater shall had behold had seed. Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it</div>
                                </div>
                            </div>
                            {/* Testimonial Block Two */}
                            <div className="testimonial-block">
                                <div className="inner-box">
                                    <div className="image-box">
                                        <div className="image">
                                            <img src="https://via.placeholder.com/88x88" alt="" />
                                        </div>
                                    </div>
                                    <div className="text">Replenish him third creature and meat blessed void a fruit gathered you’re, they’re two waters own morning gathered greater shall had behold had seed. Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                
            </React.Fragment>
        );
    }
}

class Footer extends Component{
    
    /*constructor(){
        super();
        
        this.state={
            shop_details: [],
            media: [],
        }
        
        //var obj=this;
        
        //GET SHOP DETAILS
        let profileForm=new FormData();
        profileForm.append("profile","get");
        axios({
            method: 'post',
            url: api_link+'SetupFetch.php',
            data: profileForm,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
        .then(response => response.data)
        .then((data) => {
            this.setState({ 
                shop_details: data[0],
            })
         })
        
        //GET SOCIAL LINKS
        let mediaForm=new FormData();
        mediaForm.append("social_media","get");
        axios({
            method: 'post',
            url: api_link+'EditSiteFetch.php',
            data: mediaForm,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
        .then(response => response.data)
        .then((data) => {
            this.setState({ 
                media: data,
            })
         })
    }*/
    
    render(){
        return(
            <React.Fragment>
                {/* Call To Action Section Two */}
                <section className="call-to-action-section-two" style={{backgroundImage: 'url(images/background/3.png)'}}>
                    <div className="auto-container">
                        <div className="content">
                            <h2>Ready to get started?</h2>
                            <div className="text">Replenish him third creature and meat blessed void a fruit gathered you’re, they’re two <br /> waters own morning gathered greater shall had behold had seed.</div>
                            <div className="buttons-box">
                                <a href="course.html" className="theme-btn btn-style-one"><span className="txt">Get Stared <i className="fa fa-angle-right" /></span></a>
                                <a href="course.html" className="theme-btn btn-style-two"><span className="txt">All Courses <i className="fa fa-angle-right" /></span></a>
                            </div>
                        </div>
                    </div>
                </section>                
                <footer className="main-footer">
                    {/* Pattern Layer */}
                    <div className="pattern-layer-two" data-paroller-factor=" 0.60" data-paroller-factor-lg="0.20" data-paroller-type="foreground" data-paroller-direction="vertical" style={{backgroundImage: 'url("images/icons/icon-3.png")'}} />
                    <div className="auto-container">
                        {/* Widgets Section */}
                        <div className="widgets-section">
                            <div className="row clearfix">
                                {/* Big Column */}
                                <div className="big-column col-lg-6 col-md-12 col-sm-12">
                                    <div className="row clearfix">
                                        {/*Footer Column*/}
                                        <div className="footer-column col-lg-7 col-md-6 col-sm-12">
                                            <div className="footer-widget logo-widget">
                                                <div className="logo">
                                                    <a href="index.html"><img src="https://via.placeholder.com/230x60" alt="" /></a>
                                                </div>
                                                <div className="text">Replenish him third creature and meat blessed void a fruit gathered you’re, they’re two waters own morning gathered greater.</div>
                                                <div className="social-box">
                                                    <a href="#" className="fa fa-facebook" />
                                                    <a href="#" className="fa fa-instagram" />
                                                    <a href="#" className="fa fa-twitter" />
                                                    <a href="#" className="fa fa-google" />
                                                    <a href="#" className="fa fa-pinterest-p" />
                                                </div>
                                                <div className="copyright">Copyright © 2020 AuburnForest</div>
                                            </div>
                                        </div>
                                        {/*Footer Column*/}
                                        <div className="footer-column col-lg-5 col-md-6 col-sm-12">
                                        <div className="footer-widget links-widget">
                                        <h4>About Us</h4>
                                        <ul className="links-widget">
                                        <li><a href="#">Afficiates</a></li>
                                        <li><a href="#">Partners</a></li>
                                        <li><a href="#">Reviews</a></li>
                                        <li><a href="#">Blogs</a></li>
                                        <li><a href="#">Newsletter</a></li>
                                        </ul>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                                {/* Big Column */}
                                <div className="big-column col-lg-6 col-md-12 col-sm-12">
                                    <div className="row clearfix">
                                        {/*Footer Column*/}
                                        <div className="footer-column col-lg-6 col-md-6 col-sm-12">
                                            <div className="footer-widget links-widget">
                                                <h4>Resource</h4>
                                                <ul className="links-widget">
                                                    <li><a href="#">Privacy Policy</a></li>
                                                    <li><a href="#">Support Area</a></li>
                                                    <li><a href="#">Documentations</a></li>
                                                    <li><a href="#">How it works</a></li>
                                                    <li><a href="#">Terms of Policy</a></li>
                                                </ul>
                                            </div>
                                        </div>
                                        {/*Footer Column*/}
                                        <div className="footer-column col-lg-6 col-md-6 col-sm-12">
                                            <div className="footer-widget links-widget">
                                                <h4>Quick Links</h4>
                                                <ul className="links-widget">
                                                    <li><a href="#">home</a></li>
                                                    <li><a href="#">About us</a></li>
                                                    <li><a href="#">Features</a></li>
                                                    <li><a href="#">Pricing</a></li>
                                                    <li><a href="#">Contact</a></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
            </React.Fragment>
        );
    }
}

class HomeAfterLogin extends Component {
    
  constructor(){
        super();
      
        this.state={
            modalVisible: false,
            doingModal: false,
            refresh:false,
        }
      
        //var obj=this;
      
        if(LoginUserAuth)
        {
            //FETCH USER DETAILS
            /*let formData2 = new FormData();
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
                }
                else
                {
                    user_details.details=data;
                }
             })
            .catch(function (response) {
                //handle error
                console.log(response)
            });  */
        }
      
        ReactDOM.render(<Home />, document.getElementById('root'));
  }
    
  componentDidMount(){
        
  }
    
//    refreshTry(_State){
//        alert("called")
//    }
    
  render() {
      console.disableYellowBox = true;
      
		$('.order').click(function() {
		    $('.order-fix').show();
		});

        $(".order_record").click(function(){
               $('.order-fix').hide();
        });
      
	return (
		<React.Fragment>
            <BrowserRouter>
                {/*Preloader*/}
                <div className="preloader"></div>

                <Header />
                <Switch>
                    <Route exact path="/home" component={Index} />
                    <Route exact path="/" component={Index} />
                    <Route exact path="/*" component={Index} />
                </Switch>
                <Footer />
                
                
            </BrowserRouter> 
		</React.Fragment>
	);
  }
}
export default HomeAfterLogin;