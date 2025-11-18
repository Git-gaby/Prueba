// Clase principal para gestionar la configuración del sistema
class GestorConfiguracion {
    
    constructor() {
        // 1. Inicializar todas las propiedades (elementos del DOM)
        this.tabButtons = document.querySelectorAll('.tab-button');
        this.configContents = document.querySelectorAll('.config-content');
        this.perfilForm = document.getElementById('perfilForm');
        // Seleccionamos el formulario dentro del contenido del sistema
        this.sistemaForm = document.querySelector('#content-sistema form'); 

        // 2. Inicializar listeners y el estado visual
        this.initListeners();
        // Aseguramos que la pestaña de Perfil esté activa al cargar
        this.setActiveTab('tab-perfil'); 
        
        console.log('GestorConfiguracion inicializado usando POO.');
    }

    // --- Métodos de Inicialización ---
    
    initListeners() {
        // Listeners para el cambio de pestañas (click)
        this.tabButtons.forEach(button => {
            // Usamos .bind(this) para que la función handleTabClick pueda acceder a las propiedades de la clase
            button.addEventListener('click', this.handleTabClick.bind(this));
        });

        // Listeners para el envío de formularios
        if (this.perfilForm) {
            this.perfilForm.addEventListener('submit', this.handlePerfilSubmit.bind(this));
        }
        if (this.sistemaForm) {
            this.sistemaForm.addEventListener('submit', this.handleSistemaSubmit.bind(this));
        }
    }

    // --- Métodos de Interfaz (Manejo de Pestañas) ---

    handleTabClick(event) {
        const targetTabId = event.currentTarget.id;
        this.setActiveTab(targetTabId);
    }

    // Método que gestiona el estado activo de las pestañas
    setActiveTab(tabId) {
        const targetButton = document.getElementById(tabId);
        if (!targetButton) return;
        
        const targetContentId = targetButton.getAttribute('data-target');
        
        // 1. Resetear el estilo de todos los botones
        this.tabButtons.forEach(btn => {
            btn.classList.remove('border-saul-blue', 'text-saul-blue');
            btn.classList.add('border-transparent', 'text-gray-500', 'hover:text-saul-blue', 'hover:border-saul-blue');
        });
        
        // 2. Aplicar estilo activo al botón seleccionado
        targetButton.classList.remove('border-transparent', 'text-gray-500', 'hover:text-saul-blue', 'hover:border-saul-blue');
        targetButton.classList.add('border-saul-blue', 'text-saul-blue');

        // 3. Ocultar todos los contenidos
        this.configContents.forEach(content => {
            content.classList.add('hidden');
        });

        // 4. Mostrar el contenido objetivo
        document.getElementById(targetContentId).classList.remove('hidden');
    }

    // --- Métodos de Lógica de Negocio (Simulación de Formularios) ---

    // Maneja el envío del formulario de Perfil
    handlePerfilSubmit(e) {
        e.preventDefault();
        const nombre = document.getElementById('nombre').value;
        const password = document.getElementById('pass-nueva').value;
        
        let message = `SIMULACIÓN: Cambios de perfil guardados.`;
        message += `\nNombre: ${nombre}`;
        if (password) {
            message += "\nContraseña: [CAMBIADA]";
        }
        
        alert(message);
    }

    // Maneja el envío del formulario de Ajustes del Sistema
    handleSistemaSubmit(e) {
        e.preventDefault();
        const mantenimiento = document.getElementById('modo-mantenimiento').checked ? 'Activado' : 'Desactivado';
        const logLevel = document.getElementById('log-level').value;
        
        alert(`SIMULACIÓN: Ajustes del sistema aplicados.\nModo Mantenimiento: ${mantenimiento}\nNivel de Logging: ${logLevel}`);
    }
}

// Inicialización: Crear una instancia de la clase al cargar el DOM
document.addEventListener('DOMContentLoaded', () => {
    // Instanciar el objeto GestorConfiguracion que manejará toda la lógica de la página
    new GestorConfiguracion();
});