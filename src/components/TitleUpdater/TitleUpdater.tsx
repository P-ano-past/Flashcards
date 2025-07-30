import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const appTitle = "PrepWise";

const titleMap: Record<string, string> = {
  "/": `Home | ${appTitle}`,
  "/thanks": `Thanks! | ${appTitle}`,
};

export default function TitleUpdater() {
  const location = useLocation();

  useEffect(() => {
    document.title = titleMap[location.pathname] || "MyApp";
  }, [location.pathname]);

  return null;
}
