import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div>
      <h1>Hello, Layout</h1> <Outlet />
    </div>
  );
}
