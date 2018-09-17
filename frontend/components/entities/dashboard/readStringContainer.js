import ReadString from './readString';
import {drizzleConnect} from 'drizzle-react';

const mapStateToProps = state => {
  return {
    drizzleState: state
  }
}

export default drizzleConnect(ReadString, mapStateToProps);
