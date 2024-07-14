document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');

    if (loginForm) {
        loginForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;

            fetch('https://64069dc5862956433e556a26.mockapi.io/v1/users')
                .then(response => response.json())
                .then(users => {
                    const user = users.find(u => u.email === email && u.password === password);

                    if (user) {
                        alert('Login successful!');
                        // Lưu thông tin người dùng vào Local Storage
                        localStorage.setItem('currentUser', JSON.stringify(user));
                    } else {
                        alert('Login failed: Invalid email or password');
                    }
                    // Trở về trang chủ sau khi đăng nhập thành công
                    window.location.href = '/index.html';
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        });
    }

    if (signupForm) {
        signupForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const firstName = document.getElementById('signup-first-name').value;
            const lastName = document.getElementById('signup-last-name').value;
            const email = document.getElementById('signup-email').value;
            const password = document.getElementById('signup-password').value;
            const repassword = document.getElementById('signup-repassword').value;
            const cartItems = []

            if (password !== repassword) {
                alert('Mật khẩu nhập lại không khớp!');
                return;
            }

            const newUser = {
                firstName,
                lastName,
                email,
                password,
                cartItems
            };

            fetch('https://64069dc5862956433e556a26.mockapi.io/v1/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newUser),
            })
                .then(response => response.json())
                .then(data => {
                    alert('Sign up successful!');
                    // Lưu thông tin người dùng mới vào Local Storage
                    localStorage.setItem('currentUser', JSON.stringify(data));
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        });
    }
});
