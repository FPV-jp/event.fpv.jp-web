import { CHANGE_VM } from 'redux/constants/ToDo'

export function ganttViewMode(vm) {
  return {
    type: CHANGE_VM,
    vm,
  }
}
