exports.bufferToObject = (buffer) => {
    try {
        JSON.parse(buffer);
        return true;
    } catch (error) {
        return false;
    }
};