const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  try {
    console.log('네이버 지도 접속 중...');
    await page.goto('https://map.naver.com/');

    // 페이지 로드 대기
    await page.waitForLoadState('networkidle');
    console.log('페이지 로드 완료');

    // 검색 입력창 찾기 및 검색어 입력
    console.log('검색창에 "코리아AI아카데미" 입력 중...');
    const searchInput = await page.$('.input_search');
    if (searchInput) {
      await searchInput.click();
      await page.fill('.input_search', '코리아AI아카데미');
      console.log('검색어 입력 완료');

      // Enter 키로 검색
      await page.press('.input_search', 'Enter');
      console.log('검색 실행');
    } else {
      console.log('검색 입력창을 찾을 수 없습니다');
    }

    // 검색 결과 로드 대기
    await page.waitForTimeout(2000);

    // 검색 결과 정보 출력
    const results = await page.evaluate(() => {
      const items = document.querySelectorAll('[class*="search"] [class*="item"]');
      return Array.from(items).slice(0, 5).map(item => ({
        title: item.textContent?.trim().split('\n')[0],
        text: item.textContent?.trim()
      }));
    });

    console.log('\n=== 검색 결과 ===');
    console.log(JSON.stringify(results, null, 2));

    // 첫 번째 결과 클릭 (있으면)
    const firstResult = await page.$('[class*="search"] [class*="item"]');
    if (firstResult) {
      console.log('\n첫 번째 결과 클릭 중...');
      await firstResult.click();
      await page.waitForTimeout(2000);
    }

    // 스크린샷 저장
    await page.screenshot({ path: 'naver-map-search.png' });
    console.log('스크린샷 저장: naver-map-search.png');

    // 브라우저 열린 상태 유지 (5초 후 종료)
    await page.waitForTimeout(5000);

  } catch (error) {
    console.error('오류 발생:', error);
  } finally {
    await browser.close();
    console.log('브라우저 종료');
  }
})();
