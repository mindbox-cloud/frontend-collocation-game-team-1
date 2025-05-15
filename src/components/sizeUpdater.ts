interface SizeUpdaterProps {
    onChange: (size: number) => void
}
export const sizeUpdater = ({ onChange }: SizeUpdaterProps) => {
    let size = 100
    
    const sizeUpdater = document.createElement('div')
    const sizeInput = document.createElement('input')
    sizeInput.type = 'number'
    sizeInput.value = size.toString()

    sizeInput.addEventListener('change', () => {
        size = parseInt(sizeInput.value)
    })

    sizeUpdater.appendChild(sizeInput)

    const sizeApplyButton = document.createElement('button')
    sizeApplyButton.textContent = 'Apply size'
    sizeUpdater.appendChild(sizeApplyButton)

    sizeApplyButton.addEventListener('click', () => {
        onChange(size)
    })

    return sizeUpdater
}