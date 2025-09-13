import MyClock from './Components/MyClock';
import CourseCard from './Components/CourseCard';

import './App.css';

function App() {
  console.clear();
  return (
    <div className="App">
      <MyClock />
      {CourseCard('beginner')}
      {CourseCard('Intermediate')}
      {CourseCard('Advance')}
    </div >
  )
}

export default App
