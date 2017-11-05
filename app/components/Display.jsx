import React, {Component} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const DisplayWrapper = styled.div`
	display: inline-grid;
	grid-template-columns: repeat(7, calc(100vh / 13));
	grid-template-rows: repeat(13, calc(100vh / 13));
	border: 4px solid #fff;
	overflow: hidden;
`
const Pixel = styled.div`
	grid-column-start: ${p => p.x - 2};
	grid-column-end: span 1;
	grid-row-start: ${p => p.y};
	grid-row-end: span 1;
	background: red;
	box-shadow: 0 0 6px 1px red;
	margin: 5px;
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
