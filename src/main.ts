const container = document.getElementById('app')

if (container) {
    const sizeInput = document.createElement('input')
    sizeInput.type = 'number'
    sizeInput.value = '100'
    container.appendChild(sizeInput)

    const canvas = document.createElement('canvas')
    container.appendChild(canvas)
}