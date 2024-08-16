import { Form } from "../../models/Form"
import styles  from './UserData.module.css'

interface UserDataProps {
    formData: Form;
    id: number;
    isLast: boolean; 
  }

  const UserData: React.FC<UserDataProps> = ( { formData, id, isLast  } ) => {
    return (
        <div className={`${styles.container} ${isLast ? styles.lastAdded : ''}`}>
      <h1 className={styles.title}>{id}</h1>
      <div className={styles.info}>
        <div className={styles.info_item}>
          <strong>Name:</strong> <span>{formData.name}</span>
        </div>
        <div className={styles.info_item}>
          <strong>Age:</strong> <span>{formData.age}</span>
        </div>
        <div className={styles.info_item}>
          <strong>Email:</strong> <span>{formData.email}</span>
        </div>
        <div className={styles.info_item}>
          <strong>Gender:</strong> <span>{formData.gender}</span>
        </div>
        <div className={styles.info_item}>
          <strong>Country:</strong> <span>{formData.country}</span>
        </div>
        <div className={styles.info_item}>
          <strong>Picture:</strong> 
          <div className={styles.picture_container}>
            {formData.picture ? (
              <span className={styles.picture}>{(formData.picture).toString()}</span>
            ) : (
              <span>No picture uploaded</span>
            )}
          </div>
        </div>
      </div>
    </div>
    )
}

export default UserData