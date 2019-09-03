const calcu = (cal, num1, num2) => {
    let calcuUpercase = cal.toUpperCase();
    let result;
    let num1Int = Number(num1);
    let num2Int = Number(num2);
    if (calcuUpercase === 'SUM') {
        result = num1Int + num2Int;
    } else if (calcuUpercase === 'SUB') {
        result = num1Int - num2Int;
    } else if (calcuUpercase === 'MUL') {
        result = num1Int * num2Int;
    } else if (calcuUpercase === 'DIV') {
        result = num1Int / num2Int;
    } else {
        result = `ERROR`;
    }
    return `result of ${cal}: ${result}`;
}
exports.calcu = calcu;