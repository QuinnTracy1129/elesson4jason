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
      url: "subjects",
      visible: false,
      optionLevel: undefined,
      level: undefined,
    };
  }
  componentDidMount() {
    // tanong(this.state.entity).then(datas => {
    //     let levelRef = [...new Set(datas.map(data => data.level_id))]
    //     levelRef.sort((a, b) => { return Number(a) - Number(b); }) // Ascending
    //     let optionLevel = levelRef.map(level => {
    //         return <SelectOption key={level} value={level}>Grade {level - 3}</SelectOption>;
    //     })
    //     let level = levelRef[0];
    //     this.setState({ optionLevel, level })
    // })

    getlist("levels");
    this.onSearch();
  }

  onSearch = async (key) =>
    await this.props.browse(this.state.url, { key: key });
  exhibit = (i) => {
    const model = this.props.models[i];
    this.setState({ model, isNew: false });
    this.toggle();
  };
  dummy = () => {
    this.setState({ isNew: true });
    this.toggle();
  };
  toggle() {
    this.setState({ visible: !this.state.visible });
  }
  handleSearchReset(key) {
    this.onSearch(key);
  }
  handleOk = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, exhibit: false });
    }, 2000);
  };

  // Callback function
  closeModal = () => this.toggle();
  handlesDestroy = (pkey) => this.props.destroy(this.state.url, pkey);

  render() {
    const { model, isNew, visible } = this.state;
    const { models, option1 } = this.props;

    return (
      <LayoutContentWrapper>
        <LayoutContent>
          <Title title="Subjects" dummy={this.dummy} option1={option1} />

          <Writer
            models={models}
            exhibit={this.exhibit}
            destroy={this.handlesDestroy}
            level={10}
          />

          <Card
            model={model}
            newModel={isNew}
            exhibit={visible}
            onClose={this.closeModal}
          />
        </LayoutContent>
      </LayoutContentWrapper>
    );
  }
}

function mapStateToProps(state) {
  const { models, key, list } = state.BREAD;
  return { models: models, searchKey: key, option1: list };
}

export default connect(mapStateToProps, { browse, destroy, getlist })(Index);
