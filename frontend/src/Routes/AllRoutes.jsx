import { Route, Routes } from "react-router";
import Main from "../Layouts/Main";
import Home from "../Pages/Home";
import Event from "../Pages/Events";
import AddEvent from "../Pages/AddEvent";
import MyEvents from "../Pages/MyEvents";
import SignIn from "../Pages/SignIn";
import SignUp from "../Pages/SignUp";
import Error from "../Components/ErrorState/Error";
import PrivateRoute from './PrivateRoute';

const AllRoutes = () => {
  return (
    <Routes>
      <Route element={<Main />} errorElement={<Error />}>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Event />} />
        <Route
          path="/add-event"
          element={
            <PrivateRoute>
              <AddEvent />
            </PrivateRoute>
          }
        />
        <Route
          path="/my-events"
          element={
            <PrivateRoute>
              <MyEvents />
            </PrivateRoute>
          }
        />
      </Route>
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
};

export default AllRoutes;
