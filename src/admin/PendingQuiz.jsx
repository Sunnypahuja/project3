import React from 'react';

import { api_link } from './AdminLogin';
import axios from 'axios';
import $ from 'jquery';

class PendingQuiz extends React.Component{
    constructor() {
        super();
        this.state = {
        media:[],
        marks:'',
        file:'',
        eid: '',
        u_id:'',
        q_id:'',
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
        formData.append('fetch_pendingquiz', "all")
        formData.append('status', "5")

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
                obj.setState({media: data.data})
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

    showModal(uid, qid, id) {
        this.setState({
            u_id:uid,
            q_id:qid,
            mid: id
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

    openEditModal = qid  => e => {
        this.setState({
          doingModal: true,
          editModalVisible: !this.state.editModalVisible,
          marks: $("#marks"+qid).html(),
          file: $("#file"+qid).html(),
          description: $("#description"+qid).html(),
          eid: qid
        })        
    }

    handleEditFormSubmit( event ) {
		event.preventDefault();
		$("#invalid_message").hide();
        let formData = new FormData();
        formData.append('edit_quizresult', this.state.eid)
        formData.append('marks', this.state.marks)
        formData.append('file[]', this.state.file)
        formData.append('description', this.state.description)
        formData.append('eid', this.state.eid)
        
        var obj=this

        axios({
            method: 'post',
            url: api_link+'QuizData.php',
            data: formData,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
        .then(response => response.data)
        .then((data) =>{
            document.getElementById("editTeacher").reset();
            this.closeModal()
            if(data.msg == "ok")
            {	

                let formData = new FormData();
                formData.append('fetch_evaluatedquiz', "all")
                formData.append('status', "3")

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
                        obj.setState({media: data.data})
                    }
                    
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

    check=(qid, uid)=>{
        let formData = new FormData();
        formData.append('showToStudents', 1)
        formData.append('qid', qid)
        formData.append('uid', uid)
        var obj=this
        
        axios({
            method: 'post',
            url: api_link+'QuizData.php',
            data: formData,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
        .then(response => response.data)
        .then(function (data) {
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
                    obj.setState({media: data.data})
                }
                
                $("script[src='js/dataTable.js']").remove();   
                const script = document.createElement("script");
                script.src = "js/dataTable.js";
                script.async = true;
                document.body.appendChild(script);
            })
        })
    }

    deleteFile(eid)
    {
        let formData = new FormData();
        formData.append('deleteFile', eid)
        var obj=this
        
        axios({
            method: 'post',
            url: api_link+'QuizData.php',
            data: formData,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
        .then(response => response.data)
        .then(function (data) {
            obj.closeModal()
            if(data.msg == "ok")
            {	
                let formData = new FormData();
                formData.append('fetch_pendingquiz', "all")
                formData.append('status', "3")

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
                        obj.setState({media: data.data})
                    }
                    
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
                $("#update_message").html("<strong>Error! </strong>"+data.msg)
                $("#update_message").removeClass("alert-success").addClass("alert-danger")
            }
            $("#update_message").show()
             setTimeout(function(){ $("#update_message").hide(); }, 4000);


        })
    }


    render() {
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
                          <h1>Evaluated Quiz</h1>
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
                                            <th style={{textAlign: 'center'}}>Obtained Points</th>
                                            <th style={{textAlign: 'center'}}>User Answer Sheet</th>
                                            <th style={{textAlign: 'center'}}>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {(this.state.media && this.state.media.length)?(
                                         this.state.media.map((m, key) => (
                                        <tr key={m.id} id={'box'+m.id}>
                                            <td style={{textAlign: 'center'}} id={'title'+m.id}>{m.title}</td>
                                            <td style={{textAlign: 'center'}} id={'user'+m.id}>{m.f_name} {m.l_name}</td>
                                            <td style={{textAlign: 'center'}} id={'user'+m.id}>{m.total_points}</td>
                                            <td style={{textAlign: 'center'}} id={'marks'+m.id}>{m.marks}</td>
                                            <td style={{textAlign: 'center', display:'none'}} id={'description'+m.id}>{m.description}</td>
                                            <td style={{textAlign: 'center', display:'none'}} id={'file'+m.id}>{m.file}</td>
                                            <td style={{textAlign: 'center'}} id={'answer'+m.id}> <a href={api_link+m.file} class="btn btn-success" target="_blank">Check</a></td>
                                            <td style={{width: '30%', textAlign: 'center'}}>
                                                <button type="button" name="edit" className="btn btn-success" value={m.id} onClick={this.openEditModal(m.id)} ><i className="fa fa-edit"></i> Edit</button>
                                                <button type="button" name="edit" className="btn btn-success" value={m.id} onClick={()=>this.check(m.q_id, m.u_id)} ><i className="fa fa-check"></i>Show to Students</button>
                                            </td>
                                        </tr>
                                        ))):(<p>No Data Available</p>)}
                                    </tbody>
                                </table>                    
                            </div>
                        </div>
                    </section>
                </div>
                <div className={'modal '+emodalFade} id="edit_modal"  style={estyles}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close"  onClick={this.closeModal}>
                                <span aria-hidden="true">&times;</span>
                                </button>
                                <h4 className="modal-title">Edit Result</h4>
                            </div>
                            <form id="editTeacher" onSubmit={this.handleEditFormSubmit.bind(this)}>
                            <div className="modal-body">
                                {/* <div className="box"> */}
                                    <div className="row">
                                        <div className="col-md-12">
                                            <label>Score</label>
                                            <input type="text" defaultValue={this.state.marks} id="emarks" name="emarks" className="form-control" required onChange={e => this.setState({ marks: e.target.value })} />
                                        </div>
                                    </div>
                                        
                                   
                                    <div className="row">
                                        <div className="col-md-12">
                                            <label>Any Note</label>
                                            <textarea  defaultValue={this.state.description} className="form-control" style={{resize: 'none'}} id="edescription" onChange={e => this.setState({description: e.target.value })} ></textarea>
                                        </div>
                                    </div>
                                    <div className="row">        
                                            {this.state.file==''?
                                            (
                                                <div className="col-md-12">
                                                    <label>File(Optional)</label>
                                                    <input type="file" className="form-control" id="efile" onChange={this.onFileChange}/>
                                                    
                                                </div>
                                            ):(
                                                <div className="col-md-12">
                                                    <label>File(Optional)</label>
                                                    <br />
                                                    <a href={api_link+this.state.file} target="_blank"><img src={api_link+"image/file.png"} width="100px" height="130px" id="logoImg"/></a>
                                                    <button className="btn btn-danger" onClick={()=>this.deleteFile(this.state.eid)} style={{marginTop:60}}><i className="fa fa-trash"></i></button>
                                                </div>
                                            )}
                                        
                                    </div>
                                {/* </div> */}
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
        )
    }
    
}
export default PendingQuiz;