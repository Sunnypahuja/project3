import React from 'react';

import { Link } from "react-router-dom";
import { api_link } from './AdminLogin';

import axios from 'axios';
import $ from 'jquery';

class PendingOrders extends React.Component{
    constructor() {
        super();
        this.state = {
            orders: [],
        };
        
        this.childKey=0;
        
        let formData = new FormData();
		formData.append('pending', "pending")
		formData.append('admin_controller', "admin")
      
		axios({
			method: 'post',
			url: api_link+'OrdersFetch.php',
			data: formData,
		})
		.then(response => response.data)
        .then((data) => {
            this.setState({ orders: data })
            this.childKey+=1;
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
        document.title="Pending Orders"  
    }
    
    shouldComponentUpdate(nextProps,nextState){
      if(JSON.stringify(this.state.orders) === JSON.stringify(nextState.orders))
      {
          return false;
      }
      else
      {
        return true;
      }
    }

    render()
    {
        return(
            <div className="content-wrapper">
                <section className="content-header">
                  <h1> Pending Orders</h1>
                </section>
                <section className="content">
                  <div className="row">
                    <div className="col-xs-12">
                      <div className="box">
                        <div className="box-body table-responsive" key={this.childKey}>
                          <table id="example1" className="table table-striped">
                            <thead>
                              <tr>
                                <th>Order ID</th>
                                <th>Customer Name</th>
                                <th>Contact No</th>
                                <th>Ordered On</th>
                                <th>Total</th>
                                <th>Time Slot</th>
                                <th>Time Slot Type</th>
                                <th>Agent Name</th>
                                <th>Commission</th>
                              </tr>
                            </thead>
                            <tbody>
                              {this.state.orders.map((order, key) => (
                                <tr key={order.id}>
                                    <td><Link to={"/admin/view-order/"+order.order_id+"/"+order.name}>{order.order_id}</Link></td>
                                    <td>{order.name}</td>
                                    <td>{order.contact}</td>
                                    <td>{order.time_statmpts}</td>
                                    <td>{order.order_amount}</td>
                                    <td>{order.time_slot}</td>
                                    <td style={{textTransform: 'capitalize'}}>{order.time_slot_type}</td>
                                    <td>{order.agent_name}</td>
                                    <td>{order.commission}</td>
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
                <div className="control-sidebar-bg" />
            </div>
        );
    }
}

class DeliveredOrders extends React.Component{
    constructor() {
        super();
        this.state = {
            orders: [],
        };
        
        this.childKey=0;
        
        let formData = new FormData();
		formData.append('delivered', "delivered")
        formData.append('admin_controller', "admin")
      
		axios({
			method: 'post',
			url: api_link+'OrdersFetch.php',
			data: formData,
		})
		.then(response => response.data)
        .then((data) => {
            this.setState({ orders: data })
            this.childKey+=1;
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
        document.title="Delivered Orders"  
    }
    
    shouldComponentUpdate(nextProps,nextState){
      if(JSON.stringify(this.state.orders) === JSON.stringify(nextState.orders))
      {
          return false;
      }
      else
      {
        return true;
      }
    }

    render()
    {
        return(
            <div className="content-wrapper">
                <section className="content-header">
                  <h1> Delivered Orders</h1>
                </section>
                <section className="content">
                  <div className="row">
                    <div className="col-xs-12">
                      <div className="box">
                        <div className="box-body table-responsive" key={this.childKey}>
                          <table id="example1" className="table table-striped">
                            <thead>
                              <tr>
                                <th>Order ID</th>
                                <th>Customer Name</th>
                                <th>Contact No</th>
                                <th>Ordered On</th>
                                <th>Total</th>
                                <th>Time Slot</th>
                                <th>Time Slot Type</th>
                                <th>Agent Name</th>
                                <th>Commission</th>
                              </tr>
                            </thead>
                            <tbody>
                              {this.state.orders.map((order, key) => (
                                <tr key={order.id}>
                                    <td><Link to={"/admin/view-order/"+order.order_id+"/"+order.name}>{order.order_id}</Link></td>
                                    <td>{order.name}</td>
                                    <td>{order.contact}</td>
                                    <td>{order.time_statmpts}</td>
                                    <td>{order.order_amount}</td>
                                    <td>{order.time_slot}</td>
                                    <td style={{textTransform: 'capitalize'}}>{order.time_slot_type}</td>
                                    <td>{order.agent_name}</td>
                                    <td>{order.commission}</td>
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
                <div className="control-sidebar-bg" />
            </div>
        );
    }
}

class CancelOrders extends React.Component{
    constructor() {
        super();
        this.state = {
            orders: [],
        };
        
        this.childKey=0;
        
        let formData = new FormData();
		formData.append('cancel', "cancel")
        formData.append('admin_controller', "admin")
      
		axios({
			method: 'post',
			url: api_link+'OrdersFetch.php',
			data: formData,
		})
		.then(response => response.data)
        .then((data) => {
            this.setState({ orders: data })
            this.childKey+=1;
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
        document.title="Cancelled Orders"  
    }
    
    shouldComponentUpdate(nextProps,nextState){
      if(JSON.stringify(this.state.orders) === JSON.stringify(nextState.orders))
      {
          return false;
      }
      else
      {
        return true;
      }
    }

    render()
    {
        return(
            <div className="content-wrapper">
                <section className="content-header">
                  <h1> Cancelled Orders</h1>
                </section>
                <section className="content">
                  <div className="row">
                    <div className="col-xs-12">
                      <div className="box">
                        <div className="box-body table-responsive" key={this.childKey}>
                          <table id="example1" className="table table-striped">
                            <thead>
                              <tr>
                                <th>Order ID</th>
                                <th>Customer Name</th>
                                <th>Contact No</th>
                                <th>Ordered On</th>
                                <th>Total</th>
                                <th>Time Slot</th>
                                <th>Time Slot Type</th>
                                <th>Agent Name</th>
                                <th>Commission</th>
                              </tr>
                            </thead>
                            <tbody>
                              {this.state.orders.map((order, key) => (
                                <tr key={order.id}>
                                    <td><Link to={"/admin/view-order/"+order.order_id+"/"+order.name}>{order.order_id}</Link></td>
                                    <td>{order.name}</td>
                                    <td>{order.contact}</td>
                                    <td>{order.time_statmpts}</td>
                                    <td>{order.order_amount}</td>
                                    <td>{order.time_slot}</td>
                                    <td style={{textTransform: 'capitalize'}}>{order.time_slot_type}</td>
                                    <td>{order.agent_name}</td>
                                    <td>{order.commission}</td>
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
                <div className="control-sidebar-bg" />
            </div>
        );
    }
}

class FailedOrders extends React.Component{
    constructor() {
        super();
        this.state = {
            orders: [],
        };
        
        this.childKey=0;
        
        let formData = new FormData();
		formData.append('failed', "failed")
        formData.append('admin_controller', "admin")
      
		axios({
			method: 'post',
			url: api_link+'OrdersFetch.php',
			data: formData,
		})
		.then(response => response.data)
        .then((data) => {
            this.setState({ orders: data })
            this.childKey+=1;
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
        document.title="Failed Orders"  
    }
    
    shouldComponentUpdate(nextProps,nextState){
      if(JSON.stringify(this.state.orders) === JSON.stringify(nextState.orders))
      {
          return false;
      }
      else
      {
        return true;
      }
    }

    render()
    {
        return(
            <div className="content-wrapper">
                <section className="content-header">
                  <h1> Failed Orders</h1>
                </section>
                <section className="content">
                  <div className="row">
                    <div className="col-xs-12">
                      <div className="box">
                        <div className="box-body table-responsive" key={this.childKey}>
                          <table id="example1" className="table table-striped">
                            <thead>
                              <tr>
                                <th>Order ID</th>
                                <th>Customer Name</th>
                                <th>Contact No</th>
                                <th>Ordered On</th>
                                <th>Total</th>
                                <th>Time Slot</th>
                                <th>Time Slot Type</th>
                                <th>Agent Name</th>
                                <th>Commission</th>
                              </tr>
                            </thead>
                            <tbody>
                              {this.state.orders.map((order, key) => (
                                <tr key={order.id}>
                                    <td><Link to={"/admin/view-order/"+order.order_id+"/"+order.name}>{order.order_id}</Link></td>
                                    <td>{order.name}</td>
                                    <td>{order.contact}</td>
                                    <td>{order.time_statmpts}</td>
                                    <td>{order.order_amount}</td>
                                    <td>{order.time_slot}</td>
                                    <td style={{textTransform: 'capitalize'}}>{order.time_slot_type}</td>
                                    <td>{order.agent_name}</td>
                                    <td>{order.commission}</td>
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
                <div className="control-sidebar-bg" />
            </div>
        );
    }
}

export {
    PendingOrders,
    DeliveredOrders,
    CancelOrders,
    FailedOrders
};