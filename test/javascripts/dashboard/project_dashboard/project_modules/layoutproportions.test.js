
test('black background covers project module for all dimensions', () => {


  var moduleWidth = document.getElementsByClassName('project-modal-grid').offsetWidth;


  maxWidth = 2200
  maxHeight = 2000

  expect(moduleWidth).toBe(maxWidth);

});
