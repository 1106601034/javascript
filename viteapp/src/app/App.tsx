import Header from './components/Headers'
import Footer from './components/Footers'
import Calculater from './components/Calculater';

import './App.scss';

function App() {
  console.clear();
  return (
    <div className='container-fluid'>
      <div className='App'>
        <div className='header'>
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

            </div>
            <div className='col-7 text-end'>

            </div>
          </div>
          <div className='row'>
            <div className='col-8'>

            </div>
            <div className='col-4'>
              <></>
            </div>
          </div>
        </div>
        <div className='footer'>
          <Footer />
        </div >
      </div>
    </div>
  )
}

export default App
