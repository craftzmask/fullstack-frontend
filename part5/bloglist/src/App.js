import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )  
  }, [])

  useEffect(() => {
    const userJSON = JSON.parse(
      window.localStorage.getItem('user')
    )
    if (userJSON) {
      setUser(userJSON)
      blogService.setToken(userJSON.token)
    }
  }, [])

  const handleLogin = async event => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'user', JSON.stringify(user)
      )
      blogService.setToken(user.token)

      setUser(user)
      setUsername('')
      setPassword('')
      createNotification('Logged in successfull', 'success')
    } catch (exception) {
      createNotification('Invalid username or password', 'error')
    }
  }

  const handleLogout = () => {
    localStorage.clear()
    createNotification('Log out successful', 'success')
    setUser(null)
  }

  const handleCreateBlog = async event => {
    event.preventDefault()

    try {
      const savedBlog = await blogService.create({
        title, author, url
      })

      setBlogs(blogs.concat(savedBlog))
      setTitle('')
      setAuthor('')
      setUrl('')
      createNotification(
        `${savedBlog.title} by ${savedBlog.author} added`,
        'success'
      )
    } catch (exception) {
      createNotification(
        'A blog must contain title, author and url',
        'error'
      )
    }

  }

  const createNotification = (message, messageType) => {
    setMessage(message)
    setMessageType(messageType)

    setTimeout(() => {
      setMessage('')
      setMessageType('')
    }, 5000)
  }

  if (user === null) {
    return (
      <div>
        <h2>log in to application</h2>
        <Notification 
          message={message}
          messageType={messageType}
        />
        <form onSubmit={handleLogin}>
          <div>
            username <input 
              type="text"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
              name="username"
            />
          </div>
          <div>
            password <input 
              type="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
              name="password"
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }

  const createBlogForm = () => (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleCreateBlog}>
        <div>
          title:<input 
            type="text"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            name="title"
          />
        </div>
        
        <div>
          author:<input 
            type="text"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
            name="author"
          />
        </div>

        <div>
          url:<input 
            type="text"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
            name="url"
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )

  return (
    <div>
      <h2>blogs</h2>
      <Notification 
        message={message}
        messageType={messageType}
      />
      <p>
        {user.name} logged in 
        <button onClick={handleLogout}>logout</button>
      </p>

      {createBlogForm()}

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App
