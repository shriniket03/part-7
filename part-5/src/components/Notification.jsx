import { useSelector } from "react-redux";
import { Alert } from '@mui/material'
const Notification = () => {
  let style = null
  const notification = useSelector((state) => state.notification);
  if (notification.msg === undefined || notification.msg === null) {
    return null;
  }

  if (notification.type === "error") {
    style = "error"
  } else {
    style = "success"
  }

  // return <div style={style}>{notification.msg}</div>;
  return (
    <div>
      {notification.msg && <Alert variant="filled" severity={style}>{notification.msg}</Alert>}
    </div>
  );
};

export default Notification;
