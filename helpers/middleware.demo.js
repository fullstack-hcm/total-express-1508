const middlewareLogDate = (req, res, next) => {
    // RANDOM chứa số nhỏ nhất(min), ko chưa số lơn nhất(max)
    let numberRandom = Math.floor(Math.random() * (2 - 0)) + 0;
    console.log({ numberRandom });
    if (Number(numberRandom) === 1) {
        req.numberRandom = numberRandom;
        next();
    } else {
        res.json({ error: '0 phai so 1' });
    }
}
exports.middlewareLogDate = middlewareLogDate;