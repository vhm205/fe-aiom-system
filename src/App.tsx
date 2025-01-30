import './assets/scss/themes.scss';
import RouteIndex from 'Routes/Index';

import fakeBackend from "./helpers/AuthType/fakeBackend";

fakeBackend();

function App() {
  return (
    <RouteIndex />
  );
}

export default App;
