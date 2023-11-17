import { useRouteMatch } from "react-router-dom";

function NotFound() {
  console.log(useRouteMatch());
  return <div>NotFound</div>;
}

export default NotFound;
