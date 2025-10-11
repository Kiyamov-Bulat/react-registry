import { Body, Cell, Container, Header, HeaderCell, Row } from './ui';

export * from './types';

export const Table = Object.assign(Container, {
    Header,
    HeaderCell,
    Body,
    Row,
    Cell,
});
