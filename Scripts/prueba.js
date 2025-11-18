// Clase para gestionar la interfaz de chat y la interacción con el asistente
class ChatManager {
    
    constructor() {
        // Propiedades del DOM
        this.chatArea = document.getElementById('chat-area');
        this.chatForm = document.getElementById('chat-form');
        this.chatInput = document.getElementById('chat-input');
        this.toggleButton = document.getElementById('toggle-simulacion');
        this.rolDisplay = document.getElementById('rol-actual');
        
        // Estado de la Simulación
        this.currentRole = 'Estudiante'; // Puede ser 'Estudiante' o 'Docente'
        
        this.initListeners();
        console.log('ChatManager inicializado.');
    }

    // --- Métodos de Inicialización ---
    
    initListeners() {
        if (this.chatForm) {
            // Manejador del envío del formulario (pregunta)
            this.chatForm.addEventListener('submit', this.handleChatSubmit.bind(this));
        }
        if (this.toggleButton) {
            // Manejador del botón de cambio de rol
            this.toggleButton.addEventListener('click', this.toggleRole.bind(this));
        }
    }
    
    // --- Métodos de Lógica del Chat ---
    
    // 1. Maneja el envío de una pregunta
    handleChatSubmit(event) {
        event.preventDefault();
        const userMessage = this.chatInput.value.trim();
        
        if (userMessage === '') return;

        // Mostrar el mensaje del usuario
        this.displayMessage(userMessage, 'user');
        
        // Simular la respuesta del asistente después de un breve retraso
        setTimeout(() => {
            const assistantResponse = this.generateResponse(userMessage);
            this.displayMessage(assistantResponse, 'assistant');
        }, 800);

        // Limpiar el input
        this.chatInput.value = '';
    }

    // 2. Muestra un mensaje en el área de chat
    displayMessage(text, sender) {
        const messageContainer = document.createElement('div');
        const bubble = document.createElement('div');
        
        if (sender === 'user') {
            messageContainer.className = 'flex justify-end';
            bubble.className = 'max-w-xs lg:max-w-md bg-saul-accent text-gray-800 p-3 rounded-xl rounded-br-none shadow-md text-sm';
            bubble.textContent = text;
        } else {
            messageContainer.className = 'flex justify-start';
            bubble.className = 'max-w-xs lg:max-w-md bg-gray-200 text-gray-800 p-3 rounded-xl rounded-tl-none shadow-sm text-sm';
            
            // Añadir el encabezado del asistente
            const header = document.createElement('p');
            header.className = 'font-bold text-saul-blue mb-1';
            header.textContent = 'SAUL Asistente';
            
            bubble.appendChild(header);
            bubble.appendChild(document.createTextNode(text));
        }

        messageContainer.appendChild(bubble);
        this.chatArea.appendChild(messageContainer);
        
        // Desplazarse al último mensaje
        this.chatArea.scrollTop = this.chatArea.scrollHeight;
    }
    
    // 3. Simula la respuesta del asistente basada en la pregunta y el rol
    generateResponse(question) {
        const lowerQuestion = question.toLowerCase();
        
        if (this.currentRole === 'Estudiante') {
            if (lowerQuestion.includes('horario') || lowerQuestion.includes('clases')) {
                return 'Los horarios de clase se encuentran disponibles en la sección "Mi Perfil" del portal estudiantil. ¿Necesitas un enlace directo?';
            } else if (lowerQuestion.includes('monitoria') || lowerQuestion.includes('ayuda')) {
                return 'Para solicitar una monitoría, debes ir a la sección "Solicitudes" y especificar la materia y el tema. ¿Qué materia te interesa?';
            } else if (lowerQuestion.includes('trámite') || lowerQuestion.includes('inscripción')) {
                return 'Por favor, sé más específico sobre el trámite. Los trámites comunes como cancelación de semestre se inician en Secretaría Académica.';
            }
            return `Entendido. Como Estudiante, te puedo ayudar con temas básicos de la universidad. Acabas de preguntar sobre: "${question}".`;
        } 
        
        if (this.currentRole === 'Docente') {
            if (lowerQuestion.includes('nota') || lowerQuestion.includes('calificación')) {
                return 'Para cargar o modificar calificaciones, accede al módulo SGC e identifica tu asignatura. ¿Tienes algún problema con un grupo específico?';
            } else if (lowerQuestion.includes('permiso') || lowerQuestion.includes('ausencia')) {
                return 'El procedimiento para solicitar permisos debe realizarse a través del formulario de Recursos Humanos, con copia a tu Jefe de Departamento.';
            }
            return `Gracias por tu consulta. Como Docente, mi asistencia se enfoca en gestión académica, reportes y normativas internas. Preguntaste sobre: "${question}".`;
        }
    }

    // 4. Cambia el rol de simulación (Estudiante/Docente)
    toggleRole() {
        this.currentRole = (this.currentRole === 'Estudiante') ? 'Docente' : 'Estudiante';
        
        // Actualizar el texto del botón y el display
        this.toggleButton.textContent = `Modo: ${this.currentRole}`;
        this.rolDisplay.textContent = `Rol de Simulación: ${this.currentRole}`;
        
        // Simular un mensaje de cambio de contexto
        this.displayMessage(`El modo de simulación se ha cambiado a: ${this.currentRole}. Prueba una pregunta diferente.`, 'assistant');
    }
}

// Inicialización: Crear una instancia de la clase al cargar el DOM
document.addEventListener('DOMContentLoaded', () => {
    new ChatManager();
});