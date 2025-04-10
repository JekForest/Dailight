import { Suspense } from "react";
import { Routes, Route, useNavigate, useLocation, useParams, useSearchParams } from "react-router-dom";
import routes from "./routes";
import { DotLoading, SpinLoading } from "antd-mobile";

const Element = function Element(props) {
  let { component: Component, meta } = props;

  let { title = "Dailight" } = meta || {};
  document.title = title;   //页面标题

  const navigate = useNavigate(),
    location = useLocation(),
    params = useParams(),
    [usp] = useSearchParams();

  return <Component
    navigate={navigate}
    location={location}
    params={params}
    usp={usp}
  />;
};

export default function RouterView() {
  return <Suspense fallback={<SpinLoading color="default" className="adm-spin-loading" />}>
    <Routes>
      {routes.map(item => {
        let { name, path } = item;
        return <Route
          key={name}
          path={path}
          element={
            <Element {...item} />
          }
        />;
      })}
    </Routes>
  </Suspense>;
}