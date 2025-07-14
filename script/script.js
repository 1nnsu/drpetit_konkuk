

document.addEventListener("DOMContentLoaded", function(e){
    // graphMove();
    sec3Slider();
})


// sec2
const graphMove = () => {
  const chartCanvas = document.getElementById('myChart');
  const ctx = chartCanvas.getContext('2d');
  const iconImg = new Image();
  iconImg.src = '/drpetit_konkuk/graph/logo.png';

  const imageLabelPlugin = {
    id: 'imageLabelPlugin',
    afterDatasetsDraw(chart) {
      const ctx = chart.ctx;
      const yAxis = chart.scales.y;

      const labelIndex = chart.data.labels.indexOf('建国大学店');
      if (labelIndex === -1) return;

      const yPos = yAxis.getPixelForTick(labelIndex);
      const leftPadding = chart.options.layout?.padding?.left ?? 70;
      const isMobile = window.innerWidth < 600;

      const imgWidth = chart.width * (isMobile ? 0.22 : 0.15);
      const imgHeight = imgWidth * (16 / 125);

      const imgX = leftPadding - 10;
      const offsetDown = 30;  // 원하는 만큼 아래로 내림
      const imgY = yPos - imgHeight - 40 + offsetDown;

      if (iconImg.complete) {
        ctx.drawImage(iconImg, imgX, imgY, imgWidth, imgHeight);
      }

      const width = chart.width;
      const size = isMobile ? 16 : Math.round(width / 40);

      ctx.font = `${size}px 'Noto Serif', serif`;
      ctx.fillStyle = '#222';
      ctx.textAlign = 'right';
      ctx.textBaseline = 'top';

      const offsetX = isMobile ? 2 : 0;
      const textX = imgX + imgWidth + offsetX;
      const textY = yPos - size / 2 + offsetDown;

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
                const isMobile = window.innerWidth < 700;
              
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
                const windowWidth = window.innerWidth;
                let size;

                if (windowWidth < 500) {
                  size = 16;
                } else if (windowWidth < 650) {
                  size = 18;
                } else if (windowWidth < 800) {
                  size = 20;
                } else {
                  size = Math.round(width / 35);
                }

                return {
                  size,
                  family: '"Noto Serif", serif',
                };
              },
              callback: function(value) {
                const label = this.getLabelForValue(value);
                return label === '建国大学店' ? '　' : label;
              },
              color: '#222',
              padding: (() => {
                const w = window.innerWidth;
                if (w < 400) return 0;
                if (w < 500) return 10;
                if (w < 550) return 10;
                if (w < 600) return 20;     // 🔼 600px 구간 padding 넉넉하게
                if (w < 800) return 12;
                return 14;
              })()

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
            offset: 20,
            color: context => {
              const index = context.dataIndex;
              const label = context.chart.data.labels[index];
              return label === '建国大学店' ? '#fff' : '#222';  // ✅ 마지막 막대만 흰색으로
            },

            font: context => {
              const width = context.chart.width;
              const isMobile = window.innerWidth < 600;

              const baseSize = isMobile ? 14 : 18;   // 모바일일 때 최소값
              const maxSize = isMobile ? 20 : 30;    // 모바일일 때 최대값
              const minWidth = 300;
              const maxWidth = 800;

              const ratio = Math.min(Math.max((width - minWidth) / (maxWidth - minWidth), 0), 1);
              const size = Math.round(baseSize + (maxSize - baseSize) * ratio);

              return {
                size,
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


