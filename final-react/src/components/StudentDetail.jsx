import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const StudentDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const student = useSelector(state =>
    state.student.students.find(s => s.id.toString() === id)
  );

  if (!student) {
    return (
      <div className="text-center mt-20 text-red-500 text-lg font-semibold">
        Student not found.
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md border border-gray-100">
        <div className="flex flex-col items-center">
          <img
            src="https://www.sprintdiagnostics.in/images/user.jpg"
            alt="Student"
            className="w-32 h-32 rounded-full mb-4 "
          />
          <h2 className="text-2xl font-bold mb-2">{student.name}</h2>
          <p className="text-gray-600 mb-1">📧 Email: {student.email}</p>
          <p className="text-gray-600 mb-4">📞 Phone: {student.phone}</p>

          <button
            onClick={() => navigate('/')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md transition"
          >
            ⬅ Back to List
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentDetail;
