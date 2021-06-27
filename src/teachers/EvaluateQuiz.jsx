import React from 'react';

import { api_link } from './TeacherLogin';
import axios from 'axios';
import $ from 'jquery';

class EvaluateQuiz extends React.Component{
    constructor() {
        super();
        this.state = {
        data:[],
        teachersdata: [],
        teacher:'',
        marks:'',
        file:'',
        u_id:'',
        q_id:'',
        aid: '',
        mid:'',
        description:'',
        modalVisible: false,
        doingModal: false,
        editModalVisible: false,
        };
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }
    
    componentDidMount(){
        let formData = new FormData();
        formData.append('fetch_quiz_teacher', "all")
        formData.append('status', "4")
        formData.append('t_id', window.atob(window.sessionStorage.getItem(window.btoa("teacher_id"))))

        var obj=this
        axios({
            method: 'post',
            url: api_link+'QuizData.php',
            data: formData,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
        .then(response => response.data)
        .then((data) => {
            if(data.msg=="ok")
            {
                obj.setState({data: data.data})
            }
            
            $("script[src='js/dataTable.js']").remove();   
            const script = document.createElement("script");
            script.src = "js/dataTable.js";
            script.async = true;
            document.body.appendChild(script);
         })
    }

    closeModal() {
        this.setState({
          doingModal: true,
          editModalVisible: !this.state.editModalVisible
        });
    }

    showModal(uid, qid, id, aid) {
        this.setState({
            u_id:uid,
            q_id:qid,
            mid: id,
            aid: aid
        })
        this.openModal()
    }
    openModal() {
        this.setState({
          doingModal: true,
          modalVisible: !this.state.modalVisible
        });
    }

    // evaluate() {
    //     let formData = new FormData();
    //     formData.append('markAsEvaluated', "all")
    //     formData.append('u_id', "all")

    //     var obj=this
        
    //     axios({
    //         method: 'post',
    //         url: api_link+'QuizData.php',
    //         data: formData,
    //         config: { headers: {'Content-Type': 'multipart/form-data' }}
    //     })
    //     .then(response => response.data)
    //     .then((data) => {
    //         if(data.msg=="ok")
    //         {
    //             $("#update_message").html("<strong>Success! </strong> Your Request Successfully Processed")
    //             $("#update_message").removeClass("alert-danger").addClass("alert-success")
    //         }
    //         else
    //         {
    //             $("#update_message").html("<strong>Error! </strong>"+data.msg)
    //             $("#update_message").removeClass("alert-success").addClass("alert-danger")
    //         }
    //         $("#update_message").show()
    //          setTimeout(function(){ $("#update_message").hide();; }, 4000);
    //      })
    // }

    onFileChange = event => 
    {
        this.setState({file: event.target.files[0] });
    }

    handleAddFormSubmit( event ) {
		event.preventDefault();
		$("#invalid_message").hide();
        let formData = new FormData();
        formData.append('markAsEvaluatedTeacher', 'yes')
        formData.append('marks',this.state.marks)
        formData.append('file[]',this.state.file)
        formData.append('description',this.state.description)
        formData.append('u_id',this.state.u_id)
        formData.append('q_id',this.state.q_id)
        formData.append('a_id',this.state.aid)
        formData.append('t_id', window.atob(window.sessionStorage.getItem(window.btoa("teacher_id"))))
        var obj=this
        axios({
            method: 'post',
            url: api_link+'QuizData.php',
            data: formData,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
        .then(response => response.data)
        .then((data) =>{

            document.getElementById("addTeacher").reset();
            obj.openModal()
            if(data.msg == "ok")
            {	
                $("#box"+this.state.mid).remove();
                // let formData = new FormData();
                // formData.append('fetch_quiz', "all")
                // formData.append('status', "2")
                // axios({
                //     method: 'post',
                //     url: api_link+'QuizData.php',
                //     data: formData,
                //     config: { headers: {'Content-Type': 'multipart/form-data' }}
                // })
                // .then(response => response.data)
                // .then((data) => {
                //     if(data.msg=="ok")
                //     {
                //         obj.setState({data: data.data})
                //     }
                    
                //     $("script[src='js/dataTable.js']").remove();   
                //     const script = document.createElement("script");
                //     script.src = "js/dataTable.js";
                //     script.async = true;
                //     document.body.appendChild(script);
                // })
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
        // .catch(function (response) {
        //     //handle error
        //     console.log(response);
        // });
	}

    render() {
        let styles = this.state.modalVisible
          ? { display: "block" }
          : { display: "none" };
        let modalFade = this.state.modalVisible
          ? { fade: "fade" }
          : { fade: "show" };
        return(
            <React.Fragment>
                <div className="content-wrapper">
                    <section className="content-header">
                          <h1>Evaluate Quiz</h1>
                    </section>

                    <section>
                        <div id="update_message" className="alert" style={{display: 'none', marginTop:20, marginLeft:20, marginRight:20}}></div> 
                    </section>

                    <section className="content" key={this.childKey}>
                        <div className="box">
                            <div className="box-body table-responsive">
                                <br/>
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th style={{textAlign: 'center'}}>Quiz</th>
                                            <th style={{textAlign: 'center'}}>User</th>
                                            <th style={{textAlign: 'center'}}>Quiz Total Points</th>
                                            <th style={{textAlign: 'center'}}>Answer Sheet</th>
                                            <th style={{textAlign: 'center'}}>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.data.map((m, key) => (
                                        <tr key={m.id} id={'box'+m.id}>
                                            <td style={{textAlign: 'center'}} id={'title'+m.id}>{m.title}</td>
                                            <td style={{textAlign: 'center'}} id={'user'+m.id}>{m.f_name} {m.l_name}</td>
                                            <td style={{textAlign: 'center'}} id={'user'+m.id}>{m.total_points}</td>
                                            <td  style={{textAlign: 'center'}} id={'answer'+m.id}> <a href={api_link+m.file} class="btn btn-success" target="_blank">Check</a></td>
                                            <td style={{width: '30%', textAlign: 'center'}}>
                                                <button type="button" name="edit" className="btn btn-primary" value={m.id} onClick={()=>this.showModal(m.u_id, m.q_id, m.id, m.aid)} ><i className="fa fa-edit"></i>Evaluate</button>
                                            </td>
                                        </tr>
                                        ))}
                                    </tbody>
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
                                <h4 className="modal-title">Assign Teacher</h4>
                            </div>
                            <form id="addTeacher" onSubmit={this.handleAddFormSubmit.bind(this)}>
                            <div className="modal-body">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label>Score</label>
                                            <input type="text" id="marks" name="marks" className="form-control" required onChange={e => this.setState({ marks: e.target.value })} />
                                        </div>
                                        <div className="col-md-6">
                                            <label>File(Optional)</label>
                                            <input type="file" className="form-control" onChange={this.onFileChange} />
                                            <input style={{visibility: 'hidden'}} value={this.state.classid} type="text" className="form-control" id="eclass_id" name="eclass_id" />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label>Any Note</label>
                                            <textarea className="form-control" onChange={e => this.setState({description: e.target.value })} ></textarea>
                                        </div>
                                    </div>
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
        )
    }
    
}
export default EvaluateQuiz;