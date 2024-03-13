import { Routes, Route } from "react-router-dom";
import { DynamicItem, Sidebar, dummyData } from "./components";
import Navbar from "./components/Navbar/Navbar";
import "./App.css";
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div id="main">
      
      <Sidebar>
      <Navbar />
        <Routes>
          <Route path="/" element={<DynamicItem page="homepage" />} />
          {dummyData &&
            dummyData.map((item, index) => (
              <Route
                key={index}
                path={item.path}
                element={<DynamicItem page={item} />}
              />
            ))}
        </Routes>
        <ToastContainer />
      </Sidebar>
    </div>
  );
}

export default App;
