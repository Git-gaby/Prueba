// Clase principal para gestionar la autenticación (Login y Registro)
class AuthManager {
    
    constructor() {
        // 1. Inicializar todas las propiedades (elementos del DOM)
        this.loginForm = document.getElementById('loginForm');
        this.registerForm = document.getElementById('registerForm');
        
        this.emailInput = document.getElementById('email');
        this.passwordInput = document.getElementById('password');

        this.regNombreInput = document.getElementById('reg-nombre');
        this.regEmailInput = document.getElementById('reg-email');
        this.regPasswordInput = document.getElementById('reg-password');

        this.loginContent = document.getElementById('login-form-content');
        this.registerContent = document.getElementById('register-form-content');
        this.showRegisterLink = document.getElementById('show-register-link');
        this.showLoginLink = document.getElementById('show-login-link');
        
        // 2. Inicializar listeners al crear la instancia
        this.initListeners();
        console.log('AuthManager inicializado usando POO.');
    }

    // --- Métodos de Alternancia de Formularios (UI) ---

    showLoginForm() {
        this.loginContent.style.display = 'block';
        this.registerContent.style.display = 'none';
        this.registerForm.reset(); 
        // Opcional: Limpiar errores al cambiar
        this.clearAllErrors();
    }

    showRegisterForm() {
        this.loginContent.style.display = 'none';
        this.registerContent.style.display = 'block';
        this.loginForm.reset();
        // Opcional: Limpiar errores al cambiar
        this.clearAllErrors();
    }
    
    clearAllErrors() {
        this.clearError(this.emailInput);
        this.clearError(this.passwordInput);
        this.clearError(this.regNombreInput);
        this.clearError(this.regEmailInput);
        this.clearError(this.regPasswordInput);
    }

    // --- Métodos de Validación y Errores (Encapsulados) ---
    
    // Helper: Muestra el mensaje de error
    displayError(inputElement, message) {
        let errorElement = document.getElementById(inputElement.id + '-error');
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.id = inputElement.id + '-error';
            errorElement.className = 'error-message';
            errorElement.style.color = 'red';
            errorElement.style.fontSize = '0.875rem';
            errorElement.style.marginTop = '0.25rem';
            inputElement.parentNode.insertBefore(errorElement, inputElement.nextSibling);
        }
        errorElement.textContent = message;
        inputElement.style.borderColor = 'red';
    }

    // Helper: Borra el mensaje de error
    clearError(inputElement) {
        const errorElement = document.getElementById(inputElement.id + '-error');
        if (errorElement) {
            errorElement.remove();
        }
        inputElement.style.borderColor = '';
    }

    // Validación: Nombre
    validateName(inputElement) {
        const nameValue = inputElement.value.trim();
        if (nameValue.length < 3) {
            this.displayError(inputElement, 'El nombre debe tener al menos 3 caracteres.');
            return false;
        } else {
            this.clearError(inputElement);
            return true;
        }
    }

    // Validación: Email
    validateEmail(inputElement) {
        const emailValue = inputElement.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailValue)) {
            this.displayError(inputElement, 'Formato de correo inválido.');
            return false;
        } else {
            this.clearError(inputElement);
            return true;
        }
    }

    // Validación: Contraseña
    validatePassword(inputElement) {
        const passwordValue = inputElement.value;
        const minLength = 8;
        if (passwordValue.length < minLength) {
            this.displayError(inputElement, `La contraseña debe tener al menos ${minLength} caracteres.`);
            return false;
        } else {
            this.clearError(inputElement);
            return true;
        }
    }

    // --- Manejadores de Eventos (Form Submission) ---

    handleLoginSubmit(event) {
        event.preventDefault(); 
        
        // Uso de 'this' para llamar a los métodos de validación de la clase
        const isEmailValid = this.validateEmail(this.emailInput);
        const isPasswordValid = this.validatePassword(this.passwordInput);

        if (isEmailValid && isPasswordValid) {
            const email = this.emailInput.value.trim();
            const password = this.passwordInput.value;
            
            // SIMULACIÓN DE AUTENTICACIÓN
            const VALID_EMAIL = 'test@saul.com'; 
            const VALID_PASSWORD = '123456789'; 
            
            if (email === VALID_EMAIL && password === VALID_PASSWORD) {
                // ÉXITO: REDIRECCIÓN 
                window.location.href = 'panel.html'; 
            } else {
                // FALLO
                alert('Credenciales inválidas. Por favor, inténtalo de nuevo.');
                this.passwordInput.value = ''; 
            }
        } else {
            alert('Por favor, corrige los errores de formato en el formulario de Login.');
        }
    }

    handleRegisterSubmit(event) {
        event.preventDefault();
        
        // Uso de 'this' para llamar a los métodos de validación de la clase
        const isNameValid = this.validateName(this.regNombreInput);
        const isEmailValid = this.validateEmail(this.regEmailInput);
        const isPasswordValid = this.validatePassword(this.regPasswordInput);

        if (isNameValid && isEmailValid && isPasswordValid) {
            
            const nombre = this.regNombreInput.value.trim();
            
            // SIMULACIÓN DE REGISTRO
            alert(`¡Registro exitoso para ${nombre}! Ahora, inicia sesión con tu nueva cuenta.`);
            
            // Volver automáticamente al formulario de login
            this.showLoginForm(); 
        } else {
            alert('Por favor, completa y corrige todos los campos de registro.');
        }
    }

    // --- Inicialización de Listeners ---
    
    initListeners() {
        // Listeners de Toggle
        this.showRegisterLink.addEventListener('click', (e) => {
            e.preventDefault();
            this.showRegisterForm(); 
        });

        this.showLoginLink.addEventListener('click', (e) => {
            e.preventDefault();
            this.showLoginForm(); 
        });

        // Listeners de Envío de Formularios (Usamos .bind(this) para mantener el contexto de la clase)
        this.loginForm.addEventListener('submit', this.handleLoginSubmit.bind(this));
        this.registerForm.addEventListener('submit', this.handleRegisterSubmit.bind(this));

        // Listeners de Validación en tiempo real (Blur)
        // Pasamos el elemento como primer argumento después de 'this' en bind.
        this.emailInput.addEventListener('blur', this.validateEmail.bind(this, this.emailInput));
        this.passwordInput.addEventListener('blur', this.validatePassword.bind(this, this.passwordInput));
        this.regNombreInput.addEventListener('blur', this.validateName.bind(this, this.regNombreInput));
        this.regEmailInput.addEventListener('blur', this.validateEmail.bind(this, this.regEmailInput));
        this.regPasswordInput.addEventListener('blur', this.validatePassword.bind(this, this.regPasswordInput));
    }
}

// Inicialización: Se crea una única instancia del Gestor de Autenticación al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    new AuthManager();
});