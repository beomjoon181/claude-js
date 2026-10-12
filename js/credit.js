// 신용숲 메인 페이지 - 데이터 배열로 화면 그리기
// 전역 변수 오염 방지를 위해 IIFE로 감싸서 실행
(() => {

    // 0. 캠페인 슬라이더 (Swiper)
    const campaignSwiper = new Swiper('.campaign-swiper', {
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.campaign-swiper .swiper-pagination',
            clickable: true,
        },
        speed: 800,
    })

    // 메인 비주얼 슬라이드 (첫 번째 초록 카드는 HTML에 있음)
    const heroCards = [
        { title: "내 소득그룹은?", sub: "소득 변동 여부를 확인하세요" },
        { title: "내 자산등급은?", sub: "보유 자산 현황을 한눈에" },
        { title: "내 부채비율은?", sub: "대출 부담 수준을 점검하세요" },
    ]

    const protect = [
        { badge: "신용을 보호해주세요!", label: "내 신용조회차단", status: "해제 중" },
        { badge: "명의를 보호해주세요!", label: "내 명의도용차단", status: "해제 중" },
    ]

    const services = [
        { name: "점수 올리기" },
        { name: "연체방지" },
        { name: "신용조회차단" },
        { name: "명의도용차단" },
        { name: "대출가능진단", tag: "N" },
        { name: "카드발급진단" },
        { name: "보험혜택진단" },
        { name: "이름어때", tag: "HOT" },
    ]

    const benefits = [
        { tag: "개인/커플/사업자/집주인", title: "내 신용을 제출할때\n신용보고서", color: "gray" },
        { tag: "#이름분석 #이름랭킹", title: "나와 똑같은 이름\n전국에 몇 명?", color: "gray" },
        { tag: "신용점수 예측하기", title: "대출 신규로 받으면\n내 신용점수는?", color: "green" },
        { tag: "무료신용조회", title: "나의 신용점수\n무료로 조회해보세요", color: "gray" },
        { tag: "제휴 신용대출", title: "내 대출한도가\n도착했습니다!", color: "peach" },
        { tag: "맞춤채무 조정", title: "해결되지 않는 연체\n회생파산 무료 진단", color: "yellow" },
    ]

    const perks = [
        { tag: "맞춤형 카드상품", title: "내 신용에 맞는\n퍼스널카드 찾기!", color: "pink" },
        { tag: "맞춤형 대출상품", title: "내 신용점수로\n대출진단 받기", color: "violet" },
        { tag: "보험혜택진단", title: "나에게 맞는\n혜택 받기", color: "yellow" },
        { tag: "맞춤형 솔루션", title: "확인하기 ›", color: "mint" },
        { tag: "부동산 담보대출", title: "지금 가능한\n최대 한도는?", color: "sky" },
    ]

    // 1. 슬라이드 카드 추가
    const track = document.querySelector("#slider-track")
    for (const card of heroCards) {
        track.innerHTML += `
            <div class="slide">
                <div class="title">${card.title}</div>
                <div class="body">
                    <div class="score">? <small>›</small></div>
                    <div class="ph round">icon</div>
                </div>
                <div class="foot">${card.sub}</div>
            </div>`
    }

    // 2. 슬라이드 이동 (점 3개)
    const dotsBox = document.querySelector("#dots")
    let hero = 0

    function showSlide(index) {
        hero = index
        // 카드 한 장 너비 + 간격만큼 이동
        const slide = track.querySelector(".slide")
        const gap = parseFloat(getComputedStyle(track).gap)
        const step = slide.offsetWidth + gap
        track.style.transform = `translateX(-${hero * step}px)`

        const dots = dotsBox.querySelectorAll("span")
        dots.forEach((dot, i) => dot.classList.toggle("active", i === hero))
    }

    for (let i = 0; i < 3; i++) {
        const dot = document.createElement("span")
        dot.addEventListener("click", () => showSlide(i))
        dotsBox.appendChild(dot)
    }
    showSlide(0)
    window.addEventListener("resize", () => showSlide(hero))

    // 3. 보호 서비스 카드 (배너 영역 앞에 끼워 넣기)
    const protectArea = document.querySelector("#protect-area")
    const sideBanners = protectArea.querySelector(".side-banners")
    for (const p of protect) {
        sideBanners.insertAdjacentHTML("beforebegin", `
            <div class="protect">
                <div class="badge">${p.badge}</div>
                <div class="label">${p.label}</div>
                <div class="big">${p.status} ›</div>
                <div class="ph">3D icon</div>
            </div>`)
    }

    // 4. 서비스 아이콘 (tag가 있을 때만 뱃지 표시)
    const servicesBox = document.querySelector("#services")
    for (const s of services) {
        const tag = s.tag ? `<span class="tag">${s.tag}</span>` : ""
        servicesBox.innerHTML += `
            <div class="service">
                <div class="icon">${tag}</div>
                <span class="name">${s.name}</span>
            </div>`
    }

    // 5. 혜택 정보
    const benefitsBox = document.querySelector("#benefits")
    for (const b of benefits) {
        benefitsBox.innerHTML += `
            <div class="benefit ${b.color}">
                <div class="tag">${b.tag}</div>
                <div class="title">${b.title}</div>
                <div class="ph dark">3D icon</div>
            </div>`
    }

    // 6. 세상에 이런 혜택이
    const perksBox = document.querySelector("#perks")
    for (const k of perks) {
        perksBox.innerHTML += `
            <div class="perk ${k.color}">
                <div class="ph round">icon</div>
                <div class="tag">${k.tag}</div>
                <div class="title">${k.title}</div>
            </div>`
    }

    // 7. 신용점수 탭 메뉴
    const scoreData = {
        loan: 850,
        card: 720,
        delinquency: 680
    }

    const scoreDisplay = document.querySelector("#scoreDisplay")
    const scoreTabs = document.querySelectorAll(".score-tab")

    scoreTabs.forEach(tab => {
        tab.addEventListener("click", () => {
            const type = tab.dataset.type
            const score = scoreData[type]

            scoreDisplay.textContent = `${score} `
            scoreDisplay.innerHTML += `<small>점 ›</small>`

            scoreTabs.forEach(t => t.classList.remove("active"))
            tab.classList.add("active")
        })
    })

    // 8. 검색창 토글
    const searchBtn = document.querySelector("#searchBtn")
    const searchBar = document.querySelector("#searchBar")
    const searchInput = document.querySelector("#searchInput")
    const searchClose = document.querySelector("#searchClose")

    searchBtn.addEventListener("click", () => {
        searchBar.classList.toggle("active")
        if (searchBar.classList.contains("active")) {
            searchInput.focus()
        }
    })

    searchClose.addEventListener("click", () => {
        searchBar.classList.remove("active")
        searchInput.value = ""
    })

    // 검색창 외부 클릭 시 닫기
    document.addEventListener("click", (e) => {
        if (!searchBtn.contains(e.target) && !searchBar.contains(e.target)) {
            searchBar.classList.remove("active")
        }
    })

    // Enter 키로 검색
    searchInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            console.log("검색:", searchInput.value)
            searchBar.classList.remove("active")
        }
    })

    // 9. 전체메뉴 토글
    const menuBtn = document.querySelector(".menu-btn")
    const menuPopup = document.querySelector("#menuPopup")

    menuBtn.addEventListener("click", () => {
        menuPopup.classList.toggle("active")
    })

    // 외부 클릭 시 팝업 닫기
    document.addEventListener("click", (e) => {
        if (!menuBtn.contains(e.target) && !menuPopup.contains(e.target)) {
            menuPopup.classList.remove("active")
        }
    })
})()
