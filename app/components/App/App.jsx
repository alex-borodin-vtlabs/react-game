import React from 'react';
import { Container, Row, Col, Table } from 'reactstrap';
import shuffleArray from 'shuffle-array';
import Deck from '../Deck/Deck';


require('./App.css');

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			turns: 0,
			firstDeck: [],
			secondDeck: [],
			opened: {
				deck: undefined,
				code: undefined,
			},
			guessed: [],
			scores: [],
		};
	}

	componentDidMount() {
		let scores = []
		fetch('http://localhost:8000/results/')
		.then((data) => data.json())
		.then((data) => {
			scores = data.scores
			fetch('https://deckofcardsapi.com/api/deck/new/draw/?count=9')
			.then((data) => data.json())
			.then((data) => {
				this.setState({ scores: scores, firstDeck: shuffleArray(data.cards, { 'copy': true }) , secondDeck:shuffleArray(data.cards, { 'copy': true })});
			});
		});
	}

	componentWillUnmount() {
	}

	setScore() {
		let scores = []
		let name = prompt("You won! Enter your name.");
		fetch(`http://localhost:8000/results/?name=${name}&score=${this.state.turns}`, { method: "POST" })
		.then((data) => data.json())
		.then((data) => {
			scores = data.scores
			fetch('https://deckofcardsapi.com/api/deck/new/draw/?count=9')
			.then((data) => data.json())
			.then((data) => {
				this.setState({
					 scores: scores,
					 firstDeck: shuffleArray(data.cards, { 'copy': true }),
					 secondDeck: shuffleArray(data.cards, { 'copy': true }),
					 turns: 0,
					 opened: {
						 deck: undefined,
						 code: undefined,
					 },
					 guessed: [],
				 });
			});
		});
	}

	checkDeck(card) {
		let turns = this.state.turns;
		turns++;
		if (!this.state.opened.code) {
			this.setState({
				opened: {
					deck: card.props.deckId,
					code: card.props.data.code,
				} })
			return false;
		}
		if (this.state.opened.deck === card.props.deckId) {
			return false;
		}
		if (this.state.opened.code === card.props.data.code) {
			let guessed = this.state.guessed;
			guessed.push(card.props.data.code)
			if (guessed.length === 9) {
				this.setScore()
			}
			else {
				this.setState({
					turns: turns,
					guessed: guessed,
					opened: {
						deck: undefined,
						code: undefined,
					}
				});
			}
		}
		else {
			this.setState({opened: {
				deck: card.props.deckId,
				code: card.props.data.code,
			}});
			setTimeout(() => {
				this.setState({
					turns: turns,
					opened: {
						deck: undefined,
						code: undefined
					}
				});
			}, 1000);
		}
		return false;
	}

	render() {
		let scores = this.state.scores.map( (x, i) => {
			return <tr key={i+1}>
								<th scope="row">{i+1}</th>
								<td>{x.name}</td>
								<td>{x.score}</td>
							</tr>
		});

		return (
			<Container>
				<Row>
					<Col xs='12'>
						Turns: {this.state.turns}
					</Col>
					<Col xs='6'>
						<Deck data={this.state.firstDeck} appState={this.state} fn={this.checkDeck.bind(this)} id="firstDeck"/>
					</Col>
					<Col xs='6'>
						<Deck data={this.state.secondDeck} appState={this.state} fn={this.checkDeck.bind(this)} id="secondDeck"/>
					</Col>
					<Col xs='12'>
						<Table>
							<thead>
								<tr>
									<th>#</th>
									<th>Name</th>
									<th>Score</th>
								</tr>
							</thead>
							<tbody>
								{scores}
							</tbody>
						</Table>
					</Col>
				</Row>

			</Container>
		);
	}
}

export default App;
