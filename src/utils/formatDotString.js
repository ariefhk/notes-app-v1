export const formatDotString = (string, longOfString) => {
    return string.length < longOfString ? string : string.substring(0, longOfString) + "...";
};
