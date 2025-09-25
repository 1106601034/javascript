// import React from 'react';
import { SignInToShowInput, MyClock, FetchPostList } from './Components/Archieves';
import { Header } from './Components/Headers'
import { Footer } from './Components/Footers'
import './App.scss';

function App() {
  console.clear();
  return (
    <div className='container-fluid'>
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
  )
}

export default App
