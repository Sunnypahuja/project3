import React from 'react';

import { api_link } from './AdminLogin';

import axios from 'axios';
import $ from 'jquery';

class StudentList extends React.Component{
    constructor() {
        super();
        this.state = {
            refresh: false,
            modalVisible: false,
            editModalVisible: false,
            doingModal: false,
            name: '',
            type: '',
            email: '',
            password:'',
            teachers: [],
            type: ''
        };
        
        this.childKey = 0;
    
    }


    componentDidMount() {
        document.title="Students" 
        
       this.fetch_students()   
    }

    fetch_students=()=>{
        var obj=this

        if(this.props.match.params.type=="all")
        {    
            console.log("all")
            let formData1 = new FormData();
            formData1.append('fetch_all', "all")

            axios({
                method: 'post',
                url: api_link+'fetch_students.php',
                data: formData1,
                config: { headers: {'Content-Type': 'multipart/form-data' }}
            })
            .then(response => response.data)
            .then((data) => {
                obj.setState({teachers: data.data, type: this.props.match.params.type})
            }) 
        }  
        else if(this.props.match.params.type=="course")
        {    
            console.log("cours")
            let formData1 = new FormData();
            formData1.append('fetch_course', "all")

            axios({
                method: 'post',
                url: api_link+'fetch_students.php',
                data: formData1,
                config: { headers: {'Content-Type': 'multipart/form-data' }}
            })
            .then(response => response.data)
            .then((data) => {
               obj.setState({teachers: data.data, type: this.props.match.params.type})
            }) 
        } 
        else if(this.props.match.params.type=="program")
        {    
            console.log("prog")
            let formData1 = new FormData();
            formData1.append('fetch_program', "all")

            axios({
                method: 'post',
                url: api_link+'fetch_students.php',
                data: formData1,
                config: { headers: {'Content-Type': 'multipart/form-data' }}
            })
            .then(response => response.data)
            .then((data) => {
                console.log(data)
                obj.setState({teachers: data.data, type: this.props.match.params.type})
             }) 
        }
    }
    
  

    deleteLink =( qid,a)  => e => {
      
          var obj=this
          if(window.confirm("Are You Sure To Delete This Student?")) 
          {
              let formData = new FormData();
              
              formData.append('delete_student', qid)              

              axios({
                  method: 'post',
                  url: api_link+'fetch_students.php',
                  data: formData,
                  config: { headers: {'Content-Type': 'multipart/form-data' }}
              })
              .then(response => response.data)
              .then(function (data) {
                if(data.msg === "ok")

                {	
                    if(a == 'all'){
                    
                  let formData1 = new FormData();
                  formData1.append('fetch_all', "all")
          
                  axios({
                      method: 'post',
                      url: api_link+'fetch_students.php',
                      data: formData1,
                      config: { headers: {'Content-Type': 'multipart/form-data' }}
                  })
                  .then(response => response.data)
                  .then((data) => {
                    
                      console.log(data,'test')
                      if(data.msg === "ok")
                      { 
                          obj.setState({teachers: data.data})
                      }
                   })
                }else if(a == 'course'){
                    let formData1 = new FormData();
                    formData1.append('fetch_course', "all")
            
                    axios({
                        method: 'post',
                        url: api_link+'fetch_students.php',
                        data: formData1,
                        config: { headers: {'Content-Type': 'multipart/form-data' }}
                    })
                    .then(response => response.data)
                    .then((data) => {
                        if(data.msg === "ok")
                        { 
                            obj.setState({teachers: data.data})
                        }
                     })
                }
                else if(a =='program'){
                    let formData1 = new FormData();
                    formData1.append('fetch_program', "all")
            
                    axios({
                        method: 'post',
                        url: api_link+'fetch_students.php',
                        data: formData1,
                        config: { headers: {'Content-Type': 'multipart/form-data' }}
                    })
                    .then(response => response.data)
                    .then((data) => {
                        if(data.msg === "ok")
                        { 
                            obj.setState({teachers: data.data})
                        }
                     })
                }
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
    
  
    
  
    render()
    {
        
        if(this.state.type!=this.props.match.params.type)
        {
            this.fetch_students()
        }
        console.log(this.state.teachers)
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
                          <h1>Student</h1>
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
                                  <table id="example1" className="table">
                                    <thead>
                                    <tr>
                                      <th>Name</th>
                                      <th>Email</th>
                                   {this.state.type=="course"?(
                                       <th>Course Name</th>
                                   ):(null)}   
                                     {this.state.type=="program"?(
                                       <th>Program Name</th>
                                   ):(null)} <th>Action</th>
                                      
                                    </tr>
                                    </thead>
                                    <tbody> 
                                      {this.state.teachers && this.state.teachers.map((m, key) => (
                                      <tr key={m.id}>
                                          <td id={'name'+m.u_id}>{m.f_name} {m.l_name}</td>
                                          <td id={'email'+m.id}>{m.email}</td>
                                          {this.state.type=="course"||this.state.type=="program"?(
                                                <td id={'name'+m.id}>{m.name}</td>
                                            ):(null)} 
                                          <td id={'password'+m.id} style={{display: 'none'}}>{m.password}</td>
                                          <td>
                                          
                                              <button type="submit" name="del" className="btn btn-danger" value={m.u_id} onClick={this.deleteLink(m.u_id,this.state.type)}><i className="fa fa-trash"></i></button>
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

export default StudentList;