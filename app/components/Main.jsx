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
		Xposition: 0,
		Yposition: 0,
		brickLength: 3,
		moveRight: true,
		startLeft: true,
		aimIntervalId: null,
		dropIntervalId: null,
		activePixels: [],
		prevBrick: [],
	}
	componentDidMount() {
		this.setState({aimIntervalId: setInterval(this.aim, 500)})
	}
	startAiming = () => {
		clearInterval(this.state.dropIntervalId)
		this.setState({
			Xposition: 0,
			Yposition: 0,
			prevBrick: [],
			aimIntervalId: setInterval(this.aim, 500),
		})
	}
	startDropping = () => {
		clearInterval(this.state.aimIntervalId)
		this.setState({dropIntervalId: setInterval(this.drop, 500)})
	}
	setActivePixels = brick => {
		let {activePixels, prevBrick} = this.state

		const visibleBrickPixels = brick.filter(i => i.x > 2 && i.x < 10)
		this.setState({prevBrick: visibleBrickPixels})

		const Pixels = new Set(activePixels)
		prevBrick.forEach(pixel => {
			Pixels.delete(pixel)
		})
		visibleBrickPixels.forEach(pixel => {
			Pixels.add(pixel)
		})
		this.setState({activePixels: [...Pixels]})
	}
	aim = () => {
		let {Xposition, moveRight, brickLength} = this.state

		if (moveRight) {
			Xposition = Xposition + 1
		} else {
			Xposition = Xposition - 1
		}
		this.setState({Xposition})

		if (Xposition === 9) {
			this.setState({moveRight: false})
		} else if (Xposition === 1) {
			this.setState({moveRight: true})
		}

		let brick = []
		for (let i = 0; i < brickLength; i++) {
			brick.push({
				x: Xposition + i,
				y: 1,
			})
		}
		this.setActivePixels(brick)
	}

	drop = () => {
		let {Xposition, Yposition, brickLength} = this.state

		Yposition = Yposition + 1
		this.setState({Yposition})

		let brick = []
		for (let i = 0; i < brickLength; i++) {
			brick.push({
				x: Xposition + i,
				y: Yposition,
			})
		}
		this.setActivePixels(brick)

		if (Yposition > 13) {
			this.startAiming()
		}
	}
	render() {
		return (
			<Wrapper onClick={this.startDropping}>
				<Display value={this.state.activePixels} />
			</Wrapper>
		)
	}
}
