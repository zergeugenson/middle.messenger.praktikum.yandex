import './style.scss';
import sidebarTemplate from './sidebar.hbs';
import Block from '@/framework/Block';
import { InputField } from '@/components/inputField';

class Sidebar extends Block {
  constructor(props: Record<string, any> = {}) {

    const searchField = new InputField({
      id: 'chat-search',
      name: 'search',
      type: 'text',
      disabled: false,
      placeholder: 'Поиск контактов',
    });

    super({
      ...props,
      searchField,
    });
  }

  render() {
    return this.compile(sidebarTemplate, this.props);
  }
}

export default Sidebar;
