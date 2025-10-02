import Header from './components/Headers'
import Footer from './components/Footers'
import Blog from './components/Blog/Blog';

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
          <Blog />
        </div>

        <div className='footer'>
          <Footer />
        </div >
      </div>
    </div >
  )
}

export default App
