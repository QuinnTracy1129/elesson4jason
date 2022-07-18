import axios from "axios";
import React, { Component } from "react";
import { MDBIcon, MDBContainer, MDBRow, MDBCol } from "mdbreact";
import Button from "../../../../../../components/uielements/button";
import Modals from "../../../../../../components/modal";
import ModalStyle from "../../../../../../components/modal/modal.style";
import WithDirection from "../../../../../../config/withDirection";
import * as swal from "sweetalert2";
import Popover from "../../../../../../components/uielements/popover";
import { itala } from "../../../../../../talaan";
import "./index.css";
import Dropdown, {
  DropdownMenu,
  MenuItem,
} from "../../../../../../components/uielements/dropdown";
import { rtl } from "../../../../../../config/withDirection";

const isoModal = ModalStyle(Modals);
const Modal = WithDirection(isoModal);

class Interactive extends Component {
  constructor() {
    super();
    this.auth = JSON.parse(localStorage.getItem("auth"));
    this.classroom = JSON.parse(localStorage.getItem("classroom"));
    this.state = {
      modal: false,
      form: {
        title: `iModule - ${new Date().toDateString()}`,
        category: "iModule",
        filetype: "interactive",
        url: [],
        interactiveWord: {},
        code: undefined,
        status: "pending",
        batch_id: 3,
        user_id: this.auth.id,
        department_id: this.auth.department_id,
        subject_id: this.classroom ? this.classroom.id : undefined,
      },
    };
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };

