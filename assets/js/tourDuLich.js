let array = [];
const contentSlider = document.querySelector(".content-slider");
let numberslider = 7;

// Load danh sách địa điểm du lịch từ API
const dataUrl = "https://64069dc5862956433e556a26.mockapi.io/v1/diaDiemDuLich";
fetch(dataUrl)
    .then((res) => res.json())
    .then((res) => {
        array = res;
    });

function showAlert() {
    let alertBox = document.querySelector(".alertBox");
    alertBox.style.transform = "translateX(0%)";
    alertBox.style.opacity = "1";
    setTimeout(() => {
        closeAlert(alertBox);
    }, 2500);
}

function closeAlert(alertBox) {
    alertBox.style.transform = "translateX(100%)";
    alertBox.style.opacity = "0";
}

function handleTourDuLich() {
    // Render slider
    if (contentSlider) {
        let sliders = "";
        for (let i = 1; i <= numberslider; i++) {
            sliders += `
                <div class="content-slider__item">
                    <img
                        src="../imgs/slider/slider_${i}.jpg"
                        alt="slide ${i}"
                        class="content-slider__item-img"
                    />
                </div>
                `;
        }
        contentSlider.innerHTML = sliders;
    }

    // Setup slider
    $(document).ready(function () {
        $(".content-slider").slick({
            centerMode: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: true,
            infinite: true,
            cssEase: "linear",
            variableWidth: true,
            variableHeight: true,
            arrows: false,
        });
    });

    // Customize slider navigation buttons
    $(".content-slider__prev-btn").click(function (e) {
        e.preventDefault();
        $(".content-slider").slick("slickPrev");
    });

    $(".content-slider__next-btn").click(function (e) {
        e.preventDefault();
        $(".content-slider").slick("slickNext");
    });
}

