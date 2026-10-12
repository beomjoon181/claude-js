const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  try {
    console.log('🌍 네이버 지도 접속...');
    await page.goto('https://map.naver.com/', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(2000);

    // 검색 실행
    console.log('🔍 "코리아AI아카데미" 검색 중...\n');
    const searchInput = await page.$('.input_search');
    if (searchInput) {
      await searchInput.click();
      await page.fill('.input_search', '코리아AI아카데미');
      await page.press('.input_search', 'Enter');
    }

    // 검색 결과 로드 대기
    await page.waitForTimeout(5000);

    // 상세 정보 추출
    const detailInfo = await page.evaluate(() => {
      const places = [];

      // 방법 1: span 텍스트에서 장소명 찾기
      const nameElements = document.querySelectorAll('[class*="place"]');
      for (let el of nameElements) {
        const name = el.querySelector('.name_place, .place_name, span');
        const address = el.querySelector('.addr, .address, .addr_parent');
        if (name && name.textContent.trim()) {
          places.push({
            name: name.textContent.trim(),
            address: address?.textContent.trim() || '주소 정보 없음'
          });
        }
      }

      // 방법 2: 모든 텍스트에서 직접 찾기
      if (places.length === 0) {
        const allText = document.body.innerText;
        const lines = allText.split('\n');
        for (let i = 0; i < lines.length; i++) {
          if (lines[i].includes('코리아') || lines[i].includes('아카데미')) {
            places.push({
              name: lines[i].trim(),
              address: lines[i + 1]?.trim() || '주소 정보 없음'
            });
          }
        }
      }

      return {
        places: places.slice(0, 10),
        pageTitle: document.title,
        url: window.location.href
      };
    });

    // 결과 출력
    console.log('═══════════════════════════════════════');
    console.log('           검색 결과');
    console.log('═══════════════════════════════════════\n');

    if (detailInfo.places.length > 0) {
      detailInfo.places.forEach((place, idx) => {
        console.log(`📍 ${idx + 1}. ${place.name}`);
        console.log(`   📮 ${place.address}\n`);
      });
    } else {
      console.log('✓ 검색이 완료되었습니다.');
      console.log(`  페이지 제목: ${detailInfo.pageTitle}`);
      console.log(`  URL: ${detailInfo.url}\n`);

      // 페이지에 표시된 텍스트 샘플
      const bodyText = await page.evaluate(() => {
        return document.body.innerText.substring(0, 500);
      });
      console.log('📄 페이지 내용 샘플:');
      console.log(bodyText);
    }

    // 스크린샷
    const timestamp = Date.now();
    await page.screenshot({
      path: `naver_map_search_${timestamp}.png`,
      fullPage: true
    });
    console.log(`\n📸 스크린샷 저장: naver_map_search_${timestamp}.png`);

    // 5초 대기
    await page.waitForTimeout(5000);

  } catch (error) {
    console.error('❌ 오류:', error.message);
  } finally {
    await browser.close();
    console.log('✓ 완료');
  }
})();
