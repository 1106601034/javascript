// import Blog from './components/Blog/Blog';
// import Notes from './components/Notes/Notes';
import "./App.scss"
import HomePage from "./components/ToDoList/HomePage";

// import PaginationExample1 from './components/Pagination/paginationExample1';
function App() {
  console.clear();
  return (
    <div className='main'>
      <div className='container'>
        <HomePage />
      </div>
    </div>
  )
}

export default App