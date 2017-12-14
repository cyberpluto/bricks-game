import React, {Component} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import tinycolor from 'tinycolor2'

const DisplayWrapper = styled.div`
	position: relative;
	display: inline-grid;
	grid-template-columns: repeat(7, calc(100vh / 13));
	grid-template-rows: repeat(13, calc(100vh / 13));
	overflow: hidden;
	background: ${p => p.theme.color.displayBg};
	z-index: 3;
`
const TextLayer = DisplayWrapper.extend`
	position: absolute;
	top: 0;
	left: 0;
	background: transparent;
`
const Pixel = styled.div`
	grid-column-start: ${p => p.x};
	grid-column-end: span 1;
	grid-row-start: ${p => p.y};
	grid-row-end: span 1;
	margin: 5px;
	background: ${p =>
		tinycolor(p.theme.color.activePixel)
			.setAlpha(p.theme.pixelOpacity)
			.toRgbString()};
	box-shadow: 0 0 6px 1px
		${p =>
			tinycolor(p.theme.color.activePixel)
				.setAlpha(p.theme.pixelOpacity)
				.toRgbString()};
`
const ActivePixel = Pixel.extend`
	background: ${p => p.theme.color.activePixel};
	box-shadow: 0 0 6px 1px ${p => p.theme.color.activePixel};
`
const PrizeLevel = styled.div`
	grid-column-start: 1;
	grid-column-end: span 7;
	grid-row-start: ${p => 14 - p.level};
	grid-row-end: span 1;
	display: flex;
	justify-content: center;
	align-items: center;
	border-top: 4px solid
		${p =>
			tinycolor(p.theme.color.activePixel)
				.setAlpha(p.theme.textOpacity)
				.toRgbString()};
	border-bottom: 4px solid
		${p =>
			tinycolor(p.theme.color.activePixel)
				.setAlpha(p.theme.textOpacity)
				.toRgbString()};
	color: ${p =>
		tinycolor(p.theme.color.activePixel)
			.setAlpha(p.theme.textOpacity)
			.toRgbString()};
	font-size: calc(100vh / 13);
	font-family: 'VT323', monospace;
`
class Display extends Component {
	static propTypes = {
		value: PropTypes.array,
	}
	render() {
		const allPixels = []
		{
			for (let i = 1; i <= 13; i++) {
				for (let j = 1; j <= 7; j++) {
					allPixels.push(<Pixel key={`${i}${j}`} />)
				}
			}
		}
		const {value = []} = this.props
		return (
			<DisplayWrapper>
				{allPixels}
				<TextLayer>
					<PrizeLevel level={13}>{`TOP PRIZE`}</PrizeLevel>
					<PrizeLevel level={9}>{`SMALL PRIZE`}</PrizeLevel>
				</TextLayer>
				{value.map((p, i) => {
					if (p.x > 2 && p.x < 10) {
						return <ActivePixel key={i} x={p.x - 2} y={p.y} />
					}
				})}
			</DisplayWrapper>
		)
	}
}

export default Display
