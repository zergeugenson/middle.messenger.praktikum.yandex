import './style.scss';
import template from './inputField.hbs?raw';
import Block from "@/framework/Block";
import ErrorLine from "./errorline";
import Input from "./inputelement";
import type {BlockProps} from '@/types';

export class inputField extends Block {
    constructor(props: BlockProps) {
        super({
            ...props,
            Input: new Input({
                events: {
                    blur: props.onBlur || (() => {}),
                },
                type: props?.type || "text",
                title: props.title,
                name: props.name,
                value: props?.value || "",
                class: props.class || "",
                id: props.id,
                placeholder: props.placeholder,
                skin: props.skin,
            }),
            ErrorLine: new ErrorLine({
                errorText: props.errorText || "",
            }),
        });
    }

    componentDidUpdate(oldProps: BlockProps,newProps: BlockProps): boolean {
        if (oldProps === newProps) {
            return false;
        }
        this.children.ErrorLine.setProps(newProps);
        return true;
    }

    render(): string {
        return template;
    }
}
