import React from 'react';

import { api_link } from './AdminLogin';

import axios from 'axios';
import $ from 'jquery';
//import CKEditor from "react-ckeditor-component";

class FeaturedCourses extends React.Component{
    constructor() {
        super();
        this.state = {
            refresh: false,
            modalVisible: false,
            doingModal: false,
            courses: [],
            featuredCourses: [],
        };
        
        this.childKey = 0;
        this.openModal = this.openModal.bind(this);
    }

    openModal() {
        this.setState({
          doingModal: true,
          modalVisible: !this.state.modalVisible
        });
      }

    componentDidMount() {
        document.title="Featured Courses" 
        
        //FETCH ALL PROGRAMS AND COURSES
        let formData = new FormData();
        formData.append('programmes_and_courses', "featured")

        axios({
                method: 'post',
                url: api_link+'ProgramsFetch.php',
                data: formData,
                config: { headers: {'Content-Type': 'multipart/form-data' }}
        }).then(response => response.data)
        .then((data) => {
          this.setState({ courses: data })
        })  

        let formData2 = new FormData();
        formData2.append('featuredCourses', "1")

        var obj=this
        
        axios({
            method: 'post',
            url: api_link+'SetupFetch.php',
            data: formData2,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
        .then(response => response.data)
        .then((data) => {
            obj.setState({ featuredCourses: data.data})
            $("script[src='js/dataTable.js']").remove();
                
            const script = document.createElement("script");
            script.src = "js/dataTable.js";
            script.async = true;
            document.body.appendChild(script);
         })   
    }

    shouldComponentUpdate(nextProps,nextState){
      if(JSON.stringify(this.state.featuredCourses) === JSON.stringify(nextState.featuredCourses))
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
        let formData = new FormData();
        formData.append('add_featured', 'yes')
        formData.append('course_main', this.refs.course_main.value)

        var obj=this

        axios({
            method: 'post',
            url: api_link+'SetupManagement.php',
            data: formData,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
        .then(function (response) {
            //handle success
            document.getElementById("addMedia").reset();
            obj.openModal()
            if(response.data === "ok")
            {	
                let formData1 = new FormData();
                formData1.append('featuredCourses', "1")

                axios({
                    method: 'post',
                    url: api_link+'SetupFetch.php',
                    data: formData1,
                    config: { headers: {'Content-Type': 'multipart/form-data' }}
                })
                .then(response => response.data)
                .then((data) => {
                    obj.setState({ featuredCourses: data.data})
                    $("script[src='js/dataTable.js']").remove();
                        
                    const script = document.createElement("script");
                    script.src = "js/dataTable.js";
                    script.async = true;
                    document.body.appendChild(script);
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
            $("#update_message").html("<strong>Error! </strong> Unable to Process Your Request")
            $("#update_message").removeClass("alert-success").addClass("alert-danger")
            $("#update_message").show()
            setTimeout(function(){ $("#update_message").hide(); }, 4000);
        });
	}

    deleteLink = qid  => e => {
      
          if(window.confirm("Are You Sure To Remove This Featured Course?")) 
          {
              let formData = new FormData();
              formData.append('delete_featured', qid)
              var obj=this

              axios({
                  method: 'post',
                  url: api_link+'SetupManagement.php',
                  data: formData,
                  config: { headers: {'Content-Type': 'multipart/form-data' }}
              })
              .then(function (response) {
                  //handle success
                  if(response.data === "ok")
                  {	
                        let formData1 = new FormData();
                        formData1.append('featuredCourses', "1")

                        axios({
                            method: 'post',
                            url: api_link+'SetupFetch.php',
                            data: formData1,
                            config: { headers: {'Content-Type': 'multipart/form-data' }}
                        })
                        .then(response => response.data)
                        .then((data) => {
                            obj.setState({ featuredCourses: data.data})
                            $("script[src='js/dataTable.js']").remove();
                                
                            const script = document.createElement("script");
                            script.src = "js/dataTable.js";
                            script.async = true;
                            document.body.appendChild(script);
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
                    $("#update_message").html("<strong>Error! </strong> Unable to Process Your Request")
                    $("#update_message").removeClass("alert-success").addClass("alert-danger")
                    $("#update_message").show()
                    setTimeout(function(){ $("#update_message").hide(); }, 4000);
              });
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
        
        return(
            <React.Fragment>
                <div className="content-wrapper">
                    <section>
                        <div id="update_message" className="alert" style={{display: 'none'}}></div> 
                    </section>
                    <section className="content-header">
                          <h1>Featured Courses</h1>
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
                                      <th>Course</th>
                                      <th>Type</th>
                                      <th>Action</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                      {this.state.featuredCourses.map((m, key) => (
                                      <tr key={m.id}>
                                          <td>{m.name}</td>
                                          <td>{m.type}</td>
                                          <td>
                                              <button type="submit" name="del" className="btn btn-danger" value={m.id} onClick={this.deleteLink(m.id)}><i className="fa fa-trash"></i></button>
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
                            <h4 className="modal-title">Add Featured</h4>
                          </div> 
                          <form id="addMedia" onSubmit={this.handleAddFormSubmit.bind(this)}>
                          <div className="modal-body">
                              <div className="row">
                                  <div className="col-md-12">
                                        <label>Courses/Programmes List</label>
                                        <select className="form-control" required ref="course_main">
                                            {
                                                this.state.courses.map((c, key) => (
                                                    <option value={c.id}>{c.name+'['+c.type.toUpperCase()+']'}</option>
                                                ))
                                            }
                                        </select>
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

class FooterLinks extends React.Component{
    constructor() {
        super();
        this.state = {
            refresh: false,
            modalVisible: false,
            doingModal: false,
            drop_data: [],
            data: [],
        };
        
        this.childKey = 0;
        this.openModal = this.openModal.bind(this);
    }

    openModal() {
        this.setState({
          doingModal: true,
          modalVisible: !this.state.modalVisible
        });
      }

    componentDidMount() {
        document.title="Footer Useful Links" 
        
        //FETCH ALL PROGRAMS AND COURSES
        let formData = new FormData();
        formData.append('dynamic_pages_for_footer', "featured")

        axios({
                method: 'post',
                url: api_link+'EditSiteFetch.php',
                data: formData,
                config: { headers: {'Content-Type': 'multipart/form-data' }}
        }).then(response => response.data)
        .then((data) => {
          this.setState({ drop_data: data })
        })  

        let formData2 = new FormData();
        formData2.append('footer_links', "1")

        var obj=this
        
        axios({
            method: 'post',
            url: api_link+'SetupFetch.php',
            data: formData2,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
        .then(response => response.data)
        .then((data) => {
            obj.setState({ data: data.data})
            $("script[src='js/dataTable.js']").remove();
                
            const script = document.createElement("script");
            script.src = "js/dataTable.js";
            script.async = true;
            document.body.appendChild(script);
         })   
    }

    shouldComponentUpdate(nextProps,nextState){
      if(JSON.stringify(this.state.data) === JSON.stringify(nextState.data))
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
        let formData = new FormData();
        formData.append('add_footer_link', 'yes')
        formData.append('course_main', this.refs.course_main.value)

        var obj=this

        axios({
            method: 'post',
            url: api_link+'SetupManagement.php',
            data: formData,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
        .then(function (response) {
            //handle success
            document.getElementById("addMedia").reset();
            obj.openModal()
            if(response.data === "ok")
            {	
                let formData1 = new FormData();
                formData1.append('footer_links', "1")

                axios({
                    method: 'post',
                    url: api_link+'SetupFetch.php',
                    data: formData1,
                    config: { headers: {'Content-Type': 'multipart/form-data' }}
                })
                .then(response => response.data)
                .then((data) => {
                    obj.setState({ data: data.data})
                    $("script[src='js/dataTable.js']").remove();
                        
                    const script = document.createElement("script");
                    script.src = "js/dataTable.js";
                    script.async = true;
                    document.body.appendChild(script);
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
            $("#update_message").html("<strong>Error! </strong> Unable to Process Your Request")
            $("#update_message").removeClass("alert-success").addClass("alert-danger")
            $("#update_message").show()
            setTimeout(function(){ $("#update_message").hide(); }, 4000);
        });
	}

    deleteLink = qid  => e => {
      
          if(window.confirm("Are You Sure To Remove This Footer Link?")) 
          {
              let formData = new FormData();
              formData.append('delete_footer', qid)
              var obj=this

              axios({
                  method: 'post',
                  url: api_link+'SetupManagement.php',
                  data: formData,
                  config: { headers: {'Content-Type': 'multipart/form-data' }}
              })
              .then(function (response) {
                  //handle success
                  if(response.data === "ok")
                  {	
                        let formData1 = new FormData();
                        formData1.append('footer_links', "1")

                        axios({
                            method: 'post',
                            url: api_link+'SetupFetch.php',
                            data: formData1,
                            config: { headers: {'Content-Type': 'multipart/form-data' }}
                        })
                        .then(response => response.data)
                        .then((data) => {
                            obj.setState({ data: data.data})
                            $("script[src='js/dataTable.js']").remove();
                                
                            const script = document.createElement("script");
                            script.src = "js/dataTable.js";
                            script.async = true;
                            document.body.appendChild(script);
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
                    $("#update_message").html("<strong>Error! </strong> Unable to Process Your Request")
                    $("#update_message").removeClass("alert-success").addClass("alert-danger")
                    $("#update_message").show()
                    setTimeout(function(){ $("#update_message").hide(); }, 4000);
              });
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
        
        return(
            <React.Fragment>
                <div className="content-wrapper">
                    <section>
                        <div id="update_message" className="alert" style={{display: 'none'}}></div> 
                    </section>
                    <section className="content-header">
                          <h1>Footer Links</h1>
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
                                      <th>Page Name</th>
                                      <th>Action</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                      {this.state.data?
                                       (
                                           this.state.data.map((m, key) => (
                                      <tr key={m.id}>
                                          <td>{m.title}</td>
                                          <td>
                                              <button type="submit" name="del" className="btn btn-danger" value={m.id} onClick={this.deleteLink(m.id)}><i className="fa fa-trash"></i></button>
                                          </td>
                                        </tr>
                                      ))):(null)}
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
                            <h4 className="modal-title">Add Link</h4>
                          </div> 
                          <form id="addMedia" onSubmit={this.handleAddFormSubmit.bind(this)}>
                          <div className="modal-body">
                              <div className="row">
                                  <div className="col-md-12">
                                        <label>Page Titles</label>
                                        <select className="form-control" required ref="course_main">
                                            {
                                                this.state.drop_data.map((c, key) => (
                                                    <option value={c.id}>{c.title}</option>
                                                ))
                                            }
                                        </select>
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

class Reviews extends React.Component{
    constructor() {
        super();
        this.state = {
            name: '',
            title:'',
            description: '',
            image: '',
            refresh: false,
            modalVisible: false,
            doingModal: false,
            sliders: []
        };
        
        this.childKey = 0;
        this.openModal = this.openModal.bind(this);
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

    componentDidMount() {
        document.title="Reviews Setup" 
        
        let formData = new FormData();
        formData.append('reviews', "1")

        var obj=this
        
        axios({
            method: 'post',
            url: api_link+'SetupFetch.php',
            data: formData,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
        .then(response => response.data)
        .then((data) => {
            obj.setState({ sliders: data.data})
            $("script[src='js/dataTable.js']").remove();
                
            const script = document.createElement("script");
            script.src = "js/dataTable.js";
            script.async = true;
            document.body.appendChild(script);
         })   
    }

    shouldComponentUpdate(nextProps,nextState){
      if(JSON.stringify(this.state.sliders) === JSON.stringify(nextState.sliders))
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
        reader.readAsDataURL(this.state.image)
        reader.onload=(e)=>{
            let formData = new FormData();
            formData.append('add_review', 'yes')
            formData.append('name', this.state.name)
            formData.append('title', this.state.title)
            formData.append('description', this.state.description)
            formData.append('image', this.state.image)

            var obj=this

            axios({
                method: 'post',
                url: api_link+'SetupManagement.php',
                data: formData,
                config: { headers: {'Content-Type': 'multipart/form-data' }}
            })
            .then(function (response) {
                //handle success
                document.getElementById("addSlider").reset();
                obj.openModal()
                if(response.data === "ok")
                {	
                    let formData1 = new FormData();
                    formData1.append('reviews', "1")
                    
                    axios({
                        method: 'post',
                        url: api_link+'SetupFetch.php',
                        data: formData1,
                        config: { headers: {'Content-Type': 'multipart/form-data' }}
                    })
                    .then(response => response.data)
                    .then((data) => {
                        obj.setState({ sliders: data.data})
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
                $("#update_message").html("<strong>Error! </strong> Unable to Process Your Request")
                $("#update_message").removeClass("alert-success").addClass("alert-danger")
                $("#update_message").show()
                setTimeout(function(){ $("#update_message").hide();; }, 4000);
            });
        }
	}

    deleteCategory = qid  => e => {
      
          if(window.confirm("Are You Sure To Delete This Review?")) 
          {
              let formData = new FormData();
              formData.append('delete_review', qid)
              var obj=this

              axios({
                  method: 'post',
                  url: api_link+'SetupManagement.php',
                  data: formData,
                  config: { headers: {'Content-Type': 'multipart/form-data' }}
              })
              .then(function (response) {
                  //handle success
                  if(response.data === "ok")
                  {	
                        let formData1 = new FormData();
                        formData1.append('reviews', "1")

                        axios({
                            method: 'post',
                            url: api_link+'SetupFetch.php',
                            data: formData1,
                            config: { headers: {'Content-Type': 'multipart/form-data' }}
                        })
                        .then(response => response.data)
                        .then((data) => {
                            obj.setState({ sliders: data.data})
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
    
    render()
    {
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
                          <h1>Topper Reviews</h1>
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
                                      <th>Title</th>
                                      <th>Comment</th>
                                      <th>Action</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                      {this.state.sliders.map((slider, key) => (
                                      <tr key={slider.id}>
                                          <td>
                                            <img height="117px" alt="slider" src={"/images/"+slider.image}/>
                                            <input type="hidden" id={'image'+slider.id} value={"/images/"+slider.image} />
                                          </td>
                                          <td id={'name'+slider.id}>{slider.name}</td>
                                          <td id={'title'+slider.id}>{slider.title}</td>
                                          <td id={'comment'+slider.id}>{slider.description}</td>
                                          <td>
                                              <button type="submit" name="del" className="btn btn-danger" value={slider.id} onClick={this.deleteCategory(slider.id)}><i className="fa fa-trash"></i></button>
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
                            <h4 className="modal-title">Add Review</h4>
                          </div> 
                          <form id="addSlider" onSubmit={this.handleAddFormSubmit.bind(this)}>
                          <div className="modal-body">
                              <div className="row">
                                    <div className="col-md-12">
                                        <label>Name</label>
                                        <input type="text" className="form-control" required onChange={e => this.setState({ name: e.target.value })} />
                                  </div>

                                  <div className="col-md-6">
                                        <br/>
                                        <label>Title</label>
                                        <input type="text" className="form-control" required onChange={e => this.setState({ title: e.target.value })} />
                                  </div>

                                  <div className="col-md-6">
                                        <br/>
                                        <label>Image (Recommended - 1:1)</label>
                                        <input type="file" accept="image/*" required onChange={(e) => this.onChange(e) } />
                                  </div>

                                  <div className="col-md-12">
                                    <br/>
                                    <label>Comment</label>
                                    <textarea rows="" className="form-control" required onChange={e => this.setState({ description: e.target.value })} />
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

class WhyUs extends React.Component{
    constructor() {
        super();
        this.state = {
            refresh: false,
            modalVisible: false,
            editModalVisible: false,
            doingModal: false,
            title: '',
            description: '',
            sort_order: '',
            faqs: []
        };
        
        this.childKey = 0;
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    openModal() {
        this.setState({
          doingModal: true,
          modalVisible: !this.state.modalVisible
        });
      }

    componentDidMount() {
        document.title="Why Us?" 
        
        let formData = new FormData();
        formData.append('why_us', "all")

        var obj=this
        
        axios({
            method: 'post',
            url: api_link+'SetupFetch.php',
            data: formData,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
        .then(response => response.data)
        .then((data) => {
            obj.setState({ faqs: data.data})
            $("script[src='js/dataTable.js']").remove();
                
            const script = document.createElement("script");
            script.src = "js/dataTable.js";
            script.async = true;
            document.body.appendChild(script);
         })   
    }

    shouldComponentUpdate(nextProps,nextState){
      if(JSON.stringify(this.state.faqs) === JSON.stringify(nextState.faqs))
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
        let formData = new FormData();
        formData.append('add_why', 'yes')
        formData.append('head', this.state.title)
        formData.append('description', this.state.description)
        formData.append('sort_order', this.state.sort_order)

        var obj=this

        axios({
            method: 'post',
            url: api_link+'SetupManagement.php',
            data: formData,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
        .then(function (response) {
            //handle success
            document.getElementById("addFaq").reset();
            obj.openModal()
            if(response.data === "ok")
            {	
                let formData1 = new FormData();
                formData1.append('why_us', "all")

                axios({
                    method: 'post',
                    url: api_link+'SetupFetch.php',
                    data: formData1,
                    config: { headers: {'Content-Type': 'multipart/form-data' }}
                })
                .then(response => response.data)
                .then((data) => {
                    obj.setState({ faqs: data.data})
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
            console.log(response);
        });
	}
    
    handleEditFormSubmit( event ) {
		event.preventDefault();
		$("#invalid_message").hide();

        let formData = new FormData();
        formData.append('edit_why', this.state.eid)
        formData.append('head', this.state.title)
        formData.append('description', this.state.description)
        formData.append('sort_order', this.state.sort_order)
        
        var obj=this

        axios({
            method: 'post',
            url: api_link+'SetupManagement.php',
            data: formData,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
        .then(function (response) {
            //handle success
//                $(".loader_gif").hide();
            document.getElementById("editFaq").reset();
            obj.closeModal()
            if(response.data === "ok")
            {	
                let formData1 = new FormData();
                formData1.append('why_us', "all")

                axios({
                    method: 'post',
                    url: api_link+'SetupFetch.php',
                    data: formData1,
                    config: { headers: {'Content-Type': 'multipart/form-data' }}
                })
                .then(response => response.data)
                .then((data) => {
                    obj.setState({ faqs: data.data})
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

    deleteLink = qid  => e => {
      
          var obj=this
          if(window.confirm("Are You Sure To Delete?")) 
          {
              let formData = new FormData();
              formData.append('delete_why', qid)              

              axios({
                  method: 'post',
                  url: api_link+'SetupManagement.php',
                  data: formData,
                  config: { headers: {'Content-Type': 'multipart/form-data' }}
              })
              .then(function (response) {
                  //handle success
                  if(response.data === "ok")
                  {	
                        let formData1 = new FormData();
                        formData1.append('why_us', "all")

                        axios({
                            method: 'post',
                            url: api_link+'SetupFetch.php',
                            data: formData1,
                            config: { headers: {'Content-Type': 'multipart/form-data' }}
                        })
                        .then(response => response.data)
                        .then((data) => {
                            obj.setState({ faqs: data.data})
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
    
    openEditModal = qid  => e => {
          this.setState({
            doingModal: true,
            editModalVisible: !this.state.editModalVisible,
            title: $("#title"+qid).html(),
            description: $("#description"+qid).html(),
            sort_order: $("#sort_order"+qid).html(),
            eid: qid
          })        
      }
    
    closeModal() {
        this.setState({
          doingModal: true,
          editModalVisible: !this.state.editModalVisible
        });
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
                    <section>
                        <div id="update_message" className="alert" style={{display: 'none'}}></div> 
                    </section>
                    <section className="content-header">
                          <h1>Why Us?</h1>
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
                                      <th>Title</th>
                                      <th>Description</th>
                                      <th>Sort Order</th>
                                      <th>Action</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                      {this.state.faqs.map((m, key) => (
                                      <tr key={m.id}>
                                          <td id={'title'+m.id}>{m.title}</td>
                                          <td id={'description'+m.id}>{m.description}</td>
                                          <td id={'sort_order'+m.id}>{m.sort_order}</td>
                                          <td>
                                              <button type="button" name="edit" className="btn btn-success" value={m.id} onClick={this.openEditModal(m.id)} ><i className="fa fa-edit"></i> Edit</button>
                                              <button type="submit" name="del" className="btn btn-danger" value={m.id} onClick={this.deleteLink(m.id)}><i className="fa fa-trash"></i></button>
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
                            <h4 className="modal-title">Add</h4>
                          </div> 
                          <form id="addFaq" onSubmit={this.handleAddFormSubmit.bind(this)}>
                          <div className="modal-body">
                              <div className="row">
                                  <div className="col-md-12">
                                    <label>Title</label>
                                    <input type="text" className="form-control" required onChange={e => this.setState({ title: e.target.value })} />
                                  </div>
                                  <div className="col-md-12">
                                    <br/>
                                    <label>Sort Order</label>
                                    <input type="number" className="form-control" required onChange={e => this.setState({ sort_order: e.target.value })} />
                                  </div>
                                  <div className="col-md-12">
                                        <br/>
                                        <label>Description</label>
                                        <textarea className="form-control" required onChange={e => this.setState({ description: e.target.value })} />
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
                        <h4 className="modal-title">Edit FAQ</h4>
                      </div>
                      <form id="editFaq" onSubmit={this.handleEditFormSubmit.bind(this)}>
                      <div className="modal-body">
                          <div className="row">
                                  <div className="col-md-12">
                                      <label>Title</label>
                                        <input type="text" className="form-control" id="ehead" name="ehead" defaultValue={this.state.title} required onChange={e => this.setState({ title: e.target.value })} />
                                  </div>
                                  <div className="col-md-12">
                                    <br/>
                                    <label>Sort Order</label>
                                    <input type="number" className="form-control" id="esort" defaultValue={this.state.sort_order} required onChange={e => this.setState({ sort_order: e.target.value })} />
                                  </div>
                                    <div className="col-md-12">
                                        <br/>
                                      <label>Description</label>
                                        <textarea className="form-control" id="description" name="description" defaultValue={this.state.description} required onChange={e => this.setState({ description: e.target.value })} />
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

export {
    FeaturedCourses,
    Reviews,
    FooterLinks,
    WhyUs,
};