"use strict";

{
  //トップへスクロール
  const pageupIcon = document.getElementById("js-pageup");
  pageupIcon.addEventListener("click", (e) => {
    e.preventDefault();
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  });

  //mvアニメーション
  const bgLRextendTriggers =
    document.getElementsByClassName("bgLRextendTrigger");
  const bgappearTriggers = document.getElementsByClassName("bgappearTrigger");

  //配列に変換
  var bgLRextendTriggers_arr = Array.from(bgLRextendTriggers);
  var bgappearTriggers_arr = Array.from(bgappearTriggers);

  window.addEventListener("load", () => {
    bgLRextendTriggers_arr.forEach((bgLRextendTrigger) => {
      bgLRextendTrigger.classList.add("bgLRextend");
    });

    bgappearTriggers_arr.forEach((bgappearTrigger) => {
      bgappearTrigger.classList.add("bgappear");
    });
  });

  // スクロールでヘッダーを表示
  const header = document.querySelector(".header");
  const headerButton = document.querySelector(".header__button");

  window.addEventListener("scroll", () => {
    if (300 < window.scrollY) {
      header.classList.add("js-header-bg");
      headerButton.classList.add("fadein");
      pageupIcon.classList.add("fadein");
    } else {
      header.classList.remove("js-header-bg");
      headerButton.classList.remove("fadein");
      headerButton.classList.add("fadeout");
      pageupIcon.classList.remove("fadein");
      pageupIcon.classList.add("fadeout");
    }
  });

  // 料金 横にスクロールでアイコンを非表示
  const priceScrollIcon = document.querySelector(".price__scroll-icon");
  const priceList = document.querySelector(".price__list");

  priceList.addEventListener("scroll", () => {
    priceScrollIcon.classList.add("fadeout");
  });

  // タブ切り替え
  const tabs = document.getElementsByClassName("tab");
  const tabcontents = document.getElementsByClassName("tab-content");

  var tabs_arr = Array.from(tabs);
  var tabcontents_arr = Array.from(tabcontents);

  tabs_arr.forEach((clickedTab) => {
    clickedTab.addEventListener("click", (e) => {
      e.preventDefault();
      tabs_arr.forEach((tabtext) => {
        tabtext.classList.remove("active");
      });
      clickedTab.classList.add("active");

      tabcontents_arr.forEach((tabcontent) => {
        tabcontent.classList.remove("show");
      });

      document.getElementById(clickedTab.dataset.id).classList.add("show");
    });
  });

  // スタジオ
  const next = document.getElementById("next");
  const prev = document.getElementById("prev");
  const carousselInner = document.getElementById("caroussel__imgbox");
  const slides = carousselInner.children;
  const dots = [];
  let currentIndex = 0;

  // 最初・最後の画像を表示するとき矢印を非表示
  function updateButtons() {
    prev.classList.remove("hidden");
    next.classList.remove("hidden");

    if (currentIndex === 0) {
      prev.classList.add("hidden");
    }
    if (currentIndex === slides.length - 1) {
      next.classList.add("hidden");
    }
  }

  // 画像一枚分スライド
  function moveSlides() {
    const slideWidth = slides[0].getBoundingClientRect().width;
    carousselInner.style.transform = `translateX(${
      -1 * slideWidth * currentIndex
    }px)`;
  }

  // 画像の数だけナビゲーションボタンを生成
  function setupDots() {
    for (let i = 0; i < slides.length; i++) {
      const button = document.createElement("button");
      button.addEventListener("click", () => {
        currentIndex = i;
        updateDots();
        updateButtons();
        moveSlides();
      });
      dots.push(button);
      document.querySelector(".caroussel__circlebox").appendChild(button);
    }

    dots[0].classList.add("current");
  }

  function updateDots() {
    dots.forEach((dot) => {
      dot.classList.remove("current");
    });
    dots[currentIndex].classList.add("current");
  }

  updateButtons();
  setupDots();

  next.addEventListener("click", () => {
    currentIndex++;
    updateButtons();
    updateDots();
    moveSlides();
  });

  prev.addEventListener("click", () => {
    currentIndex--;
    updateButtons();
    updateDots();
    moveSlides();
  });

  window.addEventListener("resize", () => {
    moveSlides();
  });

  // アコーディオン
  const accordionItems = document.querySelectorAll(".accordion__item");

  accordionItems.forEach((accordionItem) => {
    accordionItem.addEventListener("click", () => {
      accordionItem.classList.toggle("appear");

      accordionItems.forEach((el) => {
        if (accordionItem !== el) {
          el.classList.remove("appear");
        }
      });
    });
  });
}
