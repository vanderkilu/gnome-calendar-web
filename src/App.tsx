import React from "react";
import Home from "./views/Home";
import "./index.css";
import { EventProvider } from "./contexts/event";

function App() {
  return (
    <>
      <EventProvider>
        <Home />
      </EventProvider>
    </>
  );
}

export default App;
