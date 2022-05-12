// 랜덤번호 지정
// 유저가 번호를 입력한다 그리고 go 라는 버튼을 누름
// 만약에 유저가 랜덤번호를 맞추면, 맞췄습니다!
// 랜덤번호 < 유저번호이면, Down!!!
// 랜덤번호 > 유저번호이면, Up!!
// Reset 버튼을 누르면 게임이 리셋된다.
// 5번의 기회를 다 사용하면 게임이 끝난다. (더이상 추측 불가, 버튼이 disable)
// 유저가 1~100 범위 밖에 숫자를 입력하면 알려준다. 기회를 깎지 않는다.
// 유저가 이미 입력한 숫자를 또 입력하면, 알려준다. 기회를 깎지 않는다.

let computerNum = 0
let playButton = document.getElementById("play-button")
let userInput = document.getElementById("user-input")
let resultArea = document.getElementById("result-area")
let resetButton = document.getElementById("reset-button")
let chanceArea = document.getElementById("chance-area")

// 유저가 이미 입력한 숫자를 알기 위해서 배열로 저장해야한다.
let history = []


// 5번의 기회
let chances = 5
let gameOver = false

// 함수를 매개변수로 넘김 => 함수도 변수처럼 넘길 수 있다. play() : X
playButton.addEventListener("click", play)
resetButton.addEventListener("click", reset)

// 이 함수가 다른 곳에 안쓰일 때만, 안에있는 내용이 단순할 때만
userInput.addEventListener("focus", function(){
    userInput.value = ""
})

function pickRandomNum(){
    // Math.random() 0부터 1까지의 숫자를 반환해준다.
    // Math.floor() 소수점을 버림.
    // Math.floor(Math.random() * 100) : 0~99까지라서 +1을 해준다.
    computerNum = Math.floor(Math.random() * 100)+1
    console.log("정답", computerNum)
}

function play(){
    let userValue = userInput.value

    if(userValue<1 || userValue>100){
        resultArea.textContent="1과 100사이 숫자를 입력해 주세요."
        return
    }
    
    if(history.includes(userValue)){
        resultArea.textContent="이미 입력한 숫자입니다. 다른 숫자를 입력해 주세요."
        return
    }

    chances --
    chanceArea.textContent=`남은기회:${chances}번`
    if(userValue < computerNum){
        resultArea.textContent = "Up!!!"
    } else if(userValue > computerNum){
        resultArea.textContent = "Down!!!"
    } else {
        resultArea.textContent = "맞추셨습니다!!!"
        gameOver =true
    }
    history.push(userValue)

    if(chances < 1){
        gameOver = true
    }
    if(gameOver == true){
        playButton.disabled = true
    }
}

function reset(){
    // user input창이 깨끗하게 정리되고
    userInput.value = ""
    // 새로운 번호가 생성되고
    pickRandomNum()
    resultArea.textContent = "결과값이 여기 나옵니다!"
}

pickRandomNum()