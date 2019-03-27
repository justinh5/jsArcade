


describe('Something blah blah', function() {

  it('Compare numbers', function() {
    expect(5).toEqual(5);
  });

  it('Compare string', function() {
    expect("one").toEqual("one");
  });

  it('should fail', function() {
    expect("one").toEqual(1);
  });
});
