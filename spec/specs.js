describe('Ticket', function() {

  describe('new', function() {
    it("creates a new ticket object", function() {
      var ticket = new Ticket('Mad Max', new Date(2015, 1, 1, 16, 0), 23);
      expect(ticket.name).to.equal('Mad Max');
      expect(ticket.time.getDate()).to.equal(1);
      expect(ticket.time.getHours()).to.equal(16);
      expect(ticket.time.getFullYear()).to.equal(2015);
      expect(ticket.age).to.equal(23);
    });
  })

  describe('price', function() {
    it("returns the price of the ticket based on its parameters", function() {
      var ticket = new Ticket('Mad Max', new Date(2015, 1, 1, 16, 0), 23);
      expect(ticket.price()).to.equal(7.5);
    });
  });

});
