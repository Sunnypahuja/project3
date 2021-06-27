import React from "react";
import axios from "axios";
import $ from "jquery";
import CKEditor from "react-ckeditor-component";
import { api_link } from "./AdminLogin";

class ShowArticle extends React.Component{

    state={
        data: []
    }

    componentDidMount(){
        let formData4 = new FormData();
        formData4.append("fetch_singleArticle", this.props.match.params.id);

        axios({
        method: "post",
        url: api_link + "Article.php",
        data: formData4,
        config: { headers: { "Content-Type": "multipart/form-data" } },
        })
        .then((response) => response.data)
        .then((data) => {
            console.log(data)
            this.setState({ data: data});
      });
    }
        
       render(){
        return(
            <React.Fragment>
                <div className="content-wrapper">
                    <section className="content-header">
                        <h1>Article</h1>
                        <ol className="breadcrumb">
                              <li>
                              </li>
                        </ol>
                    </section>
                    <section>
                        <div id="update_msg" className="alert" style={{display: 'none'}}></div> 
                    </section>
                    <section className="content" style={{overflow: 'auto'}} key={this.childKey}>
                          <div className="box">
                              <div className="box-body">
                                 
                                        <div className="modal-body">
                                            <div className="row">
                                                <div className="col-md-12">
                                                        <br/>
                                                        <label>Detailed Description</label>
                                                        &nbsp;<span id="d_description" style={{color: 'red', display: 'none'}}>This field is required*</span>
                                                        <CKEditor activeClass="p10" content={this.state.data.t_desc} required />
                                                </div>
                                            </div>
                                        </div>
                                </div>
                          </div>
                    </section>
                </div>
        </React.Fragment>)
        }
    }
export default ShowArticle;