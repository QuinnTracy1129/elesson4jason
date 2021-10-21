import DevReducers from '../customApp/redux/reducers';
import App from './app/reducer';
import Auth from './auth/reducer';
import Box from './box/reducer';
import BREAD from './BREAD/reducer';
import Calendar from './calendar/reducer';
import DynamicChartComponent from './dynamicEchart/reducer';
import Mails from './mail/reducer';
import Notes from './notes/reducer';
import PlatformSwitcher from './platformSwitcher/reducer';
import ThemeSwitcher from './themeSwitcher/reducer';
import Todos from './todos/reducer';

export default {
  Auth,
  App,
  ThemeSwitcher,
  PlatformSwitcher,
  Mails,
  Calendar,
  Box,
  Notes,
  Todos,
  DynamicChartComponent,
  BREAD,
  ...DevReducers
};
