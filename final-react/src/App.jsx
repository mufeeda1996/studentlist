import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import StudentList from './components/StudentList';
import StudentDetail from './components/StudentDetail';
import StudentForm from './components/StudentForm';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StudentList />} />
        <Route path="/student/:id" element={<StudentDetail />} />
        <Route path="/add" element={<StudentForm />} />
        <Route path="/edit/:id" element={<StudentForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
