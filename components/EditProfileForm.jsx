import { useState, useRef, useEffect } from 'react';
import S from '../styles/styledComponents';
import styled from 'styled-components';
import Modal from './UI/Modal';
import { validation } from './Auth/validation';

const EditProfileForm = ({
  currentUser,
  initialCredentials,
  updateCredentials,
  dbError,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [modalActive, setModalActive] = useState(false);
  const [inputError, setInputError] = useState([]);
  const [credentials, setCredentials] = useState({
    name: currentUser['displayName'] || '',
    email: currentUser['email'] || '',
    phone: currentUser['phoneNumber'] || '',
    password: '',
    confirmPassword: '',
  });
  const inputStyle = isEditing ? { color: '#000' } : { color: '#bebebe' };

  const editHandler = e => {
    e.preventDefault();
    setIsEditing(true);
  };

  useEffect(() => {
    const storeInitialCredentials = initialCredentials(credentials);
    return storeInitialCredentials;
  }, []);

  const updateInputValueHandler = event => {
    setCredentials(prevState => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const saveHandler = e => {
    e.preventDefault();
    setModalActive(true);
  };

  const updateCredentialsHandler = credentials => {
    setIsEditing(false);
    setInputError([]);
    updateCredentials(credentials);
  };

  const validateInput = credentials => {
    setModalActive(false);
    const error = validation(credentials);
    if (error.length > 0) return setInputError(error);
    return updateCredentialsHandler(credentials);
  };

  let error = '';
  if (inputError !== [])
    error = inputError.map(errorMessage => (
      <p key={errorMessage} className="error-message">
        {errorMessage}
      </p>
    ));

  if (dbError) error = <p className="error-message">{dbError}</p>;

  let button = <S.BlueButton onClick={editHandler}>Edit</S.BlueButton>;
  if (isEditing)
    button = <S.BlueButton onClick={saveHandler}>Save</S.BlueButton>;
  console.log(modalActive);
  return (
    <>
      <S.Form>
        <div>
          <label htmlFor="name"> Name</label>
          <input
            disabled={!isEditing}
            type="text"
            name="name"
            className="input-name"
            value={credentials.name}
            onChange={event => updateInputValueHandler(event)}
            style={inputStyle}
          />
        </div>
        <div>
          <label htmlFor="email"> E-Mail</label>
          <input
            disabled={!isEditing}
            type="email"
            name="email"
            value={credentials.email}
            className="input-email"
            onChange={event => updateInputValueHandler(event)}
            style={inputStyle}
          />
        </div>
        <div>
          <label htmlFor="password"> Password</label>
          <input
            disabled={!isEditing}
            type="password"
            name="password"
            value={credentials.password}
            className="input-password"
            onChange={event => updateInputValueHandler(event)}
            style={inputStyle}
          />
        </div>
        <div>
          <label htmlFor="confirmPassword"> Confirm Password</label>
          <input
            disabled={!isEditing}
            type="password"
            name="confirmPassword"
            value={credentials.confirmPassword}
            className="input-password"
            onChange={event => updateInputValueHandler(event)}
            style={inputStyle}
          />
        </div>
        {error}
        <div>{button}</div>
      </S.Form>
      <Modal active={modalActive} closeModal={() => setModalActive(false)}>
        <h1 style={{ color: '#fff' }}>
          Are you sure you want to apply changes? <br />
        </h1>
        <S.ButtonsContainer>
          <S.BlueButton
            onClick={() => {
              validateInput(credentials);
            }}
            type="blue"
          >
            Apply
          </S.BlueButton>
          <S.RedButton onClick={() => setModalActive(false)} type="red">
            Cancel
          </S.RedButton>
        </S.ButtonsContainer>
      </Modal>
    </>
  );
};

S.Form = styled(S.Form)`
  margin-top: 70px;
  width: 70%;
`;

export default EditProfileForm;
