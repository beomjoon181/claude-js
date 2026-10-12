const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  try {
    console.log('네이버 지도 접속 중...');
    await page.goto('https://map.naver.com/', { waitUntil: 'domcontentloaded' });

    await page.waitForTimeout(3000);
    console.log('페이지 로드 완료');

    // 검색 실행
    console.log('검색 실행 중...');
    const searchInput = await page.$('.input_search');
    if (searchInput) {
      await searchInput.click();
      await page.fill('.input_search', '코리아AI아카데미');
      await page.press('.input_search', 'Enter');
      console.log('검색어 입력 및 검색 실행');
    }

    // 검색 결과 로드 대기
    await page.waitForTimeout(4000);

    // 페이지의 모든 div와 li 요소 분석
    const pageContent = await page.evaluate(() => {
      const allDivs = document.querySelectorAll('div[class*="result"], div[class*="place"], li[class*="item"]');
      const divInfo = Array.from(allDivs).slice(0, 10).map(el => ({
        tag: el.tagName,
        className: el.className,
        text: el.textContent?.trim().substring(0, 50)
      }));

      const searchResults = document.querySelectorAll('[class*="search_result"]');
      console.log('Found search result elements:', searchResults.length);

      return {
        divInfo,
        searchResultCount: searchResults.length
      };
    });

    console.log('\n=== 페이지 콘텐츠 분석 ===');
    console.log(JSON.stringify(pageContent, null, 2));

    // 현재 URL 확인
    console.log('\n현재 URL:', page.url());

    // 특정 텍스트 포함 요소 찾기
    const koreaAIElements = await page.evaluate(() => {
      const allElements = document.querySelectorAll('*');
      const found = [];
      for (let el of allElements) {
        if (el.textContent && el.textContent.includes('코리아')) {
          found.push({
            tag: el.tagName,
            className: el.className,
            text: el.textContent.substring(0, 100)
          });
          if (found.length >= 5) break;
        }
      }
      return found;
    });

    console.log('\n=== "코리아" 포함 요소 ===');
    console.log(JSON.stringify(koreaAIElements, null, 2));

    // 스크린샷 저장
    await page.screenshot({ path: 'search_results_page.png' });
    console.log('\n스크린샷 저장: search_results_page.png');

    await page.waitForTimeout(5000);

  } catch (error) {
    console.error('오류 발생:', error);
  } finally {
    await browser.close();
    console.log('브라우저 종료');
  }
})();
