import React, {Component} from 'react'
import styled from 'styled-components'
import keydown from 'react-keydown'

import Display from 'components/Display'

const colors = [
	'#3E8320',
	'#4A8622',
	'#5B8C1E',
	'#6A911D',
	'#7D9619',
	'#939A18',
	'#9F9315',
	'#A38313',
	'#A97512',
	'#AD6110',
	'#B6490E',
	'#B63507',
	'#B81A04',
	'#B81A04',
]

const Wrapper = styled.div`
	position: relative;
	display: flex;
	justify-content: center;
	margin: 0 auto;
	height: 100vh;
	width: 100vw;
	background: linear-gradient(65deg, ${colors.join(', ')});
	background-size: 1300% 100%;
	background-repeat: no-repeat;
	background-position: ${p => 0 - p.level * 100}vw 0;
	transition: 0.3s;
`

@keydown('space')
class Main extends Component {
	state = {}
	componentWillReceiveProps({keydown}) {
		if (keydown.event && this.state.aimIntervalId) {
			this.startDropping()
		}
	}
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
			aimingSpeed: 200,
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
		this.setState({
			dropIntervalId: setInterval(this.drop, 100),
			aimIntervalId: null,
		})
	}

	updateState = newBrick => {
		let {stack, level, brickLength, lostPixels, aimingSpeed} = this.state

		let {pixelsToStack, pixelsToBrick, lost} = this.detectCollision(newBrick)

		this.setState({
			level: (pixelsToStack.length && pixelsToStack[0].y) || level,
			brickLength: brickLength - lost,
			lostPixels: lostPixels + lost,
			aimingSpeed: pixelsToStack.length ? aimingSpeed * 0.85 : aimingSpeed,
			brick: pixelsToBrick,
			stack: [...stack, ...pixelsToStack],
			activePixels: [...stack, ...pixelsToStack, ...pixelsToBrick],
		})

		if (level === 1) {
			this.startGame()
		}

		if (lostPixels === 3) {
			this.startGame()
		} else if (!pixelsToBrick.length) {
			this.startAiming()
		}
	}

	detectCollision = newBrick => {
		let {stack, level} = this.state
		let pixelsToStack = []
		let pixelsToBrick = []
		let lost = 0

		for (let brickPixel of newBrick) {
			let validCollision = false
			let invalidCollision = false

			// Cut pixels outside of the display
			if ((brickPixel.x <= 2 || brickPixel.x >= 10) && brickPixel.y > 1) {
				lost += 1
				continue
			}
			// detect collision
			if (!stack.length && brickPixel.y === 13) {
				// First Brick
				validCollision = true
				pixelsToStack.push(brickPixel)
			}
			if (stack.length) {
				for (let stackPixel of stack) {
					if (brickPixel.y === stackPixel.y && brickPixel.x === stackPixel.x) {
						if (brickPixel.y === level) {
							// valid collision
							validCollision = true
							pixelsToStack.push({...brickPixel, y: brickPixel.y - 1})
						} else {
							// invalid collision
							lost += 1
							invalidCollision = true
						}
					}
				}
			}
			// No collision
			if (!validCollision && !invalidCollision) {
				if (brickPixel.y <= 13) {
					pixelsToBrick.push(brickPixel)
				} else {
					lost += 1
				}
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
		this.updateState(newBrick)
	}

	drop = () => {
		let newBrick = this.state.brick.map(pixel => ({
			...pixel,
			y: pixel.y + 1,
		}))
		this.updateState(newBrick)
	}

	render() {
		return (
			<Wrapper level={13 - this.state.level}>
				<Display value={this.state.activePixels} />
			</Wrapper>
		)
	}
}

export default Main
