import React from 'react';
import axios from 'axios';
import $ from 'jquery';
import { api_link,serverBase_link } from './StudentLogin';
import Moment from 'moment';

    

class Dashboard extends React.Component {
    state={
        quiz: [],
        coursedata:[]
    }

    componentDidMount(){

        document.title="Dashboard" 
        
        let formData = new FormData();
        formData.append('fetch_DashboardData', "all")
        axios({
            method: 'post',
            url: api_link+'DashboardData.php',
            data: formData,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
        .then(response => response.data)
        .then((data) => {
            console.log(data)
                this.setState({quiz: data.data[0], coursedata: data.coursedata})
        })
    }

    render() {
        console.log(this.state.quiz)
        return(
        
        <React.Fragment>
            <div className="content-wrapper" style={{backgroundColor: 'white'}}>
                {/* <section className="content-header">
                    <h1 style={{marginTop:15}}>Dashboard</h1>
                    
                </section> */}
                <section className="content"   style={{marginTop: 10, marginLeft:15, marginRight:15}}>
                    <div className="box">
                        <div className="box-body">
                            <div style={{display: 'flex', flexDirection: 'row'}}>
                                <div style={{flex:0.9, flexDirection: 'column'}}>
                                    <h3>{this.state.quiz.title}</h3>
                                    <p style={{color: 'gray'}} dangerouslySetInnerHTML={{__html:this.state.quiz.description}}></p>
                                </div>
                                <div style={{flex:0.1, marginTop: 20}}>
                                    <div className="calBox"><p style={{marginTop:4}}><b>{this.state.quiz.day}</b></p></div>
                                    <div className="calBox2"><h5><b>{Moment(this.state.quiz.month).format("MMM")}</b></h5></div>
                                </div>
                            </div><br />
                            <h5 style={{color: 'gray'}}>Total Points: {this.state.quiz.total_points}</h5>
                            <button style={{width:'100%'}} className="btn btn-success" onClick={null}>{this.state.quiz.type}</button>
                        </div>
                    </div>
                </section>
                <section className="content"  style={{marginLeft: 20, marginRight:20}}>
                    <div className="box">
                        <div className="box-body">
                            <div className="row">
                                <div className="col-md-4">
                                    <div className="info-box">
                                        <span className="info-box-icon bg-info elevation-1" style={{backgroundColor: '#17a2b8'}}><i className="fas fa-cog"></i></span>

                                        <div className="info-box-content">
                                            <span className="info-box-text">Total Quiz</span>
                                            <span className="info-box-number">{this.state.quiz.count_quiz}</span>
                                        </div>
                                
                                    </div>
                                </div>
                                
                                <div className="col-md-4">
                                    <div className="info-box mb-3">
                                        <span className="info-box-icon bg-danger elevation-1" style={{backgroundColor: '#28a745'}}><i className="fas fa-thumbs-up" ></i></span>

                                        <div className="info-box-content">
                                            <span className="info-box-text">Total Programs</span>
                                            <span className="info-box-number">{this.state.quiz.count_prog}</span>
                                        </div>
                            
                                    </div>
                                
                                </div>
                                

                                <div className="col-md-4">
                                    <div className="info-box mb-3">
                                        <span className="info-box-icon bg-success elevation-1" style={{backgroundColor:'#ffc107'}}><i className="fas fa-shopping-cart"></i></span>

                                        <div className="info-box-content">
                                            <span className="info-box-text">Total Courses</span>
                                            <span className="info-box-number">{this.state.quiz.count_course}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <br />
                            <h3>My Courses</h3>
                            <div className="row">
                                {(this.state.coursedata && this.state.coursedata.length)?(
                                this.state.coursedata.map((media,key) =>(
                                        <div className="col-12 col-md-4 col-sm-4 col-lg-4" key={key} style={{marginTop:10}}>
                                            <div className="card justify-content-center">
                                                <div className="card-body ">
                                                    <center style={{fontSize:20}}><img style={{height:'50%', width:'80%'}} src={serverBase_link+"images/"+media.image}/></center>
                                                    <center><h4 style={{fontSize:'100%',fontWeight:'bold'}}>{media.name}</h4></center>
                                                    <center><h6>Starts From {Moment(media.starting_from).format("MMM Do YY")}</h6></center>
                                                    <p dangerouslySetInnerHTML={{__html:media.description}}></p> 
                                                </div>
                                                <div className="card-footer" style={{width: '100%', padding:0}}>  
                                                </div>
                                                </div>
                                            </div>
        
                                    )
                                    )
                                ):(
                                <div className="row col-12">
                                <h4 style={{marginLeft:30}}>Your Courses Will List Here</h4>
                                </div>
                                )
                                }
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </React.Fragment>
        )
    }
}
export default Dashboard;