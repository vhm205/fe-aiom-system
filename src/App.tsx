import './assets/scss/themes.scss';
import { ToastContainer } from "react-toastify";
import RouteIndex from 'Routes/Index';

import fakeBackend from "./helpers/AuthType/fakeBackend";

fakeBackend();

function App() {
  return (
    <>
      <RouteIndex />
      <ToastContainer />
    </>
  );
}

export default App;
