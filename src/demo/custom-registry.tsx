import { FC } from 'react';
import { Table } from '../components';
import { DATA, HEADERS } from './data';

export const CustomRegistry: FC = () => {
    return (
        <Table variant={'striped'}>
            <Table.Header>
                <Table.HeaderCell index={-1} width={'50px'}>
                    index
                </Table.HeaderCell>
                {HEADERS.map(({ key, width }, colIndex) => (
                    <Table.HeaderCell key={key} width={width} index={colIndex}>
                        {key}
                    </Table.HeaderCell>
                ))}
            </Table.Header>
            <Table.Body>
                {DATA.map((emp, rowIndex) => (
                    <Table.Row key={emp.id} index={rowIndex}>
                        <Table.Cell rowIndex={rowIndex} colIndex={-1}>
                            {rowIndex}
                        </Table.Cell>

                        {HEADERS.map(({ key }, colIndex) => (
                            <Table.Cell
                                key={key}
                                colIndex={colIndex}
                                rowIndex={rowIndex}
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
