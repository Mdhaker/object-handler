const {deepAssign} = require('./handler');
var expect = require('chai').expect;

  describe('deepAssign', function() {
    let firstObject = {key1:"foo",key2:{key21:"bar",key22:{key221:"xyz"}}};
    let lastObject = {key1:"fook1",key2:{key21:"foo",key22:{key221:"xyzw"}}};
    it('should return a merged object of deeply nested fields', function() {
      let objectToReturn = deepAssign(firstObject,lastObject);
      expect(objectToReturn).to.have.property('key1').to.equal('fook1');
      expect(objectToReturn).to.have.property('key2')
                            .to.be.an('object').and.to.have.property('key21').to.equal('foo');
      expect(objectToReturn['key2']['key22']).to.be.an('object').and.to.have.property('key221').and.to.equal('xyzw');                      
                                                
    });
  });