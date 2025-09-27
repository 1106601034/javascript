// import React from 'react';
import { SignInToShowInput, MyClock, FetchPostList } from './components/Archieves';
import { Header } from './components/Headers'
import { Footer } from './components/Footers'
import './App.scss';

function App() {
  console.clear();
  return (
    <div className='container-fluid'>
      <div className='App'>
        <div className='row'>
          <Header />
        </div>
        <div className='container'>
          <div className='row'>
            <div className='col-5'>
              <MyClock />
            </div>
            <div className='col-7 text-end'>
              {SignInToShowInput()}
            </div>
          </div>
          <div className='row'>
            <div className='col-8'>
              <FetchPostList />
            </div>
            <div className='col-4'>
              <></>
            </div>
          </div>
        </div>
        <div className='row'>
          <Footer />
        </div >
      </div>
    </div>
  )
}

export default App
