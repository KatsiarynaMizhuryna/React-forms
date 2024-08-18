import { useDispatch } from 'react-redux';
import styles from './ControlledForm.module.css'
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { addControlledFormData } from '../../store/forms/formsSlice';
import { schema, FormData } from '../../models/ValidationSchema';
import convertToBase64 from '../../utils/convertToBase64';
import getPasswordStrength from '../../utils/getPasswordStrength';
import countries from '../../models/Countries';

export default function ControlledForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },    
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const password = watch('password') || '';

  const onSubmit = async (data: FormData) => {
    try {    
      let pictureBase64: string | null = null;      
      if (data.picture) {
        pictureBase64 = await convertToBase64((data.picture as File[])[0]);
      }data
      dispatch(
        addControlledFormData({
          ...data,
          picture: pictureBase64,
        })
      );
      navigate('/');
    } catch (err) {
      console.error('Unexpected error:', err);
    }
  };

  const passwordStrength = password ? getPasswordStrength(password) : '';

  return (
    <div className={styles.form_container}>
      <form id="userForm" onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.form_group}>
          <label htmlFor="name">Name</label>
          <input
            {...register('name')}
            className={`${styles.control} ${
              errors.name ? styles.error_input : ''
            }`}
            type="text"
            id="name"
            placeholder="Enter your name"
          />
          {errors.name && <div className={styles.error}>{errors.name.message}</div>}
        </div>

        <div className={styles.form_group}>
          <label htmlFor="age">Age</label>
          <input
            {...register('age')}
            className={`${styles.control} ${
              errors.age ? styles.error_input : ''
            }`}
            type="number"
            id="age"
            placeholder="Enter your age"
            min="0"
          />
          {errors.age && <div className={styles.error}>{errors.age.message}</div>}
        </div>

        <div className={styles.form_group}>
          <label htmlFor="email">Email</label>
          <input
            {...register('email')}
            className={`${styles.control} ${
              errors.email ? styles.error_input : ''
            }`}
            type="email"
            placeholder="Enter your email"
          />
          {errors.email && <div className={styles.error}>{errors.email.message}</div>}
        </div>

        <div className={styles.form_group_inline}>
          <div className={styles.form_group}>
            <label htmlFor="password">Password</label>
            <input
              {...register('password')}
              className={`${styles.control} ${
                errors.password ? styles.error_input : ''
              }`}
              type="password"
              placeholder="Enter your password"
            />
            {errors.password && (
              <div className={styles.error}>{errors.password.message}</div>
            )}
            <div id="passwordStrength">
              <span
                className={`${styles.strength_indicator} ${
                  passwordStrength === 'weak' ? styles.weak : ''
                }`}
              >
                Weak
              </span>
              <span
                className={`${styles.strength_indicator} ${
                  passwordStrength === 'medium' ? styles.medium : ''
                }`}
              >
                Medium
              </span>
              <span
                className={`${styles.strength_indicator} ${
                  passwordStrength === 'strong' ? styles.strong : ''
                }`}
              >
                Strong
              </span>
            </div>
          </div>
        </div>

        <div className={styles.form_group}>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            {...register('confirmPassword')}
            className={`${styles.control} ${
              errors.confirmPassword ? styles.error_input : ''
            }`}
            type="password"
            placeholder="Confirm your password"
          />
          {errors.confirmPassword && (
            <div className={styles.error}>{errors.confirmPassword.message}</div>
          )}
        </div>

        <div className={styles.form_group}>
          <label htmlFor="gender">Gender:</label>
          <select
            {...register('gender')}
            id="gender"
            className={`${styles.control} ${
              errors.gender ? styles.error_input : ''
            }`}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          {errors.gender && <div className={styles.error}>{errors.gender.message}</div>}
        </div>

        <div className={styles.form_group}>
          <label htmlFor="terms">
            <input
              {...register('acceptTerms')}
              className={styles.control}
              type="checkbox"
            />{' '}
            I accept the Terms and Conditions
          </label>
          {errors.acceptTerms && (
            <div className={styles.error}>{errors.acceptTerms.message}</div>
          )}
        </div>

        <div className={styles.form_group}>
          <label htmlFor="picture">Upload Picture</label>
          <input
            {...register('picture')}
            className={`${styles.control} ${
              errors.picture ? styles.error_input : ''
            }`}
            type="file"
            accept=".png, .jpeg, .jpg"
          />
          {errors.picture && (
            <div className={styles.error}>{errors.picture.message}</div>
          )}
        </div>

        <div className={styles.form_group}>
          <label htmlFor="country">Country</label>
          <input
            {...register('country')}
            className={styles.control}
            list="countries"
            placeholder="Select your country"
          />
          <datalist id="countries">
            {countries.map((country, index) => (
              <option key={index} value={country} />
            ))}
          </datalist>
          {errors.country && <div className={styles.error}>{errors.country.message}</div>}
        </div>

        <button type="submit" className={styles.submit_btn} id="submitBtn" disabled={!isValid}>
          Create Account
        </button>
      </form>
    </div>
  );
}
