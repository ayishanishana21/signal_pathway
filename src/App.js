import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { Suspense } from "react";
import { routesConfig } from "./routesConfig.js";

function renderRoutes(routes) {
  return routes.map(({ path, component: Component, children }, i) => (
    <Route key={i} path={path} element={<Suspense fallback={<div>Loading...</div>}><Component /></Suspense>}>
      {children && renderRoutes(children)}
    </Route>
  ));
}

function App() {
  return (
    <Router>
      <Routes>{renderRoutes(routesConfig)}</Routes>
    </Router>
  );
}

export default App;