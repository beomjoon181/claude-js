// // 함수의 선언
// function myFunc(name, age){
//     console.log(name, age)
// }

// // 함수의 사용
// myFunc("홍길동", 21)

// // 두 수를 전달하면 두 수를 더해서 출력하는 함수
// function addPrint(num1, num2){
//     console.log(num1 + num2)
// }

// addPrint(100, 200)

// // 성과 이름을 전달하면 풀 네임을 만들어서 반환하는 함수
// function getFullName(lastName, firstName){
//     return lastName + firstName
// }

// console.log(getFullName("홍", "길동"))

// 숫자 1개를 전달해서 홀수인지 짝수인지 확인 후 출력해주는 함수
function printOdd(number){
    if(number % 2){
        console.log("홀수")
    }else{
        console.log("짝수")
    }
}

printOdd(4)