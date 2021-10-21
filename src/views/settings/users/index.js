import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import React, { Component } from "react";
import { connect } from "react-redux";
import Title from "../../../components/header/index";
import LayoutContent from "../../../components/utility/layoutContent";
import LayoutContentWrapper from "../../../components/utility/layoutWrapper";
import { browse, destroy, getlist } from "../../../redux/BREAD/actions";
import Card from "./card";
import Writer from "./writer";

class Index extends Component {
  constructor() {
    super();
    this.state = {
      entity: "users",
      model: "",
      visible: false,
      isNew: true,
    };
  }
  async componentDidMount() {
    this.onSearch();
    const roles = await this.props.getlist("roles");
    this.setState({ roles });
  }

  onSearch = async (key) => await this.props.browse("users", key);
  exhibit = (i) => {
    const model = this.props.models[i];
    this.setState({ model, isNew: false });
    this.toggle();
  };
  dummy = () => {
    this.setState({ isNew: true });
    this.toggle();
  };

  handleOk = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, exhibit: false });
    }, 2000);
  };
  toggle() {
    this.setState({ visible: !this.state.visible });
  }
  handleSearchReset = (key) => this.onSearch(key);

  // Callback function
  closeModal = () => this.toggle();
  handlesDestroy = (pkey) => this.props.destroy(this.state.url, pkey);
  render() {
    const { model, isNew, visible } = this.state;
    const { models, roles } = this.props;
    return (
      <LayoutContentWrapper>
        <LayoutContent>
          <Title title="Users" />

          <Writer
            models={models}
            exhibit={this.exhibit}
            destroy={this.handlesDestroy}
          />

          <Card
            model={model}
            isNew={isNew}
            visible={visible}
            onClose={this.closeModal}
            roles={roles}
          />
        </LayoutContent>
      </LayoutContentWrapper>
    );
  }
}

function mapStateToProps(state) {
  const { models, key, list } = state.BREAD;
  return { models: models, searchKey: key, roles: list };
}

export default connect(mapStateToProps, { browse, destroy, getlist })(Index);
