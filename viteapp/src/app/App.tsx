import Header from './components/Notes/Header';
import Notes from './components/Notes/Notes';

function App() {
  console.clear();
  return (
    <div className='App'>
      <div className='container'>
        <Header />
        <Notes />
      </div>
    </div>
  )
}

export default App