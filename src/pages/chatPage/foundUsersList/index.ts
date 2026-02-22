import "./style.scss";
import template from "./foundUsersList.hbs";
import Block from "@/framework/Block";

export default class ListOfUsers extends Block {
  constructor(props:any) {
    super({...props });
  }

  render() {
    return this.compile(template, this.props);
  }
}

