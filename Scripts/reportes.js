// Definición de la Clase GestorReportes
class GestorReportes {
    
    // 1. Definición de Constantes de Color (Encapsulación)
    SAUL_BLUE = '#1E3A8A';
    SAUL_ACCENT = '#FBBF24';
    SAUL_HOVER = '#1e40af';
    LIGHT_GRAY = '#D1D5DB';

    constructor() {
        // 2. Inicializar Gráficos y Eventos al construir el objeto
        this.initCharts();
        this.initListeners();
        console.log('Gestor de Reportes inicializado.');
    }

    // Método para inicializar todos los gráficos
    initCharts() {
        if (typeof Chart === 'undefined') {
            console.error('Chart.js no está cargado. No se pueden inicializar los gráficos.');
            return;
        }

        this.initBarChart();
        this.initPieChart();
        this.initLineChart();
    }

    // Método para Gráfico de Barras: Materias con más solicitudes
    initBarChart() {
        const barCtx = document.getElementById('barChart').getContext('2d');
        
        new Chart(barCtx, {
            type: 'bar',
            data: {
                labels: ['Programación', 'Matemática', 'Bases de Datos', 'Psicosocial', 'Cálculo'],
                datasets: [{
                    label: 'Solicitudes',
                    data: [180, 150, 100, 80, 75],
                    backgroundColor: [
                        this.SAUL_BLUE, 
                        this.SAUL_ACCENT, 
                        this.SAUL_HOVER, 
                        '#34D399', 
                        this.LIGHT_GRAY
                    ],
                    borderRadius: 6
                }]
            },
            options: {
                responsive: true,
                plugins: { legend: { display: false } },
                scales: { 
                    y: { beginAtZero: true, grid: { color: '#F3F4F6' } },
                    x: { grid: { display: false } }
                }
            }
        });
    }

    // Método para Gráfico de Pastel: Distribución por tipo de ayuda
    initPieChart() {
        const pieCtx = document.getElementById('pieChart').getContext('2d');

        new Chart(pieCtx, {
            type: 'doughnut',
            data: {
                labels: ['Monitoría (Académico)', 'Tutoría (Psicosocial)', 'Otro/Información'],
                datasets: [{
                    data: [50, 35, 15],
                    backgroundColor: [this.SAUL_BLUE, this.SAUL_ACCENT, this.LIGHT_GRAY],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                cutout: '70%',
                plugins: { legend: { position: 'bottom' } }
            }
        });
    }

    // Método para Gráfico de Línea: Evolución semanal de solicitudes
    initLineChart() {
        const lineCtx = document.getElementById('lineChart').getContext('2d');
        
        new Chart(lineCtx, {
            type: 'line',
            data: {
                labels: ['Semana 40', 'Semana 41', 'Semana 42', 'Semana 43', 'Semana 44', 'Semana 45'],
                datasets: [{
                    label: 'Solicitudes Únicas',
                    data: [15, 22, 35, 30, 45, 50],
                    borderColor: this.SAUL_BLUE,
                    backgroundColor: 'rgba(30, 58, 138, 0.1)',
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                plugins: { legend: { display: false } },
                scales: {
                    y: { beginAtZero: true, grid: { color: '#F3F4F6' } },
                    x: { grid: { display: false } }
                }
            }
        });
    }

    // Método para gestionar el listener del botón
    initListeners() {
        const exportButton = document.querySelector('main .flex button.bg-saul-accent');
        if (exportButton) {
            exportButton.addEventListener('click', this.handleExportPDF);
        }
    }

    // Método que maneja la acción del botón de exportar (Encapsulación)
    handleExportPDF() {
        alert('Funcionalidad de Exportar PDF (Simulación): Esta acción generaría un documento PDF con los reportes. La lógica se encuentra ahora dentro del objeto GestorReportes.');
    }
}

// Inicialización: Crear una instancia de la clase al cargar el DOM
document.addEventListener('DOMContentLoaded', () => {
    // Se crea el objeto GestorReportes que maneja toda la lógica
    const gestor = new GestorReportes(); 
});