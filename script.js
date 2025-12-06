
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const passwordLoginForm = document.getElementById('passwordLoginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const notification = document.getElementById('notification');
    const emailForm = document.getElementById('emailForm');
    const passwordForm = document.getElementById('passwordForm');
    const displayEmail = document.getElementById('displayEmail');
    const userInitial = document.getElementById('userInitial');
    const backButton = document.getElementById('backButton');
    const passwordToggle = document.getElementById('passwordToggle');
    
    // Xử lý submit form email
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = emailInput.value.trim();
        
        // Kiểm tra email hợp lệ (đơn giản)
        if (!email) {
            emailInput.focus();
            return;
        }
        
        // Chuyển sang form nhập mật khẩu
        showPasswordForm(email);
    });
    
    // Xử lý submit form mật khẩu
    passwordLoginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const password = passwordInput.value.trim();
        
        // Kiểm tra mật khẩu
        if (!password) {
            passwordInput.focus();
            return;
        }
        
        // Hiển thị thông báo
        showNotification();
    });
    
    // Nút quay lại
    backButton.addEventListener('click', function(e) {
        e.preventDefault();
        showEmailForm();
    });
    
    // Toggle hiển thị mật khẩu
    passwordToggle.addEventListener('click', function() {
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            passwordToggle.querySelector('.toggle-icon').textContent = '🙈';
        } else {
            passwordInput.type = 'password';
            passwordToggle.querySelector('.toggle-icon').textContent = '👁️';
        }
    });
    
    // Xử lý khi người dùng nhấn Enter
    emailInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            loginForm.dispatchEvent(new Event('submit'));
        }
    });
    
    passwordInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            passwordLoginForm.dispatchEvent(new Event('submit'));
        }
    });
    
    // Tự động ẩn thông báo khi click ra ngoài
    notification.addEventListener('click', function(e) {
        if (e.target === notification) {
            closeNotification();
        }
    });
});

function showPasswordForm(email) {
    const emailForm = document.getElementById('emailForm');
    const passwordForm = document.getElementById('passwordForm');
    const displayEmail = document.getElementById('displayEmail');
    const userInitial = document.getElementById('userInitial');
    const passwordInput = document.getElementById('password');
    
    // Ẩn form email, hiện form password
    emailForm.classList.add('hidden');
    passwordForm.classList.remove('hidden');
    
    // Hiển thị email đã nhập
    displayEmail.textContent = email;
    
    // Lấy chữ cái đầu tiên để hiển thị trong avatar
    const initial = email.charAt(0).toUpperCase();
    userInitial.textContent = initial;
    
    // Focus vào ô mật khẩu
    setTimeout(() => {
        passwordInput.focus();
    }, 100);
}

function showEmailForm() {
    const emailForm = document.getElementById('emailForm');
    const passwordForm = document.getElementById('passwordForm');
    const passwordInput = document.getElementById('password');
    
    // Ẩn form password, hiện form email
    passwordForm.classList.add('hidden');
    emailForm.classList.remove('hidden');
    
    // Reset mật khẩu
    passwordInput.value = '';
    passwordInput.type = 'password';
    document.getElementById('passwordToggle').querySelector('.toggle-icon').textContent = '👁️';
    
    // Focus vào ô email
    setTimeout(() => {
        document.getElementById('email').focus();
    }, 100);
}

function showNotification() {
    const notification = document.getElementById('notification');
    notification.classList.remove('hidden');
    
    // Lưu vào localStorage để biết người dùng đã xem thông báo
    localStorage.setItem('hasSeenNotification', 'true');
}

function closeNotification() {
    const notification = document.getElementById('notification');
    notification.classList.add('hidden');
}

// Kiểm tra nếu người dùng đã xem thông báo trước đó
// (Tùy chọn: có thể bỏ qua nếu muốn hiển thị mỗi lần)
// if (!localStorage.getItem('hasSeenNotification')) {
//     // Có thể tự động hiển thị khi trang load
// }

