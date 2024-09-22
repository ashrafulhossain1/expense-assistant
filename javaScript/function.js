// function get value by id
function getInputValueById(id) {
    const inputValue = parseFloat(document.getElementById(id).value);
    return inputValue;
}

// function verify error
function showError(id) {
    document.getElementById(id).classList.remove('hidden');
}

// function toFixed 
function formatCurrency(amount) {
    return `${amount.toFixed(2)}`
}

// add to history
function addToHistory(income, totalExpanses, balance) {
    // history
    const div = document.createElement('div');
    div.className = "bg-white p-3 rounded-md border-l-2 border-indigo-500";
    div.innerHTML = `
    <P class ="text-sm text-gray-500 font-medium">Sl-${serialCount};
    <p class="text-sm text-gray-500">Date: ${new Date().toLocaleTimeString()}</p>
    <p class="text-sm font-bold text-gray-700">income: $ ${formatCurrency(income)} </p>
    <p class="text-sm text-gray-700">expense: $ ${formatCurrency(totalExpanses)} </p>
    <p class="text-sm text-gray-700">Balance: $ ${formatCurrency(balance)} </p>
    
    `;

    const historyContainer = document.getElementById('history-list');
    //    historyContainer.prepend(div);
    historyContainer.insertBefore(div, historyContainer.firstChild);

}

// ASSISTANT OPTION
let serialCount = 0;
// add event listener for calculate button;
const calculateButton = document.getElementById('calculate');
calculateButton.addEventListener('click', function () {

    serialCount++;
    const income = getInputValueById('income');
    const software = getInputValueById('software')
    const courses = getInputValueById('courses')
    const internet = getInputValueById('internet')


    if (income <= 0 || isNaN(income)) {
        showError('income-error')
        return;
    };
    if (software <= 0 || isNaN(software)) {
        showError('software-error')
        return;
    };
    if (courses <= 0 || isNaN(courses)) {
        showError('courses-error')
        return;
    };
    if (internet <= 0 || isNaN(internet)) {
        showError('internet-error')
        return;
    };

    const totalExpanses = software + courses + internet;
    const balance = income - totalExpanses;

    if (totalExpanses > income) {
        showError('logic-error')
        return;
    }

    // update summary
    const totalExpenseEl = document.getElementById('total-expenses');
    const balanceEl = document.getElementById('balance');
    totalExpenseEl.innerText = totalExpanses.toFixed(2);
    balanceEl.innerText = balance.toFixed(2)

    const result = document.getElementById('results');
    result.classList.remove('hidden');

    // history but hidden 
    addToHistory(income, totalExpanses, balance)
});

// add event listener for saving money button;

const calculateSavingButton = document.getElementById('calculate-savings');
calculateSavingButton.addEventListener('click', function () {

    const savingPercentage = parseFloat(document.getElementById('savings').value);
    const income = parseFloat(document.getElementById('income').value);
    const software = parseFloat(document.getElementById('software').value);
    const courses = parseFloat(document.getElementById('courses').value);
    const internet = parseFloat(document.getElementById('internet').value);

    const totalExpanses = software + courses + internet;
    const balance = income - totalExpanses;

    const savingAmount = (balance * savingPercentage) / 100;
    console.log(savingAmount);

    // update summary
    const savingsAmountElement = document.getElementById('savings-amount');
    savingsAmountElement.innerText = savingAmount.toFixed(2);
    const remainingBalanceElement = document.getElementById('remaining-balance');
    remainingBalanceElement.innerText = (balance - savingAmount).toFixed(2);

});

// HISTORY OPTION

const historyTab = document.getElementById("history-tab");
const assistantTab = document.getElementById("assistant-tab");
// click history tab
historyTab.addEventListener('click', function () {

    historyTab.classList.add(
        "text-white",
        "bg-gradient-to-r",
        "from-blue-500",
        "to-purple-600"

    )
    historyTab.classList.remove('text-gray-600')

    assistantTab.classList.remove(
        "text-white",
        "bg-gradient-to-r",
        "from-blue-500",
        "to-purple-600"
    )
    assistantTab.classList.add('text-gray-600');

    document.getElementById('expense-form').classList.add('hidden');
    document.getElementById('history-section').classList.remove('hidden');

})

// click Assistant tab
assistantTab.addEventListener('click', function () {
    assistantTab.classList.add(
        "text-white",
        "bg-gradient-to-r",
        "from-blue-500",
        "to-purple-600"
    )
    assistantTab.classList.remove('text-gray-600');

    historyTab.classList.remove(
        "text-white",
        "bg-gradient-to-r",
        "from-blue-500",
        "to-purple-600"

    )
    historyTab.classList.add('text-gray-600')

    // section add and remove
    document.getElementById('expense-form').classList.remove('hidden');
    document.getElementById('history-section').classList.add('hidden');
});

