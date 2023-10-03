async function currentDate() {
    const currentDate = new Date();
    const date = currentDate.toUTCString();
    return date;
}


export const responseHeaders = async (response) => {
    response.set('Cache-Control','no-cache,no-store,must-revalidate');
    response.set('Pragma', 'no-cache');
    response.setHeader('X-Content-Type-Options', 'nosniff');
    response.removeHeader('Content-Type');
    response.removeHeader('connection');
    response.removeHeader('keep-alive');
    response.setHeader('Date',await currentDate());
    response.setHeader('Content-Length', 0);
}