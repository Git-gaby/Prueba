// Definición de la Clase para gestionar la navegación del panel
class NavegacionAdmin {
    
    constructor() {
        // Almacenar todos los botones de navegación de la barra lateral
        this.navButtons = document.querySelectorAll("aside nav a");
        
        // Inicializar los listeners de eventos
        this.initListeners();
        console.log('Navegación del Panel inicializada usando POO.');
    }

    // Método para inicializar los event listeners
    initListeners() {
        this.navButtons.forEach(btn => {
            // Utilizamos 'bind(this)' para asegurar que 'this' dentro de setActiveButton
            // se refiera a la instancia de NavegacionAdmin.
            btn.addEventListener("click", this.setActiveButton.bind(this));
        });
    }

    // Método para manejar el clic y establecer el botón activo
    setActiveButton(event) {
        // Prevenir el comportamiento por defecto si quieres manejar la navegación internamente
        // event.preventDefault(); 
        
        const clickedButton = event.currentTarget; // El elemento 'a' que fue clicado

        // 1. Quitar el estilo activo de todos los botones
        this.navButtons.forEach(b => this.removeActiveStyles(b));
        
        // 2. Aplicar el estilo activo al botón clicado
        this.applyActiveStyles(clickedButton);
    }
    
    // Método para remover clases de estilo activo (Encapsulación)
    removeActiveStyles(element) {
        element.classList.remove("text-saul-blue", "font-medium", "bg-saul-accent");
        element.classList.add("hover:bg-saul-hover");
    }

    // Método para aplicar clases de estilo activo (Encapsulación)
    applyActiveStyles(element) {
        element.classList.remove("hover:bg-saul-hover");
        element.classList.add("text-saul-blue", "font-medium", "bg-saul-accent");
    }
}

// Inicialización: Crear una instancia de la clase al cargar el DOM
document.addEventListener('DOMContentLoaded', () => {
    // Esto crea un objeto 'navegador' que encapsula toda la lógica de la barra lateral.
    const navegador = new NavegacionAdmin();
});