  verify = () => {
    let { form } = this.state;
    form.url.length < 1
      ? swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Your module's foundation is empty!",
        })
      : this.handleLCC();
  };

  handleLCC = async () => {
    const { value: code } = await swal.fire({
      title: "Please provide the Learning Competency Code",
      input: "text",
      showCancelButton: true,
      inputValidator: value => {
        if (!value) {
          return "You need to write something!";
        }
      },
    });

    if (code) {
      let { form } = this.state;
      form.code = code;
      this.setState({ form });
      itala("tracking/documents", form).then(() => {
        this.toggle();
        this.props.onSubmit();
      });
    }
  };

  handleTitle = async () => {
    const { value: title } = await swal.fire({
      title: "Enter Title",
      input: "text",
      showCancelButton: true,
      inputValidator: value => {
        if (!value) {
          return "You need to write something!";
        }
      },
    });

    if (title) {
      let { form } = this.state;
      form.title = title;
      this.setState({ form });
    }
  };

  handleMessage = async () => {
    const { value: message } = await swal.fire({
      title: "Enter Message",
      input: "text",
      showCancelButton: true,
      inputValidator: value => {
        if (!value) {
          return "You need to write something!";
        }
      },
    });

    if (message) {
      let { form } = this.state;
      let params = { action: "message", value: message };
      form.url.push(params);
      this.setState({ form });
    }
  };

  handleMultipleChoice = async () => {
    const { value: sentence } = await swal.fire({
      title: "Enter sentence",
      input: "text",
      showCancelButton: true,
      inputValidator: value => {
        if (!value) {
          return "You need to write something!";
        }
      },
    });

    if (sentence) {
      let multiplechoice = [sentence, []];
      const { value: a } = await swal.fire({
        title: "Enter choice a",
        input: "text",
        showCancelButton: true,
        inputValidator: value => {
          if (!value) {
            return "You need to write something!";
          }
        },
      });

      if (a) {
        multiplechoice[1].push(a);

        const { value: b } = await swal.fire({
          title: "Enter choice b",
          input: "text",
          showCancelButton: true,
          inputValidator: value => {
            if (!value) {
              return "You need to write something!";
            }
          },
        });

        if (b) {
          multiplechoice[1].push(b);

          const { value: c } = await swal.fire({
            title: "Enter choice c",
            input: "text",
            showCancelButton: true,
            inputValidator: value => {
              if (!value) {
                return "You need to write something!";
              }
            },
          });

          if (c) {
            multiplechoice[1].push(c);

            const { value: d } = await swal.fire({
              title: "Enter choice d",
              input: "text",
              showCancelButton: true,
              inputValidator: value => {
                if (!value) {
                  return "You need to write something!";
                }
              },
            });

            if (d) {
              multiplechoice[1].push(d);

              let { form } = this.state;
              let params = { action: "multiplechoice", value: multiplechoice };
              form.url.push(params);
              this.setState({ form });
            }
          }
        }
      }
    }
  };

  handleTrueorFalse = async () => {
    const { value: sentence } = await swal.fire({
      title: "Enter sentence",
      input: "text",
      showCancelButton: true,
      inputValidator: value => {
        if (!value) {
          return "You need to write something!";
        }
      },
    });

    if (sentence) {
      let { form } = this.state;
      let params = { action: "trueorfalse", value: sentence };
      form.url.push(params);
      this.setState({ form });
    }
  };

  handleHeader = async () => {
    const { value: header } = await swal.fire({
      title: "Enter Header",
      input: "text",
      showCancelButton: true,
      inputValidator: value => {
        if (!value) {
          return "You need to write something!";
        }
      },
    });

    if (header) {
      let { form } = this.state;
      let params = { action: "header", value: header };
      form.url.push(params);
      this.setState({ form });
    }
  };

  handleParagraph = async () => {
    const { value: paragraph } = await swal.fire({
      title: "Enter Paragraph",
      input: "textarea",
      showCancelButton: true,
      inputValidator: value => {
        if (!value) {
          return "You need to write something!";
        }
      },
    });

    if (paragraph) {
      let { form } = this.state;
      let params = { action: "paragraph", value: paragraph };
      form.url.push(params);
      this.setState({ form });
    }
  };

  handleImage = async () => {
    const { value: image } = await swal.fire({
      title: "Add an Image",
      input: "file",
      showCancelButton: true,
      inputValidator: value => {
        if (!value) {
          return "You need to upload something!";
        }
      },
    });

    if (image) {
      if (image.type.match("image.*")) {
        const reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onload = async () => {
          let iForm = {
            file_base64: reader.result,
            name: image.name,
            url: `Users/${this.auth.email}/interactiveModule`,
          };

          await axios.post("api/auth/upload", iForm);

          let params = {
            action: "image",
            value: `Users/${this.auth.email}/interactiveModule/${image.name}`,
          };

          let { form } = this.state;
          form.url.push(params);
          this.setState({ form });
        };
      } else {
        alert("Please choose jpg and png files only");
      }
    }
  };

  handleInteractive = async () => {
    const { value: interactive } = await swal.fire({
      title: "What word should be interactive?",
      input: "text",
      showCancelButton: true,
      inputValidator: value => {
        if (!value) {
          return "You need to write something!";
        }
      },
    });

    if (interactive) {
      if (interactive.split(" ").length > 1) {
        swal.fire({
          icon: "error",
          text: "Please enter one(1) word!",
        });
      } else {
        swal
          .fire({
            title: "Please choose how we will show the meaning?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: `Image`,
            denyButtonText: `Paragraph`,
          })
          .then(async result => {
            if (result.isConfirmed) {
              const { value: file } = await swal.fire({
                title: "Select image",
                input: "file",
                inputAttributes: {
                  accept: "image/*",
                  "aria-label": "Upload your picture",
                },
              });

              if (file) {
                console.log(file);
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = async e => {
                  let iForm = {
                    file_base64: e.target.result,
                    name: file.name,
                    url: `Users/${this.auth.email}/interactiveModule/Meaning`,
                  };
                  await axios.post("api/auth/upload", iForm);
                  let { form } = this.state;
                  form.interactiveWord[
                    interactive.toLowerCase()
                  ] = `Users/${this.auth.email}/interactiveModule/Meaning/${file.name}`;
                  this.setState({ form });
                };
              }
            } else if (result.isDenied) {
              const { value: meaning } = await swal.fire({
                title: `Enter the meaning of '${interactive}'`,
                input: "textarea",
              });

              if (meaning) {
                let { form } = this.state;
                form.interactiveWord[interactive.toLowerCase()] = meaning;
                this.setState({ form });
              }
            }
          });
      }
    }
  };

  handleRemove = index => {
    let { form } = this.state;
    form.url.splice(index, 1);
    this.setState({ form });
  };

  handleEdit = async (data, index) => {
    switch (data.action) {
      case "header":
        const { value: header } = await swal.fire({
          title: "Edit Header",
          input: "text",
          inputValue: data.value,
          showCancelButton: true,
          inputValidator: value => {
            if (!value) {
              return "You need to write something!";
            }
          },
        });

        if (header) {
          let { form } = this.state;
          form.url[index].value = header;
          this.setState({ form });
        }
        break;

      case "image":
        const { value: image } = await swal.fire({
          title: "Edit Image",
          input: "file",
          imageUrl: `${axios.defaults.baseURL}storage/${data.value}`,
          imageWidth: "auto",
          imageHeight: 200,
          imageAlt: "Custom image",
          showCancelButton: true,
          inputValidator: value => {
            if (!value) {
              return "You need to upload something!";
            }
          },
        });

        if (image) {
          if (image.type.match("image.*")) {
            const reader = new FileReader();
            reader.readAsDataURL(image);
            reader.onload = async () => {
              let iForm = {
                file_base64: reader.result,
                name: image.name,
                url: `Users/${this.auth.email}/interactiveModule`,
              };

              await axios.post("api/auth/upload", iForm);

              let { form } = this.state;
              form.url[
                index
              ].value = `Users/${this.auth.email}/interactiveModule/${image.name}`;
              this.setState({ form });
            };
          } else {
            alert("Please choose jpg and png files only");
          }
        }
        break;

      case "paragraph":
        const { value: paragraph } = await swal.fire({
          title: "Edit Paragraph",
          input: "textarea",
          inputValue: data.value,
          showCancelButton: true,
          inputValidator: value => {
            if (!value) {
              return "You need to write something!";
            }
          },
        });

        if (paragraph) {
          let { form } = this.state;
          form.url[index].value = paragraph;
          this.setState({ form });
        }
        break;

      case "message":
        const { value: message } = await swal.fire({
          title: "Edit Message",
          input: "text",
          inputValue: data.value,
          showCancelButton: true,
          inputValidator: value => {
            if (!value) {
              return "You need to write something!";
            }
          },
        });

        if (message) {
          let { form } = this.state;
          form.url[index].value = message;
          this.setState({ form });
        }
        break;

      case "trueorfalse":
        const { value: sentence } = await swal.fire({
          title: "Edit Sentence",
          input: "text",
          inputValue: data.value,
          showCancelButton: true,
          inputValidator: value => {
            if (!value) {
              return "You need to write something!";
            }
          },
        });

        if (sentence) {
          let { form } = this.state;
          form.url[index].value = sentence;
          this.setState({ form });
        }
        break;

      case "multiplechoice":
        const { value: msentence } = await swal.fire({
          title: "Edit Sentence",
          input: "text",
          inputValue: data.value,
          showCancelButton: true,
          inputValidator: value => {
            if (!value) {
              return "You need to write something!";
            }
          },
        });

        if (msentence) {
          let multiplechoice = [msentence, []];
          const { value: a } = await swal.fire({
            title: "Edit choice a",
            input: "text",
            showCancelButton: true,
            inputValidator: value => {
              if (!value) {
                return "You need to write something!";
              }
            },
          });

          if (a) {
            multiplechoice[1].push(a);

            const { value: b } = await swal.fire({
              title: "Edit choice b",
              input: "text",
              showCancelButton: true,
              inputValidator: value => {
                if (!value) {
                  return "You need to write something!";
                }
              },
            });

            if (b) {
              multiplechoice[1].push(b);

              const { value: c } = await swal.fire({
                title: "Edit choice c",
                input: "text",
                showCancelButton: true,
                inputValidator: value => {
                  if (!value) {
                    return "You need to write something!";
                  }
                },
              });

              if (c) {
                multiplechoice[1].push(c);

                const { value: d } = await swal.fire({
                  title: "Edit choice d",
                  input: "text",
                  showCancelButton: true,
                  inputValidator: value => {
                    if (!value) {
                      return "You need to write something!";
                    }
                  },
                });

                if (d) {
                  multiplechoice[1].push(d);

                  let { form } = this.state;
                  form.url[index].value = multiplechoice;
                  this.setState({ form });
                }
              }
            }
          }
        }
        break;

      default:
        console.log("error");
        break;
    }
  };

  render() {
    const { form } = this.state;
    let module_writer = form.url.map((data, index) => {
      let col_body;
      let button = (
        <MDBCol key={`button-${index}`} size="1">
          <span id={`btn-${index}`} className="d-none">
            <Dropdown
              overlay={
                <DropdownMenu className="text-center">
                  <MenuItem onClick={() => this.handleEdit(data, index)}>
                    <MDBIcon far icon="edit" className="text-info" />
                  </MenuItem>
                  <MenuItem onClick={() => this.handleRemove(index)}>
                    <MDBIcon icon="trash" className="text-danger" />
                  </MenuItem>
                </DropdownMenu>
              }
            >
              <Button
                style={{
                  margin: rtl === "rtl" ? "0 8px 0 0" : "0 0 0 8px",
                }}
              >
                <MDBIcon icon="bars" />
              </Button>
            </Dropdown>
          </span>
        </MDBCol>
      );
      switch (data.action) {
        case "header":
          col_body = (
            <MDBCol
              key={`module-${index}`}
              size="11"
              className="mx-auto mb-2 h4 text-left text-uppercase"
            >
              {data.value}
            </MDBCol>
          );
          break;

        case "paragraph":
          let paragraph;
          const iWords = Object.keys(form.interactiveWord);
          if (iWords.length > 0) {
            paragraph = data.value.split(" ").map((word, index) => {
              if (iWords.includes(word.toLowerCase())) {
                let meaning = form.interactiveWord[word.toLowerCase()];
                if (meaning.slice(0, 6) === "Users/") {
                  meaning = (
                    <img
                      src={`${axios.defaults.baseURL}storage/${meaning}`}
                      height="500px"
                      width="auto"
                      alt="meaning of word"
                    />
                  );
                }
                return (
                  <Popover key={`pop-${index}`} content={meaning}>
                    <strong style={{ cursor: "pointer" }}>{word}&nbsp;</strong>
                  </Popover>
                );
              }
              return `${word} `;
            });
          } else {
            paragraph = data.value;
          }

          col_body = (
            <MDBCol
              key={`module-${index}`}
              size="11"
              style={{ textIndent: 50 }}
              className="mx-auto mb-2 h5 text-justify lead"
            >
              {paragraph}
            </MDBCol>
          );
          break;

        case "image":
          col_body = (
            <MDBCol
              key={`module-${index}`}
              size="11"
              className="mx-auto mb-2 mx-auto text-center"
            >
              <img
                src={`${axios.defaults.baseURL}storage/${data.value}`}
                width="auto"
                height="200"
                onMouseOver={e => {
                  e.target.height = "500";
                }}
                onMouseOut={e => {
                  e.target.height = "200";
                }}
                alt="module-sample"
                style={{ transition: "height 1s" }}
              />
            </MDBCol>
          );
          break;

        case "message":
          col_body = (
            <MDBCol
              key={`module-${index}`}
              size="11"
              className="mx-auto mb-2 h6 text-center font-italic"
            >
              {data.value}
            </MDBCol>
          );
          break;

        case "trueorfalse":
          col_body = (
            <MDBCol
              key={`module-${index}`}
              size="11"
              style={{ textIndent: 50 }}
              className="mx-auto mb-2 h5 text-justify lead"
            >
              __________:&nbsp;{data.value}
            </MDBCol>
          );
          break;

        case "multiplechoice":
          col_body = (
            <MDBCol
              key={`module-${index}`}
              size="11"
              className="mx-auto mb-2 h5 text-justify lead"
            >
              <div className="container">
                <span className="ml-3">{data.value[0]}</span>
                <div className="row">
                  {data.value[1].map((data, index) => {
                    let option;
                    switch (index) {
                      case 0:
                        option = "A";
                        break;
                      case 1:
                        option = "B";
                        break;
                      case 2:
                        option = "C";
                        break;
                      case 3:
                        option = "D";
                        break;

                      default:
                        option = "ERROR";
                        break;
                    }
                    return (
                      <div className="col-md-6">
                        <div className="row">
                          <div className="col-md-2 text-right">
                            <strong>{option}</strong>
                          </div>
                          <div className="col-md-10">{data}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </MDBCol>
          );
          break;

        default:
          console.log("error");
          break;
      }
      return (
        <MDBRow
          key={`smthn-${index}`}
          onMouseOver={() =>
            (document.getElementById(`btn-${index}`).className = "d-block")
          }
          onMouseOut={() =>
            (document.getElementById(`btn-${index}`).className = "d-none")
          }
        >
          {col_body}
          {button}
        </MDBRow>
      );
    });

    let iWord_writer = Object.keys(form.interactiveWord).map((word, index) => {
      return (
        <MDBRow key={`idk-${index}`} className="text-left">
          <MDBCol size="10">
            <h4>{word}</h4>
          </MDBCol>
          <MDBCol size="2" className="d-flex align-self-center">
            <MDBIcon
              icon="times-circle"
              className="text-danger"
              onClick={() => {
                delete form.interactiveWord[word];
                this.setState({ form });
              }}
            />
          </MDBCol>
        </MDBRow>
      );
    });
    return (
      <span>
        <button onClick={this.toggle} className="btn btn-outline-primary">
          <MDBIcon icon="file-pdf" />
        </button>
        <Modal
          width="95%"
          visible={this.state.modal}
          title={
            <input
              value={this.state.form.title}
              className="border-0 bg-transparent w-75 outline-0"
              onChange={e => {
                let { form } = this.state;
                form.title = e.target.value;
                this.setState({ form });
              }}
            />
          }
          onCancel={this.toggle}
          footer={
            <Button
              key="submit"
              type="primary"
              size="large"
              onClick={this.verify}
            >
              Submit
            </Button>
          }
        >
          <MDBContainer fluid>
            <MDBRow>
              <MDBCol size="2" className="text-center">
                <strong className="h3 mb-5">ACTIONS</strong>
                <hr />
                <MDBRow>
                  <MDBCol size="12">
                    <button
                      onClick={this.handleHeader}
                      className="w-100 btn btn-dark"
                    >
                      header
                    </button>
                  </MDBCol>
                  <MDBCol size="12">
                    <button
                      onClick={this.handleImage}
                      className="w-100 btn btn-primary"
                    >
                      image
                    </button>
                  </MDBCol>
                  <MDBCol size="12">
                    <button
                      onClick={this.handleParagraph}
                      className="w-100 btn btn-secondary"
                    >
                      paragraph
                    </button>
                  </MDBCol>
                  <MDBCol size="12">
                    <button
                      onClick={this.handleInteractive}
                      className="w-100 btn btn-info"
                    >
                      interactive word
                    </button>
                  </MDBCol>
                  <MDBCol size="12">
                    <button
                      onClick={this.handleMessage}
                      className="w-100 btn btn-warning"
                    >
                      message
                    </button>
                  </MDBCol>
                  <MDBCol size="12">
                    <button
                      onClick={this.handleTrueorFalse}
                      className="w-100 btn btn-success"
                    >
                      true or false
                    </button>
                  </MDBCol>
                  <MDBCol size="12">
                    <button
                      onClick={this.handleMultipleChoice}
                      className="w-100 btn btn-light"
                    >
                      Multiple Choice
                    </button>
                  </MDBCol>
                </MDBRow>
              </MDBCol>
              {Object.keys(form.interactiveWord).length > 0 ? (
                <MDBCol size="2" className="text-center">
                  <strong className="h3 mb-5">iWORDS</strong>
                  <hr />
                  <MDBContainer fluid className="mt-4">
                    {iWord_writer}
                  </MDBContainer>
                </MDBCol>
              ) : null}
              <MDBCol
                size={Object.keys(form.interactiveWord).length > 0 ? "8" : "10"}
                className="text-center"
              >
                {module_writer}
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </Modal>
      </span>
    );
  }
}

export default Interactive;
