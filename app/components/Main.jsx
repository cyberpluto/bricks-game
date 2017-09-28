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

let counter = 0
let position = 0
let moveRight = true
let intervalId

export default class Main extends Component {
	state = {
		activePixels: [],
	}
	componentDidMount() {
		intervalId = setInterval(this.aim, 300)
	}
	handleStop = () => {
		clearInterval(intervalId)
	}
	aim = () => {
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
		} else if (((counter + 8) / 8) % 2 === 1) {
			moveRight = true
		}
		if (moveRight) {
			position++
		} else {
			position--
		}

		let displayedPixels = newBrick.filter(i => i.x > 1 && i.x < 9)
		let pixels = displayedPixels.map(i => {
			return {...i, x: i.x - 1}
		})
		this.setState({activePixels: pixels})
		counter++
	}
	render() {
		return (
			<Wrapper onClick={this.handleStop}>
				<Display value={this.state.activePixels} />
			</Wrapper>
		)
	}
}
