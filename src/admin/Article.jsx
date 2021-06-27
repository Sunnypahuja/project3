import React from "react";
import axios from "axios";
import $ from "jquery";
import { api_link } from "./AdminLogin";

class Article extends React.Component {
  constructor() {
    super();
    this.state = {
      sort_order: "",
      file: "",
      title: "",
      tid: "",
      status: "1",
      refresh: false,
      modalVisible: false,
      doingModal: false,
      media: [],
      choice: "",
      type: "",
      products: [],
      filterProducts: [],
      teachersdata: [],
    };

    this.childKey = 0;
    this.openModal = this.openModal.bind(this);
  }

  onChange(e) {
    this.setState({
      file: e.target.files[0],
    });
  }

  openModal() {
    this.setState({
      doingModal: true,
      modalVisible: !this.state.modalVisible,
    });
  }

  componentDidMount() {
    document.title = "Study Material";

    this.fetch_articles();
    this.fetch_teachers();
  }
  
  fetch_teachers = ()=> {
    let formData4 = new FormData();
    formData4.append("fetch_teachers", 1);

    axios({
      method: "post",
      url: api_link + "TeachersData.php",
      data: formData4,
      config: { headers: { "Content-Type": "multipart/form-data" } },
    })
      .then((response) => response.data)
      .then((data) => {
        this.setState({ teachersdata: data.data });
      });

  }
  fetch_articles = () => {
    var obj = this;
    if (this.props.match.params.type == "all") {
      let formData = new FormData();
      formData.append("fetchallarticles", "1");

      axios({
        method: "post",
        url: api_link + "fetch_teachers.php",
        data: formData,
        config: { headers: { "Content-Type": "multipart/form-data" } },
      })
        .then((response) => response.data)
        .then((data) => {
          obj.setState({ media: data, type: this.props.match.params.type });
        });

     
    } 
    else if (this.props.match.params.type == "approved") {
      console.log(this.props.match.params.type)
      let formData = new FormData();
      formData.append("fetch_approved", "1");

      axios({
        method: "post",
        url: api_link + "fetch_teachers.php",
        data: formData,
        config: { headers: { "Content-Type": "multipart/form-data" } },
      })
        .then((response) => response.data)
        .then((data) => {
          console.log(data)
          if(data.msg=="ok")
          {
            obj.setState({ media: data.data, type: this.props.match.params.type });
          }
          else
          {
            obj.setState({ media: [], type: this.props.match.params.type });
          }
        });

    } 
    else if (this.props.match.params.type == "pending") {
      let formData = new FormData();
      formData.append("fetchpendingarticles", "1");

      axios({
        method: "post",
        url: api_link + "fetch_teachers.php",
        data: formData,
        config: { headers: { "Content-Type": "multipart/form-data" } },
      })
      .then(response => response.data)
      .then((data) => {
        if(data.msg=="ok")
        {
          obj.setState({ media: data.data, type: this.props.match.params.type });
        }
        else
        {
          obj.setState({ media: [], type: this.props.match.params.type });
        }
        });
      }
    else if (this.props.match.params.type == "rejected") {
        let formData = new FormData();
        formData.append("fetch_rejected", "1");
  
        axios({
          method: "post",
          url: api_link + "fetch_teachers.php",
          data: formData,
          config: { headers: { "Content-Type": "multipart/form-data" } },
        })
          .then((response) => response.data)
          .then((data) => {
            if(data.msg=="ok")
            {
              obj.setState({ media: data.data, type: this.props.match.params.type });
            }
            else
            {
              obj.setState({ media: [], type: this.props.match.params.type });
            }
          });
  
      } 
      
  };

  shouldComponentUpdate(nextProps, nextState) {
    if (JSON.stringify(this.state.media) === JSON.stringify(nextState.media)) {
      return true;
    } else {
      if (this.state.refresh) {
        $("script[src='js/dataTable.js']").remove();

        const script = document.createElement("script");
        script.src = "js/dataTable.js";
        script.async = true;
        document.body.appendChild(script);
        ++this.childKey;
      } else {
        this.setState({
          refresh: true,
        });
      }
      return true;
    }
  }

