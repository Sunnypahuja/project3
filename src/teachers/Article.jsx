import React from 'react';

import { Link } from "react-router-dom";
import axios from 'axios';
import $ from 'jquery';
import CKEditor from "react-ckeditor-component";
import TeacherLogin, { LoginAuth, api_link } from './TeacherLogin';
import Moment from 'moment';

class Articles extends React.Component{
    
    constructor() {
        super();
        this.state = {
          products: []
        };
        
        this.childKey = 0;
      }

    componentDidMount() {
        document.title="Articles"
        let formData = new FormData();
        formData.append('articles', window.atob(window.sessionStorage.getItem(window.btoa("teacher_id"))))
        
        axios({
                method: 'post',
                url: api_link+'techerArticledetails.php',
                data: formData,
                config: { headers: {'Content-Type': 'multipart/form-data' }}
        }).then(response => response.data)
        .then((data) => {
          this.setState({ products: data.data })
            $("script[src='js/dataTable.js']").remove();
            const script = document.createElement("script");

            script.src = "js/dataTable.js";
            script.async = true;

            document.body.appendChild(script);
         })          
    }

  

    render()
    {
        return(
            <React.Fragment>
                <div className="content-wrapper">
                    <section>
                        <div id="update_message" className="alert" style={{display: 'none'}}></div> 
                    </section>
                    <section className="content-header">
                          <h1>Articles</h1>
                          
                    </section>

                    <section className="content" key={this.childKey}>
                          <div className="box">
                              <div className="box-body table-responsive">
                                  <br/>
                                  <table id="example1" className="table">
                                    <thead>
                                    <tr>
                                      <th>Sno.</th>
                                      <th>Article topic</th>
                                    
                                      <th>Action</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                      {this.state.products && this.state.products.map((product, key) => (
                                      <tr key={product.id}>
                                          
                                          <td id={'name'+product.id}>{key+1}</td>
                                          <td>{product.topic}</td>
                                          
                                          <td>
                                              <Link to={"add-article/"+product.id} className="btn btn-success" style={{marginRight: '7px'}}>
                                                  <i className="fa fa-edit"></i> Add
                                              </Link>
                                          </td>
                                        </tr>
                                      ))}
                                    </tbody>
                                    <tfoot></tfoot>
                                  </table>                    
                              </div>
                          </div>
                      </section>
                  </div>
            </React.Fragment>
        );
    }
}






class Editarticle extends React.Component{
 
    constructor(props) {
        super();
        this.state = {
            token: props.match.params.token,
            image: '',
            name:'',
            starting_from: '',
            fees: '',
            tax_per: '',
            description: '',
            sample_video: '',
            schedule_pdf: '',
        };
        
        this.childKey = 0;  
        const base = document.querySelector('base');
        base.setAttribute('href', '../'); 
    }

    componentWillUnmount(){
        const base = document.querySelector('base');
        base.setAttribute('href', '');
    }
    
    componentDidMount() {
        document.title="Add Article"
		
		//FETCH DETAILS OF PRODUCT
        let c_product = new FormData();
        c_product.append('tok',this.state.token);

        c_product.append('get_article', this.state.token)
        axios({
                method: 'post',
                url: api_link+'techerArticledetails.php',
                data: c_product,
                config: { headers: {'Content-Type': 'multipart/form-data' }}
        }).then(response => response.data)
        .then((data) => {
           
            this.setState({
               
                description: data[0]['t_desc'],

           
              
            })
        })
    }
  
