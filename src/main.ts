const container = document.getElementById('app')
console.log(container)
if (container) {
    const sizeInput = document.createElement('input')
    sizeInput.type = 'number'
    sizeInput.value = '100'
    container.appendChild(sizeInput)
}