  handleAddFormSubmit(event) {
    event.preventDefault();
    $("#invalid_message").hide();
    let reader = new FileReader();

    let formData = new FormData();

    formData.append("title", this.state.title);
    formData.append("tid", this.state.tid);

    formData.append("status", this.state.status);

    formData.append("adddata", "true");
    var obj = this;

    axios({
      method: "post",
      url: api_link + "fetch_teachers.php",
      data: formData,
      config: { headers: { "Content-Type": "multipart/form-data" } },
    })
      .then(function (response) {
        obj.openModal();
        if (response.data === "ok") {
          document.getElementById("addStudy").reset();
          let formData1 = new FormData();
          formData1.append("fetchallarticles", "1");

          axios({
            method: "post",
            url: api_link + "fetch_teachers.php",
            data: formData1,
            config: { headers: { "Content-Type": "multipart/form-data" } },
          })
            .then((response) => response.data)
            .then((data) => {
              obj.setState({ media: data });
            });

          $("#update_message").html(
            "<strong>Success! </strong> Your Request Successfully Processed"
          );
          $("#update_message")
            .removeClass("alert-danger")
            .addClass("alert-success");
        } else {
          $("#update_message").html(
            "<strong>Error! </strong> Unable to Process Your Request"
          );
          $("#update_message")
            .removeClass("alert-success")
            .addClass("alert-danger");
        }
        $("#update_message").show();
        setTimeout(function () {
          $("#update_message").hide();
        }, 4000);
      })
      .catch(function (response) {
        //handle error
        $(".loader_gif").fadeOut("slow");
      });
  }

  deleteCategory = (qid) => {
    if (window.confirm("Are You Sure To Delete This Article?")) {
      let formData = new FormData();
      formData.append("delete_article", qid);
      var obj = this;

      axios({
        method: "post",
        url: api_link + "fetch_teachers.php",
        data: formData,
        config: { headers: { "Content-Type": "multipart/form-data" } },
      })
      .then((response) => response.data) 
      .then((data)=>{
          if (data.msg === "ok") {
            let formData1 = new FormData();
            formData1.append("fetchallarticles", "1");

            axios({
              method: "post",
              url: api_link + "fetch_teachers.php",
              data: formData1,
              config: { headers: { "Content-Type": "multipart/form-data" } },
            })
              .then((response) => response.data)
              .then((data) => {
                obj.setState({ media: data });
              });

            $("#update_message").html(
              "<strong>Success! </strong> Your Request Successfully Processed"
            );
            $("#update_message")
              .removeClass("alert-danger")
              .addClass("alert-success");
          } else {
            $("#update_message").html(
              "<strong>Error! </strong> Unable to Process Your Request"
            );
            $("#update_message")
              .removeClass("alert-success")
              .addClass("alert-danger");
          }
          $("#update_message").show();
          setTimeout(function () {
            $("#update_message").hide();
          }, 4000);
        })
        .catch(function (response) {
          //handle error
          console.log(response);
        });
    }
  };

  approve = (qid) => {
    if (window.confirm("Are You Sure To Approve This Article?")) {
      let formData = new FormData();
      formData.append("approve_article", qid);
      var obj = this;

      axios({
        method: "post",
        url: api_link + "fetch_teachers.php",
        data: formData,
        config: { headers: { "Content-Type": "multipart/form-data" } },
      }).then((response) => response.data) 
      .then((data)=>{
        if (data) {
            let formData1 = new FormData();
            formData1.append("fetchpendingarticles", "1");

            axios({
              method: "post",
              url: api_link + "fetch_teachers.php",
              data: formData1,
              config: { headers: { "Content-Type": "multipart/form-data" } },
            })
              .then((response) => response.data)
              .then((data) => {
                if(data.msg=="ok") 
                {
                  obj.setState({ media: data.data, type: this.props.match.params.type });
                }
                else
                {
                  obj.setState({ media: [], type: this.props.match.params.type });
                }
              });

            $("#update_message").html(
              "<strong>Success! </strong> Your Request Successfully Processed"
            );
            $("#update_message")
              .removeClass("alert-danger")
              .addClass("alert-success");
          } else {
            $("#update_message").html(
              "<strong>Error! </strong> Unable to Process Your Request"
            );
            $("#update_message")
              .removeClass("alert-success")
              .addClass("alert-danger");
          }
          $("#update_message").show();
          setTimeout(function () {
            $("#update_message").hide();
          }, 4000);
        })
        .catch(function (response) {
          //handle error
          console.log(response);
        });
    }
  };

