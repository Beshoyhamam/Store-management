let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let tbody = document.getElementById("tbody");
let mode = "create"
let tmp;

// Get Total
function getTotal() {
    if (price.value !== "" &&
        !isNaN(price.value) &&
        !isNaN(taxes.value) &&
        !isNaN(ads.value) &&
        !isNaN(discount.value))
    {
        let sum = +price.value + +taxes.value + +ads.value
        let result = sum - (sum * +discount.value / 100)
        total.innerHTML = `${result} ج.م`;
        total.style.backgroundColor = "#080";
    } else {
        total.innerHTML = 0;
        total.style.backgroundColor = "#A00D02";
    }
}

// Create Product
let dataPro;

if (localStorage.getItem("ALl-Product")) {
    dataPro = JSON.parse(localStorage.getItem("ALl-Product"))

    showData()
} else {
    dataPro = []
}

submit.addEventListener("click", () => {
    if (title.value !== ""
        && price.value !== ""
        && category.value !== ""
        && count.value <= 50) {
        let newPro = {
            title: title.value,
            price: price.value,
            taxes: taxes.value,
            ads: ads.value,
            discount: discount.value,
            category: category.value,
            total: total.innerHTML,
            count: count.value
        }        

        if (mode === "create") {
            if (newPro.count > 1) {
                for (let i = 0; i < newPro.count; i++) {
                    dataPro.push(newPro);
                } 
            } else {
                dataPro.push(newPro)
            }
        } else {
            dataPro[tmp] = newPro;
            mode = "create";
            submit.innerHTML = "انشاء";
            count.style.display = "block"
        }
    
        localStorage.setItem("ALl-Product", JSON.stringify(dataPro));
    
        clearData()
        showData()
    }
})

// Clear Inputs
function clearData() {
    title.value = "";
    price.value = "";
    taxes.value = "";
    ads.value = "";
    total.innerHTML = 0;
    total.style.backgroundColor = "#A00D02";
    count.value = "";
    category.value = "";
    discount.value = ""
}

// Read
function showData() {
    let table = "";

    for (let i = 0; i < dataPro.length; i++) {
        table += `
            <tr>
                <td>${i + 1}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].taxes}</td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].total}</td>
                <td>${dataPro[i].category}</td>
                <td><button id="update" onclick="updateData(${i})">تعديل</button></td>
                <td><button id="delete" onclick="deleteProduct(${i})">حذف</button></td>
            </tr>
        `
    }

    tbody.innerHTML = table;

    let delAll = document.getElementById("delAll")

    if (tbody.innerHTML !== "") {
        delAll.innerHTML = `<button onclick="delAll()">حذف الكل (${dataPro.length})</button>`
    } else {
        delAll.innerHTML = ""
    }
}

// Delete Product //////////////
function deleteProduct(el) {
    dataPro.splice(el, 1)    
    localStorage.setItem("ALl-Product", JSON.stringify(dataPro));
    showData()
    if (tbody.innerHTML === "") {
        localStorage.clear();
    }
}

// Delete All
function delAll() {
    dataPro.splice(0);
    localStorage.clear();
    showData()
}

// Update
function updateData(ele) {
    title.value = dataPro[ele].title
    price.value = dataPro[ele].price
    taxes.value = dataPro[ele].taxes
    ads.value = dataPro[ele].ads
    discount.value = dataPro[ele].discount
    category.value = dataPro[ele].category
    count.style.display = "none"

    scrollTo({
        top: 0,
        behavior: "smooth",
    });

    getTotal()

    submit.innerHTML = "تعديل"
    mode = "update"
    tmp = ele;
}

// Search
let modeSearch = "title"

function getSearchMode(id) {
    let search = document.getElementById("search")

    if (id == "searchTitle") {
        modeSearch = "title"
        search.placeholder = `البحث باسم المنتج`

    } else {
        modeSearch = "category"
        search.placeholder = `البحث بنوع المنتج`
    }
    
    search.value = "";
    showData()
}

function searchData(value) {
    let table = ""
    for (let i = 0; i < dataPro.length; i++) { 
        if (modeSearch == "title") {
            if (dataPro[i].title.toLowerCase().includes(value.toLowerCase())) {
                table += `
                    <tr>
                        <td>${i + 1}</td>
                        <td>${dataPro[i].title}</td>
                        <td>${dataPro[i].price}</td>
                        <td>${dataPro[i].taxes}</td>
                        <td>${dataPro[i].ads}</td>
                        <td>${dataPro[i].discount}</td>
                        <td>${dataPro[i].total}</td>
                        <td>${dataPro[i].category}</td>
                        <td><button id="update" onclick="updateData(${i})">تعديل</button></td>
                        <td><button id="delete" onclick="deleteProduct(${i})">حذف</button></td>
                    </tr>
                `
            }
        } else {
            if (dataPro[i].category.toLowerCase().includes(value.toLowerCase())) {
                table += `
                    <tr>
                        <td>${i + 1}</td>
                        <td>${dataPro[i].title}</td>
                        <td>${dataPro[i].price}</td>
                        <td>${dataPro[i].taxes}</td>
                        <td>${dataPro[i].ads}</td>
                        <td>${dataPro[i].discount}</td>
                        <td>${dataPro[i].total}</td>
                        <td>${dataPro[i].category}</td>
                        <td><button id="update" onclick="updateData(${i})">تعديل</button></td>
                        <td><button id="delete" onclick="deleteProduct(${i})">حذف</button></td>
                    </tr>
                `
            }
        }
    }
    
    tbody.innerHTML = table;
}
