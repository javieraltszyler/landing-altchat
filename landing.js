/**
 * LANDING.JS
 * JavaScript para la landing VSL de AltChat
 */

// Esperar a que el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    // console.log('🚀 Landing VSL cargada');
    
    // Inicializar funcionalidades
    initFormToggle();
    initFormSubmit();
    initSmoothScroll();
});

// ===== TOGGLE DEL FORMULARIO =====
function initFormToggle() {
    const btnMostrarForm = document.getElementById('mostrar-form');
    const formularioContainer = document.getElementById('formulario-container');
    
    if (!btnMostrarForm || !formularioContainer) return;
    
    btnMostrarForm.addEventListener('click', function() {
        const isHidden = formularioContainer.style.display === 'none';
        
        if (isHidden) {
            // Mostrar formulario
            formularioContainer.style.display = 'block';
            btnMostrarForm.textContent = '✕ Cerrar Formulario';
            
            // Scroll suave al formulario
            setTimeout(() => {
                formularioContainer.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'nearest' 
                });
            }, 100);
        } else {
            // Ocultar formulario
            formularioContainer.style.display = 'none';
            btnMostrarForm.textContent = '📧 Completar Formulario';
        }
    });
}

// ===== ENVÍO DEL FORMULARIO =====
function initFormSubmit() {
    const form = document.getElementById('form-demo');
    
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validar formulario
        if (!validarFormulario(form)) {
            mostrarError('Por favor, completá todos los campos requeridos');
            return;
        }
        
        // Obtener datos
        const datos = {
            nombre: form.nombre.value,
            email: form.email.value,
            telefono: form.telefono.value,
            empresa: form.empresa.value || 'No especificado',
            origen: 'Landing VSL',
            fecha: new Date().toISOString()
        };
        
        // console.log('📝 Datos del formulario:', datos);
        
        // Deshabilitar botón mientras se envía
        const btnSubmit = form.querySelector('.btn-submit');
        const textoOriginal = btnSubmit.textContent;
        btnSubmit.textContent = '⏳ Enviando...';
        btnSubmit.disabled = true;
        
        // OPCIÓN 1: Enviar a tu backend
        // Descomentá esto cuando tengas tu endpoint configurado
        /*
        fetch('https://tu-backend.com/api/leads', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(datos)
        })
        .then(response => response.json())
        .then(data => {
            console.log('✅ Enviado exitosamente:', data);
            mostrarExito();
        })
        .catch(error => {
            console.error('❌ Error:', error);
            mostrarError('Hubo un error. Por favor, intentá por WhatsApp.');
            btnSubmit.textContent = textoOriginal;
            btnSubmit.disabled = false;
        });
        */
        
        // OPCIÓN 2: Redirigir a WhatsApp con los datos (TEMPORALMENTE)
        const mensaje = crearMensajeWhatsApp(datos);
        const whatsappURL = `https://api.whatsapp.com/send?phone=5491155670295&text=${encodeURIComponent(mensaje)}`;
        
        // Mostrar éxito y abrir WhatsApp
        setTimeout(() => {
            mostrarExito();
            
            // Abrir WhatsApp después de 1 segundo
            setTimeout(() => {
                window.open(whatsappURL, '_blank');
            }, 1000);
        }, 500);
    });
}

// Validar formulario
function validarFormulario(form) {
    let isValid = true;
    
    // Validar campos requeridos
    const camposRequeridos = form.querySelectorAll('[required]');
    camposRequeridos.forEach(campo => {
        if (!campo.value.trim()) {
            isValid = false;
            campo.style.borderColor = '#ff5555';
        } else {
            campo.style.borderColor = '';
        }
    });
    
    // Validar email
    const emailField = form.querySelector('input[type="email"]');
    if (emailField && !validarEmail(emailField.value)) {
        isValid = false;
        emailField.style.borderColor = '#ff5555';
    }
    
    return isValid;
}

// Validar formato de email
function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Crear mensaje para WhatsApp
function crearMensajeWhatsApp(datos) {
    return `Hola! Vi la landing de AltChat y quiero una demo 🚀

📝 Mis datos:
• Nombre: ${datos.nombre}
• Email: ${datos.email}
• WhatsApp: ${datos.telefono}
• Empresa: ${datos.empresa}

¡Espero tu contacto!`;
}

// Mostrar mensaje de éxito
function mostrarExito() {
    const form = document.getElementById('form-demo');
    const mensajeExito = document.getElementById('mensaje-exito');
    
    if (form && mensajeExito) {
        form.style.display = 'none';
        mensajeExito.style.display = 'block';
        
        // Scroll al mensaje
        mensajeExito.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
        });
    }
}

// Mostrar mensaje de error
function mostrarError(mensaje) {
    alert(mensaje);
    // Si querés algo más bonito, podés crear una notificación personalizada
}

// ===== SMOOTH SCROLL =====
function initSmoothScroll() {
    // Scroll suave para enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ===== TRACKING (OPCIONAL) =====
// Si tenés Google Analytics configurado:
function trackEvent(eventName, eventData = {}) {
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, eventData);
        // console.log('📊 Tracking:', eventName, eventData);
    }
}

// Trackear clicks en CTAs
document.addEventListener('click', function(e) {
    // Click en WhatsApp
    if (e.target.classList.contains('btn-whatsapp')) {
        trackEvent('whatsapp_click', {
            event_category: 'CTA',
            event_label: 'WhatsApp Button'
        });
    }
    
    // Click en formulario
    if (e.target.id === 'mostrar-form') {
        trackEvent('form_opened', {
            event_category: 'Form',
            event_label: 'Form Toggle'
        });
    }
});

// Trackear envío de formulario
if (document.getElementById('form-demo')) {
    document.getElementById('form-demo').addEventListener('submit', function() {
        trackEvent('form_submit', {
            event_category: 'Lead',
            event_label: 'Demo Request'
        });
    });
}

// ===== EXIT INTENT (OPCIONAL) =====
// Detectar cuando el usuario intenta salir de la página
let exitIntentShown = false;

document.addEventListener('mouseleave', function(e) {
    // Si el cursor sale por arriba y no se mostró antes
    if (e.clientY < 0 && !exitIntentShown) {
        exitIntentShown = true;
        
        // Scroll al CTA
        const ctaSection = document.querySelector('.cta-section');
        if (ctaSection) {
            ctaSection.scrollIntoView({ behavior: 'smooth' });
        }
        
        trackEvent('exit_intent');
    }
});

// ===== UTILITIES =====
// console.log('✅ Landing JS cargado correctamente');


