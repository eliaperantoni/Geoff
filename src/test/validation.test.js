import Validation from "controller/Validation";

describe("integer validation", () => {
    const rows = [
        {str: "23",want: true},
        {str: "-124",want: true},
        {str: "0.4",want: false},
        {str: ".4",want: false},
        {str: "0.",want: false},
        {str: "abc",want: false},
        {str: "10",min:9,max:11,want: true},
        {str: "10",min:1,max:5,want: false},
        {str: "10",min:15,max:20,want: false},
        {str: "10",min:10,max:10,want: true},
        {str: "10",min:11,max:9,want: false},
    ];

    for(const row of rows) {
        test(`"${row.str}" ${row.want ? "is" : "is not"} a valid integer between ${row.min || "-Inf"} and ${row.max || "+Inf"}`, () => {
            const got = Validation.int({min: row.min, max: row.max})(row.str);
            expect(got).toBe(row.want);
        });
    }
});

describe("price", () => {
    const rows = [
        {str: "23",want: true},
        {str: "23.5",want: true},
        {str: "23.55",want: true},
        {str: "23.555",want: true},
        {str: "23.",want: false},
        {str: ".55",want: false},
    ];

    for(const row of rows) {
        test(`"${row.str}" ${row.want ? "is" : "is not"} a valid price`, () => {
            const got = Validation.price(row.str);
            expect(got).toBe(row.want);
        });
    }
});

describe("email", () => {
    const rows = [
        {str: "name@domain.com",want: true},
        {str: "ma io sono un sasso, non una mail!",want: false},
        {str: "1234",want: false},
    ];

    for(const row of rows) {
        test(`"${row.str}" ${row.want ? "is" : "is not"} a valid email address`, () => {
            const got = Validation.email(row.str);
            expect(got).toBe(row.want);
        });
    }
});

describe("cap", () => {
    const rows = [
        {str: "1245",want: true},
        {str: "abcdef",want: false},
        {str: "      ",want: false},
    ];

    for(const row of rows) {
        test(`"${row.str}" ${row.want ? "is" : "is not"} a valid CAP`, () => {
            const got = Validation.cap(row.str);
            expect(got).toBe(row.want);
        });
    }
});

describe("phone", () => {
    const rows = [
        {str: "333 33 33 333",want: true},
        {str: "333 333 33 33",want: true},
        {str: "   333      333     33    33   ",want: true},
        {str: "333 333 33 33 9",want: false},
        {str: "333 333 33 3",want: false},
        {str: "-333 333 33 3",want: false},
        {str: "abc",want: false},
    ];

    for(const row of rows) {
        test(`"${row.str}" ${row.want ? "is" : "is not"} a valid phone number`, () => {
            const got = Validation.phone(row.str);
            expect(got).toBe(row.want);
        });
    }
});

describe("password", () => {
    const rows = [
        {str: "123456",want: true},
        {str: "12345",want: false},
    ];

    for(const row of rows) {
        test(`"${row.str}" ${row.want ? "is" : "is not"} a valid password`, () => {
            const got = Validation.password(row.str);
            expect(got).toBe(row.want);
        });
    }
});

describe("non empty string", () => {
    const rows = [
        {str: "1",want: true},
        {str: "v",want: true},
        {str: "",want: false},
    ];

    for(const row of rows) {
        test(`"${row.str}" ${row.want ? "is" : "is not"} a valid empty string`, () => {
            const got = Validation.nonEmptyString(row.str);
            expect(got).toBe(row.want);
        });
    }
});

describe("exactly", () => {
    const rows = [
        {str: "abc",fn: () => "abc", want: true},
        {str: "abcc",fn: () => "abc", want: false},
    ];

    for(const row of rows) {
        test(`"${row.str}" ${row.want ? "is" : "is not"} exactly ${row.fn()}`, () => {
            const got = Validation.exactly(row.fn)(row.str);
            expect(got).toBe(row.want);
        });
    }
});

describe("credit card number", () => {
    const rows = [
        {str: "2222 2222 2222 2222", want: true},
        {str: " 2222 2222 2222 2222 ", want: false},
        {str: "22223333 2222 2222", want: false},
        {str: "abc", want: false},
        {str: "-2", want: false},
    ];

    for(const row of rows) {
        test(`"${row.str}" ${row.want ? "is" : "is not"} a valid credit card number}`, () => {
            const got = Validation.creditCardNumber(row.str);
            expect(got).toBe(row.want);
        });
    }
});

describe("credit card cvv", () => {
    const rows = [
        {str: "222", want: true},
        {str: "22", want: false},
        {str: "2222", want: false},
        {str: "abc", want: false},
        {str: "-123", want: false},
    ];

    for(const row of rows) {
        test(`"${row.str}" ${row.want ? "is" : "is not"} a valid credit card CVV}`, () => {
            const got = Validation.creditCardCVV(row.str);
            expect(got).toBe(row.want);
        });
    }
});

describe("credit card expiration date", () => {
    const rows = [
        {str: "01/10", want: true},
        {str: "1/10", want: false},
        {str: "00/10", want: false},
        {str: "00/26", want: false},
        {str: "13/10", want: false},
    ];

    for(const row of rows) {
        test(`"${row.str}" ${row.want ? "is" : "is not"} a valid credit card expiration date}`, () => {
            const got = Validation.creditCardExpirationDate(row.str);
            expect(got).toBe(row.want);
        });
    }
});
