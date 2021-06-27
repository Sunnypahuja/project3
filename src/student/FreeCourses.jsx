import React from 'react';
import axios from 'axios';
import $ from 'jquery';
import { api_link,serverBase_link } from './StudentLogin';
import Moment from 'moment';
class FreeCourses extends React.Component {
    constructor() {
        super();
        this.state = {
        cid:'',
        modalVisible: false,
        doingModal: false,
        class: [],
        editModalVisible: false,
        joinButtonObject:{},
        user_course_id:[],
        timeleft:{},
        timeIntervals:{},
        };
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }
    fetch_Courses=()=>
    {

        document.title="Free Courses"
        let formData = new FormData();
        formData.append('student_courses_free', "all")
        formData.append('type', 'course')
        
        axios({
                method: 'post',
                url: api_link+'ProgramsFetch.php',
                data: formData,
                config: { headers: {'Content-Type': 'multipart/form-data' }}
        }).then(response => response.data)
        .then((data) => 
        {
            if(data.msg=="ok")
            {
                this.setState({ media: data.data}) 
                $("script[src='js/dataTable.js']").remove();
                const script = document.createElement("script");

                script.src = "js/dataTable.js";
                script.async = true;

                document.body.appendChild(script); 

            }
         })  

    }

    format(time) {   
        // Hours, minutes and seconds
        var hrs = ~~(time / 3600);
        var mins = ~~((time % 3600) / 60);
        var secs = ~~time % 60;
    
        // Output like "1:01" or "4:03:59" or "123:03:59"
        var ret = "";
        if (hrs > 0) {
            ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
        }
        ret += "" + mins + ":" + (secs < 10 ? "0" : "");
        ret += "" + secs;
        return ret;
    }

