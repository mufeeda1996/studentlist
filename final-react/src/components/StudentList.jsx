import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setStudents, deleteStudent } from '../redux/studentSlice';
import { useNavigate } from 'react-router-dom';

const StudentList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const students = useSelector(state => state.student.students);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (students.length === 0) {
      axios.get('https://jsonplaceholder.typicode.com/users')
        .then(res => {
          dispatch(setStudents(res.data));
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [dispatch, students]);
  

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      dispatch(deleteStudent(id));
    }
  };

  if (loading) return <p className="text-center mt-10 text-lg font-medium">Loading...</p>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-semibold">Student List</h2>
        <button
          onClick={() => navigate('/add')}
          className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-md transition"
        >
          Add Student
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {students.map(student => (
          <div
            key={student.id}
            className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-100"
          >
            <img
              src="https://www.sprintdiagnostics.in/images/user.jpg"
              alt="Student"
              className="w-25"
            />
            <div className="p-4">
              <h3 className="text-xl font-bold">{student.name}</h3>
              <p className="text-gray-600">{student.email}</p>

              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                  onClick={() => navigate(`/student/${student.id}`)}
                >
                  View
                </button>
                
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                  onClick={() => navigate(`/edit/${student.id}`)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                  onClick={() => handleDelete(student.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentList;
