import React from 'react';
import axios from 'axios';
import $ from 'jquery';
import { api_link,serverBase_link } from './StudentLogin';
import Moment from 'moment';
 

class Mains extends React.Component {
    constructor() {
        super();
        this.state = { 
        participated:[],
        resultData: [],
        modalVisible: false,
        doingModal: false,
        editModalVisible: false,
        file: '',
        desc: '',
        marks:''
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
}



    fetch_MainsQuiz = ()=>
    {
        document.title="Mains" 
        
        let formData = new FormData();
        formData.append('fetch_quiz', "1")
        formData.append('quiz_type', "mains")

        var obj=this
        
        axios({
            method: 'post',
            url: api_link+'fetch_quiz.php',
            data: formData,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
        .then(response => response.data)
        .then((data) => {
            let user_mains_id=[];
            let user_courses = this.props.user_purchase_lib.filter((item)=>
             {
 
                 if(item.purchase_type=='mains')
                 {
                     user_mains_id.push(item.item_id);
                     return true;
                 }
                     
             }) 
            
           this.setState({ media: data,user_mains_id: user_mains_id}) 
       
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
                    console.log(data)
                    if(data.msg=="ok")
                    {
                        
                        this.setState({participated: data.data})
                    }
                })
            })
    }
    sendToPaymentPage=(id)=>
    { 
        this.props.history.push("payments/"+id+"/"+'mains')
    }
    
    componentDidMount() {
        this.fetch_MainsQuiz();
    }

    showResult(qid){
        let formData = new FormData();
        formData.append('fetch_result', qid)
        formData.append('user_id', window.atob(window.sessionStorage.getItem(window.btoa("user_id"))))
        var obj=this
        
        axios({
            method: 'post',
            url: api_link+'user_participate.php',
            data: formData,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
        .then(response => response.data)
        .then((data) => {
            if(data.msg=="ok")
            {
                this.setState({file: data.data[0].file, desc: data.data[0].description, marks: data.data[0].marks})
                this.openModal()
            }
            
         })


    }

    openModal() {
        this.setState({
          doingModal: true,
          modalVisible: !this.state.modalVisible
        });
    }

    closeModal() {
        this.setState({
          doingModal: true,
          editModalVisible: !this.state.editModalVisible
        });
    }

    participate=(qid)=>{
        let formData = new FormData();
        formData.append('quiz_id', qid)
        formData.append('paticipateUser', 1)
        formData.append('quiz_type', "mains")
        formData.append('user_id', window.atob(window.sessionStorage.getItem(window.btoa("user_id"))))

        var obj=this
        
        axios({
            method: 'post',
            url: api_link+'user_participate.php',
            data: formData,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
        .then(response => response.data)
        .then((data) => {
            console.log(data)
         })

    }

    render() { 
        let styles = this.state.modalVisible
          ? { display: "block" }
          : { display: "none" };
        let modalFade = this.state.modalVisible
          ? { fade: "fade" }
          : { fade: "show" };
        return (
            <React.Fragment>
            <div className="content-wrapper">
                <section className="content-header">
                    <h1>Mains</h1>
                    
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
                                                
                                                <center><p dangerouslySetInnerHTML={{__html:media.description}}></p> </center> 
                                                 <center><h6>Total Points :{media.total_points}</h6></center>
                                             </div>
                                             <div className="card-footer" style={{width: '100%', padding:0}}>

                                             {this.state.participated&&this.state.participated.includes(media.id)?(
                                                  <button className="btn btn-success" onClick={()=>this.showResult(media.id)} style={{width: '100%',padding:6,color:'white',fontSize:17}} >
                                                Already Participated
                                                </button> 
                                                ):( 
                                                media.paid==1?
                                                 (
                                                    this.state.user_mains_id.includes(media.id)?
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
                                                    <a className="btn btn-success" style={{width: '100%',padding:6,color:'white',fontSize:17}} href={serverBase_link+"images/"+media.media_file} onClick={()=>this.participate(media.id)} target="_blank">
                                                        Free 
                                                    </a>
                                                 )
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
            <div className={'modal '+modalFade} id="add_modal" style={styles}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" onClick={this.openModal}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                                <h4 className="modal-title">Result</h4>
                            </div>
                            <div className="modal-body">
                                {/* <div className="box"> */}
                                    <div className="rowData" style={{marginLeft: 5}}>
                                        <div className="colData" style={{display: 'flex', flexDirection: 'column'}}>
                                            <label style={{margin:10}}>Note</label><br />
                                            <textarea cols="8" rows="3" readonly style={{marginLeft:10, marginRight:10, resize:'none'}} defaultValue={this.state.desc}></textarea>
                                        </div>
                                    </div>
                                    {/* {this.state.file==''?(  */}
                                    <div className="row" style={{marginLeft: 5, marginTop: 10}}>
                                        <div className="col-md-12">
                                            <label>File</label>
                                            <a href={api_link+this.state.file} target="_blank"><img src={api_link+"image/file.png"} width="100px" height="130px" id="logoImg"/></a>
                                        </div>
                                    </div>
                                    {/* ):(null)} */}
                                        
                                {/* </div> */}
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-default pull-left" onClick={this.openModal}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>

        );
    } 
}

export default Mains;