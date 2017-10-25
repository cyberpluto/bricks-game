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
		level: 15,
		brick: [],
		stack: [],
		activePixels: [],
	}
	componentDidMount() {
		this.setState({aimIntervalId: setInterval(this.aim, 300)})
	}
	startAiming = () => {
		clearInterval(this.state.dropIntervalId)
		this.setState({
			Xposition: 0,
			moveRight: true,
			brick: [],
			aimIntervalId: setInterval(this.aim, 300),
		})
	}
	startDropping = () => {
		clearInterval(this.state.aimIntervalId)
		this.setState({dropIntervalId: setInterval(this.drop, 200)})
	}

	setActivePixels = newBrick => {
		let {stack} = this.state
		// Remove cut pixels
		const fallingBrickPixels = newBrick.filter(i => i.x > 2 && i.x < 10)

		let {pixelsToStack, pixelsToBrick} = this.detectColision(fallingBrickPixels)

		this.setState({
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

		if (stack.length) {
			for (let brickPixel of newBrick) {
				let secondColision = false
				let colision = false
				for (let stackPixel of stack) {
					if (
						brickPixel.y + 1 === stackPixel.y &&
						brickPixel.x === stackPixel.x
					) {
						if (brickPixel.y < level) {
							pixelsToStack.push(brickPixel)
							colision = true
							this.setState({
								level: stackPixel.y,
							})
						} else {
							secondColision = true
						}
					}
				}
				if (!colision) {
					if (brickPixel.y < 13 && !secondColision) {
						pixelsToBrick.push(brickPixel)
					}
				}
			}
		} else {
			// First Brick
			if (newBrick[0].y === 13) {
				pixelsToStack = newBrick
			} else {
				pixelsToBrick = newBrick
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
