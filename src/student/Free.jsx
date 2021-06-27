
import React from 'react';
import axios from 'axios';
import $ from 'jquery';
import { api_link,serverBase_link } from './StudentLogin';
import Displaypdf from './Displaypdf'

class Free extends React.Component {
    state = { 
        pdfShow: false,
        url: ''
     }

    fetch_StudyMaterial =()=>
    {
        document.title="Study Material Free" 
        
        let formData = new FormData();
        formData.append('study_material_student_coursefree', "1")
        formData.append('user_id', window.atob(window.sessionStorage.getItem(window.btoa("user_id"))))

        var obj=this
        
        axios({
            method: 'post',
            url: api_link+'CategoriesFetch.php',
            data: formData,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
        .then(response => response.data)
        .then((data) => {
            obj.setState({ media: data})
            $("script[src='js/dataTable.js']").remove(); 
            const script = document.createElement("script");
            script.src = "js/dataTable.js";
            script.async = true;
            document.body.appendChild(script);
         })
    }
    redirect=(url)=>{
        this.setState({pdfShow:true, url: url})
    }

    componentDidMount() {
        this.fetch_StudyMaterial()
    }
    render() { 
        return (
            <React.Fragment>
                 <div className="content-wrapper">
                <section className="content-header">
                    <h1>Study Material</h1> 
                </section>
                <section className="content">
                    <div className="box">
                        <div className="box-body table-responsive" style={{overflowX: 'hidden'}}>
                   {this.state.pdfShow?(
                <Displaypdf url={this.state.url} />
            ):(
           
                            <div className="row" >
                                {this.state.media&&this.state.media.map((media,key) =>(
                                    <div className="col-12 col-md-4 col-sm-4 col-lg-4" key={key} style={{marginTop:10}}>
                                         <div className="card justify-content-center">
                                             <div className="card-body ">
                                                 <center style={{fontSize:20}}><i className="fa fa-book"></i></center>
                                                 <h4 style={{fontSize:'100%',fontWeight:'bold'}}>{media.title}</h4> 
                                             </div>
                                             <div className="card-footer" style={{width: '100%', padding:0}}>

                                                 {media.paid==1?
                                                 (
                                                    <div style={{display: 'flex', flexDirection: 'row'}}> 
                                                        <a className="btn btn-success" style={{flex: 0.5,padding:6,color:'white',fontSize:17, marginRight: 2}}   >
                                                            Paid 
                                                            &nbsp;
                                                            <i className="fa fa-dollar"></i>
                                                        </a>
                                                        <a className="btn btn-success" onClick={()=>this.redirect(serverBase_link+"images/"+media.file)} style={{flex: 0.5,padding:6,color:'white',fontSize:17, marginLeft: 2}}   >
                                                           View
                                                            &nbsp;
                                                            <i className="fa fa-dollar"></i>
                                                        </a>
                                                    </div>
                                                 ):
                                                 (
                                                   <div style={{display: 'flex', flexDirection: 'row'}}> 
                                                        <a className="btn btn-success" style={{padding:6,flex: 0.5,color:'white',fontSize:17, marginRight: 2}} href={serverBase_link+"images/"+media.file} target="_blank">
                                                            Free 
                                                            &nbsp;
                                                            <i className="fa fa-download"></i>
                                                        </a>
                                                        <a className="btn btn-success" onClick={()=>this.redirect(serverBase_link+"images/"+media.file)} style={{padding:6,flex: 0.5,color:'white',fontSize:17, marginLeft: 2}}   >
                                                            View
                                                            &nbsp;
                                                            <i className="fa fa-dollar"></i>
                                                        </a>
                                                    </div>
                                                 )}
                                                
                                             </div>
                                         </div>
                                     </div>
     
                                ))}
                            </div>
                         
         )}
           
           </div>
                    </div> 
                </section>
            </div>
            </React.Fragment>
        );
    }
}

export default Free;