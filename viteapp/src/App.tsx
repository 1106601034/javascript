// import React from 'react';
import { CourseCard, MyClock } from './Components/Archieves';
import './App.scss';

function App() {
  console.clear();
  return (
    <div className="App">
      <MyClock />
      {CourseCard()}
    </div >
  )
}

export default App
