import { expect } from '@playwright/test';

exports.Product = class Product {
    constructor(page) {
        this.page = page;
        this.productNameList = this.page.locator("//div[@class='inventory_item_name ']");
        this.productPriceList = this.page.locator("//div[@class='inventory_item_price']");
        this.sort = this.page.locator(".product_sort_container");
        this.cartBtn = this.page.locator("#add-to-cart");
    }

    async sortProductFilter(filter) {
        await this.sort.selectOption({ label: filter });
    }

    async productValidation(product) {
        let productFound = false;
        const count = await this.productNameList.count();
        await expect(this.page).toHaveURL("https://www.saucedemo.com/inventory.html");
        for (let i = 0; i < count; i++) {
            const productName = this.productNameList.nth(i);
            const productPrice = this.productPriceList.nth(i);
            const nameText = (await productName.textContent()).trim();
            if (nameText === product) {
                await expect(productName).toHaveText(product);
                await expect(productPrice).toHaveText("$9.99");
                await productName.click();
                await expect(this.page.url()).toContain("https://www.saucedemo.com/inventory-item.html");
                await this.cartBtn.click();
                productFound = true;
                break;
            }
        }

        if (!productFound) {
            console.log("Product Not Found");
        }
    }
};