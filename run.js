/**
 * Created by JimBarrows on 7/13/16.
 */
'use strict';
import Jasmine from "jasmine";

var jasmine = new Jasmine();
jasmine.loadConfigFile('spec/support/jasmine.json');

jasmine.execute();