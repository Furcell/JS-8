"use strict";

let divusers = document.getElementById("api-users");
let btnLoad = document.getElementById("loadmore");
let btnprev = document.getElementById("loadprev");
let currentPage = 1;
let ulList = document.getElementById("list-users-ul");
let totalPages;

function getUsers(page) {
  fetch("https://reqres.in/api/users?page=" + page, {
    method: "GET",
  })
    .then(function (response) {
      if (!response.ok) {
        throw response.status;
      }

      return response.json();
    })
    .then(function (mosuliInfoJs) {
      console.log(mosuliInfoJs);

      const fragment = document.createDocumentFragment();

      mosuliInfoJs.data.forEach((element) => {
        let li = document.createElement("li");
        let img = document.createElement("img");
        img.setAttribute("src", `${element.avatar}`);
        li.innerText = `${element.first_name} ${element.last_name}`;


        fragment.appendChild(li);
        fragment.appendChild(img);
      });

      ulList.innerHTML = " ";
      ulList.appendChild(fragment);

    //   totalPages = mosuliInfoJs.total_pages;
    disabled()
    })
    .catch(function (error) {
      if (error === 404) {
        let p = document.createElement("p");
        p.textContent = "Page Not Found";
        divusers.appendChild(p);
      }
    });
}

btnprev.addEventListener("click", function () {
    currentPage -= 1;
    getUsers(currentPage);
});

btnLoad.addEventListener("click", function () {
    currentPage += 1;
    getUsers(currentPage);
});
getUsers(currentPage);

function disabled(){
    if (currentPage==1){
        btnprev.disabled=true
    }else if(currentPage>1){
        btnprev.disabled=false
    }

    if(currentPage==2){
        btnLoad.disabled=true
    }else if (currentPage < 2){
        btnLoad.disabled=false       
    }
}