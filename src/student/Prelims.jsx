import React from 'react';
import axios from 'axios';
import $ from 'jquery';
import { api_link,serverBase_link } from './StudentLogin';
import Moment from 'moment';

var he = require('he');

class Prelims extends React.Component {
    state = { 
        participated: [],
     }



    fetch_PrelimsQuiz = ()=>
    {
        document.title="Prelims" 
        let formData = new FormData();
        formData.append('fetch_quiz', "1")
        formData.append('quiz_type', "prelims")

        var obj=this
        
        axios({
            method: 'post',
            url: api_link+'fetch_quiz.php',
            data: formData,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
        .then(response => response.data)
        .then((data) => {
            let user_prelims_id=[];
            this.props.user_purchase_lib.filter((item)=>
            { 
                 if(item.purchase_type=='prelims')
                 {
                    user_prelims_id.push(item.item_id);
                    return true;
                 }   
            })
            this.setState({media: data,user_prelims_id: user_prelims_id})
           
            let formData2 = new FormData();
            formData2.append('allparticipated', "1")

            var obj=this
            
            axios({
                method: 'post',
                url: api_link+'fetch_quiz.php',
                data: formData2,
                config: { headers: {'Content-Type': 'multipart/form-data' }}
            })
            .then(response => response.data)
            .then((data) => {
                if(data.msg=="ok")
                {
                    
                this.setState({participated: data.data})
                }
            })
        })

    }
    sendToPaymentPage=(id)=>
    { 
        this.props.history.push("payments/"+id+"/"+'prelims')
    }

    componentDidMount() {
        this.fetch_PrelimsQuiz();
    }
    render() { 
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
                                {(this.state.media && this.state.media.length)?(
                                    this.state.media.map((media,key) =>(
                                    <div className="col-12 col-md-4 col-sm-4 col-lg-4" key={key} style={{marginTop:10}}>
                                         <div className="card justify-content-center">
                                             <div className="card-body ">
                                                 <center style={{fontSize:20}}><i className="fa fa-book"></i></center>
                                                 <center><h4 style={{fontSize:'100%',fontWeight:'bold'}}>{media.title}</h4></center>
                                                 <center><h6>{Moment(media.available_from).format("MMM Do YY")} - {Moment(media.available_to).format("MMM Do YY")}</h6></center>
                                                 <center> <p dangerouslySetInnerHTML={{__html:media.description}}></p></center>  
                                                 <center><h6>Total Points :{media.total_points}</h6></center>
                                             </div>
                                             <div className="card-footer" style={{width: '100%', padding:0}}>

                                              {this.state.participated&&this.state.participated.includes(media.id)?(
                                                  <a className="btn btn-success" style={{width: '100%',padding:6,color:'white',fontSize:17}} href={'/student/prelimsquiz/'+media.id+'/'+media.title}>
                                                Already Participated
                                                </a> 
                                                ):( 
                                                media.paid==1?
                                                 (
                                                    
                                                      this.state.user_prelims_id.includes(media.id)?
                                                        (
                                                           <button className="btn btn-success" style={{width: '100%',padding:6,color:'white',fontSize:17}} >
                                                                   View Quiz
                                                           </button> 
                                                        ):
                                                        (
                                                           <button className="btn btn-success" style={{width: '100%',padding:6,color:'white',fontSize:17}} onClick={()=>this.sendToPaymentPage(media.id)}>
                                                                Paid 
                                                           </button> 
                                                            
                                                        )
                                                 ):
                                                 (
                                                    <a className="btn btn-success" style={{width: '100%',padding:6,color:'white',fontSize:17}} href={'/student/prelimsquiz/'+media.id+'/'+media.title} >
                                                        Free 
                                                    </a>
                                                 )
                                                 )}
                                                
                                             </div>
                                         </div>
                                     </div>
     
                                )
                                )
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

export default Prelims;