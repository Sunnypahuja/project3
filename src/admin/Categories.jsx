import React from 'react';
//import ReactDOM from 'react-dom';
//import { Link } from "react-router-dom";

import axios from 'axios';
import $ from 'jquery';
import { api_link } from './AdminLogin';
import {decode} from 'html-entities';

class Categories extends React.Component{
    state = {
        name: '',
        parent: '',
        sort_order: '',
        image: '',
        eimage: '',
        eid: '',
        status: '',
        refresh: false,
        modalVisible: false,
        editModalVisible: false,
        doingModal: false,
        categories: []
    }

    constructor() {     
        super();
        this.state = {
          modalVisible: false,
          doingModal: false,
          editModalVisible: false,
          categories: [],
        };
        
        this.childKey = 0;
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
      }

    onChange(e) {
        this.setState({
            image: e.target.files[0]
        });
    }

    openModal() {
        this.setState({
          doingModal: true,
          modalVisible: !this.state.modalVisible
        });
      }

    openEditModal = qid  => e => {
      
          this.setState({
            doingModal: true,
            editModalVisible: !this.state.editModalVisible,
            name: $("#name"+qid).html(),
            old_name: $("#name"+qid).html(),
            eimage: $("#image"+qid).val(),
            image: '',
            sort_order: $("#sort_order"+qid).html(),
            status: $("#status"+qid).html(),
            eid: qid,
          })
        
          $("#edit_image").val("")
          $("#estatus option").attr("selected",false)
          $("#estatus option[value='"+$("#status"+qid).html()+"']").attr("selected",true)
      }
    
    closeModal() {
        this.setState({
          doingModal: true,
          editModalVisible: !this.state.editModalVisible
        });
      }

    componentDidMount() {
        document.title="Categories"
        const url = api_link+'CategoriesFetch.php'
        axios.get(url).then(response => response.data)
        .then((data) => {
          this.setState({ categories: data })
//			  console.log(this.state.questions)
            $("script[src='js/dataTable.js']").remove();
            const script = document.createElement("script");

            script.src = "js/dataTable.js";
            script.async = true;

            document.body.appendChild(script);
         })
         let formData3 = new FormData();
        formData3.append('fetch_allproducts', "all")
        
        
            
    }

