import React from 'react';
import { Card, CardImg } from 'reactstrap';

require('./CardWrapper.css');

class CardWrapper extends React.Component {
	constructor(props) {
		super(props);
    this.state = {
			shouldHide: true,
    }
	}

  componentDidUpdate() {
  }

	checkCard() {
		this.props.fn(this);

		//this.setState({ shouldHide: false });
	}

	checkShow() {
		let guessed = this.props.appState.guessed.find((x) => {
			return this.props.data.code == x;
		});
		if (guessed) return true;
		if (this.props.data.code == this.props.appState.opened.code && this.props.deckId == this.props.appState.opened.deck)
			return true;
		return false;
	}

  render() {
    return (
      <Card onClick={this.checkCard.bind(this)}>
				<CardImg src={this.props.data.image} className={this.checkShow() ? '' : 'hidden' } />
			</Card>
    );
  }
}
export default CardWrapper;
