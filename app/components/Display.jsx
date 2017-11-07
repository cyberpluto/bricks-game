import React, {Component} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const DisplayWrapper = styled.div`
	display: inline-grid;
	grid-template-columns: repeat(7, calc(100vh / 13));
	grid-template-rows: repeat(13, calc(100vh / 13));
	overflow: hidden;

	background: rgb(148, 0, 20);
`
const Pixel = styled.div`
	grid-column-start: ${p => p.x};
	grid-column-end: span 1;
	grid-row-start: ${p => p.y};
	grid-row-end: span 1;
	margin: 5px;
	background: rgba(255, 255, 255, 0.02);
	box-shadow: 0 0 6px 1px rgab(255, 255, 255, 0.02);
`
const ActivePixel = Pixel.extend`
	background: rgba(252, 253, 240, 1);
	box-shadow: 0 0 6px 1px rgba(252, 253, 240, 1);
`
const PrizeLevel = styled.div`
	grid-column-start: 1;
	grid-column-end: span 7;
	grid-row-start: ${p => 14 - p.level};
	grid-row-end: span 1;
	display: flex;
	justify-content: center;
	align-items: center;
	border: 2px solid rgba(255, 255, 255, 0.1);
	color: rgba(255, 255, 255, 0.1);
	font-size: calc(100vh / 15);
	font-family: Sans-Serif;
`
class Display extends Component {
	static propTypes = {
		value: PropTypes.array,
	}
	render() {
		const allPixels = []
		{
			for (let i = 1; i < 14; i++) {
				for (let j = 1; j < 8; j++) {
					allPixels.push(<Pixel key={`${i}${j}`} />)
				}
			}
		}
		const {value = []} = this.props
		return (
			<DisplayWrapper>
				<PrizeLevel level={13}>{`TOP PRIZE`}</PrizeLevel>
				<PrizeLevel level={9}>{`SMALL PRIZE`}</PrizeLevel>
				{allPixels}
				{value.map((p, i) => <ActivePixel key={i} x={p.x - 2} y={p.y} />)}
			</DisplayWrapper>
		)
	}
}

export default Display
