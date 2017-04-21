describe('ITSH new row validate', function() {
    it('test validation', function() {
        // browser.get('http://localhost:3000/products');

        // Check form.
        var inputs = element.all(by.css('form[name="newRowForm"] input'));
        var errors = element.all(by.css('form[name="newRowForm"] td > span'));

        var values = ['Almafa', 'Samsung', '50000', 'true'];

        // Test name.
        inputs.get(0).sendKeys('almafa');
        expect(errors.get(0).isDisplayed())
            .toBe(true, 'Name error must be display.');
        inputs.get(0).clear();
        inputs.get(0).sendKeys(values[0]);
        expect(errors.get(0).isDisplayed())
            .toBe(false, 'Name error must be not display.');

        // Man.
        inputs.get(1).sendKeys('almafa');
        expect(errors.get(1).isDisplayed())
            .toBe(true, 'Man error must be display.');
        inputs.get(1).clear();
        inputs.get(1).sendKeys(values[1]);
        expect(errors.get(1).isDisplayed())
            .toBe(false, 'Man error must be not display.');

        // Price.
        inputs.get(2).sendKeys('101010101010');
        expect(errors.get(2).isDisplayed())
            .toBe(true, 'Price error must be display.');
        inputs.get(2).clear();
        inputs.get(2).sendKeys(values[2]);
        expect(errors.get(2).isDisplayed())
            .toBe(false, 'Price error must be not display.');

        // Active.
        inputs.get(3).sendKeys('other');
        expect(errors.get(3).isDisplayed())
            .toBe(true, 'Active error must be display.');
        inputs.get(3).clear();
        inputs.get(3).sendKeys(values[3]);
        expect(errors.get(3).isDisplayed())
            .toBe(false, 'Active error must be not display.');

        // Send btn.
        var sendBtn = element(by.css('form[name="newRowForm"] button.btn-success[disabled]'));
        expect(sendBtn.isPresent()).toBe(false, 'Send btn disabled?');

        sendBtn = element(by.css('form[name="newRowForm"] button.btn-success'));
        sendBtn.click();

        browser.sleep(2000).then(function() {
            console.log('sleeped');
            var grid = $$('table.table-striped tbody tr:last-child td input');
            for (var i = 0; i < grid.count(); i++) {
                var val = grid.get(i).getAttribute('value');
                expect(val).toEqual(values[i]);
            }
        });
    });
});