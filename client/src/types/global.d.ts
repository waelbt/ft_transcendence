declare global {
    interface FormData {
        stream(): ReadableStream;
    }
}