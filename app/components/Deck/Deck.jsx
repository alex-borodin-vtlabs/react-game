import React from 'react';
import { CardColumns } from 'reactstrap';
import CardWrapper from '../CardWrapper/CardWrapper';

require('./Deck.css');

class Deck extends React.Component {
	constructor(props) {
		super(props);
    this.state = {
    }
	}

  componentDidUpdate() {
  }

  render() {
    const cards = this.props.data.map((x) => {
      return <CardWrapper data={x} key={x.code} fn={this.props.fn} deckId={this.props.id} appState={this.props.appState}/>
    });
    return (
      <CardColumns className='deck'>
        {cards}
      </CardColumns>
    );
  }
}
export default Deck;
