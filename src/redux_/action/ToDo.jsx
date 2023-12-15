import { CHANGE_VM } from 'redux_/constants/ToDo'

export function ganttViewMode(vm) {
  return {
    type: CHANGE_VM,
    vm,
  }
}
