export const formatDate = (dateString: string) => {
    //! profile card
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric'
    }).format(date);
};

export const formatDateTime = (dateString: string) => {
    // ! history card
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    })
        .format(date)
        .replace(',', '');
};

export const DateFormatter = (isoString: string) => {
    const date = new Date(isoString);

    // Extract hours and minutes
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();

    // Format the time in 12-hour format

    return `${hours % 12 || 12}:${minutes < 10 ? `0${minutes}` : minutes} ${
        hours >= 12 ? 'PM' : 'AM'
    }`;
};
