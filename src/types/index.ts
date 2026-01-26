
interface EventMap {
    [key: string]: EventListener | EventListenerObject;
}

interface Attributes {
    [key: string]: string;
}

export interface BlockProps {
    events?: EventMap;
    attr?: Attributes | false;
    template?: string;
}

