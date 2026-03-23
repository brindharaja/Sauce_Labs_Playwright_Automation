import { expect } from '@playwright/test';
exports.Checkout=class checkout{
    constructor(page){
        this.page=page;
        this.firstNameTf="#first-name";
        this.lastNameTf="#last-name";
        this.pincodeTf="#postal-code";
        this.continueBtn="#continue";
        this.finishBtn="#finish";
        this.validationMsg="//h2[normalize-space()='Thank you for your order!']";
        this.openMenuBtn="//button[normalize-space()='Open Menu']";
        this.logoutLink="#logout_sidebar_link";
    }

    async checkout(firstname,lastname,pincode){
        await expect(this.page).toHaveURL("https://www.saucedemo.com/checkout-step-one.html");
        await this.page.fill(this.firstNameTf,firstname);
        await this.page.fill(this.lastNameTf,lastname);
        await this.page.fill(this.pincodeTf,pincode);
        await this.page.click(this.continueBtn);
        await expect(this.page).toHaveURL("https://www.saucedemo.com/checkout-step-two.html");
        await this.page.click(this.finishBtn);
        await expect(this.page.locator(this.validationMsg)).toHaveText("Thank you for your order!");
        await expect(this.page).toHaveURL("https://www.saucedemo.com/checkout-complete.html");
    }

    async logoutOperation(){
        await this.page.click(this.openMenuBtn);
        await this.page.click(this.logoutLink);
    }
}