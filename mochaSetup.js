import { JSDOM } from 'jsdom'
import { useFakeXMLHttpRequest } from 'sinon';
import sinon from 'sinon';

const jsdom = new JSDOM('<body></body>', { url: 'http://jsdom' })

global.window = jsdom.window
global.document = jsdom.window.document
global.Node = jsdom.window.Node
global.MouseEvent = jsdom.window.MouseEvent
global.XMLHttpRequest = sinon.useFakeXMLHttpRequest();
