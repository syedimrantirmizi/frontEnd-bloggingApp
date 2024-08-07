import { Route, Routes } from "react-router-dom";
import "./App.css";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Otp from "./pages/Otp";
import Account from "./pages/Account";
import Authroutes from "./routes/Authroutes";
import Protectedroutes from "./routes/Protectedroutes";

function App() {
  return (
    <>
      <Routes>
        <Route element={<Authroutes />}>
          <Route index element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Route>
        <Route element={<Protectedroutes />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/otp" element={<Otp />} />
          <Route path="/account" element={<Account />} />
        </Route>
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </>
  );
}

export default App;
