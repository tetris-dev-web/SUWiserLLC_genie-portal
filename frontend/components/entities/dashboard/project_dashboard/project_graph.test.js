import ProjectGraph from './project_graph'

function componentSetup(){
  const props = {
    fetchProjects: jest.fn(()=>{
      return Promise.resolve();
    })
  }
  const eWrapper = mount(<ProjectGraph {...props}/>)
  return {
    props,
    eWrapper
  }
}


it('should match snapshot', () => {
     const { eWrapper} = componentSetup()
     // expect(eWrapper.find('section').hasClass('graph-container')).toBe(true)
      expect(eWrapper).toMatchSnapshot();
   })
