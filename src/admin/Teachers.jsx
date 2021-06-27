import React from 'react';

import { api_link } from './AdminLogin';

import axios from 'axios';
import $ from 'jquery';

class Teachers extends React.Component{
    constructor() {
        super();
        this.state = {
            refresh: false,
            modalVisible: false,
            editModalVisible: false,
            doingModal: false,
            name: '',
            email: '',
            password:'',
            teachers: []
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
        document.title="Teachers" 
        
        var obj=this
        console.log("heloo hel")
        let formData1 = new FormData();
        formData1.append('fetch_teachers', "all")

        axios({
            method: 'post',
            url: api_link+'TeachersData.php',
            data: formData1,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
        .then(response => response.data)
        .then((data) => {
          console.log("chcekkk")
            console.log(data,'test')
            if(data.msg === "ok")
            {
                obj.setState({teachers: data.data})
            }
            $("script[src='js/dataTable.js']").remove();
                
            const script = document.createElement("script");
            script.src = "js/dataTable.js";
            script.async = true;
            document.body.appendChild(script);
         }) 
    }

    shouldComponentUpdate(nextProps,nextState){
      if(JSON.stringify(this.state.teachers) === JSON.stringify(nextState.teachers))
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
        formData.append('add_teacher', 'yes')
        formData.append('name', this.state.name)
        formData.append('email', this.state.email)
        formData.append('password', this.state.password)

        var obj=this

        axios({
            method: 'post',
            url: api_link+'TeachersData.php',
            data: formData,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
        .then(response => response.data)
              .then(function (data) {
                  
            document.getElementById("addTeacher").reset();
            obj.openModal()
            if(data.msg === "ok")
            {	
              let formData1 = new FormData();
              formData1.append('fetch_teachers', "all")
      
              axios({
                  method: 'post',
                  url: api_link+'TeachersData.php',
                  data: formData1,
                  config: { headers: {'Content-Type': 'multipart/form-data' }}
              })
              .then(response => response.data)
              .then((data) => {
                console.log("chcekkk")
                  console.log(data,'test')
                  if(data.msg === "ok")
                  {
                      obj.setState({teachers: data.data})
                  }
               })

                $("#update_message").html("<strong>Success! </strong> Your Request Successfully Processed")
                $("#update_message").removeClass("alert-danger").addClass("alert-success")
            }
            else
            {
                $("#update_message").html("<strong>Error! </strong>"+data.msg)
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
        formData.append('edit_teacher', this.state.eid)
        formData.append('eemail', this.state.email)
        formData.append('ename', this.state.name)
        formData.append('epassword', this.state.password)
        
        var obj=this

        axios({
            method: 'post',
            url: api_link+'TeachersData.php',
            data: formData,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
        .then(response => response.data)
        .then(function (data) {
            document.getElementById("editTeacher").reset();
            obj.closeModal()
            console.log(data+'edit')
            if(data.msg === "ok")
            {	
              let formData1 = new FormData();
              formData1.append('fetch_teachers', "all")
      
              axios({
                  method: 'post',
                  url: api_link+'TeachersData.php',
                  data: formData1,
                  config: { headers: {'Content-Type': 'multipart/form-data' }}
              })
              .then(response => response.data)
              .then((data) => {
                console.log("chcekkk")
                  console.log(data,'test')
                  if(data.msg === "ok")
                  {
                      obj.setState({teachers: data.data})
                  }
               })

                $("#update_message").html("<strong>Success! </strong> Your Request Successfully Processed")
                $("#update_message").removeClass("alert-danger").addClass("alert-success")
            }
            else
            {
              $("#update_message").html("<strong>Error! </strong>"+data.msg)
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
          if(window.confirm("Are You Sure To Delete This Teacher?")) 
          {
              let formData = new FormData();
              formData.append('delete_teacher', qid)              

              axios({
                  method: 'post',
                  url: api_link+'TeachersData.php',
                  data: formData,
                  config: { headers: {'Content-Type': 'multipart/form-data' }}
              })
              .then(response => response.data)
              .then(function (data) {
                if(data.msg === "ok")
                {	
                  let formData1 = new FormData();
                  formData1.append('fetch_teachers', "all")
          
                  axios({
                      method: 'post',
                      url: api_link+'TeachersData.php',
                      data: formData1,
                      config: { headers: {'Content-Type': 'multipart/form-data' }}
                  })
                  .then(response => response.data)
                  .then((data) => {
                    console.log("chcekkk")
                      console.log(data,'test')
                      if(data.msg === "ok")
                      {
                          obj.setState({teachers: data.data})
                      }
                   })
    
                    $("#update_message").html("<strong>Success! </strong> Your Request Successfully Processed")
                    $("#update_message").removeClass("alert-danger").addClass("alert-success")
                }
                  else
                  {
                    $("#update_message").html("<strong>Error! </strong>"+data.msg)
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
            name: $("#name"+qid).html(),
            email: $("#email"+qid).html(),
            password: $("#password"+qid).html(),
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
                    <section className="content-header">
                          <h1>Teacher</h1>
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

                    <section>
                        <div id="update_message" className="alert" style={{display: 'none', marginTop:20, marginLeft:20, marginRight:20}}></div> 
                    </section>

                    <section className="content" key={this.childKey}>
                          <div className="box">
                              <div className="box-body table-responsive">
                                  <br/>
                                  <table id="example1" className="table">
                                    <thead>
                                    <tr>
                                      <th>Name</th>
                                      <th>Email</th>
                                      <th>Action</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                      {this.state.teachers.map((m, key) => (
                                      <tr key={m.id}>
                                          <td id={'name'+m.id}>{m.name}</td>
                                          <td id={'email'+m.id}>{m.email}</td>
                                          <td id={'password'+m.id} style={{display: 'none'}}>{m.password}</td>
                                          <td>
                                              <button type="button" name="edit" className="btn btn-success" value={m.id} style={{marginRight: 10}} onClick={this.openEditModal(m.id)} ><i className="fa fa-edit"></i> Edit</button>
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
                            <h4 className="modal-title">Add Teacher</h4>
                          </div> 
                          <form id="addTeacher" onSubmit={this.handleAddFormSubmit.bind(this)}>
                          <div className="modal-body">
                                <div className="row">
                                  <div className="col-md-6">
                                    <label>Name</label>
                                    <input type="text" className="form-control" required onChange={e => this.setState({ name: e.target.value })} />
                                  </div>
                                  <div className="col-md-6">
                                        <br/>
                                        <label>Email</label>
                                        <input type="email" className="form-control" required onChange={e => this.setState({ email: e.target.value })} />
                                  </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <label>Password</label>
                                        <input type="password" className="form-control" required onChange={e => this.setState({ password: e.target.value })} />
                                    </div>
                                </div>
                              <br/>
                             </div>
                          <div className="modal-footer">
                            <button type="button" className="btn btn-default pull-left" onClick={this.openModal}>Close</button>
                            <button type="submit" name="add" className="btn btn-primary">Add</button>
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
                        <h4 className="modal-title">Edit Teacher</h4>
                      </div>
                      <form id="editTeacher" onSubmit={this.handleEditFormSubmit.bind(this)}>
                      <div className="modal-body">
                          <div className="row">
                                  <div className="col-md-12">
                                      <label>Name</label>
                                        <input type="text" className="form-control" id="ename" name="ename" defaultValue={this.state.name} required onChange={e => this.setState({ name: e.target.value })} />
                                  </div>
                                  <div className="col-md-6">
                                      <label>Email</label>
                                        <input type="email" className="form-control" id="eemail" name="eemail" defaultValue={this.state.email} required onChange={e => this.setState({ email: e.target.value })} />
                                  </div>
                            </div>
                            <div className="row">
                                    <div className="col-md-6">
                                      <label>Password</label>
                                        <input type="password" className="form-control" id="epassword" name="epassword" defaultValue={this.state.password} required onChange={e => this.setState({ password: e.target.value })} />
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

export default Teachers;