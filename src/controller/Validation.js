export default class Validation {
    static int = ({min = -Infinity, max = +Infinity} = {}) => str => {
        const parsed = parseInt(str);
        return /^\d+$/.test(str) && !isNaN(parsed) && parsed >= min && parsed <= max && parsed === parseFloat(str);
    }

    static price = str => /^\d+(\.\d+)?$/.test(str);
    static email = str => /^\S+@\S+$/.test(str);
    static nonEmptyString = str => str.length > 0;
}