    shouldComponentUpdate(nextProps,nextState){
      if(JSON.stringify(this.state.categories) === JSON.stringify(nextState.categories))
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

    handleAddFormSubmit( event ) {
		event.preventDefault();
		$("#invalid_message").hide();
//        $(".loader_gif").show();
        let reader = new FileReader()
        reader.readAsDataURL(this.state.image)
        reader.onload=(e)=>{
            
            let formData = new FormData();
            formData.append('name', this.state.name)
            formData.append('add', 'yes')
            formData.append('sort_order', this.state.sort_order)
            formData.append('status', this.refs.c_status.value)
            formData.append('image', this.state.image)

            var obj=this

            axios({
                method: 'post',
                url: api_link+'CategoriesManagement.php',
                data: formData,
                config: { headers: {'Content-Type': 'multipart/form-data' }}
            })
            .then(function (response) {
                //handle success
                document.getElementById("addCategory").reset();
                obj.openModal()
                if(response.data === "ok")
                {	
                    const url = api_link+'CategoriesFetch.php'
                    axios.get(url).then(response => response.data)
                    .then((data) => {
                      obj.setState({ doingModal:false,categories: data})
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
                 setTimeout(function(){ $("#update_message").hide();; }, 4000);


            })
            .catch(function (response) {
                //handle error
                $(".loader_gif").fadeOut("slow");
                console.log(response)
            });
        }
	}

    handleEditFormSubmit( event ) {
		event.preventDefault();
		$("#invalid_message").hide();

        if( document.getElementById("edit_image").files.length === 0 ){
            let formData = new FormData();
            formData.append('edit', this.state.eid)
            formData.append('name', this.state.name)
            formData.append('old_name', this.state.old_name)
            formData.append('sort_order', this.state.sort_order)
            formData.append('status', this.refs.e_status.value)
            
            var obj=this

            axios({
                method: 'post',
                url: api_link+'CategoriesManagement.php',
                data: formData,
                config: { headers: {'Content-Type': 'multipart/form-data' }}
            })
            .then(function (response) {
                //handle success
                document.getElementById("editCategory").reset();
                obj.closeModal()
                if(response.data === "ok")
                {	
                    const url = api_link+'CategoriesFetch.php'
                    axios.get(url).then(response => response.data)
                    .then((data) => {
                      obj.setState({ doingModal: false, categories: data})
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
    //			alert(JSON.stringify(response));
                $(".loader_gif").fadeOut("slow");
                console.log(response)
            });
        }
        else
        {
            let reader = new FileReader()
            reader.readAsDataURL(this.state.image)
            reader.onload=(e)=>{
                let formData = new FormData();
                formData.append('edit', this.state.eid)
                formData.append('name', this.state.name)
                formData.append('old_name', this.state.old_name)
                formData.append('sort_order', this.state.sort_order)
                formData.append('parent', this.refs.parent.value)
                formData.append('image', this.state.image)

                var obj=this

                axios({
                    method: 'post',
                    url: api_link+'CategoriesManagement.php',
                    data: formData,
                    config: { headers: {'Content-Type': 'multipart/form-data' }}
                })
                .then(function (response) {
                    //handle success

                    document.getElementById("editCategory").reset();
                    obj.closeModal()
                    if(response.data === "ok")
                    {	
                        const url = api_link+'CategoriesFetch.php'
                        axios.get(url).then(response => response.data)
                        .then((data) => {
                          obj.setState({ doingModal:false,categories: data})
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
                     setTimeout(function(){ $("#update_message").hide();; }, 4000);


                })
                .catch(function (response) {
                    //handle error
        //			alert(JSON.stringify(response));
                    console.log(response)
                });
            }
        }
		
	}
    

    render()
    {
        let styles = this.state.modalVisible
          ? { display: "block", overflow: 'auto' }
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
                    <section>
                        <div id="update_message" className="alert" style={{display: 'none'}}></div> 
                    </section>
                    <section className="content-header">
                          <h1>Categories</h1>
                          <ol className="breadcrumb">
                              <li>
                                  <div className="pull-right"> 
                                      <button title="" className="btn btn-primary" onClick={this.openModal}>
                                            <i className="fa fa-plus"></i>
                                      </button>
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
                                      <th>Sort Order</th>
                                      <th>Status</th>
                                      <th>Action</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                      {this.state.categories.map((category, key) => (
                                      <tr key={category.id}>
                                          <td>
                                            <img height="117px" alt="category_image" src={"/images/"+category.image}/>
                                            <input type="hidden" id={'image'+category.id} value={"/images/"+category.image} />
                                            <span style={{display: 'none'}} id={'parent'+category.id}>{decode(category.parent)}</span>
                                          </td>
                                          <td id={'name'+category.id}>{category.name}</td>
                                          <td id={'sort_order'+category.id}>{category.sort_order}</td>
                                          <td id={'status'+category.id}>{category.status}</td>
                                          <td>
                                              <button type="button" name="edit" className="btn btn-success" value={category.id} onClick={this.openEditModal(category.id)} ><i className="fa fa-edit"></i> Edit</button>
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
                
                <div className={'modal '+modalFade} id="add_modal" style={styles}>
                      <div className="modal-dialog">
                        <div className="modal-content">
                         <div className="modal-header">
                            <button type="button" className="close" onClick={this.openModal}>
                              <span aria-hidden="true">&times;</span>
                            </button>
                            <h4 className="modal-title">Add Category</h4>
                          </div> 
                          <form id="addCategory" onSubmit={this.handleAddFormSubmit.bind(this)}>
                          <div className="modal-body">
                              <div className="row">
                                  <div className="col-md-6">
                                      <label>Name</label>
                                        <input type="text" className="form-control" id="name" name="name" required onChange={e => this.setState({ name: e.target.value })} />
                                  </div>
                                  <div className="col-md-6">
                                        <label>Status</label>
                                        <select className="form-control" name="status" id="status" required ref="c_status" >
                                            <option value="Active">Active</option>
                                            <option value="Block">Block</option>
                                        </select>
                                  </div>
                                 
                                  <div className="col-md-6">
                                        <br/>
                                        <label>Sort Order</label>
                                        <input type="number" className="form-control" id="sort_order" name="sort_order" required onChange={e => this.setState({ sort_order: e.target.value })} />
                                  </div>
                                  <div className="col-md-6">
                                        <br/>
                                        <label>Image (Recommended - 1:1)</label>
                                        <input type="file" accept="image/*" required onChange={(e) => this.onChange(e) } />
                                  </div>
                              </div>
                              <br/>
                             </div>
                          <div className="modal-footer">
                            <button type="button" className="btn btn-default pull-left" onClick={this.openModal}>Close</button>
                            <button type="submit" name="add" className="btn btn-primary">Add Data</button>
                          </div>
                            </form>
                              </div>
                        </div>
                      </div>
                
                <div className={'modal '+emodalFade} id="edit_modal"  style={estyles}>
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <button type="button" className="close"  onClick={this.closeModal}>
                          <span aria-hidden="true">&times;</span>
                        </button>
                        <h4 className="modal-title">Edit Category</h4>
                      </div>
                      <form id="editCategory" onSubmit={this.handleEditFormSubmit.bind(this)}>
                      <div className="modal-body">
                          <div className="row">
                                  <div className="col-md-12">
                                      <label>Name</label>
                                        <input type="text" className="form-control" id="ename" name="ename" defaultValue={this.state.name} required onChange={e => this.setState({ name: e.target.value })} />
                                  </div>
                                  <div className="col-md-6">
                                        <br/><label>Status</label>
                                        <select className="form-control" name="estatus" id="estatus" required ref="e_status" defaultValue={this.state.status}>
                                            <option value="Active">Active</option>
                                            <option value="Block">Block</option>
                                        </select>
                                  </div>
                                  <div className="col-md-6">
                                        <br/>
                                        <label>Sort Order</label>
                                        <input type="number" className="form-control" id="esort_order" name="esort_order" value={this.state.sort_order} required onChange={e => this.setState({ sort_order: e.target.value })} />
                                  </div>
                                  <div className="col-md-6">
                                        <br/>
                                        <img id="eimage" alt="category_image" width="170px" src={this.state.eimage}/>
                                  </div>
                                  <div className="col-md-6">
                                        <br/>
                                        <label>Image (Recommended - 1:1)</label>
                                        <input type="file" id="edit_image" accept="image/*" onChange={(e) => this.onChange(e) } />
                                        <input type="hidden" id="old_name" value={this.state.old_name} />
                                  </div>
                              </div>
                          <br/>
                         </div>
                      <div className="modal-footer">
                        <button type="button" className="btn btn-default pull-left" onClick={this.closeModal}>Close</button>
                        <button type="submit" name="edit" className="btn btn-primary">Edit Data</button>
                      </div>
                        </form>
                          </div>
                    </div>
                  </div>
            </React.Fragment>
        );
    }
}

class StudyMaterial extends React.Component{
    constructor() {
        super();
        this.state = {
            sort_order: '',
            file: '',
            title: '',   
            tag:'',       
            refresh: false,
            modalVisible: false,
            doingModal: false,
            media: [],
            choice:'',
            type: '',
            products: [],
            filterProducts: [],
        };
        
        this.childKey = 0;
        this.openModal = this.openModal.bind(this);
    }

    onChange(e) {
        this.setState({
            file: e.target.files[0]
        });
    }

    openModal() {
        this.setState({
          doingModal: true,
          modalVisible: !this.state.modalVisible
        });
      }

    componentDidMount() {
        document.title="Study Material" 
        
        let formData = new FormData();
        formData.append('study_material', "1")

        var obj=this
        
        axios({
            method: 'post',
            url: api_link+'CategoriesFetch.php',
            data: formData,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
        .then(response => response.data)
        .then((data) => {
            obj.setState({ media: data})
            $("script[src='js/dataTable.js']").remove();
                
            const script = document.createElement("script");
            script.src = "js/dataTable.js";
            script.async = true;
            document.body.appendChild(script);
         })  
        
         let formData3 = new FormData();
            formData3.append('fetch_allproducts', "all")
            
            axios({
                    method: 'post',
                    url: api_link+'ProgramsFetch.php',
                    data: formData3,
                    config: { headers: {'Content-Type': 'multipart/form-data' }}
            }).then(response => response.data)
            
            .then((data) => {
                console.log(data.data);
                this.setState({ products: data.data})
                $("script[src='js/dataTable.js']").remove();
                const script = document.createElement("script");

                script.src = "js/dataTable.js";
                script.async = true;

                document.body.appendChild(script);
        }) 

    }

    shouldComponentUpdate(nextProps,nextState){
        if(JSON.stringify(this.state.media) === JSON.stringify(nextState.media))
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

    handleAddFormSubmit( event ) {
		event.preventDefault();
		$("#invalid_message").hide();
        let reader = new FileReader()
        reader.readAsDataURL(this.state.file)
        reader.onload=(e)=>{
            let formData = new FormData();
            formData.append('add_study', 'yes')
            formData.append('sort_order', this.state.sort_order)
            formData.append('file', this.state.file)
            formData.append('title', this.state.title)
            formData.append('tag', this.state.tag)
            formData.append('choice', this.state.choice)
            formData.append('type', this.state.type)
            formData.append('status', $("#add_status").val())
            

            var obj=this

            axios({
                method: 'post',
                url: api_link+'CategoriesManagement.php',
                data: formData,
                config: { headers: {'Content-Type': 'multipart/form-data' }}
            })
            .then(function (response) {
                
                obj.openModal()
                if(response.data === "ok")
                {	
                    document.getElementById("addStudy").reset();
                    let formData1 = new FormData();
                    formData1.append('study_material', "1")
                    
                    axios({
                        method: 'post',
                        url: api_link+'CategoriesFetch.php',
                        data: formData1,
                        config: { headers: {'Content-Type': 'multipart/form-data' }}
                    })
                    .then(response => response.data)
                    .then((data) => {
                        obj.setState({ media: data})
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
                 setTimeout(function(){ $("#update_message").hide();; }, 4000);


            })
            .catch(function (response) {
                //handle error
                $(".loader_gif").fadeOut("slow");
            });
        }
	}

    deleteCategory = qid  => e => {
      
          if(window.confirm("Are You Sure To Delete This Study Material?")) 
          {
              let formData = new FormData();
              formData.append('delete_study', qid)
              var obj=this

              axios({
                  method: 'post',
                  url: api_link+'CategoriesManagement.php',
                  data: formData,
                  config: { headers: {'Content-Type': 'multipart/form-data' }}
              })
              .then(function (response) {
                  //handle success
                  if(response.data === "ok")
                  {	
                        let formData1 = new FormData();
                        formData1.append('study_material', "1")

                        axios({
                            method: 'post',
                            url: api_link+'CategoriesFetch.php',
                            data: formData1,
                            config: { headers: {'Content-Type': 'multipart/form-data' }}
                        })
                        .then(response => response.data)
                        .then((data) => {
                            obj.setState({ media: data})
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
              });
          }
      }
    
    changeStatus = qid  => e => {
      
          if(window.confirm("Are You Sure To Change The Status?")) 
          {
              let formData = new FormData();
              formData.append('status_study', qid)
              var obj=this

              axios({
                  method: 'post',
                  url: api_link+'CategoriesManagement.php',
                  data: formData,
                  config: { headers: {'Content-Type': 'multipart/form-data' }}
              })
              .then(function (response) {
                  //handle success
                  if(response.data === "ok")
                  {	
                        let formData1 = new FormData();
                        formData1.append('study_material', "1")

                        axios({
                            method: 'post',
                            url: api_link+'CategoriesFetch.php',
                            data: formData1,
                            config: { headers: {'Content-Type': 'multipart/form-data' }}
                        })
                        .then(response => response.data)
                        .then((data) => {
                            obj.setState({ media: data})
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
              });
          }
      }


    selectValues=(type)=>
    {
        console.log(type)
        if(type=="course")
        {$("#c").show();
        $("#choice").prop('required',true);
            this.setState({filterProducts: this.state.products.filter((m) =>m.type=='course') })
                
        }
        else if(type=="program")
        {$("#c").show();
        $("#choice").prop('required',true);

            this.setState({filterProducts: this.state.products.filter((m) =>m.type=='program') })
            
        }
        else if(type=="free")
        {
            $("#c").hide();
            $("#choice").removeAttr("required");
        }
    }
    handleChange=(e)=>
    {
        this.setState({type: e.target.value})
        this.selectValues(e.target.value)
    }
    
    render()
    {
        console.log(this.state.products)
        let styles = this.state.modalVisible
          ? { display: "block" }
          : { display: "none" };
        let modalFade = this.state.modalVisible
          ? { fade: "fade" }
          : { fade: "show" };
        
        return(
            <React.Fragment>
                <div className="content-wrapper">
                    <section>
                        <div id="update_message" className="alert" style={{display: 'none'}}></div> 
                    </section>
                    <section className="content-header">
                          <h1>Study Materials</h1>
                          <ol className="breadcrumb">
                              <li>
                                  <div className="pull-right"> 
                                      <button title="" className="btn btn-primary" onClick={this.openModal}>
                                            <i className="fa fa-plus"></i>
                                      </button>
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
                                      <th>File</th>
                                      <th>Title</th>
                                      <th>Paid</th>
                                      <th>Sort Order</th>
                                      <th>Status</th>
                                      <th>Action</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                      {this.state.media.map((m, key) => (
                                      <tr key={m.id}>
                                          <td>
                                            <a href={"/images/"+m.file} target="_blank" rel="noreferrer">{m.file}</a>
                                            <input type="hidden" id={'file'+m.id} value={"/images/"+m.file} />
                                            <input type="hidden" id={'padi'+m.id} value={m.paid} />
                                          </td>
                                          <td id={'title'+m.id}>{m.title}</td>
                                          <td>{m.paid?'Yes':'No'}</td>
                                          <td id={'sort_order'+m.id}>{m.sort_order}</td>
                                          <td id={'status'+m.id}>{m.status.toUpperCase()}</td>
                                          <td>
                                              <button type="submit" name="change_status" className="btn btn-primary" value={m.id} onClick={this.changeStatus(m.id)}>
                                                  Change Status
                                              </button>
                                              <button type="submit" name="del" className="btn btn-danger" value={m.id} onClick={this.deleteCategory(m.id)} style={{marginLeft: '5px'}}><i className="fa fa-trash"></i></button>
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

                <div className={'modal '+modalFade} id="add_modal" style={styles}>
                      <div className="modal-dialog">
                        <div className="modal-content">
                         <div className="modal-header">
                            <button type="button" className="close" onClick={this.openModal}>
                              <span aria-hidden="true">&times;</span>
                            </button>
                            <h4 className="modal-title">Add Study Material</h4>
                          </div> 
                          <form id="addStudy" onSubmit={this.handleAddFormSubmit.bind(this)}>
                          <div className="modal-body">
                              <div className="row">
                                  <div className="col-md-6">
                                        <label>Title</label>
                                        <input type="text" className="form-control" required onChange={e => this.setState({ title: e.target.value })} />
                                  </div>
                                 
                                  <div className="col-md-6">
                                        <label>Type</label>
                                        <select className="form-control" required onChange={this.handleChange}>
                                            <option value="">Select</option>
                                            <option value="course">Course</option>
                                            <option value="program">Program</option>
                                            <option value="free">Free</option>
                                        </select>
                                  </div>
                                       
                                        

                                  
                                    <div className="col-md-6" id="c">
                                            <label>Course/Program</label>
                                            <select className="form-control" id="choice" required onChange={e => this.setState({choice: e.target.value})}>
                                            <option value="">Select</option>
                                            {this.state.filterProducts.map((m, key) => (
                                                <option value={m.id}>{m.name}</option>
                                            ))}
                                            </select>
                                    </div>
                                    
                                    <div className="col-md-6">
                                            <label>Tag(Separated by ,)</label>
                                            <input type="text" className="form-control" required onChange={e => this.setState({ tag: e.target.value })} />
                                    </div>
                                  
                                    <div className="col-md-6">
                                            <br/>
                                            <label>Sort Order</label>
                                            <input type="number" className="form-control" id="sort_order" name="sort_order" required onChange={e => this.setState({ sort_order: e.target.value })} />
                                    </div>
                                    <div className="col-md-6">
                                            <br/>
                                            <label>Status</label>
                                            <select className="form-control" id="add_status" required>
                                                <option value="active">Active</option>
                                                <option value="block">Block</option>
                                            </select>
                                    </div>
                                  
                                  <div className="col-md-6">
                                        
                                        <label>File </label>
                                        <input type="file" className="form-control" accept=".pdf,.doc,.docx" required onChange={(e) => this.onChange(e) } />
                                  </div>
                              </div>
                              <br/>
                             </div>
                          <div className="modal-footer">
                            <button type="button" className="btn btn-default pull-left" onClick={this.openModal}>Close</button>
                            <button type="submit" name="add" className="btn btn-primary">Add Data</button>
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
    Categories,
    StudyMaterial,
};