import { FC } from 'react';
import { DATA, HEADERS } from './data';
import s from './styles.module.scss';
import cx from 'classnames';
import { Table } from '../../components';

export const TableCompoundComponentRegistry: FC = () => {
    return (
        <Table variant={'striped'}>
            <Table.Header className={s.header}>
                <Table.HeaderCell index={-1} width={'70px'} className={s.indexCell}>
                    index
                </Table.HeaderCell>
                {HEADERS.map(({ key, width }, colIndex) => (
                    <Table.HeaderCell
                        key={key}
                        width={width}
                        index={colIndex}
                        className={cx({ [s.age]: key === 'age' })}
                    >
                        {key}
                    </Table.HeaderCell>
                ))}
            </Table.Header>
            <Table.Body>
                {DATA.map((emp, rowIndex) => (
                    <Table.Row key={emp.id} index={rowIndex} className={s.row}>
                        <Table.Cell
                            rowIndex={rowIndex}
                            colIndex={-1}
                            className={s.indexCell}
                        >
                            {rowIndex}
                        </Table.Cell>

                        {HEADERS.map(({ key }, colIndex) => (
                            <Table.Cell
                                key={key}
                                colIndex={colIndex}
                                rowIndex={rowIndex}
                                className={cx({ [s.age]: key === 'age' })}
                            >
                                {emp[key as keyof typeof emp]}
                            </Table.Cell>
                        ))}
                    </Table.Row>
                ))}
            </Table.Body>
        </Table>
    );
};
