const chai = require('chai');
chai.use(require('chai-as-promised'));
const expect = chai.expect;
const assert = chai.assert;
const webDriverHelper = require('../libs/WebDriverHelper');
const appConst = require('../libs/app_const');
const studioUtils = require('../libs/studio.utils.js');
const AppBrowsePanel = require('../page_objects/applications/applications.browse.panel');
const AppStatisticPanel = require('../page_objects/applications/application.item.statistic.panel');

describe('Applications Browse panel - selection of items spec', function () {
    this.timeout(appConst.SUITE_TIMEOUT);
    webDriverHelper.setupBrowser();
    //Content Studio should not be installed!
    const TOTAL_NUMBER_OF_APPLICATIONS = 5;

    it(`GIVEN applications grid is loaded THEN expected page-title should be displayed`, () => {
        let appBrowsePanel = new AppBrowsePanel();
        return appBrowsePanel.getTitle().then(title => {
            expect(title).to.equal(appConst.APPLICATION_TITLE);
        })
    });

    it(`WHEN 'selection controller'-checkbox has been clicked THEN all rows in grid should be selected`, () => {
        let appBrowsePanel = new AppBrowsePanel();
        return appBrowsePanel.clickOnSelectionControllerCheckbox().then(() => {
            studioUtils.saveScreenshot("selection_controller_checked");
            return appBrowsePanel.getNumberOfSelectedRows();
        }).then(result => {
            assert.equal(result, TOTAL_NUMBER_OF_APPLICATIONS, 'all applications should be selected');
        })
    });

    it(`GIVEN all applications are selected WHEN 'selection controller'-checkbox has been clicked THEN all rows in grid should be white`,
        () => {
            let appBrowsePanel = new AppBrowsePanel();
            return appBrowsePanel.clickOnSelectionControllerCheckbox().then(() => {
                return appBrowsePanel.clickOnSelectionControllerCheckbox();
            }).then(() => {
                studioUtils.saveScreenshot("selection_controller_unchecked");
                return appBrowsePanel.getNumberOfSelectedRows();
            }).then(result => {
                assert.equal(result, 0, 'all applications should be unselected');
            })
        });

    it(`WHEN applications grid is loaded THEN rows with applications should be present in the grid`, () => {
        let appBrowsePanel = new AppBrowsePanel();
        return appBrowsePanel.getApplicationDisplayNames().then(result => {
            studioUtils.saveScreenshot("app_browse_application");
            assert.isTrue(result.length > 0, 'rows with applications should be present in the grid')
        })
    });

    it(`GIVEN existing application is selected WHEN Arrow Down key has been pressed THEN the next application should be selected`,
        () => {
            let appBrowsePanel = new AppBrowsePanel();
            let appStatisticPanel = new AppStatisticPanel();
            return appBrowsePanel.clickCheckboxAndSelectRowByDisplayName(appConst.TEST_APPLICATIONS.FIRST_APP).then(() => {
                return appBrowsePanel.pressArrowDownKey();
            }).then(() => {
                return appStatisticPanel.getApplicationName();
            }).then(result => {
                assert.isTrue(result == appConst.TEST_APPLICATIONS.FOURTH_APP, 'the next application should be selected');
            })
        });

    it(`GIVEN existing application is selected WHEN Arrow Down key has been pressed THEN the next application should be selected`,
        () => {
            let appBrowsePanel = new AppBrowsePanel();
            let appStatisticPanel = new AppStatisticPanel();
            return appBrowsePanel.clickCheckboxAndSelectRowByDisplayName(appConst.TEST_APPLICATIONS.FOURTH_APP).then(() => {
                return appBrowsePanel.pressArrowUpKey();
            }).then(() => {
                return appStatisticPanel.getApplicationName();
            }).then(result => {
                assert.isTrue(result == appConst.TEST_APPLICATIONS.FIRST_APP, 'previous application should be selected');
            })
        });

    it(`GIVEN existing application is selected WHEN selecting one more THEN last selected application should be displayed on the Selection Panel`,
        () => {
            let appStatisticPanel = new AppStatisticPanel();
            let appBrowsePanel = new AppBrowsePanel();
            return appBrowsePanel.clickCheckboxAndSelectRowByDisplayName(appConst.TEST_APPLICATIONS.FIRST_APP).then(() => {
                return appBrowsePanel.clickCheckboxAndSelectRowByDisplayName(appConst.TEST_APPLICATIONS.SECOND_APP);
            }).then(() => {
                return appStatisticPanel.getApplicationName();
            }).then(result => {
                assert.isTrue(result == appConst.TEST_APPLICATIONS.SECOND_APP,
                    'last selected application should be displayed on the Selection Panel');
            })
        });

    it(`GIVEN three application are selected WHEN deselecting one THEN second application should be displayed on the Statistic Panel`,
        () => {
            let appBrowsePanel = new AppBrowsePanel();
            let appStatisticPanel = new AppStatisticPanel();
            return appBrowsePanel.clickCheckboxAndSelectRowByDisplayName(appConst.TEST_APPLICATIONS.FIRST_APP).then(() => {
                return appBrowsePanel.clickCheckboxAndSelectRowByDisplayName(appConst.TEST_APPLICATIONS.SECOND_APP);
            }).then(() => {
                return appBrowsePanel.clickCheckboxAndSelectRowByDisplayName(appConst.TEST_APPLICATIONS.THIRD_APP);
            }).then(() => {
                return appBrowsePanel.clickCheckboxAndSelectRowByDisplayName(appConst.TEST_APPLICATIONS.THIRD_APP);
            }).then(() => {
                return appStatisticPanel.getApplicationName();
            }).then(result => {
                assert.isTrue(result == appConst.TEST_APPLICATIONS.SECOND_APP,
                    'last selected application should be displayed on the Selection Panel');
            })
        });

    beforeEach(() => studioUtils.navigateToApplicationsApp());
    afterEach(() => studioUtils.doCloseCurrentBrowserTab());
    before(() => {
        return console.log('specification is starting: ' + this.title);
    });
});
