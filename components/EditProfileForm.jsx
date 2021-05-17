import { useState, useEffect } from 'react';
import S from '../styles/styledComponents';
import styled from 'styled-components';
import Modal from './UI/Modal';

const EditProfileForm = ({
  currentUser,
  initialCredentials,
  filterChangedCredentials,
  error,
  setUpdatedCredentials,
  isRedirecting,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [modalActive, setModalActive] = useState(false);
  const [credentials, setCredentials] = useState({
    name: currentUser['displayName'] || '',
    email: currentUser['email'] || '',
    password: '',
    photoURL: currentUser['photoURL'] || '',
    confirmPassword: '',
  });
  const inputStyle = isEditing ? { color: '#000' } : { color: '#bebebe' };
  console.log(isEditing, isRedirecting);
  const editHandler = e => {
    e.preventDefault();
    setIsEditing(true);
  };

  useEffect(() => {
    const storeInitialCredentials = initialCredentials(credentials);
    return storeInitialCredentials;
  }, []);

  useEffect(() => {
    setUpdatedCredentials(credentials);
  }, [credentials]);

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

  const updateProfileHandler = () => {
    setIsEditing(false);
    setModalActive(false);
    filterChangedCredentials(credentials);
  };

  let errorMessage = '';

  if (error) errorMessage = <p className="error-message">{error}</p>;

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
            disabled={isRedirecting || !isEditing}
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
            disabled={isRedirecting || !isEditing}
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
            disabled={isRedirecting || !isEditing}
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
            disabled={isRedirecting || !isEditing}
            type="password"
            name="confirmPassword"
            value={credentials.confirmPassword}
            className="input-password"
            onChange={event => updateInputValueHandler(event)}
            style={inputStyle}
          />
        </div>
        {errorMessage}
        <div>{button}</div>
      </S.Form>
      <Modal active={modalActive} closeModal={() => setModalActive(false)}>
        <h1 style={{ color: '#fff' }}>
          Are you sure you want to apply changes? <br />
        </h1>
        <S.ButtonsContainer>
          <S.BlueButton type="blue" onClick={updateProfileHandler}>
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
