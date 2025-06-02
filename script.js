// ===== VARIABLES GLOBALES =====
// Coeficientes de la ecuación cúbica: y = ax³ + bx² + cx + d
let a = 0, b = 0, c = 0, d = 0;

// Referencias al canvas y su contexto 2D para dibujar
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// ===== FUNCIÓN PARA ACTUALIZAR LA ECUACIÓN EN TIEMPO REAL =====
function updateEquation() {
    // Actualiza los spans que muestran los coeficientes en la ecuación
    document.getElementById('eq-a').textContent = a || 0; // Si a es 0 o undefined, muestra 0
    document.getElementById('eq-b').textContent = b >= 0 ? b || 0 : b; // Maneja números negativos
    document.getElementById('eq-c').textContent = c >= 0 ? c || 0 : c; // Maneja números negativos
    document.getElementById('eq-d').textContent = d >= 0 ? d || 0 : d; // Maneja números negativos
}

// ===== EVENT LISTENERS PARA ACTUALIZACIÓN EN TIEMPO REAL =====
// Escucha cambios en el campo del coeficiente A (x³)
document.getElementById('txtA').addEventListener('input', function() {
    a = parseFloat(this.value) || 0; // Convierte a número o usa 0 si es inválido
    updateEquation(); // Actualiza la visualización de la ecuación
});

// Escucha cambios en el campo del coeficiente B (x²)
document.getElementById('txtB').addEventListener('input', function() {
    b = parseFloat(this.value) || 0; // Convierte a número o usa 0 si es inválido
    updateEquation(); // Actualiza la visualización de la ecuación
});

// Escucha cambios en el campo del coeficiente C (x)
document.getElementById('txtC').addEventListener('input', function() {
    c = parseFloat(this.value) || 0; // Convierte a número o usa 0 si es inválido
    updateEquation(); // Actualiza la visualización de la ecuación
});

// Escucha cambios en el campo del coeficiente D (constante)
document.getElementById('txtD').addEventListener('input', function() {
    d = parseFloat(this.value) || 0; // Convierte a número o usa 0 si es inválido
    updateEquation(); // Actualiza la visualización de la ecuación
});

// ===== FUNCIONES DEL MENÚ DESPLEGABLE =====
// Alterna la visibilidad del menú desplegable
function toggleDropdown() {
    const dropdown = document.getElementById('dropdown');
    dropdown.classList.toggle('show'); // Agrega o quita la clase 'show'
}

// Muestra el modal de créditos
function showCredits() {
    document.getElementById('creditsModal').style.display = 'block'; // Hace visible el modal
    toggleDropdown(); // Cierra el menú desplegable
}

// Muestra el modal de instrucciones
function showInstructions() {
    document.getElementById('instructionsModal').style.display = 'block'; // Hace visible el modal
    toggleDropdown(); // Cierra el menú desplegable
}

// Cierra un modal específico
function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none'; // Oculta el modal
}

// ===== FUNCIÓN PARA MOSTRAR MENSAJES DE ERROR =====
function showError() {
    const errorMsg = document.getElementById('errorMessage');
    errorMsg.style.display = 'block'; // Muestra el mensaje de error
    
    // Oculta automáticamente el mensaje después de 3 segundos
    setTimeout(() => {
        errorMsg.style.display = 'none';
    }, 3000);
}

// ===== FUNCIÓN PRINCIPAL PARA GENERAR LA GRÁFICA =====
function generateGraph() {
    try {
        // Obtiene y convierte los valores de los campos de entrada
        a = parseFloat(document.getElementById('txtA').value) || 0;
        b = parseFloat(document.getElementById('txtB').value) || 0;
        c = parseFloat(document.getElementById('txtC').value) || 0;
        d = parseFloat(document.getElementById('txtD').value) || 0;
        
        // Actualiza la visualización de la ecuación
        updateEquation();
        
        // Dibuja la gráfica con los nuevos coeficientes
        drawGraph();
    } catch (error) {
        // Si hay algún error, muestra el mensaje de error
        showError();
    }
}

