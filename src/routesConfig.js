import React, { Suspense, lazy } from "react";

const SequenceDiagram = lazy(() => import("./pagestrial/mermaid/SequenceDiagram"));
const Trail1 = lazy(() => import("./pagestrial/reactflowchart/Trail1"));
const Trail2 = lazy(() => import("./pagestrial/reactflowchart/Trail2"));

export const routesConfig = [
  {
    path: "/diagram",
    component: SequenceDiagram,
  },
  {
    path: "/trail1",
    component: Trail1,
  },
  {
    path: "/trail2",
    component: Trail2,
  },
];