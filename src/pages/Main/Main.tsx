import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import UserData from '../../components/UserData/UserData';

export default function Main() {
  const UncontrolledFormData = useSelector(
    (state: RootState) => state.formSliceReducer.UncontrolledForm
  );
  const ControlledFormData = useSelector(
    (state: RootState) => state.formSliceReducer.ControlledForm
  );
  const lastAddedFirstFormId = useSelector(
    (state: RootState) => state.formSliceReducer.lastAddedFirstFormId
  );
  return (
    <div>
      <div>
        <h1>Main Page</h1>
        <div>
          <h2>First Form Data</h2>
          {UncontrolledFormData &&
            UncontrolledFormData.map((data, index) => (
              <UserData
                id={index + 1}
                formData={data}
                key={index}
                isLast={index === lastAddedFirstFormId}
              />
            ))}
        </div>
        <div>
          <h2>Controlled Form Data</h2>
          {ControlledFormData &&
            ControlledFormData.map((data, index) => (
              <UserData
                id={index + 1}
                formData={data}
                key={index}
                isLast={index === lastAddedFirstFormId}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
