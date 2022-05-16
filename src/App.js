import { React } from 'react';
import './App.scss';
import BarChart from './components/barChart';

const App = (context) => {
	const { config } = context;

	return (
		<div className="App" role="App">
			<BarChart{ ...{ ...context, data: config.data } }/>
		</div>
	);
};

export default App;
