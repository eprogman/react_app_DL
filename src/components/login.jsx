import { useState } from "react"

const Login = ({ validateUser }) => {

    const [username, setUser] = useState('')
    const [password, setPass] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()

        fetch('https://dlabs-post.onrender.com/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        }).then(res => {
            if (res.ok) {
                return validateUser({ isPermitted: true });
            }
        })

    }

    return (
        <form className="login-form" onSubmit={handleSubmit}>
            <div className="login-div">
                <h1><center>INGRESO</center></h1>
                <input autoFocus type="text" placeholder="usuario" name="usuario" value={username} onChange={(e) => { setUser(e.target.value) }} />
                <input type="password" placeholder="password" name="contrasena" value={password} onChange={(e) => { setPass(e.target.value) }} />
                <button type="submit">ENTRAR</button>
            </div>
        </form>


    )

}

export default Login