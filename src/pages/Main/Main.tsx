import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import UserData from '../../components/UserData/UserData';

export default function Main() {
  const firstFormData = useSelector(
    (state: RootState) => state.formSliceReducer.firstForm
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
          {firstFormData &&
            firstFormData.map((data, index) => (
              <UserData
                id={index + 1}
                formData={data}
                key={index}
                isLast={index === lastAddedFirstFormId}
              />
            ))}
        </div>
        <h2>Second Form Data</h2>
      </div>
    </div>
  );
}
