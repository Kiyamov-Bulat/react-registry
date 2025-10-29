import { RegistryHeader } from '../../src/components';

export const range = (start: number, stop: number, step = 1) =>
    Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step);

export const HEADERS: RegistryHeader<Record<string, any>>[] = [
    { key: 'fullName', label: 'Full name' },
    { key: 'employeeNumber', width: '100px', label: 'Employee number' },
    { key: 'age', width: '50px', label: 'Age' },
    { key: 'country', width: '300px', label: 'Country' },
    { key: 'position', width: '150px', label: 'Position' },
    { key: 'email', width: '200px', label: 'Email' },
    { key: 'phone', width: '200px', label: 'Phone' },
    { key: 'hireDate', width: '200px', label: 'Hire date' },
    { key: 'birthday', width: '200px', label: 'Birthday' },
];

export const DATA = range(0, 100)
    .map(
        (i) =>
            [
                {
                    fullName: 'Arthur King',
                    employeeNumber: '12345',
                    age: '21',
                    country: 'UK',
                    position: 'dev',
                    email: 'arthurking@gmail.com',
                    phone: '0123456789',
                    hireDate: '2020-02-25',
                    birthday: '2020-02-25',
                    id: i * 10 + 1,
                },
                {
                    fullName: 'Bulat K',
                    employeeNumber: '45',
                    age: '26',
                    country: 'Russia',
                    position: 'web-dev',
                    email: 'bulatK@gmail.com',
                    phone: '0123456789',
                    hireDate: '2020-02-25',
                    birthday: '2020-02-25',
                    id: i * 10 + 2,
                },
                {
                    fullName: 'Syao Han',
                    employeeNumber: '45667',
                    age: '35',
                    country: 'China',
                    position: 'product owner',
                    email: 'syaohan@gmail.com',
                    phone: '0123456789',
                    hireDate: '2020-02-25',
                    birthday: '2020-02-25',
                    id: i * 10 + 3,
                },
            ] as const
    )
    .flat();
