import React, {Component} from 'react'
import PropTypes from 'prop-types'
import styled, {keyframes} from 'styled-components'

const flash = keyframes`
0% {
	opacity: 0;
}
50% {
	opacity: 1;
}
100% {
	opacity: 0;
}
`

const DisplayWrapper = styled.div`
	display: inline-grid;
	grid-template-columns: repeat(7, calc(100vh / 15));
	grid-template-rows: repeat(15, calc(100vh / 15));
	grid-column-gap: 10px;
	grid-row-gap: 10px;
	border: 4px solid #fff;
	overflow: hidden;
`
const Pixel = styled.div`
	grid-column-start: ${p => p.x - 2};
	grid-column-end: span 1;
	grid-row-start: ${p => p.y};
	grid-row-end: span 1;
	background: red;
	// animation: ${flash} 0.3s ease;
	box-shadow: 0 0 6px 1px red;
`

class Display extends Component {
	static propTypes = {
		value: PropTypes.array,
	}
	render() {
		const {value} = this.props
		return (
			<DisplayWrapper>
				{value.map((p, i) => <Pixel key={i} x={p.x} y={p.y} />)}
			</DisplayWrapper>
		)
	}
}

export default Display
