import { jsx as _jsx } from "react/jsx-runtime";
export function BlogDate({ date }) {
    const formatDate = (dateInput) => {
        const dateObj = typeof dateInput === "string" ? new Date(dateInput) : dateInput;
        return dateObj.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };
    return (_jsx("time", { className: "text-sm text-gray-500 dark:text-gray-400", children: formatDate(date) }));
}
