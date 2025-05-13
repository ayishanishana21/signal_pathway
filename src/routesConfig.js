import React, { Suspense, lazy } from "react";

const SequenceDiagram = lazy(() => import("./components/PathwayTool"));


export const routesConfig = [
  {
    path: "/",
    component: SequenceDiagram,
  },

 
];