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
    let searchInput = document.querySelector(".search-input");
    let searchBtn = document.querySelector(".search-btn");

    searchBtn.onclick = () => {
        if (searchInput.value !== "") {
            localStorage.setItem("searchKeyword", searchInput.value);
        }
        window.location.href = "/assets/pages/tourDuLich.html"; // Chuyển hướng đến trang tourDuLich.html
    }

    searchInput.onkeypress = (e) => {
        if (e.keyCode === 13) {
            if(searchInput.value !== "") {
                e.preventDefault();
                localStorage.setItem("searchKeyword", searchInput.value);
            }
            window.location.href = "/assets/pages/tourDuLich.html"; // Chuyển hướng đến trang tourDuLich.html
        }
    }
}

//Khi cửa sổ được load thì chạy chương trình
window.onload = () => {
    load();
};
