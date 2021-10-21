import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import React, { Component } from "react";
import LayoutContent from "../../../components/utility/layoutContent";
import LayoutContentWrapper from "../../../components/utility/layoutWrapper";
import { Row, Col } from "antd";
import basicStyle from "../../../config/basicStyle";
import { listahan } from "../../../talaan";

import GoogleChart from "react-google-charts";

import * as htmlToImage from "html-to-image";

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      documents: [],
      data: [["Names", "Early", "On-time", "Late"]],
      downloads: [],
    };
  }

  async componentDidMount() {
    await listahan("tracking/documents").then((res) => {
      this.setState({ documents: res });
    });
    this.Submissions();
    this.Downloads();
  }

  Submissions = () => {
    const { documents } = this.state;
    const labels = Array.from(new Set(documents.map((m) => m.fullname)));
    const collections = labels.map((label) =>
      documents.filter((m) => m.fullname === label)
    );

    const early = collections.map(
      (collection) => collection.filter((m) => m.submission === "early").length
    );
    const ontime = collections.map(
      (collection) =>
        collection.filter((m) => m.submission === "on-time").length
    );
    const late = collections.map(
      (collection) => collection.filter((m) => m.submission === "late").length
    );
    let { data } = this.state;
    labels.map((label, index) => {
      let array = [label, early[index], ontime[index], late[index]];
      data.push(array);
      return "world";
    });
    this.setState({ data });
  };

  Downloads = () => {
    const { documents, downloads } = this.state;
    documents.map((document) => {
      let array = [document.title, document.downloads];
      downloads.push(array);
      return "hello";
    });
    this.setState({ downloads });
  };

  downloadGraph = (id, filename) => {
    htmlToImage
      .toJpeg(document.getElementById(id), { quality: 0.95 })
      .then(function (dataUrl) {
        var link = document.createElement("a");
        link.download = `${filename}.jpg`;
        link.href = dataUrl;
        link.click();
      });
  };

  render() {
    const ComboChart = {
      title: "Combo Chart",
      key: "ComboChart",
      chartType: "ComboChart",
      width: "100%",
      height: "400px",
      data: this.state.data,
      options: {
        title: "Submissions of DLL/iModule/Module",
        titleTextStyle: {
          color: "#788195",
        },
        legend: {
          textStyle: {
            color: "#788195",
          },
        },
        seriesType: "bars",
        series: {
          5: {
            type: "line",
          },
        },
        animation: {
          duration: 1000,
          easing: "in",
          startup: true,
        },
        colors: ["#00C851", "#33b5e5", "#ffbb33"],
        dataOpacity: 0.6,
        tooltip: {
          textStyle: {
            color: "#788195",
          },
        },
      },
    };

    const LineChart = {
      title: "Line Chart",
      chartType: "LineChart",
      key: "LineChart",
      width: "100%",
      height: "400px",
      columns: [
        {
          label: "Date",
          type: "string",
        },
        {
          label: "Downloads",
          type: "number",
        },
      ],
      rows: this.state.downloads,
      options: {
        legend: {
          textStyle: {
            color: "#788195",
          },
        },
        colors: ["#48A6F2"],
        dataOpacity: 1.0,
        animation: {
          duration: 1000,
          easing: "in",
          startup: true,
        },
        tooltip: {
          textStyle: {
            color: "#788195",
          },
        },
      },
    };

    const { rowStyle, colStyle } = basicStyle;
    return (
      <LayoutContentWrapper>
        <LayoutContent>
          <Row style={rowStyle} justify="start">
            <Col md={23} sm={12} xs={24} style={colStyle}>
              <h1>Document Tracker</h1>
            </Col>
          </Row>
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-right">
                <button
                  onClick={() =>
                    this.downloadGraph(
                      "combo-chart",
                      "Monthly Submissions of DLL_iModule_Module"
                    )
                  }
                  className="btn-outline-info"
                >
                  Download
                </button>
              </div>
              <div className="col-md-12" id="combo-chart">
                <GoogleChart {...ComboChart} />
              </div>
            </div>
          </div>
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-right">
                <button
                  onClick={() =>
                    this.downloadGraph("line-chart", "File download tracker")
                  }
                  className="btn-outline-info"
                >
                  Download
                </button>
              </div>
              <div className="col-md-12" id="line-chart">
                <GoogleChart {...LineChart} />
              </div>
            </div>
          </div>
        </LayoutContent>
      </LayoutContentWrapper>
    );
  }
}
