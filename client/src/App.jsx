import { useEffect } from 'react'
import './App.css'
import { Route, Routes } from 'react-router'
import { RouterAccount } from './route/RouterAccount/RouterAccount'
import axiosClient from './service/axiosClient'
import { UserAuthStore } from './store/userAuthStore'
import { API_GOOGLE } from './api/api'
import { RouterAdmin } from './route/RouterAdmin/RouterAdmin'
import { Toaster } from 'sonner'

function App() {
  const setAccessToken = UserAuthStore((s) => s.setAccessToken);
  useEffect(() => {
    const refresh = async () => {
      try {
        const res = await axiosClient.post("/api/refresh");
        setAccessToken(res.data.data.accessToken);
      } catch (err) {
        console.log("Không có refresh token hoặc đã hết hạn.");
      }
    };
    refresh();
  }, [setAccessToken]);
  useEffect(() => {
    const hash = window.location.hash;
    const params = new URLSearchParams(hash.substring(1));
    const access_token = params.get("access_token");
    console.log(access_token)
    if (!access_token) return;
    const getUserInfo = async () => {
      try {
        const res = await axiosClient.post(API_GOOGLE, { access_token });
        console.log("userrrrrrrrr", res)
        if (res.status === 200) {
          setAccessToken(res.data.data.accessToken)
          localStorage.setItem("user", JSON.stringify(res.data.data.user));
        }
      } catch (error) {
        console.error("Lỗi đăng nhập Google:", error);
      }
    }
    getUserInfo()
    window.history.replaceState(null, "", window.location.pathname);
  }, [])
  return (
    <>
      <Toaster />
      <Routes>
        <Route path='/*' element={<RouterAccount />} />
        <Route path='/admin/*' element={<RouterAdmin />} />
      </Routes>
    </>
  )
}

export default App
