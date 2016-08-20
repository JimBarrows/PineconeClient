/**
 * Created by JimBarrows on 8/20/16.
 */
'use strict';

import {createAccount} from "./fixtures";

browser.addCommand('createAccount', function async() {
	return createAccount();
});