// ===== FUNCIÓN PRINCIPAL PARA DIBUJAR LA GRÁFICA =====
function drawGraph() {
    // ===== CONFIGURACIÓN INICIAL =====
    // Limpia todo el canvas antes de dibujar
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Define el centro del canvas y la escala
    const centerX = canvas.width / 2;   // Centro horizontal
    const centerY = canvas.height / 2;  // Centro vertical
    const scale = 40;                   // 40 píxeles por unidad

    // ===== DIBUJAR FONDO CON GRADIENTE =====
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#f8f9fa'); // Color inicial del gradiente
    gradient.addColorStop(1, '#e9ecef'); // Color final del gradiente
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height); // Rellena todo el canvas

    // ===== DIBUJAR CUADRÍCULA DE FONDO =====
    ctx.strokeStyle = '#e0e0e0'; // Color gris claro para la cuadrícula
    ctx.lineWidth = 0.5;         // Líneas delgadas
    
    // Líneas verticales de la cuadrícula
    for (let i = -10; i <= 10; i++) {
        const x = centerX + i * scale; // Calcula la posición x
        ctx.beginPath();
        ctx.moveTo(x, 0);                    // Desde arriba
        ctx.lineTo(x, canvas.height);        // Hasta abajo
        ctx.stroke();
    }
    
    // Líneas horizontales de la cuadrícula
    for (let i = -10; i <= 10; i++) {
        const y = centerY - i * scale; // Calcula la posición y (invertida)
        ctx.beginPath();
        ctx.moveTo(0, y);               // Desde la izquierda
        ctx.lineTo(canvas.width, y);    // Hasta la derecha
        ctx.stroke();
    }

    // ===== DIBUJAR EJES PRINCIPALES =====
    ctx.strokeStyle = '#333'; // Color oscuro para los ejes
    ctx.lineWidth = 2;        // Líneas más gruesas
    
    // Eje X (horizontal)
    ctx.beginPath();
    ctx.moveTo(0, centerY);           // Desde el borde izquierdo
    ctx.lineTo(canvas.width, centerY); // Hasta el borde derecho
    ctx.stroke();
    
    // Eje Y (vertical)
    ctx.beginPath();
    ctx.moveTo(centerX, 0);             // Desde arriba
    ctx.lineTo(centerX, canvas.height); // Hasta abajo
    ctx.stroke();

    // ===== DIBUJAR MARCAS Y ETIQUETAS DE LOS EJES =====
    ctx.fillStyle = '#333';        // Color del texto
    ctx.font = '12px Arial';       // Fuente y tamaño
    ctx.textAlign = 'center';      // Alineación centrada para el eje X
    
    // Etiquetas del eje X (números horizontales)
    for (let i = -10; i <= 10; i++) {
        if (i !== 0) { // No dibuja en el origen para evitar superposición
            const x = centerX + i * scale;
            
            // Dibuja la marca (línea pequeña)
            ctx.beginPath();
            ctx.moveTo(x, centerY - 5); // 5 píxeles arriba del eje
            ctx.lineTo(x, centerY + 5); // 5 píxeles abajo del eje
            ctx.stroke();
            
            // Dibuja el número
            ctx.fillText(i.toString(), x, centerY + 20);
        }
    }
    
    // Etiquetas del eje Y (números verticales)
    ctx.textAlign = 'right'; // Alineación a la derecha para el eje Y
    for (let i = -10; i <= 10; i++) {
        if (i !== 0) { // No dibuja en el origen
            const y = centerY - i * scale; // Coordenada y invertida
            
            // Dibuja la marca (línea pequeña)
            ctx.beginPath();
            ctx.moveTo(centerX - 5, y); // 5 píxeles a la izquierda del eje
            ctx.lineTo(centerX + 5, y); // 5 píxeles a la derecha del eje
            ctx.stroke();
            
            // Dibuja el número
            ctx.fillText(i.toString(), centerX - 10, y + 4);
        }
    }

   // Dibuja la función cúbica
    ctx.strokeStyle = '#ff4757';
    ctx.lineWidth = 3;
    ctx.beginPath();
    
    for (let x = -10; x <= 10; x += 0.1) {
        const y = a * Math.pow(x, 3) + b * Math.pow(x, 2) + c * x + d;
        const canvasX = centerX + x * scale;
        const canvasY = centerY - y * scale;
        
        if (x === -10) {
            ctx.moveTo(canvasX, canvasY); // Mueve a la posición inicial
        } else {
            ctx.lineTo(canvasX, canvasY); // Dibuja la línea
        }
    }
    
    ctx.stroke();
}
