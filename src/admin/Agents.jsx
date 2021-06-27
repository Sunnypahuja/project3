import React from 'react';

import { Link } from "react-router-dom";
import { api_link } from './AdminLogin';
import axios from 'axios';
import $ from 'jquery';
import Select from "react-select";


class AgentDetails extends React.Component{

    constructor() {
        super();
        this.state = {
            refresh: false,
            modalVisible: false,
            editModalVisible: false,
            viewModalVisible: false,
            doingModal: false,
            name: '',
            email: '',
            password: '',
            aadhar: '',
            contact: '',
            address: '',
            pincode: '',
            bank_account: '',
            bank_name: '',
            bank_ifsc: '',
            bank_branch: '',
            total_orders: 0,
            total_sales: 0,
            total_payable: 0,
            total_paid: 0,
            total_outstanding: 0,
            agent_details: [],
            agents: []
        };
        
        this.childKey = 0;    
        this.counterKey = 0;    
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.closeViewModal = this.closeViewModal.bind(this);
    }
    
    componentDidMount() {
        document.title="Marketboi Agents"
        
        let formData = new FormData();
        formData.append('agents', "yes")

        var obj=this
        
        axios({
            method: 'post',
            url: api_link+'AgentsFetch.php',
            data: formData,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
        .then(response => response.data)
        .then((data) => {
            obj.setState({ agents: data})
            const script = document.createElement("script");
            script.src = "js/dataTable.js";
            script.async = true;
            document.body.appendChild(script);
         })
            
    }

    shouldComponentUpdate(nextProps,nextState){
      if(JSON.stringify(this.state.agents) === JSON.stringify(nextState.agents))
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
                ++this.counterKey
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
            email: $("#email"+qid).html(),
            aadhar: $("#aadhar"+qid).val(),
            contact: $("#contact"+qid).html(),
            address: $("#address"+qid).html(),
            pincode: $("#pincode"+qid).html(),
            bank_account: $("#bank_account"+qid).val(),
            bank_name: $("#bank_name"+qid).val(),
            bank_ifsc: $("#bank_ifsc"+qid).val(),
            bank_branch: $("#bank_branch"+qid).val(),
            password: '',
            eid: qid
          })   
    }
    
