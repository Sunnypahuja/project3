import React from 'react';

import { Link } from "react-router-dom";
import axios,{post} from 'axios';
import $ from 'jquery';
import CKEditor from "react-ckeditor-component";

    import { api_link ,serverBase_link} from './AdminLogin';

class Quiz extends React.Component{
    
    constructor() {
        super();
        this.state = {
          products: [],
          type: '',
        };
        
        this.childKey = 0;
      }

    componentDidMount() {
        //    this.fetch_quiz();      
    }

    fetch_quiz=()=>{

        document.title="Quiz"
        let formData = new FormData();
        formData.append('quiz', "all")
        formData.append('type', this.props.match.params.type)
        
        axios({
                method: 'post',
                url: api_link+'ProgramsFetch.php',
                data: formData,
                config: { headers: {'Content-Type': 'multipart/form-data' }}
        }).then(response => response.data)
        .then((data) => {
          this.setState({ products: data, type: this.props.match.params.type})
            $("script[src='js/dataTable.js']").remove();
            const script = document.createElement("script");

            script.src = "js/dataTable.js";
            script.async = true;

            document.body.appendChild(script);
         }) 
    }

    deleteCategory = qid  => e => {
      
          if(window.confirm("Are You Sure To Delete This Quiz?")) 
          {
              let formData = new FormData();
              formData.append('delete_quiz', qid)
              var obj=this

              axios({
                  method: 'post',
                  url: api_link+'ProgramsManagement.php',
                  data: formData,
                  config: { headers: {'Content-Type': 'multipart/form-data' }}
              })
              .then(function (response) {
                  //handle success
                  if(response.data === "ok")
                  {	
                        let formData1 = new FormData();
                        formData1.append('quiz', "1")
                        formData1.append('type', obj.state.type)

                        axios({
                            method: 'post',
                            url: api_link+'ProgramsFetch.php',
                            data: formData1,
                            config: { headers: {'Content-Type': 'multipart/form-data' }}
                        })
                        .then(response => response.data)
                        .then((data) => {
                            obj.setState({ products: data})
                        })

                      $("#update_message").html("<strong>Success! </strong> Your Request Successfully Processed")
                      $("#update_message").removeClass("alert-danger").addClass("alert-success")
                  }
                  else
                  {
                      $("#update_message").html("<strong>Error! </strong> Unable to Process Your Request")
                      $("#update_message").removeClass("alert-success").addClass("alert-danger")
                  }
                  $("#update_message").show()
                   setTimeout(function(){ $("#update_message").hide(); }, 4000);


              })
              .catch(function (response) {
                    //handle error
                    console.log(response)
                    $("#update_message").html("<strong>Error! </strong> Unable to Process Your Request")
                    $("#update_message").removeClass("alert-success").addClass("alert-danger")
                    $("#update_message").show()
                    setTimeout(function(){ $("#update_message").hide(); }, 4000);
              });
          }
    }

    render()
    {
        if(this.state.type!=this.props.match.params.type)
        {
            this.fetch_quiz()
        }
        return(
            <React.Fragment>
                <div className="content-wrapper">
                    <section>
                        <div id="update_message" className="alert" style={{display: 'none'}}></div> 
                    </section>
                    <section className="content-header">
                          <h1>Quiz</h1>
                          <ol className="breadcrumb">
                              <li>
                                  <div className="pull-right"> 
                                      <Link to={"/admin/add-quiz/"+this.props.match.params.type} className="btn btn-primary">
                                            <i className="fa fa-plus"></i>
                                      </Link>
                                  </div>
                              </li>
                          </ol>
                    </section>

                    <section className="content" key={this.childKey}>
                          <div className="box">
                              <div className="box-body table-responsive">
                                  <br/>
                                  <table className="table">
                                    <thead>
                                    <tr>
                                      <th>S.No</th>
                                      <th>Title</th>
                                      <th>Type</th>
                                      <th>Paid</th>
                                      <th>Under</th>
                                      <th>Status</th>
                                      <th>Action</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                      {this.state.products&&this.state.products.map((product, key) => (
                                      <tr key={product.id}>
                                          <td>
                                            {key+1}
                                          </td>
                                          <td>{product.title}</td>
                                          <td>{product.type.toUpperCase()}</td>
                                          <td>{product.free_under?"No":"Yes"}</td>
                                          {product.comes_under?(<td>{product.comes_under.toUpperCase()}</td>):(<td>NA</td>)}
                                          {product.status?(
                                          <td>{product.status.toUpperCase()}</td>
                                          ):(<td>NA</td>)}
                                          <td>
                                              <Link to={"/admin/edit-quiz/"+product.id+"/"+this.props.match.params.type} className="btn btn-success" style={{marginRight: '7px'}}>
                                                  <i className="fa fa-edit"></i> Edit
                                              </Link>
                                              <button type="submit" name="del" className="btn btn-danger" value={product.id} onClick={this.deleteCategory(product.id)}><i className="fa fa-trash"></i></button>
                                          </td>
                                        </tr>
                                      ))}
                                    </tbody>
                                    <tfoot></tfoot>
                                  </table>                    
                              </div>
                          </div>
                      </section>
                  </div>
            </React.Fragment>
        );
    }
}

class AddQuiz extends React.Component{

