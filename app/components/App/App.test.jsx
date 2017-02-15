import React from 'react';
import { shallow } from 'enzyme';
import App from './App';
import { Table } from 'reactstrap';
import Deck from '../Deck/Deck';

jest.useFakeTimers();

describe('App.jsx', () => {
	it('should include components', () => {
		const app = shallow(<App />);

		expect(app.find(Deck).length).toEqual(2);
		expect(app.find(Table).length).toEqual(1);
	});
});
