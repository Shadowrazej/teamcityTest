describe('angularjs homepage todo list', function() {
    beforeEach(async function () {
        await browser.get('https://angular.io/docs');
    });

    var pageObject = require('./pageObject.js');

    /**
     * При открытии подменю класс collapsed изменяется на expanded, таким способом проверил: открылось ли подменю.
     */
    it('Test submenu', async function () {
        await pageObject.buttonTutorial.click();
        expect(await pageObject.elementTestExpand1.getAttribute('class')).toContain('expanded');
    });

    /**
     * Открываем меню > подменю tutorial > закрываем меню > открываем меню.
     * Подменю tutorial осталось открытым
     */
    it('Test menu with submenu 1', async function () {
        await pageObject.buttonTutorial.click();
        await pageObject.buttonMenu.click();
        await pageObject.buttonMenu.click();
        expect(await pageObject.elementTestExpand1.getAttribute('class')).toContain('expanded');
    });

    /**
     * Открываем меню > подменю tutorial > открываем Introduction > закрываем меню > открываем меню.
     * Подменю tutorial осталось открытым
     * При клике на Introduction в значение атрибута class добавляется 'selected'
     */
    it('Test menu with submenu 2', async function () {
        await pageObject.buttonTutorial.click();
        await pageObject.buttonIntroduction.click();
        await pageObject.buttonMenu.click();
        await pageObject.buttonMenu.click();
        expect(await pageObject.elementTestExpand2.getAttribute('class')).toContain('selected');
    });

    /**
     * Проверяем всплывающее название(title)
     */
    it ('Test browser title', async function() {
        expect(await pageObject.getBrowserTitle()).toEqual('Angular - What is Angular?');
    });

    /**
     * Проверяем всплывающее название(title) строчного элемента
     */
    it ('Test element title', async function() {
        var elem = await pageObject.getLinkLineElement('a', 'modules');
        expect(await pageObject.getTitle(elem)).toEqual('ES2015 Modules');
    });

    /**
     * Тест блочной ссылки
     */
    it ('Test block link', async function() {
        await pageObject.linkBlockElement.click();
        expect(await pageObject.getBrowserTitle()).toEqual('Angular - QuickStart');
    });

    /**
     * Test Angular home page
     */
    it ('Test Angular home link', async function() {
        await pageObject.angularHomeButton.click();
        expect(await pageObject.getBrowserTitle()).toEqual('Angular');
    });

    /**
     * Тест смены языка на китайский
     */
    xit ('Test china language', async function() {
        await pageObject.chinaLanguage.click();
        expect(await pageObject.getBrowserCurrentUrl()).toBe('https://angular.cn/');
    });

    /**
     * При вводе в строке поиска валидного значения появляется подменю(появляется <h2>Search Results</h2>)
     */
    it('Test search field 1', async function () {
        await pageObject.searchField.click();
        await pageObject.searchField.sendKeys('angular');
        await browser.sleep(10000);
        expect(await pageObject.searchResultsElement.isPresent()).toBe(true);
    });

    /**
     * При вводе в строке поиска не валидного значения появляется подменю(появляется <p>No results found.</p>)
     */
    it('Test search field 2', async function () {
        await pageObject.searchField.click();
        await pageObject.searchField.sendKeys('asdasdqwe');
        await browser.sleep(10000);
        expect(await pageObject.searchNoResultsElement.isPresent()).toBe(true);
    });

    /**
     * Тест перехода по ссылке в меню поиска
     */
    it('Test search field 3', async function () {
        await pageObject.searchField.click();
        await pageObject.searchField.sendKeys('angular');
        await browser.sleep(10000);
        await pageObject.searchElement.click();
        expect(await pageObject.getBrowserTitle()).toEqual('Angular - setAngularJSGlobal');
    });
});