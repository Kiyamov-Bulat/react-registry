import { Container } from './container';
import { Item } from './item';
import { Popup } from './popup';
import { Toggle } from './toggle';

export const Dropdown = Object.assign(Container, { Popup, Toggle, Item });
