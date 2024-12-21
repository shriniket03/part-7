import { useParams } from 'react-router-dom'

const Single = ({anecdotes}) => {
    const id = useParams().id
    const anecdote = anecdotes.find(n=>n.id===Number(id))
    return (
        <div>
            <h1>{anecdote.content}</h1>
            <p>{`has ${anecdote.votes} votes`}</p>
            <p>{`for more info, see`}  <a href={anecdote.info}>{anecdote.info}</a></p>
        </div>
    )
}

export default Single