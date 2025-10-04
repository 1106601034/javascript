import Blog from './components/Blog/Blog';
// import Notes from './components/Notes/Notes';
import "./App.scss"
function App() {
  console.clear();
  return (
    <div className='main'>
      <div className='container'>
        <Blog />
      </div>
    </div>
  )
}

export default App