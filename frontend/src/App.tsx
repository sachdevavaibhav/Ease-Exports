import { MantineProvider} from '@mantine/core';
import {Navbar} from './Navbar/Navbar'
import { Hero } from './Hero/Hero';
import { Login } from './Login/Login';
import { SignUp } from './SignUp/SignUp';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

export default function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Router>
          <Navbar/>
          <Routes>
            <Route path="/" element={<Hero/>}></Route>
            <Route path="/login" element={<Login/>}></Route>
            <Route path="/signup" element={<SignUp/>}></Route>
          </Routes>
      </Router>
    </MantineProvider>
  );
}