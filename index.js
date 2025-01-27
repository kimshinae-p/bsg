$(function () {
    var swiper = new Swiper('.flowslide_inner ', {
      slidesPerView: 9,//보여지는 갤러리 수
      spaceBetween: 43,//갤러리 사이 간격
      speed: 5000,//버튼을 슬라이드가 넘어가는 시간
      autoplay: {
        delay: 0,//자동으로 넘어가기 전 머무르는 시간
        disableOnInteraction: false,
      },
      loop: true,//슬라이드 무한반복
    });

    $('.flowslide .swiper-slide').on('mouseover', function () {
      swiper.autoplay.stop();
    });
    $('.flowslide .swiper-slide').on('mouseout', function () {
      swiper.autoplay.start();
    });

    var swiper = new Swiper('.gallery-center_inner ', {
      slidesPerView: 4,//보여지는 갤러리 수
      spaceBetween: 30,//갤러리 사이 간격
      centeredSlides: true,//센터모드
      speed: 1500,//버튼을 슬라이드가 넘어가는 시간
      autoplay: {
        delay: 2500,//자동으로 넘어가기 전 머무르는 시간
        disableOnInteraction: false,
      },
      loop: true,//슬라이드 무한반복
      navigation: {//화살표 버튼
        nextEl: '.gallery-center .swiper-button-next',
        prevEl: '.gallery-center .swiper-button-prev',
      },
      pagination: {//블릿 버튼
        el: '.gallery-center .swiper-pagination',
        clickable: true,
      },
    }); var swiper = new Swiper('.gallery-center_inner ', {
      slidesPerView: 5,//보여지는 갤러리 수
      spaceBetween: 30,//갤러리 사이 간격
      centeredSlides: true,//센터모드
      speed: 1500,//버튼을 슬라이드가 넘어가는 시간
      autoplay: {
        delay: 2500,//자동으로 넘어가기 전 머무르는 시간
        disableOnInteraction: false,
      },
      loop: true,//슬라이드 무한반복
      navigation: {//화살표 버튼
        nextEl: '.gallery-center .swiper-button-next',
        prevEl: '.gallery-center .swiper-button-prev',
      },
      pagination: {//블릿 버튼
        el: '.gallery-center .swiper-pagination',
        clickable: true,
      },
    });

  });

  $(function () {
    var polyline = document.querySelector('.drawing_line_polyline');
    var polyPoints = polyline.getAttribute('points');
    var circle = document.querySelector('.drawing_line_circle');
    var circleX = circle.getAttribute('cx');
    var circleY = circle.getAttribute('cy');
    var circleR = circle.getAttribute('r');

    var total = 12;
    var gap = 30;
    var ease = 0.5;
    var debounce_removeLine;
    var debounce_counter = 0;

    var pointer = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      tx: 0,
      ty: 0,
      dist: 0,
      scale: 1,
      speed: 2,
      circRadius: 8,
      updateCrds: function () {
        if (this.x != 0) {
          this.dist = Math.abs((this.x - this.tx) + (this.y - this.ty));
          this.scale = Math.max(this.scale + ((100 - this.dist * 8) * 0.01 - this.scale) * 0.1, 0.25); // gt 0.25 = 4px
          this.tx += (this.x - this.tx) / this.speed;
          this.ty += (this.y - this.ty) / this.speed;
        }
      }
    };

    var points = [];

    $(window).on('mousemove', function (e) {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      debounce_counter = 0;
      drawLine();

      // debounce
      clearTimeout(debounce_removeLine);
      debounce_removeLine = setTimeout(() => {
        //console.log('debounce_removeLine', new Date().getTime());
        debounce_counter = 12;
        drawLine();
      }, 80);
    })

    $(window).on('mousedown', function (e) {
      pointer.circRadius = 6;
      drawLine();
    });

    $(window).on('mouseup', function (e) {
      pointer.circRadius = 8;
      drawLine();
    });

    function drawLine() {
      pointer.updateCrds();

      points.push({
        x: pointer.tx,
        y: pointer.ty
      });
      while (points.length > total) {
        points.shift();
        if (points.length > gap) {
          for (var i = 0; i < 5; i++) {
            points.shift();
          }
        }
      }
      var pointsArr = points.map(point => `${point.x},${point.y}`);
      polyPoints = pointsArr.join(' ');
      polyline.setAttribute('points', polyPoints);

      // circle
      circleX = pointer.x;
      circleY = pointer.y;
      circleR = pointer.scale * pointer.circRadius;

      circle.setAttribute('cx', circleX);
      circle.setAttribute('cy', circleY);
      circle.setAttribute('r', circleR);

      if (debounce_counter > 0) {
        debounce_counter--;
        requestAnimationFrame(drawLine);
      }
    };

    AOS.init({
			duration: 1200 //aos 나타나는 속도
		});
  });