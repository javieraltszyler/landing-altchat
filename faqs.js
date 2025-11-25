/**
 * FAQ.JS
 * JavaScript para los acordeones de preguntas frecuentes
 */

// Esperar a que el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    // console.log('🔧 FAQ.js cargado');
    initFAQ();
});

function initFAQ() {
    // Seleccionar todos los botones de preguntas
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    if (!faqQuestions.length) {
        console.warn('⚠️ No se encontraron elementos .faq-question');
        return;
    }
    
    // console.log(`✅ Se encontraron ${faqQuestions.length} preguntas FAQ`);
    
    // Agregar evento click a cada pregunta
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            toggleFAQ(this);
        });
    });
}

function toggleFAQ(questionElement) {
    // Obtener el contenedor de la respuesta (siguiente elemento hermano)
    const answer = questionElement.nextElementSibling;
    
    if (!answer || !answer.classList.contains('faq-answer')) {
        console.error('❌ No se encontró .faq-answer después de la pregunta');
        return;
    }
    
    // Verificar si está actualmente abierto
    const isActive = questionElement.classList.contains('active');
    
    if (isActive) {
        // Cerrar
        questionElement.classList.remove('active');
        answer.classList.remove('active');
    } else {
        // Abrir
        questionElement.classList.add('active');
        answer.classList.add('active');
        
        // OPCIONAL: Cerrar otros acordeones del mismo nivel
        // Descomentá esto si querés que solo uno esté abierto a la vez
        /*
        const parent = questionElement.parentElement;
        const siblings = parent.querySelectorAll(':scope > .faq-item .faq-question.active, :scope > .faq-child .faq-question.active');
        
        siblings.forEach(sibling => {
            if (sibling !== questionElement) {
                sibling.classList.remove('active');
                sibling.nextElementSibling.classList.remove('active');
            }
        });
        */
    }
}

// ===== FUNCIONALIDAD EXTRA: Cerrar todo =====
function closeAllFAQs() {
    const activeQuestions = document.querySelectorAll('.faq-question.active');
    const activeAnswers = document.querySelectorAll('.faq-answer.active');
    
    activeQuestions.forEach(q => q.classList.remove('active'));
    activeAnswers.forEach(a => a.classList.remove('active'));
}

// ===== FUNCIONALIDAD EXTRA: Abrir todo =====
function openAllFAQs() {
    const questions = document.querySelectorAll('.faq-question');
    const answers = document.querySelectorAll('.faq-answer');
    
    questions.forEach(q => q.classList.add('active'));
    answers.forEach(a => a.classList.add('active'));
}

// Opcional: agregar botones de "Abrir/Cerrar todo" si los necesitás
// Ejemplo de uso:
// <button onclick="openAllFAQs()">Abrir Todas</button>
// <button onclick="closeAllFAQs()">Cerrar Todas</button>

// console.log('✅ FAQ.js inicializado correctamente');