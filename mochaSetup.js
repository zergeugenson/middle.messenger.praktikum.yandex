import { JSDOM } from 'jsdom'
import { useFakeXMLHttpRequest } from 'sinon';
import sinon from 'sinon';

const jsdom = new JSDOM('<html><body><div id="app"></div></body></html>', { url: 'http://jsdom' })

global.window = jsdom.window
global.document = jsdom.window.document
global.XMLHttpRequest = sinon.useFakeXMLHttpRequest();
