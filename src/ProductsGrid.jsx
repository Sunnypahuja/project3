import React, {Component} from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import $ from 'jquery';
import Parser from 'html-react-parser';

import { api_link, addItem, SearchBox ,server_link} from './Home';
import moment from 'moment';

class SeriesCategories extends Component {
    state={
        quiz:'',
    }
    /*constructor(props){
        super();
        this.state = {
            id: props.match.params.token,
            name: props.match.params.name,
            categories: [],
            sub_categories: [],
            products: [],
            banners: [],
            cutting_status: 0,
            cuttings: [],
            cutting_charge: 0,
            cleaning: 0,
        }
        this.childKey = 0;
      
        this.getAllCategories=this.getAllCategories.bind(this);
        this.getSubCategories=this.getSubCategories.bind(this);
        this.getProducts=this.getProducts.bind(this);
        this.getOptions=this.getOptions.bind(this);
        this.provideGramOptions = this.provideGramOptions.bind(this);
        this.provideLitreOptions = this.provideLitreOptions.bind(this);
        this.provideOptions = this.provideOptions.bind(this);
        this.addToCart = this.addToCart.bind(this);

        this.getAllCategories();
        this.getSubCategories();
        this.getProducts();
      
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
    }
  
    getAllCategories(){
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
    }
  
    getSubCategories(){
        var obj=this;
        //GET SUB CATEGORIES FOR CURRENT CATEGORY
        let profileForm=new FormData();
        profileForm.append("get_subcategories_from_child",obj.state.id);
        axios({
            method: 'post',
            url: api_link+'CategoriesFetch.php',
            data: profileForm,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
        .then(response => response.data)
        .then((data) => {
            obj.setState({ 
                sub_categories: data,
            })
         })
    }
  
    getProducts(){
        var obj=this;
        //GET ALL PRODUCTS FOR CURRENT CATEGORY
        let profileForm=new FormData();
        profileForm.append("fetch_products_for_catgory",obj.state.id);
        axios({
            method: 'post',
            url: api_link+'ProductsFetch.php',
            data: profileForm,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
        .then(response => response.data)
        .then((data) => {
            this.setState({ 
                products: data,
            })
         })
      
        //GET ALL BANNERS
        let bannerForm=new FormData();
        bannerForm.append("fetch_banners",obj.state.id);
        bannerForm.append("fetch_type","category");
        axios({
            method: 'post',
            url: api_link+'SetupFetch.php',
            data: bannerForm,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
        .then(response => response.data)
        .then((data) => {
            this.setState({ 
                banners: data,
            })
         })
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
  
    UNSAFE_componentWillReceiveProps(props) {
      
        var obj=this;
      
        if (this.state.token !== props.match.params.token) {
         
            obj.setState({
                id: props.match.params.token,
                name: props.match.params.name,
            })
          
             //GET SUB CATEGORIES FOR CURRENT CATEGORY
            let profileForm=new FormData();
            profileForm.append("get_subcategories_from_child",props.match.params.token);
            axios({
                method: 'post',
                url: api_link+'CategoriesFetch.php',
                data: profileForm,
                config: { headers: {'Content-Type': 'multipart/form-data' }}
            })
            .then(response => response.data)
            .then((data) => {
                obj.setState({ 
                    sub_categories: data,
                })
             })
          
            //GET ALL PRODUCTS FOR CURRENT CATEGORY
            let profileFor=new FormData();
            profileFor.append("fetch_products_for_catgory",props.match.params.token);
            axios({
                method: 'post',
                url: api_link+'ProductsFetch.php',
                data: profileFor,
                config: { headers: {'Content-Type': 'multipart/form-data' }}
            })
            .then(response => response.data)
            .then((data) => {
                obj.setState({ 
                    products: data,
                    cutting_status: 0,
                    cuttings: [],
                    banners: [],
                })
             })
          
            //GET ALL BANNERS
            let bannerForm=new FormData();
            bannerForm.append("fetch_banners",props.match.params.token);
            bannerForm.append("fetch_type","category");
            axios({
                method: 'post',
                url: api_link+'SetupFetch.php',
                data: bannerForm,
                config: { headers: {'Content-Type': 'multipart/form-data' }}
            })
            .then(response => response.data)
            .then((data) => {
                obj.setState({ 
                    banners: data,
                })
             })
          
            //FETCH CATEGORIES
            let formData2 = new FormData();
            formData2.append('if_cutting', props.match.params.token)
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
    }*/
    callQuiz = () =>{
        var obj = this;
        let formData = new FormData();
		formData.append('callQuiz', true);
        // console.log(formData)
        
        axios({
			method: 'post',
			url: api_link+'callQuiz.php',
			data: formData,
		})
		.then(response => response.data)
        .then((data) => {
            console.log("quiz",data)
            if(data['msg']=="ok")
            {
                obj.setState({ quiz: data.data})
                console.log("yoyo",this.state)
            }
         })
		.catch(function (response) {
			});

    }
    componentDidMount(){
        this.callQuiz();
        console.log(this.state)
    }
    render() {
      ++this.childKey;

		let iter=0;

      return (
          <React.Fragment>
		  	<section className="page-title">
				<div className="auto-container">
					<h1>Test Series Categories</h1>
					<SearchBox/>
				</div>
			</section>
			  
			<section className="topics-section">
				<div className="patern-layer-one paroller" data-paroller-factor="0.40" data-paroller-factor-lg="0.20" data-paroller-type="foreground" data-paroller-direction="vertical" style={{backgroundImage: 'url(images/icons/icon-1.png)'}} />
				<div className="patern-layer-two paroller" data-paroller-factor="0.40" data-paroller-factor-lg="-0.20" data-paroller-type="foreground" data-paroller-direction="vertical" style={{backgroundImage: 'url(images/icons/icon-2.png)'}} />
				<div className="auto-container">
					<div className="sec-title centered">
						<h2>Choose a topic</h2>
						<div className="text">Replenish him third creature and meat blessed void a fruit gathered you’re, they’re two <br /> waters own morning gathered greater shall had behold had seed.</div>
					</div>
					<div className="row clearfix">
						{/* Topic Block */}
						<div className="topic-block col-lg-3 col-md-6 col-sm-12">
							<div className="inner-box">
								<div className="icon-box">
									<a href="#!" className="overlay-link" />
										<span className="icon flaticon-code" />
								</div>
								<h5><a href="#!">Development</a></h5>
								<div className="text">Replenish him third creature and meat blessed</div>
								<div className="clearfix">
									<div className="pull-left">
										<div className="lectures">12 Lecturer</div>
									</div>
									<div className="pull-right">
										<div className="hours">54 Hours</div>
									</div>
								</div>
							</div>
						</div>
						{/* Topic Block */}
						<div className="topic-block col-lg-3 col-md-6 col-sm-12">
							<div className="inner-box">
								<div className="icon-box">
									<a href="#!" className="overlay-link" />
										<span className="icon flaticon-graphic" />
								</div>
								<h5><a href="#!">Business</a></h5>
								<div className="text">Replenish him third creature and meat blessed</div>
								<div className="clearfix">
									<div className="pull-left">
										<div className="lectures">12 Lecturer</div>
									</div>
									<div className="pull-right">
										<div className="hours">54 Hours</div>
									</div>
								</div>
							</div>
						</div>
						{/* Topic Block */}
						<div className="topic-block col-lg-3 col-md-6 col-sm-12">
							<div className="inner-box">
								<div className="icon-box">
									<a href="#!" className="overlay-link" />
										<span className="icon flaticon-code-1" />
								</div>
								<h5><a href="#!">IT&amp; Software</a></h5>
								<div className="text">Replenish him third creature and meat blessed</div>
								<div className="clearfix">
									<div className="pull-left">
										<div className="lectures">12 Lecturer</div>
									</div>
									<div className="pull-right">
										<div className="hours">54 Hours</div>
									</div>
								</div>
							</div>
						</div>
						{/* Topic Block */}
						<div className="topic-block col-lg-3 col-md-6 col-sm-12">
							<div className="inner-box">
								<div className="icon-box">
									<a href="#!" className="overlay-link" />
										<span className="icon flaticon-shout" />
								</div>
								<h5><a href="#!">Marketing</a></h5>
								<div className="text">Replenish him third creature and meat blessed</div>
								<div className="clearfix">
									<div className="pull-left">
										<div className="lectures">12 Lecturer</div>
									</div>
									<div className="pull-right">
										<div className="hours">54 Hours</div>
									</div>
								</div>
							</div>
						</div>
						{/* Topic Block */}
						<div className="topic-block col-lg-3 col-md-6 col-sm-12">
							<div className="inner-box">
								<div className="icon-box">
									<a href="#!" className="overlay-link" />
										<span className="icon flaticon-sketch" />
								</div>
								<h5><a href="#!">Design</a></h5>
								<div className="text">Replenish him third creature and meat blessed</div>
								<div className="clearfix">
									<div className="pull-left">
										<div className="lectures">12 Lecturer</div>
									</div>
									<div className="pull-right">
										<div className="hours">54 Hours</div>
									</div>
								</div>
							</div>
						</div>
						{/* Topic Block */}
						<div className="topic-block col-lg-3 col-md-6 col-sm-12">
							<div className="inner-box">
								<div className="icon-box">
									<a href="#!" className="overlay-link" />
										<span className="icon flaticon-lifestyle" />
								</div>
								<h5><a href="#!">Lifestyle</a></h5>
								<div className="text">Replenish him third creature and meat blessed</div>
								<div className="clearfix">
									<div className="pull-left">
										<div className="lectures">12 Lecturer</div>
									</div>
									<div className="pull-right">
										<div className="hours">54 Hours</div>
									</div>
								</div>
							</div>
						</div>
						{/* Topic Block */}
						<div className="topic-block col-lg-3 col-md-6 col-sm-12">
							<div className="inner-box">
								<div className="icon-box">
									<a href="#!" className="overlay-link" />
										<span className="icon flaticon-camera" />
								</div>
								<h5><a href="#!">Photography</a></h5>
								<div className="text">Replenish him third creature and meat blessed</div>
								<div className="clearfix">
									<div className="pull-left">
										<div className="lectures">12 Lecturer</div>
									</div>
									<div className="pull-right">
										<div className="hours">54 Hours</div>
									</div>
								</div>
							</div>
						</div>
						{/* Topic Block */}
						<div className="topic-block col-lg-3 col-md-6 col-sm-12">
							<div className="inner-box">
								<div className="icon-box">
									<a href="#!" className="overlay-link" />
										<span className="icon flaticon-video" />
								</div>
								<h5><a href="#!">Music</a></h5>
								<div className="text">Replenish him third creature and meat blessed</div>
								<div className="clearfix">
									<div className="pull-left">
										<div className="lectures">12 Lecturer</div>
									</div>
									<div className="pull-right">
										<div className="hours">54 Hours</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="btn-box text-center">
						<a href="#!" className="theme-btn btn-style-three"><span className="txt">See All Topics <i className="fa fa-angle-right" /></span></a>
					</div>
				</div>
			</section>
			  
			<section className="popular-courses-section">
				<div className="auto-container">
					<div className="sec-title centered">
						<h2>Popular Test Series</h2>
						<div className="text">Replenish him third creature and meat blessed void a fruit gathered you’re, <br /> they’re two waters own morning gathered.</div>
					</div>
					<div className="row clearfix">
						{/* Cource Block */}
                        {  this.state.quiz&&this.state.quiz.map((m, key) => (
                            
                            <>
                                <div className="cource-block col-lg-4 col-md-6 col-sm-12">
                                    <div className="inner-box">
                                        <div className="image">
                                            <Link to={"/course-details/course-link"}><img src="/images/home/course-image.png" alt="" /></Link>
                                        </div>
                                        <div className="lower-content">
                                            <div className="clearfix">
                                                <div className="pull-left">
                                                    <h5><Link to={"/course-details/course-link"}>{m.title}</Link></h5>
                                                </div>
                                                <div className="pull-right">
                                                    {/* <div className="price">$140</div> */}
                                                </div>
                                            </div>
                                            <div className="text">{m.description}</div>
                                            <div className="clearfix">
                                                <div className="pull-left">
                                                    <div className="students">{m.total_points} Points</div>
                                                </div>
                                                <div className="pull-right">
                                                    <a href="#!" className="enroll">Enroll Now</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>    
                            </> 
                            ))
                        }
						
						{/* Cource Block */}
						{/* <div className="cource-block col-lg-4 col-md-6 col-sm-12">
							<div className="inner-box">
								<div className="image">
									<Link to={"/course-details/course-link"}><img src="/images/home/course-image.png" alt="" /></Link>
								</div>
								<div className="lower-content">
									<div className="clearfix">
										<div className="pull-left">
                                            <h5><Link to={"/course-details/course-link"}>Language Course</Link></h5>
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
											<a href="#!" className="enroll">Enroll Now</a>
										</div>
									</div>
								</div>
							</div>
						</div>
						
						<div className="cource-block col-lg-4 col-md-6 col-sm-12">
							<div className="inner-box">
								<div className="image">
									<Link to={"/course-details/course-link"}><img src="/images/home/course-image.png" alt="" /></Link>
								</div>
								<div className="lower-content">
									<div className="clearfix">
										<div className="pull-left">
                                            <h5><Link to={"/course-details/course-link"}>Business Course</Link></h5>
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
											<a href="#!" className="enroll">Enroll Now</a>
										</div>
									</div>
								</div>
							</div>
						</div> */}
					</div>
				</div>
			</section>
          </React.Fragment>
      );
    }
}

