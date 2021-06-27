import React, {Component } from 'react';
//import ReactDOM from 'react-dom';
import { Link } from "react-router-dom";
import axios from 'axios';
import $ from 'jquery';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

export const api_link="http://drive.local/react-lms/api/";




class Tags extends Component {

    constructor(props) {
        super();
        this.state = {
            token: props.match.params.token,
            imp1:[]
           
        };
    }

    componentDidMount() {
        document.title="Tags"
		
		//FETCH DETAILS OF PRODUCT
        let c_product = new FormData();
        c_product.append('tagresult', this.state.token)
        axios({
                method: 'post',
                url: api_link+'EditSiteFetch.php',
                data: c_product,
                config: { headers: {'Content-Type': 'multipart/form-data' }}
        }).then(response => response.data)
        .then((data) => {
            console.log(data);
            this.setState({
                imp1: data
            })
        })
    }
    render() {
        return(
        <section className="achievements-section">
              <div className="auto-container">
                        {/* Sec Title */}
                        <div className="sec-title centered">
                            <h2>Study Material</h2>
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
                                                    this.state.imp1.map((i1, key) => (<>
                                                    
                                                        <li style={{border: '1px solid #dfdfdf', padding: '7px 11px'}} key={"imp1"+key}><Link to={location => ({...location, pathname:"http://drive.local/react-lms/images/"+i1.file})}  target="_blank">{i1.title}</Link></li>
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
        )
    }
  }


  export default Tags;