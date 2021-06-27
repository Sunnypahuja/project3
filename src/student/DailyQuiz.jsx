import React from 'react';
import axios from 'axios';
import { Alert } from 'react-bootstrap';
import $ from 'jquery';
import { api_link,serverBase_link } from './StudentLogin';
import Moment from 'moment';
 

class DailyQuiz extends React.Component {
    
    state = { question_data:{},questionCounter:0,media:[],hideNext:false,hidePrevious:true,showFinish:false,showResult:false,points: 0,totalPoints: 0, singleQuePoint: 0, check: 0, participated: false} 

    renderQuizQuestion=(questionCounter)=>
    {
         
        let item = this.state.media[questionCounter] 
        let questionData = this.state.question_data[questionCounter+1];
        if(questionCounter>=this.state.media.length-1&&!this.state.hideNext)
        {
            this.setState({questionCounter:this.state.media.length-1,hideNext:true,showFinish:true})
        } 

        if(questionCounter<=0&&!this.state.hidePrevious)
        {
            this.setState({questionCounter:0,hidePrevious:true})
        } 

        if(questionCounter==1&&this.state.hidePrevious)
        {
            this.setState({hidePrevious:false})
        }
        if(this.state.media.length-2==questionCounter&&this.state.hideNext)
        {
            this.setState({hideNext:false,showFinish:false})
        }
        
        

        return (
            
            this.quiz_question(item,questionData)
        )
    }

