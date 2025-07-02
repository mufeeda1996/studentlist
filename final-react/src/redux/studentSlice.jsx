import { createSlice } from '@reduxjs/toolkit';

const studentSlice = createSlice({
  name: 'student',
  initialState: {
    students: [],
  },
  reducers: {
    setStudents: (state, action) => {
      state.students = action.payload;
    },
    addStudent: (state, action) => {
      state.students.push(action.payload);
    },
    updateStudent: (state, action) => {
      const index = state.students.findIndex(s => s.id === action.payload.id);
      if (index !== -1) state.students[index] = action.payload;
    },
    deleteStudent: (state, action) => {
      state.students = state.students.filter(s => s.id !== action.payload);
    }
  }
});

export const { setStudents, addStudent, updateStudent, deleteStudent } = studentSlice.actions;
export default studentSlice.reducer;
