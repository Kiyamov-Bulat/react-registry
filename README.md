# React Registry

A lightweight, fully typed React component for building powerful data tables — with sorting, filtering, and user-friendly UI out of the box.

[**→ Live Demo**](https://react-registry-azure.vercel.app/)

<img src="/demo/images/cover.png" alt="React Registry Demo" width="600px">

## ✨ Features

- ✅ **Column sorting** — click a column header to sort
- ✅ **Per-column filtering** — click the filter icon in any header to filter that column
- ✅ **Fully typed** — TypeScript support included
- ✅ **Zero dependencies** — no heavy UI libraries
- ✅ **Easy to customize** — clean, modular code
- ✅ **Two usage modes**:
    - `Registry` — smart component (ready to use)
    - `Table` — compound UI components (full control)
- ✅ **Utility hooks**: `useTableSort`, `useTableFilter` for custom logic

## 🚀 Quick Start

Install:
```bash
npm install @bulak/react-registry
```
Basic usage (**Registry**):
```typescript jsx
import { Registry, RegistryHeader } from '@bulak/react-registry';

const DATA = [
    { id: 1, fullName: 'Harry Potter', employeeNumber: 1, age: 18 },
];

const HEADERS: RegistryHeader<(typeof DATA)[number]>[] = [
    { key: 'fullName', width: 'calc(50% - 26px)', label: 'Full name' },
    { key: 'employeeNumber', width: 'calc(50% - 26px)', label: 'Employee number' },
    { key: 'age', width: '50px', label: 'Age' },
];

export function App() {
    return (
        <Registry
            data={DATA}
            headers={HEADERS}
            variant="bordered"
            sortable={true}
            filterable={true}
        />
    );
}
```
_💡 For full control, use the Table compound component and utility hooks (see docs)._


## 📦 What’s Included
#### Components:
- **Registry** — smart table with built-in sorting & filtering
- **Table** — low-level compound component (**Table.Header**, **Table.Body**, **Table.Row**, etc.)
- **Dropdown** — utility for popups (**Dropdown.Popup**, **Dropdown.Toggle**, etc.)

#### Hooks:
- **useTableFilter** - manage sorting state
- **useTableSort** - manage filtering logic

## Advanced Usage
### Custom header rendering (with sort indicators)

Override the default header to add a popup component and display sort direction symbols:

```typescript jsx
import { Registry, RegistryHeader, SortDirection, Table } from '@bulak/react-registry';
import { DATA, HEADERS } from './constants';
import { useCallback, useRef, useState } from 'react';
import { ColumnPopup } from './column-popup';
import s from './styles.module.scss';

const getSortSymbol = (sortDir: SortDirection) => {
    switch (sortDir) {
    case 'asc':
        return '↓';
    case 'desc':
        return '↑';
    }

    return '';
};

const getStatusSymbol = (status: string) => (status === 'active' ? '✅' : '❌');

export function App() {
    return (
        <Registry
            data={DATA}
            headers={HEADERS}
            variant={'bordered'}
            layoutMode={'grid'}
            sortable={true}
            filterable={true}
            className={s.customRegistry}
            renderHeaderCell={{
                Component: ({ header, setFilter, setSort, ...props }) => {
                    const ref = useRef<HTMLDivElement>(null);
                    const [opened, setOpened] = useState(false);
                    const toggle = useCallback(() => setOpened((prev) => !prev), []);
                    const filter = (value: string) =>
                        setFilter(header.key, value);

                    const sort = (sortDirection: SortDirection) =>
                        setSort(header.key, sortDirection);

                    return (
                        <Table.HeaderCell
                            index={props.index}
                            width={header.width}
                            onClick={toggle}
                        >
                            <div ref={ref}>
                                {props.children}
                                {getSortSymbol(props.sortDirection)}
                            </div>
                            {/* CUSTOM POPUP (see: Dropdown.Popup) */}
                            <ColumnPopup
                                {...props}
                                onFilter={filter}
                                onSort={sort}
                                onClose={toggle}
                                anchorRef={ref}
                                opened={opened}
                            />
                        </Table.HeaderCell>
                    );
                },
            }}
            renderCell={{
                Content: (props) => {
                    if (props.columnKey === 'status')
                        return (
                            <div className={s.status}>
                                <div>{props.value}</div>
                                {getStatusSymbol(props.value)}
                            </div>
                        );

                    return props.value;
                },
            }}
        />
    );
};

```
_💡renderHeaderCell gives you full control over header rendering while keeping sorting logic managed by Registry._

### Fully custom table with compound components

Build your own table layout using low-level components:

```typescript jsx
import { Table, useTableSort } from '@bulak/react-registry';
import { DATA, HEADERS } from './constants';
import s from './styles.module.scss';

export function App() {
    const { setSort, sortedData } = useTableSort(DATA);
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
                        onClick={() => setSort(key)}
                    >
                        {key}
                    </Table.HeaderCell>
                ))}
            </Table.Header>
            <Table.Body>
                {sortedData.map((row, rowIndex) => (
                    <Table.Row key={row.id} index={rowIndex} className={s.row}>
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
                            >
                                {row[key as keyof typeof row]}
                            </Table.Cell>
                        ))}
                    </Table.Row>
                ))}
            </Table.Body>
        </Table>
    );
}

```

## 🌐 Live Demo
See it in action: https://react-registry-azure.vercel.app/

## 📄 License
MIT © Kiyamov Bulat

## 💙 Support the Project

If React Registry saves you time, consider supporting its development!

You can send a one-time payment in **USDT TRC20** and **TON** (The Open Network):

- **USDT TRC20 Address**:  
  ```
  TC5a9vJtjYhpTq4wA4tAdHn4qnMskxfNq4
  ```

- **QR Code**:  
  ![USDT QR](/public/images/wallet-qr-code/usdt-trc20.png)

- **TON Address**:  
  ```
  UQDorrj6m414colWjOAxhT9qAsuSG_dWrR-7YxujVwDUSGSZ
  ```

- **QR Code**:  
  ![TON](/public/images/wallet-qr-code/ton.png)
  

> After payment, feel free to email me with your transaction hash — I’ll prioritize your feature requests or help with integration.

Thank you for your support! 🙏