import * as project_actions from './project_actions'
import * as APIUtil from '../util/project_api_util';



describe('todo actions', () => {
  it('recieveProject action should call specific project by id', () => {
    expect(project_actions.receiveProject(1)).toEqual({
      type: 'RECEIVE_PROJECT',
      project: 1,
    })
  })



  //
  // it('setVisibilityFilter should create SET_VISIBILITY_FILTER action', () => {
  //   expect(actions.setVisibilityFilter('active')).toEqual({
  //     type: 'SET_VISIBILITY_FILTER',
  //     filter: 'active'
  //   })
  // })
  //
  // it('toggleTodo should create TOGGLE_TODO action', () => {
  //   expect(actions.toggleTodo(1)).toEqual({
  //     type: 'TOGGLE_TODO',
  //     id: 1
  //   })
  // })
})
