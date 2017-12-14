import React from 'react'
import {ApolloClient, ApolloProvider} from 'react-apollo'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import {ThemeProvider} from 'styled-components'
import GameTheme from 'styles/theme'
require('../styles/reset.css')
// Import Components
import Main from 'components/Main'
// Store
import store from 'Redux/store'

const client = new ApolloClient()

const Root = () => {
	return (
		<ApolloProvider client={client} store={store}>
			<ThemeProvider theme={GameTheme}>
				<Router>
					<div>
						<Route path="/:param?" component={Main} />
					</div>
				</Router>
			</ThemeProvider>
		</ApolloProvider>
	)
}

export default Root
