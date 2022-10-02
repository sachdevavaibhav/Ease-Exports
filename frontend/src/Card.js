import React from 'react';
import { withRouter } from 'react-router-dom';

function Card ({card={}, ...props}) {
	
	const { history } = props;

	const handleClick = () => { 
		console.log('going to', card.endpoint);
		history.push(card.endpoint);
	};

	return (
		<div className='Card'>
			<h1>{card.name}</h1>
			<p>{card.description}</p>
			<button onClick={handleClick}>Create</button>
		</div>
	)
}

export default withRouter(Card);