    handleEditFormSubmit( event ) {
		event.preventDefault();
		
        var all_good=true;
      
        if(all_good)
        {
            if(window.confirm("Are You Sure To Make Changes?"))
            {
                
                    let formData = new FormData();
                   
                    
                    formData.append('description',this.state.description);

                  
                    formData.append('edit_article',this.state.token);
                   
                    

                    axios({
                        method: 'post',
                        url: api_link+'techerArticledetails.php',
                        data: formData,
                        config: { headers: {'Content-Type': 'multipart/form-data' }}
                    }).then(response => response.data)
                    .then((data) => {
                        console.log(data)
                        if(data.msg==="ok")
                        {	
                            $("#update_msg").html("<strong>Success! </strong> Your Request Successfully Processed")
                            $("#update_msg").removeClass("alert-danger").addClass("alert-success")
                        }
                        else
                        {
                            $("#update_msg").html("<strong>Error! </strong> Unable to Process Your Request"+data.msg)
                            $("#update_msg").removeClass("alert-success").addClass("alert-danger")
                        }
                        $("#update_msg").show()
                        window.scrollTo({top: 0, behavior: 'smooth'});
                        setTimeout(function(){ $("#update_msg").hide(); }, 4000);


                    })
                    .catch(function (response) {
                        console.log(response)
                        $("#update_msg").html("<strong>Error! </strong> Unable to Process Your Request")
                        $("#update_msg").removeClass("alert-success").addClass("alert-danger")
                        
                        $("#update_msg").show()
                        window.scrollTo({top: 0, behavior: 'smooth'});
                        setTimeout(function(){ $("#update_msg").hide(); }, 4000);
                    });
                
                
            }
        }
	}

   

    render()
    {
        var obj = this
        $(function(){            
            $('.mobile').keypress(function (e) {
                var regex = new RegExp("^[0-9\b]+$");
                var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
                if (regex.test(str)) {
                    return true;
                }
                else
                {
                    e.preventDefault();
                    return false;
                }
            });
        })


        return(
            <React.Fragment>
                <div className="content-wrapper">
                    <section className="content-header">
                        <h1>Add Articles</h1>
                        <ol className="breadcrumb">
                              <li>
                                  <div className="pull-right"> 
                                      <Link to="/admin/courses" className="btn btn-success">
                                            <i className="fa fas fa-cart-plus"></i> Go Back
                                      </Link>
                                  </div>
                              </li>
                        </ol>
                    </section>
                    <section>
                        <div id="update_msg" className="alert" style={{display: 'none'}}></div> 
                    </section>
                    <section className="content" style={{overflow: 'auto'}} key={this.childKey}>
                          <div className="box">
                              <div className="box-body">
                                  <br/>
                                  <form id="editForm" onSubmit={this.handleEditFormSubmit.bind(this)}>
                                      <div className="modal-body">
                                          <div className="row">
                                            
                                              
                                             

                                              

                                             

                                              <div className="col-md-12">
                                                    <br/>
                                                    <label>Detailed Description</label>
                                                    &nbsp;<span id="d_description" style={{color: 'red', display: 'none'}}>This field is required*</span>
                                                    <CKEditor content={this.state.description} required activeClass="p10" events={{ "change": e => this.setState({ description: e.editor.getData() })}}/>
                                              </div>
                                              <div className="col-md-12">
                                                  <br/>
                                                  <button type="submit" name="edit" className="btn pull-right btn-primary">Save Changes</button>
                                              </div>
                                          </div>
                                          <br/>
                                      </div>                 
                                  </form>
                              </div>
                          </div>
                      </section>
                  </div>
            </React.Fragment>
        );
    }
}



class Pending extends React.Component{
    constructor() {
        super();
        this.state = {
            // refresh: false,
            // modalVisible: false,
            // editModalVisible: false,
            // doingModal: false,
            // type: '',
            // choice: '',
            // date:'',
            // time:'',
            // teacher:'',
            abcd: [],
            noClass:false,
            // teachersdata:[], 
            // products: [],
            // title: '',
            // data: [],
            // classid:'',
            // teacherid: '',
        };
        
    }

