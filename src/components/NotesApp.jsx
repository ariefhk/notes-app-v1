import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RequiredAuthProvider from "../providers/RequiredAuthProvider";

export default function NotesApp() {
    return (
        <Routes>
            <Route path='/login' element={<LoginPage />} />
            <Route element={<RequiredAuthProvider />}>
                <Route path='/' element={<HomePage />} />
            </Route>
        </Routes>
    );
}
