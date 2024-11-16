import { Outlet } from "react-router-dom";
const Layout = () => {
  return (
    <section className="h-dvh flex flex-col justify-between pb-3 px-4 ">
      
      <Outlet />

    </section>
  )
}

export default Layout