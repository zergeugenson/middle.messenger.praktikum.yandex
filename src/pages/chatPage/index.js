import './style.scss';
import { chatContact } from './templateParts/chatContact';
import { chatMessage } from './templateParts/chatMessage';
import Handlebars from "handlebars";

Handlebars.registerPartial('chatContact', chatContact);
Handlebars.registerPartial('chatMessage', chatMessage);

export { default as chatPage } from './chatPage.hbs?raw';



