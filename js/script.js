var productName = document.getElementById("productName");
var productPrice = document.getElementById("productPrice");
var productModel = document.getElementById("productModel");
var productDesc = document.getElementById("productDesc");
var productList;
var addProdBtn = document.getElementById("addProdBtn");
var updateProdBtn = document.getElementById("updateProdBtn");

var productListName = "productList";

if (localStorage.getItem(productListName) == null) {
  productList = [];
} else {
  productList = JSON.parse(localStorage.getItem(productListName));
  console.log(productList);
  displayProduct(productList);
}

function addProduct() {
  if (
    validateProductName() &&
    validateProductPrice() &&
    validateProductModel() &&
    validateProductDesc()
  ) {
    var product = {
      name: productName.value,
      price: productPrice.value,
      model: productModel.value,
      description: productDesc.value,
    };
    // console.log(product);
    productList.push(product);
    localStorage.setItem(productListName, JSON.stringify(productList));

    displayProduct(productList);
    // updateFormValues();

    // clearForm();
    console.log(productList);
  } else {
    // alert("Not Valid Product Name");
  }
}

function clearForm() {
  productName.value = "";
  productPrice.value = "";
  productModel.value = "";
  productDesc.value = "";
}
function deleteProduct(index) {
  console.log(productList);

  productList.splice(index, 1);

  console.log(productList);
  localStorage.setItem(productListName, JSON.stringify(productList));

  displayProduct(productList);
}

function searchByName(term) {
  var foundedItems = [];
  for (let i = 0; i < productList.length; i++) {
    // console.log(productList[i].name.toLowerCase().includes("t"));
    if (productList[i].name.toLowerCase().includes(term.toLowerCase())) {
      console.log(i);
      productList[i].newName = productList[i].name
        .toLowerCase()
        .replace(
          term.toLowerCase(),
          `<span class="text-danger">${term}</span>`
        );

      foundedItems.push(productList[i]);
    }
  }
  displayProduct(foundedItems);
}

function displayProduct(products) {
  var cartona = ``;
  for (var i = 0; i < products.length; i++) {
    console.log(products[i]);
    cartona += `<tr class="align-bottom">
        <td>${i + 1}</td>
        <td>${products[i].newName ? products[i].newName : products[i].name}</td>
        <td>${products[i].price}</td>
        <td>${products[i].model}</td>
        <td id="desc">${products[i].description}</td>
        <td> <button class="btn btn-warning btn-sm" onclick="updateValue(${i})"> Update </button></td>
        <td> <button onclick="deleteProduct(${i})" class="btn btn-danger btn-sm"> Delete </button></td>
    </tr>`;
  }

  document.getElementById("tBody").innerHTML = cartona;
}

function productModelList() {
  let listOFModels = ``;
  let List = ["", "TV", "Mobile", "Labtop"];
  for (let i = 0; i < List.length; i++) {
    if (List[i] !== "") {
      listOFModels += `
      <option value="${List[i]}" >${
        List[i] != "" ? List[i] : "Choose Model"
      }</option>
      
      `;
    } else {
      listOFModels += `<option value="${List[i]}" disabled selected> Choose Model</option> `;
    }
  }

  document.getElementById("productModel").innerHTML = listOFModels;
}
productModelList();

function updateValue(index) {
  console.log(index);

  addProdBtn.classList.add("d-none");
  // updateProdBtn.classList.replace("d-none","d-block");
  updateFormValues(productList[index], index);
  console.log(productList[index]);

  updateProdBtn.classList.remove("d-none");

  // productName.value = productList[index].name;
  // productPrice.value = productList[index].price;
  // productModel.value = productList[index].model;
  // productDesc.value = productList[index].description;
}

function updateFormValues(flag, i) {
  productName.value = flag ? flag.name : "";
  productPrice.value = flag ? flag.price : "";
  productModel.value = flag ? flag.model : "";
  productDesc.value = flag ? flag.description : "";
  // productList.replace(i);

  localStorage.setItem("index", i);
}
function updateProduct() {
  addProdBtn.classList.remove("d-none");
  let index = +localStorage.getItem("index");

  var Newproduct = {
    name: productName.value,
    price: productPrice.value,
    model: productModel.value,
    description: productDesc.value,
  };
  console.log(Newproduct);
  productList[index] = Newproduct;
  localStorage.setItem(productListName, JSON.stringify(productList));
  displayProduct(productList);
  clearForm();
  updateProdBtn.classList.add("d-none");
}

//*  Validation methods for the inputs //

function validateProductName() {
  let regex = /^[A-Z][a-z A-z]{3,8}$/;
  // to write in the middle capital or small
  if (regex.test(productName.value) === true) {
    productName.style.border = "none";
    document.getElementById("wrongName").classList.add("d-none");

    return true;
  } else {
    productName.style.border = "3px solid red";
    document.getElementById("wrongName").classList.remove("d-none");
    return false;
  }
}

// TODO price 1000-10000
function validateProductPrice() {
  let regex = /^([1-9][0-9]{3}|10000)$/;
  // to write in the middle capital or small
  if (regex.test(productPrice.value) === true) {
    productPrice.style.border = "none";
    document.getElementById("wrongPrice").classList.add("d-none");

    return true;
  } else {
    productPrice.style.border = "3px solid red";
    document.getElementById("wrongPrice").classList.remove("d-none");
    return false;
  }
}

// TODO model tv|mobile|labtop

function validateProductModel() {
  if (productModel.value != "") {
    productModel.style.border = "none";
    document.getElementById("wrongModel").classList.add("d-none");
    return true;
  } else {
    productModel.style.border = "3px solid red";
    document.getElementById("wrongModel").classList.remove("d-none");
    return false;
  }
}

// TODO desc  min(250 char)

function validateProductDesc() {
  let regex = /^.{250,}/m;
  // to write in the middle capital or small
  if (regex.test(productDesc.value) === true) {
    productDesc.style.border = "none";
    document.getElementById("wrongDesc").classList.add("d-none");

    return true;
  } else {
    productDesc.style.border = "3px solid red";
    document.getElementById("wrongDesc").classList.remove("d-none");
    return false;
  }
}

// searchByName();
