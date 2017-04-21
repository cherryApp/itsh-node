describe('ITSH admin page test', function() {
    it('test products page', function() {
        browser.get('http://localhost:3000/products');

        // Check form.
        expect(element(by.css('form[name="newRowForm"]'))
            .isPresent())
            .toBe(true, 'New row form is present.');

        // Check inputs of form.
        var inputs = element.all(by.css('form[name="newRowForm"] input'));
        expect(inputs.count()).toEqual(4, 'Four inputs must be present.');

        var sendBtn = element(by.css('form[name="newRowForm"] button.btn-success'));
        expect(sendBtn.isPresent()).toBe(true, 'Send btn must be present.');
    });
});