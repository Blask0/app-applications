const Page = require('../page');
const lib = require('../../libs/elements');
const appConst = require('../../libs/app_const');
const XPATH = {
    container: `//div[contains(@id,'UninstallApplicationDialog')]`,
    content: `//div[contains(@id,'ModalDialogContentPanel')]/h6`,
    yesButton: `//button[contains(@id,'DialogButton')]/span[text()='Yes']`,
    noButton: `//button[contains(@id,'DialogButton')]/span[text()='No']`,
};
class UninstallAppDialog extends Page {

    get cancelButtonTop() {
        return XPATH.container + lib.CANCEL_BUTTON_TOP;
    }

    get yesButton() {
        return XPATH.container + XPATH.yesButton;
    }

    get noButton() {
        return XPATH.container + XPATH.noButton;
    }

    getHeader() {
        return this.getText(XPATH.content);
    }

    waitForOpened() {
        return this.waitForElementDisplayed(XPATH.container, appConst.TIMEOUT_3).catch(err => {
            this.saveScreenshot('err_load_uninstall_dialog');
            throw new Error('Uninstall dialog was not loaded! ' + err);
        });
    }

    clickOnYesButton() {
        return this.clickOnElement(this.yesButton).catch(err => {
            throw new Error('Error when try click on Yes button ' + err);
        }).then(()=>{
            return this.pause(300);
        })
    }

    clickOnCancelButtonTop() {
        return this.clickOnElement(this.cancelButtonTop).catch(err => {
            this.saveScreenshot('err_uninstall_dialog_cancel');
            throw new Error('Error when try click on cancel button ' + err);
        })
    }

    clickOnNoButton() {
        return this.clickOnElement(this.noButton).catch(err => {
            throw new Error('Error when try click on no button ' + err);
        })
    }

    waitForClosed() {
        return this.waitForElementNotDisplayed(XPATH.container, appConst.TIMEOUT_3).catch(error => {
            this.saveScreenshot('err_close_uninstall_dialog');
            throw new Error('Uninstall Dialog was not closed');
        });
    }

    isYesButtonDisplayed() {
        return this.isElementDisplayed(this.yesButton).catch(err => {
            this.saveScreenshot('err_uninstall_dialog_yes_button');
            throw new Error('Uninstall Dialog Yes button is not visible ' + err);
        });
    }

    isNoButtonDisplayed() {
        return this.isElementDisplayed(this.noButton).catch(err => {
            this.saveScreenshot('err_uninstall_dialog_no_button');
            throw new Error('Uninstall Dialog No button is not visible ' + err);
        });
    }
};
module.exports = UninstallAppDialog;