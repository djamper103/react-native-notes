import {Home} from '../../components/home/index';
import {Settings} from '../../components/settings';
import {WrittenPage} from '../../components/writtenPage';

export const routes = [
  {name: 'Notes', component: Home},
  {name: 'Settings', component: Settings},
  {name: 'New Note', component: WrittenPage},
];
