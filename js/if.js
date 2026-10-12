// let num = 10

// if (num >= 15){
//     console.log("15이상")
// }else {
//     console.log("15미만")
// }

// let score = 80

// if (score >= 90){
//     console.log("A")
// }else if(score >= 80){
//     console.log("B")
// }else if(score >= 70){
//     console.log("C")
// }else{
//     console.log("D")
// }


// ===== 성적 평균으로 합격/불합격 판단하기 =====

// 1. 변수 선언: 학생 이름과 과목별 점수를 변수에 저장
let name = "홍길동"   // 학생 이름 (문자열)
let kor = 75          // 국어 점수 (숫자)
let math = 58         // 수학 점수 (숫자)
let eng = 62          // 영어 점수 (숫자)

// 2. 평균 구하기
let total = kor + math + eng   // 세 과목 점수를 모두 더한 총점
let avg = total / 3            // 총점을 과목 수(3)로 나눈 평균

// 3. 결과 출력
console.log("이름: " + name)              // + 로 문자열과 변수를 이어 붙여 출력
console.log("평균: " + avg.toFixed(2))    // toFixed(2): 소수점 둘째 자리까지 표시

// 4. 합격 여부 판단
if (avg >= 60) {              // 평균이 60점 이상이면 (조건이 true)
    console.log("합격")
} else {                      // 그 외, 즉 평균이 60점 미만이면 (조건이 false)
    console.log("불합격")
}
