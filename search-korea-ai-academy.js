const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  try {
    console.log('✓ 네이버 지도 접속 중...');
    await page.goto('https://map.naver.com/', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(3000);
    console.log('✓ 페이지 로드 완료\n');

    // 검색 입력
    console.log('📍 검색 실행: "코리아AI아카데미"');
    const searchInput = await page.$('.input_search');
    if (searchInput) {
      await searchInput.click();
      await page.fill('.input_search', '코리아AI아카데미');
      await page.press('.input_search', 'Enter');
      console.log('✓ 검색 실행됨\n');
    }

    // 검색 결과 로드 대기
    console.log('⏳ 검색 결과 로드 중...');
    await page.waitForTimeout(5000);

    // 검색 결과 정보 추출
    const searchInfo = await page.evaluate(() => {
      const results = [];

      // 좌측 패널의 검색 결과 아이템들
      const searchItems = document.querySelectorAll('[class*="item_place"], [class*="location"], li');

      for (let item of searchItems) {
        const text = item.textContent?.trim();
        if (text && text.includes('코리아') || text.includes('AI')) {
          results.push({
            text: text.substring(0, 100),
            className: item.className
          });
        }
      }

      // 지도 위의 모든 마커/텍스트 찾기
      const markers = document.querySelectorAll('[class*="marker"], [class*="info"]');
      const markerInfo = Array.from(markers).slice(0, 5).map(m => ({
        tag: m.tagName,
        text: m.textContent?.substring(0, 50)
      }));

      return {
        results: results.slice(0, 5),
        markerCount: markers.length,
        markerInfo
      };
    });

    console.log('✓ 검색 완료\n');
    console.log('=== 검색 결과 ===');
    console.log(JSON.stringify(searchInfo, null, 2));

    // 현재 상태 출력
    console.log('\n=== 현재 상태 ===');
    console.log('URL:', page.url());
    console.log('제목:', await page.title());

    // 스크린샷 저장
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const screenshotPath = `korea-ai-academy-${timestamp}.png`;
    await page.screenshot({ path: screenshotPath, fullPage: true });
    console.log(`\n📸 스크린샷 저장: ${screenshotPath}`);

    // 검색 결과 HTML 저장 (디버깅용)
    const html = await page.content();
    fs.writeFileSync('search-page-content.html', html);
    console.log('💾 페이지 HTML 저장: search-page-content.html');

    // 페이지 상태 유지
    console.log('\n⏸️  5초 후 종료...');
    await page.waitForTimeout(5000);

  } catch (error) {
    console.error('❌ 오류 발생:', error.message);
  } finally {
    await browser.close();
    console.log('✓ 브라우저 종료');
  }
})();
