import React from 'react';
import Card from './Card';
import List from './List';
import PerformaInvoice from './PerformaInvoice';
import ExportInvoice from './ExportInvoice';
import PackingSlip from './PackingSlip';

import { Switch, Route } from 'react-router-dom';

import {data} from './data';

import './App.css';

const App = (props) => {
	const [counter, setCounter] = React.useState(0);

	// console.log('data', data);

	return (
		<div className="Container">
			<Switch>				
				<Route path='/performa-invoice'>
					<PerformaInvoice />
				</Route>
				<Route path='/export-invoice'>
					<ExportInvoice />
				</Route>
				<Route path='/packing-slip'>
					<PackingSlip/>					
				</Route>
				<Route path='/' render={(rprops) => {
					return <List 
						items={data} 
						ItemComponent={Card} 
						keyName='card' 
						{...rprops}
						/>
				}} />
			</Switch>
			
		</div>
	)
}

export default App;