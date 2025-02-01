const sum_to_n_a = (n) => {
    let sum = 0
    for (i = 1; i <= n; i++) {
        sum += i
    }
    return sum
}
const sum_to_n_b = (n) => {
    let sum = (n * (n + 1)) / 2
    return sum
}
const sum_to_n_c = (n) => {
    let numberArr = Array.from({ length: n }, (_, index) => index + 1)
    let sum = numberArr.reduce((sum, current) => sum + current, 0)
    return sum
}
console.log(sum_to_n_a(5))
console.log(sum_to_n_b(5))
console.log(sum_to_n_c(5))
