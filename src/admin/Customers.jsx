import React from 'react';

import { Link } from "react-router-dom";
import { api_link } from './AdminLogin';

import axios from 'axios';
import $ from 'jquery';

class BlockCustomers extends React.Component{

    constructor() {
        super();
        this.state = {
          customers: []
        };
        
        this.childKey = 0;    
    }
    
    componentDidMount() {
        document.title="Blocked Customers"
        
        let formData = new FormData();
        formData.append('block', "yes")

        var obj=this
        
        axios({
            method: 'post',
            url: api_link+'CustomersFetch.php',
            data: formData,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
        .then(response => response.data)
        .then((data) => {
            obj.setState({ customers: data})
            $("script[src='js/dataTable.js']").remove();
                
            const script = document.createElement("script");
            script.src = "js/dataTable.js";
            script.async = true;
            document.body.appendChild(script);
         })
            
    }

    shouldComponentUpdate(nextProps,nextState){
      if(JSON.stringify(this.state.customers) === JSON.stringify(nextState.customers))
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

    unblockUser = userid  => e => {
        if(window.confirm('Do You Want To Unblock The User? Y/N'))
        {
            $("#update_message").hide();
            $(".loader_gif").show();
            let formData = new FormData();
            formData.append('enable', userid)

            var obj=this

            axios({
                method: 'post',
                url: api_link+'CustomersManagement.php',
                data: formData,
                config: { headers: {'Content-Type': 'multipart/form-data' }}
            })
            .then(function (response) {
                //handle success
                $(".loader_gif").fadeOut("slow");
                if(response.data === "ok")
                {	
                    let formData1 = new FormData();
                    formData1.append('block', "yes")
                    axios({
                        method: 'post',
                        url: api_link+'CustomersFetch.php',
                        data: formData1,
                        config: { headers: {'Content-Type': 'multipart/form-data' }}
                    })
                    .then(response => response.data)
                    .then((data) => {
                        obj.setState({ customers: data})
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
        
        return(
            <React.Fragment>
                <div className="content-wrapper">
                    <section>
                        <div id="update_message" className="alert" style={{display: 'none'}}></div> 
                    </section>
                    <section className="content-header">
                        <h1>
                            Blocked Customers
                            <div className="pull-right">
                                 <Link className="btn btn-success" to="/admin/local_customers">Local Customers</Link>
                            </div>
                        </h1>
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
                                      <th>Contact</th>
                                      <th>No Of Orders</th>
                                      <th>Total Order Amount</th>
                                      <th>Address</th>
                                      <th>Last Purchase</th>
                                      <th>Block Reason</th>
                                      <th>Action</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                      {this.state.customers.map((customer, key) => (
                                      <tr key={customer.id}>
                                          <td id={'name'+customer.id}>{customer.f_name+' '+customer.l_name}</td>
                                          <td id={'email'+customer.id}>{customer.email}</td>
                                          <td id={'contact'+customer.id}>{customer.contact}</td>
                                          <td id={'orders'+customer.id}>{customer.orders}</td>
                                          <td id={'orders'+customer.id}>{customer.total_amount}</td>
                                          <td id={'address'+customer.id}>{customer.address}</td>
                                          <td id={'last_purchase'+customer.id}>{customer.last_purchase}</td>
                                          <td id={'block_reason'+customer.id}>{customer.block_reason}</td>
                                          <td>
                                                <button type="submit" name="block" className="btn btn-success" onClick={this.unblockUser(customer.u_id)}>
                                                         <i className="fa fa-ban btn-success"></i> Unblock
                                                </button>    
                                                <Link to={"/admin/customer_order_details/"+customer.u_id+"/"+customer.f_name+' '+customer.l_name} className="btn btn-primary">
                                                    <i className="fa fa-eye"></i>
                                                </Link>
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

class ActiveCustomers extends React.Component{

    constructor() {
        super();
        this.state = {
            refresh: false,
            modalVisible: false,
            editModalVisible: false,
            doingModal: false,
            user_id: '',
            eid: '',
            reason: '',
            customers: []
        };
        
        this.childKey = 0;  
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }
    
    componentDidMount() {
        document.title="Active Customers"
        
        let formData = new FormData();
        formData.append('active', "yes")

        var obj=this
        
        axios({
            method: 'post',
            url: api_link+'CustomersFetch.php',
            data: formData,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
        .then(response => response.data)
        .then((data) => {
            obj.setState({ customers: data})
            $("script[src='js/dataTable.js']").remove();
                
            const script = document.createElement("script");
            script.src = "js/dataTable.js";
            script.async = true;
            document.body.appendChild(script);
         })
            
    }

    shouldComponentUpdate(nextProps,nextState){
      if(JSON.stringify(this.state.customers) === JSON.stringify(nextState.customers))
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

    blockUser = userid  => e => {
        this.setState({
            user_id: userid,
        })
        this.openModal();
    }
    
    handleAddFormSubmit( event ) {
		event.preventDefault();
		if(window.confirm('Do You Want To Block The User? Y/N'))
        {
            $("#update_message").hide();
            $(".loader_gif").show();
            let formData = new FormData();
            formData.append('block', this.state.user_id)
            formData.append('reason', this.state.reason)

            var obj=this

            axios({
                method: 'post',
                url: api_link+'CustomersManagement.php',
                data: formData,
                config: { headers: {'Content-Type': 'multipart/form-data' }}
            })
            .then(function (response) {
                //handle success
                $(".loader_gif").fadeOut("slow");
                if(response.data === "ok")
                {	
                    obj.openModal();
                    let formData1 = new FormData();
                    formData1.append('active', "yes")
                    axios({
                        method: 'post',
                        url: api_link+'CustomersFetch.php',
                        data: formData1,
                        config: { headers: {'Content-Type': 'multipart/form-data' }}
                    })
                    .then(response => response.data)
                    .then((data) => {
                        obj.setState({ customers: data})
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
        
        if($("#n_pass").val() === $("#c_pass").val())
        {
            if(window.confirm("Are you sure to change password?"))
            {
                let formData = new FormData();
                formData.append('update_customer_password', this.state.eid)
                formData.append('new_pass', $("#n_pass").val())

                var obj=this

                axios({
                    method: 'post',
                    url: api_link+'CustomersManagement.php',
                    data: formData,
                    config: { headers: {'Content-Type': 'multipart/form-data' }}
                })
                .then(function (response) {
                    //handle success
                    document.getElementById("editCustomer").reset();
                    obj.closeModal()
                    if(response.data === "ok")
                    {	
                        let formData1 = new FormData();
                        formData1.append('active', "yes")
                        axios({
                            method: 'post',
                            url: api_link+'CustomersFetch.php',
                            data: formData1,
                            config: { headers: {'Content-Type': 'multipart/form-data' }}
                        })
                        .then(response => response.data)
                        .then((data) => {
                            obj.setState({ customers: data})
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
        else
        {
            alert("Please Enter Same Password!");
            $("#c_pass").focus();
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
                        <h1>
                            Active Customers
                            <div className="pull-right">
                                 <Link className="btn btn-success" to="/admin/local_customers">Local Customers</Link>
                            </div>
                        </h1>
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
                                      <th>Contact</th>
                                      <th>No Of Orders</th>
                                      <th>Total Order Amount</th>
                                      <th>Address</th>
                                      <th>Last Purchase</th>
                                      <th>Action</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                      {this.state.customers.map((customer, key) => (
                                      <tr key={customer.id}>
                                          <td id={'name'+customer.id}>{customer.f_name+' '+customer.l_name}</td>
                                          <td id={'email'+customer.id}>{customer.email}</td>
                                          <td id={'contact'+customer.id}>{customer.contact}</td>
                                          <td id={'orders'+customer.id}>{customer.orders}</td>
                                          <td id={'orders'+customer.id}>{customer.total_amount}</td>
                                          <td id={'address'+customer.id}>{customer.address}</td>
                                          <td id={'last_purchase'+customer.id}>{customer.last_purchase}</td>
                                          <td>
                                                <button type="submit" name="block" className="btn btn-danger" value="20" onClick={this.blockUser(customer.u_id)}>
                                                         <i className="fa fa-window-close btn-danger"></i> Block
                                                </button>    
                                                <br/>
                                                <button type="button" name="edit" className="btn btn-success" value={customer.u_id} onClick={this.openEditModal(customer.u_id)} ><i className="fa fa-key"></i> Pass</button>
                                                <br/>
                                                <Link to={"/admin/customer_order_details/"+customer.u_id+"/"+customer.f_name+' '+customer.l_name} className="btn btn-primary">
                                                    <i className="fa fa-eye"></i>
                                                </Link>
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
                            <h4 className="modal-title">Reason For Blocking</h4>
                          </div> 
                          <form id="addCustomer" onSubmit={this.handleAddFormSubmit.bind(this)}>
                          <div className="modal-body">
                              <div className="row">
                                  <div className="col-md-12">
                                        <label>Reason</label>
                                        <textarea className="form-control" id="reason" name="reason" style={{resize: 'none'}} required onChange={e => this.setState({ reason: e.target.value })} />
                                  </div>
                              </div>
                              <br/>
                             </div>
                          <div className="modal-footer">
                            <button type="button" className="btn btn-default pull-left" onClick={this.openModal}>Close</button>
                            <button type="submit" name="add" className="btn btn-primary">Block User</button>
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
                        <h4 className="modal-title">Change Password</h4>
                      </div>
                      <form id="editCustomer" onSubmit={this.handleEditFormSubmit.bind(this)}>
                      <div className="modal-body">
                              <div className="row">
                                  <div className="col-md-6">
                                      <label>New Password</label>
                                        <input type="text" className="form-control" id="n_pass" name="n_pass" required />
                                  </div>
                                  <div className="col-md-6">
                                        <label>Confirm Password</label>
                                        <input type="text" className="form-control" id="c_pass" name="c_pass" required />
                                  </div>
                              </div>
                              <br/>
                             </div>
                      <div className="modal-footer">
                        <button type="button" className="btn btn-default pull-left" onClick={this.closeModal}>Close</button>
                        <button type="submit" name="edit" className="btn btn-primary">Change Pass</button>
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
    ActiveCustomers,
    BlockCustomers,
};