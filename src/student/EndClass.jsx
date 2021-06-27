import React from 'react';
import axios from 'axios';
import UploadModal from './UploadModal';
import $ from 'jquery';
import { api_link,serverBase_link } from './StudentLogin';
import Moment from 'moment';

class EndClass extends React.Component 
{
    state={

    }
    
    componentDidMount()
    {
        let formData = new FormData();
        formData.append('class_id',this.props.match.params.class_id)
        formData.append('ClassEnd', this.props.match.params.ispresenter)
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
        })
    }

    render()
    {
        return(
            <div className="content-wrapper">
                <section className="content">
                    <div className="box">
                        <p>Class Ended</p>
                    </div>
                </section>
            </div>
        )
    }
}
export default EndClass; 