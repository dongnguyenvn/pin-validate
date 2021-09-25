import React, { FC, useRef, ChangeEvent, KeyboardEvent,useEffect} from "react"

type PinInputGridProps = {
    pin: (number | undefined)[],
    onPinChanged: (pinEntry: number | undefined, index: number) => void,
    pinInputLength: number
}
const PIN_MIN_VALUE = 0
const PIN_MAX_VALUE = 9
const BACKSPACE_KEY = 'Backspace'

const PinInputGrid: FC<PinInputGridProps> = ({ pinInputLength, onPinChanged, pin }) => {
    const inputRefs = useRef<HTMLInputElement[]>([])
    const changePinFocus = (pinIndex: number) => {
        const ref = inputRefs.current[pinIndex]
        if (ref) {
            ref.focus()
            ref.type = "password"
        }
    }
    const onChange = (e: ChangeEvent<HTMLInputElement>, i: number) => {
        const value = e.target.value
        const pinNumber = Number(e.target.value.trim())
        if (isNaN(pinNumber) || value.length === 0) {
            return
        }
        if (pinNumber >= PIN_MIN_VALUE && pinNumber <= PIN_MAX_VALUE) {
            onPinChanged(pinNumber, i)
            if (i < pinInputLength - 1) {
                changePinFocus(i + 1)
            }
        }
    }
    const onKeyDown = (e: KeyboardEvent<HTMLInputElement>, i: number) => {
        const keyBoardCode = e.nativeEvent.code
        if (keyBoardCode !== BACKSPACE_KEY) return
        changePinFocus(i - 1)
        onPinChanged(undefined, i)
    }
    const onFocus = (e:React.FocusEvent<HTMLInputElement>,i:number) => {

    }



    useEffect(() => {
        inputRefs.current[0].focus()
        inputRefs.current[0].type = 'password'
    }, [])
    return (
        <div className="pin-input-container">
            {Array.from({ length: pinInputLength }, (_, index) => (
                <input 
                    key={index} 
                    ref={el => {if(el) inputRefs.current[index] = el}} 
                    onChange={(event) => onChange(event, index)} 
                    value={pin[index] || ''} 
                    onFocus={(event) => onFocus(event,index)}
                    onKeyDown={(event) => onKeyDown(event, index)}
                    className="pin-input"
                />
            ))}
        </div>
    )
}

export default PinInputGrid
