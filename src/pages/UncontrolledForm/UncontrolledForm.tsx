import { useDispatch } from 'react-redux';
import styles from './UncontrolledForm.module.css'
import { useNavigate } from 'react-router-dom';
import { useRef, useState } from 'react';
import { addUncontrolledFormData } from '../../store/forms/formsSlice';
import { schema } from '../../models/ValidationSchema';
import * as Yup from 'yup';
import convertToBase64 from '../../utils/convertToBase64';
import getPasswordStrength from '../../utils/getPasswordStrength';
import countries from '../../models/Countries';

export default function UncontrolledForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [passwordStrength, setPasswordStrength] = useState<string>('');
  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const genderRef = useRef<HTMLSelectElement>(null);
  const termsRef = useRef<HTMLInputElement>(null);
  const pictureRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLInputElement>(null);

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const password = event.target.value;
    setPasswordStrength(getPasswordStrength(password));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formValues = {
      name: nameRef.current?.value || '',
      age: ageRef.current?.valueAsNumber || 0,
      email: emailRef.current?.value || '',
      password: passwordRef.current?.value || '',
      confirmPassword: confirmPasswordRef.current?.value || '',
      gender: genderRef.current?.value,
      acceptTerms: termsRef.current?.checked || false,
      picture: pictureRef.current?.files?.[0] ?? null,
      country: countryRef.current?.value || '',
    };

    try {
      await schema.validate(formValues, { abortEarly: false });
      let pictureBase64: string | null = null;
      if (formValues.picture) {
        pictureBase64 = await convertToBase64(formValues.picture as File);
      }
      dispatch(
        addUncontrolledFormData({
          ...formValues,
          picture: pictureBase64,
        })
      );
      navigate('/');
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const newErrors: Record<string, string> = err.inner.reduce(
          (acc: Record<string, string>, error: Yup.ValidationError) => {
            acc[error.path || ''] = error.message;
            return acc;
          },
          {}
        );
        setErrors(newErrors);
      } else {
        console.error('Unexpected error:', err);
      }
    }
  };
  return (
    <div className={styles.form_container}>
      <form id="userForm" onSubmit={handleSubmit}>
        <div className={styles.form_group}>
          <label htmlFor="name">Name</label>
          <input
            ref={nameRef}
            className={`${styles.control} ${
              errors.name ? styles.error_input : ''
            }`}
            type="text"
            id="name"
            name="name"
            placeholder="Enter your name"
            required
          />
          {errors.name && <div className={styles.error}>{errors.name}</div>}
        </div>
        <div className={styles.form_group}>
          <label htmlFor="age">Age</label>
          <input
            ref={ageRef}
            className={`${styles.control} ${
              errors.age ? styles.error_input : ''
            }`}
            type="number"
            id="age"
            name="age"
            placeholder="Enter your age"
            min="0"
            required
          />
          {errors.age && <div className={styles.error}>{errors.age}</div>}
        </div>

        <div className={styles.form_group}>
          <label htmlFor="email">Email</label>
          <input
            ref={emailRef}
            className={`${styles.control} ${
              errors.email ? styles.error_input : ''
            }`}
            type="email"
            placeholder="Enter your email"
            required
          />
          {errors.email && <div className={styles.error}>{errors.email}</div>}
        </div>
        <div className={styles.form_group_inline}>
          <div className={styles.form_group}>
            <label htmlFor="password">Password</label>
            <input
              ref={passwordRef}
              className={`${styles.control} ${
                errors.password ? styles.error_input : ''
              }`}
              type="password"
              placeholder="Enter your password"
              onChange={handlePasswordChange}
              required
            />
            {errors.password && (
              <div className={styles.error}>{errors.password}</div>
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
            ref={confirmPasswordRef}
            className={`${styles.control} ${
              errors.confirmPassword ? styles.error_input : ''
            }`}
            type="password"
            placeholder="Confirm your password"
            required
          />
          {errors.confirmPassword && (
            <div className={styles.error}>{errors.confirmPassword}</div>
          )}
        </div>
        <div className={styles.form_group}>
          <label htmlFor="gender">Gender:</label>
          <select
            id="gender"
            name="gender"
            ref={genderRef}
            className={`${styles.control} ${
              errors.gender ? styles.error_input : ''
            }`}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          {errors.gender && <div className={styles.error}>{errors.gender}</div>}
        </div>

        <div className={styles.form_group}>
          <label htmlFor="terms">
            <input
              className={styles.control}
              type="checkbox"
              ref={termsRef}
              required
            />{' '}
            I accept the Terms and Conditions
          </label>
          {errors.acceptTerms && (
            <div className={styles.error}>{errors.acceptTerms}</div>
          )}
        </div>

        <div className={styles.form_group}>
          <label htmlFor="picture">Upload Picture</label>
          <input
            className={`${styles.control} ${
              errors.picture ? styles.error_input : ''
            }`}
            type="file"
            ref={pictureRef}
            accept=".png, .jpeg, .jpg"
            required
          />
          {errors.picture && (
            <div className={styles.error}>{errors.picture}</div>
          )}
        </div>
        <div className={styles.form_group}>
          <label htmlFor="country">Country</label>
          <input
            className={styles.control}
            list="countries"
            ref={countryRef}
            placeholder="Select your country"
            required
          />
          <datalist id="countries">
            {countries.map((country, index) => (
              <option key={index} value={country} />
            ))}
          </datalist>
          {errors.country && (
            <div className={styles.error}>{errors.country}</div>
          )}
        </div>
        <button type="submit" className={styles.submit_btn} id="submitBtn">
          Create Account
        </button>
      </form>
    </div>
  );
}
