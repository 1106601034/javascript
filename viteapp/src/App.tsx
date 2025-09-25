// import React from 'react';
import { SignInToShowInput, MyClock, FetchPostList } from './Components/Archieves';
import './App.scss';

function App() {
  console.clear();
  return (
    <div className='container-fluid'>
      <div className='App'>
        <div className='row'>
          <div className='col-md-12'>
            <div className='col-md-5'>
              <MyClock />
            </div>
            <div className='offset-md-4 text-right'>
              {SignInToShowInput()}
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col-md-12'>
            <div className='col-md-8'>
              <FetchPostList />
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}

export default App