class SeriesList extends Component {
    state={
        allCourses:[]
    }
    
    search=(word)=>{
        console.log(word)
        let formData = new FormData();
        formData.append('search_testseries', true)              
        formData.append('search_for', word);              

        axios({
            method: 'post',
            url: api_link+'Search.php',
            data: formData,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
        .then(response => response.data)
        .then((data)=> {
                this.setState({allCourses: data.courses, allPrograms: data.programs})
        })
    }
    
    componentDidMount = () => {
        this.fetch_courses()
        this.fetch_Programs()
    };

    fetch_courses=()=>{
        let formData5 = new FormData();
		formData5.append('allCourses', "allCourses")
        axios({
			method: 'post',
			url: api_link+'SetupFetch.php',
			data: formData5,
		})
		.then(response => response.data)
        .then((data) => {
            if(data.msg=="ok"){
            this.setState({ allCourses: data.data})}
         })
		.catch(function (response) {
			console.log(response)
		}); 
    }
    fetch_Programs=()=>{
        let formData5 = new FormData();
		formData5.append('allPrograms', "allPrograms")
        axios({
			method: 'post',
			url: api_link+'SetupFetch.php',
			data: formData5,
		})
		.then(response => response.data)
        .then((data) => {
            if(data.msg=="ok"){
            this.setState({ allPrograms: data.data})}
         })
		.catch(function (response) {
			//handle error
			console.log(response)
		}); 
    }
    render() {
      ++this.childKey;
		var i=0;
      return (
          <React.Fragment>
            <section className="page-title">
                <div className="auto-container">
                    <h1>Test Series</h1>
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
                        <div className="content-side col-lg-9 col-md-12 col-sm-12">
                            <div className="our-courses">
                                {/* Options View */}
                                <div className="options-view">
                                    <div className="clearfix">
                                        <div className="pull-left">
                                            <h3> Courses</h3>
                                        </div>
                                        <div className="pull-right clearfix">
                                            {/* List View */}
                                            <ul className="list-view">
                                                <li><Link to={"/series-grid"}><span className="icon flaticon-grid" /></Link></li>
                                                <li className="active"><Link to={"/series-list"}><span className="icon flaticon-list-1" /></Link></li>
                                            </ul>
                                            {/* Type Form */}
                                            <div className="type-form">
                                                <form method="post" >
                                                    {/* Form Group */}
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
                                </div>
                                {/* Cource Block Two */}
                                {this.state.allCourses&&this.state.allCourses.map((item)=>(
                                        <div className="cource-block-three">
                                            <div className="inner-box">
                                                <div className="image">
                                                    <Link to={"/course-details/course-link"}><img src={server_link+'images/'+item.image} alt="Course" style={{width:'30%'}} /></Link>
                                                </div>
                                                <div className="content-box">
                                                    <div className="box-inner">
                                                        <h5><Link to={"/course-details/course-link"}>{item.name}</Link></h5>
                                                        <div className="text" dangerouslySetInnerHTML={{__html: item.description}}></div>
                                                        <div className="clearfix">
                                                            <div className="pull-left">
                                                                <div className="level-box">
                                                                    <span className="icon flaticon-settings-1" />
                                                                    {item.type}
                                                                </div>
                                                            </div>
                                                            <div className="pull-right clearfix">
                                                                <div className="students">{moment(item.starting_from).format("MMM Do YY")}</div>
                                                                <div className="hours">INR {item.fees}/-</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            </div>

                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <section className="popular-courses-section">
                <div className="auto-container">
                    <div className="sec-title">
                        <h2>Programmes</h2>
                    </div>
                    {this.state.allPrograms&&this.state.allPrograms.map((item)=>(
                                        <div className="cource-block-three">
                                            <div className="inner-box">
                                                <div className="image">
                                                    <Link to={"/course-details/course-link"}><img src={server_link+'images/'+item.image} alt="Course" style={{width:'25%'}} /></Link>
                                                </div>
                                                <div className="content-box">
                                                    <div className="box-inner">
                                                        <h5><Link to={"/course-details/course-link"}>{item.name}</Link></h5>
                                                        <div className="text" dangerouslySetInnerHTML={{__html: item.description}}></div>
                                                        <div className="clearfix">
                                                            <div className="pull-left">
                                                                <div className="level-box">
                                                                    <span className="icon flaticon-settings-1" />
                                                                    {item.type}
                                                                </div>
                                                            </div>
                                                            <div className="pull-right clearfix">
                                                                <div className="students">{moment(item.starting_from).format("MMM Do YY")}</div>
                                                                <div className="hours">INR {item.fees}/-</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            </div>

                                ))}
                            
                </div>
            </section>
          </React.Fragment>
      );
    }
}

class SeriesGrid extends Component {
    state={
        allCourses:[],
        allPrograms:[], 
    }
    componentDidMount = () => {
        this.fetch_courses()
        this.fetch_Programs()
    };
    
        fetch_courses=()=>{
            let formData5 = new FormData();
            formData5.append('allCourses', "allCourses")
            axios({
                method: 'post',
                url: api_link+'SetupFetch.php',
                data: formData5,
            })
            .then(response => response.data)
            .then((data) => {
                if(data.msg=="ok"){
                this.setState({ allCourses: data.data})}
             })
            .catch(function (response) {
                //handle error
                console.log(response)
            }); 
        }
        fetch_Programs=()=>{
            let formData5 = new FormData();
            formData5.append('allPrograms', "allPrograms")
            axios({
                method: 'post',
                url: api_link+'SetupFetch.php',
                data: formData5,
            })
            .then(response => response.data)
            .then((data) => {
                if(data.msg=="ok"){
                this.setState({ allPrograms: data.data})}
             })
            .catch(function (response) {
                //handle error
                console.log(response)
            }); 
        }

        search=(word)=>{
            console.log(word)
            let formData = new FormData();
            formData.append('search_testseries', true)              
            formData.append('search_for', word);              

            axios({
                method: 'post',
                url: api_link+'Search.php',
                data: formData,
                config: { headers: {'Content-Type': 'multipart/form-data' }}
            })
            .then(response => response.data)
            .then((data)=> {
                    this.setState({allCourses: data.courses, allPrograms: data.programs})
            })
        }


    render() {
      ++this.childKey;
		var i=0;
      return (
          <React.Fragment>
            <section className="page-title">
                <div className="auto-container">
                    <h1>Test Series</h1>
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
                        <div className="content-side col-lg-9 col-md-12 col-sm-12">
                            <div className="our-courses">
                                {/* Options View */}
                                <div className="options-view">
                                    <div className="clearfix">
                                        <div className="pull-left">
                                            <h3> Courses</h3>
                                        </div>
                                        <div className="pull-right clearfix">
                                            {/* List View */}
                                            <ul className="list-view">
                                                <li className="active"><Link to={"/series-grid"}><span className="icon flaticon-grid" /></Link></li>
                                                <li><Link to={"/series-list"}><span className="icon flaticon-list-1" /></Link></li>
                                            </ul>
                                            {/* Type Form */}
                                            <div className="type-form">
                                                <form method="post" >
                                                
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row clearfix">
                                    {/* Cource Block Two */}
                                    {this.state.allCourses&&this.state.allCourses.map((item) =>(

                                        <div className="cource-block-two col-lg-4 col-md-6 col-sm-12">
                                            <div className="inner-box">
                                                <div className="image" style={{borderBottom: '1px solid #dfdfdf',height: '200px'}}>
                                                    <Link to={"/course-details/"+item.id}><img src={server_link+'images/'+item.image} alt="Course Title"  /></Link>
                                                </div>
                                                <div className="lower-content">
                                                    <h5><Link to={"/course-details/"+item.id}>{item.name}</Link></h5>
                                                    <div className="text" dangerouslySetInnerHTML={{__html: item.description}}></div>
                                                     
                                                    <div className="clearfix">
                                                        <div className="pull-left">
                                                        <div className="students">{moment(item.starting_from).format("MMM Do YY")}</div>
                                                        </div>
                                                        <div className="pull-right">
                                                        <div className="hours">INR {item.fees}/-</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                               

                                </div>
                            </div>
                        </div>
                        {/* Sidebar Side */}
                    </div>
                </div>
            </div>
            
            <section className="popular-courses-section">
                <div className="auto-container">
                    <div className="sec-title">
                        <h2>Programmes</h2>
                    </div>
                    <div className="row clearfix">
                    {this.state.allPrograms&&this.state.allPrograms.map((item) =>( 
                            <div className="cource-block-two col-lg-4 col-md-6 col-sm-12">
                                <div className="inner-box">
                                    <div className="image" style={{borderBottom: '1px solid #dfdfdf',height: '200px'}}>
                                        <Link to={"/course-details/"+item.id}><img src={server_link+'images/'+item.image} alt="Course Title" /></Link>
                                    </div>
                                    <div className="lower-content">
                                        <h5><Link to={"/course-details/"+item.id}>{item.name}</Link></h5>
                                        <div className="text" dangerouslySetInnerHTML={{__html: item.description}}></div>
                                        
                                        <div className="clearfix">
                                            <div className="pull-left">
                                            <div className="students">{moment(item.starting_from).format("MMM Do YY")}</div>
                                            </div>
                                            <div className="pull-right">
                                            <div className="hours">INR {item.fees}/-</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            ))}
                     </div>
                </div>
            </section>
          </React.Fragment>
      );
    }
}

class SearchGrid extends Component {
  
    render() {
      
      let styles = this.state.modalVisible
          ? { display: "block" }
          : { display: "none" };
        let modalFade = this.state.modalVisible
          ? { fade: "fade" }
          : { fade: "show" };
      
      if(this.state.modalVisible)
      {
        $("#desktopSearch").focus()
      }
      
      ++this.childKey;
	  let iter=0;

      return (
          <React.Fragment>
            <section className="page-title">
                <div className="auto-container">
                    <h1>Courses</h1>
                    <SearchBox/>
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
                        <div className="content-side col-lg-9 col-md-12 col-sm-12">
                            <div className="our-courses">
                                {/* Options View */}
                                <div className="options-view">
                                    <div className="clearfix">
                                        <div className="pull-left">
                                            <h3>Browse UI/ UX Courses</h3>
                                        </div>
                                        <div className="pull-right clearfix">
                                            {/* List View */}
                                            <ul className="list-view">
                                                <li><Link to={"/search-grid"}><span className="icon flaticon-grid" /></Link></li>
                                                <li className="active"><Link to={"/search-list"}><span className="icon flaticon-list-1" /></Link></li>
                                            </ul>
                                            {/* Type Form */}
                                            <div className="type-form">
                                                <form method="post" >
                                                    {/* Form Group */}
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
                                </div>
                                <div className="row clearfix">
                                    {/* Cource Block Two */}
                                    <div className="cource-block-two col-lg-4 col-md-6 col-sm-12">
                                        <div className="inner-box">
                                            <div className="image">
                                                <Link to={"/course-details/course-link"}><img src="/images/home/course.png" alt="Course Title" /></Link>
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
                                                <Link to={"/course-details/course-link"}><img src="/images/home/course.png" alt="Course Title" /></Link>
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
                                                <Link to={"/course-details/course-link"}><img src="/images/home/course.png" alt="Course Title" /></Link>
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
                                                <Link to={"/course-details/course-link"}><img src="/images/home/course.png" alt="Course Title" /></Link>
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
                                                <Link to={"/course-details/course-link"}><img src="/images/home/course.png" alt="Course Title" /></Link>
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
                                                <Link to={"/course-details/course-link"}><img src="/images/home/course.png" alt="Course Title" /></Link>
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
                                    {/* Cource Block Two */}
                                    <div className="cource-block-two col-lg-4 col-md-6 col-sm-12">
                                        <div className="inner-box">
                                            <div className="image">
                                                <Link to={"/course-details/course-link"}><img src="/images/home/course.png" alt="Course Title" /></Link>
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
                                                <Link to={"/course-details/course-link"}><img src="/images/home/course.png" alt="Course Title" /></Link>
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
                                                <Link to={"/course-details/course-link"}><img src="/images/home/course.png" alt="Course Title" /></Link>
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
                                </div>
                            </div>
                        </div>
                        {/* Sidebar Side */}
                        <div className="sidebar-side col-lg-3 col-md-12 col-sm-12">
                            <div className="sidebar-inner">
                                <aside className="sidebar">
                                    {/* Filter Widget */}
                                    <div className="filter-widget">
                                        <h5>Filter By</h5>
                                        <div className="skills-box">
                                            {/* Skills Form */}
                                            <div className="skills-form">
                                                <form method="post" >
                                                    <span>Skill Level</span>
                                                    {/* Radio Box */}
                                                    <div className="radio-box">
                                                        <input type="radio" name="remember-password" defaultChecked id="type-1" /> 
                                                        <label htmlFor="type-1">Beginner</label>
                                                    </div>
                                                    {/* Radio Box */}
                                                    <div className="radio-box">
                                                        <input type="radio" name="remember-password" id="type-2" /> 
                                                        <label htmlFor="type-2">Intermediate</label>
                                                    </div>
                                                    {/* Radio Box */}
                                                    <div className="radio-box">
                                                        <input type="radio" name="remember-password" id="type-3" /> 
                                                        <label htmlFor="type-3">Expert</label>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                        <div className="skills-box-two">
                                            {/* Skills Form */}
                                            <div className="skills-form-two">
                                                <form method="post" >
                                                    <span>Skill Level</span>
                                                    {/* Radio Box */}
                                                    <div className="radio-box">
                                                        <input type="radio" name="remember-password" defaultChecked id="type-4" /> 
                                                        <label htmlFor="type-4">Free (14)</label>
                                                    </div>
                                                    {/* Radio Box */}
                                                    <div className="radio-box">
                                                        <input type="radio" name="remember-password" id="type-5" /> 
                                                        <label htmlFor="type-5">Paid</label>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                        <div className="skills-box-three">
                                            {/* Skills Form */}
                                            <div className="skills-form-three">
                                                <form method="post" >
                                                    <span>Duration Time</span>
                                                    {/* Radio Box */}
                                                    <div className="radio-box-three">
                                                        <input type="radio" name="remember-password" defaultChecked id="type-7" />
                                                        <label htmlFor="type-7">5+ hours (30)</label>
                                                    </div>
                                                    {/* Radio Box */}
                                                    <div className="radio-box-three">
                                                        <input type="radio" name="remember-password" id="type-8" /> 
                                                        <label htmlFor="type-8">10+ hours (20)</label>
                                                    </div>
                                                    {/* Radio Box */}
                                                    <div className="radio-box-three">
                                                        <input type="radio" name="remember-password" id="type-9" /> 
                                                        <label htmlFor="type-9">15+ hours (5)</label>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </aside>
                            </div>
                        </div>
                    </div>
                    {/* Post Share Options */}
                    <div className="styled-pagination">
                        <ul className="clearfix">
                            <li className="prev"><a href="#"><span className="fa fa-angle-left" /> </a></li>
                            <li><a href="#">1</a></li>
                            <li><a href="#">2</a></li>
                            <li className="active"><a href="#">3</a></li>
                            <li><a href="#">4</a></li>
                            <li><a href="#">5</a></li>
                            <li className="next"><a href="#"><span className="fa fa-angle-right" /> </a></li>
                        </ul>
                    </div>
                </div>
            </div>
            
            <section className="popular-courses-section">
                <div className="auto-container">
                    <div className="sec-title">
                        <h2>Most Popular Courses</h2>
                    </div>
                    <div className="row clearfix">
                        {/* Cource Block Two */}
                        <div className="cource-block-two col-lg-4 col-md-6 col-sm-12">
                            <div className="inner-box wow fadeInLeft" data-wow-delay="0ms" data-wow-duration="1500ms">
                                <div className="image">
                                    <Link to={"/course-details/course-link"}><img src="/images/home/course-image.png" alt="" /></Link>
                                </div>
                                <div className="lower-content">
                                    <h5><Link to={"/course-details/course-link"}>Color Theory</Link></h5>
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
                        {/* Cource Block Two */}
                        <div className="cource-block-two col-lg-4 col-md-6 col-sm-12">
                            <div className="inner-box wow fadeInUp" data-wow-delay="0ms" data-wow-duration="1500ms">
                                <div className="image">
                                    <Link to={"/course-details/course-link"}><img src="/images/home/course-image.png" alt="" /></Link>
                                </div>
                                <div className="lower-content">
                                    <h5><Link to={"/course-details/course-link"}>Typography</Link></h5>
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
                        {/* Cource Block Two */}
                        <div className="cource-block-two col-lg-4 col-md-6 col-sm-12">
                            <div className="inner-box wow fadeInRight" data-wow-delay="0ms" data-wow-duration="1500ms">
                                <div className="image">
                                    <Link to={"/course-details/course-link"}><img src="/images/home/course-image.png" alt="" /></Link>
                                </div>
                                <div className="lower-content">
                                    <h5><Link to={"/course-details/course-link"}>Wireframe &amp; Prototyping</Link></h5>
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
            </section>
          
              <div className={'modal '+modalFade} id="add_modal" style={styles}>
                  <div className="modal-dialog">
                    <div className="modal-content">
                     <div className="modal-header">
                        <h4 className="modal-title">SEARCH</h4>
                      </div> 
                      <form onSubmit={this.handleSearch.bind(this)}>
                      <div className="modal-body">
                          <div className="row">
                              <div className="col-md-12">
                                    <input type="text" className="form-control" id="desktopSearch" required/>
                              </div>
                          </div>
                          <br/>
                         </div>
                      <div className="modal-footer">
                        <button type="button" className="btn btn-default pull-left" onClick={this.openModal}>Close</button>
                        <button type="submit" name="add" className="btn btn-primary" style={{backgroundColor: '#337ab7'}}>Search</button>
                      </div>
                        </form>
                          </div>
                    </div>
                  </div>
          </React.Fragment>
      );
    }
}

class SearchList extends Component {
    
    /*constructor(props){
        super();
        this.state = {
            id: props.match.params.token,
            categories: [],
            sub_categories: [],
            products: [],
            modalVisible: true,
            doingModal: false,
            refresh: false,
        }
        this.childKey = 0;
    
        this.openModal = this.openModal.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.getProducts=this.getProducts.bind(this);
        this.getOptions=this.getOptions.bind(this);
        this.provideGramOptions = this.provideGramOptions.bind(this);
        this.provideLitreOptions = this.provideLitreOptions.bind(this);
        this.provideOptions = this.provideOptions.bind(this);
        this.addToCart = this.addToCart.bind(this);

        this.getProducts();
    }
  
    componentDidMount(){
//        if(this.state.id === "all")
//        {
//          this.openModal()
//        }
    }

    openModal() {
        this.setState({
          doingModal: true,
          modalVisible: !this.state.modalVisible
        });
    }
  
    getProducts(){
        var obj=this;
        //GET ALL PRODUCTS FOR CURRENT CATEGORY
        let profileForm=new FormData();
        profileForm.append("fetch_products_for_search",obj.state.id);
        axios({
            method: 'post',
            url: api_link+'ProductsFetch.php',
            data: profileForm,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
        .then(response => response.data)
        .then((data) => {
            this.setState({ 
                products: data,
            })
         })
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
  
    UNSAFE_componentWillReceiveProps(props) {
      
        var obj=this;
        
        if(props.match.params.token === "all" && !obj.state.modalVisible)
        {
          obj.openModal()
        }
      
        if (this.state.token !== props.match.params.token) {
         
            obj.setState({
                id: props.match.params.token,
            })
          
            //GET ALL PRODUCTS FOR CURRENT CATEGORY
            let profileFor=new FormData();
            profileFor.append("fetch_products_for_search",props.match.params.token);
            axios({
                method: 'post',
                url: api_link+'ProductsFetch.php',
                data: profileFor,
                config: { headers: {'Content-Type': 'multipart/form-data' }}
            })
            .then(response => response.data)
            .then((data) => {
                this.setState({ 
                    products: data,
                })
             })
        }
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
     
        addItem(product_id,arr['product_quantity'],quantity_type,price,arr['final_price'], arr);
      
        $("#added_message").show();
        setTimeout(function(){
          $("#added_message").hide();
        }, 2500)
//        window.history.pushState('', '', '/agent/view-order/'+data.replace('ok','')+'/'+this.state.user_name)
//        this.props.history.push('/agent/view-order/'+data.replace('ok','')+'/'+this.state.user_name);
    }
    
    handleSearch(e){
        e.preventDefault();
      
        //var obj=this;
        //GET ALL PRODUCTS FOR CURRENT CATEGORY
        let profileForm=new FormData();
        profileForm.append("fetch_products_for_search",$("#desktopSearch").val());
        axios({
            method: 'post',
            url: api_link+'ProductsFetch.php',
            data: profileForm,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
        .then(response => response.data)
        .then((data) => {
            this.setState({ 
                products: data,
            })
            window.history.pushState('', '', '/search/'+$("#desktopSearch").val());
            this.openModal();
         })
    }*/
  
    render() {
      
      let styles = this.state.modalVisible
          ? { display: "block" }
          : { display: "none" };
        let modalFade = this.state.modalVisible
          ? { fade: "fade" }
          : { fade: "show" };
      
      if(this.state.modalVisible)
      {
        $("#desktopSearch").focus()
      }
      
      ++this.childKey;
	  let iter=0;

      return (
          <React.Fragment>
            <section className="page-title">
                <div className="auto-container">
                    <h1>Courses</h1>
                    <SearchBox/>
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
                        <div className="content-side col-lg-9 col-md-12 col-sm-12">
                            <div className="our-courses">
                                {/* Options View */}
                                <div className="options-view">
                                    <div className="clearfix">
                                        <div className="pull-left">
                                            <h3>Browse UI/ UX Courses</h3>
                                        </div>
                                        <div className="pull-right clearfix">
                                            {/* List View */}
                                            <ul className="list-view">
                                                <li><Link to={"/search-grid"}><span className="icon flaticon-grid" /></Link></li>
                                                <li className="active"><Link to={"/search-list"}><span className="icon flaticon-list-1" /></Link></li>
                                            </ul>
                                            {/* Type Form */}
                                            <div className="type-form">
                                                <form method="post" >
                                                    {/* Form Group */}
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
                                </div>
                                {/* Cource Block Two */}
                                <div className="cource-block-three">
                                    <div className="inner-box">
                                        <div className="image">
                                            <Link to={"/course-details/course-link"}><img src="/images/home/course.png" alt="Course" /></Link>
                                        </div>
                                        <div className="content-box">
                                            <div className="box-inner">
                                                <h5><Link to={"/course-details/course-link"}>Ultimate User Interface and user Experince Courses</Link></h5>
                                                <div className="text">Replenish him third creature and meat blessed void a fruit gathered you’re, they’re two waters. Replenish him third creature and meat blessed void a fruit gathered two waters.</div>
                                                <div className="clearfix">
                                                    <div className="pull-left">
                                                        <div className="level-box">
                                                            <span className="icon flaticon-settings-1" />
                                                            Advance Level
                                                        </div>
                                                    </div>
                                                    <div className="pull-right clearfix">
                                                        <div className="students">12 Lecturer</div>
                                                        <div className="hours">54 Hours</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* Cource Block Two */}
                                <div className="cource-block-three">
                                    <div className="inner-box">
                                        <div className="image">
                                            <Link to={"/course-details/course-link"}><img src="/images/home/course.png" alt="Course" /></Link>
                                        </div>
                                        <div className="content-box">
                                            <div className="box-inner">
                                                <h5><Link to={"/course-details/course-link"}>Ultimate User Interface and user Experince Courses</Link></h5>
                                                <div className="text">Replenish him third creature and meat blessed void a fruit gathered you’re, they’re two waters. Replenish him third creature and meat blessed void a fruit gathered two waters.</div>
                                                <div className="clearfix">
                                                    <div className="pull-left">
                                                        <div className="level-box">
                                                            <span className="icon flaticon-settings-1" />
                                                            Advance Level
                                                        </div>
                                                    </div>
                                                    <div className="pull-right clearfix">
                                                        <div className="students">12 Lecturer</div>
                                                        <div className="hours">54 Hours</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* Cource Block Two */}
                                <div className="cource-block-three">
                                    <div className="inner-box">
                                        <div className="image">
                                            <Link to={"/course-details/course-link"}><img src="/images/home/course.png" alt="Course" /></Link>
                                        </div>
                                        <div className="content-box">
                                            <div className="box-inner">
                                                <h5><Link to={"/course-details/course-link"}>Ultimate User Interface and user Experince Courses</Link></h5>
                                                <div className="text">Replenish him third creature and meat blessed void a fruit gathered you’re, they’re two waters. Replenish him third creature and meat blessed void a fruit gathered two waters.</div>
                                                <div className="clearfix">
                                                    <div className="pull-left">
                                                        <div className="level-box">
                                                            <span className="icon flaticon-settings-1" />
                                                            Advance Level
                                                        </div>
                                                    </div>
                                                    <div className="pull-right clearfix">
                                                        <div className="students">12 Lecturer</div>
                                                        <div className="hours">54 Hours</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* Cource Block Two */}
                                <div className="cource-block-three">
                                    <div className="inner-box">
                                        <div className="image">
                                            <Link to={"/course-details/course-link"}><img src="/images/home/course.png" alt="Course" /></Link>
                                        </div>
                                        <div className="content-box">
                                            <div className="box-inner">
                                                <h5><Link to={"/course-details/course-link"}>Ultimate User Interface and user Experince Courses</Link></h5>
                                                <div className="text">Replenish him third creature and meat blessed void a fruit gathered you’re, they’re two waters. Replenish him third creature and meat blessed void a fruit gathered two waters.</div>
                                                <div className="clearfix">
                                                    <div className="pull-left">
                                                        <div className="level-box">
                                                            <span className="icon flaticon-settings-1" />
                                                            Advance Level
                                                        </div>
                                                    </div>
                                                    <div className="pull-right clearfix">
                                                        <div className="students">12 Lecturer</div>
                                                        <div className="hours">54 Hours</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Sidebar Side */}
                        <div className="sidebar-side col-lg-3 col-md-12 col-sm-12">
                            <div className="sidebar-inner">
                                <aside className="sidebar">
                                    {/* Filter Widget */}
                                    <div className="filter-widget">
                                        <h5>Filter By</h5>
                                        <div className="skills-box">
                                            {/* Skills Form */}
                                            <div className="skills-form">
                                                <form method="post" >
                                                    <span>Skill Level</span>
                                                    {/* Radio Box */}
                                                    <div className="radio-box">
                                                        <input type="radio" name="remember-password" defaultChecked id="type-1" /> 
                                                        <label htmlFor="type-1">Beginner</label>
                                                    </div>
                                                    {/* Radio Box */}
                                                    <div className="radio-box">
                                                        <input type="radio" name="remember-password" id="type-2" /> 
                                                        <label htmlFor="type-2">Intermediate</label>
                                                    </div>
                                                    {/* Radio Box */}
                                                    <div className="radio-box">
                                                        <input type="radio" name="remember-password" id="type-3" /> 
                                                        <label htmlFor="type-3">Expert</label>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                        <div className="skills-box-two">
                                            {/* Skills Form */}
                                            <div className="skills-form-two">
                                                <form method="post" >
                                                    <span>Skill Level</span>
                                                    {/* Radio Box */}
                                                    <div className="radio-box">
                                                        <input type="radio" name="remember-password" defaultChecked id="type-4" /> 
                                                        <label htmlFor="type-4">Free (14)</label>
                                                    </div>
                                                    {/* Radio Box */}
                                                    <div className="radio-box">
                                                        <input type="radio" name="remember-password" id="type-5" /> 
                                                        <label htmlFor="type-5">Paid</label>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                        <div className="skills-box-three">
                                            {/* Skills Form */}
                                            <div className="skills-form-three">
                                                <form method="post" >
                                                    <span>Duration Time</span>
                                                    {/* Radio Box */}
                                                    <div className="radio-box-three">
                                                        <input type="radio" name="remember-password" defaultChecked id="type-7" />
                                                        <label htmlFor="type-7">5+ hours (30)</label>
                                                    </div>
                                                    {/* Radio Box */}
                                                    <div className="radio-box-three">
                                                        <input type="radio" name="remember-password" id="type-8" /> 
                                                        <label htmlFor="type-8">10+ hours (20)</label>
                                                    </div>
                                                    {/* Radio Box */}
                                                    <div className="radio-box-three">
                                                        <input type="radio" name="remember-password" id="type-9" /> 
                                                        <label htmlFor="type-9">15+ hours (5)</label>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </aside>
                            </div>
                        </div>
                    </div>
                    {/* Post Share Options */}
                    <div className="styled-pagination">
                        <ul className="clearfix">
                            <li className="prev"><a href="#"><span className="fa fa-angle-left" /> </a></li>
                            <li><a href="#">1</a></li>
                            <li><a href="#">2</a></li>
                            <li className="active"><a href="#">3</a></li>
                            <li><a href="#">4</a></li>
                            <li><a href="#">5</a></li>
                            <li className="next"><a href="#"><span className="fa fa-angle-right" /> </a></li>
                        </ul>
                    </div>
                </div>
            </div>
            
            <section className="popular-courses-section">
                <div className="auto-container">
                    <div className="sec-title">
                        <h2>Most Popular Courses</h2>
                    </div>
                    {/* Cource Block Four */}
                    <div className="cource-block-four">
                        <div className="inner-box wow fadeInUp" data-wow-delay="0ms" data-wow-duration="1500ms">
                            <div className="image">
                                <Link to={"/course-details/course-link"}><img src="/images/home/course-image.png" alt="" /></Link>
                            </div>
                            <div className="content-box">
                                <div className="box-inner">
                                    <h5><Link to={"/course-details/course-link"}>Ultimate User Interface and user Experince Courses</Link></h5>
                                    <div className="text">Replenish him third creature and meat blessed void a fruit gathered you’re, they’re two waters. Replenish him third creature and meat blessed void a fruit gathered you’re, they’re two waters.</div>
                                    <div className="clearfix">
                                        <div className="pull-left">
                                            <div className="level-box">
                                                <span className="icon flaticon-settings-1" />
                                                Advance Level
                                            </div>
                                        </div>
                                        <div className="pull-right clearfix">
                                            <div className="students">12 Lecturer</div>
                                            <div className="hours">54 Hours</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Cource Block Four */}
                    <div className="cource-block-four">
                        <div className="inner-box wow fadeInUp" data-wow-delay="150ms" data-wow-duration="1500ms">
                            <div className="image">
                                <Link to={"/course-details/course-link"}><img src="/images/home/course-image.png" alt="" /></Link>
                            </div>
                            <div className="content-box">
                                <div className="box-inner">
                                    <h5><Link to={"/course-details/course-link"}>Ultimate User Interface and user Experince Courses</Link></h5>
                                    <div className="text">Replenish him third creature and meat blessed void a fruit gathered you’re, they’re two waters. Replenish him third creature and meat blessed void a fruit gathered you’re, they’re two waters.</div>
                                    <div className="clearfix">
                                        <div className="pull-left">
                                            <div className="level-box">
                                                <span className="icon flaticon-settings-1" />
                                                Advance Level
                                            </div>
                                        </div>
                                        <div className="pull-right clearfix">
                                            <div className="students">12 Lecturer</div>
                                            <div className="hours">54 Hours</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Cource Block Four */}
                    <div className="cource-block-four">
                        <div className="inner-box wow fadeInUp" data-wow-delay="300ms" data-wow-duration="1500ms">
                            <div className="image">
                                <Link to={"/course-details/course-link"}><img src="/images/home/course-image.png" alt="" /></Link>
                            </div>
                            <div className="content-box">
                                <div className="box-inner">
                                    <h5><Link to={"/course-details/course-link"}>Ultimate User Interface and user Experince Courses</Link></h5>
                                    <div className="text">Replenish him third creature and meat blessed void a fruit gathered you’re, they’re two waters. Replenish him third creature and meat blessed void a fruit gathered you’re, they’re two waters.</div>
                                    <div className="clearfix">
                                        <div className="pull-left">
                                            <div className="level-box">
                                                <span className="icon flaticon-settings-1" />
                                                Advance Level
                                            </div>
                                        </div>
                                        <div className="pull-right clearfix">
                                            <div className="students">12 Lecturer</div>
                                            <div className="hours">54 Hours</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
          
              <div className={'modal '+modalFade} id="add_modal" style={styles}>
                  <div className="modal-dialog">
                    <div className="modal-content">
                     <div className="modal-header">
                        <h4 className="modal-title">SEARCH</h4>
                      </div> 
                      <form onSubmit={this.handleSearch.bind(this)}>
                      <div className="modal-body">
                          <div className="row">
                              <div className="col-md-12">
                                    <input type="text" className="form-control" id="desktopSearch" required/>
                              </div>
                          </div>
                          <br/>
                         </div>
                      <div className="modal-footer">
                        <button type="button" className="btn btn-default pull-left" onClick={this.openModal}>Close</button>
                        <button type="submit" name="add" className="btn btn-primary" style={{backgroundColor: '#337ab7'}}>Search</button>
                      </div>
                        </form>
                          </div>
                    </div>
                  </div>
          </React.Fragment>
      );
    }
}

export {
    SeriesCategories, 
    SeriesList, 
    SeriesGrid, 
    SearchGrid, 
    SearchList,
};