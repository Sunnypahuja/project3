import React from 'react';
import axios from 'axios';
            import UploadModal from './UploadModal';
import $ from 'jquery';
import { api_link,serverBase_link } from './StudentLogin';
import Moment from 'moment';
import { Button, Modal } from 'react-bootstrap';
 

class Previousmains extends React.Component {
    state = { 
        media: [], 
        isOpen: false,
        q_id:''
     }
    componentDidMount() {
        this.fetch_participatedQuiz()
    }

    fetch_participatedQuiz() 
    {
        let formData = new FormData();
        formData.append('participatedQuiz', "1")
        formData.append('quiz_type', "mains")
        formData.append('status', "1")
        formData.append('user_id',window.atob(window.sessionStorage.getItem(window.btoa("user_id"))))
        var obj=this
        
        axios({
            method: 'post',
            url: api_link+'fetch_quiz.php',
            data: formData,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
        .then(response => response.data)
        .then((data) => { 
           this.setState({ media: data}) 
         })
    }
    uploadCheck(qid) 
    {
        this.setState({q_id: qid})
        this.openModal()
    }
    openModal = () => this.setState({ isOpen: true });
    closeModal = () => this.setState({ isOpen: false });
    
    removeBox(id)
    {
        $("#box"+id).remove();
    }

    showAlert(status)
    {
            switch(status)
            {
                case 'success':
                    $("#update_message").html("<strong>Success! </strong> Your Request Successfully Processed")
                    $("#update_message").removeClass("alert-danger").addClass("alert-success")
                    break;
                case 'failure':
                    $("#update_message").html("<strong>Error! </strong>Something Went Wrong")
                    $("#update_message").removeClass("alert-success").addClass("alert-danger")
                    break;
            }
            $("#update_message").show()
            setTimeout(function(){ $("#update_message").hide(); }, 4000);
    }

    render() { 
        return (
            <React.Fragment>
                <div className="content-wrapper">
                    <section className="content-header">
                        <h1>Previous Mains</h1>
                    </section>

                    <section>
                        <div id="update_message" className="alert" style={{display: 'none', marginTop:20, marginLeft:20, marginRight:20}}></div> 
                    </section>
                    
                    <section className="content">
                        <div className="box">
                            <div className="box-body table-responsive" style={{overflowX: 'hidden'}}>
                                <div className="row" >
                                    {this.state.media&&this.state.media.length?(
                                    
                                    this.state.media.map((media,key) =>(
                                        <div id={"box"+media.id} className="col-12 col-md-4 col-sm-4 col-lg-4" key={key} style={{marginTop:10}}>
                                            <div className="card justify-content-center">
                                                <div className="card-body ">
                                                    <center style={{fontSize:20}}><i className="fa fa-book"></i></center>
                                                    <center><h4 style={{fontSize:'100%',fontWeight:'bold'}}>{media.title}</h4></center>
                                                    <center><h6>{Moment(media.available_from).format("MMM Do YY")} - {Moment(media.available_to).format("MMM Do YY")}</h6></center>
                                                    <p dangerouslySetInnerHTML={{__html:media.description}}></p> 
                                                    <center><h6>Total Points :{media.total_points}</h6></center>
                                                </div>
                                                <div className="card-footer" style={{width: '100%', padding:0}}>

                                                    {media.paid==1?
                                                    (
                                                        this.state.user_mains_id.includes(media.id)?
                                                            (
                                                            <button className="btn btn-success" style={{width: '100%',padding:6,color:'white',fontSize:17}} >
                                                                    View Quiz
                                                                    &nbsp;
                                                                    <i className="fa fa-eye"></i>
                                                            </button> 
                                                            ):
                                                            (
                                                            <button className="btn btn-success" style={{width: '100%',padding:6,color:'white',fontSize:17}} onClick={()=>this.sendToPaymentPage(media.id)}>
                                                                Paid 
                                                            &nbsp;
                                                            <i className="fa fa-dollar"></i>
                                                            </button> 
                                                                
                                                            )
                                                    ):
                                                    (
                                                        <div style={{display: 'flex', flexDirection: 'row'}}>
                                                            
                                                            <a className="btn btn-success" style={{padding:6,color:'white',fontSize:17, flex:0.5, marginRight: 2}} href={serverBase_link+"images/"+media.media_file1} onClick={null} target="_blank">
                                                            Answer Module
                                                            
                                                               
                                                            </a>
                                                            <button className="btn btn-success" onClick={()=>this.uploadCheck(media.id)} style={{padding:6,color:'white',fontSize:17, flex:0.5, marginLeft: 2}} >Upload</button> 
                                                        </div>
                                                    )}
                                                    
                                                </div>
                                            </div>
                                        </div>
        
                                    ))
                                    ):
                                    (
                                        <div className="row col-12" style={{marginLeft: 10}}>
                                                <h4 style={{margin:15}}>No Data Available</h4>
                                        </div>
                                    )
                                }
                                </div>
                            
                            </div>
                        </div> 
                    </section>
                    
                </div> 
                {this.state.isOpen?(
                <UploadModal 
                isOpen={this.state.isOpen} 
                closeModal={this.closeModal}
                q_id= {this.state.q_id}
                showAlert={this.showAlert}
                removeBox={this.removeBox}
                />
                ):(null)}

                
            </React.Fragment>

        );
    } 
}

export default Previousmains;