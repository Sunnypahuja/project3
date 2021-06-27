import React from "react";
import axios from "axios";
import $ from "jquery";
import CKEditor from "react-ckeditor-component";
import { api_link } from "./TeacherLogin";

class ChangePassword extends React.Component{

    state={
        data: [],
        newPass: '',
        conPass: '',
        current: '',
    }

    changePassword=()=>{
        if(this.state.newPass==this.state.conPass)
        {    
            let formData4 = new FormData();
            formData4.append("changePassword", window.atob(window.sessionStorage.getItem(window.btoa("teacher_id"))));
            formData4.append("newPass", this.state.newPass);
            formData4.append("oldPass", this.state.current);
            axios({
            method: "post",
            url: api_link + "ChangePassword.php",
            data: formData4,
            config: { headers: { "Content-Type": "multipart/form-data" } },
            })
            .then((response) => response.data)
            .then((data) => {
                if(data.msg=="ok")
                {
                    $("#update_msg").html("<strong>Success! </strong> Your Request Successfully Processed")
                    $("#update_msg").removeClass("alert-danger").addClass("alert-success")
                }
                else if(data.msg=="Password Mismatched")
                {
                    $("#update_msg").html("<strong>Error! </strong> Unable to Process Your Request")
                    $("#update_msg").removeClass("alert-success").addClass("alert-danger")
                }
            });
        } 
        else
        {
            $("#update_msg").html("<strong>Error! </strong> Password Mismatched")
            $("#update_msg").removeClass("alert-success").addClass("alert-danger")
        } 
        $("#update_msg").show()
        window.scrollTo({top: 0, behavior: 'smooth'});
        setTimeout(function(){ $("#update_msg").hide(); }, 4000); 
    }
        
       render(){
        return(
            <React.Fragment>
                <div className="content-wrapper">
                    <section className="content-header">
                        <h1>Change Password</h1>
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
                                                <div className="col-md-6">
                                                    <label>Current Password</label>
                                                    <input className="form-control" required type="text" onChange={(e)=>this.setState({current: e.target.value})} />
                                                </div>
                                                <div className="col-md-6">
                                                    <label>New Password</label>
                                                    <input className="form-control" required type="text" onChange={(e)=>this.setState({newPass: e.target.value})} />
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <label>Confirm Password</label>
                                                    <input className="form-control" required type="text" onChange={(e)=>this.setState({conPass: e.target.value})} />
                                                </div>
                                            </div>
                                            <div className="row" style={{marginTop: 10}}>
                                                <div className="col-md-6">
                                                    <button type="button" className="btn btn-success" onClick={() => this.changePassword()}>Save Changes</button>
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
export default ChangePassword;