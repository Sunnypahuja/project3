import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import axios from 'axios';
import $ from 'jquery';
import Moment from 'moment';
import { api_link,serverBase_link } from './StudentLogin';
class ClassListModal extends React.Component 
{
    state={
        file: '',
        class: [],
    }
    
    componentDidMount()
    {
        let formData = new FormData();
        formData.append('fetch_classList', "1")
        formData.append('course_id', this.props.c_id)
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

    renderTime=(daate,tiime,timeleft,id,url)=>
    {
    
        if(timeleft<=18000)
        {
           
            // var time = this.format(timeleft)
            var interval =setInterval(()=>{
            var time = this.format(timeleft)
                $('#classtime'+id).html(time);
                if(timeleft<=0)
                {
                    $('#classtime'+id).html("Class Started");
                    clearInterval(interval);
                    $("#joinbutton").html(`<a  href=${url} class="btn btn-success">Join</a>`)
                }
                timeleft--;

            },1000)
        }
        else
        {
            return Moment(daate).format("MMM DD"+", "+"YYYY")+' '+tiime;
        }
    }
    render()
    {
        console.log(this.props)
        return(
        // <Modal show={true} style={{opacity:1}} onHide={this.props.closeModal}>
        //     <Modal.Header closeButton>
        //         <Modal.Title>Class Details</Modal.Title>
        //     </Modal.Header>
        //     <Modal.Body>
                
        //     </Modal.Body>
        //     <Modal.Footer>
        //         <Button variant="secondary" onClick={this.props.closeModal}>
        //             Close
        //         </Button>
        //     </Modal.Footer>

            <div className={'modal '+this.props.modalFade} id="add_modal" style={this.props.styles}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" onClick={this.props.openModal}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                            <h4 className="modal-title">Add Live Class</h4>
                        </div> 
                        <div className="modal-body">
                            <div className="box">
                                <div className="box-body table-responsive">
                                    <br/>
                                    <table id="example1" className="table">
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

                                                    {this.renderTime(m.date,m.time,m.timeleft,m.id,m.presenting_url)}
                                                    
                                                </td>
                                            
                                                <td style={{width: '30%'}} id="joinbutton">
                                                    
                                                </td>
                                            </tr>
                                            ))}
                                        </tbody>
                                    </table>                    
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-default pull-left" onClick={this.props.openModal}>Close</button>
                            <button type="submit" name="add" className="btn btn-primary">Add</button>
                        </div>
                    </div>
                </div>
            </div>
        // </Modal>

        )
    } 
}

export default ClassListModal;