    componentDidMount() {
        document.title="Pending" 
        
        let formData = new FormData();
        formData.append('pendingteacher','ok')

        formData.append('teacher_id',window.atob(window.sessionStorage.getItem(window.btoa("teacher_id"))))
        axios({
            method: 'post',
            url: api_link+'techerArticledetails.php',
            data: formData,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
        .then(response => response.data)
        .then((data) => {
            console.log(data)
            if(data.msg === "ok")
            {
                this.setState({abcd: data.data})
            }
            else if(data.msg == "No Class Available")
            {
                this.setState({noClass: true})
            }
        })

         
    }

    shouldComponentUpdate(nextProps,nextState){
      if(JSON.stringify(this.state.abcd) === JSON.stringify(nextState.abcd))
      {
          return true;
      }
      else 
      {  
        if(this.state.refresh)
        {
            $("script[src='js/dataTable.js']").remove();

            const script = document.createElement("script");
            script.src = "js/dataTable.js";
            script.async = true;
            document.body.appendChild(script);
            ++this.childKey
        }
        else
        {
            this.setState({
                refresh: true
            })
        }
        return true;
      }
    }
    
    render()
    {
        let styles = this.state.modalVisible
          ? { display: "block" }
          : { display: "none" };
        let modalFade = this.state.modalVisible
          ? { fade: "fade" }
          : { fade: "show" };
        
        let estyles = this.state.editModalVisible
          ? { display: "block", overflow: 'auto' }
          : { display: "none" };
        let emodalFade = this.state.editModalVisible
          ? { fade: "fade" }
          : { fade: "show" };
        
        return(
            <React.Fragment>
                <div className="content-wrapper">
                    
                    <section className="content-header">
                          <h1>Pending</h1>
                          <ol className="breadcrumb">
                              <li>
                                  <div className="pull-right"> 
                                    
                                  </div>
                              </li>
                          </ol>
                    </section>

                    <section>
                        <div id="update_message" className="alert" style={{display: 'none', marginTop:20, marginLeft:20, marginRight:20}}></div> 
                    </section>

                    <section className="content" key={this.childKey}>
                          <div className="box">
                              <div className="box-body table-responsive">
                                  <br/>
                                {this.state.noClass?(
                                    <p>No Data Available</p>
                                ):( <div><table id="example1" className="table">
                                    <thead>
                                    <tr>
                                      <th style={{textAlign: 'center'}}>Sno.</th>
                                      <th style={{textAlign: 'center'}}>Topic</th>
                                      
                                    </tr>
                                    </thead>
                                    <tbody>
                                      {this.state.abcd&&this.state.abcd.map((m, key) => (
                                      <tr key={m.id}>
                                          
                                          <td style={{textAlign: 'center'}} id={'users'+m.id}>{key+1}</td>
                                          <td style={{textAlign: 'center'}} id={'class_title'+m.id}>{m.topic}</td>
                                          
                                        </tr>
                                      
                                      ))}
                                    </tbody>
                                    <tfoot></tfoot>
                                  </table>                     
                              </div>)}
                              </div>
                          </div>
                      </section>
                  </div>
                
               
            </React.Fragment>
        );
    }
}



class Approve extends React.Component{
    constructor() {
        super();
        this.state = {
            // refresh: false,
            // modalVisible: false,
            // editModalVisible: false,
            // doingModal: false,
            // type: '',
            // choice: '',
            // date:'',
            // time:'',
            // teacher:'',
            abcd: [],
            noClass:false,
            // teachersdata:[], 
            // products: [],
            // title: '',
            // data: [],
            // classid:'',
            // teacherid: '',
        };
        
    }

    componentDidMount() {
        document.title="Approved" 
        
        let formData = new FormData();
        formData.append('approvedteacher','ok')

        formData.append('teacher_id',window.atob(window.sessionStorage.getItem(window.btoa("teacher_id"))))
        axios({
            method: 'post',
            url: api_link+'techerArticledetails.php',
            data: formData,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
        .then(response => response.data)
        .then((data) => {
            console.log(data)
            if(data.msg === "ok")
            {
                this.setState({abcd: data.data})
            }
            else if(data.msg == "No Class Available")
            {
                this.setState({noClass: true})
            }
        })

         
    }

    shouldComponentUpdate(nextProps,nextState){
      if(JSON.stringify(this.state.abcd) === JSON.stringify(nextState.abcd))
      {
          return true;
      }
      else 
      {  
        if(this.state.refresh)
        {
            $("script[src='js/dataTable.js']").remove();

            const script = document.createElement("script");
            script.src = "js/dataTable.js";
            script.async = true;
            document.body.appendChild(script);
            ++this.childKey
        }
        else
        {
            this.setState({
                refresh: true
            })
        }
        return true;
      }
    }
    
    render()
    {
        let styles = this.state.modalVisible
          ? { display: "block" }
          : { display: "none" };
        let modalFade = this.state.modalVisible
          ? { fade: "fade" }
          : { fade: "show" };
        
        let estyles = this.state.editModalVisible
          ? { display: "block", overflow: 'auto' }
          : { display: "none" };
        let emodalFade = this.state.editModalVisible
          ? { fade: "fade" }
          : { fade: "show" };
        
        return(
            <React.Fragment>
                <div className="content-wrapper">
                    
                    <section className="content-header">
                          <h1>Approved</h1>
                          <ol className="breadcrumb">
                              <li>
                                  <div className="pull-right"> 
                                    
                                  </div>
                              </li>
                          </ol>
                    </section>

                    <section>
                        <div id="update_message" className="alert" style={{display: 'none', marginTop:20, marginLeft:20, marginRight:20}}></div> 
                    </section>

                    <section className="content" key={this.childKey}>
                          <div className="box">
                              <div className="box-body table-responsive">
                                  <br/>
                                {this.state.noClass?(
                                    <p>No Data Available</p>
                                ):( <div><table id="example1" className="table">
                                    <thead>
                                    <tr>
                                      <th style={{textAlign: 'center'}}>Sno.</th>
                                      <th style={{textAlign: 'center'}}>Topic</th>
                                      
                                    </tr>
                                    </thead>
                                    <tbody>
                                      {this.state.abcd.map((m, key) => (
                                      <tr key={m.id}>
                                          
                                          <td style={{textAlign: 'center'}} id={'users'+m.id}>{key+1}</td>
                                          <td style={{textAlign: 'center'}} id={'class_title'+m.id}>{m.topic}</td>
                                          
                                        </tr>
                                      
                                      ))}
                                    </tbody>
                                    <tfoot></tfoot>
                                  </table>                     
                              </div>)}
                              </div>
                          </div>
                      </section>
                  </div>
                
               
            </React.Fragment>
        );
    }
}




class Rejected extends React.Component{
    
    constructor() {
        super();
        this.state = {
          products: []
        };
        
        this.childKey = 0;
      }

    componentDidMount() {
        document.title="Rejected"
        let formData = new FormData();
        formData.append('rejectedteacher', 'ok')
        formData.append('teacher_id', window.atob(window.sessionStorage.getItem(window.btoa("teacher_id"))))
      

        axios({
                method: 'post',
                url: api_link+'techerArticledetails.php',
                data: formData,
                config: { headers: {'Content-Type': 'multipart/form-data' }}
        }).then(response => response.data)
        .then((data) => {
          this.setState({ products: data.data })
            $("script[src='js/dataTable.js']").remove();
            const script = document.createElement("script");

            script.src = "js/dataTable.js";
            script.async = true;

            document.body.appendChild(script);
         })          
    }

  

    render()
    {
        return(
            <React.Fragment>
                <div className="content-wrapper">
                    <section>
                        <div id="update_message" className="alert" style={{display: 'none'}}></div> 
                    </section>
                    <section className="content-header">
                          <h1>Rejected Articles</h1>
                          
                    </section>

                    <section className="content" key={this.childKey}>
                          <div className="box">
                              <div className="box-body table-responsive">
                                  <br/>
                                  <table id="example1" className="table">
                                    <thead>
                                    <tr>
                                      <th>Sno.</th>
                                      <th>Article topic</th>
                                    
                                      <th>Action</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                      {this.state.products && this.state.products.map((product, key) => (
                                      <tr key={product.id}>
                                          
                                          <td id={'name'+product.id}>{key+1}</td>
                                          <td>{product.topic}</td>
                                          
                                          <td>
                                              <Link to={"add-article/"+product.id} className="btn btn-success" style={{marginRight: '7px'}}>
                                                  <i className="fa fa-edit"></i> Edit
                                              </Link>
                                          </td>
                                        </tr>
                                      ))}
                                    </tbody>
                                    <tfoot></tfoot>
                                  </table>                    
                              </div>
                          </div>
                      </section>
                  </div>
            </React.Fragment>
        );
    }
}







export {
   
    Articles,
    
    Editarticle,
    Approve,
    Pending,Rejected
    
};