    openViewModal = qid  => e => {
        let formData = new FormData();
        formData.append('get_agent_details', qid)
      
        var obj=this
        
        axios({
            method: 'post',
            url: api_link+'AgentsFetch.php',
            data: formData,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
        .then(response => response.data)
        .then((data) => {
            obj.setState({ 
              doingModal: true,
              viewModalVisible: !this.state.viewModalVisible,
              name: $("#name"+qid).html(),
              agent_details: data
            })
         })
          
        
      }
    
    closeModal() {
        this.setState({
          doingModal: true,
          editModalVisible: !this.state.editModalVisible
        });
      }

    closeViewModal() {
        this.setState({
          doingModal: true,
          viewModalVisible: !this.state.viewModalVisible
        });
      }

    handleAddFormSubmit( event ) {
		event.preventDefault();
		$("#invalid_message").hide();
        let formData = new FormData();
        formData.append('add', 'yes')
        formData.append('name', this.state.name)
        formData.append('email', this.state.email)
        formData.append('aadhar', this.state.aadhar)
        formData.append('contact', this.state.contact)
        formData.append('address', this.state.address)
        formData.append('pincode', this.state.pincode)
        formData.append('bank_account', this.state.bank_account)
        formData.append('bank_name', this.state.bank_name)
        formData.append('bank_ifsc', this.state.bank_ifsc)
        formData.append('bank_branch', this.state.bank_branch)
        formData.append('password', this.state.password)

        var obj=this

        axios({
            method: 'post',
            url: api_link+'AgentsManagement.php',
            data: formData,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
        .then(function (response) {
            //handle success
//                $(".loader_gif").hide();
            document.getElementById("addAgent").reset();
            obj.openModal()
            if(response.data === "ok")
            {	
                let formData1 = new FormData();
                formData1.append('agents', "yes")

                axios({
                    method: 'post',
                    url: api_link+'AgentsFetch.php',
                    data: formData1,
                    config: { headers: {'Content-Type': 'multipart/form-data' }}
                }).then(response => response.data)
                .then((data) => {
                  obj.setState({ doingModal:false, agents: data})
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

    handleEditFormSubmit( event ) {
		event.preventDefault();
		$("#invalid_message").hide();
        
        let formData = new FormData();
        formData.append('edit', this.state.eid)
        formData.append('name', this.state.name)
        formData.append('name', this.state.email)
        formData.append('aadhar', this.state.aadhar)
        formData.append('contact', this.state.contact)
        formData.append('address', this.state.address)
        formData.append('pincode', this.state.pincode)
        formData.append('bank_account', this.state.bank_account)
        formData.append('bank_name', this.state.bank_name)
        formData.append('bank_ifsc', this.state.bank_ifsc)
        formData.append('bank_branch', this.state.bank_branch)
        
        if(this.state.password !== "")
        {
            formData.append('password', this.state.password)
        }

        var obj=this

        axios({
            method: 'post',
            url: api_link+'AgentsManagement.php',
            data: formData,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
        .then(function (response) {
            //handle success
//                $(".loader_gif").hide();
            document.getElementById("editCategory").reset();
            obj.closeModal()
            if(response.data === "ok")
            {	
                let formData1 = new FormData();
                formData1.append('agents', "yes")
                axios({
                    method: 'post',
                    url: api_link+'AgentsFetch.php',
                    data: formData1,
                    config: { headers: {'Content-Type': 'multipart/form-data' }}
                }).then(response => response.data)
                .then((data) => {
                  obj.setState({ doingModal: false, agents: data})
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

    handleClick( event ) {
		event.preventDefault();
		$("table th:first").addClass("noExport").hide();
        $("table tr").each(function(){
          $(this).children().first().hide();
        });
		
        alert("call")
	}

    blockUser = userid  => e => {
        if(window.confirm('Do You Want To Block The Agent? Y/N'))
        {
            $("#update_message").hide();
            $(".loader_gif").show();
            let formData = new FormData();
            formData.append('block_agent', userid)

            var obj=this

            axios({
                method: 'post',
                url: api_link+'AgentsManagement.php',
                data: formData,
                config: { headers: {'Content-Type': 'multipart/form-data' }}
            })
            .then(function (response) {
                //handle success
                $(".loader_gif").fadeOut("slow");
                if(response.data === "ok")
                {	
                    let formData1 = new FormData();
                    formData1.append('agents', "yes")

                    axios({
                        method: 'post',
                        url: api_link+'AgentsFetch.php',
                        data: formData1,
                        config: { headers: {'Content-Type': 'multipart/form-data' }}
                    }).then(response => response.data)
                    .then((data) => {
                      obj.setState({ doingModal:false, agents: data})
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
      
        let vstyles = this.state.viewModalVisible
          ? { display: "block", overflow: 'auto' }
          : { display: "none" };
        let vmodalFade = this.state.viewModalVisible
          ? { fade: "fade" }
          : { fade: "show" };
        return(
            <React.Fragment>
                <div className="content-wrapper">
                    <section>
                        <div id="update_message" className="alert" style={{display: 'none'}}></div> 
                    </section>
                    <section className="content-header">
                        <h1>Marketboi Agents</h1>
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

                    <section className="content" key={this.counterKey}>
                          <div className="box">
                              <div className="box-body table-responsive">
                                  <br/>
                                {/*<p>
                                     <b>Toggle Columns - </b>
                                     <button style={{border: 'none'}} onClick={this.handleClick.bind(this)}>Hide All</button>
                                  </p>*/}
                                  <table id="example1" className="table">
                                    <thead>
                                    <tr>
                                      <th>Name</th>
                                      <th>Email</th>
                                      <th>Contact</th>
                                      <th>Address</th>
                                      <th>Pincode</th>
                                      <th>No Of Customers</th>
                                      <th>Total Sales</th>
                                      <th>Total Commission</th>
                                      <th>Total Incentive</th>
                                      <th>Total Payable</th>
                                      <th>Total Paid</th>
                                      <th>Net Payable</th>
                                      <th>Last Payment</th>
                                      <th className="noExport">Action</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                      {this.state.agents.map((agent, key) => (
                                      <tr key={agent.id}>
                                          <td id={'name'+agent.id}>{agent.name}</td>
                                          <td id={'email'+agent.id}>{agent.email}</td>
                                          <td id={'contact'+agent.id}>{agent.contact}</td>
                                          <td id={'address'+agent.id}>{agent.address}</td>
                                          <td id={'pincode'+agent.id}>{agent.pincode}</td>
                                          <td id={'total_customers'+agent.id}>{agent.total_customers}</td>
                                          <td id={'total_sales'+agent.id}>{agent.total_amount}</td>
                                          <td id={'total_commission'+agent.id}>{agent.total_commission}</td>
                                          <td id={'incentives'+agent.id}>{agent.total_incentives}</td>
                                          <td id={'payable'+agent.id}>{agent.total_payable}</td>
                                          <td id={'paid'+agent.id}>{agent.total_paid}</td>
                                          <td id={'net_payable'+agent.id}>{agent.net_payable}</td>
                                          <td id={'last_purchase'+agent.id}>{agent.last_payment}</td>
                                          <td>
                                              <input type="hidden" id={'aadhar'+agent.id} value={agent.aadhar} />
                                              <input type="hidden" id={'bank_account'+agent.id} value={agent.bank_account} />
                                              <input type="hidden" id={'bank_name'+agent.id} value={agent.bank_name} />
                                              <input type="hidden" id={'bank_ifsc'+agent.id} value={agent.bank_ifsc} />
                                              <input type="hidden" id={'bank_branch'+agent.id} value={agent.bank_branch} />
                                            
                                              <button type="submit" name="block" className="btn btn-danger" value="20" onClick={this.blockUser(agent.id)}>
                                                         <i className="fa fa-window-close btn-danger"></i> Block
                                              </button>    
                                            
                                              <button type="button" name="edit" className="btn btn-success" value={agent.id} onClick={this.openEditModal(agent.id)} ><i className="fa fa-edit"></i> Edit</button>
                                            
                                              <button type="button" name="view" className="btn btn-primary" value={agent.id} onClick={this.openViewModal(agent.id)} ><i className="fa fa-eye"></i></button>

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
                            <h4 className="modal-title">Add Agent</h4>
                          </div> 
                          <form id="addAgent" onSubmit={this.handleAddFormSubmit.bind(this)}>
                          <div className="modal-body">
                              <div className="row">
                                  <div className="col-md-6">
                                      <label>Name</label>
                                        <input type="text" className="form-control" id="name" name="name" required onChange={e => this.setState({ name: e.target.value })} />
                                  </div>
                                  <div className="col-md-6">
                                      <label>Email</label>
                                        <input type="email" className="form-control" id="email" name="email" required onChange={e => this.setState({ email: e.target.value })} />
                                  </div>
                                  <div className="col-md-12">
                                        <br/>
                                        <label>Aadhar Card Number</label>
                                        <input type="number" min="111111111111" max="999999999999" className="form-control" id="aadhar" name="aadhar" required onChange={e => this.setState({ aadhar: e.target.value })} />
                                  </div>
                                  <div className="col-md-6">
                                        <br/>
                                        <label>Contact</label>
                                        <input type="number" min="1111111111" max="9999999999" className="form-control" id="contact" name="contact" required onChange={e => this.setState({ contact: e.target.value })} />
                                  </div>
                                  <div className="col-md-6">
                                        <br/>
                                        <label>Pincode</label>
                                        <input type="number" min="11111" max="999999" className="form-control" id="pincode" name="pincode" required onChange={e => this.setState({ pincode: e.target.value })} />
                                  </div>
                                  <div className="col-md-12">
                                        <br/>
                                        <label>Address</label>
                                        <input type="text" className="form-control" id="address" name="address" required onChange={e => this.setState({ address: e.target.value })} />
                                  </div>
                                  <div className="col-md-12">
                                        <br/>
                                        <label>Password</label>
                                        <input type="password" className="form-control" id="pass" name="pass" required onChange={e => this.setState({ password: e.target.value })} />
                                  </div>
                                  <div className="col-md-12">
                                        <h3>BANK ACCOUNT DETAILS</h3>
                                  </div>
                                  <div className="col-md-12">
                                        <br/>
                                        <label>Bank Account Number</label>
                                        <input type="number" pattern="[\d]{6,}$" className="form-control" id="bank_account" name="bank_account" required onChange={e => this.setState({ bank_account: e.target.value })} />
                                  </div>
                                  <div className="col-md-12">
                                        <br/>
                                        <label>Bank Name</label>
                                        <input type="text" className="form-control" id="bank_name" name="bank_name" required onChange={e => this.setState({ bank_name: e.target.value })} />
                                  </div>
                                  <div className="col-md-12">
                                        <br/>
                                        <label>Bank IFSC</label>
                                        <input type="text" pattern="[A-Z|a-z]{4}[0][\d]{6}$" className="form-control" id="bank_ifsc" name="bank_ifsc" required onChange={e => this.setState({ bank_ifsc: e.target.value })} />
                                  </div>
                                  <div className="col-md-12">
                                        <br/>
                                        <label>Bank Branch</label>
                                        <input type="text" className="form-control" id="bank_branch" name="bank_branch" required onChange={e => this.setState({ bank_branch: e.target.value })} />
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
                        <h4 className="modal-title">Edit Agent Details</h4>
                      </div>
                      <form id="editCategory" onSubmit={this.handleEditFormSubmit.bind(this)}>
                      <div className="modal-body">
                              <div className="row">
                                  <div className="col-md-6">
                                      <label>Name</label>
                                        <input type="text" className="form-control" id="ename" name="ename" required value={this.state.name} onChange={e => this.setState({ name: e.target.value })} />
                                  </div>
                                  <div className="col-md-6">
                                      <label>Email</label>
                                        <input type="email" className="form-control" id="email" name="email" required value={this.state.email} onChange={e => this.setState({ email: e.target.value })} />
                                  </div>
                                  <div className="col-md-12">
                                        <br/>
                                        <label>Aadhar Card Number</label>
                                        <input type="number" min="111111111111" max="999999999999" className="form-control" id="eaadhar" name="eaadhar" required value={this.state.aadhar} onChange={e => this.setState({ aadhar: e.target.value })} />
                                  </div>
                                  <div className="col-md-6">
                                        <br/>
                                        <label>Contact</label>
                                        <input type="number" min="1111111111" max="9999999999" className="form-control" id="econtact" name="econtact" required value={this.state.contact} onChange={e => this.setState({ contact: e.target.value })} />
                                  </div>
                                  <div className="col-md-6">
                                        <br/>
                                        <label>Pincode</label>
                                        <input type="number" min="11111" max="999999" className="form-control" id="epincode" name="epincode" required value={this.state.pincode} onChange={e => this.setState({ pincode: e.target.value })} />
                                  </div>
                                  <div className="col-md-12">
                                        <br/>
                                        <label>Address</label>
                                        <input type="text" className="form-control" id="eaddress" name="eaddress" required value={this.state.address} onChange={e => this.setState({ address: e.target.value })} />
                                  </div>
                                  <div className="col-md-12">
                                        <br/>
                                        <label>Password</label>
                                        <input type="text" placeholder="Create New Password(Optional)" className="form-control" id="epass" name="epass" defaultValue="" onChange={e => this.setState({ password: e.target.value })} />
                                  </div>
                                  <div className="col-md-12">
                                        <h3>BANK ACCOUNT DETAILS</h3>
                                  </div>
                                  <div className="col-md-12">
                                        <br/>
                                        <label>Bank Account Number</label>
                                        <input type="number" className="form-control" id="ebank_account" name="ebank_account" required value={this.state.bank_account} onChange={e => this.setState({ bank_account: e.target.value })} />
                                  </div>
                                  <div className="col-md-12">
                                        <br/>
                                        <label>Bank Name</label>
                                        <input type="text" className="form-control" id="ebank_name" name="ebank_name" required value={this.state.bank_name} onChange={e => this.setState({ bank_name: e.target.value })} />
                                  </div>
                                  <div className="col-md-12">
                                        <br/>
                                        <label>Bank IFSC</label>
                                        <input type="text"pattern="[A-Z|a-z]{4}[0][\d]{6}$" className="form-control" id="ebank_ifsc" name="ebank_ifsc" required value={this.state.bank_ifsc} onChange={e => this.setState({ bank_ifsc: e.target.value })} />
                                  </div>
                                  <div className="col-md-12">
                                        <br/>
                                        <label>Bank Branch</label>
                                        <input type="text" className="form-control" id="ebank_branch" name="ebank_branch" required value={this.state.bank_branch} onChange={e => this.setState({ bank_branch: e.target.value })} />
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
                  
                  <div className={'modal '+vmodalFade} id="view_modal"  style={vstyles}>
                    <div className="modal-dialog">
                      <div className="modal-content">
                        <div className="modal-header">
                          <button type="button" className="close"  onClick={this.closeViewModal}>
                            <span aria-hidden="true">&times;</span>
                          </button>
                          <h4 className="modal-title">{this.state.name} Sale Details</h4>
                        </div>
                        <div className="modal-body">
                          <div className="row" style={{paddingLeft: '10px', paddingRight: '10px'}}>
                            <table className="table col-md-12 table-bordered">
                                <thead>
                                  <tr>
                                    <th>Category</th>
                                    <th>Sales</th>
                                    <th>Commission</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {this.state.agent_details.map((ad, key) => (
                                  <tr key={key}>
                                      <td>{ad.name}</td>
                                      <td>{ad.sales}</td>
                                      <td>{ad.commission}</td>
                                    </tr>
                                  ))}
                                </tbody>
                                <tfoot></tfoot>
                              </table>  
                            </div>
                        </div>
                        <div className="modal-footer">
                          <button type="button" className="btn btn-default" onClick={this.closeViewModal}>Close</button>
                        </div>
                      </div>
                    </div>
                  </div>
            </React.Fragment>
        );
    }
}

class BlockedAgentDetails extends React.Component{

    constructor() {
        super();
        this.state = {
            refresh: false,
            modalVisible: false,
            editModalVisible: false,
            viewModalVisible: false,
            doingModal: false,
            name: '',
            email: '',
            password: '',
            aadhar: '',
            contact: '',
            address: '',
            pincode: '',
            bank_account: '',
            bank_name: '',
            bank_ifsc: '',
            bank_branch: '',
            total_orders: 0,
            total_sales: 0,
            total_payable: 0,
            total_paid: 0,
            total_outstanding: 0,
            agent_details: [],
            agents: []
        };
        
        this.childKey = 0;    
        this.counterKey = 0;    
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.closeViewModal = this.closeViewModal.bind(this);
    }
    
    componentDidMount() {
        document.title="Marketboi Blocked Agents"
        
        let formData = new FormData();
        formData.append('blocked_agents', "yes")

        var obj=this
        
        axios({
            method: 'post',
            url: api_link+'AgentsFetch.php',
            data: formData,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
        .then(response => response.data)
        .then((data) => {
            obj.setState({ agents: data})
            const script = document.createElement("script");
            script.src = "js/dataTable.js";
            script.async = true;
            document.body.appendChild(script);
         })
            
    }

    shouldComponentUpdate(nextProps,nextState){
      if(JSON.stringify(this.state.agents) === JSON.stringify(nextState.agents))
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
                ++this.counterKey
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
            email: $("#email"+qid).html(),
            aadhar: $("#aadhar"+qid).val(),
            contact: $("#contact"+qid).html(),
            address: $("#address"+qid).html(),
            pincode: $("#pincode"+qid).html(),
            bank_account: $("#bank_account"+qid).val(),
            bank_name: $("#bank_name"+qid).val(),
            bank_ifsc: $("#bank_ifsc"+qid).val(),
            bank_branch: $("#bank_branch"+qid).val(),
            password: '',
            eid: qid
          })   
    }
    
    openViewModal = qid  => e => {
        let formData = new FormData();
        formData.append('get_agent_details', qid)
      
        var obj=this
        
        axios({
            method: 'post',
            url: api_link+'AgentsFetch.php',
            data: formData,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
        .then(response => response.data)
        .then((data) => {
            obj.setState({ 
              doingModal: true,
              viewModalVisible: !this.state.viewModalVisible,
              name: $("#name"+qid).html(),
              agent_details: data
            })
         })
          
        
      }
    
    closeModal() {
        this.setState({
          doingModal: true,
          editModalVisible: !this.state.editModalVisible
        });
      }

    closeViewModal() {
        this.setState({
          doingModal: true,
          viewModalVisible: !this.state.viewModalVisible
        });
      }

    handleAddFormSubmit( event ) {
		event.preventDefault();
		$("#invalid_message").hide();
        let formData = new FormData();
        formData.append('add', 'yes')
        formData.append('name', this.state.name)
        formData.append('email', this.state.email)
        formData.append('aadhar', this.state.aadhar)
        formData.append('contact', this.state.contact)
        formData.append('address', this.state.address)
        formData.append('pincode', this.state.pincode)
        formData.append('bank_account', this.state.bank_account)
        formData.append('bank_name', this.state.bank_name)
        formData.append('bank_ifsc', this.state.bank_ifsc)
        formData.append('bank_branch', this.state.bank_branch)
        formData.append('password', this.state.password)

        var obj=this

        axios({
            method: 'post',
            url: api_link+'AgentsManagement.php',
            data: formData,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
        .then(function (response) {
            //handle success
//                $(".loader_gif").hide();
            document.getElementById("addAgent").reset();
            obj.openModal()
            if(response.data === "ok")
            {	
                let formData1 = new FormData();
                formData1.append('agents', "yes")

                axios({
                    method: 'post',
                    url: api_link+'AgentsFetch.php',
                    data: formData1,
                    config: { headers: {'Content-Type': 'multipart/form-data' }}
                }).then(response => response.data)
                .then((data) => {
                  obj.setState({ doingModal:false, agents: data})
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

    handleEditFormSubmit( event ) {
		event.preventDefault();
		$("#invalid_message").hide();
        
        let formData = new FormData();
        formData.append('edit', this.state.eid)
        formData.append('name', this.state.name)
        formData.append('name', this.state.email)
        formData.append('aadhar', this.state.aadhar)
        formData.append('contact', this.state.contact)
        formData.append('address', this.state.address)
        formData.append('pincode', this.state.pincode)
        formData.append('bank_account', this.state.bank_account)
        formData.append('bank_name', this.state.bank_name)
        formData.append('bank_ifsc', this.state.bank_ifsc)
        formData.append('bank_branch', this.state.bank_branch)
        
        if(this.state.password !== "")
        {
            formData.append('password', this.state.password)
        }

        var obj=this

        axios({
            method: 'post',
            url: api_link+'AgentsManagement.php',
            data: formData,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
        .then(function (response) {
            //handle success
//                $(".loader_gif").hide();
            document.getElementById("editCategory").reset();
            obj.closeModal()
            if(response.data === "ok")
            {	
                let formData1 = new FormData();
                formData1.append('agents', "yes")
                axios({
                    method: 'post',
                    url: api_link+'AgentsFetch.php',
                    data: formData1,
                    config: { headers: {'Content-Type': 'multipart/form-data' }}
                }).then(response => response.data)
                .then((data) => {
                  obj.setState({ doingModal: false, agents: data})
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

    handleClick( event ) {
		event.preventDefault();
		$("table th:first").addClass("noExport").hide();
        $("table tr").each(function(){
          $(this).children().first().hide();
        });
		
        alert("call")
	}

    unblockUser = userid  => e => {
        if(window.confirm('Do You Want To Unblock The Agent? Y/N'))
        {
            $("#update_message").hide();
            $(".loader_gif").show();
            let formData = new FormData();
            formData.append('enable_agent', userid)

            var obj=this

            axios({
                method: 'post',
                url: api_link+'AgentsManagement.php',
                data: formData,
                config: { headers: {'Content-Type': 'multipart/form-data' }}
            })
            .then(function (response) {
                //handle success
                $(".loader_gif").fadeOut("slow");
                if(response.data === "ok")
                {	
                    let formData1 = new FormData();
                    formData1.append('blocked_agents', "yes")
                    axios({
                        method: 'post',
                        url: api_link+'AgentsFetch.php',
                        data: formData1,
                        config: { headers: {'Content-Type': 'multipart/form-data' }}
                    })
                    .then(response => response.data)
                    .then((data) => {
                        obj.setState({ agents: data})
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
      
        let vstyles = this.state.viewModalVisible
          ? { display: "block", overflow: 'auto' }
          : { display: "none" };
        let vmodalFade = this.state.viewModalVisible
          ? { fade: "fade" }
          : { fade: "show" };
        return(
            <React.Fragment>
                <div className="content-wrapper">
                    <section>
                        <div id="update_message" className="alert" style={{display: 'none'}}></div> 
                    </section>
                    <section className="content-header">
                        <h1>Marketboi Agents</h1>
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

                    <section className="content" key={this.counterKey}>
                          <div className="box">
                              <div className="box-body table-responsive">
                                  <br/>
                                {/*<p>
                                     <b>Toggle Columns - </b>
                                     <button style={{border: 'none'}} onClick={this.handleClick.bind(this)}>Hide All</button>
                                  </p>*/}
                                  <table id="example1" className="table">
                                    <thead>
                                    <tr>
                                      <th>Name</th>
                                      <th>Email</th>
                                      <th>Contact</th>
                                      <th>Address</th>
                                      <th>Pincode</th>
                                      <th>No Of Customers</th>
                                      <th>Total Sales</th>
                                      <th>Total Commission</th>
                                      <th>Total Incentive</th>
                                      <th>Total Payable</th>
                                      <th>Total Paid</th>
                                      <th>Net Payable</th>
                                      <th>Last Payment</th>
                                      <th className="noExport">Action</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                      {this.state.agents.map((agent, key) => (
                                      <tr key={agent.id}>
                                          <td id={'name'+agent.id}>{agent.name}</td>
                                          <td id={'email'+agent.id}>{agent.email}</td>
                                          <td id={'contact'+agent.id}>{agent.contact}</td>
                                          <td id={'address'+agent.id}>{agent.address}</td>
                                          <td id={'pincode'+agent.id}>{agent.pincode}</td>
                                          <td id={'total_customers'+agent.id}>{agent.total_customers}</td>
                                          <td id={'total_sales'+agent.id}>{agent.total_amount}</td>
                                          <td id={'total_commission'+agent.id}>{agent.total_commission}</td>
                                          <td id={'incentives'+agent.id}>{agent.total_incentives}</td>
                                          <td id={'payable'+agent.id}>{agent.total_payable}</td>
                                          <td id={'paid'+agent.id}>{agent.total_paid}</td>
                                          <td id={'net_payable'+agent.id}>{agent.net_payable}</td>
                                          <td id={'last_purchase'+agent.id}>{agent.last_payment}</td>
                                          <td>
                                              <input type="hidden" id={'aadhar'+agent.id} value={agent.aadhar} />
                                              <input type="hidden" id={'bank_account'+agent.id} value={agent.bank_account} />
                                              <input type="hidden" id={'bank_name'+agent.id} value={agent.bank_name} />
                                              <input type="hidden" id={'bank_ifsc'+agent.id} value={agent.bank_ifsc} />
                                              <input type="hidden" id={'bank_branch'+agent.id} value={agent.bank_branch} />
                                            
                                              <button type="submit" name="block" className="btn btn-success" onClick={this.unblockUser(agent.id)}>
                                                         <i className="fa fa-ban btn-success"></i> Unblock
                                              </button>    
                                            
                                              <button type="button" name="edit" className="btn btn-success" value={agent.id} onClick={this.openEditModal(agent.id)} ><i className="fa fa-edit"></i> Edit</button>
                                            
                                              <button type="button" name="view" className="btn btn-primary" value={agent.id} onClick={this.openViewModal(agent.id)} ><i className="fa fa-eye"></i></button>

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
                            <h4 className="modal-title">Add Agent</h4>
                          </div> 
                          <form id="addAgent" onSubmit={this.handleAddFormSubmit.bind(this)}>
                          <div className="modal-body">
                              <div className="row">
                                  <div className="col-md-6">
                                      <label>Name</label>
                                        <input type="text" className="form-control" id="name" name="name" required onChange={e => this.setState({ name: e.target.value })} />
                                  </div>
                                  <div className="col-md-6">
                                      <label>Email</label>
                                        <input type="email" className="form-control" id="email" name="email" required onChange={e => this.setState({ email: e.target.value })} />
                                  </div>
                                  <div className="col-md-12">
                                        <br/>
                                        <label>Aadhar Card Number</label>
                                        <input type="number" min="111111111111" max="999999999999" className="form-control" id="aadhar" name="aadhar" required onChange={e => this.setState({ aadhar: e.target.value })} />
                                  </div>
                                  <div className="col-md-6">
                                        <br/>
                                        <label>Contact</label>
                                        <input type="number" min="1111111111" max="9999999999" className="form-control" id="contact" name="contact" required onChange={e => this.setState({ contact: e.target.value })} />
                                  </div>
                                  <div className="col-md-6">
                                        <br/>
                                        <label>Pincode</label>
                                        <input type="number" min="11111" max="999999" className="form-control" id="pincode" name="pincode" required onChange={e => this.setState({ pincode: e.target.value })} />
                                  </div>
                                  <div className="col-md-12">
                                        <br/>
                                        <label>Address</label>
                                        <input type="text" className="form-control" id="address" name="address" required onChange={e => this.setState({ address: e.target.value })} />
                                  </div>
                                  <div className="col-md-12">
                                        <br/>
                                        <label>Password</label>
                                        <input type="password" className="form-control" id="pass" name="pass" required onChange={e => this.setState({ password: e.target.value })} />
                                  </div>
                                  <div className="col-md-12">
                                        <h3>BANK ACCOUNT DETAILS</h3>
                                  </div>
                                  <div className="col-md-12">
                                        <br/>
                                        <label>Bank Account Number</label>
                                        <input type="number" pattern="[\d]{6,}$" className="form-control" id="bank_account" name="bank_account" required onChange={e => this.setState({ bank_account: e.target.value })} />
                                  </div>
                                  <div className="col-md-12">
                                        <br/>
                                        <label>Bank Name</label>
                                        <input type="text" className="form-control" id="bank_name" name="bank_name" required onChange={e => this.setState({ bank_name: e.target.value })} />
                                  </div>
                                  <div className="col-md-12">
                                        <br/>
                                        <label>Bank IFSC</label>
                                        <input type="text"pattern="[A-Z|a-z]{4}[0][\d]{6}$" className="form-control" id="bank_ifsc" name="bank_ifsc" required onChange={e => this.setState({ bank_ifsc: e.target.value })} />
                                  </div>
                                  <div className="col-md-12">
                                        <br/>
                                        <label>Bank Branch</label>
                                        <input type="text" className="form-control" id="bank_branch" name="bank_branch" required onChange={e => this.setState({ bank_branch: e.target.value })} />
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
                        <h4 className="modal-title">Edit Agent Details</h4>
                      </div>
                      <form id="editCategory" onSubmit={this.handleEditFormSubmit.bind(this)}>
                      <div className="modal-body">
                              <div className="row">
                                  <div className="col-md-6">
                                      <label>Name</label>
                                        <input type="text" className="form-control" id="ename" name="ename" required value={this.state.name} onChange={e => this.setState({ name: e.target.value })} />
                                  </div>
                                  <div className="col-md-6">
                                      <label>Email</label>
                                        <input type="email" className="form-control" id="email" name="email" required value={this.state.email} onChange={e => this.setState({ email: e.target.value })} />
                                  </div>
                                  <div className="col-md-12">
                                        <br/>
                                        <label>Aadhar Card Number</label>
                                        <input type="number" min="111111111111" max="999999999999" className="form-control" id="eaadhar" name="eaadhar" required value={this.state.aadhar} onChange={e => this.setState({ aadhar: e.target.value })} />
                                  </div>
                                  <div className="col-md-6">
                                        <br/>
                                        <label>Contact</label>
                                        <input type="number" min="1111111111" max="9999999999" className="form-control" id="econtact" name="econtact" required value={this.state.contact} onChange={e => this.setState({ contact: e.target.value })} />
                                  </div>
                                  <div className="col-md-6">
                                        <br/>
                                        <label>Pincode</label>
                                        <input type="number" min="11111" max="999999" className="form-control" id="epincode" name="epincode" required value={this.state.pincode} onChange={e => this.setState({ pincode: e.target.value })} />
                                  </div>
                                  <div className="col-md-12">
                                        <br/>
                                        <label>Address</label>
                                        <input type="text" className="form-control" id="eaddress" name="eaddress" required value={this.state.address} onChange={e => this.setState({ address: e.target.value })} />
                                  </div>
                                  <div className="col-md-12">
                                        <br/>
                                        <label>Password</label>
                                        <input type="text" placeholder="Create New Password(Optional)" className="form-control" id="epass" name="epass" defaultValue="" onChange={e => this.setState({ password: e.target.value })} />
                                  </div>
                                  <div className="col-md-12">
                                        <h3>BANK ACCOUNT DETAILS</h3>
                                  </div>
                                  <div className="col-md-12">
                                        <br/>
                                        <label>Bank Account Number</label>
                                        <input type="number" className="form-control" id="ebank_account" name="ebank_account" required value={this.state.bank_account} onChange={e => this.setState({ bank_account: e.target.value })} />
                                  </div>
                                  <div className="col-md-12">
                                        <br/>
                                        <label>Bank Name</label>
                                        <input type="text" className="form-control" id="ebank_name" name="ebank_name" required value={this.state.bank_name} onChange={e => this.setState({ bank_name: e.target.value })} />
                                  </div>
                                  <div className="col-md-12">
                                        <br/>
                                        <label>Bank IFSC</label>
                                        <input type="text"pattern="[A-Z|a-z]{4}[0][\d]{6}$" className="form-control" id="ebank_ifsc" name="ebank_ifsc" required value={this.state.bank_ifsc} onChange={e => this.setState({ bank_ifsc: e.target.value })} />
                                  </div>
                                  <div className="col-md-12">
                                        <br/>
                                        <label>Bank Branch</label>
                                        <input type="text" className="form-control" id="ebank_branch" name="ebank_branch" required value={this.state.bank_branch} onChange={e => this.setState({ bank_branch: e.target.value })} />
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
                  
                  <div className={'modal '+vmodalFade} id="view_modal"  style={vstyles}>
                    <div className="modal-dialog">
                      <div className="modal-content">
                        <div className="modal-header">
                          <button type="button" className="close"  onClick={this.closeViewModal}>
                            <span aria-hidden="true">&times;</span>
                          </button>
                          <h4 className="modal-title">{this.state.name} Sale Details</h4>
                        </div>
                        <div className="modal-body">
                          <div className="row" style={{paddingLeft: '10px', paddingRight: '10px'}}>
                            <table className="table col-md-12 table-bordered">
                                <thead>
                                  <tr>
                                    <th>Category</th>
                                    <th>Sales</th>
                                    <th>Commission</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {this.state.agent_details.map((ad, key) => (
                                  <tr key={key}>
                                      <td>{ad.name}</td>
                                      <td>{ad.sales}</td>
                                      <td>{ad.commission}</td>
                                    </tr>
                                  ))}
                                </tbody>
                                <tfoot></tfoot>
                              </table>  
                            </div>
                        </div>
                        <div className="modal-footer">
                          <button type="button" className="btn btn-default" onClick={this.closeViewModal}>Close</button>
                        </div>
                      </div>
                    </div>
                  </div>
            </React.Fragment>
        );
    }
}

class AgentIncentiveSetup extends React.Component{

    constructor() {
        super();
        this.state = {
            refresh: false,
            modalVisible: false,
            editModalVisible: false,
            doingModal: false,
            range_end: '',
            amount: '',
            incentives: []
        };
        
        this.childKey = 0;    
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.deleteIncentive = this.deleteIncentive.bind(this);
    }
    
    componentDidMount() {
        document.title="Incentives Setup"
        
        let formData = new FormData();
        formData.append('incentives', "yes")

        var obj=this
        
        axios({
            method: 'post',
            url: api_link+'AgentsFetch.php',
            data: formData,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
        .then(response => response.data)
        .then((data) => {
            obj.setState({ incentives: data})
            $("script[src='js/dataTable.js']").remove();
                
            const script = document.createElement("script");
            script.src = "js/dataTable.js";
            script.async = true;
            document.body.appendChild(script);
         })
            
    }

    shouldComponentUpdate(nextProps,nextState){
      if(JSON.stringify(this.state.incentives) === JSON.stringify(nextState.incentives))
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
            range_end: $("#range_end"+qid).html(),
            amount: $("#amount"+qid).html(),
            eid: qid
          })
        
      }
    
    closeModal() {
        this.setState({
          doingModal: true,
          editModalVisible: !this.state.editModalVisible
        });
      }

    handleAddFormSubmit( event ) {
		event.preventDefault();
		$("#invalid_message").hide();
        let formData = new FormData();
        formData.append('add_incentive', 'yes')
        formData.append('range_end', this.state.range_end)
        formData.append('amount', this.state.amount)
        
        var obj=this

        axios({
            method: 'post',
            url: api_link+'AgentsManagement.php',
            data: formData,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
        .then(function (response) {
            //handle success
//                $(".loader_gif").hide();
            document.getElementById("addIncentive").reset();
            obj.openModal()
            if(response.data === "ok")
            {	
                let formData1 = new FormData();
                formData1.append('incentives', "yes")

                axios({
                    method: 'post',
                    url: api_link+'AgentsFetch.php',
                    data: formData1,
                    config: { headers: {'Content-Type': 'multipart/form-data' }}
                }).then(response => response.data)
                .then((data) => {
                  obj.setState({ doingModal:false, incentives: data})
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

    handleEditFormSubmit( event ) {
		event.preventDefault();
		$("#invalid_message").hide();
        
        let formData = new FormData();
        formData.append('edit_incentive', this.state.eid)
        formData.append('range_end', this.state.range_end)
        formData.append('amount', this.state.amount)

        var obj=this

        axios({
            method: 'post',
            url: api_link+'AgentsManagement.php',
            data: formData,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
        .then(function (response) {
            //handle success
//                $(".loader_gif").hide();
            document.getElementById("editIncentive").reset();
            obj.closeModal()
            if(response.data === "ok")
            {	
                let formData1 = new FormData();
                formData1.append('incentives', "yes")
                axios({
                    method: 'post',
                    url: api_link+'AgentsFetch.php',
                    data: formData1,
                    config: { headers: {'Content-Type': 'multipart/form-data' }}
                }).then(response => response.data)
                .then((data) => {
                  obj.setState({ doingModal: false, incentives: data})
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

    deleteIncentive = qid  => e => {
      
          if(window.confirm("Are You Sure To Delete This Incentive Data?")) 
          {
              let formData = new FormData();
              formData.append('delete_incentive', qid)
              var obj=this

              axios({
                  method: 'post',
                  url: api_link+'AgentsManagement.php',
                  data: formData,
                  config: { headers: {'Content-Type': 'multipart/form-data' }}
              })
              .then(function (response) {
                  //handle success
                  if(response.data === "ok")
                  {	
                      let formData1 = new FormData();
                      formData1.append('incentives', "yes")
                      axios({
                          method: 'post',
                          url: api_link+'AgentsFetch.php',
                          data: formData1,
                          config: { headers: {'Content-Type': 'multipart/form-data' }}
                      }).then(response => response.data)
                      .then((data) => {
                        obj.setState({ doingModal: false, incentives: data})
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
                        <h1>Incentives Setup</h1>
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
                                      <th>Sales Above</th>
                                      <th>Amount</th>
                                      <th>Action</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                      {this.state.incentives.map((incentive, key) => (
                                      <tr key={incentive.id}>
                                          <td id={'range_end'+incentive.id}>{incentive.range_end}</td>
                                          <td id={'amount'+incentive.id}>{incentive.amount}</td>
                                          <td>
                                              <button type="button" name="edit" className="btn btn-success" value={incentive.id} onClick={this.openEditModal(incentive.id)} ><i className="fa fa-edit"></i> Edit</button>
                                              <button type="button" name="edit" className="btn btn-danger" value={incentive.id} style={{marginLeft: '5px'}} onClick={this.deleteIncentive(incentive.id)} ><i className="fa fa-trash"></i> Delete</button>
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
                            <h4 className="modal-title">Add Incentive</h4>
                          </div> 
                          <form id="addIncentive" onSubmit={this.handleAddFormSubmit.bind(this)}>
                          <div className="modal-body">
                              <div className="row">
                                  <div className="col-md-12">
                                        <label>Sales Above</label>
                                        <input type="number" className="form-control" id="range_end" name="range_end" required onChange={e => this.setState({ range_end: e.target.value })} />
                                  </div>
                                  <div className="col-md-12">
                                        <br/>
                                        <label>Amount</label>
                                        <input type="number" className="form-control" id="amount" name="amount" required onChange={e => this.setState({ amount: e.target.value })} />
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
                        <h4 className="modal-title">Edit Incentive</h4>
                      </div>
                      <form id="editIncentive" onSubmit={this.handleEditFormSubmit.bind(this)}>
                      <div className="modal-body">
                              <div className="row">
                                  <div className="col-md-12">
                                        <label>Sales Above</label>
                                        <input type="number" className="form-control" id="erange_end" name="erange_end" required value={this.state.range_end} onChange={e => this.setState({ range_end: e.target.value })} />
                                  </div>
                                  <div className="col-md-12">
                                        <br/>
                                        <label>Amount</label>
                                        <input type="number" className="form-control" id="eamount" name="eamount" required value={this.state.amount} onChange={e => this.setState({ amount: e.target.value })} />
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

class AddDeliveryRate extends React.Component{

    constructor() {
        super();
        this.state = {
            pincode: '',
            standard_from: '12:00AM',
            standard_to: '12:00AM',
            slot1_from: 'N.A.',
            slot1_to: 'N.A.',
            slot2_from: 'N.A.',
            slot2_to: 'N.A.',
            slot3_from: 'N.A.',
            slot3_to: 'N.A.',
            free_above: '',
            time_fee: '',
            selected_categories: null,
            selected_home_and_kitchen: null,
            selected_brands: null,
            categories: [],
            home_and_kitchen: [],
            brands: [],
			delivery_rates:[],
        };
        
        this.childKey = 0;    

        //FETCH HOME AND KITCHEN CATEGORIES
        let formData = new FormData();
        formData.append('type', "home")
        formData.append('multi', "yes")
        axios({
                method: 'post',
                url: api_link+'CategoriesFetch.php',
                data: formData,
                config: { headers: {'Content-Type': 'multipart/form-data' }}
        }).then(response => response.data)
        .then((data) => {
          this.setState({ home_and_kitchen: data })
         })
        
        //FETCH BRANDS CATEGORIES
        let formData1 = new FormData();
        formData1.append('type', "brands")
        formData1.append('multi', "yes")
        axios({
                method: 'post',
                url: api_link+'CategoriesFetch.php',
                data: formData1,
                config: { headers: {'Content-Type': 'multipart/form-data' }}
        }).then(response => response.data)
        .then((data) => {
          this.setState({ brands: data })
         })
        
        //FETCH MENU CATEGORIES
        const url = api_link+'CategoriesFetch.php?multi=yes'
        axios.get(url).then(response => response.data)
        .then((data) => {
          this.setState({ categories: data })
         })
    }
    
    componentDidMount() {
        document.title="Add Delivery Rate"
    }
  
    handleBrandsChange = selected_brands => {
        this.setState({ selected_brands });
    };

    handleHomeChange = selected_home_and_kitchen => {
        this.setState({ selected_home_and_kitchen });
    };

    handleCategoryChange = selected_categories => {
        this.setState({ selected_categories });
    };
  
    handleAddFormSubmit( event ) {
		event.preventDefault();
		
        var all_good=true;
      
        /*if(!this.state.selected_categories)
        {
            $("#category_message").show();
            all_good=false;
        }
        else
        {
            $("#category_message").hide();
        }
      
        if(!this.state.selected_home_and_kitchen)
        {
            $("#home_message").show();
            all_good=false;
        }
        else
        {
            $("#home_message").hide();
        }
      
        if(!this.state.selected_brands)
        {
            $("#brand_message").show();
            all_good=false;
        }
        else
        {
            $("#brand_message").hide();
        }*/
      
        if(all_good)
        {
			//CREATE ARRAY OF DELIVERY RATES 
			let d_rates = [];
			$( ".upto_amount" ).each( function( index, element ){
				d_rates.push($( this ).val()+":"+$(".upto_charge").eq(index).val());
			});
			
			
            $("#invalid_message").hide();
            let formData = new FormData();
            formData.append('add_delivery_rate', 'yes')
            formData.append('pincode', this.state.pincode)
            formData.append('free_above', this.state.free_above)
          
            formData.append('standard_from', this.refs.standard_from.value)
            formData.append('standard_to', this.refs.standard_to.value)
            formData.append('slot1_from', this.refs.slot1_from.value)
            formData.append('slot1_to', this.refs.slot1_to.value)
            formData.append('slot2_from', this.refs.slot2_from.value)
            formData.append('slot2_to', this.refs.slot2_to.value)
            formData.append('slot3_from', this.refs.slot3_from.value)
            formData.append('slot3_to', this.refs.slot3_to.value)
          
            formData.append('time_fee', this.state.time_fee)
            formData.append('categories', JSON.stringify(this.state.selected_categories))
            formData.append('home_and_kitchen', JSON.stringify(this.state.selected_home_and_kitchen))
            formData.append('brands', JSON.stringify(this.state.selected_brands))
			
			formData.append('delivery_rates',JSON.stringify(d_rates));
          
            var obj=this

            axios({
                method: 'post',
                url: api_link+'AgentsManagement.php',
                data: formData,
                config: { headers: {'Content-Type': 'multipart/form-data' }}
            })
            .then(function (response) {
                //handle success
                document.getElementById("addRate").reset(); 
                obj.setState({
                  selected_categories: null,
                  selected_home_and_kitchen: null,
                  selected_brands: null,
                })
                if(response.data === "ok")
                {	
                    $("#update_msg").html("<strong>Success! </strong> Your Request Successfully Processed")
                    $("#update_msg").removeClass("alert-danger").addClass("alert-success")
                }
                else
                {
                    $("#update_msg").html("<strong>Error! </strong> Unable to Process Your Request")
                    $("#update_msg").removeClass("alert-success").addClass("alert-danger")
                }
                $("#update_msg").show()
                window.scrollTo({top: 0, behavior: 'smooth'});
                 setTimeout(function(){ $("#update_msg").hide(); }, 4000);


            })
            .catch(function (response) {
                //handle error
                $(".loader_gif").fadeOut("slow");
                console.log(response)
            });
        }
	}

    addMoreFields( event ) {
		event.preventDefault();
        let inhtml=`<div class="col-md-4">
                        <br/>
                        <input class="form-control upto_amount" type="number" required />
                    </div>
                    <div class="col-md-4">
                        <br/>
                        <input class="form-control upto_charge" type="number" required />
                    </div>
                    <div class="col-md-offset-4" style="clear:both"></div>`;
        
        if($("#standard_rates div").length === 3)
        {
            $("#removeFields").show();
        }
      
        $("#standard_rates").append(inhtml);
	}

    removeFields( event ) {
		event.preventDefault();
		
		$("#standard_rates div:last").remove()
		$("#standard_rates div:last").remove()
		$("#standard_rates div:last").remove()
		
        if($("#standard_rates div").length === 3)
        {
            $("#removeFields").hide();
        }
	}
    
    render()
    {
        return(
            <React.Fragment>
                <div className="content-wrapper">
                    <section className="content-header">
                        <h1>Add Delivery Rate</h1>
                        <ol className="breadcrumb">
                              <li>
                                  <div className="pull-right"> 
                                      <Link to="/admin/shipping_charges" className="btn btn-success">
                                            <i className="fa fa-truck"></i> Back to Delivery Rates
                                      </Link>
                                  </div>
                              </li>
                        </ol>
                    </section>
                    <section>
                        <div id="update_msg" className="alert" style={{display: 'none'}}></div> 
                    </section>
                    <section className="content" style={{overflow: 'auto'}} key={this.childKey}>
                          <div className="box">
                              <div className="box-body">
                                  <br/>
                                  <form id="addRate" onSubmit={this.handleAddFormSubmit.bind(this)}>
                                      <div className="modal-body">
                                          <div className="row">
                                              <div className="col-xs-6">
                                                  <label>Pincode</label>
                                                    <input type="number" className="form-control" id="pincode" name="pincode" required onChange={e => this.setState({ pincode: e.target.value })} />
                                              </div>
                                              <div className="col-xs-6">
                                                  <label>Free Above</label>
                                                    <input type="number" className="form-control" id="free_above" name="free_above" required onChange={e => this.setState({ free_above: e.target.value })} />
                                              </div>
                                              <div className="col-md-6">
                                                  <br/>
                                                  <label>Standard Delivery Time</label>
                                                  <div className="row">
                                                      <div className="col-xs-6">
                                                          <label>From</label>
                                                          <select className="form-control col-xs-6" id="standard_from" name="standard_from" required ref="standard_from">
                                                            <option value="12:00AM">12:00AM</option>
                                                            <option value="12:30AM">12:30AM</option>
                                                            <option value="1:00AM">1:00AM</option>
                                                            <option value="1:30AM">1:30AM</option>
                                                            <option value="2:00AM">2:00AM</option>
                                                            <option value="2:30AM">2:30AM</option>
                                                            <option value="3:00AM">3:00AM</option>
                                                            <option value="3:30AM">3:30AM</option>
                                                            <option value="4:00AM">4:00AM</option>
                                                            <option value="4:30AM">4:30AM</option>
                                                            <option value="5:00AM">5:00AM</option>
                                                            <option value="5:30AM">5:30AM</option>
                                                            <option value="6:00AM">6:00AM</option>
                                                            <option value="6:30AM">6:30AM</option>
                                                            <option value="7:00AM">7:00AM</option>
                                                            <option value="7:30AM">7:30AM</option>
                                                            <option value="8:00AM">8:00AM</option>
                                                            <option value="8:30AM">8:30AM</option>
                                                            <option value="9:00AM">9:00AM</option>
                                                            <option value="9:30AM">9:30AM</option>
                                                            <option value="10:00AM">10:00AM</option>
                                                            <option value="10:30AM">10:30AM</option>
                                                            <option value="11:00AM">11:00AM</option>
                                                            <option value="11:30AM">11:30AM</option>
                                                            <option value="12:00PM">12:00PM</option>
                                                            <option value="12:30PM">12:30PM</option>
                                                            <option value="1:00PM">1:00PM</option>
                                                            <option value="1:30PM">1:30PM</option>
                                                            <option value="2:00PM">2:00PM</option>
                                                            <option value="2:30PM">2:30PM</option>
                                                            <option value="3:00PM">3:00PM</option>
                                                            <option value="3:30PM">3:30PM</option>
                                                            <option value="4:00PM">4:00PM</option>
                                                            <option value="4:30PM">4:30PM</option>
                                                            <option value="5:00PM">5:00PM</option>
                                                            <option value="5:30PM">5:30PM</option>
                                                            <option value="6:00PM">6:00PM</option>
                                                            <option value="6:30PM">6:30PM</option>
                                                            <option value="7:00PM">7:00PM</option>
                                                            <option value="7:30PM">7:30PM</option>
                                                            <option value="8:00PM">8:00PM</option>
                                                            <option value="8:30PM">8:30PM</option>
                                                            <option value="9:00PM">9:00PM</option>
                                                            <option value="9:30PM">9:30PM</option>
                                                            <option value="10:00PM">10:00PM</option>
                                                            <option value="10:30PM">10:30PM</option>
                                                            <option value="11:00PM">11:00PM</option>
                                                            <option value="11:30PM">11:30PM</option>
                                                        </select>
                                                      </div>
                                                      <div className="col-xs-6">
                                                          <label>To</label>
                                                          <select className="form-control col-xs-6" id="standard_to" name="standard_to" required ref="standard_to">
                                                            <option value="12:00AM">12:00AM</option>
                                                            <option value="12:30AM">12:30AM</option>
                                                            <option value="1:00AM">1:00AM</option>
                                                            <option value="1:30AM">1:30AM</option>
                                                            <option value="2:00AM">2:00AM</option>
                                                            <option value="2:30AM">2:30AM</option>
                                                            <option value="3:00AM">3:00AM</option>
                                                            <option value="3:30AM">3:30AM</option>
                                                            <option value="4:00AM">4:00AM</option>
                                                            <option value="4:30AM">4:30AM</option>
                                                            <option value="5:00AM">5:00AM</option>
                                                            <option value="5:30AM">5:30AM</option>
                                                            <option value="6:00AM">6:00AM</option>
                                                            <option value="6:30AM">6:30AM</option>
                                                            <option value="7:00AM">7:00AM</option>
                                                            <option value="7:30AM">7:30AM</option>
                                                            <option value="8:00AM">8:00AM</option>
                                                            <option value="8:30AM">8:30AM</option>
                                                            <option value="9:00AM">9:00AM</option>
                                                            <option value="9:30AM">9:30AM</option>
                                                            <option value="10:00AM">10:00AM</option>
                                                            <option value="10:30AM">10:30AM</option>
                                                            <option value="11:00AM">11:00AM</option>
                                                            <option value="11:30AM">11:30AM</option>
                                                            <option value="12:00PM">12:00PM</option>
                                                            <option value="12:30PM">12:30PM</option>
                                                            <option value="1:00PM">1:00PM</option>
                                                            <option value="1:30PM">1:30PM</option>
                                                            <option value="2:00PM">2:00PM</option>
                                                            <option value="2:30PM">2:30PM</option>
                                                            <option value="3:00PM">3:00PM</option>
                                                            <option value="3:30PM">3:30PM</option>
                                                            <option value="4:00PM">4:00PM</option>
                                                            <option value="4:30PM">4:30PM</option>
                                                            <option value="5:00PM">5:00PM</option>
                                                            <option value="5:30PM">5:30PM</option>
                                                            <option value="6:00PM">6:00PM</option>
                                                            <option value="6:30PM">6:30PM</option>
                                                            <option value="7:00PM">7:00PM</option>
                                                            <option value="7:30PM">7:30PM</option>
                                                            <option value="8:00PM">8:00PM</option>
                                                            <option value="8:30PM">8:30PM</option>
                                                            <option value="9:00PM">9:00PM</option>
                                                            <option value="9:30PM">9:30PM</option>
                                                            <option value="10:00PM">10:00PM</option>
                                                            <option value="10:30PM">10:30PM</option>
                                                            <option value="11:00PM">11:00PM</option>
                                                            <option value="11:30PM">11:30PM</option>
                                                        </select>
                                                      </div>
                                                  </div>
                                              </div>
                                              <div className="col-md-6">
                                                  <br/>
                                                  <label>Slot 1 Time</label>
                                                  <div className="row">
                                                      <div className="col-xs-6">
                                                          <label>From</label>
                                                          <select className="form-control col-xs-6" id="slot1_from" name="slot1_from" required ref="slot1_from">
                                                            <option value="N.A.">N.A.</option>
                                                            <option value="12:00AM">12:00AM</option>
                                                            <option value="12:30AM">12:30AM</option>
                                                            <option value="1:00AM">1:00AM</option>
                                                            <option value="1:30AM">1:30AM</option>
                                                            <option value="2:00AM">2:00AM</option>
                                                            <option value="2:30AM">2:30AM</option>
                                                            <option value="3:00AM">3:00AM</option>
                                                            <option value="3:30AM">3:30AM</option>
                                                            <option value="4:00AM">4:00AM</option>
                                                            <option value="4:30AM">4:30AM</option>
                                                            <option value="5:00AM">5:00AM</option>
                                                            <option value="5:30AM">5:30AM</option>
                                                            <option value="6:00AM">6:00AM</option>
                                                            <option value="6:30AM">6:30AM</option>
                                                            <option value="7:00AM">7:00AM</option>
                                                            <option value="7:30AM">7:30AM</option>
                                                            <option value="8:00AM">8:00AM</option>
                                                            <option value="8:30AM">8:30AM</option>
                                                            <option value="9:00AM">9:00AM</option>
                                                            <option value="9:30AM">9:30AM</option>
                                                            <option value="10:00AM">10:00AM</option>
                                                            <option value="10:30AM">10:30AM</option>
                                                            <option value="11:00AM">11:00AM</option>
                                                            <option value="11:30AM">11:30AM</option>
                                                            <option value="12:00PM">12:00PM</option>
                                                            <option value="12:30PM">12:30PM</option>
                                                            <option value="1:00PM">1:00PM</option>
                                                            <option value="1:30PM">1:30PM</option>
                                                            <option value="2:00PM">2:00PM</option>
                                                            <option value="2:30PM">2:30PM</option>
                                                            <option value="3:00PM">3:00PM</option>
                                                            <option value="3:30PM">3:30PM</option>
                                                            <option value="4:00PM">4:00PM</option>
                                                            <option value="4:30PM">4:30PM</option>
                                                            <option value="5:00PM">5:00PM</option>
                                                            <option value="5:30PM">5:30PM</option>
                                                            <option value="6:00PM">6:00PM</option>
                                                            <option value="6:30PM">6:30PM</option>
                                                            <option value="7:00PM">7:00PM</option>
                                                            <option value="7:30PM">7:30PM</option>
                                                            <option value="8:00PM">8:00PM</option>
                                                            <option value="8:30PM">8:30PM</option>
                                                            <option value="9:00PM">9:00PM</option>
                                                            <option value="9:30PM">9:30PM</option>
                                                            <option value="10:00PM">10:00PM</option>
                                                            <option value="10:30PM">10:30PM</option>
                                                            <option value="11:00PM">11:00PM</option>
                                                            <option value="11:30PM">11:30PM</option>
                                                        </select>
                                                      </div>
                                                      <div className="col-xs-6">
                                                          <label>To</label>
                                                          <select className="form-control col-xs-6" id="slot1_to" name="slot1_to" required ref="slot1_to">
                                                            <option value="N.A.">N.A.</option>
                                                            <option value="12:00AM">12:00AM</option>
                                                            <option value="12:30AM">12:30AM</option>
                                                            <option value="1:00AM">1:00AM</option>
                                                            <option value="1:30AM">1:30AM</option>
                                                            <option value="2:00AM">2:00AM</option>
                                                            <option value="2:30AM">2:30AM</option>
                                                            <option value="3:00AM">3:00AM</option>
                                                            <option value="3:30AM">3:30AM</option>
                                                            <option value="4:00AM">4:00AM</option>
                                                            <option value="4:30AM">4:30AM</option>
                                                            <option value="5:00AM">5:00AM</option>
                                                            <option value="5:30AM">5:30AM</option>
                                                            <option value="6:00AM">6:00AM</option>
                                                            <option value="6:30AM">6:30AM</option>
                                                            <option value="7:00AM">7:00AM</option>
                                                            <option value="7:30AM">7:30AM</option>
                                                            <option value="8:00AM">8:00AM</option>
                                                            <option value="8:30AM">8:30AM</option>
                                                            <option value="9:00AM">9:00AM</option>
                                                            <option value="9:30AM">9:30AM</option>
                                                            <option value="10:00AM">10:00AM</option>
                                                            <option value="10:30AM">10:30AM</option>
                                                            <option value="11:00AM">11:00AM</option>
                                                            <option value="11:30AM">11:30AM</option>
                                                            <option value="12:00PM">12:00PM</option>
                                                            <option value="12:30PM">12:30PM</option>
                                                            <option value="1:00PM">1:00PM</option>
                                                            <option value="1:30PM">1:30PM</option>
                                                            <option value="2:00PM">2:00PM</option>
                                                            <option value="2:30PM">2:30PM</option>
                                                            <option value="3:00PM">3:00PM</option>
                                                            <option value="3:30PM">3:30PM</option>
                                                            <option value="4:00PM">4:00PM</option>
                                                            <option value="4:30PM">4:30PM</option>
                                                            <option value="5:00PM">5:00PM</option>
                                                            <option value="5:30PM">5:30PM</option>
                                                            <option value="6:00PM">6:00PM</option>
                                                            <option value="6:30PM">6:30PM</option>
                                                            <option value="7:00PM">7:00PM</option>
                                                            <option value="7:30PM">7:30PM</option>
                                                            <option value="8:00PM">8:00PM</option>
                                                            <option value="8:30PM">8:30PM</option>
                                                            <option value="9:00PM">9:00PM</option>
                                                            <option value="9:30PM">9:30PM</option>
                                                            <option value="10:00PM">10:00PM</option>
                                                            <option value="10:30PM">10:30PM</option>
                                                            <option value="11:00PM">11:00PM</option>
                                                            <option value="11:30PM">11:30PM</option>
                                                        </select>
                                                      </div>
                                                  </div>
                                              </div>
                                              <div className="col-md-6">
                                                  <br/>
                                                  <label>Slot 2 Time</label>
                                                  <div className="row">
                                                      <div className="col-xs-6">
                                                          <label>From</label>
                                                          <select className="form-control col-xs-6" id="slot2_from" name="slot2_from" required ref="slot2_from">
                                                            <option value="N.A.">N.A.</option>
                                                            <option value="12:00AM">12:00AM</option>
                                                            <option value="12:30AM">12:30AM</option>
                                                            <option value="1:00AM">1:00AM</option>
                                                            <option value="1:30AM">1:30AM</option>
                                                            <option value="2:00AM">2:00AM</option>
                                                            <option value="2:30AM">2:30AM</option>
                                                            <option value="3:00AM">3:00AM</option>
                                                            <option value="3:30AM">3:30AM</option>
                                                            <option value="4:00AM">4:00AM</option>
                                                            <option value="4:30AM">4:30AM</option>
                                                            <option value="5:00AM">5:00AM</option>
                                                            <option value="5:30AM">5:30AM</option>
                                                            <option value="6:00AM">6:00AM</option>
                                                            <option value="6:30AM">6:30AM</option>
                                                            <option value="7:00AM">7:00AM</option>
                                                            <option value="7:30AM">7:30AM</option>
                                                            <option value="8:00AM">8:00AM</option>
                                                            <option value="8:30AM">8:30AM</option>
                                                            <option value="9:00AM">9:00AM</option>
                                                            <option value="9:30AM">9:30AM</option>
                                                            <option value="10:00AM">10:00AM</option>
                                                            <option value="10:30AM">10:30AM</option>
                                                            <option value="11:00AM">11:00AM</option>
                                                            <option value="11:30AM">11:30AM</option>
                                                            <option value="12:00PM">12:00PM</option>
                                                            <option value="12:30PM">12:30PM</option>
                                                            <option value="1:00PM">1:00PM</option>
                                                            <option value="1:30PM">1:30PM</option>
                                                            <option value="2:00PM">2:00PM</option>
                                                            <option value="2:30PM">2:30PM</option>
                                                            <option value="3:00PM">3:00PM</option>
                                                            <option value="3:30PM">3:30PM</option>
                                                            <option value="4:00PM">4:00PM</option>
                                                            <option value="4:30PM">4:30PM</option>
                                                            <option value="5:00PM">5:00PM</option>
                                                            <option value="5:30PM">5:30PM</option>
                                                            <option value="6:00PM">6:00PM</option>
                                                            <option value="6:30PM">6:30PM</option>
                                                            <option value="7:00PM">7:00PM</option>
                                                            <option value="7:30PM">7:30PM</option>
                                                            <option value="8:00PM">8:00PM</option>
                                                            <option value="8:30PM">8:30PM</option>
                                                            <option value="9:00PM">9:00PM</option>
                                                            <option value="9:30PM">9:30PM</option>
                                                            <option value="10:00PM">10:00PM</option>
                                                            <option value="10:30PM">10:30PM</option>
                                                            <option value="11:00PM">11:00PM</option>
                                                            <option value="11:30PM">11:30PM</option>
                                                        </select>
                                                      </div>
                                                      <div className="col-xs-6">
                                                          <label>To</label>
                                                          <select className="form-control col-xs-6" id="slot2_to" name="slot2_to" required ref="slot2_to">
                                                            <option value="none">N.A.</option>
                                                            <option value="12:00AM">12:00AM</option>
                                                            <option value="12:30AM">12:30AM</option>
                                                            <option value="1:00AM">1:00AM</option>
                                                            <option value="1:30AM">1:30AM</option>
                                                            <option value="2:00AM">2:00AM</option>
                                                            <option value="2:30AM">2:30AM</option>
                                                            <option value="3:00AM">3:00AM</option>
                                                            <option value="3:30AM">3:30AM</option>
                                                            <option value="4:00AM">4:00AM</option>
                                                            <option value="4:30AM">4:30AM</option>
                                                            <option value="5:00AM">5:00AM</option>
                                                            <option value="5:30AM">5:30AM</option>
                                                            <option value="6:00AM">6:00AM</option>
                                                            <option value="6:30AM">6:30AM</option>
                                                            <option value="7:00AM">7:00AM</option>
                                                            <option value="7:30AM">7:30AM</option>
                                                            <option value="8:00AM">8:00AM</option>
                                                            <option value="8:30AM">8:30AM</option>
                                                            <option value="9:00AM">9:00AM</option>
                                                            <option value="9:30AM">9:30AM</option>
                                                            <option value="10:00AM">10:00AM</option>
                                                            <option value="10:30AM">10:30AM</option>
                                                            <option value="11:00AM">11:00AM</option>
                                                            <option value="11:30AM">11:30AM</option>
                                                            <option value="12:00PM">12:00PM</option>
                                                            <option value="12:30PM">12:30PM</option>
                                                            <option value="1:00PM">1:00PM</option>
                                                            <option value="1:30PM">1:30PM</option>
                                                            <option value="2:00PM">2:00PM</option>
                                                            <option value="2:30PM">2:30PM</option>
                                                            <option value="3:00PM">3:00PM</option>
                                                            <option value="3:30PM">3:30PM</option>
                                                            <option value="4:00PM">4:00PM</option>
                                                            <option value="4:30PM">4:30PM</option>
                                                            <option value="5:00PM">5:00PM</option>
                                                            <option value="5:30PM">5:30PM</option>
                                                            <option value="6:00PM">6:00PM</option>
                                                            <option value="6:30PM">6:30PM</option>
                                                            <option value="7:00PM">7:00PM</option>
                                                            <option value="7:30PM">7:30PM</option>
                                                            <option value="8:00PM">8:00PM</option>
                                                            <option value="8:30PM">8:30PM</option>
                                                            <option value="9:00PM">9:00PM</option>
                                                            <option value="9:30PM">9:30PM</option>
                                                            <option value="10:00PM">10:00PM</option>
                                                            <option value="10:30PM">10:30PM</option>
                                                            <option value="11:00PM">11:00PM</option>
                                                            <option value="11:30PM">11:30PM</option>
                                                        </select>
                                                      </div>
                                                  </div>
                                              </div>
                                              <div className="col-md-6">
                                                  <br/>
                                                  <label>Slot 3 Time</label>
                                                  <div className="row">
                                                      <div className="col-xs-6">
                                                          <label>From</label>
                                                          <select className="form-control col-xs-6" id="slot3_from" name="slot3_from" required ref="slot3_from">
                                                            <option value="N.A.">N.A.</option>
                                                            <option value="12:00AM">12:00AM</option>
                                                            <option value="12:30AM">12:30AM</option>
                                                            <option value="1:00AM">1:00AM</option>
                                                            <option value="1:30AM">1:30AM</option>
                                                            <option value="2:00AM">2:00AM</option>
                                                            <option value="2:30AM">2:30AM</option>
                                                            <option value="3:00AM">3:00AM</option>
                                                            <option value="3:30AM">3:30AM</option>
                                                            <option value="4:00AM">4:00AM</option>
                                                            <option value="4:30AM">4:30AM</option>
                                                            <option value="5:00AM">5:00AM</option>
                                                            <option value="5:30AM">5:30AM</option>
                                                            <option value="6:00AM">6:00AM</option>
                                                            <option value="6:30AM">6:30AM</option>
                                                            <option value="7:00AM">7:00AM</option>
                                                            <option value="7:30AM">7:30AM</option>
                                                            <option value="8:00AM">8:00AM</option>
                                                            <option value="8:30AM">8:30AM</option>
                                                            <option value="9:00AM">9:00AM</option>
                                                            <option value="9:30AM">9:30AM</option>
                                                            <option value="10:00AM">10:00AM</option>
                                                            <option value="10:30AM">10:30AM</option>
                                                            <option value="11:00AM">11:00AM</option>
                                                            <option value="11:30AM">11:30AM</option>
                                                            <option value="12:00PM">12:00PM</option>
                                                            <option value="12:30PM">12:30PM</option>
                                                            <option value="1:00PM">1:00PM</option>
                                                            <option value="1:30PM">1:30PM</option>
                                                            <option value="2:00PM">2:00PM</option>
                                                            <option value="2:30PM">2:30PM</option>
                                                            <option value="3:00PM">3:00PM</option>
                                                            <option value="3:30PM">3:30PM</option>
                                                            <option value="4:00PM">4:00PM</option>
                                                            <option value="4:30PM">4:30PM</option>
                                                            <option value="5:00PM">5:00PM</option>
                                                            <option value="5:30PM">5:30PM</option>
                                                            <option value="6:00PM">6:00PM</option>
                                                            <option value="6:30PM">6:30PM</option>
                                                            <option value="7:00PM">7:00PM</option>
                                                            <option value="7:30PM">7:30PM</option>
                                                            <option value="8:00PM">8:00PM</option>
                                                            <option value="8:30PM">8:30PM</option>
                                                            <option value="9:00PM">9:00PM</option>
                                                            <option value="9:30PM">9:30PM</option>
                                                            <option value="10:00PM">10:00PM</option>
                                                            <option value="10:30PM">10:30PM</option>
                                                            <option value="11:00PM">11:00PM</option>
                                                            <option value="11:30PM">11:30PM</option>
                                                        </select>
                                                      </div>
                                                      <div className="col-xs-6">
                                                          <label>To</label>
                                                          <select className="form-control col-xs-6" id="slot3_to" name="slot3_to" required ref="slot3_to">
                                                            <option value="N.A.">N.A.</option>
                                                            <option value="12:00AM">12:00AM</option>
                                                            <option value="12:30AM">12:30AM</option>
                                                            <option value="1:00AM">1:00AM</option>
                                                            <option value="1:30AM">1:30AM</option>
                                                            <option value="2:00AM">2:00AM</option>
                                                            <option value="2:30AM">2:30AM</option>
                                                            <option value="3:00AM">3:00AM</option>
                                                            <option value="3:30AM">3:30AM</option>
                                                            <option value="4:00AM">4:00AM</option>
                                                            <option value="4:30AM">4:30AM</option>
                                                            <option value="5:00AM">5:00AM</option>
                                                            <option value="5:30AM">5:30AM</option>
                                                            <option value="6:00AM">6:00AM</option>
                                                            <option value="6:30AM">6:30AM</option>
                                                            <option value="7:00AM">7:00AM</option>
                                                            <option value="7:30AM">7:30AM</option>
                                                            <option value="8:00AM">8:00AM</option>
                                                            <option value="8:30AM">8:30AM</option>
                                                            <option value="9:00AM">9:00AM</option>
                                                            <option value="9:30AM">9:30AM</option>
                                                            <option value="10:00AM">10:00AM</option>
                                                            <option value="10:30AM">10:30AM</option>
                                                            <option value="11:00AM">11:00AM</option>
                                                            <option value="11:30AM">11:30AM</option>
                                                            <option value="12:00PM">12:00PM</option>
                                                            <option value="12:30PM">12:30PM</option>
                                                            <option value="1:00PM">1:00PM</option>
                                                            <option value="1:30PM">1:30PM</option>
                                                            <option value="2:00PM">2:00PM</option>
                                                            <option value="2:30PM">2:30PM</option>
                                                            <option value="3:00PM">3:00PM</option>
                                                            <option value="3:30PM">3:30PM</option>
                                                            <option value="4:00PM">4:00PM</option>
                                                            <option value="4:30PM">4:30PM</option>
                                                            <option value="5:00PM">5:00PM</option>
                                                            <option value="5:30PM">5:30PM</option>
                                                            <option value="6:00PM">6:00PM</option>
                                                            <option value="6:30PM">6:30PM</option>
                                                            <option value="7:00PM">7:00PM</option>
                                                            <option value="7:30PM">7:30PM</option>
                                                            <option value="8:00PM">8:00PM</option>
                                                            <option value="8:30PM">8:30PM</option>
                                                            <option value="9:00PM">9:00PM</option>
                                                            <option value="9:30PM">9:30PM</option>
                                                            <option value="10:00PM">10:00PM</option>
                                                            <option value="10:30PM">10:30PM</option>
                                                            <option value="11:00PM">11:00PM</option>
                                                            <option value="11:30PM">11:30PM</option>
                                                        </select>
                                                      </div>
                                                  </div>
                                              </div>
                                              <div className="col-md-6">
                                                  <br/>
                                                  <label>Time Fee</label>
                                                  <input type="number" className="form-control" id="time_fee" name="time_fee" required onChange={e => this.setState({ time_fee: e.target.value })} />
                                              </div>
                                              <div className="col-md-6">
                                                  <br/>
                                                  <label>
                                                    Categories
                                                    &nbsp;<span id="category_message" style={{color: 'red', display: 'none'}}>This field is required*</span>
                                                  </label>
                                                  <Select options={this.state.categories} value={this.state.selected_categories} isClearable={true} id="categories" isMulti="true" name="categories" required onChange={this.handleCategoryChange} />
                                              </div>
                                              <div className="col-md-6">
                                                  <br/>
                                                  <label>
                                                    Home And Kitchen
                                                    &nbsp;<span id="home_message" style={{color: 'red', display: 'none'}}>This field is required*</span>
                                                  </label>
                                                  <Select options={this.state.home_and_kitchen} value={this.state.selected_home_and_kitchen} id="home_and_kitchen" isMulti="true" onChange={this.handleHomeChange} isClearable={true} name="home_and_kitchen" required/>
                                              </div>
                                              <div className="col-md-6">
                                                  <br/>
                                                  <label>
                                                    Brands
                                                    &nbsp;<span id="brand_message" style={{color: 'red', display: 'none'}}>This field is required*</span>
                                                  </label>
                                                  <Select options={this.state.brands} isClearable={true} value={this.state.selected_brands} onChange={this.handleBrandsChange} id="brands" isMulti="true" name="brands"/>
                                              </div>
                                              <div className="col-md-12">
                                                  <h3>
                                                    Add Standard Delivery Charge Rates
                                                    <button type="button" className="btn btn-primary" onClick={this.addMoreFields.bind(this)} style={{marginLeft: '7px'}}>
                                                        <i className="fa fa-plus"></i>
                                                    </button>
                                                    
                                                    <button type="button" id="removeFields" className="btn btn-danger" onClick={this.removeFields.bind(this)} style={{marginLeft: '7px', display: 'none'}}>
                                                        <i className="fa fa-minus"></i>
                                                    </button>
                                                  </h3>
                                                  <div id="standard_rates" className="row">
                                                      <div className="col-md-4">
                                                          <label>Order Amount Upto</label>
                                                          <br/>
                                                          <input className="form-control upto_amount" type="number" required />
                                                      </div>
                                                      <div className="col-md-4">
                                                          <label>Charge</label>
                                                          <br/>
                                                          <input className="form-control upto_charge" type="number" required />
                                                      </div>
                                                      <div style={{clear: 'both'}}></div>
                                                  </div>
                                              </div>
                                              <div className="col-md-12">
                                                  <br/>
                                                  <button type="submit" name="add" className="btn pull-right btn-primary">Add Data</button>
                                              </div>
                                          </div>
                                          <br/>
                                      </div>                 
                                  </form>
                              </div>
                          </div>
                      </section>
                  </div>
            </React.Fragment>
        );
    }
}

class EditDeliveryRate extends React.Component{
 
    constructor(props) {
        super();
        this.state = {
            token: props.match.params.token,
            pincode: '',
            standard_from: '',
            standard_to: '',
            slot1_from: '',
            slot1_to: '',
            slot2_from: '',
            slot2_to: '',
            slot3_from: '',
            slot3_to: '',
            free_above: '',
            time_fee: '',
            selected_categories: null,
            selected_home_and_kitchen: null,
            selected_brands: null,
            categories: [],
            home_and_kitchen: [],
            brands: [],
			delivery_rates:[],
        }
        
        this.childKey = 0;  
      
        //FETCH HOME AND KITCHEN CATEGORIES
        let formData = new FormData();
        formData.append('type', "home")
        formData.append('multi', "yes")
        axios({
                method: 'post',
                url: api_link+'CategoriesFetch.php',
                data: formData,
                config: { headers: {'Content-Type': 'multipart/form-data' }}
        }).then(response => response.data)
        .then((data) => {
          this.setState({ home_and_kitchen: data })
         })
        
        //FETCH BRANDS CATEGORIES
        let formData1 = new FormData();
        formData1.append('type', "brands")
        formData1.append('multi', "yes")
        axios({
                method: 'post',
                url: api_link+'CategoriesFetch.php',
                data: formData1,
                config: { headers: {'Content-Type': 'multipart/form-data' }}
        }).then(response => response.data)
        .then((data) => {
          this.setState({ brands: data })
         })
        
        //FETCH MENU CATEGORIES
        const url = api_link+'CategoriesFetch.php?multi=yes'
        axios.get(url).then(response => response.data)
        .then((data) => {
          this.setState({ categories: data })
         })
      
        //FETCH DETAILS OF CURRENT DELIVERY RATE
        let c_delivery = new FormData();
        c_delivery.append('edit_delivery', this.state.token)
        axios({
                method: 'post',
                url: api_link+'AgentsFetch.php',
                data: c_delivery,
                config: { headers: {'Content-Type': 'multipart/form-data' }}
        }).then(response => response.data)
        .then((data) => {
            this.setState({
                pincode: data[0]['pincode'],
                standard_from: data[0]['standard_from'],
                standard_to: data[0]['standard_to'],
                slot1_from: data[0]['slot1_from'],
                slot1_to: data[0]['slot1_to'],
                slot2_from: data[0]['slot2_from'],
                slot2_to: data[0]['slot2_to'],
                slot3_from: data[0]['slot3_from'],
                slot3_to: data[0]['slot3_to'],
                free_above: data[0]['free_above'],
                time_fee: data[0]['time_fee'],
                selected_categories: data[0]['categories'],
                selected_home_and_kitchen: data[0]['home_and_kitchen'],
                selected_brands: data[0]['brands'],
                delivery_rates: data[0]['rates'],
            })
          
            $("#standard_from").val(this.state.standard_from)
            $("#standard_to").val(this.state.standard_to)
            $("#slot1_from").val(this.state.slot1_from)
            $("#slot1_to").val(this.state.slot1_to)
            $("#slot2_from").val(this.state.slot2_from)
            $("#slot2_to").val(this.state.slot2_to)
            $("#slot3_from").val(this.state.slot3_from)
            $("#slot3_to").val(this.state.slot3_to)
         })
      
    }
    
    componentDidMount() {
        document.title="Edit Delivery Rate"
    }
    
    handleBrandsChange = selected_brands => {
        this.setState({ selected_brands });
    };

    handleHomeChange = selected_home_and_kitchen => {
        this.setState({ selected_home_and_kitchen });
    };

    handleCategoryChange = selected_categories => {
        this.setState({ selected_categories });
    };
  
    handleEditFormSubmit( event ) {
		event.preventDefault();
		
        var all_good=true;
      
        /*if(!this.state.selected_categories)
        {
            $("#category_message").show();
            all_good=false;
        }
        else
        {
            $("#category_message").hide();
        }
      
        if(!this.state.selected_home_and_kitchen)
        {
            $("#home_message").show();
            all_good=false;
        }
        else
        {
            $("#home_message").hide();
        }
      
        if(!this.state.selected_brands)
        {
            $("#brand_message").show();
            all_good=false;
        }
        else
        {
            $("#brand_message").hide();
        }*/
      
        if(all_good)
        {
            if(window.confirm("Are You Sure To Make Changes?"))
            {
              //CREATE ARRAY OF DELIVERY RATES 
              let d_rates = [];
              $( ".upto_amount" ).each( function( index, element ){
                  d_rates.push($( this ).val()+":"+$(".upto_charge").eq(index).val());
              });


              $("#invalid_message").hide();
              let formData = new FormData();
              formData.append('edit_delivery_rate', this.state.token)
              formData.append('pincode', this.state.pincode)
              formData.append('free_above', this.state.free_above)

              formData.append('standard_from', this.refs.standard_from.value)
              formData.append('standard_to', this.refs.standard_to.value)
              formData.append('slot1_from', this.refs.slot1_from.value)
              formData.append('slot1_to', this.refs.slot1_to.value)
              formData.append('slot2_from', this.refs.slot2_from.value)
              formData.append('slot2_to', this.refs.slot2_to.value)
              formData.append('slot3_from', this.refs.slot3_from.value)
              formData.append('slot3_to', this.refs.slot3_to.value)

              formData.append('time_fee', this.state.time_fee)
              formData.append('categories', JSON.stringify(this.state.selected_categories))
              formData.append('home_and_kitchen', JSON.stringify(this.state.selected_home_and_kitchen))
              formData.append('brands', JSON.stringify(this.state.selected_brands))

              formData.append('delivery_rates',JSON.stringify(d_rates));

              axios({
                  method: 'post',
                  url: api_link+'AgentsManagement.php',
                  data: formData,
                  config: { headers: {'Content-Type': 'multipart/form-data' }}
              })
              .then(function (response) {
                  //handle success
                  if(response.data === "ok")
                  {	
                      $("#update_msg").html("<strong>Success! </strong> Your Request Successfully Processed")
                      $("#update_msg").removeClass("alert-danger").addClass("alert-success")
                  }
                  else
                  {
                      $("#update_msg").html("<strong>Error! </strong> Unable to Process Your Request")
                      $("#update_msg").removeClass("alert-success").addClass("alert-danger")
                  }
                  $("#update_msg").show()
                  window.scrollTo({top: 0, behavior: 'smooth'});
                   setTimeout(function(){ $("#update_msg").hide(); }, 4000);


              })
              .catch(function (response) {
                  //handle error
                  $(".loader_gif").fadeOut("slow");
                  console.log(response)
              });
            }
        }
	}

    addMoreFields( event ) {
		event.preventDefault();
        let inhtml=`<div class="col-md-4">
                        <br/>
                        <input class="form-control upto_amount" type="number" required />
                    </div>
                    <div class="col-md-4">
                        <br/>
                        <input class="form-control upto_charge" type="number" required />
                    </div>
                    <div class="col-md-offset-4" style="clear:both"></div>`;
        
        if($("#standard_rates div").length === 6)
        {
            $("[id=removeFields]").show();
        }
      
        $("#standard_rates").append(inhtml);
	}

    removeFields( event ) {
		event.preventDefault();
		
		$("#standard_rates div:last").remove()
		$("#standard_rates div:last").remove()
		$("#standard_rates div:last").remove()
		
        if($("#standard_rates div").length === 6)
        {
            $("#removeFields").hide();
        }
	}
    
    renderRemoveElement(){
        if(this.state.delivery_rates.length > 1)
        {
            return <button type="button" id="removeFields" className="btn btn-danger" onClick={this.removeFields.bind(this)} style={{marginLeft: '7px'}}>
                <i className="fa fa-minus"></i>
            </button>;
        }
        else
        {
            return <button type="button" id="removeFields" className="btn btn-danger" onClick={this.removeFields.bind(this)} style={{marginLeft: '7px', display: 'none'}}>
                  <i className="fa fa-minus"></i>
            </button>;
        }
    }

    render()
    {
        return(
            <React.Fragment>
                <div className="content-wrapper">
                    <section className="content-header">
                        <h1>Edit Delivery Rate</h1>
                        <ol className="breadcrumb">
                              <li>
                                  <div className="pull-right"> 
                                      <Link to="/admin/shipping_charges" className="btn btn-success">
                                            <i className="fa fa-truck"></i> Back to Delivery Rates
                                      </Link>
                                  </div>
                              </li>
                        </ol>
                    </section>
                    <section>
                        <div id="update_msg" className="alert" style={{display: 'none'}}></div> 
                    </section>
                    <section className="content" style={{overflow: 'auto'}} key={this.childKey}>
                          <div className="box">
                              <div className="box-body">
                                  <br/>
                                  <form id="addRate" onSubmit={this.handleEditFormSubmit.bind(this)}>
                                      <div className="modal-body">
                                          <div className="row">
                                              <div className="col-xs-6">
                                                  <label>Pincode</label>
                                                    <input type="number" className="form-control" value={this.state.pincode} id="pincode" name="pincode" required onChange={e => this.setState({ pincode: e.target.value })} />
                                              </div>
                                              <div className="col-xs-6">
                                                  <label>Free Above</label>
                                                    <input type="number" className="form-control" value={this.state.free_above} id="free_above" name="free_above" required onChange={e => this.setState({ free_above: e.target.value })} />
                                              </div>
                                              <div className="col-md-6">
                                                  <br/>
                                                  <label>Standard Delivery Time</label>
                                                  <div className="row">
                                                      <div className="col-xs-6">
                                                          <label>From</label>
                                                          <select className="form-control col-xs-6" defaultValue={this.state.standard_from} id="standard_from" name="standard_from" required ref="standard_from">
                                                            <option value="12:00AM">12:00AM</option>
                                                            <option value="12:30AM">12:30AM</option>
                                                            <option value="01:00AM">1:00AM</option>
                                                            <option value="01:30AM">1:30AM</option>
                                                            <option value="02:00AM">2:00AM</option>
                                                            <option value="02:30AM">2:30AM</option>
                                                            <option value="03:00AM">3:00AM</option>
                                                            <option value="03:30AM">3:30AM</option>
                                                            <option value="04:00AM">4:00AM</option>
                                                            <option value="04:30AM">4:30AM</option>
                                                            <option value="05:00AM">5:00AM</option>
                                                            <option value="05:30AM">5:30AM</option>
                                                            <option value="06:00AM">6:00AM</option>
                                                            <option value="06:30AM">6:30AM</option>
                                                            <option value="07:00AM">7:00AM</option>
                                                            <option value="07:30AM">7:30AM</option>
                                                            <option value="08:00AM">8:00AM</option>
                                                            <option value="08:30AM">8:30AM</option>
                                                            <option value="09:00AM">9:00AM</option>
                                                            <option value="09:30AM">9:30AM</option>
                                                            <option value="10:00AM">10:00AM</option>
                                                            <option value="10:30AM">10:30AM</option>
                                                            <option value="11:00AM">11:00AM</option>
                                                            <option value="11:30AM">11:30AM</option>
                                                            <option value="12:00PM">12:00PM</option>
                                                            <option value="12:30PM">12:30PM</option>
                                                            <option value="01:00PM">1:00PM</option>
                                                            <option value="01:30PM">1:30PM</option>
                                                            <option value="02:00PM">2:00PM</option>
                                                            <option value="02:30PM">2:30PM</option>
                                                            <option value="03:00PM">3:00PM</option>
                                                            <option value="03:30PM">3:30PM</option>
                                                            <option value="04:00PM">4:00PM</option>
                                                            <option value="04:30PM">4:30PM</option>
                                                            <option value="05:00PM">5:00PM</option>
                                                            <option value="05:30PM">5:30PM</option>
                                                            <option value="06:00PM">6:00PM</option>
                                                            <option value="06:30PM">6:30PM</option>
                                                            <option value="07:00PM">7:00PM</option>
                                                            <option value="07:30PM">7:30PM</option>
                                                            <option value="08:00PM">8:00PM</option>
                                                            <option value="08:30PM">8:30PM</option>
                                                            <option value="09:00PM">9:00PM</option>
                                                            <option value="09:30PM">9:30PM</option>
                                                            <option value="10:00PM">10:00PM</option>
                                                            <option value="10:30PM">10:30PM</option>
                                                            <option value="11:00PM">11:00PM</option>
                                                            <option value="11:30PM">11:30PM</option>
                                                        </select>
                                                      </div>
                                                      <div className="col-xs-6">
                                                          <label>To</label>
                                                          <select className="form-control col-xs-6" defaultValue={this.state.standard_to} id="standard_to" name="standard_to" required ref="standard_to">
                                                            <option value="12:00AM">12:00AM</option>
                                                            <option value="12:30AM">12:30AM</option>
                                                            <option value="01:00AM">1:00AM</option>
                                                            <option value="01:30AM">1:30AM</option>
                                                            <option value="02:00AM">2:00AM</option>
                                                            <option value="02:30AM">2:30AM</option>
                                                            <option value="03:00AM">3:00AM</option>
                                                            <option value="03:30AM">3:30AM</option>
                                                            <option value="04:00AM">4:00AM</option>
                                                            <option value="04:30AM">4:30AM</option>
                                                            <option value="05:00AM">5:00AM</option>
                                                            <option value="05:30AM">5:30AM</option>
                                                            <option value="06:00AM">6:00AM</option>
                                                            <option value="06:30AM">6:30AM</option>
                                                            <option value="07:00AM">7:00AM</option>
                                                            <option value="07:30AM">7:30AM</option>
                                                            <option value="08:00AM">8:00AM</option>
                                                            <option value="08:30AM">8:30AM</option>
                                                            <option value="09:00AM">9:00AM</option>
                                                            <option value="09:30AM">9:30AM</option>
                                                            <option value="10:00AM">10:00AM</option>
                                                            <option value="10:30AM">10:30AM</option>
                                                            <option value="11:00AM">11:00AM</option>
                                                            <option value="11:30AM">11:30AM</option>
                                                            <option value="12:00PM">12:00PM</option>
                                                            <option value="12:30PM">12:30PM</option>
                                                            <option value="01:00PM">1:00PM</option>
                                                            <option value="01:30PM">1:30PM</option>
                                                            <option value="02:00PM">2:00PM</option>
                                                            <option value="02:30PM">2:30PM</option>
                                                            <option value="03:00PM">3:00PM</option>
                                                            <option value="03:30PM">3:30PM</option>
                                                            <option value="04:00PM">4:00PM</option>
                                                            <option value="04:30PM">4:30PM</option>
                                                            <option value="05:00PM">5:00PM</option>
                                                            <option value="05:30PM">5:30PM</option>
                                                            <option value="06:00PM">6:00PM</option>
                                                            <option value="06:30PM">6:30PM</option>
                                                            <option value="07:00PM">7:00PM</option>
                                                            <option value="07:30PM">7:30PM</option>
                                                            <option value="08:00PM">8:00PM</option>
                                                            <option value="08:30PM">8:30PM</option>
                                                            <option value="09:00PM">9:00PM</option>
                                                            <option value="09:30PM">9:30PM</option>
                                                            <option value="10:00PM">10:00PM</option>
                                                            <option value="10:30PM">10:30PM</option>
                                                            <option value="11:00PM">11:00PM</option>
                                                            <option value="11:30PM">11:30PM</option>
                                                        </select>
                                                      </div>
                                                  </div>
                                              </div>
                                              <div className="col-md-6">
                                                  <br/>
                                                  <label>Slot 1 Time</label>
                                                  <div className="row">
                                                      <div className="col-xs-6">
                                                          <label>From</label>
                                                          <select className="form-control col-xs-6" defaultValue={this.state.slot1_from} id="slot1_from" name="slot1_from" required ref="slot1_from">
                                                            <option value="N.A.">N.A.</option>
                                                            <option value="12:00AM">12:00AM</option>
                                                            <option value="12:30AM">12:30AM</option>
                                                            <option value="01:00AM">1:00AM</option>
                                                            <option value="01:30AM">1:30AM</option>
                                                            <option value="02:00AM">2:00AM</option>
                                                            <option value="02:30AM">2:30AM</option>
                                                            <option value="03:00AM">3:00AM</option>
                                                            <option value="03:30AM">3:30AM</option>
                                                            <option value="04:00AM">4:00AM</option>
                                                            <option value="04:30AM">4:30AM</option>
                                                            <option value="05:00AM">5:00AM</option>
                                                            <option value="05:30AM">5:30AM</option>
                                                            <option value="06:00AM">6:00AM</option>
                                                            <option value="06:30AM">6:30AM</option>
                                                            <option value="07:00AM">7:00AM</option>
                                                            <option value="07:30AM">7:30AM</option>
                                                            <option value="08:00AM">8:00AM</option>
                                                            <option value="08:30AM">8:30AM</option>
                                                            <option value="09:00AM">9:00AM</option>
                                                            <option value="09:30AM">9:30AM</option>
                                                            <option value="10:00AM">10:00AM</option>
                                                            <option value="10:30AM">10:30AM</option>
                                                            <option value="11:00AM">11:00AM</option>
                                                            <option value="11:30AM">11:30AM</option>
                                                            <option value="12:00PM">12:00PM</option>
                                                            <option value="12:30PM">12:30PM</option>
                                                            <option value="01:00PM">1:00PM</option>
                                                            <option value="01:30PM">1:30PM</option>
                                                            <option value="02:00PM">2:00PM</option>
                                                            <option value="02:30PM">2:30PM</option>
                                                            <option value="03:00PM">3:00PM</option>
                                                            <option value="03:30PM">3:30PM</option>
                                                            <option value="04:00PM">4:00PM</option>
                                                            <option value="04:30PM">4:30PM</option>
                                                            <option value="05:00PM">5:00PM</option>
                                                            <option value="05:30PM">5:30PM</option>
                                                            <option value="06:00PM">6:00PM</option>
                                                            <option value="06:30PM">6:30PM</option>
                                                            <option value="07:00PM">7:00PM</option>
                                                            <option value="07:30PM">7:30PM</option>
                                                            <option value="08:00PM">8:00PM</option>
                                                            <option value="08:30PM">8:30PM</option>
                                                            <option value="09:00PM">9:00PM</option>
                                                            <option value="09:30PM">9:30PM</option>
                                                            <option value="10:00PM">10:00PM</option>
                                                            <option value="10:30PM">10:30PM</option>
                                                            <option value="11:00PM">11:00PM</option>
                                                            <option value="11:30PM">11:30PM</option>
                                                        </select>
                                                      </div>
                                                      <div className="col-xs-6">
                                                          <label>To</label>
                                                          <select className="form-control col-xs-6" defaultValue={this.state.slot1_to} id="slot1_to" name="slot1_to" required ref="slot1_to">
                                                            <option value="N.A.">N.A.</option>
                                                            <option value="12:00AM">12:00AM</option>
                                                            <option value="12:30AM">12:30AM</option>
                                                            <option value="01:00AM">1:00AM</option>
                                                            <option value="01:30AM">1:30AM</option>
                                                            <option value="02:00AM">2:00AM</option>
                                                            <option value="02:30AM">2:30AM</option>
                                                            <option value="03:00AM">3:00AM</option>
                                                            <option value="03:30AM">3:30AM</option>
                                                            <option value="04:00AM">4:00AM</option>
                                                            <option value="04:30AM">4:30AM</option>
                                                            <option value="05:00AM">5:00AM</option>
                                                            <option value="05:30AM">5:30AM</option>
                                                            <option value="06:00AM">6:00AM</option>
                                                            <option value="06:30AM">6:30AM</option>
                                                            <option value="07:00AM">7:00AM</option>
                                                            <option value="07:30AM">7:30AM</option>
                                                            <option value="08:00AM">8:00AM</option>
                                                            <option value="08:30AM">8:30AM</option>
                                                            <option value="09:00AM">9:00AM</option>
                                                            <option value="09:30AM">9:30AM</option>
                                                            <option value="10:00AM">10:00AM</option>
                                                            <option value="10:30AM">10:30AM</option>
                                                            <option value="11:00AM">11:00AM</option>
                                                            <option value="11:30AM">11:30AM</option>
                                                            <option value="12:00PM">12:00PM</option>
                                                            <option value="12:30PM">12:30PM</option>
                                                            <option value="01:00PM">1:00PM</option>
                                                            <option value="01:30PM">1:30PM</option>
                                                            <option value="02:00PM">2:00PM</option>
                                                            <option value="02:30PM">2:30PM</option>
                                                            <option value="03:00PM">3:00PM</option>
                                                            <option value="03:30PM">3:30PM</option>
                                                            <option value="04:00PM">4:00PM</option>
                                                            <option value="04:30PM">4:30PM</option>
                                                            <option value="05:00PM">5:00PM</option>
                                                            <option value="05:30PM">5:30PM</option>
                                                            <option value="06:00PM">6:00PM</option>
                                                            <option value="06:30PM">6:30PM</option>
                                                            <option value="07:00PM">7:00PM</option>
                                                            <option value="07:30PM">7:30PM</option>
                                                            <option value="08:00PM">8:00PM</option>
                                                            <option value="08:30PM">8:30PM</option>
                                                            <option value="09:00PM">9:00PM</option>
                                                            <option value="09:30PM">9:30PM</option>
                                                            <option value="10:00PM">10:00PM</option>
                                                            <option value="10:30PM">10:30PM</option>
                                                            <option value="11:00PM">11:00PM</option>
                                                            <option value="11:30PM">11:30PM</option>
                                                        </select>
                                                      </div>
                                                  </div>
                                              </div>
                                              <div className="col-md-6">
                                                  <br/>
                                                  <label>Slot 2 Time</label>
                                                  <div className="row">
                                                      <div className="col-xs-6">
                                                          <label>From</label>
                                                          <select className="form-control col-xs-6" defaultValue={this.state.slot2_from} id="slot2_from" name="slot2_from" required ref="slot2_from">
                                                            <option value="N.A.">N.A.</option>
                                                            <option value="12:00AM">12:00AM</option>
                                                            <option value="12:30AM">12:30AM</option>
                                                            <option value="01:00AM">1:00AM</option>
                                                            <option value="01:30AM">1:30AM</option>
                                                            <option value="02:00AM">2:00AM</option>
                                                            <option value="02:30AM">2:30AM</option>
                                                            <option value="03:00AM">3:00AM</option>
                                                            <option value="03:30AM">3:30AM</option>
                                                            <option value="04:00AM">4:00AM</option>
                                                            <option value="04:30AM">4:30AM</option>
                                                            <option value="05:00AM">5:00AM</option>
                                                            <option value="05:30AM">5:30AM</option>
                                                            <option value="06:00AM">6:00AM</option>
                                                            <option value="06:30AM">6:30AM</option>
                                                            <option value="07:00AM">7:00AM</option>
                                                            <option value="07:30AM">7:30AM</option>
                                                            <option value="08:00AM">8:00AM</option>
                                                            <option value="08:30AM">8:30AM</option>
                                                            <option value="09:00AM">9:00AM</option>
                                                            <option value="09:30AM">9:30AM</option>
                                                            <option value="10:00AM">10:00AM</option>
                                                            <option value="10:30AM">10:30AM</option>
                                                            <option value="11:00AM">11:00AM</option>
                                                            <option value="11:30AM">11:30AM</option>
                                                            <option value="12:00PM">12:00PM</option>
                                                            <option value="12:30PM">12:30PM</option>
                                                            <option value="01:00PM">1:00PM</option>
                                                            <option value="01:30PM">1:30PM</option>
                                                            <option value="02:00PM">2:00PM</option>
                                                            <option value="02:30PM">2:30PM</option>
                                                            <option value="03:00PM">3:00PM</option>
                                                            <option value="03:30PM">3:30PM</option>
                                                            <option value="04:00PM">4:00PM</option>
                                                            <option value="04:30PM">4:30PM</option>
                                                            <option value="05:00PM">5:00PM</option>
                                                            <option value="05:30PM">5:30PM</option>
                                                            <option value="06:00PM">6:00PM</option>
                                                            <option value="06:30PM">6:30PM</option>
                                                            <option value="07:00PM">7:00PM</option>
                                                            <option value="07:30PM">7:30PM</option>
                                                            <option value="08:00PM">8:00PM</option>
                                                            <option value="08:30PM">8:30PM</option>
                                                            <option value="09:00PM">9:00PM</option>
                                                            <option value="09:30PM">9:30PM</option>
                                                            <option value="10:00PM">10:00PM</option>
                                                            <option value="10:30PM">10:30PM</option>
                                                            <option value="11:00PM">11:00PM</option>
                                                            <option value="11:30PM">11:30PM</option>
                                                        </select>
                                                      </div>
                                                      <div className="col-xs-6">
                                                          <label>To</label>
                                                          <select className="form-control col-xs-6" defaultValue={this.state.slot2_to} id="slot2_to" name="slot2_to" required ref="slot2_to">
                                                            <option value="N.A.">N.A.</option>
                                                            <option value="12:00AM">12:00AM</option>
                                                            <option value="12:30AM">12:30AM</option>
                                                            <option value="01:00AM">1:00AM</option>
                                                            <option value="01:30AM">1:30AM</option>
                                                            <option value="02:00AM">2:00AM</option>
                                                            <option value="02:30AM">2:30AM</option>
                                                            <option value="03:00AM">3:00AM</option>
                                                            <option value="03:30AM">3:30AM</option>
                                                            <option value="04:00AM">4:00AM</option>
                                                            <option value="04:30AM">4:30AM</option>
                                                            <option value="05:00AM">5:00AM</option>
                                                            <option value="05:30AM">5:30AM</option>
                                                            <option value="06:00AM">6:00AM</option>
                                                            <option value="06:30AM">6:30AM</option>
                                                            <option value="07:00AM">7:00AM</option>
                                                            <option value="07:30AM">7:30AM</option>
                                                            <option value="08:00AM">8:00AM</option>
                                                            <option value="08:30AM">8:30AM</option>
                                                            <option value="09:00AM">9:00AM</option>
                                                            <option value="09:30AM">9:30AM</option>
                                                            <option value="10:00AM">10:00AM</option>
                                                            <option value="10:30AM">10:30AM</option>
                                                            <option value="11:00AM">11:00AM</option>
                                                            <option value="11:30AM">11:30AM</option>
                                                            <option value="12:00PM">12:00PM</option>
                                                            <option value="12:30PM">12:30PM</option>
                                                            <option value="01:00PM">1:00PM</option>
                                                            <option value="01:30PM">1:30PM</option>
                                                            <option value="02:00PM">2:00PM</option>
                                                            <option value="02:30PM">2:30PM</option>
                                                            <option value="03:00PM">3:00PM</option>
                                                            <option value="03:30PM">3:30PM</option>
                                                            <option value="04:00PM">4:00PM</option>
                                                            <option value="04:30PM">4:30PM</option>
                                                            <option value="05:00PM">5:00PM</option>
                                                            <option value="05:30PM">5:30PM</option>
                                                            <option value="06:00PM">6:00PM</option>
                                                            <option value="06:30PM">6:30PM</option>
                                                            <option value="07:00PM">7:00PM</option>
                                                            <option value="07:30PM">7:30PM</option>
                                                            <option value="08:00PM">8:00PM</option>
                                                            <option value="08:30PM">8:30PM</option>
                                                            <option value="09:00PM">9:00PM</option>
                                                            <option value="09:30PM">9:30PM</option>
                                                            <option value="10:00PM">10:00PM</option>
                                                            <option value="10:30PM">10:30PM</option>
                                                            <option value="11:00PM">11:00PM</option>
                                                            <option value="11:30PM">11:30PM</option>
                                                        </select>
                                                      </div>
                                                  </div>
                                              </div>
                                              <div className="col-md-6">
                                                  <br/>
                                                  <label>Slot 3 Time</label>
                                                  <div className="row">
                                                      <div className="col-xs-6">
                                                          <label>From</label>
                                                          <select className="form-control col-xs-6" defaultValue={this.state.slot3_from} id="slot3_from" name="slot3_from" required ref="slot3_from">
                                                            <option value="N.A.">N.A.</option>
                                                            <option value="12:00AM">12:00AM</option>
                                                            <option value="12:30AM">12:30AM</option>
                                                            <option value="01:00AM">1:00AM</option>
                                                            <option value="01:30AM">1:30AM</option>
                                                            <option value="02:00AM">2:00AM</option>
                                                            <option value="02:30AM">2:30AM</option>
                                                            <option value="03:00AM">3:00AM</option>
                                                            <option value="03:30AM">3:30AM</option>
                                                            <option value="04:00AM">4:00AM</option>
                                                            <option value="04:30AM">4:30AM</option>
                                                            <option value="05:00AM">5:00AM</option>
                                                            <option value="05:30AM">5:30AM</option>
                                                            <option value="06:00AM">6:00AM</option>
                                                            <option value="06:30AM">6:30AM</option>
                                                            <option value="07:00AM">7:00AM</option>
                                                            <option value="07:30AM">7:30AM</option>
                                                            <option value="08:00AM">8:00AM</option>
                                                            <option value="08:30AM">8:30AM</option>
                                                            <option value="09:00AM">9:00AM</option>
                                                            <option value="09:30AM">9:30AM</option>
                                                            <option value="10:00AM">10:00AM</option>
                                                            <option value="10:30AM">10:30AM</option>
                                                            <option value="11:00AM">11:00AM</option>
                                                            <option value="11:30AM">11:30AM</option>
                                                            <option value="12:00PM">12:00PM</option>
                                                            <option value="12:30PM">12:30PM</option>
                                                            <option value="01:00PM">1:00PM</option>
                                                            <option value="01:30PM">1:30PM</option>
                                                            <option value="02:00PM">2:00PM</option>
                                                            <option value="02:30PM">2:30PM</option>
                                                            <option value="03:00PM">3:00PM</option>
                                                            <option value="03:30PM">3:30PM</option>
                                                            <option value="04:00PM">4:00PM</option>
                                                            <option value="04:30PM">4:30PM</option>
                                                            <option value="05:00PM">5:00PM</option>
                                                            <option value="05:30PM">5:30PM</option>
                                                            <option value="06:00PM">6:00PM</option>
                                                            <option value="06:30PM">6:30PM</option>
                                                            <option value="07:00PM">7:00PM</option>
                                                            <option value="07:30PM">7:30PM</option>
                                                            <option value="08:00PM">8:00PM</option>
                                                            <option value="08:30PM">8:30PM</option>
                                                            <option value="09:00PM">9:00PM</option>
                                                            <option value="09:30PM">9:30PM</option>
                                                            <option value="10:00PM">10:00PM</option>
                                                            <option value="10:30PM">10:30PM</option>
                                                            <option value="11:00PM">11:00PM</option>
                                                            <option value="11:30PM">11:30PM</option>
                                                        </select>
                                                      </div>
                                                      <div className="col-xs-6">
                                                          <label>To</label>
                                                          <select className="form-control col-xs-6" defaultValue={this.state.slot3_to} id="slot3_to" name="slot3_to" required ref="slot3_to">
                                                            <option value="N.A.">N.A.</option>
                                                            <option value="12:00AM">12:00AM</option>
                                                            <option value="12:30AM">12:30AM</option>
                                                            <option value="01:00AM">1:00AM</option>
                                                            <option value="01:30AM">1:30AM</option>
                                                            <option value="02:00AM">2:00AM</option>
                                                            <option value="02:30AM">2:30AM</option>
                                                            <option value="03:00AM">3:00AM</option>
                                                            <option value="03:30AM">3:30AM</option>
                                                            <option value="04:00AM">4:00AM</option>
                                                            <option value="04:30AM">4:30AM</option>
                                                            <option value="05:00AM">5:00AM</option>
                                                            <option value="05:30AM">5:30AM</option>
                                                            <option value="06:00AM">6:00AM</option>
                                                            <option value="06:30AM">6:30AM</option>
                                                            <option value="07:00AM">7:00AM</option>
                                                            <option value="07:30AM">7:30AM</option>
                                                            <option value="08:00AM">8:00AM</option>
                                                            <option value="08:30AM">8:30AM</option>
                                                            <option value="09:00AM">9:00AM</option>
                                                            <option value="09:30AM">9:30AM</option>
                                                            <option value="10:00AM">10:00AM</option>
                                                            <option value="10:30AM">10:30AM</option>
                                                            <option value="11:00AM">11:00AM</option>
                                                            <option value="11:30AM">11:30AM</option>
                                                            <option value="12:00PM">12:00PM</option>
                                                            <option value="12:30PM">12:30PM</option>
                                                            <option value="01:00PM">1:00PM</option>
                                                            <option value="01:30PM">1:30PM</option>
                                                            <option value="02:00PM">2:00PM</option>
                                                            <option value="02:30PM">2:30PM</option>
                                                            <option value="03:00PM">3:00PM</option>
                                                            <option value="03:30PM">3:30PM</option>
                                                            <option value="04:00PM">4:00PM</option>
                                                            <option value="04:30PM">4:30PM</option>
                                                            <option value="05:00PM">5:00PM</option>
                                                            <option value="05:30PM">5:30PM</option>
                                                            <option value="06:00PM">6:00PM</option>
                                                            <option value="06:30PM">6:30PM</option>
                                                            <option value="07:00PM">7:00PM</option>
                                                            <option value="07:30PM">7:30PM</option>
                                                            <option value="08:00PM">8:00PM</option>
                                                            <option value="08:30PM">8:30PM</option>
                                                            <option value="09:00PM">9:00PM</option>
                                                            <option value="09:30PM">9:30PM</option>
                                                            <option value="10:00PM">10:00PM</option>
                                                            <option value="10:30PM">10:30PM</option>
                                                            <option value="11:00PM">11:00PM</option>
                                                            <option value="11:30PM">11:30PM</option>
                                                        </select>
                                                      </div>
                                                  </div>
                                              </div>
                                              <div className="col-md-6">
                                                  <br/>
                                                  <label>Time Fee</label>
                                                  <input type="number" className="form-control" value={this.state.time_fee} id="time_fee" name="time_fee" required onChange={e => this.setState({ time_fee: e.target.value })} />
                                              </div>
                                              <div className="col-md-6">
                                                  <br/>
                                                  <label>
                                                    Categories
                                                    &nbsp;<span id="category_message" style={{color: 'red', display: 'none'}}>This field is required*</span>
                                                  </label>
                                                  <Select options={this.state.categories} value={this.state.selected_categories} isClearable={true} id="categories" isMulti="true" name="categories" required onChange={this.handleCategoryChange} />
                                              </div>
                                              <div className="col-md-6">
                                                  <br/>
                                                  <label>
                                                    Home And Kitchen
                                                    &nbsp;<span id="home_message" style={{color: 'red', display: 'none'}}>This field is required*</span>
                                                  </label>
                                                  <Select options={this.state.home_and_kitchen} value={this.state.selected_home_and_kitchen} id="home_and_kitchen" isMulti="true" onChange={this.handleHomeChange} isClearable={true} name="home_and_kitchen" required/>
                                              </div>
                                              <div className="col-md-6">
                                                  <br/>
                                                  <label>
                                                    Brands
                                                    &nbsp;<span id="brand_message" style={{color: 'red', display: 'none'}}>This field is required*</span>
                                                  </label>
                                                  <Select options={this.state.brands} isClearable={true} value={this.state.selected_brands} onChange={this.handleBrandsChange} id="brands" isMulti="true" name="brands"/>
                                              </div>
                                              <div className="col-md-12">
                                                  <h3>
                                                    Add Standard Delivery Charge Rates
                                                    <button type="button" className="btn btn-primary" onClick={this.addMoreFields.bind(this)} style={{marginLeft: '7px'}}>
                                                        <i className="fa fa-plus"></i>
                                                    </button>
                                                    { this.renderRemoveElement() }
                                                    
                                                  </h3>
                                                  <div id="standard_rates" className="row">
                                                      <div className="col-md-4">
                                                          <label>Order Amount Upto</label>
                                                      </div>
                                                      <div className="col-md-4">
                                                          <label>Charge</label>
                                                      </div>
                                                      <div style={{clear: 'both'}}></div>
                                                      {this.state.delivery_rates.map((rate, key) => (
                                                        <React.Fragment key={key}>
                                                           <div className="col-md-4">
                                                                <br/>
                                                                <input className="form-control upto_amount" type="number" defaultValue={rate.upto_amount} required />
                                                            </div>
                                                            <div className="col-md-4">
                                                                <br/>
                                                                <input className="form-control upto_charge" type="number" defaultValue={rate.charge} required />
                                                            </div>
                                                            <div style={{clear: 'both'}}></div>
                                                        </React.Fragment>
                                                      ))}
                                                  </div>
                                              </div>
                                              <div className="col-md-12">
                                                  <br/>
                                                  <button type="submit" name="add" className="btn pull-right btn-primary">Edit Data</button>
                                              </div>
                                          </div>
                                          <br/>
                                      </div>                 
                                  </form>
                              </div>
                          </div>
                      </section>
                  </div>
            </React.Fragment>
        );
    }
    }

class DeliveryChargeSetup extends React.Component{

    constructor() {
        super();
        this.state = {
            pincode: '',
            standard_from: '',
            standard_to: '',
            slot1_from: '',
            slot1_to: '',
            slot2_from: '',
            slot2_to: '',
            slot3_from: '',
            slot3_to: '',
            free_above: '',
            categories: [],
            home_and_kitchen: [],
            brands: [],
            selected_categories: [],
            rates: []
        };
        
        this.childKey = 0;    
        this.deleteRate = this.deleteRate.bind(this);
        
        //FETCH HOME AND KITCHEN CATEGORIES
        let formData = new FormData();
        formData.append('type', "home")
        axios({
                method: 'post',
                url: api_link+'CategoriesFetch.php',
                data: formData,
                config: { headers: {'Content-Type': 'multipart/form-data' }}
        }).then(response => response.data)
        .then((data) => {
          this.setState({ home_and_kitchen: data })
         })
        
        //FETCH BRANDS CATEGORIES
        let formData1 = new FormData();
        formData1.append('type', "brands")        
        axios({
                method: 'post',
                url: api_link+'CategoriesFetch.php',
                data: formData,
                config: { headers: {'Content-Type': 'multipart/form-data' }}
        }).then(response => response.data)
        .then((data) => {
          this.setState({ brands: data })
         })
        
        //FETCH MENU CATEGORIES
        const url = api_link+'CategoriesFetch.php'
        axios.get(url).then(response => response.data)
        .then((data) => {
          this.setState({ categories: data })
         })
    }
    
    componentDidMount() {
        document.title="Delivery Rate Setup"
        
        
        //FETCH ALL DELIVERY RATE DATA
        let formData = new FormData();
        formData.append('delivery', "yes")
        var obj=this
        axios({
            method: 'post',
            url: api_link+'AgentsFetch.php',
            data: formData,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
        .then(response => response.data)
        .then((data) => {
            obj.setState({ rates: data})
            $("script[src='js/dataTable.js']").remove();
                
            const script = document.createElement("script");
            script.src = "js/dataTable.js";
            script.async = true;
            document.body.appendChild(script);
         })
            
    }

    shouldComponentUpdate(nextProps,nextState){
      if(JSON.stringify(this.state.rates) === JSON.stringify(nextState.rates))
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

    deleteRate = qid  => e => {
      
          if(window.confirm("Are You Sure To Delete This Rate?")) 
          {
              let formData = new FormData();
              formData.append('delete_delivery_rate', qid)
              var obj=this

              axios({
                  method: 'post',
                  url: api_link+'AgentsManagement.php',
                  data: formData,
                  config: { headers: {'Content-Type': 'multipart/form-data' }}
              })
              .then(function (response) {
                  //handle success
                  if(response.data === "ok")
                  {	
                      let formData1 = new FormData();
                      formData1.append('delivery', "yes")
                      axios({
                          method: 'post',
                          url: api_link+'AgentsFetch.php',
                          data: formData1,
                          config: { headers: {'Content-Type': 'multipart/form-data' }}
                      }).then(response => response.data)
                      .then((data) => {
                        obj.setState({ doingModal: false, rates: data})
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
        return(
            <React.Fragment>
                <div className="content-wrapper">
                    <section>
                        <div id="update_message" className="alert" style={{display: 'none'}}></div> 
                    </section>
                    <section className="content-header">
                        <h1>Delivery Rate Setup</h1>
                        <ol className="breadcrumb">
                              <li>
                                  <div className="pull-right"> 
                                      <Link to="/admin/add_delivery_rate" className="btn btn-primary">
                                            <i className="fa fa-plus"></i>
                                      </Link>
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
                                      <th>Pincode</th>
                                      <th>Standard Delivery</th>
                                      <th>Slot 1</th>
                                      <th>Slot 2</th>
                                      <th>Slot 3</th>
                                      <th>Time Fee</th>
                                      <th>Free Delivery Above</th>
                                      <th>Action</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                      {this.state.rates.map((rate, key) => {
                                            return(
                                              <tr key={rate.id}>
                                                  <td id={'pincode'+rate.id}>{rate.pincode}</td>
                                                  <td>
                                                      {rate.standard_from + ' - ' + rate.standard_to}
                                                      <input type="hidden" id={'standard_from'+rate.id} value={rate.standard_from}/>
                                                      <input type="hidden" id={'standard_to'+rate.id} value={rate.standard_to}/>
                                                  </td>
                                                  <td>
                                                      {
                                                          rate.slot1_from === "N.A."
                                                          ?
                                                          'N.A.'
                                                          :
                                                          rate.slot1_from + ' - ' + rate.slot1_to
                                                      }
                                                      <input type="hidden" id={'slot1_from'+rate.id} value={rate.slot1_from}/>
                                                      <input type="hidden" id={'slot1_to'+rate.id} value={rate.slot1_to}/>
                                                  </td>
                                                  <td>
                                                      {
                                                          rate.slot2_from === "N.A."
                                                          ?
                                                          'N.A.'
                                                          :
                                                          rate.slot2_from + ' - ' + rate.slot2_to
                                                      }
                                                      <input type="hidden" id={'slot2_from'+rate.id} value={rate.slot2_from}/>
                                                      <input type="hidden" id={'slot2_to'+rate.id} value={rate.slot2_to}/>
                                                  </td>
                                                  <td>
                                                      {
                                                          rate.slot3_from === "N.A."
                                                          ?
                                                          'N.A.'
                                                          :
                                                          rate.slot3_from + ' - ' + rate.slot3_to
                                                      }
                                                      <input type="hidden" id={'slot3_from'+rate.id} value={rate.slot3_from}/>
                                                      <input type="hidden" id={'slot3_to'+rate.id} value={rate.slot3_to}/>
                                                  </td>
                                                  <td id={'tme_fee'+rate.id}>{rate.time_fee}</td>
                                                  <td id={'free_above'+rate.id}>{rate.free_above}</td>
                                                  <td>
                                                      
                                                      <input type="hidden" id={'categories'+rate.id} value={rate.categories}/>
                                                      <input type="hidden" id={'home_and_kitchen'+rate.id} value={rate.home_and_kitchen}/>
                                                      <input type="hidden" id={'brands'+rate.id} value={rate.brands}/>
                                                      
                                                      <Link to={"/admin/edit_delivery_rate/"+rate.id} className="btn btn-success">
                                                            <i className="fa fa-edit"></i> Edit
                                                      </Link>
                                                      <button type="button" name="delete" className="btn btn-danger" value={rate.id} style={{marginLeft: '5px'}} onClick={this.deleteRate(rate.id)} ><i className="fa fa-trash"></i> Delete</button>
                                                  </td>
                                                </tr>
                                            );
                                    })}
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

class PendingCommissions extends React.Component{

    constructor() {
        super();
        this.state = {
            refresh: false,
            editModalVisible: false,
            doingModal: false,
            transaction_type: '',
            transaction_id: '',
            commissions: []
        };
        
        this.childKey = 0;    
        this.closeModal = this.closeModal.bind(this);
    }
    
    componentDidMount() {
        document.title="Pending Commissions"
        
        let formData = new FormData();
        formData.append('pending_commissions', "yes")

        var obj=this
        
        axios({
            method: 'post',
            url: api_link+'AgentsFetch.php',
            data: formData,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
        .then(response => response.data)
        .then((data) => {
            obj.setState({ commissions: data})
            $("script[src='js/dataTable.js']").remove();
                
            const script = document.createElement("script");
            script.src = "js/dataTable.js";
            script.async = true;
            document.body.appendChild(script);
         })
            
    }

    shouldComponentUpdate(nextProps,nextState)
    {
      if(JSON.stringify(this.state.commissions) === JSON.stringify(nextState.commissions))
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
            eid: qid
          })
        
      }
    
    closeModal() {
        this.setState({
          doingModal: true,
          editModalVisible: !this.state.editModalVisible
        });
      }

    handleEditFormSubmit( event ) {
		event.preventDefault();
		$("#invalid_message").hide();
        
        let formData = new FormData();
        formData.append('make_commission', this.state.eid)
        formData.append('transaction_type', this.state.transaction_type)
        formData.append('transaction_id', this.state.transaction_id)

        var obj=this

        axios({
            method: 'post',
            url: api_link+'AgentsManagement.php',
            data: formData,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
        .then(function (response) {
            //handle success
//                $(".loader_gif").hide();
            document.getElementById("editIncentive").reset();
            obj.closeModal()
            if(response.data === "ok")
            {	
                let formData1 = new FormData();
                formData1.append('pending_commissions', "yes")
                axios({
                    method: 'post',
                    url: api_link+'AgentsFetch.php',
                    data: formData1,
                    config: { headers: {'Content-Type': 'multipart/form-data' }}
                }).then(response => response.data)
                .then((data) => {
                  obj.setState({ doingModal: false, commissions: data})
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

    render()
    {
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
                        <h1>Pending Commissions</h1>
                    </section>

                    <section className="content" key={this.childKey}>
                          <div className="box">
                              <div className="box-body table-responsive">
                                  <br/>
                                  <table id="example1" className="table">
                                    <thead>
                                    <tr>
                                      <th>Agent Name</th>
                                      <th>Agent Contact</th>
                                      <th>Commission</th>
                                      <th>Order Id</th>
                                      <th>Bank Name</th>
                                      <th>Bank Account</th>
                                      <th>Bank IFSC</th>
                                      <th>Bank Branch</th>
                                      <th>Action</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                      {this.state.commissions.map((commission, key) => (
                                      <tr key={commission.id}>
                                          <td id={'name'+commission.id}>{commission.name}</td>
                                          <td id={'contact'+commission.id}>{commission.contact}</td>
                                          <td id={'commission'+commission.id}>{commission.commission}</td>
                                          <td id={'order_id'+commission.id}>
                                              <Link to={"/admin/view-order/"+commission.order_id+"/"+commission.c_name}>
                                                  {commission.order_id}
                                              </Link>
                                          </td>
                                          <td id={'bank_name'+commission.id}>{commission.bank_name}</td>
                                          <td id={'bank_account'+commission.id}>{commission.bank_account}</td>
                                          <td id={'bank_ifsc'+commission.id}>{commission.bank_ifsc}</td>
                                          <td id={'bank_branch'+commission.id}>{commission.bank_branch}</td>
                                          <td>
                                              <button type="button" name="edit" className="btn btn-success" value={commission.id} onClick={this.openEditModal(commission.id)} ><i className="fa fa-check"></i> Mark Provided</button>
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
                  
                <div className={'modal '+emodalFade} id="edit_modal"  style={estyles}>
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <button type="button" className="close"  onClick={this.closeModal}>
                          <span aria-hidden="true">&times;</span>
                        </button>
                        <h4 className="modal-title">Add Transaction Details</h4>
                      </div>
                      <form id="editIncentive" onSubmit={this.handleEditFormSubmit.bind(this)}>
                      <div className="modal-body">
                              <div className="row">
                                  <div className="col-md-12">
                                        <label>Transaction Type</label>
                                        <input type="text" className="form-control" id="etransaction_type" name="etransaction_type" placeholder="Cash or UPI or Net Banking" required onChange={e => this.setState({ transaction_type: e.target.value })} />
                                  </div>
                                  <div className="col-md-12">
                                        <br/>
                                        <label>Transaction Id</label>
                                        <input type="text" className="form-control" id="etransaction_id" name="etransaction_id" placeholder="N.A. if not applicable" required onChange={e => this.setState({ transaction_id: e.target.value })} />
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

class PendingIncentives extends React.Component{

    constructor() {
        super();
        this.state = {
            refresh: false,
            editModalVisible: false,
            doingModal: false,
            transaction_type: '',
            transaction_id: '',
            incentives: []
        };
        
        this.childKey = 0;    
        this.closeModal = this.closeModal.bind(this);
    }
    
    componentDidMount() {
        document.title="Pending Incentives"
        
        let formData = new FormData();
        formData.append('pending_incentives', "yes")

        var obj=this
        
        axios({
            method: 'post',
            url: api_link+'AgentsFetch.php',
            data: formData,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
        .then(response => response.data)
        .then((data) => {
            obj.setState({ incentives: data})
            $("script[src='js/dataTable.js']").remove();
                
            const script = document.createElement("script");
            script.src = "js/dataTable.js";
            script.async = true;
            document.body.appendChild(script);
         })
            
    }

    shouldComponentUpdate(nextProps,nextState)
    {
      if(JSON.stringify(this.state.incentives) === JSON.stringify(nextState.incentives))
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
            eid: qid
          })
        
      }
    
    closeModal() {
        this.setState({
          doingModal: true,
          editModalVisible: !this.state.editModalVisible
        });
      }

    handleEditFormSubmit( event ) {
		event.preventDefault();
		$("#invalid_message").hide();
        
        let formData = new FormData();
        formData.append('make_incentive', this.state.eid)
        formData.append('transaction_type', this.state.transaction_type)
        formData.append('transaction_id', this.state.transaction_id)

        var obj=this

        axios({
            method: 'post',
            url: api_link+'AgentsManagement.php',
            data: formData,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
        .then(function (response) {
            //handle success
//                $(".loader_gif").hide();
            document.getElementById("editIncentive").reset();
            obj.closeModal()
            if(response.data === "ok")
            {	
                let formData1 = new FormData();
                formData1.append('pending_incentives', "yes")
                axios({
                    method: 'post',
                    url: api_link+'AgentsFetch.php',
                    data: formData1,
                    config: { headers: {'Content-Type': 'multipart/form-data' }}
                }).then(response => response.data)
                .then((data) => {
                  obj.setState({ doingModal: false, incentives: data})
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

    render()
    {
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
                        <h1>Pending Incentives</h1>
                    </section>

                    <section className="content" key={this.childKey}>
                          <div className="box">
                              <div className="box-body table-responsive">
                                  <br/>
                                  <table id="example1" className="table">
                                    <thead>
                                    <tr>
                                      <th>Agent Name</th>
                                      <th>Agent Contact</th>
                                      <th>Incentive Range</th>
                                      <th>Incentive Amount</th>
                                      <th>Due On</th>
                                      <th>Bank Name</th>
                                      <th>Bank Account</th>
                                      <th>Bank IFSC</th>
                                      <th>Bank Branch</th>
                                      <th>Action</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                      {this.state.incentives.map((incentive, key) => (
                                      <tr key={incentive.id}>
                                          <td id={'name'+incentive.id}>{incentive.name}</td>
                                          <td id={'contact'+incentive.id}>{incentive.contact}</td>
                                          <td id={'incentive'+incentive.id}>{incentive.incentive_range}</td>
                                          <td id={'incentive_amount'+incentive.id}>{incentive.amount}</td>
                                          <td id={'due_on'+incentive.id}>{incentive.due_on}</td>
                                          <td id={'bank_name'+incentive.id}>{incentive.bank_name}</td>
                                          <td id={'bank_account'+incentive.id}>{incentive.bank_account}</td>
                                          <td id={'bank_ifsc'+incentive.id}>{incentive.bank_ifsc}</td>
                                          <td id={'bank_branch'+incentive.id}>{incentive.bank_branch}</td>
                                          <td>
                                              <button type="button" name="edit" className="btn btn-success" value={incentive.id} onClick={this.openEditModal(incentive.id)} ><i className="fa fa-check"></i> Mark Provided</button>
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
                  
                <div className={'modal '+emodalFade} id="edit_modal"  style={estyles}>
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <button type="button" className="close"  onClick={this.closeModal}>
                          <span aria-hidden="true">&times;</span>
                        </button>
                        <h4 className="modal-title">Add Transaction Details</h4>
                      </div>
                      <form id="editIncentive" onSubmit={this.handleEditFormSubmit.bind(this)}>
                      <div className="modal-body">
                              <div className="row">
                                  <div className="col-md-12">
                                        <label>Transaction Type</label>
                                        <input type="text" className="form-control" id="etransaction_type" name="etransaction_type" placeholder="Cash or UPI or Net Banking" required onChange={e => this.setState({ transaction_type: e.target.value })} />
                                  </div>
                                  <div className="col-md-12">
                                        <br/>
                                        <label>Transaction Id</label>
                                        <input type="text" className="form-control" id="etransaction_id" name="etransaction_id" placeholder="N.A. if not applicable" required onChange={e => this.setState({ transaction_id: e.target.value })} />
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

class PaidCommissions extends React.Component{

    constructor() {
        super();
        this.state = {
            refresh: false,
            commissions: []
        };
        
        this.childKey = 0;    
    }
    
    componentDidMount() {
        document.title="Paid Commissions"
        
        let formData = new FormData();
        formData.append('paid_commissions', "yes")

        var obj=this
        
        axios({
            method: 'post',
            url: api_link+'AgentsFetch.php',
            data: formData,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
        .then(response => response.data)
        .then((data) => {
            obj.setState({ commissions: data})
            $("script[src='js/dataTable.js']").remove();
                
            const script = document.createElement("script");
            script.src = "js/dataTable.js";
            script.async = true;
            document.body.appendChild(script);
         })
            
    }

    render()
    {
        return(
            <React.Fragment>
                <div className="content-wrapper">
                    <section>
                        <div id="update_message" className="alert" style={{display: 'none'}}></div> 
                    </section>
                    <section className="content-header">
                        <h1>Paid Commissions</h1>
                    </section>

                    <section className="content" key={this.childKey}>
                          <div className="box">
                              <div className="box-body table-responsive">
                                  <br/>
                                  <table id="example1" className="table">
                                    <thead>
                                    <tr>
                                      <th>Agent Name</th>
                                      <th>Agent Contact</th>
                                      <th>Commission</th>
                                      <th>Order Id</th>
                                      <th>Bank Name</th>
                                      <th>Bank Account</th>
                                      <th>Bank IFSC</th>
                                      <th>Bank Branch</th>
                                      <th>Transaction Type</th>
                                      <th>Transaction Id</th>
                                      <th>Paid On</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                      {this.state.commissions.map((commission, key) => (
                                      <tr key={commission.id}>
                                          <td id={'name'+commission.id}>{commission.name}</td>
                                          <td id={'contact'+commission.id}>{commission.contact}</td>
                                          <td id={'commission'+commission.id}>{commission.commission}</td>
                                          <td id={'order_id'+commission.id}>
                                              <Link to={"/admin/view-order/"+commission.order_id+"/"+commission.c_name}>
                                                  {commission.order_id}
                                              </Link>
                                          </td>
                                          <td id={'bank_name'+commission.id}>{commission.bank_name}</td>
                                          <td id={'bank_account'+commission.id}>{commission.bank_account}</td>
                                          <td id={'bank_ifsc'+commission.id}>{commission.bank_ifsc}</td>
                                          <td id={'bank_branch'+commission.id}>{commission.bank_branch}</td>
                                          <td id={'transaction_type'+commission.id}>{commission.transaction_type}</td>
                                          <td id={'transaction_id'+commission.id}>{commission.transaction_id}</td>
                                          <td id={'paid_on'+commission.id}>{commission.paid_on}</td>
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

class PaidIncentives extends React.Component{

    constructor() {
        super();
        this.state = {
            refresh: false,
            incentives: []
        };
        
        this.childKey = 0;    
    }
    
    componentDidMount() {
        document.title="Paid Incentives"
        
        let formData = new FormData();
        formData.append('paid_incentives', "yes")

        var obj=this
        
        axios({
            method: 'post',
            url: api_link+'AgentsFetch.php',
            data: formData,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
        .then(response => response.data)
        .then((data) => {
            obj.setState({ incentives: data})
            $("script[src='js/dataTable.js']").remove();
                
            const script = document.createElement("script");
            script.src = "js/dataTable.js";
            script.async = true;
            document.body.appendChild(script);
         })
            
    }

    render()
    {
        return(
            <React.Fragment>
                <div className="content-wrapper">
                    <section>
                        <div id="update_message" className="alert" style={{display: 'none'}}></div> 
                    </section>
                    <section className="content-header">
                        <h1>Paid Incentives</h1>
                    </section>

                    <section className="content" key={this.childKey}>
                          <div className="box">
                              <div className="box-body table-responsive">
                                  <br/>
                                  <table id="example1" className="table">
                                    <thead>
                                    <tr>
                                      <th>Agent Name</th>
                                      <th>Agent Contact</th>
                                      <th>Incentive Range</th>
                                      <th>Incentive Amount</th>
                                      <th>Due On</th>
                                      <th>Bank Name</th>
                                      <th>Bank Account</th>
                                      <th>Bank IFSC</th>
                                      <th>Bank Branch</th>
                                      <th>Transaction Type</th>
                                      <th>Transaction ID</th>
                                      <th>Paid On</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                      {this.state.incentives.map((incentive, key) => (
                                      <tr key={incentive.id}>
                                          <td id={'name'+incentive.id}>{incentive.name}</td>
                                          <td id={'contact'+incentive.id}>{incentive.contact}</td>
                                          <td id={'incentive'+incentive.id}>{incentive.incentive_range}</td>
                                          <td id={'incentive_amount'+incentive.id}>{incentive.amount}</td>
                                          <td id={'due_on'+incentive.id}>{incentive.due_on}</td>
                                          <td id={'bank_name'+incentive.id}>{incentive.bank_name}</td>
                                          <td id={'bank_account'+incentive.id}>{incentive.bank_account}</td>
                                          <td id={'bank_ifsc'+incentive.id}>{incentive.bank_ifsc}</td>
                                          <td id={'bank_branch'+incentive.id}>{incentive.bank_branch}</td>
                                          <td id={'transaction_type'+incentive.id}>{incentive.transaction_type}</td>
                                          <td id={'transaction_id'+incentive.id}>{incentive.transaction_id}</td>
                                          <td id={'paid_on'+incentive.id}>{incentive.paid_on}</td>
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

export {
    AgentDetails,
    BlockedAgentDetails,
    AgentIncentiveSetup,
    DeliveryChargeSetup,
    AddDeliveryRate,
    EditDeliveryRate,
    PendingCommissions,
    PendingIncentives,
    PaidCommissions,
    PaidIncentives,
};