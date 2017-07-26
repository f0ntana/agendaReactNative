import { StackNavigator } from 'react-navigation'
import { enhance } from 'react-navigation-addons'

import Tabs from './components/tabs/tabs'
import Login from './components/login/login'
import AgendaDetail from './components/schedules/agendaDetail'

export default App = enhance(StackNavigator)({
  	Login: { screen: Login },
  	Tabs: { screen: Tabs },
  	AgendaDetail : { screen: AgendaDetail }
})
