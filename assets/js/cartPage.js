const cartContainer = document.querySelector(".cart-container .cart-box");
const payMoneyNow = document.querySelector(".pay-money-now");
const payMoney = document.querySelector(".pay-money");
let money = 0;
let cartDeleteBtn;

// Hàm để lấy thông tin tài khoản từ localStorage
function getUserInfo() {
    const userInfo = localStorage.getItem("currentUser");
    if (userInfo) {
        return JSON.parse(userInfo);
    }
    return null;
}

// Hàm khởi tạo hoặc cập nhật cartItems sau khi người dùng đăng nhập
function initCartItems() {
    const user = getUserInfo();
    if (user && user.cartItems) {
        renderCart();
    } else {
        cartContainer.innerHTML = `
        <div class="no-cart__img"></div>
        <div class="cart-box__bottom">
            <a href="./tourDuLich.html" class="cart-back">Tiếp tục chọn tour</a>
        </div>`;
    }
}

// Hàm renderCart để hiển thị giỏ hàng
function renderCart() {
    let currentUser = getUserInfo();
    if (currentUser.cartItems.length > 0) {
        let cartInnerHTML = "";
        money = 0;
        currentUser.cartItems.forEach((element, index) => {
            money += Number(element.giaVe);
            cartInnerHTML += `
            <div class="cart-item">
                <img
                    src="${element.imgsTour[2]}"
                    alt="hinh anh"
                    class="cart-item__img"
                />
                <div class="cart-item__info">
                    <span class="cart-item__name">${element.diaDiem}</span>
                    <p class="cart-item__desc">
                        Ngày đi:
                        <span class="cart-item__info-date">${element.ngayXuatPhat}</span>
                    </p>
                    <span data-cart=${index} class="cart-delete">Xóa</span>
                </div>
                <div class="cart__box-price">
                    <span class="cart__box-price-span"
                        >${Number(element.giaVe).toLocaleString("en-US")} vnd</span
                    >
                </div>
            </div>
            `;
        });
        cartContainer.innerHTML = cartInnerHTML;
        cartDeleteBtn = document.querySelectorAll(".cart-delete");
        cartDeleteBtn.forEach((e) => {
            e.onclick = () => {
                let idx = Number(e.dataset.cart);
                currentUser.cartItems.splice(idx, 1);
                console.log(currentUser.cartItems);
                localStorage.setItem("currentUser", JSON.stringify(currentUser));
                updateStatusCart(); // Cập nhật trạng thái giỏ hàng
                e.closest(".cart-item").remove();
                updateCurrentUserInDatabase(currentUser); // Cập nhật lại thông tin currentUser lên cơ sở dữ liệu
                renderCart(); // Render lại giỏ hàng sau khi xóa
            };
        });
    } else {
        cartContainer.innerHTML = `
        <div class="no-cart__img"></div>
        <div class="cart-box__bottom">
            <a href="./tourDuLich.html" class="cart-back">Tiếp tục chọn tour</a>
        </div>`;
    }

    // Cập nhật tổng tiền
    if (currentUser.cartItems.length <= 0) {
        money = 0;
    }
    payMoneyNow.innerHTML = money.toLocaleString("en-US").toString() + "₫";
    payMoney.innerHTML = money.toLocaleString("en-US").toString() + "₫";
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
            localStorage.setItem("currentUser", JSON.stringify(currentUser)); // Cập nhật lại localStorage
        })
        .catch(error => {
            console.error('Error updating currentUser on server:', error);
        });
}

// Gọi hàm initCartItems để khởi tạo cartItems từ localStorage
initCartItems();
