import { useEffect, useState } from "react";
import { CourseCard } from "./CourseCard";
import LecturerCard from "./LecturerCard";
import axios from "axios";

const course = {
  title: "React Course",
  description: "Learn React",
  duration: "3 months",
  instructor: "John Doe",
  difficulty: "Beginner",
  status: "completed",
};

const courses = Array.from({ length: 10 }).map((item, index) => {
  return {
    id: index,
    title: `React Course ${index}`,
    description: "Learn React",
    duration: "3 months",
    instructor: "John Doe",
    difficulty: "Beginner",
    status: "completed",
    isFavorite: false,
  };
});

function ToDoList() {
  const [myCourses, setMyCourses] = useState(courses);
  const [lecturers, setLecturers] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const handleCourseFavoriteChange = (courseId) => {
    const newCourses = myCourses.map((course) => {
      if (course.id === courseId) {
        course.isFavorite = !course.isFavorite;
      }
      return course;
    });
    setMyCourses(newCourses);
  };

  const handleSearchValueChange = (event) => {
    // console.log(abc);
    setSearchValue(event.target.value);
  };

  const filteredCourses = myCourses.filter((course) => {
    return course.title.toLowerCase().includes(searchValue.toLowerCase());
  });

  // mounted
  // updating
  // unmounting

  useEffect(() => {
    console.log("Component mounted");

    // fetch with Promise
    // fetch remote data, fetch is built-in function in browser
    // fetch(
    //   "https://my-json-server.typicode.com/JustinHu8/courseCardMock/lecturers"
    // )
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log(data);
    //     setLecturers(data);
    //   }).catch((error) => {
    //     console.log(error, 11);
    //   });

    // fetch with async/await
    // async function fetchLecturers() {
    //   try {
    //     const response = await fetch(
    //       "https://my-json-server.typicode.com/JustinHu8/courseCardMock/lecturers"
    //     );
    //     const data = await response.json();
    //     setLecturers(data);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }

    // fetchLecturers()

    // get data with axios, can use in both browser and node.js.
    async function fetchLecturers() {
      try {
        const response = await axios.get("https://my-json-server.typicode.com/JustinHu8/courseCardMock/lecturers")
        setLecturers(response.data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchLecturers();
  }, []);

  return (
    <>
      <input
        type="text"
        placeholder="Search for courses..."
        value={searchValue}
        onChange={handleSearchValueChange}
      />
      {filteredCourses.map((course) => (
        <CourseCard
          course={course}
          key={course.id}
          handleCourseFavoriteChange={handleCourseFavoriteChange}
        />
      ))}
      {lecturers.map((lecturer) => (
        <LecturerCard
          key={lecturer.id}
          name={lecturer.name}
          title={lecturer.title}
        />
      ))}
    </>
  );
}

export default ToDoList;
