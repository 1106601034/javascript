// import React from 'react';
import MyClock from './components/MyClock';
import SignInToShowInput from './components/buttonGroup';
import FetchPostList from './components/fetchPostJson';
import Header from './components/Headers'
import Footer from './components/Footers'
import Calculater from './components/Calculater';
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
            <div className='col-3'>
              <Calculater />
            </div>
          </div>
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
