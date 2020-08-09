import React, { useState } from 'react';

export interface NumberInputProps extends React.HTMLProps<HTMLInputElement> {
  value: number
  setValue: (n: number) => void
}

export function NumberInput({ value, setValue, ...props }: NumberInputProps) {
  const [stringValue, setStringValue] = useState(value.toString())

  const onChange = (e) => {
    const currentValue = e.target.value
    if (currentValue.trim() === '' || !/^\d+$/.test(currentValue)) {
      setValue(NaN)
    } else {
      setValue(Number(currentValue))
    }
    setStringValue(currentValue)
  }

  return (
    <input {...props}
      type="text" className="textbox"
      value={stringValue} onChange={onChange} />
  )
}
