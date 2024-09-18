type Month = {
    name: string,
    label: string,
    days: number
}

export const months: Month[] = [
    {name: 'january', label: 'Jan', days: 31},
    {name: 'february', label: 'Feb', days: 29},
    {name: 'march', label: 'Mar', days: 31},
    {name: 'april', label: 'Apr', days: 30},
    {name: 'may', label: 'May', days: 31},
    {name: 'june', label: 'Jun', days: 30},
    {name: 'july', label: 'Jun', days: 31},
    {name: 'august', label: 'Aug', days: 31},
    {name: 'september', label: 'Sep', days: 30},
    {name: 'october', label: 'Oct', days: 31},
    {name: 'november', label: 'Nov', days: 30},
    {name: 'december', label: 'Dec', days: 31}
] as const