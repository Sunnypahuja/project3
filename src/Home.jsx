import React, {Component } from 'react';
//import ReactDOM from 'react-dom';
import { Link, Route, Switch, BrowserRouter  } from "react-router-dom";
import ScrollToTopRoute from './ScrollToTopRoute';
import axios from 'axios';
import $ from 'jquery';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import Slider from "react-slick";
import { Login, Register, ForgotPassword } from './LoginRegister';
import Studentregister from './student/Studentregister';
import QuizList from './QuizList';
import { SeriesCategories, SeriesList, SeriesGrid, SearchGrid, SearchList } from './ProductsGrid';
import { CourseDetails, CourseLessons } from './ProductDetails';
import { Dashboard, MyAccount } from './UserAccount';
import { Blogs, BlogDetails, Error, Pages, ContactUs } from './WebsiteComponents';
import Tags from './Tags';
import HomeAfterLogin from './HomeAfterLogin'; 
/*import MicRecorder from 'mic-recorder-to-mp3';

const recorder = new MicRecorder({bitRate: 256});*/
export var number_of_items_in_cart=0;

/*navigator.mediaDevices.getUserMedia({audio: true})
  .then(console.log("Permission Granted"))
  .catch(err => console.log('Uh oh... unable to get stream...', err));*/
 

/*const responsive = {
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
    };*/

//UNCOMMENT FOR LIVE
//export const api_link="/api/"; 

//COMMENT FOR LIVE
export const api_link="http://drive.local/react-lms/api/";
export const server_link="http://drive.local/react-lms/";

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
    billing_address: '',
    billing_name: '',
    billing_contact: '',
    billing_slot: '',
    billing_slot_type: '',
    billing_delivery_charge: 0,
    billing_total: 0,
    billing_pincode: '',
    payment_type: '',
    order_id: '',
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
    var count_good=0;
    
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
        cart_items.price=cart_items.price-window.parseFloat(cart_items.items[product_id]['final_price']);
        final_arr.splice(product_id,1);

        cart_items.items=final_arr;
        
//        createCookie("cart_items",cart_items.items.join("|"),30)
//        createCookie("cart_price",cart_items.price,30)
    }
	
    final_arr.forEach(_ => count_good++);
    number_of_items_in_cart=count_good;

	$("#number_of_items_in_cart").html(number_of_items_in_cart);
    
    if(typeof(localStorage) != undefined)
    {
        localStorage.setItem('cart_items', JSON.stringify(cart_items.items));
        localStorage.setItem('cart_price', cart_items.price);
        localStorage.setItem('billing_address', cart_items.billing_address);
        localStorage.setItem('billing_name', cart_items.billing_name);
        localStorage.setItem('billing_contact', cart_items.billing_contact);
        localStorage.setItem('billing_slot', cart_items.billing_slot);
        localStorage.setItem('billing_slot_type', cart_items.billing_slot_type);
        localStorage.setItem('billing_delivery_charge', cart_items.billing_delivery_charge);
        localStorage.setItem('billing_total', cart_items.billing_total);
        localStorage.setItem('billing_pincode', cart_items.billing_pincode);
        localStorage.setItem('payment_type', cart_items.payment_type);
        localStorage.setItem('order_id', cart_items.order_id);
    }
}

