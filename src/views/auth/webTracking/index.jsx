import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import React, { Component } from "react";
import LayoutContent from "../../../components/utility/layoutContent";
import LayoutContentWrapper from "../../../components/utility/layoutWrapper";
import { MDBTable, MDBTableBody, MDBTableHead } from "mdbreact";
import { browse } from "../../../redux/BREAD/actions";
import { connect } from "react-redux";
import { Row, Col } from "antd";
import basicStyle from "../../../config/basicStyle";
import { Bar } from "react-chartjs-2";
import * as htmlToImage from "html-to-image";

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      labels: [],
      datas: [],
    };
  }

  async componentDidMount() {
    await this.props.browse("tracker");
    this.countDistinct();
  }

  tableWriter = () => {
    return this.props.models.map((model, index) => {
      const { fullname, email, created_at } = model;
      return (
        <tr key={`web-tracker-${index}`}>
          <th>{++index}</th>
          <th>{fullname}</th>
          <th>{email}</th>
          <th>{created_at}</th>
        </tr>
      );
    });
  };

  countDistinct = () => {
    const { models } = this.props;
    const labels = Array.from(new Set(models.map((m) => m.created_at)));
    const datas = labels.map(
      (label) => models.filter((m) => m.created_at === label).length
    );
    this.setState({ labels, datas });
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
    const dataBar = {
      labels: this.state.labels,
      datasets: [
        {
          label: "Number of Logins",
          data: this.state.datas,
          backgroundColor: [
            "rgba(255, 134,159,0.4)",
            "rgba(98,  182, 239,0.4)",
            "rgba(255, 218, 128,0.4)",
            "rgba(113, 205, 205,0.4)",
            "rgba(170, 128, 252,0.4)",
            "rgba(255, 177, 101,0.4)",
          ],
          borderWidth: 2,
          borderColor: [
            "rgba(255, 134, 159, 1)",
            "rgba(98,  182, 239, 1)",
            "rgba(255, 218, 128, 1)",
            "rgba(113, 205, 205, 1)",
            "rgba(170, 128, 252, 1)",
            "rgba(255, 177, 101, 1)",
          ],
        },
      ],
    };

    const barChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        xAxes: [
          {
            barPercentage: 1,
            gridLines: {
              display: true,
              color: "rgba(0, 0, 0, 0.1)",
            },
          },
        ],
        yAxes: [
          {
            gridLines: {
              display: true,
              color: "rgba(0, 0, 0, 0.1)",
            },
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    };

    const { rowStyle, colStyle } = basicStyle;
    return (
      <LayoutContentWrapper>
        <LayoutContent>
          <Row style={rowStyle} justify="start">
            <Col md={23} sm={12} xs={24} style={colStyle}>
              <h1>Web Tracker</h1>
            </Col>
          </Row>
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-right">
                <button
                  onClick={() =>
                    this.downloadGraph("bar-chart", "Monthly Logins")
                  }
                  className="btn-outline-info"
                >
                  Download
                </button>
              </div>
            </div>
          </div>
          <Bar
            id="bar-chart"
            height={50}
            data={dataBar}
            options={barChartOptions}
          />
          <MDBTable responsive striped>
            <MDBTableHead textWhite color="primary-color">
              <tr>
                <th>#</th>
                <th>User name</th>
                <th>User e-mail</th>
                <th>Date</th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>{this.tableWriter()}</MDBTableBody>
          </MDBTable>
        </LayoutContent>
      </LayoutContentWrapper>
    );
  }
}
function mapStateToProps(state) {
  const { models } = state.BREAD;
  return { models };
}

export default connect(mapStateToProps, { browse })(Index);
