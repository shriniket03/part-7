import {Link} from 'react-router-dom'

const Row = (props) => {
    return (
        <tr>
            <td>
                <Link to={`/users/${props.id}`}>{props.name}</Link>
            </td>
            <td>
                {props.num}
            </td>
        </tr>
    )
}

export default Row