import React, {Component} from 'react';
import axios from 'axios';
import $ from 'jquery';
import { Link } from "react-router-dom";

import Parser from 'html-react-parser';
import { api_link, addItem, SearchBox } from './Home';


class QuizList extends Component {
    
    state={
        link: ' ',
        quiz:'',
    }
    
    callQuiz = () =>{
        var obj = this;
        let formData = new FormData();
		formData.append('callQuiz', true);
        formData.append('type', this.props.match.params.token);
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
                obj.setState({ quiz: data.data, link: this.props.match.params.token})
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
		var i=0;
        if (this.state.link != this.props.match.params.token)
        {
            this.callQuiz();
        }
      return (
          <React.Fragment>
            <section className="page-title">
                <div className="auto-container">
                    <h1>Test Series</h1>
                    <SearchBox/>
                </div>
            </section>
            
            <div className="sidebar-page-container">
                <div className="patern-layer-one paroller" data-paroller-factor="0.40" data-paroller-factor-lg="0.20" data-paroller-type="foreground" data-paroller-direction="vertical" style={{backgroundImage: 'url(images/icons/icon-1.png)'}} />
                <div className="patern-layer-two paroller" data-paroller-factor="0.40" data-paroller-factor-lg="-0.20" data-paroller-type="foreground" data-paroller-direction="vertical" style={{backgroundImage: 'url(images/icons/icon-2.png)'}} />
                <div className="circle-one" />
                <div className="circle-two" />
                <div className="auto-container">
                    <div className="sec-title centered">
						{this.props.match.params.token=="mains"?(<h2>Mains Test Series</h2>):(<h2>Prelims Test Series</h2>)}
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
                                            <div className="text" dangerouslySetInnerHTML={{__html:m.description}}></div>
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
                    </div>
                </div>
            </div>       
          </React.Fragment>
      );
    }
}

export default QuizList