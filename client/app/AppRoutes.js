import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import AuthForm from '../features/auth/AuthForm';
import Home from '../features/home/Home';
import { clientMe } from './store';
import ClientRequests from '../features/requests/ClientRequests';


/**
 * COMPONENT
 */

const AppRoutes = () => {
  const isLoggedIn = false
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clientMe());
  }, []);

  return (
    <div>
      {isLoggedIn ? (
        <Routes>
          <Route path="/*" element={<Home />} />
          <Route to="/home" element={<Home />} />
        </Routes>
      ) : (
        <Routes>
          <Route
            path="/*"
            element={<AuthForm name="login" displayName="Login" />}
          />
          <Route
            path="/login"
            element={<AuthForm name="login" displayName="Login" />}
          />
          <Route
            path="/signup"
            element={<AuthForm name="signup" displayName="Sign Up" />}
          />
          {/* CLIENT REQUESTS */}
          <Route
            path="/:projectId/requests"
            element={<ClientRequests />}
          />
        </Routes>
      )}
    </div>
  );
};

export default AppRoutes;