export const addItem = (product_id,product_quantity,quantity_type,price,final_price, arr) => {
    
//    var final_arr=getCookie("cart_items").split("|");
    var final_arr=cart_items.items.slice();
    var count_good=0;
    
    arr['final_price']=+(arr['final_price'].toFixed(3));
    
    if (typeof final_arr[product_id] !== 'undefined') {
        cart_items.price-=window.parseFloat(final_arr[product_id]['final_price']);
        cart_items.price+=window.parseFloat(arr['final_price']);
        final_arr[product_id]=arr;  
        cart_items.items=final_arr;  
    }
    else
    {
        final_arr[product_id]=arr;  
        cart_items.items=final_arr;
        cart_items.price+=window.parseFloat(arr['final_price']);
    }
    
    final_arr.forEach(_ => count_good++);
    number_of_items_in_cart=count_good;
	$("#number_of_items_in_cart").html(number_of_items_in_cart);
    
    if(typeof(localStorage) != undefined)
    {
        localStorage.setItem('cart_items', JSON.stringify(cart_items.items));
        localStorage.setItem('cart_price', cart_items.price);
        localStorage.setItem('billing_address', cart_items.billing_address);
        localStorage.setItem('billing_name', cart_items.billing_name);
        localStorage.setItem('billing_contact', cart_items.billing_contact);
        localStorage.setItem('billing_slot', cart_items.billing_slot);
        localStorage.setItem('billing_slot_type', cart_items.billing_slot_type);
        localStorage.setItem('billing_delivery_charge', cart_items.billing_delivery_charge);
        localStorage.setItem('billing_total', cart_items.billing_total);
        localStorage.setItem('billing_pincode', cart_items.billing_pincode);
        localStorage.setItem('payment_type', cart_items.payment_type);
        localStorage.setItem('order_id', cart_items.order_id);
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

//CART STRUCTURE
// - PRODUCT ID
// - PRODUCT NAME
// - PRODUCT Image
// - PRODUCT QUANTITY
// - PRODUCT QUANTITY TYPE
// - PRODUCT PRICE
// - PRODUCT FINAL PRICE

export class SearchBox extends Component{

    state={
        search: '',
    }

    
    onSubmitForm=(e) => {
        e.preventDefault();
        this.props.search(this.state.search)
    }

    render(){
        return(
            <div className="search-boxed">
                <div className="search-box">
                    <form method="post" onSubmit={(e)=>this.onSubmitForm(e)}>
                        <div className="form-group">
                            <input type="search" name="search-field" onChange={(e)=>this.setState({search: e.target.value})} placeholder="Search" required />
                            <button type="submit" ><span className="icon fa fa-search" /></button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

class Header extends Component{
    
    state={
        prelims:'',
        mains:'',
    }
    
    callLinks = (post) =>{
        var obj = this;
        let formData = new FormData();
		formData.append('links_'+post, true);
        // console.log(formData)
        const name = post;
        axios({
			method: 'post',
			url: api_link+'links.php',
			data: formData,
		})
		.then(response => response.data)
        .then((data) => {
            console.log(post,data.data)
            if(data['msg']=="ok")
            {
                if(post == "prelims")
                {
                    obj.setState({ prelims: data.data})
                }
                if(post == "mains")
                {
                    obj.setState({ mains: data.data})
                }
                console.log("h",this.state)
            }
         })
		.catch(function (response) {
			});

    }
    componentDidMount(){
        this.callLinks('prelims');
        this.callLinks('mains');
        console.log(this.state)
    }

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
            
        console.log(this.state)
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
                                    <li><Link to={"/login"}>Log In</Link></li>
                                    <li><Link to={"/register"}>Register</Link></li>
                                    {LoginAuth.isAuthenticated == true?(<><li><Link to={"/my-profile"}>My Profile</Link></li></>):(<></>)}

                                    
								</ul>
							</div>
						</div>
					</div>
				</div>
				
				<div className="header-upper">
					<div style={{width: '95%'}}>
						<div className="clearfix">
							<div className="pull-left logo-box">
								<div className="logo">
                                    <img src="/images/logo.png" alt="Main Logo" />
                                </div>
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
												<a href="#!">Prelims</a>
												<ul>
                                                {
                                                    this.state.prelims&&this.state.prelims.map((m, key) => (
                            <>
                                                    
                                                        <li><Link to={{ pathname: "/page/"+ m.page_name}}>{m.title}</Link></li>
                                                            </> 
                                                        ))                                                                                                  
                                                }
                                                    {/* <li><Link to={"/#!"}>Prelims GS Strategy</Link></li>
                                                    <li><Link to={"/#!"}>60 Day Plan</Link></li> */}
												</ul>
											</li>
                                            <li className="dropdown">
												<a href="#!">Mains</a>
												<ul>
                                                {
                                                    this.state.mains&&this.state.mains.map((m, key) => (<>
                                                    
                                                        <li><Link to={{ pathname: "/page/"+ m.page_name}}>{m.title}</Link></li>
</> 
                                                        ))                                                                                                  
                                                }
                                                    {/* <li><Link to={"/#!"}>Mains GS Strategy</Link></li>
                                                    <li><Link to={"/#!"}>Essay Strategy</Link></li> */}
												</ul>
											</li>
											<li className="dropdown">
												<a href="#!">Test Series</a>
												<ul>
                                                    <li><Link to={"/quizlist/mains"}>Mains</Link></li>
                                                    <li><Link to={"/quizlist/prelims"}>Prelims</Link></li>
												</ul>
											</li>
                                            <li><Link to={"/blogs"}>Blogs</Link></li>
                                            <li><Link to={"/series-grid"}>Courses</Link></li>
                                            <li><Link to={"/page/privacy-policy"}>Privacy Policy</Link></li>
                                            <li><Link to={"/contact"}>Contact Us</Link></li>
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
                        <div className="nav-logo"><Link to={"/home"}><img src="https://via.placeholder.com/230x60" alt="Home" /></Link></div>
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
    
    constructor() {
        super();
        this.state = {
            sliders: [],
            why: [],
            imp: [],
            imp1: [],
            imp4: [],
            reviews: [],
            featuredCourses: [],
        };
        
        this.childKey = 0
      
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
            if(data.msg=="ok")
            {
                obj.setState({ sliders: data.data})
            }
         })
		.catch(function (response) {
			//handle error
			console.log(response)
		});   

        //FETCH WHY US
        let formData2 = new FormData();
		formData2.append('why_us', "reasons")
        axios({
			method: 'post',
			url: api_link+'SetupFetch.php',
			data: formData2,
		})
		.then(response => response.data)
        .then((data) => {
            if(data.msg=="ok")
            {
                obj.setState({ why: data.data})
            }        
        })
		.catch(function (response) {
			//handle error
			console.log(response)
		});  

        //FETCH IMPORTANT UPDATES
        let formData3 = new FormData();
		formData3.append('imp_updates', "UPDATES")
        axios({
			method: 'post',
			url: api_link+'EditSiteFetch.php',
			data: formData3,
		})
		.then(response => response.data)
        .then((data) => {
            if(data.msg=="ok"){
            obj.setState({imp: data.data})}
         })
		.catch(function (response) {
			//handle error
			console.log(response)
		});   

         //FETCH STUDYMATERIALS UPDATES
         let formData7 = new FormData();
         formData7.append('study_m', "UPDATES")
         axios({
             method: 'post',
             url: api_link+'EditSiteFetch.php',
             data: formData7,
         })
         .then(response => response.data)
         .then((data) => {
             if(data.msg=="ok"){
             obj.setState({imp1: data.data})}
          })
         .catch(function (response) {
             //handle error
             console.log(response)
         });   
            //tag
         let formData8 = new FormData();
         formData8.append('tag', "UPDATES")
         axios({
             method: 'post',
             url: api_link+'EditSiteFetch.php',
             data: formData8,
         })
         .then(response => response.data)
         .then((data) => {
             console.log(data)
             obj.setState({ imp4: data})
          })
         .catch(function (response) {
             //handle error
             console.log(response)
         });   
        //FETCH REVIEWS
        let formData4 = new FormData();
		formData4.append('reviews', "reviews")
        axios({
			method: 'post',
			url: api_link+'SetupFetch.php',
			data: formData4,
		})
		.then(response => response.data)
        .then((data) => {
            if(data.msg=="ok"){
            obj.setState({ reviews: data.data})}
         })
		.catch(function (response) {
			//handle error
			console.log(response)
		});   

         //FETCH REVIEWS
        let formData5 = new FormData();
		formData5.append('featuredCourses', "featuredCourses")
        axios({
			method: 'post',
			url: api_link+'SetupFetch.php',
			data: formData5,
		})
		.then(response => response.data)
        .then((data) => {
            if(data.msg=="ok"){
            obj.setState({ featuredCourses: data.data})}
         })
		.catch(function (response) {
			//handle error
			console.log(response)
		}); 
        
        let formData6 = new FormData();
		formData6.append('fetch_recentQuizes', "fetch_recentQuizes")
        axios({
			method: 'post',
			url: api_link+'QuizData.php',
			data: formData6,
		})
		.then(response => response.data)
        .then((data) => {
            if(data.msg=="ok"){
                console.log(data)
            obj.setState({ recentQuizes: data.data})}
         })
		.catch(function (response) {
			//handle error
			console.log(response)
		});   
    }
    
    componentDidMount(){
        this.childKey++
        $("script[src='js/script.js']").remove();
        const script = document.createElement("script");
        script.src = "js/script.js";
        document.body.appendChild(script);
    }
    
    render(){
        this.childKey++
        $(function(){
            $(".owl-nav, .owl-dots").hide();
        })
        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 3,
            slidesToScroll: 1
          };

        return(
            <React.Fragment key={this.childKey}>
                <section className="banner-section" style={{minHeight: '550px'}}>
                    <OwlCarousel className="owl-theme pattern-layer" items={1} style={{display: 'block'}} loop="true" autoplay="true" autoplayTimeout={4000} nav="false" dots="false">
                        {this.state.sliders?( this.state.sliders.map((slider, key) => (
                            <div className="item" key={key}>
                                <img src={"/images/"+slider.image} alt={"Banner " + key} style={{width: '100%', height: '100%'}}/>
                            </div>
                        ))):(null)}
                    </OwlCarousel>
                </section>
                
                <section className="courses-section" style={{paddingTop: '35px', backgroundColor: '#ffffff'}}>
                    <div className="auto-container">
                        <div className="row clearfix">
                            {/* Title Column */}
                            <div className="title-column col-md-12">
                                <div className="sec-title" style={{marginTop: '9px'}}>
                                    <h2>Why US?</h2>
                                    <div className="text">VISION: Enabling an aspirant located at the remotest corner of the country, in not only fulfilling his/her dreams of clearing the toughest UPSC/Civil Services Exam, but securing Rank 1. </div>
                                </div>
                            </div>
                        </div>
                        <div className="row clearfix">
                            {this.state.why.map((w, key) => (
                                <div className="cource-block col-lg-4 col-md-6 col-sm-12" key={key}>
                                    <div className="inner-box">
                                        <div className="lower-content">
                                            <div className="clearfix">
                                                <div className="pull-left">
                                                    <h5><Link to={"#!"}>{w.title}</Link></h5>
                                                </div>
                                            </div>
                                            <div className="text">{w.description}</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
                
                <section className="achievements-section">
                    <div className="auto-container">
                        {/* Sec Title */}
                        <div className="sec-title centered">
                            <h2>Important Updates</h2>
                        </div>
                        {/* Fact Counter */}
                        <div className="fact-counter">
                            <div className="row clearfix">
                                {/* Column */}
                                <div className="column counter-column col-lg-12">
                                    <div className="inner" style={{maxHeight: '450px', overflowY: 'auto'}}>
                                        <div className="content" style={{textAlign: 'left'}}>
                                            <ul style={{marginLeft: '7px'}}>
                                                {
                                                    this.state.imp && this.state.imp.map((i, key) => (
                                                        <li style={{border: '1px solid #dfdfdf', padding: '7px 11px'}} key={"imp"+key}><Link to={"/page/"+i.page_name}>{i.title}</Link></li>
                                                    ))
                                                }
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="auto-container">
                        {/* Sec Title */}
                      
                        
                        {/* Fact Counter */}
                        <div className="fact-counter">
                            <div className="row clearfix">
                                {/* Column */}
                                <div className="column counter-column col-lg-6">
                                <div className="sec-title centered">
                                 <h2>Study materials</h2>
                                </div>
                                    <div className="inner" style={{maxHeight: '450px', overflowY: 'auto'}}>
                                        <div className="content" style={{textAlign: 'left'}}>
                                            <ul style={{marginLeft: '7px'}}>
                                                {
                                                    this.state.imp1.map((i1, key) => (<>
                                                    
                                                        <li style={{border: '1px solid #dfdfdf', padding: '7px 11px'}} key={"imp1"+key}><Link to={location => ({...location, pathname:"http://drive.local/react-lms/images/"+i1.file})}  target="_blank">{i1.title}</Link></li>
                                                    </>
                                                        ))                                                                                                  
                                                }
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="column counter-column col-lg-6">
                                <div className="sec-title centered">
                                        <h2>Tags</h2>
                                     </div>
                                    <div className="inner" style={{maxHeight: '450px', overflowY: 'auto'}}>
                                        <div className="content" style={{textAlign: 'left'}}>
                                            <ul style={{marginLeft: '7px'}}> 
                                                {
                                                    this.state.imp4&&this.state.imp4.map((i2, key) => (<>
                                                    
                                                        <div style={{ display: 'inline-block',border: '1px solid black' ,marginLeft: '10px', paddingLeft: '10px', paddingRight: '10px'}}><Link to={{ pathname: "/tags/"+i2}}> {i2} </Link></div>
                                                    </>
                                                        ))                                                                                                  
                                                }
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>  
                </section>
                <section className="achievements-section" style={{paddingTop : '0' }}>
                    <div className="auto-container">
                        {/* Sec Title */}   
                        <div className="sec-title centered">
                            <h2>Recent Quizes</h2>
                        </div>
                        {/* Fact Counter */}
                        <div className="row clearfix">
                            {this.state.recentQuizes&&this.state.recentQuizes.map((item)=>( 
                                <div className="cource-block col-lg-4 col-md-6 col-sm-12" >
                                    <div className="inner-box">
                                        <div className="lower-content">
                                            <div className="clearfix">
                                                <div className="pull-left">
                                                    <h5><Link to={"#!"}>{item.title}</Link></h5>
                                                    <p>{item.type}</p>
                                                </div>
                                            </div>
                                            <div className="text" dangerouslySetInnerHTML={{__html:item.description}}/>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            
                            {/* <div className="cource-block col-lg-3 col-md-6 col-sm-12" >
                                <div className="inner-box">
                                    <div className="lower-content">
                                        <div className="clearfix">
                                            <div className="pull-left">
                                                <h5><Link to={"#!"}>Quiz 4</Link></h5>
                                            </div>
                                        </div>
                                        <div className="text">Description 4</div>
                                    </div>
                                </div>
                            </div> */}
                        </div>
                        <div className="fact-counter">
                            <div className="row clearfix">
                                {/* Column */}
                                <div className="column counter-column col-lg-12">
                                    <div className="inner" style={{maxHeight: '450px', overflowY: 'auto'}}>
                                        <div className="content" style={{textAlign: 'left'}}>
                                            <ul style={{marginLeft: '7px'}}>
                                                {
                                                    this.state.imp && this.state.imp.map((i, key) => (
                                                        <li style={{border: '1px solid #dfdfdf', padding: '7px 11px'}} key={"imp"+key}><Link to={"/page/"+i.page_name}>{i.title}</Link></li>
                                                    ))
                                                }
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="courses-section" style={{paddingTop: '35px', backgroundColor: '#ffffff'}}>
                    <div className="auto-container">
                        <div className="row clearfix">
                            {/* Title Column */}
                            <div className="title-column col-md-12">
                                <div className="sec-title" style={{marginTop: '9px'}}>
                                    <h2>Courses</h2>
                                </div>
                            </div>
                        </div>
                        <div className="row clearfix">
                            {this.state.featuredCourses && this.state.featuredCourses.map((f, key) => (
                                <div className="cource-block col-lg-4 col-md-6 col-sm-12" key={key}>
                                    <div className="inner-box">
                                        <div class="image" style={{borderBottom: '1px solid #dfdfdf',height: '200px'}}>
                                            <Link to={"/course-details/"+f.id}><img src={server_link+"images/"+f.image} alt={f.name} /></Link>
                                        </div>
                                        <div className="lower-content">
                                            <div className="clearfix">
                                                <div className="pull-left">
                                                    <h5><Link to={"/course-details/"+f.id}>{f.name}</Link></h5>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="testimonial-section">
                    <div className="auto-container">
                        {/* Sec Title */}
                        <div className="sec-title centered">
                            <h2>Topper's Reviews</h2>
                        </div>
                        {/* Authors Box */}
                        <div className="authors-box">
                            <div className="author-one"><img src="/images/home/user.png" style={{height: '50px'}} alt="User 50" /></div>
                            <div className="author-two"><img src="/images/home/user.png" style={{height: '80px'}} alt="User 80 One" /></div>
                            <div className="author-three"><img src="/images/home/user.png" style={{height: '70px'}} alt="User 70 One" /></div>
                            <div className="author-four"><img src="/images/home/user.png" style={{height: '88px'}} alt="User 88 One" /></div>
                            <div className="author-five"><img src="/images/home/user.png" alt="User Main One" /></div>
                            <div className="author-six"><img src="/images/home/user.png" style={{height: '80px'}} alt="User 80 Two" /></div>
                            <div className="author-seven"><img src="/images/home/user.png" style={{height: '70px'}} alt="User 70 two" /></div>
                            <div className="author-eight"><img src="/images/home/user.png" style={{height: '30px'}} alt="User 30 two" /></div>
                        </div>
                        <div className="single-item-carousel owl-carousel owl-theme">
                            {/* Testimonial Block Two */}
                            <div className="testimonial-block">
                                {
                                    this.state.reviews&&this.state.reviews.map((r, key) => (
                                        <div className="inner-box">
                                            <div className="image-box">
                                                <div className="quote-icon flaticon-quote-5" />
                                                <div className="image">
                                                    <img src={"/images/"+r.image} style={{height: '90px'}} alt={r.name} />
                                                </div>
                                            </div>
                                            <div className="text">
                                                {r.description}
                                                <p style={{fontSize: '15px'}}>
                                                    <b>- ({r.name})</b>
                                                    <br/>
                                                    ({r.title})
                                                </p>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </section>
                
            </React.Fragment>
        );
    }
}

class Footer extends Component{
    
    constructor(){
        super();
        
        this.state={
            shop_details: [],
            media: [],
            usefulLinks: [],
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
            this.setState({ shop_details: data[0]})
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
            if(data.msg=="ok"){
            this.setState({media: data.data})}
         })

        //GET FOOTER LINKS
        let footerForm=new FormData();
        footerForm.append("footer_links","get");
        axios({
            method: 'post',
            url: api_link+'SetupFetch.php',
            data: footerForm,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
        .then(response => response.data)
        .then((data) => {
            if(data.msg=="ok")
            {
                this.setState({ usefulLinks: data.data})
            }
         })
    }
    
    render(){
        return(
            <React.Fragment>               
                <footer className="main-footer" style={{backgroundColor: '#ffffff'}}>
                    {/* Pattern Layer */}
                    <div className="pattern-layer-two" data-paroller-factor=" 0.60" data-paroller-factor-lg="0.20" data-paroller-type="foreground" data-paroller-direction="vertical" style={{backgroundImage: 'url("images/icons/icon-3.png")'}} />
                    <div className="auto-container">
                        {/* Widgets Section */}
                        <div className="widgets-section">
                            <div className="row clearfix" style={{textAlign: 'center'}}>
                                {/* Big Column */}
                                <div className="big-column col-lg-3">
                                    <div className="row clearfix">
                                        {/*Footer Column*/}
                                        <div className="footer-column col-lg-12">
                                            <div className="footer-widget logo-widget">
                                                <div className="logo">
                                                    <Link to={"/"}><img src={"/images/"+this.state.shop_details['logo']} alt="Main Logo" /></Link>
                                                </div>
                                                {
                                                    this.state.media
                                                    ?
                                                    <div className="social-box">
                                                        {
                                                            this.state.media.map((m, key) => (
                                                                // eslint-disable-next-line jsx-a11y/anchor-has-content
                                                                <a href={m.link} className={"fa "+m.icon} target="_blank" rel="noreferrer" />
                                                            ))
                                                        }
                                                    </div>
                                                    :
                                                    ''
                                                }
                                                <div className="copyright">Copyright © {new Date().getFullYear()} {this.state.shop_details['name']}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* Big Column */}
                                <div className="big-column col-lg-5 col-md-12 col-sm-12">
                                    <div className="row clearfix">
                                        {/*Footer Column*/}
                                        <div className="footer-column col-lg-12">
                                            <div className="footer-widget links-widget" style={{textAlign: 'center'}}>
                                                <i className="fa fa-map-marker"></i> {this.state.shop_details['address']}
                                                <br/><br/>
                                                <i className="fa fa-mobile"></i> {this.state.shop_details['contact']}
                                                <br/>
                                                <i className="fa fa-mobile"></i> {this.state.shop_details['technical_contact']}
                                                <br/><br/>
                                                <i className="fa fa-envelope"></i> {this.state.shop_details['email']}
                                                <br/>
                                                <i className="fa fa-envelope"></i> {this.state.shop_details['technical_email']}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            
                                <div className="big-column col-lg-4 col-md-12 col-sm-12">
                                    <div className="row clearfix">
                                        <div className="footer-column col-lg-12 col-md-6 col-sm-12">
                                            <div className="footer-widget links-widget">
                                                <p style={{fontSize: '14px'}}><b>Subscribe to Newsletter</b></p>
                                                <input type="email" className="form-control" id="email" />
                                                <p>Don’t lose out on any important Post and Update.</p>
                                                <button className="btn btn-primary pull-right">Subscribe</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {
                                    this.state.usefulLinks.length
                                    ?
                                    <div className="big-column col-lg-12 col-md-12 col-sm-12" style={{paddingBottom: '70px'}}>
                                        <h4 style={{fontWeight: '600'}}>Useful Links</h4>
                                        <div className="row clearfix">
                                            {
                                                this.state.usefulLinks.map((u, key) => (
                                                    <div className="footer-column col-lg-2 col-md-3 col-sm-6">
                                                        <Link to={"/page/"+u.page_name}>{u.title}</Link>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </div>
                                    :
                                    ''
                                }
                            </div>    
                        </div>
                    </div>
                </footer>
            </React.Fragment>
        );
    }
}

class Home extends Component {
    
  /*constructor(){
        super();
      
        this.state={
            modalVisible: false,
            cuttingModalVisible: false,
            doingModal: false,
            refresh:false,
            u_details:[],
        }
      
        var obj=this;
      
        //SETTING UP CART
        if(typeof(localStorage) != undefined)
        {
            if(localStorage.getItem("cart_items"))
            {
                cart_items.items=JSON.parse(localStorage.getItem("cart_items"));

                let count=0;
                
                $.each(cart_items.items, function(key, value){
                    if (value === "" || value === null){
                        delete cart_items.items[key];
                    }
                    else
                    {
                        count++;
                    }
                });      

                $("#number_of_items_in_cart").html(count);

                cart_items.price=window.parseFloat(localStorage.getItem("cart_price"));
                cart_items.billing_address=localStorage.getItem("billing_address");
                cart_items.billing_name=localStorage.getItem("billing_name");
                cart_items.billing_contact=localStorage.getItem("billing_contact");
                cart_items.billing_slot=localStorage.getItem("billing_slot");
                cart_items.billing_slot_type=localStorage.getItem("biling_slot_type");
                cart_items.billing_delivery_charge=window.parseFloat(localStorage.getItem("billing_delivery_charge"));
                cart_items.billing_total=window.parseFloat(localStorage.getItem("billing_total"));
                cart_items.billing_pincode=localStorage.getItem("billing_pincode");
                cart_items.payment_type=localStorage.getItem("payment_type");
                cart_items.order_id=localStorage.getItem("order_id");
            }
        }
      
        if(LoginUserAuth)
        {
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
                    if(navigator.cookieEnabled && getCookie(window.btoa("session_user"))!== "" && getCookie(window.btoa("user_id"))!=="")
                    {
                        let formData = new FormData();
                        formData.append('user_email', window.atob(getCookie(window.btoa("session_user"))))
                        formData.append('user_id', window.atob(getCookie(window.btoa("user_id"))))
                        axios({
                            method: 'post',
                            url: api_link+'AdminLogin.php',
                            data: formData,
                            config: { headers: {'Content-Type': 'multipart/form-data' }}
                        })
                        .then(function (response) {
                            //handle success
                            if(response.data === "ok")
                            {	
                                window.sessionStorage.setItem(window.btoa("session_user"), getCookie(window.btoa("session_user")));
                                window.sessionStorage.setItem(window.btoa("user_id"), getCookie(window.btoa("user_id")));
                                
                                
                                //FETCH USER DETAILS
                                let formData2 = new FormData();
                                formData2.append('customer_details', window.atob(getCookie(window.btoa("user_id"))))
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
                            else
                            {
                                LoginUserAuth.isAuthenticated = false
                                window.sessionStorage.removeItem(window.btoa("session_user"));
                                window.sessionStorage.removeItem(window.btoa("user_id"));				
                            }
                        })
                        .catch(function (response) {
                            //handle error
                            console.log(response)
                        });
                    }
                    else
                    {
                        LoginUserAuth.isAuthenticated = false
                        window.sessionStorage.removeItem(window.btoa("session_user"));
                        window.sessionStorage.removeItem(window.btoa("user_id"));				
                    }
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
  }
    
  componentDidMount(){
        $("script[src='common.js']").remove();
        var obj=this;
        //FETCH DYNAMIC PAGES
        let formData5 = new FormData();
        formData5.append('dynamic_pages_home', "get_all")
        axios({
            method: 'post',
            url: api_link+'EditSiteFetch.php',
            data: formData5,
        })
        .then(response => response.data)
        .then((data) => {
            dynamic_pages.pages=data;
            var ref= obj.state.refresh;
            obj.setState({ 
                refresh: !ref,
            })
         })
        .catch(function (response) {
            //handle error
            console.log(response)
        }); 
      
  }
    
  openModal() {
        document.getElementById("cuttingForm").reset();
        this.setState({
          doingModal: true,
          cuttingModalVisible: !this.state.cuttingModalVisible
        });
    }
    
	logout(e){
        e.preventDefault();
        LoginUserAuth.isAuthenticated = false
        window.sessionStorage.removeItem(window.btoa("session_user"));
        window.sessionStorage.removeItem(window.btoa("user_id"));		
        document.cookie = window.btoa("session_user")+"=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie = window.btoa("user_id")+"=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        
        document.title="MarketBoi | Home"
        
        cart_items.items=[];
        cart_items.price=0;
        cart_items.billing_address='';
        cart_items.billing_name='';
        cart_items.billing_contact='';
        cart_items.billing_slot='';
        cart_items.billing_slot_type='';
        cart_items.billing_delivery_charge=0;
        cart_items.billing_total=0;
        cart_items.billing_address='';
        cart_items.billing_pincode='';
        cart_items.payment_type='';
        cart_items.order_id='';
        
        localStorage.removeItem('cart_items');
        localStorage.removeItem('cart_price');
        localStorage.removeItem('billing_address');
        localStorage.removeItem('billing_name');
        localStorage.removeItem('billing_contact');
        localStorage.removeItem('billing_slot');
        localStorage.removeItem('billing_slot_type');
        localStorage.removeItem('billing_delivery_charge');
        localStorage.removeItem('billing_total');
        localStorage.removeItem('billing_pincode');
        localStorage.removeItem('payment_type');
        localStorage.removeItem('order_id');
        
        localStorage.removeItem('default_pincode');

        window.history.pushState(null, null, '/home')
        ReactDOM.render(<HomeAfterLogin />, document.getElementById('root'));
    }*/
	
    componentDidMount(){
        $(".preloader").remove();
    }

    render() {
      
        //var obj=this;
      
        /*console.disableYellowBox = true;
      
		$('.order').click(function() {
            if(LoginUserAuth.isAuthenticated)
            {
                $(".order").attr("href","#");
                $('.order-fix').show();
                $(".recording_btn").show();
                $("#sendrecording").hide();
                $(".recording_stop_btn").hide();
                document.querySelector('#playlist').innerHTML="";
            }
		});
		
		$('.close_recorder').click(function() {
            if(LoginUserAuth.isAuthenticated)
            {
                $(".order").attr("href","#");
                $('.order-fix').hide();
                $(".recording_btn").hide();
                $("#sendrecording").hide();
                $(".recording_stop_btn").hide();
                document.querySelector('#playlist').innerHTML="";
            }
		});
      
      var file;
      
      function startRecording() {
//          alert("called");
          if(!document.querySelector('#playlist').length)
          {
              recorder.start().then(() => {
//                  alert("started")
                $(".recording_btn").hide();
                $(".recording_stop_btn").show();
              }).catch((e) => {
//                console.error(e);
                  alert(e)
              });
          }
        }

        function stopRecording() {
          recorder.stop().getMp3().then(([buffer, blob]) => {
            file = new File(buffer, 'music.mp3', {
              type: blob.type,
              lastModified: Date.now()
            });

            const li = document.createElement('li');
            const player = new Audio(URL.createObjectURL(file));
            player.controls = true;
            li.appendChild(player);
            document.querySelector('#playlist').appendChild(li);

            $("#sendrecording").show();
            $(".recording_stop_btn").hide();
          }).catch((e) => {
            console.error(e);
          });
        }
      
        function sendRecording(){          
            let formData = new FormData();
            formData.append('customer_audio_order', window.atob(window.sessionStorage.getItem(window.btoa("user_id"))))
            formData.append('audio_order', file)

            axios({
                method: 'post',
                url: api_link+'OrdersManagement.php',
                data: formData,
                config: { headers: {'Content-Type': 'multipart/form-data' }}
            })
            .then(function (response) {
                //handle success
                $('.order-fix').hide();
                $(".recording_btn").show();
                $("#sendrecording").hide();
                $(".recording_stop_btn").hide();
                document.querySelector('#playlist').innerHTML="";

            })
            .catch(function (response) {
                //handle error
                console.log(response)
            });
          
            
      }
      
		function check_max_gram(min_quantity, max_quantity, increase_by, prod_id)
        {
            //MAX CONDITION
            if($("#kg_option"+prod_id).val() === $("#kg_option"+prod_id+" option:last").val())
            {
                if(max_quantity === parseInt($("#kg_option"+prod_id).val())*1000)
                {
                    if($("#gram_option"+prod_id+" option:first").val() !== 0)
                    {
                        $("#gram_option"+prod_id).prepend("<option value='0'>0 G</option>");
                    }

                    $("#gram_option"+prod_id).val($("#gram_option"+prod_id+" option:first").val())
                }
            }
            //MIN CONDITION
            else if(parseInt($("#kg_option"+prod_id).val())*1000 + parseInt($("#gram_option"+prod_id).val()) < min_quantity)
            {
                if($("#gram_option"+prod_id+" option:first").val() === 0)
                {
                    $("#gram_option"+prod_id+" option:first").remove();
                }

                $("#gram_option"+prod_id).val($("#gram_option"+prod_id+" option:first").val())
            }
            //IN BETWEEN
            else if(parseInt(increase_by) <= 500 && parseInt(increase_by)%50 === 0)
            {
                if($("#gram_option"+prod_id+" option:first").val() !== 0)
                {
                    $("#gram_option"+prod_id).prepend("<option value='0'>0 G</option>");
                }

//                $("#gram_option"+prod_id).val($("#gram_option"+prod_id+" option:first").val())
            }
        }

        function check_max_litre(min_quantity, max_quantity, increase_by, prod_id)
        {
            if($("#l_option"+prod_id).val() === $("#l_option"+prod_id+" option:last").val())
            {
                if(max_quantity === parseInt($("#l_option"+prod_id).val())*1000)
                {
                    if($("#ml_option"+prod_id+" option:first").val() !== 0)
                    {
                        $("#ml_option"+prod_id).prepend("<option value='0'>0 ML</option>");
                    }

                    $("#ml_option"+prod_id).val($("#ml_option"+prod_id+" option:first").val())
                }
            }

            else if(parseInt($("#l_option"+prod_id).val())*1000 + parseInt($("#ml_option"+prod_id).val()) < min_quantity)
            {
                if($("#ml_option"+prod_id+" option:first").val() === 0)
                {
                    $("#ml_option"+prod_id+" option:first").remove();
                }

                $("#ml_option"+prod_id).val($("#ml_option"+prod_id+" option:first").val())
            }
            
            else if(parseInt(increase_by) <= 500 && parseInt(increase_by)%50 === 0)
            {
                if($("#ml_option"+prod_id+" option:first").val() !== 0)
                {
                    $("#ml_option"+prod_id).prepend("<option value='0'>0 G</option>");
                }

//                $("#ml_option"+prod_id).val($("#ml_option"+prod_id+" option:first").val())
            }
        }
      
      
        $(document).on("change","[id^=kg_option], [id^=gram_option]",function(){
            var obj=this;
            setTimeout(function(){
                let pid=$(obj).attr("id").replace("kg_option","").replace("gram_option","")
                let min=$(obj).attr("min_quantity")
                let max=$(obj).attr("max_quantity")
                let inc=$(obj).attr("quantity_increase_by")
                check_max_gram(min, max, inc, pid)
            }, 700);
        })
      
        $(document).on("change","[id^=l_option], [id^=ml_option]",function(){
            var obj=this;
            setTimeout(function(){
                let pid=$(obj).attr("id").replace("l_option","").replace("ml_option","")
                let min=$(obj).attr("min_quantity")
                let max=$(obj).attr("max_quantity")
                let inc=$(obj).attr("quantity_increase_by")
                check_max_litre(min, max, inc, pid)
            }, 700);
        })*/
      
        //CHECK PLATFORM
        var standalone = window.navigator.standalone, userAgent = window.navigator.userAgent.toLowerCase(), 
          safari = /safari/.test( userAgent ), ios = /iphone|ipod|ipad/.test( userAgent );
		
        var platform='none';
      
		if( ios ) {
			
			if ( !standalone && safari ) {
				
				platform='browser';
				
			} else if ( standalone && !safari ) {
				
				platform='standalone';
				
			} else if ( !standalone && !safari ) {
				//CODE ON THIS
				platform='uiwebview';
				
			};
			
		} 
        else {
			
			platform='extra';
			
		};
      
	return (
		<React.Fragment>
            <BrowserRouter>
                {/*Preloader*/}
                <div className="preloader"></div>

                <Header />
                <Switch>
                    <ScrollToTopRoute exact path="/my-profile" component={Dashboard} />
                    <ScrollToTopRoute exact path="/edit-profile" component={MyAccount} />
                    <ScrollToTopRoute exact path="/blogs" component={Blogs} />
                    <ScrollToTopRoute path="/blog-details/:token" component={BlogDetails} />
                    <ScrollToTopRoute exact path="/error" component={Error} />
                    <ScrollToTopRoute exact path="/contact" component={ContactUs} />
                    <ScrollToTopRoute path="/page/:token" component={Pages} /> 
                    <ScrollToTopRoute path="/course-details/:token" component={CourseDetails} />
                    <ScrollToTopRoute exact path="/course-lessons/:token" component={CourseLessons} /> 
                    <ScrollToTopRoute exact path="/series-categories" component={SeriesCategories} />
                    <Route exact path="/series-list" component={SeriesList} />
                    <Route exact path="/series-grid" component={SeriesGrid} />
                    <Route exact path="/search-list" component={SearchList} />
                    <Route exact path="/quizlist/:token" component={QuizList} />
                    <Route exact path="/search-grid" component={SearchGrid} /> 
                    <Route exact path="/tags/:token" component={Tags} /> 
                    <ScrollToTopRoute exact path="/login" component={Login} />
                    <ScrollToTopRoute exact path="/register" component={Studentregister} />
                    <ScrollToTopRoute exact path="/forgot-password" component={ForgotPassword} />
                    <ScrollToTopRoute exact path="/home" component={Index} />

                    <Route exact path="/" component={Index} />
                    <Route exact path="/*" component={Index} />
                    
                </Switch>
                <Footer />
                
                
            </BrowserRouter> 
		</React.Fragment>
	);
  }
}
export default Home;