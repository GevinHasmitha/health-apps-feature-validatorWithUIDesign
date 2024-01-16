import { Route, Routes } from "react-router-dom";
import { SelectedSampleProvider } from "../context/SelectedSampleContext";

interface SideNavItem {
  path: string;
  component: JSX.Element;
}

interface Props {
  items: SideNavItem[];
}

const AppRoutes = ({ items }: Props) => {
  return (
    <SelectedSampleProvider>
      <Routes>
        {items.map((item) => (
          <Route key={item.path} path={item.path} element={item.component} />
        ))}
      </Routes>
    </SelectedSampleProvider>
  );
};

export default AppRoutes;
