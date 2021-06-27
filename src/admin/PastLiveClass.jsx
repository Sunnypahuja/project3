import React from 'react';

import { api_link } from './AdminLogin';
import axios from 'axios';
import $ from 'jquery';
import Moment from 'moment';

class PastLiveClass extends React.Component{
    constructor() {
        super();
        this.state = {
            refresh: false,
            modalVisible: false,
            editModalVisible: false,
            doingModal: false,
            type: '',
            choice: '',
            date:'',
            time:'',
            teacher:'',
            abcd: [],
            noClass:false,
            teachersdata:[], 
            products: [],
            title: '',
            data: [],
            classid:'',
            teacherid: '',
        };
        // this.handleChange = this.handleChange.bind(this);
        // this.childKey = 0;
        // this.openModal = this.openModal.bind(this);
        // this.closeModal = this.closeModal.bind(this);
    }

    

    // openModal() {
    //     this.setState({
    //       doingModal: true,
    //       modalVisible: !this.state.modalVisible
    //     });
    //   }

    componentDidMount() {
        document.title="Live Class" 
        
        let formData = new FormData();
        formData.append('fetch_classData', "all")
        formData.append('class_status', "2")
        axios({
            method: 'post',
            url: api_link+'LiveClassData.php',
            data: formData,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
        .then(response => response.data)
        .then((data) => {
            if(data.msg === "ok")
            {
                this.setState({abcd: data.data})
            }
            else if(data.msg == "No Class Available")
            {
                this.setState({noClass: true})
            }
        })
         
        //  let formData2 = new FormData();
        //  formData2.append('fetch_teachers', 1) 
        
        // axios({
        //     method: 'post',
        //     url: api_link+'TeachersData.php',
        //     data: formData2,
        //     config: { headers: {'Content-Type': 'multipart/form-data' }}
        // })
        // .then(response => response.data)
        // .then((data) => {
        //     this.setState({ teachersdata: data.data})
        //     $("script[src='js/dataTable.js']").remove();
                
        //     const script = document.createElement("script");
        //     script.src = "js/dataTable.js";
        //     script.async = true;
        //     document.body.appendChild(script);
        //  }) 


        //  let formData3 = new FormData();
        //     formData3.append('courses', "all")
            
        //     axios({
        //             method: 'post',
        //             url: api_link+'ProgramsFetch.php',
        //             data: formData3,
        //             config: { headers: {'Content-Type': 'multipart/form-data' }}
        //     }).then(response => response.data)
        //     .then((data) => {
        //         this.setState({ products: Object.values(data)})
        //         $("script[src='js/dataTable.js']").remove();
        //         const script = document.createElement("script");

        //         script.src = "js/dataTable.js";
        //         script.async = true;

        //         document.body.appendChild(script);
        //     }) 


         
        var dtToday = new Date();
        var month = dtToday.getMonth() + 1;
        var day = dtToday.getDate();
        var year = dtToday.getFullYear();
        if(month < 10)
            month = '0' + month.toString();
        if(day < 10)
            day = '0' + day.toString();
        
        var maxDate = year + '-' + month + '-' + day;
        $('#inpDate').attr('min', maxDate);
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

    // handleAddFormSubmit( event ) {
	// 	event.preventDefault();
	// 	$("#invalid_message").hide();
    //     let formData = new FormData();
    //     formData.append('add_abcd', 'yes')
    //     formData.append('type', this.state.type)
    //     formData.append('choice', this.state.choice)
    //     formData.append('teacher', this.state.teacher)
    //     formData.append('date', this.state.date)
    //     formData.append('time', this.state.time)
    //     formData.append('class_title', this.state.title)

    //     var obj=this

    //     axios({
    //         method: 'post',
    //         url: api_link+'LiveClassData.php',
    //         data: formData,
    //         config: { headers: {'Content-Type': 'multipart/form-data' }}
    //     })
    //     .then(response => response.data)
    //     .then((data)=> {

    //         document.getElementById("addTeacher").reset();
    //         this.openModal()
    //         if(data.msg === "ok")
    //         {	
    //             console.log("success")
    //             let formData1 = new FormData();
    //             formData1.append('fetch_classData', "all")

    //             axios({
    //                 method: 'post',
    //                 url: api_link+'LiveClassData.php',
    //                 data: formData1,
    //                 config: { headers: {'Content-Type': 'multipart/form-data' }}
    //             })
    //             .then(response => response.data)
    //             .then((data) => {
    //                 console.log(data);
    //             if(data.msg === "ok")
    //             {
    //                 this.setState({abcd: data.data})
    //             }
            
    //             })

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


    //     })
    //     .catch(function (response) {
    //         //handle error
    //         console.log(response);
    //     });
	// }
    
    // handleEditFormSubmit( event ) {
	// 	event.preventDefault();
	// 	$("#invalid_message").hide();

    //     let formData = new FormData();
    //     formData.append('edit_abcd', this.state.eid)
    //     formData.append('etype', this.state.type)
    //     formData.append('echoice', this.state.choice)
    //     formData.append('eteacher', this.state.teacher)
    //     formData.append('edate', this.state.date)
    //     formData.append('etime', this.state.time)
    //     formData.append('eclass_title', this.state.title)
    //     formData.append('eclass_id', this.state.classid)
        
    //     var obj=this

    //     axios({
    //         method: 'post',
    //         url: api_link+'LiveClassData.php',
    //         data: formData,
    //         config: { headers: {'Content-Type': 'multipart/form-data' }}
    //     })
    //     .then(response => response.data)
    //     .then((data)=> {
    //         document.getElementById("editTeacher").reset();
    //         this.closeModal()
    //         if(data.msg === "ok")
    //         {	
    //             let formData1 = new FormData();
    //             formData1.append('fetch_classData', "all")

    //             axios({
    //                 method: 'post',
    //                 url: api_link+'LiveClassData.php',
    //                 data: formData1,
    //                 config: { headers: {'Content-Type': 'multipart/form-data' }}
    //             })
    //             .then(response => response.data)
    //             .then((data) => {
    //                 console.log(data,'test')
    //                 if(data.msg === "ok")
    //                 {
    //                     this.setState({abcd: data.data})
    //                 }
                
    //                 })

    //             $("#update_message").html("<strong>Success! </strong> Your Request Successfully Processed")
    //             $("#update_message").removeClass("alert-danger").addClass("alert-success")
    //         }
    //         else
    //         {
    //             $("#update_message").html("<strong>Error! </strong>"+data.msg)
    //             $("#update_message").removeClass("alert-success").addClass("alert-danger")
    //         }
    //         $("#update_message").show()
    //          setTimeout(function(){ $("#update_message").hide(); }, 4000);


    //     })
    //     .catch(function (response) {
    //         //handle error
    //     //			alert(JSON.stringify(response));
    //         $(".loader_gif").fadeOut("slow");
    //         console.log(response)
    //     });
		
	// }

    // deleteLink = (qid, cid)  => e => {
      
    //       var obj=this
    //       if(window.confirm("Are You Sure To Delete This Class?")) 
    //       {
    //           let formData = new FormData();
    //           formData.append('delete_abcd', qid)              
    //           formData.append('class_id', cid)              

    //           axios({
    //               method: 'post',
    //               url: api_link+'LiveClassData.php',
    //               data: formData,
    //               config: { headers: {'Content-Type': 'multipart/form-data' }}
    //           })
    //           .then(response => response.data)
    //           .then((data)=> {
    //               if(data.msg === "ok")
    //               {	
    //                     let formData1 = new FormData();
    //                     formData1.append('fetch_classData', "all")

    //                     axios({
    //                         method: 'post',
    //                         url: api_link+'LiveClassData.php',
    //                         data: formData1,
    //                         config: { headers: {'Content-Type': 'multipart/form-data' }}
    //                     })
    //                     .then(response => response.data)
    //                     .then((data) => {
    //                         console.log(data,'test')
    //                         if(data.msg === "ok")
    //                         {
    //                             this.setState({abcd: data.data})
    //                         }
                        
    //                      })

    //                 $("#update_message").html("<strong>Success! </strong> Your Request Successfully Processed")
    //                 $("#update_message").removeClass("alert-danger").addClass("alert-success")
    //               }
    //               else
    //               {
    //                   $("#update_message").html("<strong>Error! </strong>"+data.msg)
    //                   $("#update_message").removeClass("alert-success").addClass("alert-danger")
    //               }
    //               $("#update_message").show()
    //                setTimeout(function(){ $("#update_message").hide(); }, 4000);


    //           })
    //           .catch(function (response) {
    //               //handle error
    //               console.log(response)
    //           });
    //       }
    //   }
    
    // openEditModal = qid  => e => {
    //       this.setState({
    //         doingModal: true,
    //         editModalVisible: !this.state.editModalVisible,
    //         choice: $("#choiceid"+qid).html(),
    //         type: $("#type"+qid).html(),
    //         date: $("#date"+qid).html(),
    //         time: $("#time"+qid).html(),
    //         classid: $("#class_id"+qid).html(),
    //         title: $("#class_title"+qid).html(),
    //         teacher: $("#teacherid"+qid).html()+'@'+$("#teacher"+qid).html(),
    //         teacherid: $("#teacherid"+qid).html(),
    //         eid: qid
    //       })        
    //   }
    
    // closeModal() {
    //     this.setState({
    //       doingModal: true,
    //       editModalVisible: !this.state.editModalVisible
    //     });
    //   }

    // handleChange(e)
    // {
    //     this.selectValues(e.target.value)
    //     this.setState({type: e.target.value})
    // }

    // selectValues(type)
    // {
    //     console.log(type)
    //     if(type=="course")
    //     {
    //         let formData = new FormData();
    //         formData.append('courses', "all")
            
    //         axios({
    //                 method: 'post',
    //                 url: api_link+'ProgramsFetch.php',
    //                 data: formData,
    //                 config: { headers: {'Content-Type': 'multipart/form-data' }}
    //         }).then(response => response.data)
    //         .then((data) => {
    //             this.setState({ products: Object.values(data)})
    //             $("script[src='js/dataTable.js']").remove();
    //             const script = document.createElement("script");

    //             script.src = "js/dataTable.js";
    //             script.async = true;

    //             document.body.appendChild(script);
    //         }) 
    //     }
    //     else if(type=="program")
    //     {
    //         let formData = new FormData();
    //         formData.append('programmes', "all")
            
    //         axios({
    //                 method: 'post',
    //                 url: api_link+'ProgramsFetch.php',
    //                 data: formData,
    //                 config: { headers: {'Content-Type': 'multipart/form-data' }}
    //         }).then(response => response.data)
    //         .then((data) => {
    //             this.setState({ products: Object.values(data)})
    //             $("script[src='js/dataTable.js']").remove();
    //             const script = document.createElement("script");

    //             script.src = "js/dataTable.js";
    //             script.async = true;

    //             document.body.appendChild(script);
    //         })
    //     }
    // }
    
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
                          <h1>Past Live Class</h1>
                          <ol className="breadcrumb">
                              <li>
                                  <div className="pull-right"> 
                                      {/* <button title="" className="btn btn-primary" onClick={this.openModal}>
                                            <i className="fa fa-plus"></i>
                                      </button> */}
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
                                      <th style={{textAlign: 'center'}}>Type</th>
                                      <th style={{textAlign: 'center'}}>Course/Program</th>
                                      <th style={{textAlign: 'center'}}>Teacher</th>
                                      <th style={{textAlign: 'center'}}>Date</th>
                                      <th style={{textAlign: 'center'}}>Start Time</th>
                                      <th style={{textAlign: 'center'}}>Title</th>
                                      <th style={{textAlign: 'center'}}>End Time</th>
                                      <th style={{textAlign: 'center'}}>Action</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                      {this.state.abcd.map((m, key) => (
                                      <tr key={m.id}>
                                          <td style={{textAlign: 'center'}} id={'type'+m.id}>{m.type}</td>
                                          <td id={'choice'+m.id} style={{width: '20%', textAlign: 'center'}}>{m.p_name}</td>
                                          <td style={{textAlign: 'center'}} id={'teacher'+m.id}>{m.t_name}</td>
                                          <td style={{textAlign: 'center'}} id={'date'+m.id}>{Moment(m.date).format("MMM Do, YYYY")}</td>
                                          <td style={{textAlign: 'center'}} id={'time'+m.id}>{m.time}</td>
                                          <td style={{textAlign: 'center'}} id={'class_title'+m.id}>{m.class_title}</td>
                                          <td style={{textAlign: 'center'}} id={'end_time'+m.id}>{m.end_time}</td>
                                          {/* <td id={'class_id'+m.id} style={{display: 'none'}}>{m.class_id}</td>
                                          <td id={'teacherid'+m.id} style={{display: 'none'}}>{m.teacher}</td>
                                          <td id={'choiceid'+m.id} style={{display: 'none'}}>{m.course_or_prg}</td> */}
                                          <td style={{width: '10%', textAlign: 'center'}}>
                                              {/* <button type="button" name="edit" className="btn btn-success" value={m.id} onClick={this.openEditModal(m.id)} ><i className="fa fa-edit"></i> Edit</button>
                                              <button type="submit" style={{marginLeft:5}} name="del" className="btn btn-danger" value={m.id} onClick={this.deleteLink(m.id, m.class_id)}><i className="fa fa-trash"></i></button> */}
                                              <a href={m.recording_url} style={{marginLeft:5}} className="btn btn-primary"><i className="fa fa-video-camera"></i> Recording URL</a>
                                          </td>
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
                
                {/* <div className={'modal '+modalFade} id="add_modal" style={styles}>
                      <div className="modal-dialog">
                        <div className="modal-content">
                         <div className="modal-header">
                            <button type="button" className="close" onClick={this.openModal}>
                              <span aria-hidden="true">&times;</span>
                            </button>
                            <h4 className="modal-title">Add Live Class</h4>
                          </div> 
                          <form id="addTeacher" onSubmit={this.handleAddFormSubmit.bind(this)}>
                            <div className="modal-body">
                                <div className="row">
                                  <div className="col-md-6">
                                        <label>Type</label>
                                        <select className="form-control" required onChange={this.handleChange}>
                                            <option value="">Select</option>
                                            <option value="course">Course</option>
                                            <option value="program">Program</option>
                                        </select>
                                  </div>
                                  <div className="col-md-6">
                                        <label>Course/Program</label>
                                        <select className="form-control" required onChange={e => this.setState({ choice: e.target.value})}>
                                        <option value="">Select</option>
                                        {this.state.products.map((m, key) => (
                                            <option value={m.id}>{m.name}</option>
                                        ))}
                                        </select>
                                  </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <label>Teacher</label>
                                        <select className="form-control" required onChange={e => this.setState({ teacher: e.target.value })}>
                                        <option value="">Select</option>
                                        {this.state.teachersdata.map((m, key) => (
                                            <option value={m.id+'@'+m.name}>{m.name}</option>
                                        ))}
                                        </select>
                                    </div>
                                    <div className="col-md-6">
                                        <label>Date</label>
                                        <input type="date" id="inpDate" className="form-control" required onChange={e => this.setState({ date: e.target.value })} />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <label>Time</label>
                                        <input type="time" className="form-control" required onChange={e => this.setState({ time: e.target.value })} />
                                    </div>
                                    <div className="col-md-6">
                                        <label>Class Title</label>
                                        <input type="text" className="form-control" required onChange={e => this.setState({ title: e.target.value })} />
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
                                <h4 className="modal-title">Edit Live Class</h4>
                            </div>
                            <form id="editTeacher" onSubmit={this.handleEditFormSubmit.bind(this)}>
                                <div className="modal-body">
                                    <div className="row">
                                        <div className="col-md-6">
                                                <label>Type</label>
                                                <select id="etype" name="etype"  className="form-control" required onChange={this.handleChange}>
                                                    <option value="course">Course</option>
                                                    <option value="program">Program</option>
                                                </select>
                                        </div>
                                        <div className="col-md-6">
                                                <label>Course/Program</label>
                                                <select id="echoice" name="echoice" className="form-control" required  onChange={e => this.setState({ choice: e.target.value })}>
                                                {this.state.products.map((m, key) => (
                                                    <option selected={(this.state.choice==m.id)?(true):(false)} value={m.id}>{m.name}</option>
                                                ))}
                                                </select>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label>Teacher</label>
                                            <select id="eteacher" name="eteacher" className="form-control" required onChange={e => this.setState({ teacher: e.target.value })}>
                                            {this.state.teachersdata.map((m, key) => (
                                                    
                                                <option value={m.id+'@'+m.name}  selected={(this.state.teacherid==m.id)?(true):(false)}>{m.name}</option>
                                            ))}
                                            </select>
                                        </div>
                                        <div className="col-md-6">
                                            <label>Date</label>
                                            <input type="date" id="inpDate" id="edate" name="edate" defaultValue={this.state.date} className="form-control" required onChange={e => this.setState({ date: e.target.value })} />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label>Time</label>
                                            <input type="time" id="etime" name="etime" className="form-control" defaultValue={this.state.time} required onChange={e => this.setState({ time: e.target.value })} />
                                        </div>
                                        <div className="col-md-6">
                                            <label>Class Title</label>
                                            <input type="text" className="form-control" id="eclass_title" name="eclass_title" defaultValue={this.state.title} required onChange={e => this.setState({ title: e.target.value })} />
                                            <input style={{visibility: 'hidden'}} value={this.state.classid} type="text" className="form-control" id="eclass_id" name="eclass_id" />
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
                </div> */}
            </React.Fragment>
        );
    }
}

export default PastLiveClass;