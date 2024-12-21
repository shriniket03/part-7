import Row from "./Row";
import { useSelector } from 'react-redux'

const Users = () => {
  const users = useSelector(state=>state.users)
  if (!users) {
    return null
  }
  const blogs = useSelector(state=>state.blogs)
  return (
    <div>
      <h1>Users</h1>
      <table>
        <tr>
            <th></th>
            <th>blogs created</th>
        </tr>
        {users.map((user) => (
          <Row
            name={user.name}
            num={blogs.filter((blog) => blog.users.id === user.id).length}
            id={user.id}
          />
        ))}
      </table>
    </div>
  );
};

export default Users;
