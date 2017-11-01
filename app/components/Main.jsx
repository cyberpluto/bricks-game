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
		level: 13,
		brick: [],
		stack: [],
		activePixels: [],
	}
	componentDidMount() {
		this.setState({aimIntervalId: setInterval(this.aim, 200)})
	}
	startAiming = () => {
		clearInterval(this.state.dropIntervalId)
		this.setState({
			Xposition: 0,
			moveRight: true,
			brick: [],
			aimIntervalId: setInterval(this.aim, 200),
		})
	}
	startDropping = () => {
		clearInterval(this.state.aimIntervalId)
		this.setState({dropIntervalId: setInterval(this.drop, 100)})
	}

	setActivePixels = newBrick => {
		let {stack, level} = this.state
		// Remove cut pixels
		const activeBrickPixels = newBrick.filter(i => i.x > 2 && i.x < 10)

		let {pixelsToStack, pixelsToBrick} = this.detectColision(activeBrickPixels)

		this.setState({
			level: (pixelsToStack.length && pixelsToStack[0].y) || level,
			brick: pixelsToBrick,
			stack: [...stack, ...pixelsToStack],
			activePixels: [...stack, ...pixelsToStack, ...pixelsToBrick],
		})

		if (!pixelsToBrick.length) {
			this.startAiming()
		}
	}

	detectColision = newBrick => {
		let {stack, level} = this.state
		let pixelsToStack = []
		let pixelsToBrick = []

		for (let brickPixel of newBrick) {
			let validColision = false
			let invalidColision = false
			// detect colision
			if (!stack.length && brickPixel.y === 13) {
				// First Brick
				validColision = true
				pixelsToStack.push(brickPixel)
			} else if (stack.length) {
				for (let stackPixel of stack) {
					if (brickPixel.y === stackPixel.y && brickPixel.x === stackPixel.x) {
						// valid colision
						if (brickPixel.y === level) {
							validColision = true
							pixelsToStack.push({...brickPixel, y: brickPixel.y - 1})
							// invalid colision
						} else {
							invalidColision = true
						}
					}
				}
			}
			// no colision
			if (!validColision && !invalidColision && brickPixel.y <= 13) {
				pixelsToBrick.push(brickPixel)
			}
		}

		return {pixelsToStack, pixelsToBrick}
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