    joinClass(cid)
    {
        console.log("check")
        let formData = new FormData();
        formData.append('add_attendee', cid)
        formData.append('user_id', window.atob(window.sessionStorage.getItem(window.btoa("user_id"))))
        var obj=this
        axios({
            method: 'post',
            url: api_link+'LiveClassData.php',
            data: formData,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
        .then(response => response.data)
        .then((data) => { 
            console.log(data)
            if(data.msg=="ok")
            {
                window.open(data.url, '_blank');
            }
         })
    }

    renderTime=(daate,tiime,timeleft,id,class_id)=>
    {
    
        if(timeleft<=18000)
        {
            if(!this.state.timeIntervals[id])
            {
                var interval =setInterval(()=>{
                    var time = this.format(timeleft)
                        $('#classtime'+id).html(time);
                        if(timeleft<=0)
                        {
                            $('#classtime'+id).html("Class Started");
                            clearInterval(interval);
                            // console.log(class_id)
                            // $("#joinbutton").html(`<button onclick="joinClass(${class_id})" class="btn btn-success">Join</button>`)
                            if(this.state.joinButtonObject.class_id!=true)
                            {
                                var joinObject = {...this.state.joinButtonObject,[class_id]:true}
                                this.setState({joinButtonObject:joinObject})
                            }
                        }
        
                        timeleft--;
                    },1000)

                    var timeIntervals = {...this.state.timeIntervals,[id]:interval};
             
                    this.setState({timeIntervals:timeIntervals})
            }
            // var time = this.format(timeleft)
           
            // console.log(interval)
            // if(!this.state.timeIntervals[id])
            // {
          
            // }
             
        }
        else
        {
             

            return Moment(daate).format("MMM DD"+", "+"YYYY")+' '+tiime;
        }
    }

    

    showClass(cid) 
    {
        this.setState({cid: cid})
        this.openModal()
        this.modaldata(cid)
    }


    componentDidMount() {
        this.fetch_Courses()
    }

    modaldata(cid)
    {
        let formData = new FormData();
        formData.append('fetch_classList', "1")
        formData.append('course_id', cid)
        var obj=this
        axios({
            method: 'post',
            url: api_link+'LiveClassData.php',
            data: formData,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
        .then(response => response.data)
        .then((data) => { 
            if(data.msg=="ok")
            {
                console.log(data)
                this.setState({class: data.data})
            }
         })
    }

    closeModal() {
        this.setState({
          doingModal: true,
          editModalVisible: !this.state.editModalVisible
        });
      }


      openModal() {
        this.setState({
          doingModal: true,
          modalVisible: !this.state.modalVisible
        });
        console.log("hello")
        Object.values(this.state.timeIntervals).map((m,k)=>{
            clearInterval(m);
            console.log(m);
        })
        this.setState({timeIntervals:{}})
      }

    sendToPaymentPage=(id)=>
    { 
        this.props.history.push("payments/"+id+"/"+'courses')
    }

    //   payOut=(amount,topic,topic_id,topic_name)=>
    //   {
    //         var email =  window.atob(window.sessionStorage.getItem(window.btoa("signed_in"))); 
    //         var user_id = window.atob(window.sessionStorage.getItem(window.btoa("user_id")));	

    //         let formData = new FormData();
    //         formData.append('payment', "1")
    //         formData.append('user_id', user_id)
    //         formData.append('email', email)
    //         formData.append('amount', amount)
    //         formData.append('topic', topic)
    //         formData.append('topic_id', topic_id)
    //         formData.append('topic_name', topic_name)
    //         axios({
    //             method: 'post',
    //             url: api_link+'Pay.php',
    //             data: formData,
    //             config: { headers: {'Content-Type': 'multipart/form-data' }}
    //         })
    //         .then(response => response.data)
    //         .then((data) => { 
    //                 // console.log(data)
    //                 this.processPayment(data, topic_id, topic, user_id)

    //         })


    //   }

    //   processPayment=(options,topic_id, topic, user_id)=>
    //   {
    //         options.handler=(response)=>{
            
    //         let formData = new FormData();
    //         formData.append('pay_success', "1")
    //         formData.append('order_id', options.order_id)
    //         formData.append('topic_id', topic_id)
    //         formData.append('user_id', user_id)
    //         formData.append('topic', topic)
    //         formData.append('id', options.col_id)
    //         formData.append('payment_response', JSON.stringify(response))
    //         axios({
    //             method: 'post',
    //             url: api_link+'PayStatus.php',
    //             data: formData,
    //             config: { headers: {'Content-Type': 'multipart/form-data' }}
    //         })
    //         .then(response => response.data)
    //         .then((data) => {  
    //             if(data.msg=='ok')
    //             {
    //                 console.log(data.p_id)
    //                 var user_course_id = this.state.user_course_id
    //                 user_course_id.push(data.p_id);
    //                 this.setState({ user_course_id: user_course_id})
    //                 this.props.update_user_p_lib({purchase_type:'course',item_id:data.p_id,u_id:window.atob(window.sessionStorage.getItem(window.btoa("user_id")))})
    //             }
                    
    //         })
    //     }
    //         options.theme.image_padding = false;
    //         options.modal = {
    //             ondismiss: function() {
    //                 console.log("This code runs when the popup is closed");
    //             },
    //             escape: true,
    //             backdropclose: false
    //         };
    //         var rzp = new window.Razorpay(options);
    //         rzp.open();
    //   }

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
                    <h1 style={{marginTop:15}}>Free Courses</h1> 
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
                                                 <center style={{fontSize:20}}><img style={{height:'50%', width:'80%'}} src={serverBase_link+"images/"+media.image}/></center>
                                                 <center><h4 style={{fontSize:'100%',fontWeight:'bold'}}>{media.name}</h4></center>
                                                 <center><h6>Starts From {Moment(media.starting_from).format("MMM Do YY")}</h6></center>
                                               
                                                 <center>  <p dangerouslySetInnerHTML={{__html:media.description}}></p> </center> 
                                                 {media.schedule_pdf?(
                                                        <a style={{borderWidth:1,borderColor:'#000',borderStyle:'solid',padding:5,borderRadius:5,color:'#000',margin:10}} href={serverBase_link+"images/"+media.schedule_pdf} target="_blank">View Schedule</a>
                                                 ):(null)}
                                                 {media.sample_video?(
                                                        <a style={{borderWidth:1,borderColor:'#000',borderStyle:'solid',padding:5,borderRadius:5,color:'#000'}} href={serverBase_link+"images/"+media.sample_video} target="_blank">View Sample Video</a>
                                                 ):(null)}
                                                 
                                             </div>
                                             <div className="card-footer" style={{width: '100%', padding:0}}>  
                                             {/* {this.state.user_course_id&&this.state.user_course_id.includes(media.id)?
                                             ( */}
                                                <button className="btn btn-success" onClick={()=>this.showClass(media.id)} style={{width: '100%',padding:6,color:'white',fontSize:17}} >
                                                        View Class List
                                                        &nbsp;
                                                        <i className="fa fa-eye"></i>
                                                </button> 
                                            {/* //  ):
                                            //  (
                                            //     <button className="btn btn-success" style={{width: '100%',padding:6,color:'white',fontSize:17}} onClick={()=>this.payOut(media.fees,'course',media.id,media.name)}> */}
                                            {/* //         ENROLL NOW
                                            //     </button> 
                                            //  )}
                                           */}
                                                  
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
            <div className={'modal '+modalFade} id="add_modal" style={styles}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" onClick={this.openModal}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                            <h4 className="modal-title">Class Details</h4>
                        </div> 
                        <div className="modal-body">
                            {/* <div className="box"> */}
                                <div className="box-body table-responsive">
                                    <br/>
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>Teacher</th>
                                                <th>Title</th>
                                                <th>Class Time</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.class.map((m, key) => (
                                            <tr key={m.id}>
                                                <td id={'teacher'+m.id}>{m.t_name}</td>
                                                <td id={'class_title'+m.id}>{m.class_title}</td>
                                                <td id={'classtime'+m.id}>

                                                    {this.renderTime(m.date,m.time,m.timeleft,m.id,m.class_id)}
                                                    
                                                </td>
                                            
                                                <td style={{width: '30%'}} id="joinbutton">
                                                    {this.state.joinButtonObject[m.class_id]?(
                                                    <button onClick={()=>this.joinClass(m.class_id)} className="btn btn-success">Join</button>
                                                    ):(null)}
                                                </td>
                                            </tr>
                                            ))}
                                        </tbody>
                                    </table>                    
                                </div>
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

export default FreeCourses;