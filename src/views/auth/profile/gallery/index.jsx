import React, { Component } from "react";
import moment from "moment";
import shuffle from "lodash/shuffle";
import throttle from "lodash/throttle";
import FlipMove from "react-flip-move";
import Toggle from "./Toggle.js";
import { SingleCardWrapper, SortableCardWrapper } from "./shuffle.style";

import { tanong } from "../../../../talaan.js";
import axios from "axios";
import { MDBCol, MDBIcon, MDBIframe, MDBRow } from "mdbreact";

class ListItem extends Component {
  constructor() {
    super();
    this.auth = JSON.parse(localStorage.getItem("auth"));
    this.state = {
      url: localStorage.getItem("url"),
      entity: "books",
      models: [],
      model: undefined,
      exhibit: false,
      activeIndex: 0,
      levels: [],
      level: undefined,
    };
    this.key = document.getElementById("InputTopbarSearch");
  }

  validateFileType = (file) => {
    if (file.split(".").length > 1) {
      return (
        <img
          alt="#"
          src={`${axios.defaults.baseURL}storage/newsfeed/${this.state.url}/${this.props.author}/${this.props.attachment}`}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = `${axios.defaults.baseURL}storage/newsfeed/404.jpg`;
          }}
        />
      );
    } else {
      return <MDBIframe src={`https://www.youtube.com/embed/${file}`} />;
    }
  };

  render() {
    const listClass = `isoSingleCard card ${this.props.view}`;
    const style = { zIndex: 100 - this.props.index };
    return (
      <SingleCardWrapper id={this.props.id} className={listClass} style={style}>
        {/* {console.log(this.props)} */}
        <div className="isoCardImage">
          {this.props.attachment === undefined ? (
            <span>No image posted</span>
          ) : (
            this.validateFileType(this.props.attachment)
          )}
        </div>

        <div className="isoCardContent">
          <h3>{this.props.title}</h3>
          <h5 className="isoCardTitle">{this.props.subtitle}</h5>
          <br />
          <p className="isoCardTitle">{this.props.announcement}</p>
          <MDBRow className="isoCardDate">
            <MDBCol className="text-left">
              {moment(this.props.created_at).format("MMM Do, YYYY")}
            </MDBCol>
            <MDBCol className="text-right">
              for:{" "}
              <em>
                {this.props.category === "campus"
                  ? "Whole Campus"
                  : `Grade(s) ${this.props.certain.join(", ")}`}
              </em>
            </MDBCol>
          </MDBRow>
        </div>
        <button className="isoDeleteBtn" onClick={this.props.clickHandler}>
          <MDBIcon icon="times" />
        </button>
      </SingleCardWrapper>
    );
  }
}

class Shuffle extends Component {
  constructor(props) {
    super(props);
    this.auth = JSON.parse(localStorage.getItem("auth"));
    this.state = {
      removedArticles: [],
      view: "grid",
      order: "asc",
      sortingMethod: "chronological",
      enterLeaveAnimation: "accordionVertical",
      articles: [],
    };

    this.toggleList = this.toggleList.bind(this);
    this.toggleGrid = this.toggleGrid.bind(this);
    this.sortRotate = this.sortRotate.bind(this);
    this.sortShuffle = this.sortShuffle.bind(this);
  }
  componentDidMount() {
    tanong("newsfeeds", { batch: this.auth.batch_id }).then((datas) => {
      this.setState({ articles: [...datas] });
      // console.log(this.state.articles);
    });
  }
  toggleList() {
    this.setState({
      view: "list",
      enterLeaveAnimation: "accordionVertical",
    });
  }

  toggleGrid() {
    this.setState({
      view: "grid",
      enterLeaveAnimation: "accordionHorizontal",
    });
  }

  sortShuffle() {
    this.setState({
      sortingMethod: "shuffle",
      articles: shuffle(this.state.articles),
    });
  }

  moveArticle(source, dest, id) {
    const sourceArticles = this.state[source].slice();
    let destArticles = this.state[dest].slice();

    if (!sourceArticles.length) return;

    // Find the index of the article clicked.
    // If no ID is provided, the index is 0
    const i = id ? sourceArticles.findIndex((article) => article.id === id) : 0;

    // If the article is already removed, do nothing.
    if (i === -1) return;

    destArticles = [].concat(sourceArticles.splice(i, 1), destArticles);

    this.setState({
      [source]: sourceArticles,
      [dest]: destArticles,
    });
  }

  sortRotate() {
    const articles = this.state.articles.slice();
    articles.unshift(articles.pop());

    this.setState({
      sortingMethod: "rotate",
      articles,
    });
  }

  renderArticles() {
    return this.state.articles.map((article, i) => {
      return (
        <ListItem
          key={article.id}
          view={this.state.view}
          index={i}
          clickHandler={throttle(
            () => this.moveArticle("articles", "removedArticles", article.id),
            800
          )}
          {...article}
        />
      );
    });
  }

  render() {
    let writer = null;
    if (this.state.articles.length > 0) {
      writer = (
        <SortableCardWrapper
          id="shuffle"
          className={`isomorphicSortableCardsHolder ${this.state.view}`}
        >
          <header className="isoControlBar">
            <div className="isoViewBtnGroup">
              <Toggle
                clickHandler={this.sortShuffle}
                text="Shuffle"
                icon="shake"
                active={this.state.sortingMethod === "shuffle"}
              />
              <Toggle
                clickHandler={this.sortRotate}
                text="Rotate"
                icon="reload"
                active={this.state.sortingMethod === "rotate"}
              />
            </div>
          </header>

          <div className="isoSortableCardsContainer">
            <FlipMove
              staggerDurationBy="30"
              duration={500}
              enterAnimation={this.state.enterLeaveAnimation}
              leaveAnimation={this.state.enterLeaveAnimation}
              typeName="ul"
            >
              {this.renderArticles()}
            </FlipMove>
          </div>
        </SortableCardWrapper>
      );
    } else {
      writer = (
        <MDBRow>
          <MDBCol className="text-center">
            <span className="display-1">You have no posts yet.</span>
            <hr />
            <span className="h1">
              You can go to <strong>Events</strong> -&gt;{" "}
              <strong>Newsfeed</strong> to add some posts to your gallery
            </span>
          </MDBCol>
        </MDBRow>
      );
    }
    return writer;
  }
}

export default Shuffle;
