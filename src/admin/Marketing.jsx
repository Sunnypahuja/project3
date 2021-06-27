import React from 'react';
import { Link } from "react-router-dom";
import { api_link } from './AdminLogin';
import axios from 'axios';
import $ from 'jquery';
import CKEditor from "react-ckeditor-component";

class Email extends React.Component{
    constructor() {
        super();
        this.state = {
            customers: 0,
            customer_count: 0,
            mail_data: '',
            send_to: 'all',
            subject: ''
        };
        
        this.childKey = 0;    
        
        //FETCH TOTAL NUMBER OF CUSTOMERS
        const url = api_link+'FetchCounters.php'
        axios.get(url).then(response => response.data)
        .then((data) => {
          this.setState({ 
            customers: data['email_subscribers'],
          })
         })
    }
    
    componentDidMount() {
        document.title="Email Marketing"  
    }
    
    handleChange(e){
        if(e.target.value === "all")
        {
            $("#customern").hide()
        }
        else
        {
            $("#customern").show()
        }
        this.setState({ 
            send_to:  e.target.value
        });
    };
    
    handleEmailFormSubmit( event ) {
		event.preventDefault();
		
        if(window.confirm("Are You Sure To Send Email?"))
        {
            $("#invalid_message").hide();
            let formData = new FormData();
            formData.append('send_email', "yes")
            formData.append('subject', this.state.subject)
            formData.append('message', this.state.mail_data)
            formData.append('send_to', this.state.send_to)
            formData.append('number', this.state.customer_count)
            
            axios({
                method: 'post',
                url: api_link+'MarketingManagement.php',
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
    
    render()
    {
        return(
              <div className="content-wrapper">
                <section>
                    <div id="update_msg" className="alert" style={{display: 'none'}}></div> 
                </section>
                <section className="content-header">
                  <h1>
                    <i className="fa fa-envelope" /> Subscribers
                  </h1>
                   <ol className="breadcrumb">
                        <li>
                            <div className="pull-right"> 
                                <Link to={"/admin/view-subscribers"} className="btn btn-primary" >
                                    <i className="fa fa-eye"></i> View All
                                </Link>
                            </div>
                        </li>
                    </ol>
                </section>
                <br />
                <section className="content">
                  <form method="post" onSubmit={this.handleEmailFormSubmit.bind(this)}>
                    <div className="box">
                      <div className="box-header">
                        <span style={{float: 'right'}}>&nbsp;&nbsp;</span>
                        <button type="submit" name="send" style={{float: 'right'}} title="Send" className="btn btn-primary btn2">
                          <i className="fa fa-envelope" />
                        </button>
                      </div>
                      <div className="box-body">
                        <div className="row container">
                          <div className="form-group row">
                            <label className="col-md-2 control-label" style={{textAlign: 'right'}}>To</label>
                            <div className="col-md-8">
                              <select className="form-control" name="reciever" id="reciever" onChange={(e) => this.handleChange(e)}>
                                <option value="all">Total Subscribers:{this.state.customers}</option>
                              </select>
                            </div>
                          </div>
                          <div className="form-group row" id="customern" style={{display: 'none'}}>
                            <label className="col-md-2 control-label" style={{textAlign: 'right'}}>Count n</label>
                            <div className="col-md-8">
                              <input type="number" name="number" placeholder="Number of customers" id="number" className="form-control"  onChange={e => this.setState({ customer_count: e.target.value })}/>
                            </div>
                          </div>
                          <div className="form-group row">
                            <label className="col-md-2 control-label" style={{textAlign: 'right'}}>Subject</label>
                            <div className="col-md-8">
                              <input type="text" name="subject" placeholder="Subject" id="input-subject" className="form-control" onChange={e => this.setState({ subject: e.target.value })}/>
                            </div>
                          </div>
                          <div className="form-group row">
                            <label className="col-md-2 control-label" style={{textAlign: 'right'}}>Message</label>
                            <div className="col-md-8">
                              <CKEditor content={this.state.mail_data} required activeClass="p10" events={{ "change": e => this.setState({ mail_data: e.editor.getData() })}}/>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </section>
              </div>
        );
    }
}

class EmailSubscribers extends React.Component{
    constructor() {
        super();
        this.state = {
            subscribers: [],
        };
    }

    componentDidMount() {
        document.title="Email Subscribers" 
        
        //FETCH ALL PROGRAMS AND COURSES
        let formData = new FormData();
        formData.append('email_subscribers', "all")

        axios({
                method: 'post',
                url: api_link+'MarketingFetch.php',
                data: formData,
                config: { headers: {'Content-Type': 'multipart/form-data' }}
        }).then(response => response.data)
        .then((data) => {
          this.setState({ subscribers: data })
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
            <div className="content-wrapper">
                <section className="content-header">
                        <h1>Subscribers</h1>
                </section>

                <section className="content">
                        <div className="box">
                            <div className="box-body table-responsive">
                                <br/>
                                <table id="example1" className="table">
                                <thead>
                                <tr>
                                    <th>Email</th>
                                </tr>
                                </thead>
                                <tbody>
                                    {this.state.subscribers.map((m, key) => (
                                    <tr key={m.id}>
                                        <td>{m.email}</td>
                                    </tr>
                                    ))}
                                </tbody>
                                <tfoot></tfoot>
                                </table>                    
                            </div>
                        </div>
                    </section>
            </div>
        );
    }
}

class PushNotifications extends React.Component{
    constructor() {
        super();
        this.state = {
            title: '',
            link: '',
            content: '',
        };
        
        this.childKey = 0;    
    }
    
    componentDidMount() {
        document.title="Push Notifications"  
    }
    
    handleNotificationFormSubmit( event ) {
		event.preventDefault();
		
        if(window.confirm("Are You Sure To Send Notification?"))
        {
            $("#invalid_message").hide();
            let formData = new FormData();
            formData.append('send_notification', "yes")
            formData.append('title', this.state.title)
            formData.append('link', this.state.link)
            formData.append('content', this.state.content)
            
            axios({
                method: 'post',
                url: api_link+'MarketingManagement.php',
                data: formData,
                config: { headers: {'Content-Type': 'multipart/form-data' }}
            })
            .then(function (response) {
                //handle success
                
                if(response.data['recipients'] >=0 && response.data['id']!=="")
                {                  
                    document.getElementById("push_notification").reset();
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
    
    render()
    {
        return(
              <div className="content-wrapper">
                <section>
                    <div id="update_msg" className="alert" style={{display: 'none'}}></div> 
                </section>
                <section className="content-header">
                  <h1>
                   Push Notifications
                  </h1>
                </section>
                <br />
                <section className="content">
                  <form id="push_notification" method="post" onSubmit={this.handleNotificationFormSubmit.bind(this)}>
                    <div className="box">
                        <div className="box-body">
                            <div className="row">
                              <div className="col-md-6 form-group">
                                <label htmlFor>Notification Title*</label>
                                <input type="text" id="name" required name="title" className="form-control" placeholder="Title" title="Enter characters only" max={50} onChange={e => this.setState({ title: e.target.value })}/>
                              </div>
                              <div className="col-md-6 form-group">
                                <label htmlFor>Redirection Link*</label>
                                <input type="url" required name="link" className="form-control" onChange={e => this.setState({ link: e.target.value })} placeholder="Redirection Link" />
                              </div>
                              <div className="col-md-12">
                                <label htmlFor>Notification Content*</label>
                                <textarea style={{resize: 'none'}} className="form-control" placeholder="Content" name="content" row={3} max={300} required onChange={e => this.setState({ content: e.target.value })}/>
                              </div>
                              <div className="col-md-12">
                                <br /><button type="submit" name="profile" className="btn btn-primary wdt-bg pull-right">Send Notification</button>
                              </div>
                            </div>
                        </div>
                      </div>
                  </form>
                </section>
              </div>
        );
    }
}

export {
    Email,
    PushNotifications,
    EmailSubscribers,
};