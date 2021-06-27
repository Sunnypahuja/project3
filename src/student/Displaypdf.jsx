import React from 'react';
import { Document, Page } from 'react-pdf';   
import { api_link,serverBase_link } from './StudentLogin';
import { pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

class Displaypdf extends React.Component
{
    state={
        numPages:0,
        pageNumber: 1
    }
    setPageNumber=(pageNumber)=>
    {
        this.setState({pageNumber})
    }

    setNumPages=(numPages)=>{
        this.setState({numPages});
    }

    onDocumentLoadSuccess=({numPages})=>
    {
        this.setNumPages(numPages);
    }

    render()
    {
        console.log("hello")
        console.log(this.props.url)
        return(
            <div>
                <Document
                    file={this.props.url}
                    onLoadSuccess={this.onDocumentLoadSuccess}
                >
                    <Page pageNumber={this.state.pageNumber} />
                </Document>
                <p>Page {this.state.pageNumber} of {this.state.numPages}</p>
                
                {this.state.pageNumber>1?(
                     <button class="btn btn-primary" onClick={()=>this.setPageNumber(this.state.pageNumber-1)}>Previous</button>
                ):(null)}
                {this.state.pageNumber<this.state.numPages?(
                     <button class="btn btn-primary" onClick={()=>this.setPageNumber(this.state.pageNumber+1)}>Next</button>
                ):(null)}
               
                
            </div>
    )}
}

export default Displaypdf;