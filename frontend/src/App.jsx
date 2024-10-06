import { Routes, Route, Navigate } from "react-router-dom";
import FloatingShape from "./components/FloatingShape";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import EmailVerificationPage from "./pages/EmailVerificationPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import LoadingSpinner from "./components/LoadingSpinner";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/authStore";
import { useEffect } from "react";
import ResetPasswordPage from "./pages/ResetPasswordPage";

const ProtectedRoutes = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();
  console.log("ProtectedRoutes user: ", user);
  if (!isAuthenticated) {
    console.log("not authenticated");
    return <Navigate to="/login" replace />;
  }
  if (!user?.isVerified) {
    console.log("User verified: ", user);
    return <Navigate to="/verify-email" replace />;
  }
  return children;
};

const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();
  if (isAuthenticated && user?.isVerified) {
    return <Navigate to="/" replace />;
  }
  return children;
};

function App() {
  const { isCheckingAuth, isAuthenticated, checkAuth, user } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log("isAuthenticated: ", isAuthenticated);
  console.log("user from App: ", user);
  console.log("isVerified from App: ", user?.isVerified);
  if (isCheckingAuth) return <LoadingSpinner />;

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900 
    flex items-center justify-center relative overflow-hidden"
    >
      <FloatingShape
        color="bg-green-500"
        size="w-64 h-64"
        top="-5%"
        left="10%"
        delay={0}
      />
      <FloatingShape
        color="bg-emerald-500"
        size="w-48 h-48"
        top="70%"
        left="80%"
        delay={5}
      />
      <FloatingShape
        color="bg-lime-500"
        size="w-32 h-32"
        top="40%"
        left="-10%"
        delay={2}
      />

      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoutes>
              <HomePage />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/signup"
          element={
            <RedirectAuthenticatedUser>
              <SignupPage />
            </RedirectAuthenticatedUser>
          }
        />
        <Route
          path="/login"
          element={
            <RedirectAuthenticatedUser>
              <LoginPage />
            </RedirectAuthenticatedUser>
          }
        />
        <Route path="/verify-email" element={<EmailVerificationPage />} />
        <Route
          path="/forgot-password"
          element={
            <RedirectAuthenticatedUser>
              <ForgotPasswordPage />
            </RedirectAuthenticatedUser>
          }
        />
        <Route
          path="/reset-password/:token"
          element={
            <RedirectAuthenticatedUser>
              <ResetPasswordPage />
            </RedirectAuthenticatedUser>
          }
        />
        {/* Catch all routes */}
        <Route path="*" element={<Navigate to={"/"} replace />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
