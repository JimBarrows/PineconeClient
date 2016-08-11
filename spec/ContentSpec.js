/**
 * Created by JimBarrows on 7/14/16.
 */
'use strict';
const webdriverio = require('webdriverio');

import Account from "@reallybigtree/pinecone-models/src/Account";
import Content from "@reallybigtree/pinecone-models/src/Content";
import Channel from "@reallybigtree/pinecone-models/src/Channel";
import moment from "moment";

describe("How to manage content", function () {

	var browser;
	const username = "chesty@chester.com";
	const hash     = "0933f0cfbd7916d673c9d88ca9b1bd31c41705f7b22bf475bbebc178feb6dab05a87a4d37cade0422c97d28f93daa3e19a1edbff260e063a28bfd39db8fff27a289bbfdde4f9455eec526b05950f190f215bc42d1d1232b70f8a397a652e995aa5743194bf442dc2388fd67ebbd284f5db05e2a49ccf944f060dcc914c4e9f8fd9e135c6b3d274cda05429568baeac0c38938b585ba3ff45506739719d057bd0f2f2a32fa807a6350395f79aee9342603e512d379c27d9e30418d48913be8def133b4a6af3963ac4277d2faca982894f1afb4a35aab43c03bccd5c055dd91ff3699c380e23cf708d064cba6a793cde8f87cd2479cc8ab070001b36274e85bc9b3c6c75697ca41262db5c29a77f08d5ff1bcdc24e40e983999ef69341aaa3fed8d4376bf02f5395f650a02ddc1e16f700522af03b9c2a8115eff32420563c98e7f33d67b4bef159a879920e7939300c676f9295a79492ea38821379a2e90ddb1de66c36f4f56c9504261a834d186efc1cfd65c9918fa565b92e4b56abc97c559786962e1779660980792985d29234d42ebb4fab5f7b41a6f6f1779885234fca68461f21f0772fa1e8da9a23a3f5fe839afe861f8decbe0b456115c5abf010851fe12fa8b6368f61f57ab181ab331f9259b7e9084692d6fa8bf30c660e7057d62f53f1efaeea3f97cf8c5f573c85b538d0f39654760666d6c653b4d5096eedd983";
	const salt     = "585f093614aabe59a9e418fa39d29f87069e6e1522ac0170762e4884717032fa";
	const password = "thisisthepassword";
	const channel  = {
		name: 'Channel of Testing',
		owner: null,
		wordPressDestinations: [{
			name: 'Test Word Press Destination',
			username: 'ChesterTester',
			password: 'ChestyTesty',
			url: 'http://localhost:3000/'
		}]
	};

	beforeAll(()=> {
		var options = {desiredCapabilities: {browserName: 'chrome'}};
		browser     = webdriverio.remote(options)
				.init()
				.url('http://localhost:8080');
	});

	beforeEach((done) => {
		Account.remove({})
				.then(() => Content.remove({}))
				.then(() => Channel.remove({}))
				.then(() => Account.create({username, hash, salt}))
				.then((account) => channel.owner = account._id)
				.then(() => Channel.create(channel))
				.then((createChannel) => channel._id = createChannel._id)
				.then(() => browser.url('http://localhost:8080'))
				.then(() => browser.setValue("#username", username))
				.then(() => browser.setValue("#password", password))
				.then(() => browser.click("#loginButton"))
				.then(() => browser.waitForExist("#channelPanel", 3000))
				.then(() => browser.getText(".page-header h1"))
				.then((text) => expect(text).toBe("Channels"))
				.then(() => browser.click('#contentLink'))
				.then((client) => done())
				.catch((error) => console.log("Error beforeEach: ", error));
	});

	afterAll((done)=> {

		browser
				.endAll()
				.then(()=> done())
				.catch((error) => console.log("error closing browser: ", error));

	});

	describe("how to create content", function () {

		const title       = "Testable Content";
		const body        = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
		const publishDate = moment("20111031", "YYYYMMDD");
		const excerpt     = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod";
		const status      = "publish";
		const format      = "format";

		beforeEach((done) => {
			browser.click('#contentEditButton')
					.then(() => done())
					.catch((error) => console.log("Error beforeEach describe content creation: ", error));
		});

		it("should create content", (done) => {
			browser.setValue('#title', title)
					.then(() => browser.setValue('#body', body))
					.then(() => browser.setValue('.rdt .form-control', publishDate.toString()))
					.then(() => browser.selectByValue('#channel', channel._id.toString()))
					.then(() => browser.setValue('#wpExcerpt', excerpt))
					.then(() => browser.setValue('#wpStatus', status))
					.then(() => browser.setValue('#wpFormat', format))
					.then(() => browser.click('#saveButton'))
					.then(() => browser.waitForExist("#contentPanel", 3000))
					.then(() => browser.getText(".page-header h1"))
					.then((text) => expect(text).toBe("Content"))
					.then(()=> done())
					.catch((error)=>console.log('Could not create content: ', error));
		}, 15000);

		it("should error if there is no body", (done) => {
			browser.setValue('#title', title)
					.then(() => browser.setValue('#body', ""))
					.then(() => browser.setValue('.rdt .form-control', publishDate.toString()))
					.then(() => browser.selectByValue('#channel', channel._id.toString()))
					.then(() => browser.setValue('#wpExcerpt', excerpt))
					.then(() => browser.setValue('#wpStatus', status))
					.then(() => browser.setValue('#wpFormat', format))
					.then(() => browser.click('#saveButton'))
					.then(() => browser.getText('.alert.alert-danger'))
					.then((alertText) => expect(alertText).toBe('Content must have a body'))
					.then(()=> done())
					.catch((error)=>console.log('Body missing test failed: ', error));
		}, 15000);

		it("should error if there is no channel selected", (done) => {
			browser.setValue('#title', title)
					.then(() => browser.setValue('#body', body))
					.then(() => browser.setValue('.rdt .form-control', publishDate.toString()))
					.then(() => browser.setValue('#wpExcerpt', excerpt))
					.then(() => browser.setValue('#wpStatus', status))
					.then(() => browser.setValue('#wpFormat', format))
					.then(() => browser.click('#saveButton'))
					.then(() => browser.getText('.alert.alert-danger'))
					.then((alertText) => expect(alertText).toBe('Content must have a channel'))
					.then(()=> done())
					.catch((error)=>console.log('Channel select test failed: ', error));
		}, 15000);

		it("should error if there is no publish date", (done) => {
			browser.setValue('#title', title)
					.then(() => browser.setValue('#body', body))
					.then(() => browser.setValue('.rdt .form-control', " "))
					.then(() => browser.selectByValue('#channel', channel._id.toString()))
					.then(() => browser.setValue('#wpExcerpt', excerpt))
					.then(() => browser.setValue('#wpStatus', status))
					.then(() => browser.setValue('#wpFormat', format))
					.then(() => browser.click('#saveButton'))
					.then(() => browser.getText('.alert.alert-danger'))
					.then((alertText) => expect(alertText).toBe('Content must have a publish date'))
					.then(()=> done())
					.catch((error)=>console.log('Publish date missing test failed: ', error));
		}, 15000);

		it("should error if there is no title", (done) => {
			browser.setValue('#title', "")
					.then(() => browser.setValue('#body', body))
					.then(() => browser.setValue('.rdt .form-control', publishDate.toString()))
					.then(() => browser.selectByValue('#channel', channel._id.toString()))
					.then(() => browser.setValue('#wpExcerpt', excerpt))
					.then(() => browser.setValue('#wpStatus', status))
					.then(() => browser.setValue('#wpFormat', format))
					.then(() => browser.click('#saveButton'))
					.then(() => browser.getText('.alert.alert-danger'))
					.then((alertText) => expect(alertText).toBe('Content must have a title'))
					.then(()=> done())
					.catch((error)=>console.log('Title missing test failed: ', error));
		}, 15000);


	});
});