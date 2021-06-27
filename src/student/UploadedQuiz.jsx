import React from 'react';
import axios from 'axios';
import UploadModal from './UploadModal';
import $ from 'jquery';
import { api_link,serverBase_link } from './StudentLogin';
import Moment from 'moment';

class UploadesQuiz extends React.Component {
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
        formData.append('status', "2")
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

    render() { 
        return (
            <React.Fragment>
                <div className="content-wrapper">
                    <section className="content-header">
                        <h1>Submitted Quiz</h1>
                        
                    </section>
                    <section className="content">
                        <div className="box">
                            <div className="box-body table-responsive" style={{overflowX: 'hidden'}}>
                                <div className="row" >
                                    {this.state.media&&this.state.media.length?(
                                    
                                    this.state.media.map((media,key) =>(
                                        <div className="col-12 col-md-4 col-sm-4 col-lg-4" key={key} style={{marginTop:10}}>
                                            <div className="card justify-content-center">
                                                <div className="card-body ">
                                                    <center style={{fontSize:20}}><i className="fa fa-book"></i></center>
                                                    <center><h4 style={{fontSize:'100%',fontWeight:'bold'}}>{media.title}</h4></center>
                                                    <center><h6>{Moment(media.available_from).format("MMM Do YY")} - {Moment(media.available_to).format("MMM Do YY")}</h6></center>
                                                    <p dangerouslySetInnerHTML={{__html:media.description}}></p> 
                                                    <center><h6>Total Points :{media.total_points}</h6></center>
                                                </div>
                                                <div className="card-footer" style={{width: '100%', padding:0}}>
                                                    <div style={{display: 'flex', flexDirection: 'row'}}>
                                                        <a className="btn btn-success" style={{padding:6,color:'white',fontSize:17, flex:1, marginRight: 2}} href={serverBase_link+"images/"+media.media_file2} onClick={null} target="_blank">
                                                        Download Answer Sheet
                                                        &nbsp;
                                                            <i className="fa fa-download"></i>
                                                        </a>
                                                    </div>
                                                    
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

                
            </React.Fragment>

        );
    } 
}

export default UploadesQuiz;