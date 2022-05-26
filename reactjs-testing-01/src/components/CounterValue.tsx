import React, { useContext } from 'react'
import { CounterContext } from '../Context/CounterContext'

const CounterValue = () => {
  const {counter} = useContext(CounterContext)

  return (
    <div>Counter Value :  {`${counter}`}</div>
  )
}

export default CounterValue