//Định nghĩa các biến của chương trình
let header = document.getElementById("header");
let content = document.getElementById("content");
let sublist = document.querySelector(".navbar-item__sublist");
let cartAmount = document.querySelectorAll(".cart-box .status");
const contentMain = document.querySelector(".content-main .row");
//Xử lý kiểm tra đăng nhập
let currentUser = JSON.parse(localStorage.getItem('currentUser'));

//Kiểm tra giá trị nhập vào có phải email hay không
const validateEmail = (email) => {
    return email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

//Margin cho thằng header
function marginHeader() {
    /* 
        Kiểm tra nếu màn hình lớn hơn hoặc bằng 1024px thì sẽ margin cho thằng header 
        nếu nhỏ hơn thì cho thằng header mobile
    */
    if (window.innerWidth >= 1024) {
        //Margin top cho phần content
        if (sublist.clientHeight > window.innerHeight - header.clientHeight) {
            sublist.style.overflow = "scroll";
        }
        sublist.style.maxHeight = `calc((100vh) - ${header.clientHeight}px)`;
        content.style.marginTop = `${header.clientHeight}px`;
    } else {
        //Margin top cho phần content
        let headerMobile = document.getElementById("header-mobile");
        if (
            sublist.clientHeight >
            window.innerHeight - headerMobile.clientHeight
        ) {
            sublist.style.overflow = "scroll";
        }
        sublist.style.maxHeight = `calc((100vh) - ${headerMobile.clientHeight}px)`;
        content.style.marginTop = `${headerMobile.clientHeight}px`;
    }
}

function updateStatusCart() {
    //Set số lượng hàng trong cart cho thằng status
    currentUser = JSON.parse(localStorage.getItem('currentUser'));
    cartAmount.forEach((e) => {
        e.innerHTML = currentUser ? currentUser.cartItems.length : 0;
    });
}

async function load() {
    let searchInput = document.querySelector(".search-input");
    //Định nghĩa biết chứa thông tin link database từ server
    const dataUrl =
        "https://64069dc5862956433e556a26.mockapi.io/v1/diaDiemDuLich";
    //Lấy dữ liệu từ server
    const response = await fetch(dataUrl);
    //Chuyển từ json sang object
    const jsonData = await response.json();

    // Update header-mobile
    const mobileAccountBox = document.getElementById('header-mobile').querySelector('.account-box');
    const mobileAccountTool = mobileAccountBox.querySelector('.account-tool');
    const mobileUserInfoBox = mobileAccountBox.querySelector('.user-info-box');

    // Update header
    const desktopAccountBox = document.getElementById('header').querySelector('.account-box');
    const desktopAccountTool = desktopAccountBox.querySelector('.account-tool');
    const desktopUserInfoBox = desktopAccountBox.querySelector('.user-info-box');

    if (currentUser) {
        // Hide account-tool
        mobileAccountTool.style.display = 'none';
        desktopAccountTool.style.display = 'none';
        desktopAccountBox.querySelector('.user-span-header').style.display = 'none';

        // Show user info
        mobileUserInfoBox.style.display = 'flex';
        desktopUserInfoBox.style.display = 'flex';
        mobileUserInfoBox.querySelector('.user-name').textContent = `${currentUser.firstName} ${currentUser.lastName}`;
        desktopUserInfoBox.querySelector('.user-name').textContent = `${currentUser.firstName} ${currentUser.lastName}`;

        // Logout function
        const logoutLinks = document.querySelectorAll('.user-info-box #logout');
        logoutLinks.forEach(link => {
            link.addEventListener('click', function (event) {
                event.preventDefault();
                localStorage.removeItem('currentUser');
                window.location.reload();
            });
        });
    } else {
        // Show account-tool and hide user info if not logged in
        mobileAccountTool.style.display = 'block';
        desktopAccountTool.style.display = 'block';
        mobileUserInfoBox.style.display = 'none';
        desktopUserInfoBox.style.display = 'none';
        desktopAccountBox.querySelector('.user-span-header').style.display = 'block';
    }

    updateStatusCart();

    //Margin thằng body bằng với thằng header
    marginHeader();

    //Khi lăn chuột lớn hơn so với header thì sẽ cho thằng header dính lên màn hình
    window.onscroll = function () {
        if (window.scrollY > header.clientHeight) {
            header.style.position = "fixed";
        } else {
            header.style.position = "absolute";
        }
    };

    //Khi vừa load thì sẽ nhảy lên trên đầu
    document.body.scrollTop = 0;

    //render tourDuLich
    async function loadDataMainContent(dataMain) {
        let innerHtmlMainContent = "";
        if (dataMain.length != 0) {
            //Lặp qua từng từng trong database
            dataMain.forEach((element, index) => {
                //Tách dữ liệu ngày tháng năm
                let date = element.ngayXuatPhat.split("-");
                let day = date[2];
                let month = date[1];
                let year = date[0];
                if (element.giaCu != 0) {
                    //Ghép dữ liệu và html lại với nhau
                    innerHtmlMainContent += `
                <div class="col l-3 m-6 s-12 center-mobile tour-item">
                    <div class="widget">
                        <div style="background: url(${element.imgsTour[0]})
                        no-repeat center/cover;" class="widget__photo"></div>
                        <div data-idx=${index} onclick="handleItemTravel(${index})" class="widget__button">Đặt vé</div>
                        <div class="widget__details">
                            <div class="widget__name">
                                ${element.diaDiem}
                            </div>
                            <div class="widget__vehicle">${element.phuongTien
                        }</div>
                            <div class="widget__info">
                                <div class="center">
                                    <span> khởi hành lúc: </span>
                                    <span class="widget__info-time">
                                        Ngày ${day} tháng ${month} năm ${year}
                                    </span>
                                    </div>
                                    <div class="center">
                                    <span>Thời gian:</span>
                                    <span class="widget__info-date">
                                        ${element.soNgay} ngày
                                    </span>
                                </div>
                                <div class="center">
                                    <span class="widget__info-date">
                                        ${element.giaVe} vnđ
                                    </span>
                                </div>
                                <div class="center">
                                    <span
                                        class="widget__info-price--old"
                                    >
                                        ${element.giaCu != 0
                            ? element.giaCu
                            : ""
                        } vnđ
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`;
                }
            });
        } else {
            innerHtmlMainContent += `
                <h1 class="not-found-item">Không tìm thấy dữ liệu</h1>
            `
        }
        //Render dữ liệu html khi nãy vừa có được
        contentMain.innerHTML = innerHtmlMainContent;

        // close mobile menu
        document.querySelectorAll(".nav-link").forEach((n) =>
            n.addEventListener("click", () => {
                hamburger.classList.remove("active");
                navMenu.classList.remove("active");
            })
        );
    }

    //Load dữ liệu của thằng tour du lịch
    if (contentMain) {
        loadDataMainContent(jsonData);
    }

    //Responsive header
    const hamburger = document.querySelector("#header-mobile .hamburger");
    const navMenu = document.querySelector("#header-mobile .nav-menu");

    hamburger.addEventListener("click", () => {
        /* Toggle active class */
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");

        /* Toggle thay đổi giá trị menu có mở hoặc không mở */
        let menuOpen = navMenu.classList.contains("active");
        let newMenuOpenStatus = menuOpen;
        hamburger.setAttribute("aria-expanded", newMenuOpenStatus);
    });

    //Khi kích thước cửa sổ thay đổi thì thay đổi margin của thằng header
    window.onresize = () => {
        marginHeader();
    };


    //Xử lý tìm kiếm
    let searchBtn = document.querySelector(".search-btn");
    let foundArray = []

    searchInput.oninput = (e) => {
        foundArray = [];
        if (searchInput.value === "") {
            foundArray = jsonData;
        } else {
            jsonData.forEach((item) => {
                if (item.diaDiem.search(e.target.value) != -1 && searchInput.value != "") {
                    foundArray.push(item);
                }
            })
        }
    }

    searchInput.onkeypress = (e) => {
        if (e.keyCode === 13) {
            e.preventDefault();
            loadDataMainContent(foundArray);
        }
    }

    searchBtn.onclick = () => {
        loadDataMainContent(foundArray);
    }
}

//Khi cửa sổ được load thì chạy chương trình
window.onload = () => {
    load();
};
