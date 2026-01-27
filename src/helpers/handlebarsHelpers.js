import Handlebars from 'handlebars';
import {credentialsFieldLabels} from "../lib/constants/creditionalsFieldLabels.js";
import {mockCredentials} from "@/mock/mockData.js";

Handlebars.registerHelper('fieldLabel', function() {
 return credentialsFieldLabels[arguments[0]]
});
