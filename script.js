function calculateBMI() {
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value) / 100;
    
    if (isNaN(weight) || isNaN(height) || weight <= 0 || height <= 0) {
        alert('Please enter valid positive numbers');
        return;
    }
    
    const bmi = weight / (height * height);
    const roundedBMI = bmi.toFixed(1);
    
    let category = '';
    let categoryClass = '';
    let advice = '';
    let affiliateProduct = '';
    
    if (bmi < 18.5) {
        category = 'Underweight';
        categoryClass = 'underweight';
        advice = 'You are underweight. Consider consulting a nutritionist for a healthy weight gain plan.';
        affiliateProduct = 'Check out healthy weight gain supplements on Amazon';
    } else if (bmi < 25) {
        category = 'Normal weight';
        categoryClass = 'normal';
        advice = 'Great! You have a healthy weight. Maintain your current lifestyle with balanced diet and exercise.';
        affiliateProduct = 'Maintain your health with these fitness trackers';
    } else if (bmi < 30) {
        category = 'Overweight';
        categoryClass = 'overweight';
        advice = 'You are overweight. Consider increasing physical activity and reviewing your diet.';
        affiliateProduct = 'Start your fitness journey with these home workout equipment';
    } else {
        category = 'Obese';
        categoryClass = 'obese';
        advice = 'You are in the obese range. We strongly recommend consulting a healthcare provider.';
        affiliateProduct = 'Check out doctor-recommended weight loss programs';
    }
    
    document.getElementById('bmi-value').textContent = roundedBMI;
    
    const categoryElement = document.getElementById('bmi-category');
    categoryElement.textContent = `Category: ${category}`;
    categoryElement.className = `bmi-category ${categoryClass}`;
    
    const detailElement = document.getElementById('bmi-detail');
    detailElement.textContent = advice;
    detailElement.className = `bmi-detail ${categoryClass}`;
    
    const affiliateSpace = document.getElementById('affiliateSpace');
    affiliateSpace.innerHTML = `<p>💡 <strong>Recommendation:</strong> ${affiliateProduct}</p>`;
    
    document.getElementById('result').classList.remove('hidden');
}

document.getElementById('calculateBtn').addEventListener('click', calculateBMI);

document.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        calculateBMI();
    }
});

document.querySelectorAll('input').forEach(input => {
    input.addEventListener('keypress', function(e) {
        const char = String.fromCharCode(e.charCode);
        if (!/[\d.]/.test(char)) {
            e.preventDefault();
        }
    });
});
