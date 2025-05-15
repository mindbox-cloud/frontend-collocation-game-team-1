interface SizeUpdaterProps {
    initial: { n: number, m: number }
    onChange: ({ n, m }: { n: number, m: number }) => void
}
export const sizeUpdater = ({ initial, onChange }: SizeUpdaterProps) => {
    let n = initial.n
    let m = initial.m

    const sizeUpdater = document.createElement('div')

    // n input
    const nInput = document.createElement('input')
    nInput.type = 'number'
    nInput.value = n.toString()

    nInput.addEventListener('change', () => {
        n = parseInt(nInput.value)
    })

    sizeUpdater.appendChild(nInput)

    // m input
    const mInput = document.createElement('input')
    mInput.type = 'number'
    mInput.value = m.toString()

    mInput.addEventListener('change', () => {
        m = parseInt(mInput.value)
    })

    sizeUpdater.appendChild(mInput)

    const sizeApplyButton = document.createElement('button')
    sizeApplyButton.textContent = 'Apply size'
    sizeUpdater.appendChild(sizeApplyButton)

    sizeApplyButton.addEventListener('click', () => {
        onChange({ n, m })
    })

    return sizeUpdater
}