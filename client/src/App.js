import React from "react";
import "./App.css";
import Homepage from "./components/homepage";
import InboxPage from "./components/inbox";
import Message from "./components/mail";
import Footer from "./components/footer";
import NotFound from "./components/notfound";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Homepage />} />
          <Route exact path="/inbox" element={<InboxPage />} />
          <Route exact path="/mail" element={<Message />} />
          <Route exact path="/*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
