const chai = require('chai');
chai.use(require('chai-as-promised'));
const expect = chai.expect;
const assert = chai.assert;
const webDriverHelper = require('../libs/WebDriverHelper');
const appConst = require('../libs/app_const');
const studioUtils = require('../libs/studio.utils.js');
const appBrowsePanel = require('../page_objects/applications/applications.browse.panel');
const appStatisticPanel = require('../page_objects/applications/application.item.statistic.panel');

const { saveCoverage, loadCoverage, writeCoverageToFile } = require('../utils/blanket');

describe('Applications Browse panel - selection of items spec', function () {
    this.timeout(appConst.SUITE_TIMEOUT);
    webDriverHelper.setupBrowser();
    const TOTAL_NUMBER_OF_APPLICATIONS = 5;

    it(`GIVEN applications grid is loaded THEN correct page-title should be displayed`, () => {
        return appBrowsePanel.getTitle().then((title)=> {
            studioUtils.saveScreenshot("app_browse_title");
            expect(title).to.equal(appConst.APPLICATION_TITLE);
        })
    });

    it(`GIVEN all applications are selected WHEN 'selection controller'-checkbox has been clicked THEN all rows in grid should be white`,
        () => {
            return appBrowsePanel.clickOnSelectionControllerCheckbox().pause(1000).then(()=> {
                return appBrowsePanel.clickOnSelectionControllerCheckbox();
            }).then(()=> {
                studioUtils.saveScreenshot("selection_controller_unchecked");
                return appBrowsePanel.getNumberOfSelectedRows();
            }).then(result=> {
                assert.equal(result, 0, 'all applications should be unselected');
            })
        });

    it(`WHEN applications grid is loaded THEN rows with applications should be present in the grid`, () => {
        return appBrowsePanel.getApplicationDisplayNames().then(result=> {
            studioUtils.saveScreenshot("app_browse_application");
            assert.isTrue(result.length > 0, 'rows with applications should be present in the grid')
        });
    });

    beforeEach(async () => {
        console.log('{{{\n');
        await studioUtils.navigateToApplicationsApp();
        await loadCoverage(webDriverHelper.getBrowser());
    });
    afterEach(async () => {
        await saveCoverage(webDriverHelper.getBrowser());
        await studioUtils.doCloseCurrentBrowserTab();
        console.log('\n}}}\n');
    });
    before(() => {
        console.log('specification is starting: ' + this.title);
    });
    after(() => {
        writeCoverageToFile(webDriverHelper.getBrowser());
    });
});
