import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Navbar from "./components/UI/Navbar";
import Home from "./pages/Home";
import AuthProvider from "./hooks/AuthProvider";
import AboutUs from "./pages/AboutUs";
import Footer from "./components/UI/Footer";
import Library from "./pages/Library";
import Register from "./pages/Register";
import TestPage from "./pages/TestPage";
import Store from "./pages/Store";
import Game from "./pages/Specific/Game";
import GameEdit from "./pages/Admin/Game/GameEdit";
import ControlPanelGame from "./pages/Admin/ControlPanelGame";
import AdminRoute from "./hooks/AdminRoute";
import UserEdit from "./pages/Admin/User/UserEdit";
import ControlPanelUser from "./pages/Admin/ControlPanelUser";
import Checkout from "./pages/Checkout";
import LoggedRoute from "./hooks/LoggedRoute";
import GameInsert from "./pages/Admin/Game/GameInsert";
import User from "./pages/Specific/User";
import UserInsert from "./pages/Admin/User/UserInsert";
import Community from "./pages/Community";

export default function App() {

  return (
    <main className="dark:bg-secondaryDark bg-[#E5E5E5] min-h-screen">
      <BrowserRouter>
        <AuthProvider>
          <Navbar></Navbar>
          <main className="dark:bg-secondaryDark max-w-screen  ">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/store" element={<Store />} />
              <Route path="/community" element={<Community />} />

              <Route path="/library" element={

                <LoggedRoute>
                  <Library />
                </LoggedRoute>


              } />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/game" element={<Game />} />
              <Route path="/register" element={<Register />} />
              <Route path="/test" element={<TestPage />} />

              <Route path="/login" element={<Login />} />

              <Route path="/checkout" element={<Checkout />} />



              { /* Admin Routes* */}
              <Route
                path="/admin/games"
                element={
                  <AdminRoute>
                    <ControlPanelGame />
                  </AdminRoute>
                }
              />
              <Route
                path="/admin/games/insert"
                element={
                  <AdminRoute>
                    <GameInsert />
                  </AdminRoute>
                }
              />

              <Route path="/admin/games/edit" element={
                <AdminRoute>
                  <GameEdit />
                </AdminRoute>
              } />

              <Route path="/admin/users" element={
                <AdminRoute>
                  <ControlPanelUser />
                </AdminRoute>
              } />
              <Route path="/admin/users/edit" element={
                <AdminRoute>
                  <UserEdit />
                </AdminRoute>
              } />
              <Route path="/admin/users/insert" element={
                <AdminRoute>
                  <UserInsert />
                </AdminRoute>
              } />

              <Route path="/user" element={
                <AdminRoute>
                  <User />
                </AdminRoute>
              } />
            </Routes>
          </main>
          <Footer></Footer>
        </AuthProvider>
      </BrowserRouter>
    </main>
  );
}
