import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addStudent, updateStudent } from '../redux/studentSlice';
import { useNavigate, useParams } from 'react-router-dom';

const StudentForm = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const existingStudent = useSelector(state =>
    state.student.students.find(s => s.id.toString() === id)
  );

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isEdit && existingStudent) {
      setFormData(existingStudent);
    }
  }, [isEdit, existingStudent]);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.includes('@')) newErrors.email = 'Invalid email';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    if (isEdit) {
      dispatch(updateStudent({ ...formData, id: parseInt(id) }));
    } else {
      const newId = Math.floor(Math.random() * 10000);
      dispatch(addStudent({ ...formData, id: newId }));
    }

    navigate('/');
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center">
          {isEdit ? 'Edit Student' : 'Add Student'}
        </h2>

        {/* Name */}
        <label className="block mb-2 font-medium">Name</label>
        <input
          type="text"
          className="w-full p-2 border rounded-md mb-1 focus:outline-none focus:ring-2 focus:ring-blue-300"
          value={formData.name}
          onChange={e => setFormData({ ...formData, name: e.target.value })}
        />
        {errors.name && <p className="text-red-500 text-sm mb-3">{errors.name}</p>}

        {/* Email */}
        <label className="block mb-2 font-medium">Email</label>
        <input
          type="email"
          className="w-full p-2 border rounded-md mb-1 focus:outline-none focus:ring-2 focus:ring-blue-300"
          value={formData.email}
          onChange={e => setFormData({ ...formData, email: e.target.value })}
        />
        {errors.email && <p className="text-red-500 text-sm mb-3">{errors.email}</p>}

        {/* Phone */}
        <label className="block mb-2 font-medium">Phone</label>
        <input
          type="text"
          className="w-full p-2 border rounded-md mb-1 focus:outline-none focus:ring-2 focus:ring-blue-300"
          value={formData.phone}
          onChange={e => setFormData({ ...formData, phone: e.target.value })}
        />
        {errors.phone && <p className="text-red-500 text-sm mb-4">{errors.phone}</p>}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          {isEdit ? 'Update Student' : 'Add Student'}
        </button>
      </form>
    </div>
  );
};

export default StudentForm;