    constructor() {
        super();
        this.state = {
            pages: [],
            courses: [],
            name: '',
            totalPoints: 0,
            available_from: '',
            available_to: '',
            description: '',
            file: '',
            file1: '',
            file2: '',
        };
        
        this.childKey = 0;    

        //FETCH ALL PROGRAMS AND COURSES
        let formData = new FormData();
        formData.append('programmes_and_courses', "all")

        axios({
                method: 'post',
                url: api_link+'ProgramsFetch.php',
                data: formData,
                config: { headers: {'Content-Type': 'multipart/form-data' }}
        }).then(response => response.data)
        .then((data) => {
          this.setState({ courses: data })
        })  

        //FETCH ALL PAGES
        let pageFormData = new FormData();
        pageFormData.append('dynamic_pages_for_quiz', "1")

        var obj=this
        
        axios({
            method: 'post',
            url: api_link+'EditSiteFetch.php',
            data: pageFormData,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
        .then(response => response.data)
        .then((data) => {
            obj.setState({ pages: data})
         })
    }
    
    componentDidMount() {
        document.title="Add Quiz"
        if(this.props.match.params.type=='mains')
        {
            $("#questionsDiv select, #questionsDiv input").attr("required", false);
        }
        else
        {
            $("#mainsFile").attr("required", false) 
            $("#mainsFile").hide() 
        }
    }
  
    handleAddFormSubmit( event ) {
		event.preventDefault();
		
        var all_good=true;
        
        if(!this.state.description)
        {
            $("#d_description").show();
            all_good=false;
        }
        else
        {
            $("#d_description").hide();
        }
      
        if(all_good)
        {
            $("#invalid_message").hide();

            if(this.props.match.params.type === "mains")
            {
                let reader = new FileReader()
                reader.readAsDataURL(this.state.file)
                //reader.readAsDataURL(this.state.file1)
                //reader.readAsDataURL(this.state.file2)
              //  reader.onload=(e)=>{
                    let formData = new FormData();
                    formData.append('add_product', 'yes')
                    formData.append('name', this.state.name)
                    formData.append('totalPoints', this.state.totalPoints)
                    formData.append('type', this.props.match.params.type)  
                    formData.append('status', this.refs.status.value)  
                    formData.append('free', this.refs.free.value)  
                    formData.append('prevyear', 0)
                    
                    if(this.refs.free.value === "yes")
                    {
                        formData.append('under', this.refs.freeUnder.value)  
                    }
                    else
                    {
                        formData.append('under', this.refs.paidUnder.value)  
                    }

                    formData.append('file', this.state.file)
                    formData.append('file1', this.state.file1)
                    formData.append('file2', this.state.file2)
                    formData.append('available_from', this.state.available_from)  
                    formData.append('available_to', this.state.available_to)  
                    
                    formData.append('description', this.state.description)  

                    var obj=this

                    $("#submitButton").html("Processing").prop("disabled", true)

                    axios({
                        method: 'post',
                        url: api_link+'ProgramsManagement.php',
                        data: formData,
                        config: { headers: {'Content-Type': 'multipart/form-data' }}
                    })
                    .then(function (response) {
                        $("#submitButton").html("Add Data").prop("disabled", false)

                        if(response.data === "ok")
                        {	
                            document.getElementById("addProduct").reset(); 
                            obj.setState({
                                name: '',
                                totalPoints: 0,
                                available_from: '',
                                available_to: '',
                                description: '',
                                file: '',
                                file1: '',
                                file2: '',
                            })

                            $("#update_msg").html("<strong>Success! </strong> Your Request Successfully Processed")
                            $("#update_msg").removeClass("alert-danger").addClass("alert-success")
                        }
                        else
                        {
                            $("#update_msg").html("<strong>Error! </strong> Unable to Process Your Request")
                            $("#update_msg").removeClass("alert-success").addClass("alert-danger")
                        }
                        $("#update_msg").show()
                        window.scrollTo({top: 0, behavior: 'smooth'});
                        setTimeout(function(){ $("#update_msg").hide(); }, 4000);


                    })
                    .catch(function (response) {
                        $("#update_msg").html("<strong>Error! </strong> Unable to Process Your Request")
                        $("#update_msg").removeClass("alert-success").addClass("alert-danger")
                        $("#update_msg").show()
                        window.scrollTo({top: 0, behavior: 'smooth'});
                        setTimeout(function(){ $("#update_msg").hide(); }, 4000);
                    });
               // }
            }
            else
            {
                let formData = new FormData();
                formData.append('add_product', 'yes')
                formData.append('name', this.state.name)
                formData.append('totalPoints', this.state.totalPoints)
                formData.append('type', this.props.match.params.type)  
                formData.append('status', this.refs.status.value)  
                formData.append('free', this.refs.free.value)  
                formData.append('prevyear', 0)
                
                if(this.refs.free.value === "yes")
                {
                    formData.append('under', this.refs.freeUnder.value)  
                }
                else
                {
                    formData.append('under', this.refs.paidUnder.value)  
                }

                formData.append('available_from', this.state.available_from)  
                formData.append('available_to', this.state.available_to)  
                
                formData.append('description', this.state.description)  

                var allQuestions = [];

                $("#questionsDiv .row [id^=question]").each(function(){
                    let questionId = $(this).attr("id").replace("question", "")

                    let questionDetails = {};

                    questionDetails['question']=$(this).val();
                    questionDetails['correct_answer']=$("#q"+questionId+"c").val();
                    questionDetails['explanation']=$("#exp"+questionId).val();
                    questionDetails['options']=[];

                    questionDetails['options'].push($("#q"+questionId+"o1").val())
                    questionDetails['options'].push($("#q"+questionId+"o2").val())
                    questionDetails['options'].push($("#q"+questionId+"o3").val())
                    questionDetails['options'].push($("#q"+questionId+"o4").val())

                    allQuestions.push(questionDetails);
                })

                formData.append("questions", JSON.stringify(allQuestions));

                var obj=this

                $("#submitButton").html("Processing").prop("disabled", true)

                axios({
                    method: 'post',
                    url: api_link+'ProgramsManagement.php',
                    data: formData,
                    config: { headers: {'Content-Type': 'multipart/form-data' }}
                })
                .then(function (response) {
                    $("#submitButton").html("Add Data").prop("disabled", false)
                    if(response.data === "ok")
                    {	
                        document.getElementById("addProduct").reset(); 
                        obj.setState({
                            name: '',
                            totalPoints: 0,
                            available_from: '',
                            available_to: '',
                            description: '',
                            file: '',
                            file1: '',
                            file2: '',
                        })

                        $("#update_msg").html("<strong>Success! </strong> Your Request Successfully Processed")
                        $("#update_msg").removeClass("alert-danger").addClass("alert-success")
                    }
                    else
                    {
                        $("#update_msg").html("<strong>Error! </strong> Unable to Process Your Request")
                        $("#update_msg").removeClass("alert-success").addClass("alert-danger")
                    }
                    $("#update_msg").show()
                    window.scrollTo({top: 0, behavior: 'smooth'});
                    setTimeout(function(){ $("#update_msg").hide(); }, 4000);


                })
                .catch(function (response) {
                    $("#update_msg").html("<strong>Error! </strong> Unable to Process Your Request")
                    $("#update_msg").removeClass("alert-success").addClass("alert-danger")
                    $("#update_msg").show()
                    window.scrollTo({top: 0, behavior: 'smooth'});
                    setTimeout(function(){ $("#update_msg").hide(); }, 4000);
                });
            }
        }
	}

    handleTypeChange(event, tagId)
    {
        if(tagId === "quizType")
        {
            if($("#quizType").val() === "prelims")
            {
                $("#questionsDiv .row").show();

                $("#addQuestion, #removeQuestion").show()

                $("#questionsDiv select, #questionsDiv input[type!='file']").attr("required", true);

                document.getElementById("mainsFile").value = "";

                $("#mainsFile").attr("required", false).hide();
            }
            else if($("#quizType").val() === "dailyquiz")
            {
                $("#questionsDiv .row").show();

                $("#addQuestion, #removeQuestion").show()

                $("#questionsDiv select, #questionsDiv input").attr("required", true);

                document.getElementById("mainsFile").value = "";

                $("#mainsFile").attr("required", false).hide();
            }
            else
            {
                $("#questionsDiv .row").hide();

                $("#addQuestion, #removeQuestion").hide()

                $("#questionsDiv select, #questionsDiv input").attr("required", false);
                
                $("#mainsFile").attr("required", true).show();
            }
        }
        else
        {
            if($("#isFree").val() === "yes")
            {
                $("#freeUnder").show().attr("required", true)
                $("#paidUnder").hide().attr("required", false)
            }
            else
            {
                $("#freeUnder").hide().attr("required", false)
                $("#paidUnder").show().attr("required", true)
            }
        }
    }
    
    render()
    {
        var currentQuestions=1;

        $(function(){
            $('.mobile').keypress(function (e) {
                var regex = new RegExp("^[0-9\b]+$");
                var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
                if (regex.test(str)) {
                    return true;
                }
                else
                {
                    e.preventDefault();
                    return false;
                }
            });
        })

        function addQuestion()
        {
            currentQuestions++;

            let div=`<div class="row questionCard${currentQuestions}">
                        <div class="col-xs-8">
                            <input type="text" id="question${currentQuestions}" required class="form-control" placeholder="Question ${currentQuestions}" />
                        </div>
                        <div class="col-xs-4">
                            <select id="q${currentQuestions}c" class="form-control" required>
                                <option selected disabled>Correct Answer</option>
                                <option value="1">Option1</option>
                                <option value="2">Option2</option>
                                <option value="3">Option3</option>
                                <option value="4">Option4</option>
                            </select>
                        </div>
                        <div class="col-xs-6">
                            <br/>
                            <input type="text" id="q${currentQuestions}o1" required class="form-control" placeholder="Option 1" />
                        </div>
                        <div class="col-xs-6">
                            <br/>
                            <input type="text" id="q${currentQuestions}o2" required class="form-control" placeholder="Option 2" />
                        </div>
                        <div class="col-xs-6">
                            <br/>
                            <input type="text" id="q${currentQuestions}o3" required class="form-control" placeholder="Option 3" />
                        </div>
                        <div class="col-xs-6">
                            <br/>
                            <input type="text" id="q${currentQuestions}o4" required class="form-control" placeholder="Option 4" />
                        </div>
                        <div class="col-md-12">
                            <br />
                            <textarea type="text" id="exp${currentQuestions}"  class="form-control" placeholder="Explanation"></textarea>
                        </div>
                        <div class="col-md-12"><hr/></div>
                    </div>`;

            $("#questionsDiv").append(div);

            $("#removeQuestion").show();
        }

        function removeQuestion()
        {
            if(currentQuestions > 1)
            {
                $(".questionCard"+currentQuestions).remove();

                currentQuestions--;

                if(currentQuestions === 1)
                {
                    $("#removeQuestion").hide();
                }
            }
        }
        
        return(
            <React.Fragment>
                <div className="content-wrapper">
                    <section className="content-header">
                        <h1>Add Quiz</h1>
                        <ol className="breadcrumb">
                              <li>
                                  <div className="pull-right"> 
                                      <Link to="/admin/quiz" className="btn btn-success">
                                            <i className="fa fas fa-arrow-left"></i> Go Back
                                      </Link>
                                  </div>
                              </li>
                        </ol>
                    </section>
                    <section>
                        <div id="update_msg" className="alert" style={{display: 'none'}}></div> 
                    </section>
                    <section className="content" style={{overflow: 'auto'}} key={this.childKey}>
                          <div className="box">
                              <div className="box-body">
                                  <br/>
                                  <form id="addProduct" onSubmit={this.handleAddFormSubmit.bind(this)}>
                                      <div className="modal-body">
                                          <div className="row">
                                              <div className="col-md-6">
                                                  <label>Title</label>
                                                    <input type="text" className="form-control" required onChange={e => this.setState({ name: e.target.value })} />
                                              </div>

                                              <div className="col-md-6">
                                                  <label>Total Points</label>
                                                    <input type="text" className="form-control mobile" required onChange={e => this.setState({ totalPoints: e.target.value })} />
                                              </div>

                                              {/* <div className="col-md-6">
                                                    <br/>
                                                    <label>Type</label>
                                                    <select id="quizType" className="form-control col-md-6" required ref="type" onChange={(e) => {this.handleTypeChange(e, "quizType")}}>
                                                        <option value="prelims">Prelims</option>
                                                        <option value="mains">Mains</option>
                                                        <option value="dailyquiz">Daily Quiz</option>
                                                    </select>
                                              </div> */}
                                              <div className="col-md-6">
                                                    <br/><label>Status</label>
                                                    <select className="form-control col-md-6" required ref="status">
                                                        <option value="active">Active</option>
                                                        <option value="inactive">Inactive</option>
                                                    </select>
                                              </div>
                                              <div className="col-md-6">
                                                    <br/><label>Is Free</label>
                                                    <select id="isFree" className="form-control col-md-6" required ref="free" onChange={(e) => this.handleTypeChange(e, "isFree")}>
                                                        <option value="yes">Yes</option>
                                                        <option value="no">No</option>
                                                    </select>
                                              </div>
                                              <div className="col-md-6">
                                                    <br/><label>Comes Under</label>
                                                    <select id="freeUnder" className="form-control col-md-6" required ref="freeUnder">
                                                        <optgroup label="Prelims and Mains">
                                                            <option value="prelims">Prelims</option>
                                                            <option value="mains">Mains</option>
                                                        </optgroup>
                                                        {
                                                            this.state.pages.length
                                                            ?
                                                            <optgroup label="Other Menu Pages">
                                                                {
                                                                    this.state.pages.map((p, key) => (
                                                                        <option value={p.id}>{p.title}</option>
                                                                    ))
                                                                }
                                                            </optgroup>
                                                            :
                                                            ''
                                                        }
                                                    </select>

                                                    <select id="paidUnder" className="form-control col-md-6" ref="paidUnder" style={{display: 'none'}}>
                                                        {
                                                            this.state.courses.length
                                                            ?
                                                            this.state.courses.map((p, key) => (
                                                                <option value={p.id}>{p.name+' ('+p.type+')' }</option>
                                                            ))
                                                            :
                                                            <option selected disabled>No Programmes/Courses Added</option>
                                                        }
                                                    </select>
                                              </div>
                                              <div className="col-md-6">
                                                    <br/>
                                                    <label>Available From</label>
                                                    <input type="date" className="form-control" onChange={e => this.setState({ available_from: e.target.value })} required />
                                              </div>
                                              <div className="col-md-6">
                                                    <br/>
                                                    <label>Available To</label>
                                                    <input type="date" className="form-control" onChange={e => this.setState({ available_to: e.target.value })} required />
                                              </div>

                                              <div className="col-md-12">
                                                    <br/>
                                                    <label>Detailed Description</label>
                                                    &nbsp;<span id="d_description" style={{color: 'red', display: 'none'}}>This field is required*</span>
                                                    <CKEditor content={this.state.description} required activeClass="p10" events={{ "change": e => this.setState({ description: e.editor.getData() })}}/>
                                              </div>

                                              <div id="questionsDiv" className="col-md-12">
                                                    <br/>
                                                    {this.props.match.params.type==="mains"?(null):( 
                                                    <div>
                                                        Questions
                                                       <button type="button" className="btn btn-sm btn-primary" id="addQuestion" onClick={() => {addQuestion()}} style={{ marginLeft: '7px'}}>
                                                            <i className="fa fa-plus"></i>
                                                        </button>
                                                        <button type="button" className="btn btn-sm btn-danger" id="removeQuestion" onClick={() => {removeQuestion()}} style={{ marginLeft: '7px'}}>
                                                            <i className="fa fa-trash"></i>
                                                        </button>
                                                    </div>)}
                                                    <br/>
                                                   {this.props.match.params.type==="mains"?(
                                                       <>
                                                      <label> Question Paper:-</label>
                                                       <input id="mainsFile" type="file" accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx" onChange={(e) => {this.setState({file: e.target.files[0]});} } />
                                                       <label> Answer Model:-</label>
                                                         <input id="mainsFile" type="file" accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx" onChange={(e) => {this.setState({file1: e.target.files[0]});} } />
                                                         <label>  Answer Sheet:-</label>
                                                       <input id="mainsFile" type="file" accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx" onChange={(e) => {this.setState({file2: e.target.files[0]});} } />
                                                        </>
                                                   
                                                       ):(
                                                       <div className="row questionCard1">
                                                       <div className="col-xs-8">
                                                           <input type="text" id="question1" required className="form-control" placeholder="Question 1" />
                                                       </div>
                                                       <div className="col-xs-4">
                                                           <select id="q1c" className="form-control" required>
                                                               <option selected disabled>Correct Answer</option>
                                                               <option value="1">Option1</option>
                                                               <option value="2">Option2</option>
                                                               <option value="3">Option3</option>
                                                               <option value="4">Option4</option>
                                                           </select>
                                                       </div>
                                                       <div className="col-xs-6">
                                                           <br/>
                                                           <input type="text" id="q1o1" required className="form-control" placeholder="Option 1" />
                                                       </div>
                                                       <div className="col-xs-6">
                                                           <br/>
                                                           <input type="text" id="q1o2" required className="form-control" placeholder="Option 2" />
                                                       </div>
                                                       <div className="col-xs-6">
                                                           <br/>
                                                           <input type="text" id="q1o3" required className="form-control" placeholder="Option 3" />
                                                       </div>
                                                       <div className="col-xs-6">
                                                           <br/>
                                                           <input type="text" id="q1o4" required className="form-control" placeholder="Option 4" />
                                                       </div>
                                                       <div className="col-md-12">
                                                           <br/>
                                                           <textarea id="exp1" placeholder="Explanation" className="form-control"></textarea>
                                                       </div>
                                                       <div className="col-md-12"><hr/></div>
                                                   </div>

                                                   )} 
                                              </div>

                                              <div className="col-md-12">
                                                  <br/>
                                                  <button type="submit" id="submitButton" name="add" className="btn pull-right btn-primary">Add Data</button>
                                              </div>
                                          </div>
                                          <br/>
                                      </div>                 
                                  </form>
                              </div>
                          </div>
                      </section>
                  </div>
            </React.Fragment>
        );
    }
}

class EditQuiz extends React.Component{
 
    constructor(props) {
        super();
        this.state = {
            token: props.match.params.token,
            pages: [],
            courses: [],
            name: '',
            totalPoints: '',
            available_from: '',
            available_to: '',
            description: '',
            file: '',
            file1: '',
            file2: '',
            refresh: false,
            questions: {},
            free_under: '',
            media_file: '',
            media_file1: '',
            media_file2: '',
            paid_under: '',
            type: '',
            current_type: '',
        };
        
        this.childKey = 0;  
      
        //FETCH ALL PROGRAMS AND COURSES
        let formData = new FormData();
        formData.append('programmes_and_courses', "all")

        axios({
                method: 'post',
                url: api_link+'ProgramsFetch.php',
                data: formData,
                config: { headers: {'Content-Type': 'multipart/form-data' }}
        }).then(response => response.data)
        .then((data) => {
          this.setState({ courses: data })
        })  

        //FETCH ALL PAGES
        let pageFormData = new FormData();
        pageFormData.append('dynamic_pages_for_quiz', "1")

        var obj=this
        
        axios({
            method: 'post',
            url: api_link+'EditSiteFetch.php',
            data: pageFormData,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
        .then(response => response.data)
        .then((data) => {
            obj.setState({ pages: data})
         })
        const base = document.querySelector('base');
        base.setAttribute('href', '../'); 
    }

    componentWillUnmount(){
        const base = document.querySelector('base');
        base.setAttribute('href', '');
    }
    
    componentDidMount() {
        document.title="Edit Quiz"
		
        var obj=this

		//FETCH DETAILS OF PRODUCT
        let c_product = new FormData();
        c_product.append('quiz_details', this.state.token)
        axios({
                method: 'post',
                url: api_link+'ProgramsFetch.php',
                data: c_product,
                config: { headers: {'Content-Type': 'multipart/form-data' }}
        }).then(response => response.data)
        .then((data) => {
            this.setState({
                name: data[0]['title'],
                totalPoints: data[0]['total_points'],
                available_from: data[0]['available_from'],
                available_to: data[0]['available_to'],
                description: data[0]['description'],
                file: data[0]['media_file'],
                file1: data[0]['media_file1'],
                file2: data[0]['media_file2'],
                questions: data[0]['questions'],
                free_under: data[0]['free_under'],
                media_file: data[0]['media_file'],
                media_file1: data[0]['media_file1'],
                media_file2: data[0]['media_file2'],
                paid_under: data[0]['paid_under'],
                type: data[0]['type'],
                current_type: data[0]['type'],
                status: data[0]['status'],
            })
            
            //SETUP FOR FIRST LOOK
            $(function(){
                $("#status").val(data[0]['status'])

                $("#quizType").val(data[0]['type'])

                if(obj.state.free_under)
                {
                    $("#isFree option").eq(0).prop("selected", true)
                    $("#freeUnder").show().attr("required", true)
                    $("#paidUnder").hide().attr("required", false)
                }
                else
                {
                    $("#isFree option").eq(1).prop("selected", true)
                    $("#freeUnder").hide().attr("required", false)
                    $("#paidUnder").show().attr("required", true)
                }

                window.currentQuestions=(obj.state.questions.length?obj.state.questions.length:1);

                if(data[0]['type'] === "prelims")
                {

                    $("#mainsFile").attr("required", false).hide();

                    $("#questionsDiv .row").show();

                    $("#addQuestion, #removeQuestion").show()

                    $("#questionsDiv select, #questionsDiv input[type!='file']").attr("required", true);
                }
                else if(data[0]['type'] === "dailyquiz")
                {

                    $("#mainsFile").attr("required", false).hide();

                    $("#questionsDiv .row").show();

                    $("#addQuestion, #removeQuestion").show()

                    $("#questionsDiv select, #questionsDiv input[type!='file']").attr("required", true);
                }
                else
                {
                    //$("#mainsFile").attr("required", true).show();

                    $("#questionsDiv .row").hide();

                    $("#addQuestion, #removeQuestion").hide()

                    $("#questionsDiv select, #questionsDiv input").attr("required", false);
                }
            })
         })
    }
  
     changeFile=(value)=>{
       
        let formData = new FormData();
        formData.append('updatefile', this.state.token)
        if(value == "file")
        {
            formData.append('file[]',this.state.file)
            formData.append('mediaa','media_file' )
        }
        else if(value == "file1")
        { 
            formData.append('file[]',this.state.file1 )
            formData.append('mediaa','media_file1' )}
        else if(value=="file2")
        {
        formData.append('file[]',this.state.file2 )
        formData.append('mediaa','media_file2' )}
        for (var pair of formData.entries()) {
            console.log(pair[0]+ ', ' + pair[1]); 
        }
         
        axios({
            method: 'post',
            url: api_link+'ProgramsManagement.php',
            data: formData,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
        .then(function (response) {
            
            
            if(response.data === "ok")
            {	
               
            }
    })
}
    handleEditFormSubmit( event ) {
		event.preventDefault();
		
        var all_good=true;
        
        if(!this.state.description)
        {
            $("#d_description").show();
            all_good=false;
        }
        else
        {
            $("#d_description").hide();
        }
      
        if(all_good)
        {
            if(window.confirm("Are You Sure To Make Changes?"))
            {
                if(this.props.match.params.type === "prelims"||this.props.match.params.type === "dailyquiz")
                {
                     let formData = new FormData();
                    formData.append('edit_product', this.state.token)
                    formData.append('name', this.state.name)
                    formData.append('totalPoints', this.state.totalPoints)
                    formData.append('type', this.props.match.params.type)  
                    formData.append('status', this.refs.status.value)  
                    formData.append('free', this.refs.free.value)  
                    
                    if(this.refs.free.value === "yes")
                    {
                        formData.append('under', this.refs.freeUnder.value)  
                    }
                    else
                    {
                        formData.append('under', this.refs.paidUnder.value)  
                    }

                    formData.append('available_from', this.state.available_from)  
                    formData.append('available_to', this.state.available_to)  
                    
                    formData.append('description', this.state.description)  

                    
                        var allQuestions = [];

                        $("#questionsDiv .row [id^=question]").each(function(){
                            let questionId = $(this).attr("id").replace("question", "")

                            let questionDetails = {};

                            questionDetails['question']=$(this).val();
                            questionDetails['correct_answer']=$("#q"+questionId+"c").val();
                            questionDetails['explanation']=$("#exp"+questionId).val();
                            questionDetails['options']=[];

                            questionDetails['options'].push($("#q"+questionId+"o1").val())
                            questionDetails['options'].push($("#q"+questionId+"o2").val())
                            questionDetails['options'].push($("#q"+questionId+"o3").val())
                            questionDetails['options'].push($("#q"+questionId+"o4").val())

                            allQuestions.push(questionDetails);
                        })

                        formData.append("questions", JSON.stringify(allQuestions));
                
                    $("#submitButton").html("Processing").prop("disabled", true)

                    axios({
                        method: 'post',
                        url: api_link+'ProgramsManagement.php',
                        data: formData,
                        config: { headers: {'Content-Type': 'multipart/form-data' }}
                    })
                    .then(function (response) {
                        $("#submitButton").html("Save Changes").prop("disabled", false)
                        if(response.data === "ok")
                        {	
                            $("#update_msg").html("<strong>Success! </strong> Your Request Successfully Processed")
                            $("#update_msg").removeClass("alert-danger").addClass("alert-success")
                        }
                        else
                        {
                            $("#update_msg").html("<strong>Error! </strong> Unable to Process Your Request")
                            $("#update_msg").removeClass("alert-success").addClass("alert-danger")
                        }
                        $("#update_msg").show()
                        window.scrollTo({top: 0, behavior: 'smooth'});
                         setTimeout(function(){ $("#update_msg").hide(); }, 4000);


                    })
                    .catch(function (response) {
                        $("#update_msg").html("<strong>Error! </strong> Unable to Process Your Request")
                        $("#update_msg").removeClass("alert-success").addClass("alert-danger")
                        $("#update_msg").show()
                        window.scrollTo({top: 0, behavior: 'smooth'});
                        setTimeout(function(){ $("#update_msg").hide(); }, 4000);
                    });
                }
                else
                {
                    let reader = new FileReader()
                    reader.readAsDataURL(this.state.file)
                    reader.onload=(e)=>{
                        let formData = new FormData();
                        formData.append('edit_product', this.state.token)
                        formData.append('name', this.state.name)
                        formData.append('totalPoints', this.state.totalPoints)
                        formData.append('type', this.props.match.params.type)  
                        formData.append('status', this.refs.status.value)  
                        formData.append('free', this.refs.free.value)  
                        
                        if(this.refs.free.value === "yes")
                        {
                            formData.append('under', this.refs.freeUnder.value)  
                        }
                        else
                        {
                            formData.append('under', this.refs.paidUnder.value)  
                        }

                        formData.append('file', this.state.file)
                        formData.append('file1', this.state.file1)
                        formData.append('file2', this.state.file2)
                        formData.append('available_from', this.state.available_from)  
                        formData.append('available_to', this.state.available_to)  
                        
                        formData.append('description', this.state.description)  
                        
                        $("#submitButton").html("Processing").prop("disabled", true)

                        axios({
                            method: 'post',
                            url: api_link+'ProgramsManagement.php',
                            data: formData,
                            config: { headers: {'Content-Type': 'multipart/form-data' }}
                        })
                        .then(function (response) {
                            $("#submitButton").html("Save Changes").prop("disabled", false)
                            if(response.data === "ok")
                            {	
                                $("#update_msg").html("<strong>Success! </strong> Your Request Successfully Processed")
                                $("#update_msg").removeClass("alert-danger").addClass("alert-success")
                            }
                            else
                            {
                                $("#update_msg").html("<strong>Error! </strong> Unable to Process Your Request")
                                $("#update_msg").removeClass("alert-success").addClass("alert-danger")
                            }
                            $("#update_msg").show()
                            window.scrollTo({top: 0, behavior: 'smooth'});
                             setTimeout(function(){ $("#update_msg").hide(); }, 4000);


                        })
                        .catch(function (response) {
                            $("#update_msg").html("<strong>Error! </strong> Unable to Process Your Request")
                            $("#update_msg").removeClass("alert-success").addClass("alert-danger")
                            $("#update_msg").show()
                            window.scrollTo({top: 0, behavior: 'smooth'});
                            setTimeout(function(){ $("#update_msg").hide(); }, 4000);
                        });
                    }
                }
            }
        }
	}

    handleTypeChange(event, tagId)
    {
        if(tagId === "quizType")
        {
            if($("#quizType").val() === "prelims")
            {
                $("#questionsDiv .row").show();

                $("#addQuestion, #removeQuestion").show()

                $("#questionsDiv select, #questionsDiv input").attr("required", true);

                document.getElementById("mainsFile").value = "";

                $("#mainsFile").attr("required", false).hide();
            }
            else if($("#quizType").val() === "dailyquiz")
            {
                $("#questionsDiv .row").show();

                $("#addQuestion, #removeQuestion").show()

                $("#questionsDiv select, #questionsDiv input").attr("required", true);

                document.getElementById("mainsFile").value = "";

                $("#mainsFile").attr("required", false).hide();
            }
            else
            {
                $("#questionsDiv .row").hide();

                $("#addQuestion, #removeQuestion").hide()

                $("#questionsDiv select, #questionsDiv input").attr("required", false);

                if(this.state.current_type === "prelims")
                {
                    $("#mainsFile").attr("required", true).show();
                }
            }
        }
        else
        {
            if($("#isFree").val() === "yes")
            {
                $("#freeUnder").show().attr("required", true)
                $("#paidUnder").hide().attr("required", false)
            }
            else
            {
                $("#freeUnder").hide().attr("required", false)
                $("#paidUnder").show().attr("required", true)
            }
        }
    }

    render()
    {
        var currentQuestions=(this.state.questions.length?this.state.questions.length:1);

        $(function(){
            $('.mobile').keypress(function (e) {
                var regex = new RegExp("^[0-9\b]+$");
                var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
                if (regex.test(str)) {
                    return true;
                }
                else
                {
                    e.preventDefault();
                    return false;
                }
            });
        })

        function addQuestion()
        {
            currentQuestions=$("#questionsDiv .row").length;
            currentQuestions++;

            let div=`<div class="row questionCard${currentQuestions}">
                        <div class="col-xs-8">
                            <input type="text" id="question${currentQuestions}" required class="form-control" placeholder="Question ${currentQuestions}" />
                        </div>
                        <div class="col-xs-4">
                            <select id="q${currentQuestions}c" class="form-control" required>
                                <option selected disabled>Correct Answer</option>
                                <option value="1">Option1</option>
                                <option value="2">Option2</option>
                                <option value="3">Option3</option>
                                <option value="4">Option4</option>
                            </select>
                        </div>
                        <div class="col-xs-6">
                            <br/>
                            <input type="text" id="q${currentQuestions}o1" required class="form-control" placeholder="Option 1" />
                        </div>
                        <div class="col-xs-6">
                            <br/>
                            <input type="text" id="q${currentQuestions}o2" required class="form-control" placeholder="Option 2" />
                        </div>
                        <div class="col-xs-6">
                            <br/>
                            <input type="text" id="q${currentQuestions}o3" required class="form-control" placeholder="Option 3" />
                        </div>
                        <div class="col-xs-6">
                            <br/>
                            <input type="text" id="q${currentQuestions}o4" required class="form-control" placeholder="Option 4" />
                        </div>
                        <div class="col-md-12">
                            <br />
                            <textarea type="text" id="exp${currentQuestions}"  class="form-control" placeholder="Explanation"></textarea>
                        </div>
                        <div class="col-md-12"><hr/></div>
                    </div>`;

            $("#questionsDiv").append(div);

            $("#removeQuestion").show();
        }

        function removeQuestion()
        {
            currentQuestions=$("#questionsDiv .row").length;

            if(currentQuestions > 1)
            {
                $(".questionCard"+currentQuestions).remove();

                currentQuestions--;

                if(currentQuestions === 1)
                {
                    $("#removeQuestion").hide();
                }
            }
        }

        
        return(
            <React.Fragment>
                <div className="content-wrapper">
                    <section className="content-header">
                        <h1>Edit Quiz</h1>
                        <ol className="breadcrumb">
                              <li>
                                  <div className="pull-right"> 
                                      <Link to="/admin/quiz" className="btn btn-success">
                                            <i className="fa fas fa-arrow-left"></i> Go Back
                                      </Link>
                                  </div>
                              </li>
                        </ol>
                    </section>
                    <section>
                        <div id="update_msg" className="alert" style={{display: 'none'}}></div> 
                    </section>
                    <section className="content" style={{overflow: 'auto'}} key={this.childKey}>
                          <div className="box">
                              <div className="box-body">
                                  <br/>
                                  <form id="addProduct" onSubmit={this.handleEditFormSubmit.bind(this)}>
                                      <div className="modal-body">
                                          <div className="row">
                                              <div className="col-md-6">
                                                  <label>Title</label>
                                                    <input type="text" className="form-control" defaultValue={this.state.name} required onChange={e => this.setState({ name: e.target.value })} />
                                              </div>

                                              <div className="col-md-6">
                                                  <label>Total Points</label>
                                                    <input type="text" className="form-control mobile" defaultValue={this.state.totalPoints} required onChange={e => this.setState({ totalPoints: e.target.value })} />
                                              </div>

                                              {/* <div className="col-md-6">
                                                    <br/>
                                                    <label>Type</label>
                                                    <select id="quizType" className="form-control col-md-6" required ref="type" onChange={(e) => {this.handleTypeChange(e, "quizType")}}>
                                                        <option value="prelims">Prelims</option>
                                                        <option value="mains">Mains</option>
                                                        <option value="dailyquiz">Daily Quiz</option>
                                                    </select>
                                              </div> */}
                                              <div className="col-md-6">
                                                    <br/><label>Status</label>
                                                    <select id="status" className="form-control col-md-6" required ref="status">
                                                        <option value="active">Active</option>
                                                        <option value="inactive">Inactive</option>
                                                    </select>
                                              </div>
                                              <div className="col-md-6">
                                                    <br/><label>Is Free</label>
                                                    <select id="isFree" className="form-control col-md-6" required ref="free" onChange={(e) => this.handleTypeChange(e, "isFree")}>
                                                        <option value="yes">Yes</option>
                                                        <option value="no">No</option>
                                                    </select>
                                              </div>
                                              <div className="col-md-6">
                                                    <br/><label>Comes Under</label>
                                                    <select id="freeUnder" className="form-control col-md-6" required ref="freeUnder">
                                                        <optgroup label="Prelims and Mains">
                                                            <option value="prelims">Prelims</option>
                                                            <option value="mains">Mains</option>
                                                        </optgroup>
                                                        {
                                                            this.state.pages.length
                                                            ?
                                                            <optgroup label="Other Menu Pages">
                                                                {
                                                                    this.state.pages.map((p, key) => (
                                                                        <option value={p.id}>{p.title}</option>
                                                                    ))
                                                                }
                                                            </optgroup>
                                                            :
                                                            ''
                                                        }
                                                    </select>

                                                    <select id="paidUnder" className="form-control col-md-6" ref="paidUnder" style={{display: 'none'}}>
                                                        {
                                                            this.state.courses.length
                                                            ?
                                                            this.state.courses.map((p, key) => (
                                                                <option value={p.id}>{p.name+' ('+p.type+')' }</option>
                                                            ))
                                                            :
                                                            <option selected disabled>No Programmes/Courses Added</option>
                                                        }
                                                    </select>
                                              </div>
                                              <div className="col-md-6">
                                                    <br/>
                                                    <label>Available From</label>
                                                    <input type="date" className="form-control" defaultValue={this.state.available_from} onChange={e => this.setState({ available_from: e.target.value })} required />
                                              </div>
                                              <div className="col-md-6">
                                                    <br/>
                                                    <label>Available To</label>
                                                    <input type="date" className="form-control" defaultValue={this.state.available_to} onChange={e => this.setState({ available_to: e.target.value })} required />
                                              </div>

                                              <div className="col-md-12">
                                                    <br/>
                                                    <label>Detailed Description</label>
                                                    &nbsp;<span id="d_description" style={{color: 'red', display: 'none'}}>This field is required*</span>
                                                    <CKEditor content={this.state.description} required activeClass="p10" events={{ "change": e => this.setState({ description: e.editor.getData() })}}/>
                                              </div>

                                              <div id="questionsDiv" className="col-md-12">
                                                    <br/>
                                                   {this.props.match.params.type=="mains"?(null):(
                                                    <div>
                                                       Questions
                                                       <button type="button" className="btn btn-sm btn-primary" id="addQuestion" onClick={() => {addQuestion()}} style={{marginLeft: '7px'}}>
                                                           <i className="fa fa-plus"></i>
                                                       </button>
                                                       <button type="button" className="btn btn-sm btn-danger" id="removeQuestion" onClick={() => {removeQuestion()}} style={{marginLeft: '7px'}}>
                                                           <i className="fa fa-trash"></i>
                                                       </button>
                                                   </div>
                                                   )} 
                                                    
                                                    <br/>
                                                    {
                                                        this.state.questions.length === 0
                                                        ?
                                                        <div className="row questionCard1">
                                                            <div className="col-xs-8">
                                                                <input type="text" id="question1" required className="form-control" placeholder="Question 1" />
                                                            </div>
                                                            <div className="col-xs-4">
                                                                <select id="q1c" className="form-control" required>
                                                                    <option selected disabled>Correct Answer</option>
                                                                    <option value="1">Option1</option>
                                                                    <option value="2">Option2</option>
                                                                    <option value="3">Option3</option>
                                                                    <option value="4">Option4</option>
                                                                </select>
                                                            </div>
                                                            <div className="col-xs-6">
                                                                <br/>
                                                                <input type="text" id="q1o1" required className="form-control" placeholder="Option 1" />
                                                            </div>
                                                            <div className="col-xs-6">
                                                                <br/>
                                                                <input type="text" id="q1o2" required className="form-control" placeholder="Option 2" />
                                                            </div>
                                                            <div className="col-xs-6">
                                                                <br/>
                                                                <input type="text" id="q1o3" required className="form-control" placeholder="Option 3" />
                                                            </div>
                                                            <div className="col-xs-6">
                                                                <br/>
                                                                <input type="text" id="q1o4" required className="form-control" placeholder="Option 4" />
                                                            </div>
                                                            <div className="col-md-12">
                                                                <br/>
                                                                <textarea id="exp1" className="form-control"  placeholder="Explanation"></textarea>
                                                            </div>
                                                            <div className="col-md-12"><hr/></div>
                                                        </div>
                                                        :
                                                        Object.entries(this.state.questions).map(([index, q], key) => (
                                                            <div className={"row questionCard"+parseInt(key+1)}>
                                                                <div className="col-xs-8">
                                                                    <input type="text" id={"question"+parseInt(key+1)} defaultValue={q.question} required className="form-control" placeholder={"Question "+parseInt(key+1)} />
                                                                </div>
                                                                <div className="col-xs-4">
                                                                    <select id={"q"+parseInt(key+1)+"c"} className="form-control" defaultValue={q.correct_answer} required>
                                                                        <option selected disabled>Correct Answer</option>
                                                                        <option value="1">Option1</option>
                                                                        <option value="2">Option2</option>
                                                                        <option value="3">Option3</option>
                                                                        <option value="4">Option4</option>
                                                                    </select>
                                                                </div>
                                                                <div className="col-xs-6">
                                                                    <br/>
                                                                    <input type="text" id={"q"+parseInt(key+1)+"o1"} defaultValue={q.options[0]} required className="form-control" placeholder="Option 1" />
                                                                </div>
                                                                <div className="col-xs-6">
                                                                    <br/>
                                                                    <input type="text" id={"q"+parseInt(key+1)+"o2"} defaultValue={q.options[1]} required className="form-control" placeholder="Option 2" />
                                                                </div>
                                                                <div className="col-xs-6">
                                                                    <br/>
                                                                    <input type="text" id={"q"+parseInt(key+1)+"o3"} defaultValue={q.options[2]} required className="form-control" placeholder="Option 3" />
                                                                </div>
                                                                <div className="col-xs-6">
                                                                    <br/>
                                                                    <input type="text" id={"q"+parseInt(key+1)+"o4"} defaultValue={q.options[3]} required className="form-control" placeholder="Option 4" />
                                                                </div>
                                                                <div className="col-md-12">
                                                                    <br/>
                                                                    <textarea id={"exp"+parseInt(key+1)} className="form-control" defaultValue={q.explanation} placeholder="Explanation"></textarea>
                                                                </div>
                                                                <div className="col-md-12"><hr/></div>
                                                            </div>
                                                        ))
                                                    }
                                                   {this.props.match.params.type=="mains"?(
                                                   <><p><b>Question Paper</b></p>
                                                    {
                                                        this.state.media_file
                                                        ?(<>
                                                        <div>
                                                        <a href={serverBase_link+"/images/"+this.state.media_file} target="_blank" rel="noreferrer">Download/View Question Paper:-</a><br/>Update file:-
                                                        <input id="mainsFile" type="file" accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx" onChange={(e) => {this.setState({file: e.target.files[0]});} }  />
                                                        
                                                         </div>
                                                         <input id="mainsFile" type="file" accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx" onChange={(e) => {this.setState({file: e.target.files[0]},()=>this.changeFile('file'))} } style={{display: 'none'}} />
                                                         </>)

                                                        :
                                                        (<input id="mainsFile" type="file" accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx" onChange={(e) => {this.setState({file: e.target.files[0]},()=>this.changeFile('file'))} } style={{display: 'none'}} />)
                                                    }
                                                    <p><b>Answer Model</b></p>

                                                     {
                                                        this.state.media_file1
                                                        ?(<>
                                                        <div>
                                                        <a href={serverBase_link+"/images/"+this.state.media_file1} target="_blank" rel="noreferrer">Download/View Answer Model:-</a><br/>
                                                        Update file:-
                                                        <input id="mainsFile" type="file" accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx" onChange={(e) => {this.setState({file1: e.target.files[0]},()=> this.changeFile('file1'))} }  />

                                                         </div></>)

                                                        :(
                                                            <input id="mainsFile" type="file" accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx" onChange={(e) => {this.setState({file1: e.target.files[0]},()=> this.changeFile('file1'))} }  />)
                                                    }
                                                     <p><b>Anser Sheet</b></p>
                                                     {
                                                        this.state.media_file2
                                                        ?(<>
                                                        <div>
                                                        <a  href={serverBase_link+"/images/"+this.state.media_file2} target="_blank" rel="noreferrer"><Link to={location => ({ ...location, pathname: "/courses" })}></Link>Download/View Answer Sheet:-</a><br/>
                                                        Update file:-
                                                        <input id="mainsFile" type="file" accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx" onChange={(e) => {this.setState({file2: e.target.files[0]},()=>this.changeFile('file2'))} }  />

                                                         </div></>)

                                                        :
                                                        (<input id="mainsFile" type="file" accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx" onChange={(e) => {this.setState({file2: e.target.files[0]},()=>this.changeFile('file2'))} }  />)

                                                    }
                                                    </>):(null)} 
                                                    

                                              </div>


                                              <div className="col-md-12">
                                                  <br/>
                                                  <button type="submit" id="submitButton" name="add" className="btn pull-right btn-primary">Save Changes</button>
                                              </div>
                                          </div>
                                          <br/>
                                      </div>                 
                                  </form>
                              </div>
                          </div>
                      </section>
                  </div>
            </React.Fragment>
        );
    }
}

export {
    Quiz,
    AddQuiz,
    EditQuiz,
};