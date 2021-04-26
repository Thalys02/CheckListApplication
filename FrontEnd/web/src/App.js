import React from "react";
import "./global.css";
import Routes from "./routes";
import { ToastProvider } from "react-toast-notifications";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  
  return (
    <ToastProvider autoDismiss={true} autoDismissTimeout={2000}>
      <Routes />;
    </ToastProvider>
  ); 
}

export default App;
