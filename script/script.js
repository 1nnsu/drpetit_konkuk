

document.addEventListener("DOMContentLoaded", function(e){
    // graphMove();
    sec3Slider();
})


// sec2
const graphMove = () => {
  const chartCanvas = document.getElementById('myChart');
  const ctx = chartCanvas.getContext('2d');
  const iconImg = new Image();
  iconImg.src = '../img/graph/logo.png';

  const imageLabelPlugin = {
    id: 'imageLabelPlugin',
    afterDatasetsDraw(chart) {
      const ctx = chart.ctx;
      const yAxis = chart.scales.y;
  
      const labelIndex = chart.data.labels.indexOf('建国大学店');
      if (labelIndex === -1) return;
  
      const yPos = yAxis.getPixelForTick(labelIndex);
      const leftPadding = chart.options.layout?.padding?.left ?? 70;
      const isMobile = window.innerWidth < 600; // 모바일 체크
  
      // 모바일일 때 이미지 크기 키우기 (예: 0.22 vs 0.15)
      const imgWidth = chart.width * (isMobile ? 0.22 : 0.15);
      const imgHeight = imgWidth * (16 / 125);
  
      // 모바일일 때 imgX 오른쪽으로 이동
      const imgX = isMobile ? (leftPadding - 10) : (leftPadding - 10);
      const imgY = yPos - imgHeight / 2 + 20;
  
      if (iconImg.complete) {
        ctx.drawImage(iconImg, imgX, imgY, imgWidth, imgHeight);
      }
  
      const width = chart.width;
      const size = isMobile ? 20 : Math.round(width / 35); // 폰트 크기
  
      ctx.font = `${size}px 'Noto Serif', serif`;
      ctx.fillStyle = '#222';
      ctx.textAlign = 'right';
      ctx.textBaseline = 'top';
  
      const offsetX = isMobile ? 2 : 0;
      const textX = imgX + imgWidth + offsetX;
      const textY = imgY - 4;
  
      const lines = ['建国大学', ' '];
      lines.forEach((line, i) => {
        ctx.fillText(line, textX, textY - (lines.length - 1 - i) * (size + 4));
      });
    }
  };
  
  
  
  

  iconImg.onload = () => {
    const isMobile = window.innerWidth < 600;
    const leftPadding = isMobile ? 25 : 20;

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['A 本院特色', 'B 本院特色', '建国大学店'],
        datasets: [{
          label: '투표 수',
          data: [30, 25, 8],
          backgroundColor: ['rgb(217,217,217)', 'rgb(217,217,217)', 'rgb(255,115,84)'],
          borderWidth: 0
        }]
      },
      options: {
        animation: {
          duration: 3000,
          easing: 'easeOutQuart'
        },
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        layout: {
          padding: {
            left: leftPadding
          }
        },
        scales: {
          x: {
            ticks: {
              callback: (value, index, ticks) => {
                const lastTick = ticks[ticks.length - 1].value;
                return value === lastTick ? value + ' 名' : value;
              },
              font: context => {
                const width = context.chart.width;
                const isMobile = window.innerWidth < 600;
              
                return {
                  size: isMobile ? 16 : Math.round(width / 50),
                  family: '"Noto Serif", serif',
                };
              },
              color: '#222',
            }
          },
          y: {
            ticks: {
              font: context => {
                const width = context.chart.width;
                const isMobile = window.innerWidth < 600;
              
                return {
                  size: isMobile ? 20 : Math.round(width / 35),
                  family: '"Noto Serif", serif',
                };
              },
              callback: function(value) {
                const label = this.getLabelForValue(value);
                return label === '建国大学店' ? '　' : label;
              },
              color: '#222',
              padding: 5,
            }
          }
        },
        plugins: {
          legend: {
            display: false
          },
          datalabels: {
            anchor: 'end',
            align: 'start',
            color: '#fff',
            font: context => {
              const width = context.chart.width;
              const isMobile = window.innerWidth < 600;
              return {
                size: isMobile ? 30 : Math.round(width / 35),
                family: '"Noto Serif", serif',
              };
            }
          },
          title: false,
          tooltip: {
            enabled: false,
            titleFont: { family: 'Noto Serif', size: 18, weight: 'bold' },
            bodyFont: { family: 'Noto Serif', size: 16 },
          }
        }
      },
      plugins: [ChartDataLabels, imageLabelPlugin]
    });
  };
};

document.addEventListener('DOMContentLoaded', () => {
  // ✅ 화면에 보일 때만 실행되게 설정
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        graphMove(); // 차트 실행
        observer.unobserve(entry.target); // 한 번만 실행되도록 설정
      }
    });
  }, { threshold: 0.2 }); // 20% 보이면 실행

  observer.observe(document.getElementById('myChart'));

})


// sec3
const sec3Slider = () => {
    var swiper = new Swiper(".sec3_Swiper", {
        loop: true,
        autoplay: {
            delay: 1000,
            disableOnInteraction: false,
        },
        effect: 'fade',
        speed: 500,
        loopedSlides: 5,
        navigation: {
        nextEl: ".next_btn",
        prevEl: ".pre_btn",
        },
    });
        
}


