import React, { Component } from "react";
import { connect } from "react-redux";
import { CalendarStyleWrapper } from "./../../../containers/Calendar/calendar.style";
import ModalEvents from "./../../../containers/Calendar/modalEvents";
import DnDCalendar from "./../../../containers/Calendar/DnDCalendar";
import clone from "clone";
import notification from "./../../../components/notification";
import calendarActions from "./../../../redux/calendar/actions";

// import { tanong } from './../../../talaan';

const { changeView, changeEvents } = calendarActions;

const getIndex = (events, selectedEvent) =>
  events.findIndex((event) => event.id === selectedEvent.id);

class FullCalender extends Component {
  constructor(props) {
    super(props);
    let auth = JSON.parse(localStorage.getItem("auth"));
    this.state = {
      url: `calendars/${auth.batch_id}/find`,
      entity: "calendars",
      events: [],
      view: this.props.view,
      modalVisible: false,
      selectedData: undefined,
    };
    this.key = document.getElementById("InputTopbarSearchx");
  }

  // async componentDidMount() {
  //     await tanong(this.state.url).then(data => {
  //         this.setState({ events: [...data.events] })
  //     })
  //     console.log(this.state.events);
  //     console.log(this.props.events);
  // }

  onSelectEvent = (selectedData) => {
    this.setState({ modalVisible: "update", selectedData });
  };
  onSelectSlot = (selectedData) => {
    this.setState({ modalVisible: "new", selectedData });
  };
  onView = (view) => {
    this.props.changeView(view);
  };
  onEventDrop = (newOption) => {
    const { event, start, end } = newOption;
    const events = clone(this.props.events);
    const allDay = new Date(end).getTime() !== new Date(start).getTime();
    const updatedEvent = { ...event, start, end, allDay };
    const index = getIndex(events, updatedEvent);
    events[index] = clone(updatedEvent);
    this.props.changeEvents(events);
    notification(
      "success",
      "Move event successfully",
      `${event.title} was dropped onto ${event.start}`
    );
  };
  setModalData = (type, selectedData) => {
    const { changeEvents } = this.props;
    const events = clone(this.props.events);
    const { modalVisible } = this.state;
    if (type === "cancel") {
      this.setState({
        modalVisible: false,
        selectedData: undefined,
      });
    } else if (type === "delete") {
      const index = getIndex(events, selectedData);
      if (index > -1) {
        events.splice(index, 1);
      }
      changeEvents(events);
      this.setState({
        modalVisible: false,
        selectedData: undefined,
      });
    } else if (type === "updateValue") {
      this.setState({ selectedData });
    } else {
      if (modalVisible === "new") {
        events.push(selectedData);
      } else {
        const index = getIndex(events, selectedData);
        if (index > -1) {
          events[index] = selectedData;
        }
      }
      changeEvents(events);
      this.setState({
        modalVisible: false,
        selectedData: undefined,
      });
    }
  };

  render() {
    const { view, events } = this.props;
    // const { view } = this.props;
    // const { events } = this.state;
    const { modalVisible, selectedData } = this.state;
    const calendarOptions = {
      events,
      view,
      selectedData,
      onSelectEvent: this.onSelectEvent,
      onSelectSlot: this.onSelectSlot,
      onView: this.onView,
      onEventDrop: this.onEventDrop,
    };
    return (
      <CalendarStyleWrapper className="isomorphicCalendarWrapper">
        <ModalEvents
          modalVisible={modalVisible}
          selectedData={selectedData}
          setModalData={this.setModalData}
        />
        <DnDCalendar {...calendarOptions} />
      </CalendarStyleWrapper>
    );
  }
}

function mapStateToProps(state) {
  const { events, view } = state.Calendar.toJS();
  return { events, view };
}
export default connect(mapStateToProps, { changeView, changeEvents })(
  FullCalender
);
