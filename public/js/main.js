// function called by delete button

function deleteProduct(id){
    let result = confirm('Are you sure you want to delete the product');

    if(result){
        fetch('/delete-product/'+id ,
        {method : 'POST'}).then(res=>{
            if(res.ok){
                location.reload();
            }
        });

    }
}