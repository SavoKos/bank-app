import React, { useState } from 'react';
import useAuth from '../../context/AuthContext';
import Router from 'next/router';
import Image from 'next/image';
import Spinner from '../UI/Spinner';
import S from '../../styles/styledComponents';
import { database, storage } from '../../firebase';
import Icon from '../UI/Icon';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';

const Signup = props => {
  const [credentials, setCredentials] = useState({
    password: '',
    confirmPassword: '',
    email: '',
    name: '',
  });
  const [error, setError] = useState(undefined);
  const [selectedImage, setSelectedImage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [isImageUploaded, setIsImageUploaded] = useState(false);
  const { signup } = useAuth();
  console.log(selectedImage);
  const updateInputValueHandler = event => {
    setCredentials(prevState => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const updateProfileHandler = userData => {
    const updateUser = userData.updateProfile({
      displayName: credentials.name,
      photoURL: credentials.photoURL || userData.photoURL || null,
    });
    const storeUserDatabase = database.ref('users/' + userData.uid).set({
      name: userData.displayName,
      email: userData.email,
      photoURL: credentials.photoURL || userData.photoURL,
    });

    Promise.all([updateUser, storeUserDatabase])
      .then(() => Router.replace('/cardeditor'))
      .catch(error => {
        console.log(error);
        setError(error.message);
        setLoading(false);
      });
  };

  const signupUser = () => {
    setLoading(true);
    signup(credentials.email, credentials.password)
      .then(user => updateProfileHandler(user.user))
      .catch(error => {
        console.log(error);
        setError(error.message);
        setLoading(false);
      });
  };

  const signupHandler = e => {
    e.preventDefault();
    if (credentials.password !== credentials.confirmPassword)
      return setError('Passwords do not match!');
    return signupUser();
  };

  const selectImage = e => {
    const image = e.target.files[0];
    console.log(image);

    // file format validity (only accepts jpg/jpeg/png)
    const idxDot = image.name.lastIndexOf('.') + 1;
    const extFile = image.name.substr(idxDot, image.name.length).toLowerCase();
    if (extFile !== 'jpg' && extFile !== 'jpeg' && extFile !== 'png')
      return setError('Only jpg/jpeg and png files are allowed!');

    if (image.size > 10000000)
      return setError('Image size must be less than 10MB');

    setError(undefined);
    setSelectedImage(image);
    setCredentials(prevCredentials => {
      return { ...prevCredentials, photoURL: null };
    });
  };

  const databaseUploadImageHandler = () => {
    setImageLoading(true);
    console.log(selectedImage);
    const fileRef = storage.ref(`images/${uuidv4()}`);
    fileRef
      .put(selectedImage)
      .then(() =>
        fileRef.getDownloadURL().then(url => {
          setImageLoading(false);
          setSelectedImage(false);
          setCredentials(prevCredentials => {
            return { ...prevCredentials, photoURL: url };
          });
        })
      )
      .catch(error => {
        setError(error.message);
        setImageLoading(false);
      });
  };

  let errorMessage = '';
  if (error) errorMessage = <p className="error-message">{error}</p>;

  if (loading) return <Spinner />;

  return (
    <>
      <div className="login-box-formbox">
        <div className="login-box-signup">
          Log in to existing account?
          <a onClick={props.toggleSignupActive}> Log in</a>
        </div>
        <div className="login-box-login">
          <h1>Welcome to Excellence Holdings</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta,
            laudantium dolorem?
          </p>
          <S.Form onSubmit={signupHandler}>
            <div>
              <label htmlFor="name"> Name</label>
              <input
                type="text"
                name="name"
                className="input-name"
                onChange={event => updateInputValueHandler(event)}
                required
              />
            </div>
            <div>
              <label htmlFor="email"> E-Mail</label>
              <input
                type="email"
                name="email"
                className="input-email"
                onChange={event => updateInputValueHandler(event)}
                required
              />
            </div>
            <div>
              <label htmlFor="password"> Password</label>
              <input
                type="password"
                name="password"
                className="input-password"
                onChange={event => updateInputValueHandler(event)}
                required
              />
            </div>
            <div>
              <label htmlFor="confirmPassword"> Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                className="input-password"
                onChange={event => updateInputValueHandler(event)}
                required
              />
            </div>
            <S.InputImage>
              <label htmlFor="img-upload" className="image-upload">
                <Icon
                  type={
                    credentials.photoURL
                      ? 'icon-tick'
                      : 'icon-LC_icon_user_line_1'
                  }
                  className={credentials.photoURL && 'uploaded'}
                />
                {credentials.photoURL ? 'Picture Uploaded' : 'Profile Picture'}
              </label>
              <input
                id="img-upload"
                type="file"
                onChange={selectImage}
                accept="image/*"
              />
              {selectedImage && (
                <S.UploadButton
                  onClick={databaseUploadImageHandler}
                  disabled={imageLoading}
                >
                  {imageLoading ? <S.ImageSpinner /> : 'Upload'}
                </S.UploadButton>
              )}
            </S.InputImage>
            {errorMessage}
            <div>
              <S.BlueButton className="login-btn">Sign Up</S.BlueButton>
            </div>
          </S.Form>
        </div>
      </div>
      <div className="login-box-quotebox">
        <Image src="/loginLogo.png" height={193} width={150} className="logo" />
        <h1>Excellence Holdings</h1>
        <h1 className="quote">Make it happen.</h1>
      </div>
    </>
  );
};
export default Signup;

// -------------------------------------------------- styling ----------------------------------------------
S.InputImage = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  input[type='file'] {
    display: none;
  }
  .image-upload {
    border: 1px solid #ccc;
    display: inline-block;
    padding: 6px 12px;
    cursor: pointer;
    display: flex;
    align-items: center;
    left: 0;
    position: static;
  }

  .anticon {
    margin-right: 10px;

    &.uploaded {
      color: #009600;
    }
  }
`;

S.UploadButton = styled(S.BlueButton)`
  position: relative;
  font-size: 14px;
  padding: 6px 12px;
  margin: 0;
`;

S.ImageSpinner = styled(S.Spinner)`
  min-width: 20px !important;
  min-height: 20px !important;
  border: 2px solid ${({ theme }) => theme.colors.lightBlue} !important;
  border-right: 2px solid #fff !important;
`;
