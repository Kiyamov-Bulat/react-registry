import { RegistryHeader } from '../../src';

export const range = (start: number, stop: number, step = 1) =>
    Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step);

export const HEADERS: RegistryHeader<Record<string, any>>[] = [
    { key: 'fullName', label: 'Full name', width: '150px' },
    { key: 'employeeNumber', width: '200px', label: 'Employee number' },
    { key: 'age', width: '80px', label: 'Age' },
    { key: 'country', width: '300px', label: 'Country' },
    { key: 'position', width: '150px', label: 'Position' },
    { key: 'email', width: '75px', label: 'Email' },
    { key: 'phone', width: '200px', label: 'Phone' },
    { key: 'hireDate', width: '200px', label: 'Hire date' },
    { key: 'birthday', width: '200px', label: 'Birthday' },
    { key: 'rank', label: 'Rank' },
    { key: 'work_experience', label: 'Work experience' },
    { key: 'gender', label: 'Gender' },
    { key: 'education', label: 'Education' },
    { key: 'address', label: 'Address' },
    { key: 'status', label: 'Status' },
    { key: 'marital_status', label: 'Marital status' },
];

const getEmployeeData1 = (i: number) => ({
    fullName: 'Arthur King',
    employeeNumber: '12345',
    age: '21',
    country: 'UK',
    position: 'dev',
    email: 'arthurking@gmail.com',
    phone: '0123456789',
    hireDate: '2020-02-25',
    birthday: '2020-02-25',
    rank: '1',
    work_experience: '1 year',
    gender: 'male',
    education: 'Hogwarts 2 years',
    address: 'England',
    marital_status: 'ugift',
    status: 'inactive',
    id: i * 10 + 1,
});
const getEmployeeData2 = (i: number) => ({
    fullName: 'Alex Naimed',
    employeeNumber: '45',
    age: '26',
    country: 'Russia',
    position: 'web-dev',
    email: 'alexn@gmail.com',
    phone: '0123456789',
    hireDate: '2020-02-25',
    birthday: '2020-02-25',
    status: 'active',
    rank: '1',
    work_experience: '10 year',
    gender: 'male',
    education: 'Hogwarts 3 years',
    address: 'Russia',
    marital_status: 'ugift',
    id: i * 10 + 2,
});
const getEmployeeData3 = (i: number) => ({
    fullName: 'Syao Han',
    employeeNumber: '45667',
    age: '35',
    country: 'China',
    position: 'product owner',
    email: 'syaohan@gmail.com',
    phone: '0123456789',
    hireDate: '2020-02-25',
    birthday: '2020-02-25',
    status: 'active',
    rank: '1',
    work_experience: '7 year',
    gender: 'male',
    education: 'Hogwarts 3 years',
    address: 'China',
    marital_status: 'ugift',
    id: i * 10 + 3,
});

const getEmployees = (i: number) => [
    getEmployeeData1(i),
    getEmployeeData2(i),
    getEmployeeData3(i),
];

export const DATA = range(0, 15)
    .map((i) => getEmployees(i))
    .flat();
