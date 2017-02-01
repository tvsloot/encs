describe('Cards', function() {
  var $httpBackend;
  var Cards;
  var cardsData = [
    {english: 'cheers'},
    {czech: 'Na zdraví'}
  ];

  // Add a custom equality tester before each test
  beforeEach(function() {
    jasmine.addCustomEqualityTester(angular.equals);
  });

  beforeEach(module('resources.cards'));

  // Instantiate the service and "train" `$httpBackend` before each test
  beforeEach(inject(function(_$httpBackend_, _Cards_) {
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('data/vocab.json').respond(cardsData);

    Cards = _Cards_;
  }));

  // Verify that there are no outstanding expectations or requests after each test
  afterEach(function () {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should fetch the words data from `/data/vocab.json`', function() {
    var cards = Cards.query();

    expect(cards).toEqual([]);

    $httpBackend.flush();
    expect(cards).toEqual(cardsData);
  });

});
