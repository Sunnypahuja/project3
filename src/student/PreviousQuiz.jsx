import React from 'react';
import axios from 'axios';
import $ from 'jquery';
import { api_link,serverBase_link } from './StudentLogin';
import Moment from 'moment';

var he = require('he');

class PreviousQuiz extends React.Component {
    state = { 
        participated: [],
        type: ''
     }



    fetch_Quiz = ()=>
    {
        document.title="Previous Year Quiz" 
        let formData = new FormData();
        formData.append('fetch_previous_quiz_student', "1")
        formData.append('quiz_type', this.props.match.params.type)

        var obj=this
        
        axios({
            method: 'post',
            url: api_link+'fetch_quiz.php',
            data: formData,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
        .then(response => response.data)
        .then((data) => {
            this.setState({media: data.data, type: this.props.match.params.type})
        }
    )}

    sendToPaymentPage=(id)=>
    { 
        this.props.history.push("payments/"+id+"/"+'prelims')
    }

    render() { 
        if(this.state.type!=this.props.match.params.type)
        {
            this.fetch_Quiz()
        }
        return (
            <React.Fragment>
            <div className="content-wrapper">
                <section className="content-header">
                    <h1>Prelims</h1>
                </section>
                <section className="content">
                    <div className="box">
                        <div className="box-body table-responsive" style={{overflowX: 'hidden'}}>
                            <div className="row" >
                                {(this.state.media)?(
                                    this.state.media.map((media,key) =>(
                                    <div className="col-12 col-md-4 col-sm-4 col-lg-4" key={key} style={{marginTop:10}}>
                                         <div className="card justify-content-center">
                                             <div className="card-body ">
                                                 <center style={{fontSize:20}}><i className="fa fa-book"></i></center>
                                                 <center><h4 style={{fontSize:'100%',fontWeight:'bold'}}>{media.title}</h4></center>
                                                 <center> <p dangerouslySetInnerHTML={{__html:media.description}}></p></center>  
                                                
                                             </div>
                                             <div className="card-footer" style={{width: '100%', padding:0}}>
                                                 {this.props.match.params.type=="mains"?(
                                                    <a href={serverBase_link+"images/"+media.media_file} className="btn btn-success" style={{width: '100%',padding:6,color:'white',fontSize:17}}>View Quiz</a>
                                                 ):(
                                                    <a href={"/student/previousquizview/"+media.id+'/'+media.title} className="btn btn-success" style={{width: '100%',padding:6,color:'white',fontSize:17}}>View Quiz</a>
                                                 )}
                                                 
                                             </div>
                                         </div>
                                     </div>
                                ))
                                ):
                                (
                                    <div className="row col-12">
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

export default PreviousQuiz;