import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import BriefIndex from "@/pages/BriefIndex";
import BriefEditionPage from "@/pages/BriefEdition";
import ResumePage from "@/pages/Resume";

const AdminPage = lazy(() => import("@/pages/Admin"));

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="brief" element={<BriefIndex />} />
          <Route path="brief/:slug" element={<BriefEditionPage />} />
          <Route path="resume" element={<ResumePage />} />
          <Route
            path="admin"
            element={
              <Suspense fallback={null}>
                <AdminPage />
              </Suspense>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
