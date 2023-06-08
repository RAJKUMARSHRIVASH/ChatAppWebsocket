// const baseURL = "http://localhost:8000"
const baseURL = "https://chatapp-websocket.onrender.com"


async function registerForm(event) {
    event.preventDefault();
    const payload = {
        username: event.target.username.value,
        email: event.target.email.value,
        password: event.target.password.value
    }
    try {
        const fetchedData = await fetch(`${baseURL}/api/user/register`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        })
        const data = await fetchedData.json();
        if (data.msg == "user registered successfully") {
            alert(data.msg)
            window.location.href = "./login.html"
        }
        else {
            alert(data.msg)
        }

    } catch (error) {
        alert(error)
    }


}

async function loginForm(event) {
    event.preventDefault();
    const payload = {
        email: event.target.email.value,
        password: event.target.password.value
    }
    try {
        const fetchedData = await fetch(`${baseURL}/api/user/login`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        })
        const data = await fetchedData.json();
        if (data.msg == "Login successful") {
            alert(data.msg)
            window.location.href = "./chat.html"
        }
        else {
            alert(data.msg)
        }

    } catch (error) {
        alert(error)
    }
}