import { useStore } from 'react-redux';
import { firestoreAuth } from '../firebase';
import { useEffect, useState } from 'react';
import { userLogin, userLogout } from '../store/user';

const AuthRoute = () => {
  const [statAuth, setState] = useState({
    authenticated: false,
    loadingAuth: true
  });
  const store = useStore();
  useEffect(() => {
    firestoreAuth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          const { claims } = await firestoreAuth.currentUser.getIdTokenResult();
          store.dispatch(userLogin(claims));
          setState({ authenticated: true, loadingAuth: false });
        } catch (error) {
          store.dispatch(userLogout());
          setState({ authenticated: false, loadingAuth: false });
        }
      } else {
        store.dispatch(userLogout());
        setState({
          authenticated: false,
          loadingAuth: false
        });
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return [statAuth.authenticated, statAuth.loadingAuth];
};

export default AuthRoute;
