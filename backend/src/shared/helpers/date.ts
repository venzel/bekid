import { format } from 'date-fns';

const formatDate = (date: Date): string => {
    const dateFortatted = format(date, "dd/MM/yyyy 'at' HH:mm'h'");

    return dateFortatted;
};

export { formatDate };
