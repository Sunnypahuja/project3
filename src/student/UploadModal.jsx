import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import axios from 'axios';
import { api_link,serverBase_link } from './StudentLogin';
class UploadModal extends React.Component 
{
    state={
        file: '',
    }
    uploadFile=()=>
    {
        
        let formData = new FormData();
        formData.append('uploadFile', "1")
        formData.append('quiz_type', "mains")
        formData.append('quiz_id', this.props.q_id)
        formData.append('user_id',window.atob(window.sessionStorage.getItem(window.btoa("user_id"))))
        formData.append('file[]',this.state.file)
        var obj=this
        axios({
            method: 'post',
            url: api_link+'uploadMainsFile.php',
            data: formData,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
        .then(response => response.data)
        
        .then((data) => { 
            console.log(data)
            if(data.msg=="ok")
            {
                this.props.closeModal() 
                this.props.showAlert('success')
                this.props.removeBox(this.props.q_id)
            }
            else
            {
                this.props.showAlert('failure')
            }
         })
    }
    onFileChange = event => 
    {
    
        this.setState({file: event.target.files[0] });
      
    };
    render()
    {
        return(
        <Modal show={true} style={{opacity:1}} onHide={this.props.closeModal}>
            <Modal.Header closeButton>
                <Modal.Title>Upload File</Modal.Title>
            </Modal.Header>
            <Modal.Body><input style={{borderWidth: 2, borderColor: 'black'}} type="file" onChange={this.onFileChange}/></Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={this.props.closeModal}>
                    Close
                </Button>
                <Button variant="primary" onClick={this.uploadFile}>
                    Add
                </Button>
            </Modal.Footer>
        </Modal>
        )
    } 
}

export default UploadModal;