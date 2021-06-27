import React, {Component} from 'react';
import axios from 'axios';
import $ from 'jquery';
import { Link } from "react-router-dom";

import Parser from 'html-react-parser';
import { api_link, addItem } from './Home';

class CourseDetails extends Component {
    
  constructor(props) {
        super();
        const base = document.querySelector('base');
        base.setAttribute('href', '../');
        this.state = {
            media:[],
        }
    }
    
    componentDidMount(){
        let formData = new FormData(); 
        formData.append('fetch_singlecourse', this.props.match.params.token)
        var obj=this 
        axios({
            method: 'post',
            url: api_link+'SingleCourseandPrograms.php',
            data: formData,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
        .then(response => response.data)
        .then((data) => { 
            console.log(data)
            if(data.msg == "ok")
            {
                this.setState({media: data})
            }
        })


        $("script[src='js/script.js']").remove();
        const script = document.createElement("script");
        script.src = "js/script.js";
        document.body.appendChild(script);
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
  
  render() {
    // ++this.childKey;
    console.log(this.state.media)
    return (
		<React.Fragment>
            <section className="page-title">
                <div className="auto-container">
                    <h1>Course Introduction</h1>
                    {/* Search Boxed */}
                    {/* <div className="search-boxed">
                        <div className="search-box">
                            <form method="post" action="contact.html">
                                <div className="form-group">
                                    <input type="search" name="search-field" defaultValue placeholder="What do you want to learn?" required />
                                    <button type="submit"><span className="icon fa fa-search" /></button>
                                </div>
                            </form>
                        </div>
                    </div> */}
                </div>
            </section>
            
            <section className="intro-section">
                <div className="patern-layer-one paroller" data-paroller-factor="0.40" data-paroller-factor-lg="0.20" data-paroller-type="foreground" data-paroller-direction="vertical" style={{backgroundImage: 'url(images/icons/icon-1.png)'}} />
                <div className="patern-layer-two paroller" data-paroller-factor="0.40" data-paroller-factor-lg="-0.20" data-paroller-type="foreground" data-paroller-direction="vertical" style={{backgroundImage: 'url(images/icons/icon-2.png)'}} />
                <div className="circle-one" />
                    <div className="auto-container">
                        <div className="sec-title">
                            <h2>{this.state.media.name}</h2>
                        </div>
                        <div className="inner-container">
                            <div className="row clearfix">
                                <div className="content-column col-lg-8 col-md-12 col-sm-12">
                                    <div className="inner-column">
                                        <div className="intro-info-tabs">
                                            <div className="intro-tabs tabs-box">
                                               
                                                <div className="tabs-content">
                                                    <div className="tab active-tab" id="prod-overview">
                                                        <div className="content">
                                                            <div className="course-overview">
                                                                <div className="inner-box">
                                                                    <p dangerouslySetInnerHTML={{__html:this.state.media.description}}></p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {this.state.media.sample_video?(
                                    <div className="video-column col-lg-4 col-md-12 col-sm-12">
                                    <div className="inner-column sticky-top">
                                        <div className="intro-video" style={{backgroundImage: 'url(https://via.placeholder.com/354x253)'}}>
                                        <a href={"../public/images/"+this.state.media.sample_video} className="lightbox-image intro-video-box"><span className="fa fa-play"><i className="ripple" /></span></a>
                                        <h4>Preview this course</h4>
                                    </div>
                                    <div className="price">{this.state.media.fees}</div>
                                    <Link to={"/course-lessons/course-link"} className="theme-btn btn-style-two"><span className="txt">Buy Now <i className="fa fa-angle-right" /></span></Link>
                                </div>
                                </div>
                                ):(null)} 
                                
                            
                        </div>
                    </div>
                </div>
            </section>
		</React.Fragment>
	);
  }
}

class CourseLessons extends Component {
    
  /*constructor(props) {
        super();
        this.state = {
            id: props.match.params.token,
            name: props.match.params.name,
            details:[],
            modals:[],
            cutting_status: 0,
            cuttings: [],
            cutting_charge: 0,
            cleaning: 0,
            additional_images: [],
            save_amt: '',
            offer_per: '',
            hot_offer: '',
        }
        this.childKey = 0;
      
        this.getOptions=this.getOptions.bind(this);
        this.provideGramOptions = this.provideGramOptions.bind(this);
        this.provideLitreOptions = this.provideLitreOptions.bind(this);
        this.provideOptions = this.provideOptions.bind(this);
        this.addToCart = this.addToCart.bind(this);
        this.categoryChange = this.categoryChange.bind(this);
      
        //FETCH CATEGORIES
        let formData2 = new FormData();
		formData2.append('if_cutting_for_product', props.match.params.token)
        axios({
			method: 'post',
			url: api_link+'SetupFetch.php',
			data: formData2,
		})
		.then(response => response.data)
        .then((data) => {
            if(data)
            {
                let formData5 = new FormData();
                formData5.append('only_cutting', "get_all")
                axios({
                    method: 'post',
                    url: api_link+'SetupFetch.php',
                    data: formData5,
                })
                .then(response => response.data)
                .then((data) => {
                    this.setState({ 
                        cleaning: data[0]['cleaning'],
                        cuttings: data,
                        cutting_status: 1
                    })
                 })
                .catch(function (response) {
                    //handle error
                    console.log(response)
                }); 
            }
         })
		.catch(function (response) {
			//handle error
			console.log(response)
		});
      
        let formData = new FormData();
          formData.append('fetch_additional_images', props.match.params.token)
        
          axios({
                method: 'post',
                url: api_link+'ProductsFetch.php',
                data: formData,
                config: { headers: {'Content-Type': 'multipart/form-data' }}
          }).then(response => response.data)
          .then((data) => {
              this.setState({
                additional_images: data,    
              })              
          })
    }
    
    componentDidMount(){
         var obj=this;
        
        //FETCH DETAILS
        let formData2 = new FormData();
		formData2.append('product_details_for_home', this.state.id)
        axios({
			method: 'post',
			url: api_link+'ProductsFetch.php',
			data: formData2,
		})
		.then(response => response.data)
        .then((data) => {
            obj.setState({ 
              details: data[0],
            })
            if(obj.state.details.multiple > 1)
            {
                //FETCH OPTIONS
                let formData2 = new FormData();
                formData2.append('get_options_for_products', this.state.id)
                axios({
                    method: 'post',
                    url: api_link+'ProductsFetch.php',
                    data: formData2,
                })
                .then(response => response.data)
                .then((data) => {
                    obj.setState({ 
                      modals: data,
                    })
                 })
                .catch(function (response) {
                    //handle error
                    console.log(response)
                });  
            }
         })
		.catch(function (response) {
			//handle error
			console.log(response)
		});  
    }
    
    UNSAFE_componentWillReceiveProps(props) {
        var obj=this;
        //FETCH DETAILS
        let formData2 = new FormData();
        formData2.append('product_details_for_home', props.match.params.token)
        axios({
            method: 'post',
            url: api_link+'ProductsFetch.php',
            data: formData2,
        })
        .then(response => response.data)
        .then((data) => {
            obj.setState({ 
              details: data[0],
            })
            if(obj.state.details.multiple > 1)
            {
                //FETCH OPTIONS
                let formData2 = new FormData();
                formData2.append('get_options_for_products', props.match.params.token)
                axios({
                    method: 'post',
                    url: api_link+'ProductsFetch.php',
                    data: formData2,
                })
                .then(response => response.data)
                .then((data) => {
                    obj.setState({ 
                      modals: data,
                    })
                 })
                .catch(function (response) {
                    //handle error
                    console.log(response)
                });  
            }
         })
        .catch(function (response) {
            //handle error
            console.log(response)
        }); 
        
        //FETCH CATEGORIES
            let formData10 = new FormData();
            formData10.append('if_cutting_for_product', props.match.params.token)
            axios({
                method: 'post',
                url: api_link+'SetupFetch.php',
                data: formData10,
            })
            .then(response => response.data)
            .then((data) => {
                if(data)
                {
                    let formData5 = new FormData();
                    formData5.append('only_cutting', "get_all")
                    axios({
                        method: 'post',
                        url: api_link+'SetupFetch.php',
                        data: formData5,
                    })
                    .then(response => response.data)
                    .then((data) => {
                        obj.setState({ 
                            cleaning: data[0]['cleaning'],
                            cuttings: data,
                            cutting_status: 1
                        })
                     })
                    .catch(function (response) {
                        //handle error
                        console.log(response)
                    }); 
                }
             })
            .catch(function (response) {
                //handle error
                console.log(response)
            }); 
    }
    
    getOptions(product_id, product_name, quantity_type, min_quantity, max_quantity, quantity_increase_by, price){
      
        if(quantity_type === "KG")
        {
            return this.provideGramOptions(product_id, min_quantity, max_quantity, quantity_increase_by);
        }
        else if(quantity_type === "Litre")
        {
            return this.provideLitreOptions(product_id, min_quantity, max_quantity, quantity_increase_by);
        }
        else
        {
            return this.provideOptions(product_id, quantity_type, min_quantity, max_quantity, quantity_increase_by);
        }
    }
  
    provideGramOptions(pid, min_quantity, max_quantity, quantity_increase_by) {
        // you can access the item object and the event object
        var min_kg = Math.floor(min_quantity/1000);
        var min_gram = min_quantity-(min_kg*1000);
        var max_kg = Math.floor(max_quantity/1000);
      
        var select='<div class="col-lg-4 col-sm-4 col-xs-4" style="padding-right:0px"><div class="select">';
        select+="<br/><select id='kg_option"+pid+"' name='slct' min_quantity='"+min_quantity+"' max_quantity='"+max_quantity+"' quantity_increase_by='"+quantity_increase_by+"'>";
      
        for(var i=min_kg; i<=max_kg; i++)
        {
            select+="<option value='"+i+"'>"+i+" KG</option>";
        }
      
        select+="</select></div></div>";
      
        if(quantity_increase_by < 1000)
        {
            select+='<div class="col-lg-4 col-sm-4 col-xs-4" style="padding-right:0px"><div class="select">';
            select+="<br/><select id='gram_option"+pid+"' name='slct' min_quantity='"+min_quantity+"' max_quantity='"+max_quantity+"' quantity_increase_by='"+quantity_increase_by+"'>";

            for(var j=window.parseInt(min_gram); j<1000;)
            {
                select+="<option value='"+j+"'>"+j+" G</option>";
                j=j+window.parseInt(quantity_increase_by)
            }

            select+="</select></div>";
        }
        
        return select;
    }
  
    provideLitreOptions(pid, min_quantity, max_quantity, quantity_increase_by) {
        // you can access the item object and the event object
        var min_kg = Math.floor(min_quantity/1000);
        var min_gram = min_quantity-(min_kg*1000);
        var max_kg = Math.floor(max_quantity/1000);
      
        var select='<div class="col-lg-4 col-sm-4 col-xs-4" style="padding-right:0px"><div class="select">';
        select+="<br/><select id='l_option"+pid+"' name='slct' min_quantity='"+min_quantity+"' max_quantity='"+max_quantity+"' quantity_increase_by='"+quantity_increase_by+"'>";
      
        for(var i=min_kg; i<=max_kg; i++)
        {
            select+="<option value='"+i+"'>"+i+" L</option>";
        }
      
        select+="</select></div></div>";
      
        if(quantity_increase_by < 1000)
        {
            select='<div class="col-lg-4 col-sm-4 col-xs-4" style="padding-right:0px"><div class="select">';
            select+="<br/><select id='ml_option"+pid+"' name='slct' min_quantity='"+min_quantity+"' max_quantity='"+max_quantity+"' quantity_increase_by='"+quantity_increase_by+"'>";

            for(var j=window.parseInt(min_gram); j<1000;)
            {
                select+="<option value='"+j+"'>"+j+" ML</option>";
                j=j+window.parseInt(quantity_increase_by)
            }

            select+="</select></div></div>";
        }
        
        return select;
    }
  
    provideOptions(pid, quantity_type, min_quantity, max_quantity, quantity_increase_by) {

        var select='<div class="col-lg-8 col-sm-8 col-xs-8"><div class="select">';
        select+="<select id='other_option"+pid+"' name='slct'>";
      
        for(var i=window.parseInt(min_quantity); i<=window.parseInt(max_quantity); i=i+window.parseInt(quantity_increase_by))
        {
            select+="<option value='"+i+"'>"+i+" "+quantity_type+"</option>";
        }
      
        select+="</select></div></div>";
        
        return select;
    }
    
    addToCart(product_id, product_name, quantity_type, min_quantity, max_quantity, quantity_increase_by, price, image, tamil_name){
        var arr={}
        arr['product_id']=product_id;
        arr['product_name']=product_name;
        arr['product_tamil_name']=tamil_name;
        arr['product_price']=price;
        arr['product_type']=quantity_type;
        arr['product_image']=image;
      
        if(quantity_type === "KG")
        {
            if($("#gram_option"+product_id).length)
            {
                arr['product_quantity']=(window.parseInt($("#kg_option"+product_id).val())*1000) + window.parseInt($("#gram_option"+product_id).val());
            }
            else
            {
                arr['product_quantity']=window.parseInt($("#kg_option"+product_id).val())*1000;
            }
            arr['final_price'] = arr['product_quantity'] * (price/1000);
        }
        else if(quantity_type === "Litre")
        {
            if($("#ml_option"+product_id).length)
            {
                arr['product_quantity']=(window.parseInt($("#l_option"+product_id).val())*1000) + window.parseInt($("#ml_option"+product_id).val());
            }
            else
            {
                arr['product_quantity']=window.parseInt($("#l_option"+product_id).val())*1000;
            }
            arr['final_price'] = arr['product_quantity'] * (price/1000);
        }
        else
        {
            arr['product_quantity']=window.parseInt($("#other_option"+product_id).val());
            arr['final_price']=price*arr['product_quantity'];
        }
     
        if(this.state.cutting_status)
        {
            if(quantity_type === "KG" || quantity_type === "Litre")
            {
                arr['cleaning']=arr['product_quantity']*(this.state.cleaning/1000);
                arr['cutting_charge']=arr['product_quantity']*($("#cutting_charge"+product_id).val()/1000);
            }
        }
        
        addItem(product_id,arr['product_quantity'],quantity_type,price,arr['final_price'], arr);
      
        $("#added_message").show();
        setTimeout(function(){
          $("#added_message").hide();
        }, 2500)
//        window.history.pushState('', '', '/agent/view-order/'+data.replace('ok','')+'/'+this.state.user_name)
//        this.props.history.push('/agent/view-order/'+data.replace('ok','')+'/'+this.state.user_name);
    }
    
    categoryChange(p_id){
        this.setState({
            id: p_id,
        })
        window.history.pushState('', '', '/product_detail/'+p_id+'/'+this.state.name)
        this.props.history.push('/product_detail/'+p_id+'/'+this.state.name);
    }
    
    goBack(){
        window.history.back();
    }*/
    
    componentDidMount(){
        $("script[src='js/script.js']").remove();
        const script = document.createElement("script");
        script.src = "js/script.js";
        document.body.appendChild(script);
        window.scrollTo(0, 0)
    }

    componentDidUpdate(prevProps) {
        if (this.props.path === this.props.location.pathname && this.props.location.pathname !== prevProps.location.pathname) {
            window.scrollTo(0, 0)
        }
    }
    
  render() {
    ++this.childKey;

    return (
		<React.Fragment>
            <section className="page-title">
                <div className="auto-container">
                    <h1>Course Lesson</h1>
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
            
            <section className="intro-section-two">
                <div className="patern-layer-one paroller" data-paroller-factor="0.40" data-paroller-factor-lg="0.20" data-paroller-type="foreground" data-paroller-direction="vertical" style={{backgroundImage: 'url(images/icons/icon-1.png)'}} />
                <div className="patern-layer-two paroller" data-paroller-factor="0.40" data-paroller-factor-lg="-0.20" data-paroller-type="foreground" data-paroller-direction="vertical" style={{backgroundImage: 'url(images/icons/icon-2.png)'}} />
                <div className="circle-one" />
                    <div className="auto-container">
                        <div className="inner-container">
                            <div className="row clearfix">
                                {/* Content Column */}
                                <div className="content-column col-lg-8 col-md-12 col-sm-12">
                                    <div className="inner-column">
                                        <div className="course-video-box">
                                            <div style={{padding: '56.25% 0 0 0', position: 'relative'}}><iframe src="https://player.vimeo.com/video/243885948?color=ffffff&title=0&byline=0&portrait=0" style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%'}} frameBorder={0} allow="autoplay; fullscreen" allowFullScreen />
                                        </div>
                                    </div>
                                    {/* Intro Info Tabs*/}
                                    <div className="intro-info-tabs">
                                        {/* Intro Tabs*/}
                                        <div className="intro-tabs tabs-box">
                                            {/*Tab Btns*/}
                                            <ul className="tab-btns tab-buttons clearfix">
                                                <li data-tab="#prod-overview" className="tab-btn active-btn">Overview</li>
                                                <li data-tab="#prod-curriculum" className="tab-btn">Curriculum</li>
                                                <li data-tab="#prod-announcement" className="tab-btn">Announcement</li>
                                                <li data-tab="#prod-faq" className="tab-btn">FAQ</li>
                                                <li data-tab="#prod-reviews" className="tab-btn">Reviews</li>
                                            </ul>
                                            {/*Tabs Container*/}
                                            <div className="tabs-content">
                                                {/*Tab / Active Tab*/}
                                                <div className="tab active-tab" id="prod-overview">
                                                    <div className="content">
                                                        {/* Cource Overview */}
                                                        <div className="course-overview">
                                                            <div className="inner-box">
                                                                <h4>25 That Prevent Job Seekers From Overcoming Failure</h4>
                                                                <p>Phasellus enim magna, varius et commodo ut, ultricies vitae velit. Ut nulla tellus, eleifend euismod pellentesque vel, sagittis vel justo. In libero urna, venenatis sit amet ornare non, suscipit nec risus. Sed consequat justo non mauris pretium at tempor justo sodales. Quisque tincidunt laoreet malesuada. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur.</p>
                                                                <ul className="student-list">
                                                                    <li>23,564 Total Students</li>
                                                                    <li><span className="theme_color">4.5</span> <span className="fa fa-star" /><span className="fa fa-star" /><span className="fa fa-star" /><span className="fa fa-star" /><span className="fa fa-star" /> (1254 Rating)</li>
                                                                    <li>256 Reviews</li>
                                                                </ul>
                                                                <h3>What you’ll learn?</h3>
                                                                <ul className="review-list">
                                                                    <li>Phasellus enim magna, varius et commodo ut.</li>
                                                                    <li>Sed consequat justo non mauris pretium at tempor justo.</li>
                                                                    <li>Ut nulla tellus, eleifend euismod pellentesque vel, sagittis vel justo</li>
                                                                    <li>Phasellus enim magna, varius et commodo ut.</li>
                                                                    <li>Phasellus enim magna, varius et commodo ut.</li>
                                                                    <li>Sed consequat justo non mauris pretium at tempor justo.</li>
                                                                    <li>Ut nulla tellus, eleifend euismod pellentesque vel, sagittis vel justo</li>
                                                                    <li>Phasellus enim magna, varius et commodo ut.</li>
                                                                </ul>
                                                                <h3>Requirements</h3>
                                                                <ul className="requirement-list">
                                                                    <li>Phasellus enim magna, varius et commodo ut, ultricies vitae velit. Ut nulla tellus, eleifend euismod pellentesque vel, sagittis vel justo</li>
                                                                    <li>Ultricies vitae velit. Ut nulla tellus, eleifend euismod pellentesque vel.</li>
                                                                    <li>Phasellus enim magna, varius et commodo ut.</li>
                                                                    <li>Varius et commodo ut, ultricies vitae velit. Ut nulla tellus.</li>
                                                                    <li>Phasellus enim magna, varius et commodo ut.</li>
                                                                </ul>
                                                                <h3>Instructors</h3>
                                                                <div className="row clearfix">
                                                                    {/* Student Block */}
                                                                    <div className="student-block col-lg-6 col-md-6 col-sm-12">
                                                                        <div className="block-inner">
                                                                            <div className="image">
                                                                                <img src="https://via.placeholder.com/278x319" alt="" />
                                                                            </div>
                                                                            <h2>Stephane Smith</h2>
                                                                            <div className="text">Certified instructor Architecture&amp; Developer</div>
                                                                            <div className="social-box">
                                                                                <a href="#!" className="fa fa-facebook-square" />
                                                                                <a href="#!" className="fa fa-twitter-square" />
                                                                                <a href="#!" className="fa fa-linkedin-square" />
                                                                                <a href="#!" className="fa fa-github" />
                                                                            </div>
                                                                            <a href="#!" className="more">Know More <span className="fa fa-angle-right" /></a>
                                                                        </div>
                                                                    </div>
                                                                    {/* Student Block */}
                                                                    <div className="student-block col-lg-6 col-md-6 col-sm-12">
                                                                        <div className="block-inner">
                                                                            <div className="image">
                                                                                <img src="https://via.placeholder.com/278x319" alt="" />
                                                                            </div>
                                                                            <h2>Marvin Zona</h2>
                                                                            <div className="text">Certified instructor Architecture&amp; Developer</div>
                                                                            <div className="social-box">
                                                                                <a href="#!" className="fa fa-facebook-square" />
                                                                                <a href="#!" className="fa fa-twitter-square" />
                                                                                <a href="#!" className="fa fa-linkedin-square" />
                                                                                <a href="#!" className="fa fa-github" />
                                                                            </div>
                                                                            <a href="#!" className="more">Know More <span className="fa fa-angle-right" /></a>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* Tab */}
                                                <div className="tab" id="prod-curriculum">
                                                    <div className="content">
                                                        {/* Accordion Box */}
                                                        <ul className="accordion-box">
                                                            {/* Block */}
                                                            <li className="accordion block">
                                                                <div className="acc-btn active">
                                                                    <div className="icon-outer"><span className="icon icon-plus flaticon-angle-arrow-down" /></div>
                                                                    UI/ UX Introduction
                                                                </div>
                                                                <div className="acc-content current">
                                                                    <div className="content">
                                                                        <div className="clearfix">
                                                                            <div className="pull-left">
                                                                                <a href="https://www.youtube.com/watch?v=kxPCFljwJws" className="lightbox-image play-icon"><span className="fa fa-play" />What is UI/ UX Design?</a>
                                                                            </div>
                                                                            <div className="pull-right">
                                                                                <div className="minutes">35 Minutes</div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="content">
                                                                        <div className="clearfix">
                                                                            <div className="pull-left">
                                                                                <a href="https://www.youtube.com/watch?v=kxPCFljwJws" className="lightbox-image play-icon"><span className="fa fa-play"><i className="ripple" /></span>What is UI/ UX Design?</a>
                                                                            </div>
                                                                            <div className="pull-right">
                                                                                <div className="minutes">35 Minutes</div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="content">
                                                                        <div className="clearfix">
                                                                            <div className="pull-left">
                                                                                <a href="https://www.youtube.com/watch?v=kxPCFljwJws" className="lightbox-image play-icon"><span className="fa fa-play" />What is UI/ UX Design?</a>
                                                                            </div>
                                                                            <div className="pull-right">
                                                                                <div className="minutes">35 Minutes</div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                            {/* Block */}
                                                            <li className="accordion block">
                                                                <div className="acc-btn">
                                                                    <div className="icon-outer"><span className="icon icon-plus flaticon-angle-arrow-down" /></div>
                                                                    Color Theory
                                                                </div>
                                                                <div className="acc-content">
                                                                    <div className="content">
                                                                        <div className="clearfix">
                                                                            <div className="pull-left">
                                                                                <a href="https://www.youtube.com/watch?v=kxPCFljwJws" className="lightbox-image play-icon"><span className="fa fa-play" />What is UI/ UX Design?</a>
                                                                            </div>
                                                                            <div className="pull-right">
                                                                                <div className="minutes">35 Minutes</div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="content">
                                                                        <div className="clearfix">
                                                                            <div className="pull-left">
                                                                                <a href="https://www.youtube.com/watch?v=kxPCFljwJws" className="lightbox-image play-icon"><span className="fa fa-play"><i className="ripple" /></span>What is UI/ UX Design?</a>
                                                                            </div>
                                                                            <div className="pull-right">
                                                                                <div className="minutes">35 Minutes</div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="content">
                                                                        <div className="clearfix">
                                                                            <div className="pull-left">
                                                                                <a href="https://www.youtube.com/watch?v=kxPCFljwJws" className="lightbox-image play-icon"><span className="fa fa-play" />What is UI/ UX Design?</a>
                                                                            </div>
                                                                            <div className="pull-right">
                                                                                <div className="minutes">35 Minutes</div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                            {/* Block */}
                                                            <li className="accordion block">
                                                                <div className="acc-btn">
                                                                    <div className="icon-outer"><span className="icon icon-plus flaticon-angle-arrow-down" /></div>
                                                                    Basic Typography
                                                                </div>
                                                                <div className="acc-content">
                                                                    <div className="content">
                                                                        <div className="clearfix">
                                                                            <div className="pull-left">
                                                                                <a href="https://www.youtube.com/watch?v=kxPCFljwJws" className="lightbox-image play-icon"><span className="fa fa-play" />What is UI/ UX Design?</a>
                                                                            </div>
                                                                            <div className="pull-right">
                                                                                <div className="minutes">35 Minutes</div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="content">
                                                                        <div className="clearfix">
                                                                            <div className="pull-left">
                                                                                <a href="https://www.youtube.com/watch?v=kxPCFljwJws" className="lightbox-image play-icon"><span className="fa fa-play"><i className="ripple" /></span>What is UI/ UX Design?</a>
                                                                            </div>
                                                                            <div className="pull-right">
                                                                                <div className="minutes">35 Minutes</div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="content">
                                                                        <div className="clearfix">
                                                                            <div className="pull-left">
                                                                                <a href="https://www.youtube.com/watch?v=kxPCFljwJws" className="lightbox-image play-icon"><span className="fa fa-play" />What is UI/ UX Design?</a>
                                                                            </div>
                                                                            <div className="pull-right">
                                                                                <div className="minutes">35 Minutes</div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                            {/* Block */}
                                                            <li className="accordion block">
                                                                <div className="acc-btn">
                                                                    <div className="icon-outer"><span className="icon icon-plus flaticon-angle-arrow-down" /></div>
                                                                    Wireframing &amp; Prototyping
                                                                </div>
                                                                <div className="acc-content">
                                                                    <div className="content">
                                                                        <div className="clearfix">
                                                                            <div className="pull-left">
                                                                                <a href="https://www.youtube.com/watch?v=kxPCFljwJws" className="lightbox-image play-icon"><span className="fa fa-play" />What is UI/ UX Design?</a>
                                                                            </div>
                                                                            <div className="pull-right">
                                                                                <div className="minutes">35 Minutes</div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="content">
                                                                        <div className="clearfix">
                                                                            <div className="pull-left">
                                                                                <a href="https://www.youtube.com/watch?v=kxPCFljwJws" className="lightbox-image play-icon"><span className="fa fa-play"><i className="ripple" /></span>What is UI/ UX Design?</a>
                                                                            </div>
                                                                            <div className="pull-right">
                                                                                <div className="minutes">35 Minutes</div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="content">
                                                                        <div className="clearfix">
                                                                            <div className="pull-left">
                                                                                <a href="https://www.youtube.com/watch?v=kxPCFljwJws" className="lightbox-image play-icon"><span className="fa fa-play" />What is UI/ UX Design?</a>
                                                                            </div>
                                                                            <div className="pull-right">
                                                                                <div className="minutes">35 Minutes</div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                {/* Tab */}
                                                <div className="tab" id="prod-announcement">
                                                    <div className="content">
                                                        {/* Accordion Box */}
                                                        <ul className="accordion-box">
                                                            {/* Block */}
                                                            <li className="accordion block">
                                                                <div className="acc-btn active">
                                                                    <div className="icon-outer"><span className="icon icon-plus flaticon-angle-arrow-down" /></div>
                                                                    UI/ UX Introduction
                                                                </div>
                                                                <div className="acc-content current">
                                                                    <div className="content">
                                                                        <div className="clearfix">
                                                                            <div className="pull-left">
                                                                                <a href="https://www.youtube.com/watch?v=kxPCFljwJws" className="lightbox-image play-icon"><span className="fa fa-play" />What is UI/ UX Design?</a>
                                                                            </div>
                                                                            <div className="pull-right">
                                                                                <div className="minutes">35 Minutes</div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="content">
                                                                        <div className="clearfix">
                                                                            <div className="pull-left">
                                                                                <a href="https://www.youtube.com/watch?v=kxPCFljwJws" className="lightbox-image play-icon"><span className="fa fa-play"><i className="ripple" /></span>What is UI/ UX Design?</a>
                                                                            </div>
                                                                            <div className="pull-right">
                                                                                <div className="minutes">35 Minutes</div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="content">
                                                                        <div className="clearfix">
                                                                            <div className="pull-left">
                                                                                <a href="https://www.youtube.com/watch?v=kxPCFljwJws" className="lightbox-image play-icon"><span className="fa fa-play" />What is UI/ UX Design?</a>
                                                                            </div>
                                                                            <div className="pull-right">
                                                                                <div className="minutes">35 Minutes</div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                            {/* Block */}
                                                            <li className="accordion block">
                                                                <div className="acc-btn">
                                                                    <div className="icon-outer"><span className="icon icon-plus flaticon-angle-arrow-down" /></div>
                                                                    Color Theory
                                                                </div>
                                                                <div className="acc-content">
                                                                    <div className="content">
                                                                        <div className="clearfix">
                                                                            <div className="pull-left">
                                                                                <a href="https://www.youtube.com/watch?v=kxPCFljwJws" className="lightbox-image play-icon"><span className="fa fa-play" />What is UI/ UX Design?</a>
                                                                            </div>
                                                                            <div className="pull-right">
                                                                                <div className="minutes">35 Minutes</div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="content">
                                                                        <div className="clearfix">
                                                                            <div className="pull-left">
                                                                                <a href="https://www.youtube.com/watch?v=kxPCFljwJws" className="lightbox-image play-icon"><span className="fa fa-play"><i className="ripple" /></span>What is UI/ UX Design?</a>
                                                                            </div>
                                                                            <div className="pull-right">
                                                                                <div className="minutes">35 Minutes</div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="content">
                                                                        <div className="clearfix">
                                                                            <div className="pull-left">
                                                                                <a href="https://www.youtube.com/watch?v=kxPCFljwJws" className="lightbox-image play-icon"><span className="fa fa-play" />What is UI/ UX Design?</a>
                                                                            </div>
                                                                            <div className="pull-right">
                                                                                <div className="minutes">35 Minutes</div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                            {/* Block */}
                                                            <li className="accordion block">
                                                                <div className="acc-btn">
                                                                    <div className="icon-outer"><span className="icon icon-plus flaticon-angle-arrow-down" /></div>
                                                                    Basic Typography
                                                                </div>
                                                                <div className="acc-content">
                                                                    <div className="content">
                                                                        <div className="clearfix">
                                                                            <div className="pull-left">
                                                                                <a href="https://www.youtube.com/watch?v=kxPCFljwJws" className="lightbox-image play-icon"><span className="fa fa-play" />What is UI/ UX Design?</a>
                                                                            </div>
                                                                            <div className="pull-right">
                                                                                <div className="minutes">35 Minutes</div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="content">
                                                                        <div className="clearfix">
                                                                            <div className="pull-left">
                                                                                <a href="https://www.youtube.com/watch?v=kxPCFljwJws" className="lightbox-image play-icon"><span className="fa fa-play"><i className="ripple" /></span>What is UI/ UX Design?</a>
                                                                            </div>
                                                                            <div className="pull-right">
                                                                                <div className="minutes">35 Minutes</div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="content">
                                                                        <div className="clearfix">
                                                                            <div className="pull-left">
                                                                                <a href="https://www.youtube.com/watch?v=kxPCFljwJws" className="lightbox-image play-icon"><span className="fa fa-play" />What is UI/ UX Design?</a>
                                                                            </div>
                                                                            <div className="pull-right">
                                                                                <div className="minutes">35 Minutes</div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                            {/* Block */}
                                                            <li className="accordion block">
                                                                <div className="acc-btn">
                                                                    <div className="icon-outer"><span className="icon icon-plus flaticon-angle-arrow-down" /></div>
                                                                    Wireframing &amp; Prototyping
                                                                </div>
                                                                <div className="acc-content">
                                                                    <div className="content">
                                                                        <div className="clearfix">
                                                                            <div className="pull-left">
                                                                                <a href="https://www.youtube.com/watch?v=kxPCFljwJws" className="lightbox-image play-icon"><span className="fa fa-play" />What is UI/ UX Design?</a>
                                                                            </div>
                                                                            <div className="pull-right">
                                                                                <div className="minutes">35 Minutes</div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="content">
                                                                        <div className="clearfix">
                                                                            <div className="pull-left">
                                                                                <a href="https://www.youtube.com/watch?v=kxPCFljwJws" className="lightbox-image play-icon"><span className="fa fa-play"><i className="ripple" /></span>What is UI/ UX Design?</a>
                                                                            </div>
                                                                            <div className="pull-right">
                                                                                <div className="minutes">35 Minutes</div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="content">
                                                                        <div className="clearfix">
                                                                            <div className="pull-left">
                                                                                <a href="https://www.youtube.com/watch?v=kxPCFljwJws" className="lightbox-image play-icon"><span className="fa fa-play" />What is UI/ UX Design?</a>
                                                                            </div>
                                                                            <div className="pull-right">
                                                                                <div className="minutes">35 Minutes</div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                {/* Tab */}
                                                <div className="tab" id="prod-faq">
                                                    <div className="content">
                                                        {/* Accordion Box */}
                                                        <ul className="accordion-box">
                                                            {/* Block */}
                                                            <li className="accordion block">
                                                                <div className="acc-btn active">
                                                                    <div className="icon-outer"><span className="icon icon-plus flaticon-angle-arrow-down" /></div>
                                                                    UI/ UX Introduction
                                                                </div>
                                                                <div className="acc-content current">
                                                                    <div className="content">
                                                                        <div className="clearfix">
                                                                            <div className="pull-left">
                                                                                <a href="https://www.youtube.com/watch?v=kxPCFljwJws" className="lightbox-image play-icon"><span className="fa fa-play" />What is UI/ UX Design?</a>
                                                                            </div>
                                                                            <div className="pull-right">
                                                                                <div className="minutes">35 Minutes</div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="content">
                                                                        <div className="clearfix">
                                                                            <div className="pull-left">
                                                                                <a href="https://www.youtube.com/watch?v=kxPCFljwJws" className="lightbox-image play-icon"><span className="fa fa-play"><i className="ripple" /></span>What is UI/ UX Design?</a>
                                                                            </div>
                                                                            <div className="pull-right">
                                                                                <div className="minutes">35 Minutes</div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="content">
                                                                        <div className="clearfix">
                                                                            <div className="pull-left">
                                                                                <a href="https://www.youtube.com/watch?v=kxPCFljwJws" className="lightbox-image play-icon"><span className="fa fa-play" />What is UI/ UX Design?</a>
                                                                            </div>
                                                                            <div className="pull-right">
                                                                                <div className="minutes">35 Minutes</div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                            {/* Block */}
                                                            <li className="accordion block">
                                                                <div className="acc-btn">
                                                                    <div className="icon-outer"><span className="icon icon-plus flaticon-angle-arrow-down" /></div>
                                                                    Color Theory
                                                                </div>
                                                                <div className="acc-content">
                                                                    <div className="content">
                                                                        <div className="clearfix">
                                                                            <div className="pull-left">
                                                                                <a href="https://www.youtube.com/watch?v=kxPCFljwJws" className="lightbox-image play-icon"><span className="fa fa-play" />What is UI/ UX Design?</a>
                                                                            </div>
                                                                            <div className="pull-right">
                                                                                <div className="minutes">35 Minutes</div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="content">
                                                                        <div className="clearfix">
                                                                            <div className="pull-left">
                                                                                <a href="https://www.youtube.com/watch?v=kxPCFljwJws" className="lightbox-image play-icon"><span className="fa fa-play"><i className="ripple" /></span>What is UI/ UX Design?</a>
                                                                            </div>
                                                                            <div className="pull-right">
                                                                                <div className="minutes">35 Minutes</div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="content">
                                                                        <div className="clearfix">
                                                                            <div className="pull-left">
                                                                                <a href="https://www.youtube.com/watch?v=kxPCFljwJws" className="lightbox-image play-icon"><span className="fa fa-play" />What is UI/ UX Design?</a>
                                                                            </div>
                                                                            <div className="pull-right">
                                                                                <div className="minutes">35 Minutes</div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                            {/* Block */}
                                                            <li className="accordion block">
                                                                <div className="acc-btn">
                                                                    <div className="icon-outer"><span className="icon icon-plus flaticon-angle-arrow-down" /></div>
                                                                    Basic Typography
                                                                </div>
                                                                <div className="acc-content">
                                                                    <div className="content">
                                                                        <div className="clearfix">
                                                                            <div className="pull-left">
                                                                                <a href="https://www.youtube.com/watch?v=kxPCFljwJws" className="lightbox-image play-icon"><span className="fa fa-play" />What is UI/ UX Design?</a>
                                                                            </div>
                                                                            <div className="pull-right">
                                                                                <div className="minutes">35 Minutes</div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="content">
                                                                        <div className="clearfix">
                                                                            <div className="pull-left">
                                                                                <a href="https://www.youtube.com/watch?v=kxPCFljwJws" className="lightbox-image play-icon"><span className="fa fa-play"><i className="ripple" /></span>What is UI/ UX Design?</a>
                                                                            </div>
                                                                            <div className="pull-right">
                                                                                <div className="minutes">35 Minutes</div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="content">
                                                                        <div className="clearfix">
                                                                            <div className="pull-left">
                                                                                <a href="https://www.youtube.com/watch?v=kxPCFljwJws" className="lightbox-image play-icon"><span className="fa fa-play" />What is UI/ UX Design?</a>
                                                                            </div>
                                                                            <div className="pull-right">
                                                                                <div className="minutes">35 Minutes</div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                            {/* Block */}
                                                            <li className="accordion block">
                                                                <div className="acc-btn">
                                                                    <div className="icon-outer"><span className="icon icon-plus flaticon-angle-arrow-down" /></div>
                                                                    Wireframing &amp; Prototyping
                                                                </div>
                                                                <div className="acc-content">
                                                                    <div className="content">
                                                                        <div className="clearfix">
                                                                            <div className="pull-left">
                                                                                <a href="https://www.youtube.com/watch?v=kxPCFljwJws" className="lightbox-image play-icon"><span className="fa fa-play" />What is UI/ UX Design?</a>
                                                                            </div>
                                                                            <div className="pull-right">
                                                                                <div className="minutes">35 Minutes</div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="content">
                                                                        <div className="clearfix">
                                                                            <div className="pull-left">
                                                                                <a href="https://www.youtube.com/watch?v=kxPCFljwJws" className="lightbox-image play-icon"><span className="fa fa-play"><i className="ripple" /></span>What is UI/ UX Design?</a>
                                                                            </div>
                                                                            <div className="pull-right">
                                                                                <div className="minutes">35 Minutes</div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="content">
                                                                        <div className="clearfix">
                                                                            <div className="pull-left">
                                                                                <a href="https://www.youtube.com/watch?v=kxPCFljwJws" className="lightbox-image play-icon"><span className="fa fa-play" />What is UI/ UX Design?</a>
                                                                            </div>
                                                                            <div className="pull-right">
                                                                                <div className="minutes">35 Minutes</div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                {/* Tab */}
                                                <div className="tab" id="prod-reviews">
                                                    <div className="content">
                                                        <div className="cource-review-box">
                                                            <h4>Stephane Smith</h4>
                                                            <div className="rating">
                                                                <span className="total-rating">4.5</span> <span className="fa fa-star" /><span className="fa fa-star" /><span className="fa fa-star" /><span className="fa fa-star" /><span className="fa fa-star" />  256 Reviews
                                                            </div>
                                                            <div className="text">Phasellus enim magna, varius et commodo ut, ultricies vitae velit. Ut nulla tellus, eleifend euismod pellentesque vel, sagittis vel justo. In libero urna, venenatis sit amet ornare non, suscipit nec risus.</div>
                                                            <div className="helpful">Was this review helpful?</div>
                                                            <ul className="like-option">
                                                                <li><span className="icon fa fa-thumbs-o-up" /></li>
                                                                <li><span className="icon fa fa-thumbs-o-down" /></li>
                                                                <span className="report">Report</span>
                                                            </ul>
                                                        </div>
                                                        <div className="cource-review-box">
                                                            <h4>Anna Sthesia</h4>
                                                            <div className="rating">
                                                                <span className="total-rating">4.5</span> <span className="fa fa-star" /><span className="fa fa-star" /><span className="fa fa-star" /><span className="fa fa-star" /><span className="fa fa-star" />  256 Reviews
                                                            </div>
                                                            <div className="text">Phasellus enim magna, varius et commodo ut, ultricies vitae velit. Ut nulla tellus, eleifend euismod pellentesque vel, sagittis vel justo. In libero urna, venenatis sit amet ornare non, suscipit nec risus.</div>
                                                            <div className="helpful">Was this review helpful?</div>
                                                            <ul className="like-option">
                                                                <li><span className="icon fa fa-thumbs-o-up" /></li>
                                                                <li><span className="icon fa fa-thumbs-o-down" /></li>
                                                                <span className="report">Report</span>
                                                            </ul>
                                                        </div>
                                                        <div className="cource-review-box">
                                                            <h4>Petey Cruiser</h4>
                                                            <div className="rating">
                                                                <span className="total-rating">4.5</span> <span className="fa fa-star" /><span className="fa fa-star" /><span className="fa fa-star" /><span className="fa fa-star" /><span className="fa fa-star" />  256 Reviews
                                                            </div>
                                                            <div className="text">Phasellus enim magna, varius et commodo ut, ultricies vitae velit. Ut nulla tellus, eleifend euismod pellentesque vel, sagittis vel justo. In libero urna, venenatis sit amet ornare non, suscipit nec risus.</div>
                                                            <div className="helpful">Was this review helpful?</div>
                                                            <ul className="like-option">
                                                                <li><span className="icon fa fa-thumbs-o-up" /></li>
                                                                <li><span className="icon fa fa-thumbs-o-down" /></li>
                                                                <span className="report">Report</span>
                                                            </ul>
                                                        </div>
                                                        <div className="cource-review-box">
                                                            <h4>Rick O'Shea</h4>
                                                            <div className="rating">
                                                                <span className="total-rating">4.5</span> <span className="fa fa-star" /><span className="fa fa-star" /><span className="fa fa-star" /><span className="fa fa-star" /><span className="fa fa-star" />  256 Reviews
                                                            </div>
                                                            <div className="text">Phasellus enim magna, varius et commodo ut, ultricies vitae velit. Ut nulla tellus, eleifend euismod pellentesque vel, sagittis vel justo. In libero urna, venenatis sit amet ornare non, suscipit nec risus.</div>
                                                            <div className="helpful">Was this review helpful?</div>
                                                            <ul className="like-option">
                                                                <li><span className="icon fa fa-thumbs-o-up" /></li>
                                                                <li><span className="icon fa fa-thumbs-o-down" /></li>
                                                                <span className="report">Report</span>
                                                            </ul>
                                                            <a href="#!" className="more">View More</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Accordian Column */}
                            <div className="accordian-column col-lg-4 col-md-12 col-sm-12">
                                <div className="inner-column sticky-top">
                                    <h4>Table of contents</h4>
                                    {/* Accordion Box */}
                                    <ul className="accordion-box style-two">
                                        {/* Block */}
                                        <li className="accordion block">
                                            <div className="acc-btn active">
                                                <div className="icon-outer"><span className="icon icon-plus flaticon-angle-arrow-down" /></div>
                                                UI/ UX Introduction
                                            </div>
                                            <div className="acc-content current">
                                                <div className="content">
                                                    <div className="clearfix">
                                                        <div className="pull-left">
                                                            <a href="https://www.youtube.com/watch?v=kxPCFljwJws" className="lightbox-image play-icon"><span className="fa fa-play" />What is UI/ UX Design?</a>
                                                        </div>
                                                        <div className="pull-right">
                                                            <div className="minutes">2 Min 45 Sec</div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="content">
                                                    <div className="clearfix">
                                                        <div className="pull-left">
                                                            <a href="https://www.youtube.com/watch?v=kxPCFljwJws" className="lightbox-image play-icon"><span className="fa fa-play"><i className="ripple" /></span>What is UI/ UX Design?</a>
                                                        </div>
                                                        <div className="pull-right">
                                                            <div className="minutes">2 Min 45 Sec</div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="content">
                                                    <div className="clearfix">
                                                        <div className="pull-left">
                                                            <a href="https://www.youtube.com/watch?v=kxPCFljwJws" className="lightbox-image play-icon"><span className="fa fa-play" />What is UI/ UX Design?</a>
                                                        </div>
                                                        <div className="pull-right">
                                                            <div className="minutes">2 Min 45 Sec</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                        {/* Block */}
                                        <li className="accordion block">
                                            <div className="acc-btn">
                                                <div className="icon-outer"><span className="icon icon-plus flaticon-angle-arrow-down" /></div>
                                                Color Theory
                                            </div>
                                            <div className="acc-content">
                                                <div className="content">
                                                    <div className="clearfix">
                                                        <div className="pull-left">
                                                            <a href="https://www.youtube.com/watch?v=kxPCFljwJws" className="lightbox-image play-icon"><span className="fa fa-play" />What is UI/ UX Design?</a>
                                                        </div>
                                                        <div className="pull-right">
                                                            <div className="minutes">2 Min 45 Sec</div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="content">
                                                    <div className="clearfix">
                                                        <div className="pull-left">
                                                            <a href="https://www.youtube.com/watch?v=kxPCFljwJws" className="lightbox-image play-icon"><span className="fa fa-play"><i className="ripple" /></span>What is UI/ UX Design?</a>
                                                        </div>
                                                        <div className="pull-right">
                                                            <div className="minutes">2 Min 45 Sec</div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="content">
                                                    <div className="clearfix">
                                                        <div className="pull-left">
                                                            <a href="https://www.youtube.com/watch?v=kxPCFljwJws" className="lightbox-image play-icon"><span className="fa fa-play" />What is UI/ UX Design?</a>
                                                        </div>
                                                        <div className="pull-right">
                                                            <div className="minutes">2 Min 45 Sec</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                        {/* Block */}
                                        <li className="accordion block">
                                            <div className="acc-btn">
                                                <div className="icon-outer"><span className="icon icon-plus flaticon-angle-arrow-down" /></div>
                                                Basic Typography
                                            </div>
                                            <div className="acc-content">
                                                <div className="content">
                                                    <div className="clearfix">
                                                        <div className="pull-left">
                                                            <a href="https://www.youtube.com/watch?v=kxPCFljwJws" className="lightbox-image play-icon"><span className="fa fa-play" />What is UI/ UX Design?</a>
                                                        </div>
                                                        <div className="pull-right">
                                                            <div className="minutes">2 Min 45 Sec</div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="content">
                                                    <div className="clearfix">
                                                        <div className="pull-left">
                                                            <a href="https://www.youtube.com/watch?v=kxPCFljwJws" className="lightbox-image play-icon"><span className="fa fa-play"><i className="ripple" /></span>What is UI/ UX Design?</a>
                                                        </div>
                                                        <div className="pull-right">
                                                            <div className="minutes">2 Min 45 Sec</div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="content">
                                                    <div className="clearfix">
                                                        <div className="pull-left">
                                                            <a href="https://www.youtube.com/watch?v=kxPCFljwJws" className="lightbox-image play-icon"><span className="fa fa-play" />What is UI/ UX Design?</a>
                                                        </div>
                                                        <div className="pull-right">
                                                            <div className="minutes">2 Min 45 Sec</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                        {/* Block */}
                                        <li className="accordion block">
                                            <div className="acc-btn">
                                                <div className="icon-outer"><span className="icon icon-plus flaticon-angle-arrow-down" /></div>
                                                Wireframing &amp; Prototyping
                                            </div>
                                            <div className="acc-content">
                                                <div className="content">
                                                    <div className="clearfix">
                                                        <div className="pull-left">
                                                            <a href="https://www.youtube.com/watch?v=kxPCFljwJws" className="lightbox-image play-icon"><span className="fa fa-play" />What is UI/ UX Design?</a>
                                                        </div>
                                                        <div className="pull-right">
                                                            <div className="minutes">2 Min 45 Sec</div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="content">
                                                    <div className="clearfix">
                                                        <div className="pull-left">
                                                            <a href="https://www.youtube.com/watch?v=kxPCFljwJws" className="lightbox-image play-icon"><span className="fa fa-play"><i className="ripple" /></span>What is UI/ UX Design?</a>
                                                        </div>
                                                        <div className="pull-right">
                                                            <div className="minutes">2 Min 45 Sec</div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="content">
                                                    <div className="clearfix">
                                                        <div className="pull-left">
                                                            <a href="https://www.youtube.com/watch?v=kxPCFljwJws" className="lightbox-image play-icon"><span className="fa fa-play" />What is UI/ UX Design?</a>
                                                        </div>
                                                        <div className="pull-right">
                                                            <div className="minutes">2 Min 45 Sec</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
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
    CourseDetails,
    CourseLessons,
};