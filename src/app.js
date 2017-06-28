import { StackNavigator } from 'react-navigation'
import { enhance } from 'react-navigation-addons'

import Agenda from './components/schedules/agenda'
import AgendaDetail from './components/schedules/agendaDetail'


export default App = enhance(StackNavigator)({
  Agenda: { screen: Agenda },
  AgendaDetail : { screen: AgendaDetail }
})