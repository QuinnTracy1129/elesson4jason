import axios from "axios";
import { MDBIcon, MDBInput } from "mdbreact";
import React from "react";
//Log in
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Modals from "../../../components/feedback/modal";
import WithDirection from "../../../config/withDirection";
import ModalStyle from "../../../containers/Feedback/Modal/modal.style";
import authAction from "../../../redux/auth/actions";
import Actions from "../../../redux/platformSwitcher/actions.js";

const { switchActivation, changePlatform } = Actions;

const isoModal = ModalStyle(Modals);
const Modal = WithDirection(isoModal);

const { login } = authAction;

const getDefaultUrl = (role) => {
  switch (role) {
    case "dev":
      return { pathname: "/jms/hq/banner" };
    case "superadmin":
      return { pathname: "/jms/hq/banner" };
    case "principal":
      return { pathname: "/jms/hq/banner" };
    case "admin":
      return { pathname: "/jms/hq/banner" };
    case "head":
    case "master":
    case "faculty":
      return { pathname: "/jms/cr/banner" };
    case "staff":
      return { pathname: "/jms/attendance/banner" };
    case "student":
      return { pathname: "/jms/welcome" };
    default:
      return { pathname: "/jms/visitor" }; //visitor
  }
};
const getDeafultPlatform = (role) => {
  switch (role) {
    case "dev":
    case "superadmin":
    case "principal":
      return "Headquarter";
    case "admin":
      return "aTracking";
    case "head":
    case "master":
      return "fTracking";
    case "faculty":
      return "Adviser";
    default:
      return "Student"; // visitor & student
  }
};

class Login extends React.Component {
  state = {
    visible: false,
    login: "door-open",
    model: {
      email: undefined,
      password: undefined,
    },
    redirectToReferrer: false,
    message: undefined,
    has_msg: false,
    from: { pathname: "/jms/students/classroom" },
  };

  componentDidMount() {
    axios.get("sanctum/csrf-cookie", { withCredentials: true });
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (
      this.props.isLoggedIn !== nextProps.isLoggedIn &&
      nextProps.isLoggedIn === true
    ) {
      this.setState({ redirectToReferrer: true });
    }
  }

  toggle = () => {
    this.setState({
      visible: !this.state.visible,
    });
  };

  submitHandler = async (event) => {
    this.setState({ login: "door-closed" });
    event.preventDefault();
    await axios
      .post("api/auth/login", this.state.model)
      .then((res) => {
        if (res.status === 200) {
          let { token, user } = res.data;
          localStorage.setItem("token", token);
          const { rolename } = user;
          const { changePlatform } = this.props;
          let myCurrentApp = user.currentApp || getDeafultPlatform(rolename);
          localStorage.setItem("auth", JSON.stringify(user));
          if (rolename === "student") {
            axios
              .get(`api/advisories/active?student=${user.id}`)
              .then((advisory) => {
                console.log(advisory);
                if (Object.entries(advisory.data).length !== 0) {
                  localStorage.setItem(
                    "advisory",
                    JSON.stringify(advisory.data)
                  );
                  this.setState({
                    redirectToReferrer: true,
                    from: { pathname: "/jms/cr/banner" },
                  });
                } else {
                  this.setState({
                    redirectToReferrer: true,
                    from: { pathname: "/jms/welcome" },
                  });
                }
                changePlatform("Student");
              });
          } else if (rolename === "visitor") {
            alert("WELCOME VISITORS");
          } else if (rolename === "staff") {
            changePlatform("Adviser");
            this.setState({
              redirectToReferrer: true,
              from: { pathname: "/jms/welcome/faculty" },
            });
          } else {
            console.log(user);
            localStorage.getItem("advisory");
            this.setState({
              redirectToReferrer: true,
              from: getDefaultUrl(rolename),
            });
            // changePlatform(getDeafultPlatform(rolename))
            changePlatform(myCurrentApp);
          }
          // changePlatform(myCurrentApp)

          // hindi pumapasok dito kapag dito nag lagagy ng auth sa local Storage
          localStorage.setItem("auth", JSON.stringify(user));
          const { login } = this.props;
          login();
        } else {
          alert("something went wrong");
        }
      })
      .catch((err) => {
        if (err.response && err.response.data.message.slice(0, 4) === "CSRF") {
          window.location.reload();
        } else {
          this.setState({
            message: err.response ? err.response.data.message : null,
            has_msg: true,
          });
        }
      });
  };

  changeHandler = (event) => {
    let { model } = this.state;
    model[event.target.name] = event.target.value;
    this.setState({ model });
  };

  render() {
    const { email, password } = this.state.model;
    const { has_msg, message, redirectToReferrer, from } = this.state;
    if (redirectToReferrer) {
      return <Redirect to={from.pathname} />;
    }

    return (
      <div>
        <strong className="nav-link Ripple-parent" onClick={this.toggle}>
          <span>LOGIN</span>
        </strong>
        <Modal
          visible={this.state.visible}
          title="LOGIN FORM"
          onCancel={this.toggle}
          footer={null}
        >
          <form onSubmit={this.submitHandler} method="POST">
            {has_msg && (
              <div className="alert alert-warning">
                <MDBIcon icon="exclamation-triangle" className="text-danger" />{" "}
                <strong className="text-dark">{message}</strong>
              </div>
            )}
            <MDBInput
              type="text"
              icon="user"
              label="E-mail | LRN | Mobile number"
              name="email"
              value={email}
              onChange={(event) => this.changeHandler(event)}
              required
            />
            <MDBInput
              type="password"
              icon="lock"
              label="Password"
              name="password"
              value={password}
              onChange={(event) => this.changeHandler(event)}
              required
            />
            <div className="text-center mt-4">
              <button className="btn btn-primary" type="submit">
                <MDBIcon icon={this.state.login} /> Login
              </button>
            </div>
          </form>
        </Modal>
      </div>
    );
  }
}

export default connect(
  (state) => ({
    // state.Auth.get('token') !== null ? true : false,
    isLoggedIn: true,
    ...state.PlatformSwitcher.toJS(),
  }),
  { switchActivation, changePlatform, login }
)(Login);
