import {CurrentNote} from '../../components/currentNote';
import {Home} from '../../components/home/index';
import {Settings} from '../../components/settings';
import {WrittenPage} from '../../components/writtenPage';

export const routes = [
  {name: 'Notes', component: Home},
  {name: 'Settings', component: Settings},
  {name: 'New Note', component: WrittenPage},
];

export const routesStack = [{name: 'Current Note', component: CurrentNote}];
