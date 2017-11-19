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

		let {pixelsToStack, pixelsToBrick, lost} = this.detectColision(newBrick)

		this.setState({
			level: (pixelsToStack.length && pixelsToStack[0].y) || level,
			brickLength: brickLength - lost,
			lostPixels: lostPixels + lost,
			aimingSpeed: pixelsToStack.length ? aimingSpeed * 0.9 : aimingSpeed,
			brick: pixelsToBrick,
			stack: [...stack, ...pixelsToStack],
			activePixels: [...stack, ...pixelsToStack, ...pixelsToBrick],
		})

		if (lostPixels === 3) {
			this.startGame()
		} else if (!pixelsToBrick.length) {
			this.startAiming()
		}
	}

	detectColision = newBrick => {
		let {stack, level} = this.state
		let pixelsToStack = []
		let pixelsToBrick = []
		let lost = 0

		for (let brickPixel of newBrick) {
			let validColision = false
			let invalidColision = false
			if ((brickPixel.x <= 2 || brickPixel.x >= 10) && brickPixel.y > 1) {
				lost += 1
				continue
			}
			// detect colision
			if (!stack.length && brickPixel.y === 13) {
				// First Brick
				validColision = true
				pixelsToStack.push(brickPixel)
			}
			if (stack.length) {
				for (let stackPixel of stack) {
					if (brickPixel.y === stackPixel.y && brickPixel.x === stackPixel.x) {
						if (brickPixel.y === level) {
							// valid colision
							validColision = true
							pixelsToStack.push({...brickPixel, y: brickPixel.y - 1})
						} else {
							// invalid colision
							lost += 1
							invalidColision = true
						}
					}
				}
			}
			// Reached the bottom
			if (
				stack.length &&
				!validColision &&
				!invalidColision &&
				brickPixel.y === 13
			) {
				lost += 1
			}
			// no colision
			if (!validColision && !invalidColision && brickPixel.y <= 13) {
				pixelsToBrick.push(brickPixel)
			}
		}

		return {pixelsToStack, pixelsToBrick, lost}
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
		let newBrick = this.state.brick.map(pixel => ({
			...pixel,
			y: pixel.y + 1,
		}))
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
