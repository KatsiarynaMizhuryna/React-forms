import { createSlice } from '@reduxjs/toolkit';
import { Form } from '../../models/Form';
import countries from '../../models/Countries';

interface FormsState {
  UncontrolledForm:Form[];
  ControlledForm: Form[];
  lastAddedFirstFormId: number | null;
  lastAddedSecondFormId: number | null;   
  countries: string [];
}

const initialState: FormsState = {
  UncontrolledForm: [],
  ControlledForm: [],
  lastAddedFirstFormId: null,
  lastAddedSecondFormId: null,  
  countries: countries,
};

const formSlice = createSlice({
  name: 'forms',
  initialState,

  reducers: {
    addUncontrolledFormData: (state, action) => {
      state.UncontrolledForm.push(action.payload);
      state.lastAddedFirstFormId = state.UncontrolledForm.length - 1;
    },
    addControlledFormData: (state, action) => {
      state.ControlledForm.push(action.payload);
      state.lastAddedSecondFormId = state.ControlledForm.length - 1; 
    },    
    setCountries: (state, action) => {
      state.countries = action.payload;
    },
  },
});

export const { addUncontrolledFormData, addControlledFormData, setCountries } = formSlice.actions;
export  const formSliceReducer = formSlice.reducer;
