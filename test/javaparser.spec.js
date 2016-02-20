if( typeof JavaParser === 'undefined' ) {
  var JavaParser = require('..');
}

describe('JavaParser', function(){

  it('something must be done', function(){
    expect( JavaParser() ).toBe( 'doing something' );
  });

});