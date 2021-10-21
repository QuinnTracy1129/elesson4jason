import React, { Component } from 'react';
import { Icon } from 'antd';
import throttle from 'lodash/throttle';
import articles from './config';
import FlipMove from 'react-flip-move';
import Toggle from './Toggle.js';
import { SingleCardWrapper, SortableCardWrapper } from './shuffle.style';

class ListItem extends Component {
  render() {
    const style = { zIndex: 100 - this.props.index };

    return (
      <SingleCardWrapper id={this.props.id} className="isoSingleCard card grid" style={style}>
        <div className="isoCardImage">
          <img alt="#" src={process.env.PUBLIC_URL + this.props.img} />
        </div>
        <div className="isoCardContent">
          <h3 className="isoCardTitle">{this.props.desc}</h3>
          <span className="isoCardDate">
            {this.props.timestamp}
          </span>
        </div>
        <button className="isoDeleteBtn" onClick={this.props.clickHandler}>
          <Icon type="close" />
        </button>
      </SingleCardWrapper>
    );
  }
}

class Shuffle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      removedArticles: [],
      view: 'grid',
      order: 'asc',
      sortingMethod: 'chronological',
      enterLeaveAnimation: 'accordionVertical',
      articles,
    };
    this.toggleSort = this.toggleSort.bind(this);
  }

  toggleSort() {
    const sortAsc = (a, b) => a.timestamp - b.timestamp;
    const sortDesc = (a, b) => b.timestamp - a.timestamp;

    this.setState({
      order: this.state.order === 'asc' ? 'desc' : 'asc',
      sortingMethod: 'chronological',
      articles: this.state.articles.sort(
        this.state.order === 'asc' ? sortDesc : sortAsc
      ),
    });
  }

  moveArticle(source, dest, id) {
    const sourceArticles = this.state[source].slice();
    let destArticles = this.state[dest].slice();

    if (!sourceArticles.length) return;

    // Find the index of the article clicked.
    // If no ID is provided, the index is 0
    const i = id ? sourceArticles.findIndex(article => article.id === id) : 0;

    // If the article is already removed, do nothing.
    if (i === -1) return;

    destArticles = [].concat(sourceArticles.splice(i, 1), destArticles);

    this.setState({
      [source]: sourceArticles,
      [dest]: destArticles,
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
            () => this.moveArticle('articles', 'removedArticles', article.id),
            800
          )}
          {...article}
        />
      );
    });
  }

  render() {
    return (
      <SortableCardWrapper
        id="shuffle"
        className={`isomorphicSortableCardsHolder ${this.state.view}`}
      >
        <header className="isoControlBar">
          <div className="isoViewBtnGroup">
            <Toggle
              clickHandler={this.toggleSort}
              text={this.state.order === 'asc' ? 'Ascending' : 'Descending'}
              icon={this.state.order === 'asc' ? 'up' : 'down'}
              active={this.state.sortingMethod === 'chronological'}
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
  }
}

export default Shuffle;
