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
	state = {}
	componentDidMount() {
		this.startGame()
	}
	startGame = () => {
		clearInterval(this.state.dropIntervalId)
		clearInterval(this.state.aimIntervalId)
		this.setState({
			Xposition: 1,
			brickLength: 3,
			lostPixels: 0,
			moveRight: true,
			startLeft: true,
			aimIntervalId: setInterval(this.aim, 300),
			dropIntervalId: null,
			level: 13,
			brick: [],
			stack: [],
			activePixels: [],
			aimingSpeed: 300,
		})
	}
	startAiming = () => {
		clearInterval(this.state.dropIntervalId)
		const {aimingSpeed, brickLength} = this.state
		this.setState({
			Xposition: 1 + (3 - brickLength),
			moveRight: true,
			brick: [],
			aimIntervalId: setInterval(this.aim, aimingSpeed),
		})
	}
	startDropping = () => {
		clearInterval(this.state.aimIntervalId)
		this.setState({dropIntervalId: setInterval(this.drop, 100)})
	}

	setActivePixels = newBrick => {
		let {stack, level, brickLength, lostPixels, aimingSpeed} = this.state
		// Remove cut pixels
		const activeBrickPixels = newBrick.filter(i => i.x > 2 && i.x < 10)

		let {pixelsToStack, pixelsToBrick, pixelsLost} = this.detectColision(
			activeBrickPixels
		)

		this.setState({
			level: (pixelsToStack.length && pixelsToStack[0].y) || level,
			brickLength: brickLength - pixelsLost,
			lostPixels: lostPixels + pixelsLost,
			aimingSpeed: pixelsToStack.length ? aimingSpeed * 0.9 : aimingSpeed,
			brick: pixelsToBrick,
			stack: [...stack, ...pixelsToStack],
			activePixels: [...stack, ...pixelsToStack, ...pixelsToBrick],
		})

		if (lostPixels === 3) {
			console.log('start', lostPixels, brickLength)
			this.startGame()
		} else if (!pixelsToBrick.length) {
			this.startAiming()
		}
	}

	detectColision = newBrick => {
		let {stack, level} = this.state
		let pixelsToStack = []
		let pixelsToBrick = []
		let pixelsLost = 0

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
							console.log('valid')
							validColision = true
							pixelsToStack.push({...brickPixel, y: brickPixel.y - 1})
							// invalid colision
						} else {
							console.log('invalid')
							pixelsLost += 1
							invalidColision = true
						}
					}
				}
			}
			if (
				stack.length &&
				!validColision &&
				!invalidColision &&
				brickPixel.y === 13
			) {
				console.log('bottom')
				pixelsLost += 1
			}
			// no colision
			if (!validColision && !invalidColision && brickPixel.y <= 13) {
				pixelsToBrick.push(brickPixel)
			}
		}

		return {pixelsToStack, pixelsToBrick, pixelsLost}
	}
	aim = () => {
		const {Xposition, moveRight, brickLength} = this.state

		// Increment or decrement Xposition
		if (moveRight) {
			this.setState({Xposition: Xposition + 1})
		} else {
			this.setState({Xposition: Xposition - 1})
		}

		// Switch direction
		if (Xposition === 8) {
			this.setState({moveRight: false})
		} else if (Xposition === 2 + (3 - brickLength)) {
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
