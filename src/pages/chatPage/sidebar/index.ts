import './style.scss';
import sidebarTemplate from './sidebar.hbs';
import Block from '@/framework/Block';
import { InputField } from '@/components/inputField';
import { Link } from '@/components/iLink';
import { appRouter } from '@/main';

class Sidebar extends Block {
  constructor(props: Record<string, any> = {}) {

    const profileLink = new Link({
      href: '/profile',
      text: 'Профиль >>',
      onClick: (event: Event) => {
        event.preventDefault();
        appRouter.go('/profile');
      },
    });

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
      profileLink,
    });
  }

  render() {
    return this.compile(sidebarTemplate, this.props);
  }
}

export default Sidebar;
