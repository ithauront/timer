import { ReactNode, createContext, useState, useReducer } from 'react'
import { Cycle, cyclesReducer } from '../reducer/cycles/reducer'
import {
  addNewCycleAction,
  interuptCurrentCycleAction,
  markCycleAsFinishedAction,
} from '../reducer/cycles/actions'

interface CreateCycleData {
  task: string
  minutesAmount: number
}

interface cyclesContextType {
  cycles: Cycle[]
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  markCurrentCycleAsFinished: () => void
  amountSecondsPassed: number
  updatedSecondsPassed: (seconds: number) => void
  createNewCycle: (data: CreateCycleData) => void
  interruptCurrentCycle: () => void
}

interface CyclesContextProviderProps {
  children: ReactNode
}

export const cyclesContext = createContext({} as cyclesContextType)

export function CyclesContextProvider({
  children,
}: CyclesContextProviderProps) {
  const [cyclesState, dispatch] = useReducer(cyclesReducer, {
    cycles: [],
    activeCycleId: null,
  })

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)
  const { cycles, activeCycleId } = cyclesState
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  function updatedSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds)
  }

  function markCurrentCycleAsFinished() {
    dispatch(markCycleAsFinishedAction())
  }

  function createNewCycle(data: CreateCycleData) {
    const newCycle: Cycle = {
      id: String(new Date().getTime()),
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }

    dispatch(addNewCycleAction(newCycle))
    setAmountSecondsPassed(0)
  }

  function interruptCurrentCycle() {
    dispatch(interuptCurrentCycleAction())
  }

  return (
    <cyclesContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCycleId,
        markCurrentCycleAsFinished,
        amountSecondsPassed,
        updatedSecondsPassed,
        createNewCycle,
        interruptCurrentCycle,
      }}
    >
      {children}
    </cyclesContext.Provider>
  )
}
