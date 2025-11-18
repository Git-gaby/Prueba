// Definición de la Clase GestorSolicitudes
class GestorSolicitudes {
    constructor() {
        // Inicializar elementos del DOM
        this.searchInput = document.getElementById('search-input');
        this.filterStatus = document.getElementById('filter-status');
        this.filterSubject = document.getElementById('filter-subject');
        this.tableBody = document.getElementById('solicitudes-table-body');
        this.tableRows = this.tableBody ? Array.from(this.tableBody.querySelectorAll('tr')) : [];

        // Inicializar listeners
        this.initListeners();
    }

    // Método para inicializar todos los eventos
    initListeners() {
        this.searchInput.addEventListener('input', this.applyFilters.bind(this));
        this.filterStatus.addEventListener('change', this.applyFilters.bind(this));
        this.filterSubject.addEventListener('change', this.applyFilters.bind(this));
        this.tableBody.addEventListener('click', this.handleAction.bind(this));
    }

    // Método principal para aplicar filtros
    applyFilters() {
        const searchText = this.searchInput.value.toLowerCase().trim();
        const selectedStatus = this.filterStatus.value;
        const selectedSubject = this.filterSubject.value;

        this.tableRows.forEach(row => {
            const studentName = row.querySelector('.student-name').textContent.toLowerCase();
            const rowStatus = row.getAttribute('data-status');
            const rowSubject = row.getAttribute('data-subject');
            
            const matchesSearch = studentName.includes(searchText);
            const matchesStatus = (selectedStatus === 'all' || rowStatus === selectedStatus);
            const matchesSubject = (selectedSubject === 'all' || rowSubject === selectedSubject);

            row.classList.toggle('hidden', !(matchesSearch && matchesStatus && matchesSubject));
        });
    }

    // Método para manejar acciones de la tabla
    handleAction(e) {
        const target = e.target;
        
        if (target.classList.contains('action-btn')) {
            const action = target.getAttribute('data-action');
            const row = target.closest('tr');
            const solicitudId = row.querySelector('td:first-child').textContent;
            const studentName = row.querySelector('.student-name').textContent;
            
            let message = '';

            // POO: La lógica específica de la acción se maneja en un método
            switch (action) {
                case 'assign':
                    message = this.assignSolicitud(solicitudId, studentName);
                    break;
                case 'view':
                    message = this.viewDetails(solicitudId);
                    break;
                case 'close':
                    message = this.closeSolicitud(solicitudId, studentName);
                    break;
                case 'review':
                    message = this.reviewSolicitud(solicitudId);
                    break;
                default:
                    message = `Acción no reconocida: ${action}`;
            }

            alert(message);
        }
    }

    // Métodos específicos de negocio (Encapsulación)
    assignSolicitud(id, student) {
        // Aquí iría la lógica real para ASIGNAR en el backend.
        return `SIMULACIÓN: Solicitud ${id} de ${student} ha sido ASIGNADA a un monitor/tutor. (La solicitud se acepta automáticamente)`;
    }

    viewDetails(id) {
        return `SIMULACIÓN: Mostrando detalles de la Solicitud ${id}.`;
    }
    
    closeSolicitud(id, student) {
        return `SIMULACIÓN: Solicitud ${id} de ${student} ha sido CERRADA.`;
    }
    
    reviewSolicitud(id) {
        return `SIMULACIÓN: Revisando la Solicitud Cerrada ${id}.`;
    }
}

// Inicialización: Crear una instancia de la clase al cargar el DOM
document.addEventListener('DOMContentLoaded', () => {
    // Esto crea un objeto 'gestor' que contiene toda la lógica.
    const gestor = new GestorSolicitudes();
    console.log('Gestor de Solicitudes inicializado usando POO.');
});