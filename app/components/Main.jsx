import React, {Component} from 'react'
import styled from 'styled-components'

import Display from 'components/Display'

const Wrapper = styled.div`
	display: flex;
	justify-content: center;
	margin: 0 auto;
	height: 100vh;
	width: 100vw;
	background: black;
`

export default class Main extends Component {
	state = {
		counter: 0,
		position: 0,
		moveRight: true,
		intervalId: null,
		activePixels: [],
	}
	componentDidMount() {
		this.setState({intervalId: setInterval(this.aim, 300)})
	}
	handleStop = () => {
		clearInterval(this.state.intervalId)
	}
	aim = () => {
		let {counter, position, moveRight} = this.state
		let length = 3
		let newBrick = []
		for (let i = 0; i < length; i++) {
			newBrick.push({
				x: position + i,
				y: 1,
				on: 1,
			})
		}
		if (((counter + 8) / 8) % 2 === 0) {
			moveRight = false
			this.setState({moveRight: false})
		} else if (((counter + 8) / 8) % 2 === 1) {
			moveRight = true
			this.setState({moveRight: true})
		}
		if (moveRight) {
			this.setState({position: position + 1})
		} else {
			this.setState({position: position - 1})
		}

		let displayedPixels = newBrick.filter(i => i.x > 1 && i.x < 9)
		let pixels = displayedPixels.map(i => {
			return {...i, x: i.x - 1}
		})
		this.setState({activePixels: pixels})
		this.setState({counter: counter + 1})
	}
	render() {
		return (
			<Wrapper onClick={this.handleStop}>
				<Display value={this.state.activePixels} />
			</Wrapper>
		)
	}
}
