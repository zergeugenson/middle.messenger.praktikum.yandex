import Handlebars from 'handlebars';
import {creditionalsFieldLabels} from "../lib/constants/creditionalsFieldLabels.js";

Handlebars.registerHelper('fieldLabel', function() {
 return creditionalsFieldLabels[arguments[0]]
});
