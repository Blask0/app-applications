const Page = require('./page');

class LoginPage extends Page {

    get usernameInput() {
        return `input[id^='username-input']`
    }

    get passwordInput() {
        return `input[id^='password-input']`
    }

    get loginButton() {
        return `button[id^='login-button']`
    }

    async typeUserName(userName) {
        let usernameInput = await this.findElement(this.usernameInput);
        return await usernameInput.addValue(userName);
    }

    async clickOnLoginButton() {
        return this.clickOnElement(this.loginButton);
    }

    typePassword() {
        //this.passwordInput.click();
    }

    waitForPageLoaded(ms) {
        return this.browser.$(`//input[contains(@id,'username-input')]`).then(element => {
            return element.waitForDisplayed(ms);
        });
    }

    getTitle() {
        return this.browser.getTitle();
    }

    async doLogin(userName,password) {
        let name = userName ? userName : 'su';
        let pass = password ? password : 'password';
        let usernameInput = await this.findElement(this.usernameInput);
        let passwordInput = await this.findElement(this.passwordInput);
        await usernameInput.waitForDisplayed(1000);
        await usernameInput.addValue(name);
        await passwordInput.addValue(pass);
        return await this.clickOnLoginButton();
    }
};
module.exports = LoginPage;