    participate=()=>{
        let formData = new FormData();
        formData.append('quiz_id',this.props.match.params.id)
        formData.append('paticipateUser', 1)
        formData.append('quiz_type', "dailyquiz")
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
            if(data.msg=="ok")
            {
                this.save_quiz_response();
            }
            else
            {
                $("#update_message").html("<strong>Error! </strong>"+data.msg)
                $("#update_message").removeClass("alert-success").addClass("alert-danger")
            }
            $("#update_message").show()
                   setTimeout(function(){ $("#update_message").hide(); }, 4000);
         })
    }


    quiz_question=(item,questionData)=>
    {
        let option_class1='btn btn-primary';
        let option_class2='btn btn-primary';
        let option_class3='btn btn-primary';
        let option_class4='btn btn-primary';  
        if(questionData)
        {
             
            switch(questionData['option_id'])
            {
                case  1: 
                    option_class1='btn btn-danger'
                    break;
                case 2: 
                    option_class2='btn btn-danger';
                    break;
                case 3: 
                    option_class3='btn btn-danger';
                    break;
                case 4: 
                    option_class4='btn btn-danger';
            }
           if(this.state.showResult)
           {    
               switch(item['correct_ans'])
                {
                    case  '1': 
                        option_class1='btn btn-success';
                        break;
                    case '2': 
                        option_class2='btn btn-success';
                        break;
                    case "3": 
                        option_class3='btn btn-success';
                        break;
                    case '4': 
                        option_class4='btn btn-success';
                }
            }
        }
        return(
            <div> 
            
            <div className="questionShow" style={{display: 'flex', flexDirection: 'row'}}>
                
                <div className="quizque" style={{marginTop:10, marginBottom:10,marginLeft:10, flex: 0.9}}>
                    {item.question}
                </div> 
                {this.state.showResult?(
                    questionData?(
                        item['correct_ans']==questionData['option_id']?
                        (
                            <div className="quizpt" style={{marginTop:10, marginBottom:10, flex: 0.1}} >
                                <h5>Points:{this.state.singleQuePoint}/{this.state.singleQuePoint}</h5>
                            </div> 
                        ):(
                            <div className="quizpt" style={{marginTop:10, marginBottom:10, flex: 0.1}} >
                                <h5>Points:0/{this.state.singleQuePoint}</h5>
                            </div>
                        )
                    ):(
                        <div className="quizpt" style={{marginTop:10, marginBottom:10, flex: 0.1}} >
                            <h5>Points:0/{this.state.singleQuePoint}</h5>
                        </div>
                    )
                ):(
                        <div className="quizpt" style={{marginTop:10, marginBottom:10, flex: 0.1}} >
                            <h5> Max Points:{this.state.singleQuePoint}</h5>
                        </div> 
                )}
                
            </div>
            {this.state.showResult?( 
            <div>
                <div className="row">
                    <div className="col-12 col-md-5 col-lg-5 col-sm-5" style={{margin:10}}>
                        <button className={option_class1} style={{width:'95%'}} id={"que"+item.question_id+"1"} onClick={null}> {item.options[0]}</button>
                    </div>
                    <div className="col-12 col-md-5 col-lg-5 col-sm-5" style={{margin:10}}>
                        <button className={option_class2} style={{width:'95%'}} id={"que"+item.question_id+"2"} onClick={null}> {item.options[1]}</button>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-5 col-lg-5 col-sm-5" style={{margin:10}}>
                        <button className={option_class3} style={{width:'95%'}} id={"que"+item.question_id+"3"} onClick={null}>{item.options[2]}</button>
                    </div>
                    <div className="col-12 col-md-5 col-lg-5 col-sm-5" style={{margin:10}}>
                        <button className={option_class4} style={{width:'95%'}} id={"que"+item.question_id+"4"} onClick={null}>{item.options[3]}</button>
                    </div>
                </div>
            </div>
            ):(
            <div>
                <div className="row">
                    <div className="col-12 col-md-5 col-lg-5 col-sm-5" style={{margin:10}}>
                        <button className={option_class1} style={{width:'95%'}} id={"que"+item.question_id+"1"} onClick={()=>this.handleOptionsClick(item.question_id,1,item.correct_ans)}> {item.options[0]}</button>
                    </div>
                    <div className="col-12 col-md-5 col-lg-5 col-sm-5" style={{margin:10}}>
                        <button className={option_class2} style={{width:'95%'}} id={"que"+item.question_id+"2"} onClick={()=>this.handleOptionsClick(item.question_id,2,item.correct_ans)}> {item.options[1]}</button>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-5 col-lg-5 col-sm-5" style={{margin:10}}>
                        <button className={option_class3} style={{width:'95%'}} id={"que"+item.question_id+"3"} onClick={()=>this.handleOptionsClick(item.question_id,3,item.correct_ans)}>{item.options[2]}</button>
                    </div>
                    <div className="col-12 col-md-5 col-lg-5 col-sm-5" style={{margin:10}}>
                        <button className={option_class4} style={{width:'95%'}} id={"que"+item.question_id+"4"} onClick={()=>this.handleOptionsClick(item.question_id,4,item.correct_ans)}>{item.options[3]}</button>
                    </div>
                </div>
            </div>  
            )}
        </div>
        )
    }
    fetch_PrelimsQuiz = ()=>
    {
        document.title="Prelims" 
        
        let formData = new FormData(); 
        formData.append('fetch_quiz_question', this.props.match.params.id)

        var obj=this
        
        axios({
            method: 'post',
            url: api_link+'Fetch_Quiz_Question.php',
            data: formData,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
        .then(response => response.data)
        .then((data) => { 
            let total_points = data['quiz_points'];
            obj.setState({totalPoints: total_points})
            delete data['quiz_points'];
            obj.setState({media: Object.values(data)}) 
            var res= this.state.totalPoints/this.state.media.length;
            obj.setState({singleQuePoint: res})
         })
    }
    display_quiz_results=()=>
    {
        return(
            <div>
            {this.state.media.map((media,key)=>(
                    <div className="questionShow" style={{display: 'flex', flexDirection: 'row'}}>
                    <div className="quizque" style={{marginTop:10, marginLeft:10, flex: 0.9}}>
                        {this.quiz_question(media,this.state.question_data[media.question_id])}
                    </div>
                    </div>
                ))}
            </div>
        )
    }

    display_quiz=()=>
    {
        return(
        <div>
            {this.state.media.length?(this.renderQuizQuestion(this.state.questionCounter)):(null)}
            <div className="rowButton" style={{display: 'flex',flexDirection:'row',justifyContent: 'space-between'}}>
                <div className="colButton" style={{marginLeft: 10}}>
                    {this.state.hidePrevious?(null):(
                        <button className="btn btn-primary" id="quizPrevious" onClick={()=>{this.setState({questionCounter:this.state.questionCounter-1})}}>Previous</button> 
                    )} 
                </div> 
                <div className="colButton"> 
                    {this.state.hideNext?(null):(
                        <button className="btn btn-primary" id="quizNext" onClick={()=>{this.setState({questionCounter:this.state.questionCounter+1})}}>Next</button>
                    )}
                    {this.state.showFinish?(
                        <button className="btn btn-primary"  onClick={this.participate}>Finish</button>
        
                    ):(null)}
                </div>
            </div>
        </div>
        )
    }
     
    save_quiz_response=()=>
    {
        if(window.confirm('Are you sure you want to Finish this Quiz'))
        {
            let formData = new FormData(); 
            formData.append('set_quiz_result', "true") 
            formData.append('quiz_id',this.props.match.params.id)
            formData.append('points',this.state.points)
            formData.append('user_id', window.atob(window.sessionStorage.getItem(window.btoa("user_id"))))
            formData.append('questionData',JSON.stringify(this.state.question_data)) 
            
            axios({
                method: 'post',
                url: api_link+'Set_quiz_result.php',
                data: formData,
                config: { headers: {'Content-Type': 'multipart/form-data' }}
            })
            .then(response => response.data)
            .then((data) => { 
            if(data.msg=="ok")
            {
                this.setState({showResult: true})
                $("#update_message").html("<strong>Success! </strong> Your Request Successfully Processed")
                $("#update_message").removeClass("alert-danger").addClass("alert-success")
            }
            else
            {
                $("#update_message").html("<strong>Error! </strong>"+data.msg)
                $("#update_message").removeClass("alert-success").addClass("alert-danger")
            }
            $("#update_message").show()
                   setTimeout(function(){ $("#update_message").hide(); }, 4000);
        })
        }
    }

    componentDidMount() {
        this.fetch_PrelimsQuiz();
        let formData = new FormData(); 
        formData.append('fetch_pquiz', this.props.match.params.id)
        formData.append('user_id', window.atob(window.sessionStorage.getItem(window.btoa("user_id"))))
        var obj=this 
        axios({
            method: 'post',
            url: api_link+'Fetch_Quiz_Question.php',
            data: formData,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
        .then(response => response.data)
        .then((data) => { 
            console.log(data)
            if(data.msg == "participated"&&data.count==0)
            {
                this.setState({participated: false});
            }
            else if(data.msg == "participated"&&data.count!=0)
            {
                this.setState({participated: false,showResult: true,question_data:data.quiz_ans});

            }
        })
    }

    handleOptionsClick=(question_id,option_id,c_option_id)=>
    {
        let ans ;
        if(c_option_id==option_id)
        {
            ans = "correct";
            this.setState({points: this.state.points+this.state.singleQuePoint})
        }else
        {
            ans ="incorrect";
        }
        $("button[id^=que"+question_id+"]").attr("class","btn btn-primary")
        $("#que"+question_id+option_id).attr("class","btn btn-success");
        let question_data = {...this.state.question_data,[question_id]:{option_id:option_id,status:ans,question_id:question_id}};
        this.setState({question_data:question_data});
    }
    render() { 
        return (
            <React.Fragment>
            <div className="content-wrapper">
                <div style={{display: 'flex', flexDirection: 'row'}}>
                    <section className="content-header" style={{flex:0.9}}>
                        {this.state.showResult?( <h1>Showing Result</h1> ):(<h1>{this.props.match.params.name}</h1>)}
                    </section>
                    {this.state.showResult?(
                    <div className="quizpt" style={{ flex: 0.1, marginRight: 20, marginTop:25}} >
                        <h5>Total Points:{this.state.points}/{this.state.totalPoints}</h5>
                    </div>
                    ):(null)}
                </div>
                <section>
                        <div id="update_message" className="alert" style={{display: 'none', marginTop:20, marginLeft:20, marginRight:20}}></div> 
                </section>
                <section className="content">
                    <div className="box">
                        <div className="box-body table-responsive" style={{overflowX: 'hidden'}}>
                          {this.state.participated?(
                              <div className="row col-md-12">
                                  You Have Already Participated
                                </div>
                          ):(
                              this.state.showResult?(
                                this.display_quiz_results()
                            ):(
                                this.display_quiz()
                            )
                          )}  
                        </div>
                    </div> 
                </section>
            </div>
            </React.Fragment>

        );
    } 

   
}

export default DailyQuiz;