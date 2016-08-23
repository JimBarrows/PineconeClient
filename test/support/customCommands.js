/**
 * Created by JimBarrows on 8/20/16.
 */
'use strict';

import {Account} from "@reallybigtree/pinecone-models";
import Campaigns from "../pages/Campaigns";
import {createAccount, user} from "./fixtures";
import Login from "../pages/Login";


browser.addCommand('createAccount', function async() {
	return createAccount();
});

browser.addCommand("loginToApplication", function () {
	browser.url('/#/login');
	browser.waitUntil(function () {
		return browser.getText('.page-header h1') === 'Login'
	}, 5000, 'Didn\'t change to login page');
	var u = browser.element('#username');
	console.log("element: ", u);
	u.setValue(user.username);
	browser.element("#password").setValue(user.password);
	browser.waitForValue("#password", 2000, "Password has never been filled in");
	browser.waitForValue("#username", 2000, "Username has never been filled in");
	browser.click("#loginButton");
	browser.waitUntil(function () {
		return browser.getText('.page-header h1') === 'Campaigns'
	}, 2000, "Didnt change to campaign page");
});

browser.addCommand("addAssetTestData", function (numberOfAssets) {
	let assets = [];
	for (let index = 0; index < numberOfAssets; index++) {
		assets.push({
			name: "asset name " + index,
			description: "asset description" + index,
			url: "asset url" + index,
			type: "asset type" + index,
			size: 10000 + (index * 1000),
			version: index,
			campaignUses: index,
			contentUses: index
		})
	}
	return Account
			.findOneAndUpdate({username: user.username}, {
				$set: {assets}
			}, {new: true});

});

browser.addCommand("accountInfo", function async() {
	return Account.findOne({username: user.username});
});