  reject = (qid) => {
    if (window.confirm("Are You Sure To Reject This Article?")) {
      let formData = new FormData();
      formData.append("reject_article", qid);
      var obj = this;

      axios({
        method: "post",
        url: api_link + "fetch_teachers.php",
        data: formData,
        config: { headers: { "Content-Type": "multipart/form-data" } },
      })
        .then((response) => response.data) 
        .then((data)=>{
          if (data) {
            let formData1 = new FormData();
            formData1.append("fetchpendingarticles", "1");

            axios({
              method: "post",
              url: api_link + "fetch_teachers.php",
              data: formData1,
              config: { headers: { "Content-Type": "multipart/form-data" } },
            })
              .then((response) => response.data)
              .then((data) => {
                if(data.msg=="ok") 
                {
                  obj.setState({ media: data.data, type: this.props.match.params.type });
                }
                else
                {
                  obj.setState({ media: [], type: this.props.match.params.type });
                }
              });

            $("#update_message").html(
              "<strong>Success! </strong> Your Request Successfully Processed"
            );
            $("#update_message")
              .removeClass("alert-danger")
              .addClass("alert-success");
          } else {
            $("#update_message").html(
              "<strong>Error! </strong> Unable to Process Your Request"
            );
            $("#update_message")
              .removeClass("alert-success")
              .addClass("alert-danger");
          }
          $("#update_message").show();
          setTimeout(function () {
            $("#update_message").hide();
          }, 4000);
        })
        .catch(function (response) {
          //handle error
          console.log(response);
        });
    }
  };



 

  render() {
    let styles = this.state.modalVisible
      ? { display: "block" }
      : { display: "none" };
    let modalFade = this.state.modalVisible
      ? { fade: "fade" }
      : { fade: "show" };
    if (this.state.type != this.props.match.params.type) {
      this.fetch_articles();
    }
    return (
      <React.Fragment>
        <div className="content-wrapper">
          <section>
            <div
              id="update_message"
              className="alert"
              style={{ display: "none" }}
            ></div>
          </section>
          <section className="content-header">
            <h1>Study Materials</h1>
            <ol className="breadcrumb">
              <li>
                <div className="pull-right">
                  <button
                    title=""
                    className="btn btn-primary"
                    onClick={this.openModal}
                  >
                    <i className="fa fa-plus"></i>
                  </button>
                </div>
              </li>
            </ol>
          </section>

          <section className="content" key={this.childKey}>
            <div className="box">
              <div className="box-body table-responsive">
                <br />
                <table id="example1" className="table">
                  <thead>
                    <tr>
                      <th style={{width: '33%'}}>Topic</th>

                      <th style={{width: '33%'}}>Teacher</th>

                      <th style={{width: '33%'}}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.media.length>0?(
                      this.state.media.map((m, key) => (
                      <tr key={m.id}>
                        <td id={"title" + m.id} style={{width: '33%'}}>{m.topic}</td>

                        <td id={"sort_order" + m.id} style={{width: '33%'}}>{m.name}</td>

                        <td style={{width: '33%'}}>
                        {this.props.match.params.type =="pending"||this.props.match.params.type =="approved"?(
                           
                           <a href={"/admin/showarticle/"+m.id} className="btn btn-success pull-left" style={{marginRight: 10}} onClick={()=>this.showArticle(m.id)}>View</a>
                           ):(null)}
                             
                        {this.props.match.params.type =="pending"?(
                      <>
                        <button type="submit" className="btn btn-success pull-left" style={{marginRight: 10}} onClick={()=>this.approve(m.id)}>Approve</button>
                        <button type="submit" className="btn btn-danger pull-left" onClick={()=>this.reject(m.id)}>Reject</button>
                      </>
                                   ):(null)} 
                        
                           <button
                            type="submit"
                            name="del"
                            className="btn btn-danger"
                            value={m.id}
                            onClick={()=>this.deleteCategory(m.id)}
                            style={{ marginLeft: "5px" }}
                          >
                            <i className="fa fa-trash"></i>
                          </button>
                        </td>
                      </tr>
                      ))):(<p>No Data Available</p>)}
                  </tbody>
                  <tfoot></tfoot>
                </table>
              </div>
            </div>
          </section>
        </div>

        <div className={"modal " + modalFade} id="add_modal" style={styles}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button
                  type="button"
                  className="close"
                  onClick={this.openModal}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
                <h4 className="modal-title">Add Study Material</h4>
              </div>
              <form
                id="addStudy"
                onSubmit={this.handleAddFormSubmit.bind(this)}
              >
                <div className="modal-body">
                  <div className="row">
                    <div className="col-md-6">
                      <label>Topic</label>
                      <input
                        type="text"
                        className="form-control"
                        required
                        onChange={(e) =>
                          this.setState({ title: e.target.value })
                        }
                      />
                    </div>
                    <div className="col-md-6">
                      <label>Teacher name</label>
                      <select
                        class="form-control"
                        required
                        onChange={(e) => this.setState({ tid: e.target.value })}
                      >
                        <option value="">Select</option>
                        {this.state.teachersdata.map((m, key) => (
                          <option value={m.id}>{m.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <br />
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-default pull-left"
                    onClick={this.openModal}
                  >
                    Close
                  </button>
                  <button type="submit" name="add" className="btn btn-primary">
                    Add Data
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Article;
