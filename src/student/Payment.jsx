import React from 'react';
import axios from 'axios';
import $ from 'jquery';
import { api_link,serverBase_link } from './StudentLogin';

class Payment extends React.Component {

    state = {  }

    sendSignal =(signalType)=>
    {
        switch(signalType)
        {
            case 'fail':
                 
                break;
            case 'pass':

                let formData = new FormData();
                formData.append('setPurchaseInfo', "all")
                formData.append('p_type',this.props.match.params.type)
                formData.append('p_item_id',this.props.match.params.token)
                formData.append('p_user_id', window.atob(window.sessionStorage.getItem(window.btoa("user_id"))))
                 
                axios({
                    method: 'post',
                    url: api_link+'Purchase_apis.php',
                    data: formData,
                    config: { headers: {'Content-Type': 'multipart/form-data' }}
                }).then(response => response.data)
                .then((data) => {
                   console.log(data)  
                    this.props.update_user_p_lib({purchase_type:this.props.match.params.type,item_id:this.props.match.params.token,u_id:window.atob(window.sessionStorage.getItem(window.btoa("user_id")))})
                   switch(this.props.match.params.type)
                   {
                       case 'prelims':
                           this.props.history.push("/student/prelims")
                           break;
                       case 'mains':
                        this.props.history.push("/student/mains")
                           break; 
                        case 'courses':
                            this.props.history.push("/student/courses")
                           break;
                        case 'program':
                            this.props.history.push("/student/programmes")
                           break;
                   }
                })  
                break;
        }
        
				
    }
    render() {
 
console.log(this.props)
        return (
            <React.Fragment>
            <div className="content-wrapper">
                <section className="content-header">
                    <h1 style={{marginTop:15}}>Payment Page </h1> 
                </section>
                <section className="content">
                    <div className="box">
                        <div className="box-body table-responsive" style={{overflowX: 'hidden'}}>
                            <div className="row" >
                                <div className="col-3"> 
                                    <button className="btn btn-danger">SEND Fail Signal</button>
                                </div>
                                <div className="col-3"></div>
                                <div className="col-3">
                                    <button className="btn btn-success" onClick={()=>this.sendSignal('pass')}>SEND Success Signal</button>
                                </div>
                            </div>
                           
                        </div>
                    </div> 
                </section>
            </div>
            </React.Fragment>

        );
    }
}

export default Payment;