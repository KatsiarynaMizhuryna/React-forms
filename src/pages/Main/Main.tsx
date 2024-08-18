import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import UserData from '../../components/UserData/UserData';
import styles from './Main.module.css'

export default function Main() {
  const UncontrolledFormData = useSelector(
    (state: RootState) => state.formSliceReducer.UncontrolledForm
  );
  const ControlledFormData = useSelector(
    (state: RootState) => state.formSliceReducer.ControlledForm
  );
  const lastAddedUncontrolledFormId = useSelector(
    (state: RootState) => state.formSliceReducer.lastAddedUncontrolledFormId
  );
  const lastAddedControlledFormId = useSelector(
    (state: RootState) => state.formSliceReducer.lastAddedControlledFormId
  );
  
  return (
    <div className={styles.mainContainer}>    
    <div className={styles.formSection}>
      <h2 className={styles.sectionTitle}>Uncontrolled Form Data</h2>
      {UncontrolledFormData && UncontrolledFormData.length > 0 ? (
        UncontrolledFormData.map((data, index) => (
          <UserData
            id={index + 1}
            formData={data}
            key={index}
            isLast={index === lastAddedUncontrolledFormId}
          />
        ))
      ) : (
        <p className={styles.noData}>No data available</p>
      )}
    </div>
    <div className={styles.formSection}>
      <h2 className={styles.sectionTitle}>Controlled Form Data</h2>
      {ControlledFormData && ControlledFormData.length > 0 ? (
        ControlledFormData.map((data, index) => (
          <UserData
            id={index + 1}
            formData={data}
            key={index}
            isLast={index === lastAddedControlledFormId}
          />
        ))
      ) : (
        <p className={styles.noData}>No data available</p>
      )}
    </div>
  </div>
  );
}
