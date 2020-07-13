export default class Validation {
    static int = ({min = -Infinity, max = +Infinity} = {}) => str => {
        const parsed = parseInt(str);
        return /^\d+$/.test(str) && !isNaN(parsed) && parsed >= min && parsed <= max && parsed === parseFloat(str);
    }

    static price = str => /^\d+(\.\d+)?$/.test(str);
    static email = str => /^\S+@\S+$/.test(str);
    static cap = str => /^\d+$/.test(str);
    static phone = str => /^\d{11}$/.test(str.replace(/\s/g, ""));
    static password = str => str.length >= 6;
    static nonEmptyString = str => str.length > 0;
    static exactly = getMatch => str => getMatch() === str;

    static all = (...validators) => str => validators.map(v => v(str)).reduce((t, acc) => t && acc);

    static validatedField(field) {
        return {
            value: this.state[field].str,
            onChange: this.onChange(field),
            onBlur: this.onBlur(field),
            invalid: !this.state[field].valid && this.state[field].touched,
        };
    };
}
