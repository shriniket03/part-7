import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useField from '../hooks/index'

const Create = (props) => {  
  const [content,conres] = useField()
  const [author,autres] = useField()
  const [info,infres] = useField()

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    const stuff = content.value
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })
    navigate('/')
    props.setNotif(`a new anecdote ${stuff} has been created`)
    setTimeout(()=>props.setNotif(''), 5000)
  }

  const handleReset = (e) => {
    e.preventDefault()
    conres()
    autres()
    infres()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input name='content' {...content} />
        </div>
        <div>
          author
          <input name='author' {...author} />
        </div>
        <div>
          url for more info
          <input name='info' {...info} />
        </div>
        <button>create</button> <button onClick={handleReset}>reset</button>
      </form>
    </div>
  )

}

export default Create