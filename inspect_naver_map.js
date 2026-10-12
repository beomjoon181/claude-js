const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  try {
    console.log('네이버 지도 접속 중...');
    await page.goto('https://map.naver.com/', { waitUntil: 'domcontentloaded' });

    // 페이지 로드 대기
    await page.waitForTimeout(3000);
    console.log('페이지 로드 완료');

    // 입력 필드들 찾기
    const inputs = await page.evaluate(() => {
      const inputs = document.querySelectorAll('input');
      return Array.from(inputs).map((input, idx) => ({
        index: idx,
        id: input.id,
        name: input.name,
        type: input.type,
        placeholder: input.placeholder,
        value: input.value,
        className: input.className
      }));
    });

    console.log('\n=== 입력 필드 목록 ===');
    console.log(JSON.stringify(inputs, null, 2));

    // 검색 관련 버튼들 찾기
    const buttons = await page.evaluate(() => {
      const buttons = document.querySelectorAll('button');
      return Array.from(buttons)
        .filter(btn => btn.textContent.includes('검') || btn.className.includes('search'))
        .map((btn, idx) => ({
          index: idx,
          text: btn.textContent.trim().substring(0, 20),
          className: btn.className,
          id: btn.id
        }));
    });

    console.log('\n=== 검색 관련 버튼 ===');
    console.log(JSON.stringify(buttons, null, 2));

    // 페이지 HTML 일부 출력
    const html = await page.content();
    if (html.includes('searchInput')) {
      console.log('\n"searchInput" 텍스트 발견');
    }

    // 스크린샷 저장
    await page.screenshot({ path: 'inspect_page.png' });
    console.log('\n스크린샷 저장: inspect_page.png');

    // 5초 유지
    await page.waitForTimeout(5000);

  } catch (error) {
    console.error('오류 발생:', error);
  } finally {
    await browser.close();
    console.log('브라우저 종료');
  }
})();
