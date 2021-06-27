import React from 'react';

import { api_link } from './AdminLogin';

import axios from 'axios';
import $ from 'jquery';
import CKEditor from "react-ckeditor-component";

import MUIDataTable from "mui-datatables";

class DynamicPages extends React.Component{

    constructor(props) {
        super();
        this.state = {
            page_data: '',
            page_link: '',
            page_title: '',
            page_parent: '',
            eid: '',
            refresh: false,
            modalVisible: false,
            editModalVisible: false,
            doingModal: false,
            pages: [],
            mediaFiles: [],
            uploadMedias: [],
        }
        
        this.childKey = 0;    
        this.openModal = this.openModal.bind(this);
        this.openEditModal = this.openEditModal.bind(this);
    }
    
    componentDidMount() {
        
        let formData = new FormData();
        formData.append('dynamic_pages', "1")

        var obj=this
        
        axios({
            method: 'post',
            url: api_link+'EditSiteFetch.php',
            data: formData,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
        .then(response => response.data)
        .then((data) => {
            obj.setState({ pages: data})
         })

        let formData2 = new FormData();
        formData2.append('media_files', "1")

        axios({
            method: 'post',
            url: api_link+'EditSiteFetch.php',
            data: formData2,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
        .then(response => response.data)
        .then((data) => {
            obj.setState({ mediaFiles: data})
        })  
    }
    
    shouldComponentUpdate(nextProps,nextState){
          if(JSON.stringify(this.state.pages) === JSON.stringify(nextState.pages) || JSON.stringify(this.state.mediaFiles) === JSON.stringify(nextState.mediaFiles))
          {
                return true;
          }
          else 
          {
                if(this.state.refresh)
                {
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
    
    onChange(e) {
        var id=e.target.value;
        
        if(id === "None")
        {
            this.setState({ 
                page_link: '',
                page_data: '',
                eid:'',
            })
            
            $("#page_link").attr("disabled",true)
            $("#delete").hide()

            $("#page_parent option").attr("selected", false)
            $("#page_status option").attr("selected", false)

            $("#page_status option:first").attr("selected", true);
            $("#page_parent option:first").attr("selected", true);

            $("#page_parent").attr("disabled", true)
            $("#page_status").attr("disabled", true)
        }
        else
        {
            let formData = new FormData();
            formData.append('get_page_data', id)

            var obj=this
            axios({
                method: 'post',
                url: api_link+'EditSiteFetch.php',
                data: formData,
                config: { headers: {'Content-Type': 'multipart/form-data' }}
            })
            .then(response => response.data)
            .then((data) => {
                obj.setState({ 
                    page_link: data['page_name'],
                    page_data: data['page_data'],
                    eid: id,
                    page_parent: data['parent_id'],
                })

                $("#page_parent").attr("disabled", false)
                $("#page_status").attr("disabled", false)
                $("#page_parent option").attr("selected", false)
                $("#page_status option").attr("selected", false)

                $("#page_status option[value='"+data['status']+"']").attr("selected", true);

                if(data['parent_id'])
                {
                    $("#page_parent option[value='"+data['parent_id']+"']").attr("selected", true);
                }
                else
                {
                    $("#page_parent option").eq(0).attr("selected", true);
                }
            })
            $("#page_link").attr("disabled",false)
            $("#delete").show()
        }
    }

    fileSelectedHandler = (e) => {
        this.setState({ uploadMedias: [...this.state.uploadMedias, ...e.target.files] })
    }
    
    openModal() {
        this.setState({
          doingModal: true,
          modalVisible: !this.state.modalVisible
        });
      }

    openEditModal() {
        this.setState({
          doingModal: true,
          editModalVisible: !this.state.editModalVisible
        });
    }   

    handleEditFormSubmit( event ) {
		event.preventDefault();
		$("#invalid_message").hide();
        
        let formData = new FormData();
        formData.append('edit_page', this.state.eid)
        formData.append('page_name', this.state.page_link)
        formData.append('page_data', this.state.page_data)
        formData.append('page_parent', $("#page_parent").val())
        formData.append('page_status', $("#page_status").val())
        formData.append('file[]',this.state.file)
        axios({
            method: 'post',
            url: api_link+'EditSiteManagement.php',
            data: formData,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
        .then(function (response) {
            //handle success
            if(response.data === "ok")
            {	
                $("#update_message").html("<strong>Success! </strong> Your Request Successfully Processed")
                $("#update_message").removeClass("alert-danger").addClass("alert-success")
            }
            else if(response.data === "already")
            {
                $("#update_message").html("<strong>Error! </strong> Page Name Already Exists!")
                $("#update_message").removeClass("alert-success").addClass("alert-danger")
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
            $(".loader_gif").fadeOut("slow");
        });
		
	}
    
    handleAddFormSubmit( event ) {
		event.preventDefault();
		$("#invalid_message").hide();
        
        let formData = new FormData();
        formData.append('add_page', this.state.eid)
        formData.append('page_name', this.state.page_link)
        formData.append('page_title', this.state.page_title)
        formData.append('file[]',this.state.file)
        var obj=this

        axios({
            method: 'post',
            url: api_link+'EditSiteManagement.php',
            data: formData,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
        .then(function (response) {
            //handle success
            obj.openModal();
            document.getElementById("addPage").reset();
            
            if(response.data === "ok")
            {	
                let formData1 = new FormData();
                formData1.append('dynamic_pages', "1")

                axios({
                    method: 'post',
                    url: api_link+'EditSiteFetch.php',
                    data: formData1,
                    config: { headers: {'Content-Type': 'multipart/form-data' }}
                })
                .then(response => response.data)
                .then((data) => {
                    obj.setState({ 
                        pages: data,
                        page_link: '',
                        page_data: ''
                    })
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
            $(".loader_gif").fadeOut("slow");
        });
		
	}

    handleMediaFormSubmit( event ) {
		event.preventDefault();
		$("#invalid_message").hide();

        $("#upload_media_submit").html("Uploading...").attr("disabled", true);

        let reader = new FileReader()
        reader.readAsDataURL(this.state.uploadMedias[0])
        reader.onload=(e)=>{
            let formData = new FormData();
            formData.append('add_media_file', 'yes')
            this.state.uploadMedias.forEach(file=>{
                formData.append("file[]", file);
            });

            var obj=this

            axios({
                method: 'post',
                url: api_link+'EditSiteManagement.php',
                data: formData,
                config: { headers: {'Content-Type': 'multipart/form-data' }}
            })
            .then(function (response) {
            
                if(response.data === "error")
                {	
                    $("#update_message").html("<strong>Error! </strong> Unable to Process Your Request")
                    $("#update_message").removeClass("alert-success").addClass("alert-danger")
                }
                else
                {
                    $("#upload_media_submit").html("Upload").attr("disabled", false);
                    document.getElementById("addMedia").reset();

                    let formData1 = new FormData();
                    formData1.append('media_files', "1")
                    
                    axios({
                        method: 'post',
                        url: api_link+'EditSiteFetch.php',
                        data: formData1,
                        config: { headers: {'Content-Type': 'multipart/form-data' }}
                    })
                    .then(response => response.data)
                    .then((data) => {
                        obj.setState({ mediaFiles: data})
                     })

                    $("#update_message").html("<strong>Success! </strong> Your Request Successfully Processed")
                    $("#update_message").removeClass("alert-danger").addClass("alert-success")
                }
                
                $("#update_message").show()
                setTimeout(function(){ $("#update_message").hide();; }, 4000);
            })
        }
	}
    
    deletePage(event) {
      
      if(window.confirm("Are You Sure To Delete This Page?")) 
      {
          let formData = new FormData();
          formData.append('delete_page', this.state.eid)
          
          var obj=this

          axios({
              method: 'post',
              url: api_link+'EditSiteManagement.php',
              data: formData,
              config: { headers: {'Content-Type': 'multipart/form-data' }}
          })
          .then(function (response) {
              //handle success
              if(response.data === "ok")
              {	
                    document.getElementById("pageForm").reset()
                    
                    let formData1 = new FormData();
                    formData1.append('dynamic_pages', "1")

                    axios({
                        method: 'post',
                        url: api_link+'EditSiteFetch.php',
                        data: formData1,
                        config: { headers: {'Content-Type': 'multipart/form-data' }}
                    })
                    .then(response => response.data)
                    .then((data) => {
                        obj.setState({ 
                            pages: data,
                            page_link: '',
                            page_data: '',
                        })
                     })

                  $("#page_link").attr("disabled",true)
                  $("#delete").hide()
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

    deleteMedia = qid  => e => {
      
          if(window.confirm("Are You Sure To Delete This Media?")) 
          {
              let formData = new FormData();
              formData.append('delete_media', qid)
              var obj=this

              axios({
                  method: 'post',
                  url: api_link+'EditSiteManagement.php',
                  data: formData,
                  config: { headers: {'Content-Type': 'multipart/form-data' }}
              })
              .then(function (response) {
                  //handle success
                  if(response.data === "ok")
                  {	
                        let formData1 = new FormData();
                        formData1.append('media_files', "1")

                        axios({
                            method: 'post',
                            url: api_link+'EditSiteFetch.php',
                            data: formData1,
                            config: { headers: {'Content-Type': 'multipart/form-data' }}
                        })
                        .then(response => response.data)
                        .then((data) => {
                            obj.setState({ mediaFiles: data})
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

        let estyles = this.state.editModalVisible
          ? { display: "block" }
          : { display: "none" };
        let emodalFade = this.state.editModalVisible
          ? { fade: "fade" }
          : { fade: "show" };
        
        $(function(){
            $('.page-name').keypress(function (e) {
                var regex = new RegExp("^[a-zA-Z-0-9\b]+$");
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
                    <section>
                        <div id="update_message" className="alert" style={{display: 'none'}}></div> 
                    </section>
                    <section className="content-header">
                        <h1>Page Setup
                            <div className="pull-right">
                                <button title="" className="btn btn-danger" onClick={this.openEditModal} style={{marginRight: '7px'}}>
                                    <i className="fa fa-file"></i> View/Upload
                                </button>

                                <button title="" className="btn btn-primary" onClick={this.openModal}>
                                    <i className="fa fa-plus"></i>
                                </button>
                            </div>
                        </h1>
                    </section>

                    <section className="content">
                          <form id="pageForm" method="post" onSubmit={this.handleEditFormSubmit.bind(this)}>
                                <div className="box">
                                  <div className="box-body">
                                    <div className="row container">
                                      <div className="form-group row">
                                        <label className="col-md-2 control-label" style={{textAlign: 'right'}}>Select Page</label>
                                        <div className="col-md-8">
                                          <select className="form-control" id="page" name="page" onChange={(e) => this.onChange(e) }>
                                              <option>None</option>
                                              {this.state.pages.map((page, key) => (
                                                  <option value={page.id} key={key}>{page.title}</option>
                                              ))}
                                          </select>
                                        </div>
                                      </div>

                                      <div className="form-group row">
                                        <label className="col-md-2 control-label" style={{textAlign: 'right'}}>Page Parent</label>
                                        <div className="col-md-8">
                                          <select className="form-control" id="page_parent" name="page_parent" disabled>
                                                <option>None</option>
                                                <option value="prelims">Prelims</option>
                                                <option value="prelims">Prelims</option>
                                                <option value="imp">Important Update</option>
                                                {this.state.pages.map((page, key) => {
                                                    if(page.parent_id)
                                                    {
                                                        return('');
                                                    }
                                                    else
                                                    {
                                                        return(<option value={page.id} key={key}>{page.title}</option>);
                                                    }
                                                })}
                                          </select>
                                        </div>
                                      </div>

                                      <div className="form-group row">
                                        <label className="col-md-2 control-label" style={{textAlign: 'right'}}>Status</label>
                                        <div className="col-md-8">
                                          <select className="form-control" id="page_status" name="page_status" disabled>
                                                <option value="active">Active</option>
                                                <option value="inactive">Inactive</option>
                                          </select>
                                        </div>
                                      </div>

                                      <div className="form-group row">
                                        <label className="col-md-2 control-label" style={{textAlign: 'right'}}>Page Link</label>
                                        <div className="col-md-8">
                                          <input type="text" className="form-control page-name" value={this.state.page_link} onChange={e => this.setState({ page_link: e.target.value })} id="page_link" name="page_link" disabled/>
                                        </div>
                                      </div>
                                      <div className="form-group row">
                                        <label className="col-md-2 control-label" style={{textAlign: 'right'}}>Featured Photo</label>
                                        <div className="col-md-8">
                                          <input type="file" className="form-control page-name" onChange={e => this.setState({ file: e.target.files[0] })} id="file" name="file"/>
                                        </div>
                                      </div>
                                      <div className="form-group row">
                                        <label className="col-md-2 control-label" style={{textAlign: 'right'}}>Page Description</label>
                                        <div className="col-md-8">
                                            <CKEditor content={this.state.page_data} required activeClass="p10" events={{ "change": e => this.setState({ page_data: e.editor.getData() })}}/>
                                        </div>
                                      </div>
                                      <div className="col-md-10">
                                        <div className="form-group">
                                          <br/>
                                          <button type="submit" name="details" id="details" className="btn btn-primary pull-right">Save Changes</button>
                                          <button type="button" id="delete" onClick={(e) => this.deletePage(e)} className="btn btn-danger pull-right" style={{marginRight: '5px', display: 'none'}}>Delete Page Data</button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                          </form>
                     </section>
                </div>
                
                <div className={'modal '+modalFade} id="add_modal" style={styles}>
                  <div className="modal-dialog">
                    <div className="modal-content">
                     <div className="modal-header">
                        <button type="button" className="close" onClick={this.openModal}>
                          <span aria-hidden="true">&times;</span>
                        </button>
                        <h4 className="modal-title">Add New Page</h4>
                      </div> 
                      <form id="addPage" onSubmit={this.handleAddFormSubmit.bind(this)}>
                      <div className="modal-body">
                          <div className="row">
                              <div className="col-md-12">
                                  <label>Page Title</label>
                                    <input type="text" className="form-control" id="name" name="name" required onChange={e => this.setState({ page_title: e.target.value })} onBlur={(e) => {window.showSlug("page_name", e.target.value)}} />
                              </div>
                              <div className="col-md-12">
                                    <br/>
                                    <label>Page URL</label>
                                    <input type="text" className="form-control page-name" id="page_name" name="page_name" required onChange={e => this.setState({ page_link: e.target.value })} />
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
            
                <div className={'modal '+emodalFade} id="edit_modal" style={estyles}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" onClick={this.openEditModal}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                                <h4 className="modal-title">View/Upload Media</h4>
                            </div> 
                            <div className="modal-body">
                                <form id="addMedia" className="row" onSubmit={this.handleMediaFormSubmit.bind(this)}>
                                    <div className="col-md-12">
                                        <label>Upload Media</label>
                                        <input type="file" className="form-control" multiple required onChange={this.fileSelectedHandler} />
                                        <br/>
                                        <button className="btn btn-primary pull-right" id="upload_media_submit">Upload</button>
                                        <br/>
                                        <br/>
                                    </div>
                                </form>
                                <div className="row">
                                    <div className="col-md-12">
                                        <MUIDataTable
                                            data={this.state.mediaFiles.map((m, key) => {
                                                return [
                                                    <React.Fragment>
                                                        <a href={"../images/"+m.src} target="_blank" rel="noreferrer">{m.src}</a>
                                                        <input type="hidden" id={'media'+m.id} value={"/images/"+m.src} />
                                                    </React.Fragment>,
                                                    "https://localhost:3000/images/"+m.src,
                                                    <button type="submit" name="del" className="btn btn-sm btn-danger" value={m.id} onClick={this.deleteMedia(m.id)}><i className="fa fa-trash"></i></button>
                                                ]
                                            })}
                                            columns={["Media File", "Link", "Action"]}
                                            options={{selectableRows: false, download: false, filter: false, print: false, viewColumns: false }}
                                            style={{fontSize: '12px'}}
                                        />
                                    </div>
                                </div>
                                <br/>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-default" onClick={this.openEditModal}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
            
        );
    }
}

class SliderSetup extends React.Component{
    constructor() {
        super();
        this.state = {
            sort_order: '',
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
        document.title="Slider Setup" 
        
        let formData = new FormData();
        formData.append('sliders', "1")

        var obj=this
        
        axios({
            method: 'post',
            url: api_link+'EditSiteFetch.php',
            data: formData,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
        .then(response => response.data)
        .then((data) => {
            obj.setState({ sliders: data})
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
            formData.append('add_slider', 'yes')
            formData.append('sort_order', this.state.sort_order)
            formData.append('image', this.state.image)
            formData.append('image', this.state.image)
            formData.append('status', $("#add_status").val())

            var obj=this

            axios({
                method: 'post',
                url: api_link+'EditSiteManagement.php',
                data: formData,
                config: { headers: {'Content-Type': 'multipart/form-data' }}
            })
            .then(function (response) {
                //handle success
//                $(".loader_gif").hide();
                document.getElementById("addSlider").reset();
                obj.openModal()
                if(response.data === "ok")
                {	
                    let formData1 = new FormData();
                    formData1.append('sliders', "1")
                    
                    axios({
                        method: 'post',
                        url: api_link+'EditSiteFetch.php',
                        data: formData1,
                        config: { headers: {'Content-Type': 'multipart/form-data' }}
                    })
                    .then(response => response.data)
                    .then((data) => {
                        obj.setState({ sliders: data})
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
      
          if(window.confirm("Are You Sure To Delete This Slider Image?")) 
          {
              let formData = new FormData();
              formData.append('delete_slider', qid)
              var obj=this

              axios({
                  method: 'post',
                  url: api_link+'EditSiteManagement.php',
                  data: formData,
                  config: { headers: {'Content-Type': 'multipart/form-data' }}
              })
              .then(function (response) {
                  //handle success
                  if(response.data === "ok")
                  {	
                        let formData1 = new FormData();
                        formData1.append('sliders', "1")

                        axios({
                            method: 'post',
                            url: api_link+'EditSiteFetch.php',
                            data: formData1,
                            config: { headers: {'Content-Type': 'multipart/form-data' }}
                        })
                        .then(response => response.data)
                        .then((data) => {
                            obj.setState({ sliders: data})
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
              formData.append('status_slider', qid)
              var obj=this

              axios({
                  method: 'post',
                  url: api_link+'EditSiteManagement.php',
                  data: formData,
                  config: { headers: {'Content-Type': 'multipart/form-data' }}
              })
              .then(function (response) {
                  //handle success
                  if(response.data === "ok")
                  {	
                        let formData1 = new FormData();
                        formData1.append('sliders', "1")

                        axios({
                            method: 'post',
                            url: api_link+'EditSiteFetch.php',
                            data: formData1,
                            config: { headers: {'Content-Type': 'multipart/form-data' }}
                        })
                        .then(response => response.data)
                        .then((data) => {
                            obj.setState({ sliders: data})
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
                          <h1>Slider Setup</h1>
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
                                      <th>Sort Order</th>
                                      <th>Status</th>
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
                                          <td id={'sort_order'+slider.id}>{slider.sort_order}</td>
                                          <td id={'status'+slider.id}>{slider.status}</td>
                                          <td>
                                              <button type="submit" name="change_status" className="btn btn-primary" value={slider.id} onClick={this.changeStatus(slider.id)}>
                                                  Change Status
                                              </button>
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
                            <h4 className="modal-title">Add Slider</h4>
                          </div> 
                          <form id="addSlider" onSubmit={this.handleAddFormSubmit.bind(this)}>
                          <div className="modal-body">
                              <div className="row">
                                  <div className="col-md-6">
                                        <label>Image (Recommended - 1920*700)</label>
                                        <input type="file" accept="image/*" required onChange={(e) => this.onChange(e) } />
                                  </div>
                                  <div className="col-md-6">
                                        <label>Sort Order</label>
                                        <input type="number" className="form-control" id="sort_order" name="sort_order" required onChange={e => this.setState({ sort_order: e.target.value })} />
                                  </div>
                                  <div className="col-md-6">
                                        <label>Status</label>
                                        <select className="form-control" id="add_status" required>
                                            <option value="active">Active</option>
                                            <option value="block">Block</option>
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

class SocialSetup extends React.Component{
    constructor() {
        super();
        this.state = {
            refresh: false,
            modalVisible: false,
            doingModal: false,
            media: '',
            link: '',
            medias: []
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
        document.title="Slider Setup" 
        
        let formData = new FormData();
        formData.append('social_media', "1")

        var obj=this
        
        axios({
            method: 'post',
            url: api_link+'EditSiteFetch.php',
            data: formData,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
        .then(response => response.data)
        .then((data) => {
            obj.setState({ medias: data.data})
            $("script[src='js/dataTable.js']").remove();
                
            const script = document.createElement("script");
            script.src = "js/dataTable.js";
            script.async = true;
            document.body.appendChild(script);
         })   
    }

    shouldComponentUpdate(nextProps,nextState){
      if(JSON.stringify(this.state.medias) === JSON.stringify(nextState.medias))
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
        formData.append('add_media', 'yes')
        formData.append('media', this.refs.social_media.value)
        formData.append('link', this.state.social_link)

        var obj=this

        axios({
            method: 'post',
            url: api_link+'EditSiteManagement.php',
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
                formData1.append('social_media', "1")

                axios({
                    method: 'post',
                    url: api_link+'EditSiteFetch.php',
                    data: formData1,
                    config: { headers: {'Content-Type': 'multipart/form-data' }}
                })
                .then(response => response.data)
                .then((data) => {
                    obj.setState({ medias: data.data})
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

    deleteLink = qid  => e => {
      
          if(window.confirm("Are You Sure To Delete This Social Link?")) 
          {
              let formData = new FormData();
              formData.append('delete_media', qid)
              var obj=this

              axios({
                  method: 'post',
                  url: api_link+'EditSiteManagement.php',
                  data: formData,
                  config: { headers: {'Content-Type': 'multipart/form-data' }}
              })
              .then(function (response) {
                  //handle success
                  if(response.data === "ok")
                  {	
                        let formData1 = new FormData();
                        formData1.append('social_media', "1")

                        axios({
                            method: 'post',
                            url: api_link+'EditSiteFetch.php',
                            data: formData1,
                            config: { headers: {'Content-Type': 'multipart/form-data' }}
                        })
                        .then(response => response.data)
                        .then((data) => {
                            obj.setState({ medias: data})
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
                          <h1>Social Links Setup</h1>
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
                                      <th>Media</th>
                                      <th>Link</th>
                                      <th>Action</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                      {this.state.medias.map((m, key) => (
                                      <tr key={m.id}>
                                          <td id={'media'+m.id}><i className={"fab "+m.icon}></i> {m.head}</td>
                                          <td id={'link'+m.id}>{m.link}</td>
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
                            <h4 className="modal-title">Add Social Account</h4>
                          </div> 
                          <form id="addMedia" onSubmit={this.handleAddFormSubmit.bind(this)}>
                          <div className="modal-body">
                              <div className="row">
                                  <div className="col-md-12">
                                        <label>Social Media</label>
                                        <select className="form-control" required ref="social_media">
                                            <option value="fa-facebook">Facebook</option>
                                            <option value="fa-twitter">Twitter</option>
                                            <option value="fa-google">Google</option>
                                            <option value="fa-linkedin">LinkedIn</option>
                                            <option value="fa-youtube">YouTube</option>
                                            <option value="fa-instagram">Instagram</option>
                                            <option value="fa-pinterest">Pinterest</option>
                                            <option value="fa-snapchat-ghost">Snapchat</option>
                                            <option value="fa-skype">Skype</option>
                                            <option value="fa-android">Android</option>
                                            <option value="fa-dribbble">Dribble</option>
                                            <option value="fa-vimeo">Vimeo</option>
                                            <option value="fa-tumblr">Tumble</option>
                                            <option value="fa-vine">Vine</option>
                                            <option value="fa-foursquare">FourSquare</option>
                                            <option value="fa-stumbleupon">StumbleUpon</option>
                                            <option value="fa-flickr">Flickr</option>
                                            <option value="fa-yahoo">Yahoo</option>
                                            <option value="fa-reddit">Reddit</option>
                                            <option value="fa-rss">RSS</option>
                                        </select>
                                  </div>
                                  <div className="col-md-12">
                                        <br/>
                                        <label>Social Link</label>
                                        <input type="url" className="form-control" required onChange={e => this.setState({ social_link: e.target.value })} />
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

class FAQs extends React.Component{
    constructor() {
        super();
        this.state = {
            refresh: false,
            modalVisible: false,
            editModalVisible: false,
            doingModal: false,
            question: '',
            answer: '',
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
        document.title="FAQs Management" 
        
        let formData = new FormData();
        formData.append('fetch_faq', "all")

        var obj=this
        
        axios({
            method: 'post',
            url: api_link+'SetupFetch.php',
            data: formData,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
        .then(response => response.data)
        .then((data) => {
            obj.setState({ faqs: data})
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
        formData.append('add_faq', 'yes')
        formData.append('head', this.state.question)
        formData.append('description', this.state.answer)

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
                formData1.append('fetch_faq', "all")

                axios({
                    method: 'post',
                    url: api_link+'SetupFetch.php',
                    data: formData1,
                    config: { headers: {'Content-Type': 'multipart/form-data' }}
                })
                .then(response => response.data)
                .then((data) => {
                    obj.setState({ faqs: data})
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
        formData.append('edit_faq', this.state.eid)
        formData.append('ehead', this.state.question)
        formData.append('description', this.state.answer)
        
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
                formData1.append('fetch_faq', "all")

                axios({
                    method: 'post',
                    url: api_link+'SetupFetch.php',
                    data: formData1,
                    config: { headers: {'Content-Type': 'multipart/form-data' }}
                })
                .then(response => response.data)
                .then((data) => {
                    obj.setState({ faqs: data})
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
          if(window.confirm("Are You Sure To Delete This FAQ?")) 
          {
              let formData = new FormData();
              formData.append('delete_faq', qid)              

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
                        formData1.append('fetch_faq', "all")

                        axios({
                            method: 'post',
                            url: api_link+'SetupFetch.php',
                            data: formData1,
                            config: { headers: {'Content-Type': 'multipart/form-data' }}
                        })
                        .then(response => response.data)
                        .then((data) => {
                            obj.setState({ faqs: data})
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
            question: $("#question"+qid).html(),
            answer: $("#answer"+qid).html(),
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
                          <h1>FAQs Management</h1>
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
                                      <th>Question</th>
                                      <th>Answer</th>
                                      <th>Action</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                      {this.state.faqs.map((m, key) => (
                                      <tr key={m.id}>
                                          <td id={'question'+m.id}>{m.question}</td>
                                          <td id={'answer'+m.id}>{m.answer}</td>
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
                            <h4 className="modal-title">Add FAQ</h4>
                          </div> 
                          <form id="addFaq" onSubmit={this.handleAddFormSubmit.bind(this)}>
                          <div className="modal-body">
                              <div className="row">
                                  <div className="col-md-12">
                                    <label>Question</label>
                                    <input type="text" className="form-control" required onChange={e => this.setState({ question: e.target.value })} />
                                  </div>
                                  <div className="col-md-12">
                                        <br/>
                                        <label>Answer</label>
                                        <input type="text" className="form-control" required onChange={e => this.setState({ answer: e.target.value })} />
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
                                      <label>Question</label>
                                        <input type="text" className="form-control" id="ehead" name="ehead" defaultValue={this.state.question} required onChange={e => this.setState({ question: e.target.value })} />
                                  </div>
                                    <div className="col-md-6">
                                      <label>Answer</label>
                                        <input type="text" className="form-control" id="description" name="description" defaultValue={this.state.answer} required onChange={e => this.setState({ answer: e.target.value })} />
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
    DynamicPages,
    SliderSetup,
    SocialSetup,
    FAQs
};