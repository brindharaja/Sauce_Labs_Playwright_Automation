import {expect} from '@playwright/test';
exports.Cart=class cart{
    constructor(page){
        this.page=page;
        this.productname=this.page.locator(".inventory_item_name");
        this.removeBtn=this.page.locator("//button[normalize-space()='Remove']");
        this.badgeCount=this.page.locator(".shopping_cart_badge");
        this.badge=this.page.locator(".shopping_cart_link");
        this.checkoutBtn=this.page.locator("#checkout");
    }
    async productRemove(productName){
        const count=await this.productname.count();
        for(let i=0;i<count;i++){
            const product=(await this.productname.nth(i).textContent()).trim();
            if(productName==product){
                await this.removeBtn.nth(i).click();
            }
        }
    }
    async cartFunction(){
        const badgeCnt=(await this.badgeCount.textContent()).trim();
        await this.badge.click();
        await expect(this.page).toHaveURL("https://www.saucedemo.com/cart.html");
        const count=await this.productname.count();
        if(count==badgeCnt){
            console.log("Badge count and product count is equal");
        }
    }
    async checkoutOperation(){
        await this.checkoutBtn.click();
    }
}