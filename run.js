/**
 * Created by JimBarrows on 7/13/16.
 */
'use strict';
import Jasmine from "jasmine";
import mongoose from "mongoose";
import Configuration from "./spec/support/configurations";

var jasmine = new Jasmine();
jasmine.loadConfigFile('spec/support/jasmine.json');

const env    = process.env.NODE_ENV || "development";
const config = Configuration[env];
console.log("config: ", config);

mongoose.Promise = Promise;
mongoose.connect(config.mongoose.url);

jasmine.execute();