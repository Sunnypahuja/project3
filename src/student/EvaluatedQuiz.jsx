import React from 'react';
import axios from 'axios';
import UploadModal from './UploadModal';
import $ from 'jquery';
import { api_link,serverBase_link } from './StudentLogin';
import Moment from 'moment';

class EvaluatedQuiz extends React.Component {
    constructor() {
        super();
        this.state = {
        media:[],
        modalVisible: false,
        doingModal: false,
        editModalVisible: false,
        desc: '',
        file: '',
        marks: ''
        };
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }
    componentDidMount() {
        this.fetch_participatedQuiz()
    }

    fetch_participatedQuiz() 
    {
        let formData = new FormData();
        formData.append('evaluatedQuiz', "1")
        formData.append('quiz_type', "mains")
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
    closeModal() {
        this.setState({
          doingModal: true,
          editModalVisible: !this.state.editModalVisible
        });
    }

    showModal(desc, file,marks){
        this.setState({
            file:file,
            desc: desc,
        marks: marks })
            this.openModal()
    }
    openModal() {
        this.setState({
          doingModal: true,
          modalVisible: !this.state.modalVisible
        });
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
                        <h1>Evaluated Quiz</h1>
                        
                    </section>
                    <section className="content">
                        <div className="box" >
                            <div className="box-body table-responsive" style={{overflowX: 'hidden'}}>
                                <div className="row" >
                                    {this.state.media&&this.state.media.length?(
                                    
                                    this.state.media.map((media,key) =>(
                                        <div style={{borderWidth: 10, borderColor: 'green'}} className="col-12 col-md-4 col-sm-4 col-lg-4" key={key} style={{marginTop:10}}>
                                            <div className="card justify-content-center">
                                                <div className="card-body ">
                                                    <center style={{fontSize:20}}><i className="fa fa-book"></i></center>
                                                    <center><h4 style={{fontSize:'100%',fontWeight:'bold'}}>{media.title}</h4></center>
                                                    <center><h6>{Moment(media.available_from).format("MMM Do YY")} - {Moment(media.available_to).format("MMM Do YY")}</h6></center>
                                                    <p dangerouslySetInnerHTML={{__html:media.description}}></p> 
                                                    <center><h6>Total Points :{media.total_points}</h6></center>
                                                    <center><h6>Obtained Points :{media.type=="prelims"?(media.points_obtained):(media.marks)}</h6></center>
                                                </div>
                                                <div className="card-footer" style={{width: '100%', padding:0}}>
                                                    
                                                    {media.type=='mains'?(
                                                        media.file=='' && media.admin_desc==''?(
                                                        <div style={{display: 'flex', flexDirection: 'row'}}>
                                                        <a className="btn btn-success" style={{padding:6,color:'white',fontSize:17, flex:1, marginRight: 2}} href={api_link+media.file} onClick={null} target="_blank">
                                                        Download
                                                        &nbsp;
                                                            <i className="fa fa-download"></i>
                                                        </a>
                                                    </div>):(
                                                    <div style={{display: 'flex', flexDirection: 'row'}}>
                                                        <a className="btn btn-success" style={{padding:6,color:'white',fontSize:17, flex:0.5, marginRight: 2}} href={api_link+media.file} onClick={null} target="_blank">
                                                        Download
                                                        </a>
                                                        <button className="btn btn-success" onClick={()=>this.showModal(media.admin_desc, media.file, media.marks)} style={{padding:6,color:'white',fontSize:17, flex:0.5, marginLeft: 2}} >Check Result</button>
                                                    </div>
                                                    )
                                                    ):(
                                                    <div style={{display: 'flex', flexDirection: 'row'}}>
                                                        <a className="btn btn-success" href={'/student/prelimsquiz/'+media.id+'/'+media.title} style={{padding:6, color:'white',fontSize:17, flex:1, marginLeft: 2}} >Check Result</a>
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
                                            <label>Score</label><br />
                                            <input type="text" defaultValue={this.state.marks}/>
                                        </div>
                                    </div>
                                    <div className="rowData" style={{marginLeft: 5}}>
                                        <div className="colData" style={{display: 'flex', flexDirection: 'column'}}>
                                            <label>Note</label><br />
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

export default EvaluatedQuiz;