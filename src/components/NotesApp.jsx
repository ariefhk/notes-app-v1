import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RequiredAuthProvider from "../providers/RequiredAuthProvider";
import AddNotePage from "../pages/AddNotePage";
import RegisterPage from "../pages/RegisterPage";

export default function NotesApp() {
    return (
        <Routes>
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
            <Route element={<RequiredAuthProvider />}>
                <Route path='/' element={<HomePage />} />
                <Route path='/add' element={<AddNotePage />} />
            </Route>
        </Routes>
    );
}
