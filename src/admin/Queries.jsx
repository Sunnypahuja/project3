import React from 'react';

import { api_link } from './AdminLogin';

import axios from 'axios';
import $ from 'jquery';

class PendingQueries extends React.Component{
    constructor() {
        super();
        this.state = {
            refresh: false,
            doingModal: false,
            editModalVisible: false,
            response:'',
            subject: '',
            contact: '',
            email: '',
            eid: '',
            queries: [],
        };
        
        this.childKey=0;
        this.closeModal = this.closeModal.bind(this);
        
        let formData = new FormData();
		formData.append('pending_queries', "pending")
      
		axios({
			method: 'post',
			url: api_link+'QueriesFetch.php',
			data: formData,
		})
		.then(response => response.data)
        .then((data) => {
            this.setState({ queries: data })
            $("script[src='js/dataTable.js']").remove();
                
            const script = document.createElement("script");
            script.src = "js/dataTable.js";
            document.body.appendChild(script);
         })
		.catch(function (response) {
			//handle error
			console.log(response)
		});  
    }

    componentDidMount() {
        document.title="Pending Queries"  
    }
    
    shouldComponentUpdate(nextProps,nextState){
      if(JSON.stringify(this.state.queries) === JSON.stringify(nextState.queries))
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
    
    openEditModal = qid  => e => {
        this.setState({
            doingModal: true,
            editModalVisible: !this.state.editModalVisible,
            subject: $("#subject"+qid).html(),
            contact: $("#contact"+qid).html(),
            email: $("#email"+qid).html(),
            eid: qid
        }) 
    }
    
    closeModal() {
        this.setState({
          doingModal: true,
          editModalVisible: !this.state.editModalVisible
        });
    }
    
    handleQueryFormSubmit( event ) {
		event.preventDefault();
		$("#invalid_message").hide();

        let formData = new FormData();
        formData.append('response_query', this.state.eid)
        formData.append('response', this.state.response)
        formData.append('subject', this.state.subject)
        formData.append('contact', this.state.contact)
        formData.append('email', this.state.email)
        formData.append('send_via', this.refs.send_via.value)

        var obj=this

        axios({
            method: 'post',
            url: api_link+'QueriesManagement.php',
            data: formData,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
        .then(function (response) {
            //handle success
            document.getElementById("response").reset();
            obj.closeModal()
            if(response.data === "ok")
            {	
                let formData1 = new FormData();
                formData1.append('pending_queries', "pending")

                axios({
                    method: 'post',
                    url: api_link+'QueriesFetch.php',
                    data: formData1,
                })
                .then(response => response.data)
                .then((data) => {
                    obj.setState({ queries: data })
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
            console.log(response)
        });	
	}
    
    render()
    {
        let estyles = this.state.editModalVisible
          ? { display: "block" }
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
                      <h1> Pending Queries</h1>
                    </section>
                    
                    <section className="content">
                      <div className="row">
                        <div className="col-xs-12">
                          <div className="box">
                            <div className="box-body table-responsive" key={this.childKey}>
                              <table id="example1" className="table table-striped">
                                <thead>
                                  <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Contact</th>
                                    <th>Subject</th>  
                                    <th>Message</th>
                                    <th>On</th>
                                    <th>Action</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {this.state.queries.map((q, key) => (
                                    <tr key={q.id}>
                                        <td>{q.name}</td>
                                        <td id={"email"+q.id}>{q.email}</td>
                                        <td id={"contact"+q.id}>{q.contact}</td>
                                        <td id={"subject"+q.id}>{q.subject}</td>
                                        <td>{q.message}</td>
                                        <td>{q.time_stamp}</td>
                                        <td>
                                            <button value={q.id} onClick={this.openEditModal(q.id)} title="" className="btn btn-primary">
                                                 <i className="fa fas fa-check-circle"></i> Response
                                            </button>
                                        </td>
                                    </tr>
                                  ))}

                                </tbody>
                                <tfoot>
                                </tfoot>
                              </table>
                            </div>
                          </div>
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
                        <h4 className="modal-title">Response</h4>
                      </div>
                      <form id="response" onSubmit={this.handleQueryFormSubmit.bind(this)}>
                          <div className="modal-body">
                              <div className="row">
                                  <div className="col-md-12">
                                        <label>Response</label>
                                        <textarea className="form-control" id="response_query" style={{resize: 'none'}} required onChange={e => this.setState({ response: e.target.value })} />
                                  </div>
                                  <div className="col-md-12">
                                        <br/>
                                        <label>Send Via</label>
                                        <select className="form-control" id="send_via" required ref="send_via">
                                            <option value="email">Email</option>
                                            <option value="sms">SMS</option>
                                        </select>
                                  </div>
                              </div>
                              <br/>
                          </div>
                          <div className="modal-footer">
                            <button type="button" className="btn btn-default pull-left" onClick={this.closeModal}>Close</button>
                            <button type="submit" className="btn btn-primary">Response</button>
                          </div>
                        </form>
                          </div>
                    </div>
                  </div>
            </React.Fragment>
        );
    }
}

class RespondedQueries extends React.Component{
    constructor() {
        super();
        this.state = {
            queries: [],
        };
        
        this.childKey=0;
        
        let formData = new FormData();
		formData.append('responded_queries', "responded")
      
		axios({
			method: 'post',
			url: api_link+'QueriesFetch.php',
			data: formData,
		})
		.then(response => response.data)
        .then((data) => {
            this.setState({ queries: data })
            $("script[src='js/dataTable.js']").remove();
                
            const script = document.createElement("script");
            script.src = "js/dataTable.js";
            document.body.appendChild(script);
         })
		.catch(function (response) {
			//handle error
			console.log(response)
		});  
    }

    componentDidMount() {
        document.title="Responded Queries"  
    }
    
    shouldComponentUpdate(nextProps,nextState){
      if(JSON.stringify(this.state.queries) === JSON.stringify(nextState.queries))
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
    
    render()
    {    
        return(
            <div className="content-wrapper">
                <section>
                    <div id="update_message" className="alert" style={{display: 'none'}}></div> 
                </section>
                <section className="content-header">
                  <h1> Responded Queries</h1>
                </section>

                <section className="content">
                  <div className="row">
                    <div className="col-xs-12">
                      <div className="box">
                        <div className="box-body table-responsive" key={this.childKey}>
                          <table id="example1" className="table table-striped">
                            <thead>
                              <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Contact</th>
                                <th>Subject</th>  
                                <th>Message</th>
                                <th>Dated</th>
                                <th>Response</th>
                                <th>Responded</th>
                              </tr>
                            </thead>
                            <tbody>
                              {this.state.queries.map((q, key) => (
                                <tr key={q.id}>
                                    <td>{q.name}</td>
                                    <td id={"email"+q.id}>{q.email}</td>
                                    <td id={"contact"+q.id}>{q.contact}</td>
                                    <td id={"subject"+q.id}>{q.subject}</td>
                                    <td>{q.message}</td>
                                    <td>{q.time_stamp}</td>
                                    <td>{q.response}</td>
                                    <td>{q.responded_on}</td>
                                </tr>
                              ))}

                            </tbody>
                            <tfoot>
                            </tfoot>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
            </div>
        );
    }
}

export {
    PendingQueries,
    RespondedQueries,
};