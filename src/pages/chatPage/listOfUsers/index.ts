import './style.scss';
import template from './listOfUsers.hbs';
import Block from '@/framework/Block';
import { Link } from '@/components/iLink';

interface ListOfUsersProps {
  userID: string,
  userLogin: string,
  userName: string,
  callback? : () => void;
  events?: {
    click?: () => void;
  };
}

export default class ListOfUsers extends Block {
  constructor(props: ListOfUsersProps) {
    const addFoundUserToChat = new Link({
      image: '/images/add_circle.png',
      alt: 'Добавить в чат',
      events: {
        click: (e: Event) => {
          if (typeof this.props.callback === 'function') {
            this.props.callback();
          }
          e.preventDefault();
        },
      },
    });
    super({ ...props, addFoundUserToChat });
  }

  render() {
    return this.compile(template, this.props);
  }
}

