import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./slices";
// import { PostHogProvider } from "posthog-js/react";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.REACT_APP_ENV !== "production",
});

// const options = {
//   api_host: process.env.REACT_APP_PUBLIC_POSTHOG_HOST!,
// };

root.render(
  <React.StrictMode>
    {/* <PostHogProvider
      apiKey={process.env.REACT_APP_PUBLIC_POSTHOG_KEY!}
      options={options}
    > */}
    <Provider store={store}>
      <BrowserRouter
        basename={process.env.PUBLIC_URL}
        future={{
          v7_relativeSplatPath: true,
        }}
      >
        <App />
      </BrowserRouter>
    </Provider>
    {/* </PostHogProvider> */}
  </React.StrictMode>
);