function handleItemTravel(idx) {
    let data = array[idx];

    // Format number to currency
    let giaCu = Number(data.giaCu).toLocaleString("en-US");
    let giaVe = Number(data.giaVe).toLocaleString("en-US");

    // Render travel item details
    content.innerHTML = `
    <div style="margin-top:${(header.clientHeight / 2)}px;" class="alertBox">
        Đã đặt tour thành công !
        <span
            class="closebtn"
            onclick="this.parentElement.style.transform='translateX(100%)';"
            >&times;</span
        >
    </div>
    <div class="content__current-position">
        <a
            href="../../index.html"
            class="content__current-position__home-page"
            >Trang chủ</a
        >
        <span style="margin: 0 5px">/</span>
        <a
            href="../pages/tourDuLich.html"
            class="content__current-position__current-page"
            >Tour du lịch</a
        >
        <span style="margin: 0 5px">/</span>
        <a
            class="content__current-position__current-page"
            >${data.diaDiem}</a
        >
    </div>
    <div class="itemTravel">
        <div class="itemTravel__leftcolumn">
            <div class="itemTravel__leftcolumn--card">
                <div class="card-content">
                    <img
                        class="itemTravel__leftcolumn--card--picture"
                        src="${data.imgsTour[1]}"
                    />
                </div>
            </div>
            <div class="itemTravel__leftcolumn--card">
                <h2>CHƯƠNG TRÌNH TOUR</h2>
                <div class="itemTravel__leftcolumn--card--tour">
                    ${data.chuongTrinh.map((value, index) => {
        return `
                                <div class="itemTravel__leftcolumn--card--tour--item">
                                    <img src="${value.imgNgay}" />
                                    <span class="itemTravel__leftcolumn--card--tour--item__date">
                                        Ngày ${index + 1}: ${value.viTri} NẮNG
                                    </span>
                                    <p
                                        class="itemTravel__leftcolumn--card--tour--item__title"
                                    >
                                        ${value.gthieuNgay}
                                    </p>
                                </div>
                            `;
    }).join('')}
                </div>
                <h2>CHÍNH SÁCH TOUR</h2>
                <div class="itemTravel__leftcolumn--card--tour">
                    ${data.tieuChuan.map((tieuchuan, idxTC) => {
        return `
                            <span
                                class="itemTravel__leftcolumn--card--tour--item__title"
                            >
                                - ${tieuchuan} <br>
                            </span>
                        `;
    }).join('')}
                </div>
                <h2>ĐIỀU KHOẢN & QUY ĐỊNH</h2>
                <div class="itemTravel__leftcolumn--card--tour">
                    <p
                        class="itemTravel__leftcolumn--card--tourRules"
                    >
                        Điều khoản & Quy định đang cập nhật.
                    </p>
                </div>
                <h2>ĐẶT TOUR</h2>
                <div class="itemTravel__leftcolumn--card--tour">
                    <p
                        class="itemTravel__leftcolumn--card--tourRules"
                    >
                        Đang cập nhật.
                    </p>
                </div>
            </div>
        </div>
        <div class="itemTravel__rightcolumn">
            <div class="itemTravel__rightcolumn--card">
                <h2>
                    ${data.diaDiem}
                </h2>
                <p class="itemTravel__rightcolumn--card--newprice">
                    Giá mới: ${giaVe} vnd
                </p>
                <p class="itemTravel__rightcolumn--card--oldprice">
                    Giá cũ: ${giaCu} vnd
                </p>
                <p
                    class="itemTravel__rightcolum--card--tour--item__title"
                    style="font-size: 14px"
                >
                    <ion-icon name="airplane-outline"></ion-icon>
                    Di chuyển bằng ${data.phuongTien}
                </p>
                <p
                    class="itemTravel__rightcolum--card--tour--item__title"
                    style="font-size: 14px"
                >
                    <ion-icon name="airplane-outline"></ion-icon>
                    Số lượng vé: ${data.soLuong}
                </p>
                <p
                    class="itemTravel__rightcolum--card--tour--item__title"
                    style="font-size: 14px"
                >
                    <ion-icon name="airplane-outline"></ion-icon>
                    Đã đặt: ${data.daDat}
                </p>
                <p
                    class="itemTravel__rightcolum--card--tour--item__title"
                    style="font-size: 14px"
                >
                    <ion-icon name="airplane-outline"></ion-icon>
                    Ngày xuất phát: ${data.ngayXuatPhat}
                </p>
                <p
                    class="itemTravel__rightcolum--card--tour--item__title"
                    style="font-size: 14px"
                >
                    <ion-icon
                        name="calendar-clear-outline"
                    ></ion-icon>
                    Lịch khởi hành: Các ngày trong tuần
                </p>
                <p
                    class="itemTravel__rightcolum--card--tour--item__title"
                    style="font-size: 14px"
                >
                    <ion-icon name="calendar-outline"></ion-icon>
                    Thời gian: ${data.soNgay} ngày
                </p>
                <p
                    class="itemTravel__rightcolum--card--tour--item__title"
                    style="font-size: 14px"
                >
                    ${data.gioThieu}
                </p>
                <button data-item=${idx} class="itemTravel__rightcolumn--card--btn order-btn">
                    Đặt Tour
                </button>
                <button class="itemTravel__rightcolumn--card--btn">
                    Yêu cầu đặt
                </button>
            </div>
        </div>
    </div>
    `;
    document.body.scrollIntoView({ behavior: "smooth", block: "start" });
    let datVe = document.querySelector(".order-btn");

    datVe.addEventListener("click", function (e) {
        // Kiểm tra xem người dùng đã đăng nhập hay chưa
        const isLoggedIn = checkLoggedIn();

        if (isLoggedIn) {
            // Đã đăng nhập, thực hiện thêm vào giỏ hàng và lưu vào localStorage
            const currentUser = getCurrentUserFromLocalStorage(); // Lấy thông tin currentUser từ localStorage
            let orderTravel = array[Number(e.target.dataset.item)];
            currentUser.cartItems.push(orderTravel);
            showAlert();
            // Cập nhật số lượng hàng trong giỏ hàng cho thẻ status
            localStorage.setItem("currentUser", JSON.stringify(currentUser)); //Thêm vào localStorage
            updateStatusCart();
            updateCurrentUserInDatabase(currentUser); // Cập nhật lại thông tin currentUser lên cơ sở dữ liệu
        } else {
            // Chưa đăng nhập, hiển thị thông báo và chuyển hướng đến trang đăng nhập
            alert("Bạn cần đăng nhập để đặt vé!");
            window.location.href = "/assets/pages/account_signin.html"; // Điều hướng đến trang đăng nhập
        }
    });

    // Hàm để kiểm tra trạng thái đăng nhập (cần được điều chỉnh để phù hợp với cách bạn xác định trạng thái đăng nhập)
    function checkLoggedIn() {
        const userInfo = localStorage.getItem("currentUser");
        return !!userInfo; // Trả về true nếu đã có thông tin người dùng trong localStorage
    }

    // Hàm để lấy thông tin currentUser từ localStorage (cần điều chỉnh để phù hợp với cách lưu trữ của bạn)
    function getCurrentUserFromLocalStorage() {
        return JSON.parse(localStorage.getItem("currentUser"));
    }

    // Hàm để cập nhật thông tin currentUser lên cơ sở dữ liệu
    function updateCurrentUserInDatabase(currentUser) {
        fetch(`https://64069dc5862956433e556a26.mockapi.io/v1/users/${currentUser.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(currentUser),
        })
            .then(response => {
                if (!response.ok) {
                    return response.json().then(err => { throw err; });
                }
                return response.json();
            })
            .then(data => {
                console.log('Success:', data);
            })
            .catch(error => {
                console.error('Error updating currentUser on server:', error);
            });
    }
}

handleTourDuLich();