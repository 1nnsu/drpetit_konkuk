

document.addEventListener("DOMContentLoaded", function(e){
    graphMove();
    sec3Slider();
})




// sec2
const graphMove = () => {
    const ctx = document.getElementById('myChart').getContext('2d');

    const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['A 本院特色', 'B 本院特色', '建国大学店'],
        datasets: [{
        label: '투표 수',
        data: [30, 25, 8],
        backgroundColor: [
            'rgb(217, 217, 217)',
            'rgb(217, 217, 217)',
            'rgb(255, 115, 84)',
        ],
        borderColor: [
            // 'rgba(255, 99, 132, 1)',
            // 'rgba(54, 162, 235, 1)',
            // 'rgba(255, 206, 86, 1)',
        ],
        borderWidth: 0
        }]
    },
    options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
    }
    });
}


// sec3
const sec3Slider = () => {
    var swiper = new Swiper(".sec3_Swiper", {
        loop: true,
        // centeredSlides: true,
        // slidesPerView: 1,
        autoplay: {
            delay: 1000,
            disableOnInteraction: false,
        },
        // effect: 'fade',
        speed: 500,
        loopedSlides: 5,
        // spaceBetween: 40,
        // allowTouchMove: false,
        // breakpoints: {
        //     1280: {
        //         slidesPerView: 5,
        //         spaceBetween: 20,
        //     }
        // }
        navigation: {
        nextEl: ".next_btn",
        prevEl: ".pre_btn",
      },
        });
        
}


