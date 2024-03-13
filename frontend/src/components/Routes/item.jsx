import { Link } from "react-router-dom";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";

const Item = (props) => {
  const { page } = props;
  if (page === "homepage") {
    return <div id="page">{page}</div>;
  } else {
    return (
      <div id="page">
        <Link to="/">
        </Link>
        <page.component></page.component>
      </div>
    );
  }
};

export default Item;
