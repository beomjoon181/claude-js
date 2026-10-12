let age = 20
let name = "장범준"

console.log(name + "님은 " + (age >= 19 ? "입장 가능" : "입장 불가"))

console.log(age % 2 ? "홀수" : "짝수")

console.log(age === 16 ? "당첨" : "꽝입니다.")

// es6 `${}`: 템플릿 리터럴은 문자열 안에서 변수를 사용하는 방법
// console.log(`${name}님은`)