interface SizeUpdaterProps {
    initialValue: number
    onChange: (size: number) => void
}
export const sizeUpdater = ({ initialValue, onChange }: SizeUpdaterProps) => {
    let size = initialValue
    
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