// ============================================
// BMI CALCULATOR - CON SELECTORES DE UNIDADES
// ============================================

let currentLang = 'en';
let lastResult = null;
let lastCategoryKey = null;
let darkMode = false;

const translations = {
    en: {
        title: "BMI Calculator",
        subtitle: "Body Mass Index — Know Your Health Status",
        weight: "Weight:",
        height: "Height:",
        calculate: "Calculate BMI",
        yourBmi: "Your BMI is:",
        category: "Category:",
        underweight: "Underweight",
        normal: "Normal weight",
        overweight: "Overweight",
        obese: "Obese",
        underweightRange: "Below 18.5",
        obeseRange: "30.0 and above",
        categories: "BMI Categories (WHO Standards)",
        footer: "BMI Calculator. For informational purposes only.",
        msgUnderweight: "Your BMI is below the healthy range.",
        msgNormal: "Your BMI is in the healthy range. Good job!",
        msgOverweight: "Your BMI is above the healthy range.",
        msgObese: "Your BMI is significantly above the healthy range."
    },
    es: {
        title: "Calculadora de IMC",
        subtitle: "Índice de Masa Corporal — Conoce tu salud",
        weight: "Peso:",
        height: "Altura:",
        calculate: "Calcular IMC",
        yourBmi: "Tu IMC es:",
        category: "Categoría:",
        underweight: "Bajo peso",
        normal: "Peso normal",
        overweight: "Sobrepeso",
        obese: "Obesidad",
        underweightRange: "Menos de 18.5",
        obeseRange: "30.0 o más",
        categories: "Categorías de IMC (Estándares OMS)",
        footer: "Calculadora de IMC. Solo fines informativos.",
        msgUnderweight: "Tu IMC está por debajo del rango saludable.",
        msgNormal: "Tu IMC está en el rango saludable. ¡Bien hecho!",
        msgOverweight: "Tu IMC está por encima del rango saludable.",
        msgObese: "Tu IMC está muy por encima del rango saludable."
    }
};

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Idioma
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentLang = this.dataset.lang;
            updateAllTexts();
        });
    });
    
    // Modo oscuro
    document.getElementById('darkModeToggle').addEventListener('click', function() {
        darkMode = !darkMode;
        document.body.classList.toggle('dark-mode', darkMode);
        document.body.classList.toggle('light-mode', !darkMode);
        this.textContent = darkMode ? '☀️ Light' : '🌙 Dark';
    });
    
    // Calcular
    document.getElementById('calculateBtn').addEventListener('click', calculateBMI);
    
    // Enter key
    document.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') calculateBMI();
    });
});

function updateAllTexts() {
    const t = translations[currentLang];
    
    document.getElementById('title').textContent = t.title;
    document.getElementById('subtitle').textContent = t.subtitle;
    document.getElementById('weightLabel').textContent = t.weight;
    document.getElementById('heightLabel').textContent = t.height;
    document.getElementById('calculateBtn').textContent = t.calculate;
    document.getElementById('yourBmiText').textContent = t.yourBmi;
    document.getElementById('categoriesTitle').textContent = t.categories;
    document.getElementById('underweightLabel').textContent = t.underweight;
    document.getElementById('normalLabel').textContent = t.normal;
    document.getElementById('overweightLabel').textContent = t.overweight;
    document.getElementById('obeseLabel').textContent = t.obese;
    document.getElementById('underweightRange').textContent = t.underweightRange;
    document.getElementById('obeseRange').textContent = t.obeseRange;
    document.getElementById('footerText').textContent = t.footer;
    
    if (lastResult !== null && lastCategoryKey !== null) {
        updateResultDisplay();
    }
}

function updateResultDisplay() {
    const t = translations[currentLang];
    
    let categoryText = '';
    let messageText = '';
    
    if (lastCategoryKey === 'underweight') {
        categoryText = t.underweight;
        messageText = t.msgUnderweight;
    } else if (lastCategoryKey === 'normal') {
        categoryText = t.normal;
        messageText = t.msgNormal;
    } else if (lastCategoryKey === 'overweight') {
        categoryText = t.overweight;
        messageText = t.msgOverweight;
    } else if (lastCategoryKey === 'obese') {
        categoryText = t.obese;
        messageText = t.msgObese;
    }
    
    document.getElementById('bmi-value').textContent = lastResult;
    
    const categoryEl = document.getElementById('bmi-category');
    categoryEl.textContent = `${t.category} ${categoryText}`;
    categoryEl.className = `bmi-category ${lastCategoryKey}`;
    
    document.getElementById('bmi-detail').textContent = messageText;
}

function calculateBMI() {
    // Obtener valores con sus unidades
    const weight = parseFloat(document.getElementById('weight').value);
    const weightUnit = document.getElementById('weightUnit').value;
    
    const height = parseFloat(document.getElementById('height').value);
    const heightUnit = document.getElementById('heightUnit').value;
    
    if (isNaN(weight) || isNaN(height) || weight <= 0 || height <= 0) {
        alert(currentLang === 'en' ? 'Please enter valid numbers' : 'Ingresa números válidos');
        return;
    }
    
    // Convertir peso a kg
    let weightKg = weight;
    if (weightUnit === 'lb') {
        weightKg = weight * 0.453592; // 1 lb = 0.453592 kg
    }
    
    // Convertir altura a metros
    let heightM = height;
    if (heightUnit === 'cm') {
        heightM = height / 100;
    } else if (heightUnit === 'ft') {
        heightM = height * 0.3048; // 1 ft = 0.3048 m
    } else if (heightUnit === 'in') {
        heightM = height * 0.0254; // 1 in = 0.0254 m
    }
    
    const bmi = weightKg / (heightM * heightM);
    const roundedBMI = bmi.toFixed(1);
    
    lastResult = roundedBMI;
    
    if (bmi < 18.5) {
        lastCategoryKey = 'underweight';
    } else if (bmi < 25) {
        lastCategoryKey = 'normal';
    } else if (bmi < 30) {
        lastCategoryKey = 'overweight';
    } else {
        lastCategoryKey = 'obese';
    }
    
    updateResultDisplay();
    
    document.getElementById('result').classList.remove('hidden');
}