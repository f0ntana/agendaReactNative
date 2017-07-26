import {
  TabNavigator,
} from 'react-navigation';

import Places from '../places/places'
import Agenda from '../schedules/agenda'

export default Tabs = TabNavigator({
  Places: {screen: Places},
  Agenda: {screen: Agenda}
}, {
	initialRouteName: 'Places',
  	tabBarOptions: {
    	activeTintColor: '#e91e63',
  	},
});
