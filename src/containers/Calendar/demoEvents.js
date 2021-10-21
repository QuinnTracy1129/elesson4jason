import moment from 'moment';

const events = [
  {
    allDay: false,
    start: '2017-06-13T12:41:31.046Z',
    end: '2017-06-13T12:41:31.046Z'
  },
  {
    allDay: true,
    start: '2017-06-06T18:22:42.716Z',
    end: '2017-06-06T18:22:42.716Z'
  },
  {
    allDay: false,
    start: '2017-06-14T18:53:31.353Z',
    end: '2017-06-14T18:53:31.353Z'
  }
];

const datediff = new moment(new Date()).diff(
  new moment('2017-06-01T18:23:07.322Z'),
  'days'
);
events.forEach((event, index) => {
  events[index].title = `Demo event ${index + 1}`;
  events[index].desc = `Desc of event ${index + 1}`;
  events[index].start = new moment(event.start).add(datediff, 'days').toDate();
  events[index].end = new moment(event.end).add(datediff, 'days').toDate();
});
export default events;
