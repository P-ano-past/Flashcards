import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useHead } from "../../Context/HeadContext";

const appTitle = "PrepWise";

const titleMap: Record<string, string> = {
  "/": `Home | ${appTitle}`,
  "/thanks": `Thanks! | ${appTitle}`,
};

export default function TitleUpdater() {
  const location = useLocation();
  const { setTitle } = useHead();

  useEffect(() => {
    const newTitle = titleMap[location.pathname] || appTitle;
    setTitle(newTitle);
  }, [location.pathname, setTitle]);

  return null;
}
