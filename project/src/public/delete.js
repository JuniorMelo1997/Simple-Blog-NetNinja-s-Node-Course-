const deleteButton = document.querySelector("a.delete");

deleteButton.addEventListener("click", (e)=>{
    const endpoint = "/blogs/"+deleteButton.dataset.doc;

    fetch(endpoint, {method: "DELETE"}).then((result)=>{
        result.json();
    }).then((data)=>{
        window.location.href = data.redirect;
    }).catch((err)=>{
        console.log(err);
    })
})
