const calcPercentage = (value, total) => {
    let percent = 0;
    if (value > 0 || total > 0) {
        percent = Math.round((100 * value) / total);
    }
    return percent;
};
export { calcPercentage };