import { Cycle } from './reducer'

export enum ActionTypes {
  addNewCycle = 'addNewCycle',
  interuptCurrentCycle = 'interuptCurrentCycle',
  markCycleAsFinished = 'markCycleAsFinished',
}

export function addNewCycleAction(newCycle: Cycle) {
  return {
    type: ActionTypes.addNewCycle,
    payload: {
      newCycle,
    },
  }
}

export function interuptCurrentCycleAction() {
  return {
    type: ActionTypes.interuptCurrentCycle,
  }
}

export function markCycleAsFinishedAction() {
  return {
    type: ActionTypes.markCycleAsFinished,
  }
}
