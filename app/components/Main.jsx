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
		Xposition: 0,
		brickLength: 3,
		moveRight: true,
		startLeft: true,
		aimIntervalId: null,
		dropIntervalId: null,
		stack: [],
		brick: [],
		activePixels: [],
	}
	componentDidMount() {
		this.setState({aimIntervalId: setInterval(this.aim, 400)})
	}
	startAiming = () => {
		clearInterval(this.state.dropIntervalId)
		this.setState({
			Xposition: 0,
			moveRight: true,
			brick: [],
			aimIntervalId: setInterval(this.aim, 500),
		})
	}
	startDropping = () => {
		clearInterval(this.state.aimIntervalId)
		this.setState({dropIntervalId: setInterval(this.drop, 300)})
	}
	setActivePixels = newBrick => {
		let {stack} = this.state

		// Remove cut pixels
		const visibleBrickPixels = newBrick.filter(i => i.x > 2 && i.x < 10)

		// Create set of active pixels
		// const Pixels = new Set(activePixels)
		this.setState({
			brick: visibleBrickPixels,
			activePixels: [...stack, ...visibleBrickPixels],
		})

		if (this.getColisionPixels()) {
			this.setState({
				stack: [...stack, ...this.getColisionPixels()],
			})
			this.startAiming()
		}
	}
	getColisionPixels = () => {
		let {stack, brick} = this.state
		let pixelsToStack = []
		let colision = false

		// If brick hit the bottom
		if (brick[0].y === 14) {
			pixelsToStack = brick
			colision = true
		}

		for (let brickPixel of brick) {
			for (let stackPixel of stack) {
				if (
					brickPixel.y + 1 === stackPixel.y &&
					brickPixel.x === stackPixel.x
				) {
					pixelsToStack.push(brickPixel)
					colision = true
				}
			}
		}

		if (colision) {
			return pixelsToStack
		}
		return false
	}
	aim = () => {
		let {Xposition, moveRight, brickLength} = this.state

		// Increment or decrement Xposition
		if (moveRight) {
			Xposition = Xposition + 1
		} else {
			Xposition = Xposition - 1
		}
		this.setState({Xposition})

		// Switch direction
		if (Xposition === 9) {
			this.setState({moveRight: false})
		} else if (Xposition === 1) {
			this.setState({moveRight: true})
		}

		// Calculate new brick
		let newBrick = []
		for (let i = 0; i < brickLength; i++) {
			newBrick.push({
				x: Xposition + i,
				y: 1,
			})
		}
		this.setActivePixels(newBrick)
	}

	drop = () => {
		let {brick} = this.state

		let newBrick = []
		for (let i = 0; i < brick.length; i++) {
			newBrick.push({
				x: brick[i].x,
				y: brick[i].y + 1,
			})
		}
		this.setActivePixels(newBrick)
	}
	render() {
		return (
			<Wrapper onClick={this.startDropping}>
				<Display value={this.state.activePixels} />
			</Wrapper>
		)
	}
}
