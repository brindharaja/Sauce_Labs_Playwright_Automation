import { test, expect } from '@playwright/test';
import logindata from '../data/loginData.json';
import {Login} from '../PomClasses/login.js';
import {Product} from '../PomClasses/products.js';
import {Cart} from '../PomClasses/cart.js';
import {Checkout} from '../PomClasses/checkout.js';

test("SwagLabs",async ({page})=>{
    const loginPage=new Login(page);
    await loginPage.goToLoginPage(logindata.url);
    await loginPage.loginOperation(logindata.users[0].username,logindata.users[0].password);
    const productPage=new Product(page);
    await productPage.sortProductFilter("Price (low to high)");
    await productPage.productValidation("Sauce Labs Bike Light");
    const cartPage=new Cart(page);
    await cartPage.cartFunction();
    await cartPage.checkoutOperation();
    const checkoutPage=new Checkout(page);
    await checkoutPage.checkout("Bindu","Raja","636001");
    await checkoutPage.logoutOperation();
})