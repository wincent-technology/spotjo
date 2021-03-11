import React, {Component} from 'react'
import {View} from 'react-native'
import Svg,{ Rect,Defs,LinearGradient,Stop,RadialGradient,Path } from 'react-native-svg'

export default class BorderShadow extends Component {
	render = () => {
		const inset=16
		const { setting:{side,width,color,border,opacity,} } = this.props
		const {...children} = this.props

		const linear = (key) => {
			return [
				<Stop offset="0" stopColor={color} stopOpacity={opacity} key={key+'Linear0'} />,
				<Stop offset="1" stopColor={color} stopOpacity="0" key={key+'Linear1'} />
			]
		}

		const lineWidth = border

		return (
			<View style={[{position:"relative",width:width}]}>
				{(()=>{
					switch (side){
						case "top":
							return [
								<Svg key={'randomkey1'} height={lineWidth} width={width+lineWidth} style={{position:"absolute",top:(inset?0:-lineWidth)}}>
									<Defs>
										<LinearGradient id="top" x1="0%" x2="0%" y1="100%" y2="0%">{linear('BorderTop')}</LinearGradient>
										<LinearGradient id="top-inset" x1="0%" x2="0%" y1="0%" y2="100%">{linear('BorderTopInset')}</LinearGradient>
									</Defs>
									<Rect x={0} y={0} width={width} height={lineWidth} fill={`url(#top${inset?"-inset":""})`} />
								</Svg>,
								...children
							]
						case "bottom":
							return [
								...children,
								<Svg key={'randomkey2'} height={lineWidth} width={width+lineWidth} style={{position:"absolute",bottom:(inset?-lineWidth:0)}}>
									<Defs>
										<LinearGradient id="bottom" x1="0%" x2="0%" y1="0%" y2="100%">{linear('BorderBottom')}</LinearGradient>
										<LinearGradient id="bottom-inset" x1="0%" x2="0%" y1="100%" y2="0%">{linear('BorderBottomInset')}</LinearGradient>
									</Defs>
									<Rect x={0} y={0} width={width} height={lineWidth} fill={`url(#bottom${inset?"-inset":""})`} />
								</Svg>
							]
						default:
							throw new Error("Wrong Type of Side! We just support 'top' and 'bottom'")
							return null
					}
				})()}
			</View>
		)
	}
}