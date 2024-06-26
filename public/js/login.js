document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
  
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
  
    const result = await response.json();
  
    const messageDiv = document.getElementById('message');
    if (result.success) {
      window.location.href = '/admin';
    } else {
      messageDiv.textContent = result.message;
      messageDiv.style.color = 'red';
    }
  });