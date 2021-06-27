import React from 'react';

import { Link } from "react-router-dom";
import axios from 'axios';
import $ from 'jquery';
import CKEditor from "react-ckeditor-component";

import { api_link,serverBase_link } from './AdminLogin';

class Programs extends React.Component{
    
    constructor() {
        super();
        this.state = {
          products: []
        };
        
        this.childKey = 0;
      }

    componentDidMount() {
        document.title="Programmes"
        let formData = new FormData();
        formData.append('programmes', "all")
        
        axios({
                method: 'post',
                url: api_link+'ProgramsFetch.php',
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

    deleteCategory = qid  => e => {
      
          if(window.confirm("Are You Sure To Delete This Programme?")) 
          {
              let formData = new FormData();
              formData.append('delete_programme', qid)
              var obj=this

              axios({
                  method: 'post',
                  url: api_link+'ProgramsManagement.php',
                  data: formData,
                  config: { headers: {'Content-Type': 'multipart/form-data' }}
              })
              .then(function (response) {
                  //handle success
                  if(response.data === "ok")
                  {	
                        let formData1 = new FormData();
                        formData1.append('programmes', "1")

                        axios({
                            method: 'post',
                            url: api_link+'ProgramsFetch.php',
                            data: formData1,
                            config: { headers: {'Content-Type': 'multipart/form-data' }}
                        })
                        .then(response => response.data)
                        .then((data) => {
                            obj.setState({ products: data.data})
                        })

                      $("#update_message").html("<strong>Success! </strong> Your Request Successfully Processed")
                      $("#update_message").removeClass("alert-danger").addClass("alert-success")
                  }
                  else
                  {
                      $("#update_message").html("<strong>Error! </strong> Unable to Process Your Request")
                      $("#update_message").removeClass("alert-success").addClass("alert-danger")
                  }
                  $("#update_message").show()
                   setTimeout(function(){ $("#update_message").hide(); }, 4000);


              })
              .catch(function (response) {
                    //handle error
                    console.log(response)
                    $("#update_message").html("<strong>Error! </strong> Unable to Process Your Request")
                    $("#update_message").removeClass("alert-success").addClass("alert-danger")
                    $("#update_message").show()
                    setTimeout(function(){ $("#update_message").hide(); }, 4000);
              });
          }
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
                          <h1>Programmes</h1>
                          <ol className="breadcrumb">
                              <li>
                                  <div className="pull-right"> 
                                      <Link to="/admin/add-programme" className="btn btn-primary">
                                            <i className="fa fa-plus"></i>
                                      </Link>
                                  </div>
                              </li>
                          </ol>
                    </section>

                    <section className="content" key={this.childKey}>
                          <div className="box">
                              <div className="box-body table-responsive">
                                  <br/>
                                  <table id="example1" className="table">
                                    <thead>
                                    <tr>
                                      <th>Image</th>
                                      <th>Name</th>
                                      <th>Fees</th>
                                      <th>Tax %</th>
                                      <th>Starting From</th>
                                      <th>Status</th>
                                      <th>Action</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                      {this.state.products&&this.state.products.map((product, key) => (
                                      <tr key={product.id}>
                                          <td>
                                            <img height="117px" alt="p_image" src={serverBase_link+"images/"+product.image}/>
                                          </td>
                                          <td id={'name'+product.id}>{product.name}</td>
                                          <td>{product.fees}</td>
                                          <td>{product.tax_per}</td>
                                          <td>{product.starting_from}</td>
                                          <td>{product.status}</td>
                                          <td>
                                              <Link to={"edit-programme/"+product.id} className="btn btn-success" style={{marginRight: '7px'}}>
                                                  <i className="fa fa-edit"></i> Edit
                                              </Link>
                                              <button type="submit" name="del" className="btn btn-danger" value={product.id} onClick={this.deleteCategory(product.id)}><i className="fa fa-trash"></i></button>
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

class AddProgram extends React.Component{

    constructor() {
        super();
        this.state = {
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
    }
    
    componentDidMount() {
        document.title="Add Programme"
    }
  
    handleAddFormSubmit( event ) {
		event.preventDefault();
		
        var all_good=true;
        
        if(!this.state.description)
        {
            $("#d_description").show();
            all_good=false;
        }
        else
        {
            $("#d_description").hide();
        }
      
        if(all_good)
        {
            $("#invalid_message").hide();
            let reader = new FileReader()
            reader.readAsDataURL(this.state.image)
            reader.onload=(e)=>{
                let formData = new FormData();
                formData.append('add_programme', 'yes')
                formData.append('name', this.state.name)
                formData.append('fees', this.state.fees)
                formData.append('tax_per', this.state.tax_per)
                formData.append('image', this.state.image)
                formData.append('starting_from', this.state.starting_from)  
                formData.append('status', this.refs.status.value)  
                formData.append('description', this.state.description)  

                if(this.state.schedule_pdf)
                {
                    formData.append('schedule_pdf', this.state.schedule_pdf)
                }

                if(this.state.sample_video)
                {
                    formData.append('sample_video', this.state.sample_video)
                }

                var obj=this

                $("#addButton").html("Processing").prop("disabled", true)

                axios({
                    method: 'post',
                    url: api_link+'ProgramsManagement.php',
                    data: formData,
                    config: { headers: {'Content-Type': 'multipart/form-data' }}
                })
                .then(function (response) {
                    //handle success
                    if(response.data === "ok")
                    {	
                        document.getElementById("addProduct").reset(); 
                        $("#addButton").html("Add Data").prop("disabled", false)

                        obj.setState({
                            image: '',
                            name:'',
                            starting_from: '',
                            fees: '',
                            tax_per: '',
                            description: '',
                            sample_video: '',
                            schedule_pdf: '',
                        })
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
    
    onChange(e) {
        this.setState({
            image: e.target.files[0]
        });
    }

    onTextChange(evt){
      var newContent = evt.editor.getData();
      this.setState({
        description: newContent
      })
    }

    render()
    {   

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
                        <h1>Add Programme</h1>
                        <ol className="breadcrumb">
                              <li>
                                  <div className="pull-right"> 
                                      <Link to="/admin/programmes" className="btn btn-success">
                                            <i className="fa fas fa-arrow-left"></i> Go Back
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
                                  <form id="addProduct" onSubmit={this.handleAddFormSubmit.bind(this)}>
                                      <div className="modal-body">
                                          <div className="row">
                                              <div className="col-md-6">
                                                  <label>Name</label>
                                                    <input type="text" className="form-control" required onChange={e => this.setState({ name: e.target.value })} />
                                              </div>
                                              <div className="col-md-6">
                                                    <label>Status</label>
                                                    <select className="form-control col-md-6" required ref="status">
                                                        <option value="active">Active</option>
                                                        <option value="inactive">Inactive</option>
                                                    </select>
                                              </div>

                                                <div className="col-md-6">
                                                    <br/>
                                                    <label>Fees</label>
                                                    <input type="text" className="form-control mobile" required onChange={e => this.setState({ fees: e.target.value })} />
                                                </div>

                                                <div className="col-md-6">
                                                    <br/>
                                                    <label>Tax %</label>
                                                    <input type="text" className="form-control mobile" required onChange={e => this.setState({ tax_per: e.target.value })} />
                                                </div>

                                              <div className="col-md-6">
                                                    <br/>
                                                    <label>Starting From</label>
                                                    <input type="date" className="form-control" onChange={e => this.setState({ starting_from: e.target.value })} required />
                                              </div>

                                              <div className="col-md-6">
                                                    <br/>
                                                    <label>Image</label>
                                                    <input type="file" className="form-control" accept="image/*" required onChange={(e) => this.onChange(e) } />
                                              </div>

                                                <div className="col-md-6">
                                                    <br/>
                                                    <label>Sample Video [Optional]</label>
                                                    <input type="file" className="form-control" accept="video/*" onChange={(e) => {this.setState({sample_video: e.target.files[0]});} } />
                                                </div>

                                                <div className="col-md-6">
                                                    <br/>
                                                    <label>Schedule PDF [Optional]</label>
                                                    <input type="file" className="form-control" accept=".pdf" onChange={(e) => {this.setState({schedule_pdf: e.target.files[0]});} } />
                                                </div>

                                              <div className="col-md-12">
                                                    <br/>
                                                    <label>Detailed Description</label>
                                                    &nbsp;<span id="d_description" style={{color: 'red', display: 'none'}}>This field is required*</span>
                                                    <CKEditor content={this.state.description} required activeClass="p10" events={{ "change": e => this.setState({ description: e.editor.getData() })}}/>
                                              </div>
                                              <div className="col-md-12">
                                                  <br/>
                                                  <button type="submit" name="add" id="addButton" className="btn pull-right btn-primary">Add Data</button>
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

class EditProgram extends React.Component{
 
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
        document.title="Edit Programme"
		
		//FETCH DETAILS OF PRODUCT
        let c_product = new FormData();
        c_product.append('edit_programme', this.state.token)
        axios({
                method: 'post',
                url: api_link+'ProgramsFetch.php',
                data: c_product,
                config: { headers: {'Content-Type': 'multipart/form-data' }}
        }).then(response => response.data)
        .then((data) => {
            this.setState({
                name: data[0]['name'],
                description: data[0]['description'],
                status: data[0]['status'],
                image: data[0]['image'],
                starting_from: data[0]['starting_from'],
                fees: data[0]['fees'],
                tax_per: data[0]['tax_per'],
                sample_video: data[0]['sample_video'],
                schedule_pdf: data[0]['schedule_pdf'],
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
                if( document.getElementById("edit_image").files.length === 0 )
                {
                    let formData = new FormData();
                    formData.append('edit_programme', this.state.token)
                    formData.append('name', this.state.name)
                    formData.append('fees', this.state.fees)
                    formData.append('tax_per', this.state.tax_per)
                    formData.append('starting_from', this.state.starting_from)  
                    formData.append('status', this.refs.status.value)  
                    formData.append('description', this.state.description)  

                    if(this.state.schedule_pdf)
                    {
                        formData.append('schedule_pdf', this.state.schedule_pdf)
                    }

                    if(this.state.sample_video)
                    {
                        formData.append('sample_video', this.state.sample_video)
                    }

                    axios({
                        method: 'post',
                        url: api_link+'ProgramsManagement.php',
                        data: formData,
                        config: { headers: {'Content-Type': 'multipart/form-data' }}
                    })
                    .then(function (response) {
                        //handle success
                        if(response.data === "ok")
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
                else
                {
                    let reader = new FileReader()
                    reader.readAsDataURL(this.state.image)
                    reader.onload=(e)=>{
                        let formData = new FormData();
                        formData.append('edit_programme', this.state.token)
                        formData.append('name', this.state.name)
                        formData.append('fees', this.state.fees)
                        formData.append('tax_per', this.state.tax_per)
                        formData.append('image', this.state.image)
                        formData.append('starting_from', this.state.starting_from)  
                        formData.append('status', this.refs.status.value)  
                        formData.append('description', this.state.description)  

                        if(this.state.schedule_pdf)
                        {
                            formData.append('schedule_pdf', this.state.schedule_pdf)
                        }

                        if(this.state.sample_video)
                        {
                            formData.append('sample_video', this.state.sample_video)
                        }

                        axios({
                            method: 'post',
                            url: api_link+'ProgramsManagement.php',
                            data: formData,
                            config: { headers: {'Content-Type': 'multipart/form-data' }}
                        })
                        .then(function (response) {
                            //handle success
                            if(response.data === "ok")
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
                             setTimeout(function(){ $("#update_msg").hide(); }, 4000);


                        })
                        .catch(function (response) {
                            $("#update_msg").html("<strong>Error! </strong> Unable to Process Your Request")
                            $("#update_msg").removeClass("alert-success").addClass("alert-danger")
                            $("#update_msg").show()
                            window.scrollTo({top: 0, behavior: 'smooth'});
                            setTimeout(function(){ $("#update_msg").hide(); }, 4000);
                        });
                    }
                }
            }
        }
	}

    onChange(e) {
        this.setState({
            image: e.target.files[0]
        });
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
                        <h1>Edit Programme</h1>
                        <ol className="breadcrumb">
                              <li>
                                  <div className="pull-right"> 
                                      <Link to="/admin/programmes" className="btn btn-success">
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
                                                  <label>Name</label>
                                                    <input type="text" className="form-control" defaultValue={this.state.name} required onChange={e => this.setState({ name: e.target.value })} />
                                              </div>
                                              
                                              <div className="col-md-6">
                                                    <br/>
                                                    <label>Status</label>
                                                    <select id="status" className="form-control col-md-6" required ref="status">
                                                        <option value="active" selected={obj.state.status === "active"}>Active</option>
                                                        <option value="inactive" selected={obj.state.status === "inactive"}>Inactive</option>
                                                    </select>
                                              </div>
                                              
                                                <div className="col-md-6">
                                                    <br/>
                                                    <label>Fees</label>
                                                    <input type="text" className="form-control mobile" defaultValue={this.state.fees} required onChange={e => this.setState({ fees: e.target.value })} />
                                                </div>

                                                <div className="col-md-6">
                                                    <br/>
                                                    <label>Tax %</label>
                                                    <input type="text" className="form-control mobile" defaultValue={this.state.tax_per} required onChange={e => this.setState({ tax_per: e.target.value })} />
                                                </div>

                                              <div className="col-md-6">
                                                    <br/>
                                                    <label>Starting From</label>
                                                    <input type="date" className="form-control" defaultValue={this.state.starting_from} onChange={e => this.setState({ starting_from: e.target.value })} required />
                                              </div>
                                              
                                              <div className="col-md-6">
                                                    <br/>
                                                    <label>Image</label>
                                                    <br/>
                                                    <img src={serverBase_link+"images/"+this.state.image} alt="Main Banner" style={{height: '150px'}} />
                                                    <input id="edit_image" type="file" className="form-control" accept="image/*" onChange={(e) => this.onChange(e) } />
                                              </div>

                                              <div className="col-md-6">
                                                    <br/>
                                                    <label>Sample Video [Optional]</label>
                                                    {
                                                        this.state.sample_video
                                                        ?
                                                        <React.Fragment>
                                                            <br/>
                                                            <video src={serverBase_link+"images/"+this.state.sample_video} alt="Sample Video" style={{height: '150px'}} />
                                                        </React.Fragment>
                                                        :
                                                        ''
                                                    }
                                                    <input type="file" className="form-control" accept="video/*" onChange={(e) => {this.setState({sample_video: e.target.files[0]});} } />
                                                </div>

                                                <div className="col-md-6">
                                                    <br/>
                                                    <label>Schedule PDF [Optional]</label>
                                                    {
                                                        this.state.schedule_pdf
                                                        ?
                                                        <React.Fragment>
                                                            <br/>
                                                            <a href={serverBase_link+"images/"+this.state.sample_video} target="_blank" rel="noreferrer">View/Download</a>
                                                        </React.Fragment>
                                                        :
                                                        ''
                                                    }
                                                    <input type="file" className="form-control" accept=".pdf" onChange={(e) => {this.setState({schedule_pdf: e.target.files[0]});} } />
                                                </div>

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

class Courses extends React.Component{
    
    constructor() {
        super();
        this.state = {
          products: []
        };
        
        this.childKey = 0;
      }

    componentDidMount() {
        document.title="Courses"
        let formData = new FormData();
        formData.append('courses', "all")
        
        axios({
                method: 'post',
                url: api_link+'ProgramsFetch.php',
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

    deleteCategory = qid  => e => {
      
          if(window.confirm("Are You Sure To Delete This Courses?")) 
          {
              let formData = new FormData();
              formData.append('delete_course', qid)
              var obj=this

              axios({
                  method: 'post',
                  url: api_link+'ProgramsManagement.php',
                  data: formData,
                  config: { headers: {'Content-Type': 'multipart/form-data' }}
              })
              .then(function (response) {
                  //handle success
                  if(response.data === "ok")
                  {	
                        let formData1 = new FormData();
                        formData1.append('courses', "1")

                        axios({
                            method: 'post',
                            url: api_link+'ProgramsFetch.php',
                            data: formData1,
                            config: { headers: {'Content-Type': 'multipart/form-data' }}
                        })
                        .then(response => response.data)
                        .then((data) => {
                            obj.setState({ products: data.data})
                        })

                      $("#update_message").html("<strong>Success! </strong> Your Request Successfully Processed")
                      $("#update_message").removeClass("alert-danger").addClass("alert-success")
                  }
                  else
                  {
                      $("#update_message").html("<strong>Error! </strong> Unable to Process Your Request")
                      $("#update_message").removeClass("alert-success").addClass("alert-danger")
                  }
                  $("#update_message").show()
                   setTimeout(function(){ $("#update_message").hide(); }, 4000);


              })
              .catch(function (response) {
                    //handle error
                    console.log(response)
                    $("#update_message").html("<strong>Error! </strong> Unable to Process Your Request")
                    $("#update_message").removeClass("alert-success").addClass("alert-danger")
                    $("#update_message").show()
                    setTimeout(function(){ $("#update_message").hide(); }, 4000);
              });
          }
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
                          <h1>Courses</h1>
                          <ol className="breadcrumb">
                              <li>
                                  <div className="pull-right"> 
                                      <Link to="/admin/add-course" className="btn btn-primary">
                                            <i className="fa fa-plus"></i>
                                      </Link>
                                  </div>
                              </li>
                          </ol>
                    </section>

                    <section className="content" key={this.childKey}>
                          <div className="box">
                              <div className="box-body table-responsive">
                                  <br/>
                                  <table id="example1" className="table">
                                    <thead>
                                    <tr>
                                      <th>Image</th>
                                      <th>Name</th>
                                      <th>Fees</th>
                                      <th>Tax %</th>
                                      <th>Starting From</th>
                                      <th>Status</th>
                                      <th>Action</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                      {this.state.products&&this.state.products.map((product, key) => (
                                      <tr key={product.id}>
                                          <td>
                                            <img height="117px" alt="p_image" src={serverBase_link+"images/"+product.image}/>
                                          </td>
                                          <td id={'name'+product.id}>{product.name}</td>
                                          <td>{product.fees}</td>
                                          <td>{product.tax_per}</td>
                                          <td>{product.starting_from}</td>
                                          <td>{product.status}</td>
                                          <td>
                                              <Link to={"edit-course/"+product.id} className="btn btn-success" style={{marginRight: '7px'}}>
                                                  <i className="fa fa-edit"></i> Edit
                                              </Link>
                                              <button type="submit" name="del" className="btn btn-danger" value={product.id} onClick={this.deleteCategory(product.id)}><i className="fa fa-trash"></i></button>
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

class AddCourses extends React.Component{

    constructor() {
        super();
        this.state = {
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
    }
    
    componentDidMount() {
        document.title="Add Courses"
    }
  
    handleAddFormSubmit( event ) {
		event.preventDefault();
		
        var all_good=true;
        
        if(!this.state.description)
        {
            $("#d_description").show();
            all_good=false;
        }
        else
        {
            $("#d_description").hide();
        }
      
        if(all_good)
        {
            $("#invalid_message").hide();
            let reader = new FileReader()
            reader.readAsDataURL(this.state.image)
            reader.onload=(e)=>{
                let formData = new FormData();
                formData.append('add_course', 'yes')
                formData.append('name', this.state.name)
                formData.append('fees', this.state.fees)
                formData.append('tax_per', this.state.tax_per)
                formData.append('image', this.state.image)
                formData.append('starting_from', this.state.starting_from)  
                formData.append('status', this.refs.status.value)  
                formData.append('description', this.state.description)  

                if(this.state.schedule_pdf)
                {
                    formData.append('schedule_pdf', this.state.schedule_pdf)
                }

                if(this.state.sample_video)
                {
                    formData.append('sample_video', this.state.sample_video)
                }

                var obj=this

                $("#addButton").html("Processing").prop("disabled", true)

                axios({
                    method: 'post',
                    url: api_link+'ProgramsManagement.php',
                    data: formData,
                    config: { headers: {'Content-Type': 'multipart/form-data' }}
                })
                .then(function (response) {
                    //handle success
                    if(response.data === "ok")
                    {	
                        document.getElementById("addProduct").reset(); 
                        $("#addButton").html("Add Data").prop("disabled", false)

                        obj.setState({
                            image: '',
                            name:'',
                            starting_from: '',
                            fees: '',
                            tax_per: '',
                            description: '',
                            sample_video: '',
                            schedule_pdf: '',
                        })
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
    
    onChange(e) {
        this.setState({
            image: e.target.files[0]
        });
    }

    onTextChange(evt){
      var newContent = evt.editor.getData();
      this.setState({
        description: newContent
      })
    }

    render()
    {   

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
                        <h1>Add Courses</h1>
                        <ol className="breadcrumb">
                              <li>
                                  <div className="pull-right"> 
                                      <Link to="/admin/courses" className="btn btn-success">
                                            <i className="fa fas fa-arrow-left"></i> Go Back
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
                                  <form id="addProduct" onSubmit={this.handleAddFormSubmit.bind(this)}>
                                      <div className="modal-body">
                                          <div className="row">
                                              <div className="col-md-6">
                                                  <label>Name</label>
                                                    <input type="text" className="form-control" required onChange={e => this.setState({ name: e.target.value })} />
                                              </div>
                                              <div className="col-md-6">
                                                    <label>Status</label>
                                                    <select className="form-control col-md-6" required ref="status">
                                                        <option value="active">Active</option>
                                                        <option value="inactive">Inactive</option>
                                                    </select>
                                              </div>

                                                <div className="col-md-6">
                                                    <br/>
                                                    <label>Fees</label>
                                                    <input type="text" className="form-control mobile" required onChange={e => this.setState({ fees: e.target.value })} />
                                                </div>

                                                <div className="col-md-6">
                                                    <br/>
                                                    <label>Tax %</label>
                                                    <input type="text" className="form-control mobile" required onChange={e => this.setState({ tax_per: e.target.value })} />
                                                </div>

                                              <div className="col-md-6">
                                                    <br/>
                                                    <label>Starting From</label>
                                                    <input type="date" className="form-control" onChange={e => this.setState({ starting_from: e.target.value })} required />
                                              </div>

                                              <div className="col-md-6">
                                                    <br/>
                                                    <label>Image</label>
                                                    <input type="file" className="form-control" accept="image/*" required onChange={(e) => this.onChange(e) } />
                                              </div>

                                                <div className="col-md-6">
                                                    <br/>
                                                    <label>Sample Video [Optional]</label>
                                                    <input type="file" className="form-control" accept="video/*" onChange={(e) => {this.setState({sample_video: e.target.files[0]});} } />
                                                </div>

                                                <div className="col-md-6">
                                                    <br/>
                                                    <label>Schedule PDF [Optional]</label>
                                                    <input type="file" className="form-control" accept=".pdf" onChange={(e) => {this.setState({schedule_pdf: e.target.files[0]});} } />
                                                </div>

                                              <div className="col-md-12">
                                                    <br/>
                                                    <label>Detailed Description</label>
                                                    &nbsp;<span id="d_description" style={{color: 'red', display: 'none'}}>This field is required*</span>
                                                    <CKEditor content={this.state.description} required activeClass="p10" events={{ "change": e => this.setState({ description: e.editor.getData() })}}/>
                                              </div>
                                              <div className="col-md-12">
                                                  <br/>
                                                  <button type="submit" name="add" id="addButton" className="btn pull-right btn-primary">Add Data</button>
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

class EditCourses extends React.Component{
 
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
        document.title="Edit Course"
		
		//FETCH DETAILS OF PRODUCT
        let c_product = new FormData();
        c_product.append('edit_course', this.state.token)
        axios({
                method: 'post',
                url: api_link+'ProgramsFetch.php',
                data: c_product,
                config: { headers: {'Content-Type': 'multipart/form-data' }}
        }).then(response => response.data)
        .then((data) => {
            this.setState({
                name: data[0]['name'],
                description: data[0]['description'],
                status: data[0]['status'],
                image: data[0]['image'],
                starting_from: data[0]['starting_from'],
                fees: data[0]['fees'],
                tax_per: data[0]['tax_per'],
                sample_video: data[0]['sample_video'],
                schedule_pdf: data[0]['schedule_pdf'],
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
                if( document.getElementById("edit_image").files.length === 0 )
                {
                    let formData = new FormData();
                    formData.append('edit_course', this.state.token)
                    formData.append('name', this.state.name)
                    formData.append('fees', this.state.fees)
                    formData.append('tax_per', this.state.tax_per)
                    formData.append('starting_from', this.state.starting_from)  
                    formData.append('status', this.refs.status.value)  
                    formData.append('description', this.state.description)  

                    if(this.state.schedule_pdf)
                    {
                        formData.append('schedule_pdf', this.state.schedule_pdf)
                    }

                    if(this.state.sample_video)
                    {
                        formData.append('sample_video', this.state.sample_video)
                    }

                    axios({
                        method: 'post',
                        url: api_link+'ProgramsManagement.php',
                        data: formData,
                        config: { headers: {'Content-Type': 'multipart/form-data' }}
                    })
                    .then(function (response) {
                        //handle success
                        if(response.data === "ok")
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
                else
                {
                    let reader = new FileReader()
                    reader.readAsDataURL(this.state.image)
                    reader.onload=(e)=>{
                        let formData = new FormData();
                        formData.append('edit_course', this.state.token)
                        formData.append('name', this.state.name)
                        formData.append('fees', this.state.fees)
                        formData.append('tax_per', this.state.tax_per)
                        formData.append('image', this.state.image)
                        formData.append('starting_from', this.state.starting_from)  
                        formData.append('status', this.refs.status.value)  
                        formData.append('description', this.state.description)  

                        if(this.state.schedule_pdf)
                        {
                            formData.append('schedule_pdf', this.state.schedule_pdf)
                        }

                        if(this.state.sample_video)
                        {
                            formData.append('sample_video', this.state.sample_video)
                        }

                        axios({
                            method: 'post',
                            url: api_link+'ProgramsManagement.php',
                            data: formData,
                            config: { headers: {'Content-Type': 'multipart/form-data' }}
                        })
                        .then(function (response) {
                            //handle success
                            if(response.data === "ok")
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
                             setTimeout(function(){ $("#update_msg").hide(); }, 4000);


                        })
                        .catch(function (response) {
                            $("#update_msg").html("<strong>Error! </strong> Unable to Process Your Request")
                            $("#update_msg").removeClass("alert-success").addClass("alert-danger")
                            $("#update_msg").show()
                            window.scrollTo({top: 0, behavior: 'smooth'});
                            setTimeout(function(){ $("#update_msg").hide(); }, 4000);
                        });
                    }
                }
            }
        }
	}

    onChange(e) {
        this.setState({
            image: e.target.files[0]
        });
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
                        <h1>Edit Course</h1>
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
                                                  <label>Name</label>
                                                    <input type="text" className="form-control" defaultValue={this.state.name} required onChange={e => this.setState({ name: e.target.value })} />
                                              </div>
                                              
                                              <div className="col-md-6">
                                                    <br/>
                                                    <label>Status</label>
                                                    <select id="status" className="form-control col-md-6" required ref="status">
                                                        <option value="active" selected={obj.state.status === "active"}>Active</option>
                                                        <option value="inactive" selected={obj.state.status === "inactive"}>Inactive</option>
                                                    </select>
                                              </div>
                                              
                                                <div className="col-md-6">
                                                    <br/>
                                                    <label>Fees</label>
                                                    <input type="text" className="form-control mobile" defaultValue={this.state.fees} required onChange={e => this.setState({ fees: e.target.value })} />
                                                </div>

                                                <div className="col-md-6">
                                                    <br/>
                                                    <label>Tax %</label>
                                                    <input type="text" className="form-control mobile" defaultValue={this.state.tax_per} required onChange={e => this.setState({ tax_per: e.target.value })} />
                                                </div>

                                              <div className="col-md-6">
                                                    <br/>
                                                    <label>Starting From</label>
                                                    <input type="date" className="form-control" defaultValue={this.state.starting_from} onChange={e => this.setState({ starting_from: e.target.value })} required />
                                              </div>
                                              
                                              <div className="col-md-6">
                                                    <br/>
                                                    <label>Image</label>
                                                    <br/>
                                                    <img src={serverBase_link+"images/"+this.state.image} alt="Main Banner" style={{height: '150px'}} />
                                                    <input id="edit_image" type="file" className="form-control" accept="image/*" onChange={(e) => this.onChange(e) } />
                                              </div>

                                              <div className="col-md-6">
                                                    <br/>
                                                    <label>Sample Video [Optional]</label>
                                                    {
                                                        this.state.sample_video
                                                        ?
                                                        <React.Fragment>
                                                            <br/>
                                                            <video src={serverBase_link+"images/"+this.state.sample_video} alt="Sample Video" style={{height: '150px'}} />
                                                        </React.Fragment>
                                                        :
                                                        ''
                                                    }
                                                    <input type="file" className="form-control" accept="video/*" onChange={(e) => {this.setState({sample_video: e.target.files[0]});} } />
                                                </div>

                                                <div className="col-md-6">
                                                    <br/>
                                                    <label>Schedule PDF [Optional]</label>
                                                    {
                                                        this.state.schedule_pdf
                                                        ?
                                                        <React.Fragment>
                                                            <br/>
                                                            <a href={serverBase_link+"images/"+this.state.sample_video} target="_blank" rel="noreferrer">View/Download</a>
                                                        </React.Fragment>
                                                        :
                                                        ''
                                                    }
                                                    <input type="file" className="form-control" accept=".pdf" onChange={(e) => {this.setState({schedule_pdf: e.target.files[0]});} } />
                                                </div>

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

export {
    Programs,
    AddProgram,
    EditProgram,
    Courses,
    AddCourses,
    EditCourses,
};