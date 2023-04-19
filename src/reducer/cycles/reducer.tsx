import { produce } from 'immer'

import { ActionTypes } from './actions'

export interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishDate?: Date
}

interface CyclesState {
  cycles: Cycle[]
  activeCycleId: string | null
}

export function cyclesReducer(state: CyclesState, action: any) {
  switch (action.type) {
    case ActionTypes.addNewCycle:
      return produce(state, (draft) => {
        draft.cycles.push(action.payload.newCycle)
        draft.activeCycleId = action.payload.newCycleId
      })
    case ActionTypes.interuptCurrentCycle:
      return produce(state, (draft) => {
        const currentCycleIndex = state.cycles.findIndex((cycle) => {
          return cycle.id === state.activeCycleId
        })
        if (currentCycleIndex < 0) {
          return state
        }
        draft.activeCycleId = null
        draft.cycles[currentCycleIndex].interruptedDate = new Date()
      })
    case ActionTypes.markCycleAsFinished:
      return produce(state, (draft) => {
        const currentCycleIndex = state.cycles.findIndex((cycle) => {
          return cycle.id === state.activeCycleId
        })
        if (currentCycleIndex < 0) {
          return state
        }
        draft.activeCycleId = null
        draft.cycles[currentCycleIndex].finishDate = new Date()
      })
    default:
      return state
  }
}
