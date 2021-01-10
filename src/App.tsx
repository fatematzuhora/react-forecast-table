import React from 'react';
import {
  TwitterTable,
  VoteTable,
  WorldCupTable
} from 'components';
import 'app.scss';

function App() {
  return (
    <div className="landing-page">
      <WorldCupTable />
      <TwitterTable />
      <VoteTable />
    </div>
  );
}

export default App;
