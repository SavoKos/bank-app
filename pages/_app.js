import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { AuthProvider } from '../context/AuthContext';

const theme = {
  colors: {
    primary: '#e9e9ed',
    secondary: '#7c8ea4',
    activePage: '#3e7eff',
    green: '#0ac468',
    purple: '#af52de',
    blue: '#5ac8fa',
    black: '#141a1e',
    title: '#141736',
  },
};

const GlobalStyle = createGlobalStyle`
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
}

html {
  scroll-behavior: smooth;
}

a {
  text-decoration: none;
  color: inherit;
}

p{
  color: ${theme.colors.secondary};
  font-weight: 500;
}

h1{
  color: ${theme.colors.title}
}
`;

const App = ({ Component, pageProps }) => {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </ThemeProvider>
    </>
  );
};

export default App;
