import { connect } from "react-redux";
import Navbar from "./navbar";

const mapStateToProps = (state) => {
  return {
    account: state.network.account,
  };
};

export default connect(mapStateToProps, null)(Navbar);
