import { createSlice } from '@reduxjs/toolkit';
import { Form } from '../../models/Form';

interface FormsState {
  firstForm:Form[];
  secondForm: Form[];
  lastAddedFirstFormId: number | null;
  lastAddedSecondFormId: number | null;   
  countries: string [];
}

const initialState: FormsState = {
  firstForm: [],
  secondForm: [],
  lastAddedFirstFormId: null,
  lastAddedSecondFormId: null,  
  countries: [],
};

const formSlice = createSlice({
  name: 'forms',
  initialState,

  reducers: {
    addFirstFormData: (state, action) => {
      state.firstForm.push(action.payload);
      state.lastAddedFirstFormId = state.firstForm.length - 1;
    },
    addSecondFormData: (state, action) => {
      state.secondForm.push(action.payload);
      state.lastAddedSecondFormId = state.secondForm.length - 1; 
    },    
    setCountries: (state, action) => {
      state.countries = action.payload;
    },
  },
});

export const { addFirstFormData, addSecondFormData, setCountries } = formSlice.actions;
export  const formSliceReducer = formSlice.reducer;
