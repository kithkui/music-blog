let functions = {};

functions.helloWorld = () => {
    console.log("hello world!")
};

functions.changeDateFormat = (date) => {
    let formatedDate = "";
    let day = (date.getDate()<10) ? "0" + date.getDate() : date.getDate();
    formatedDate += day;
    formatedDate += date.getFullYear();
    formatedDate += romanize(date.getMonth()+1);
    return formatedDate;
}

function romanize (num) {
    if (isNaN(num))
        return NaN;
    let digits = String(+num).split(""),
        key = ["","C","CC","CCC","CD","D","DC","DCC","DCCC","CM",
               "","X","XX","XXX","XL","L","LX","LXX","LXXX","XC",
               "","I","II","III","IV","V","VI","VII","VIII","IX"],
        roman = "",
        i = 3;
    while (i--)
        roman = (key[+digits.pop() + (i * 10)] || "") + roman;
    return Array(+digits.join("") + 1).join("M") + roman;
}

module.exports = functions;