import React, { Component } from 'react';
import './ImgFig.css';

export default class ImgFig extends Component {
	_figput(fn) {
		return !fn?'':`Figure ${fn}: `;
	}
	_alcl(al) {
		let _x = al?` _a${al}`:'';
		return `wimg${_x}`;
	}
	_makeFigAlt(f,l) {
		this.figalt = this._figput(f) + l;
	}
	render() {
		const {fig,label} = this.props;
		this._makeFigAlt(fig,label);
		return (
			<div className={this._alcl(this.props.align)}>
				<img src={this.props.source} alt={this.figalt} />
				<p><strong>{this._figput(this.props.fig)}</strong>{this.props.label}</p>
			</div>
		);
	}
}