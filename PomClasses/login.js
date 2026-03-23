import { expect } from '@playwright/test';
exports.Login=class login{
    constructor(page){
        this.page=page;
        this.usernameTf="#user-name";
        this.passwordTf="#password";
        this.loginBtn="#login-button";
    }

    async goToLoginPage(url){
        await this.page.goto(url);
    }

    async loginOperation(username,password){
        if((
            username !== "standard_user" && username !== "locked_out_user" && username !== "problem_user" && 
            username !== "performance_glitch_user" && username !== "error_user" && username !== "visual_user"
        ) || password !== "secret_sauce"){
            console.log("Invalid username or password");
            return;
        } 
        await this.page.fill(this.usernameTf,username);
        await this.page.fill(this.passwordTf,password);
        await expect(this.page.locator(this.usernameTf)).toHaveValue(username);
        await expect(this.page.locator(this.passwordTf)).toHaveValue(password);
        await this.page.click(this.loginBtn);
    }
}