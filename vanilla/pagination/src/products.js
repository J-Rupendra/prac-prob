let products = []
const PAGE_SIZE = 10;
let selectedPage = null
const productContainerEle = document.querySelector('.products-container')

async function fetchProducts(){
    const loadingEle = document.createElement('h1')
    loadingEle.textContent = "Loading..."
    productContainerEle.appendChild(loadingEle);
    const response = await fetch("https://dummyjson.com/products?limit=500");
    const jsonData = await response.json();
    products = jsonData.products;
}

function populateProducts(products){
    const productFragment = document.createDocumentFragment()
    products.forEach(element => {
        productFragment.appendChild(createProductCard(element))
    });
    productContainerEle.replaceChildren(productFragment)
}

function createProductCard(item){
    const productEle = document.createElement('div');
    productEle.classList.add('product-card')
    const productImgEle = document.createElement('img');
    productImgEle.classList.add('product-image')
    productImgEle.setAttribute('src',item.thumbnail)
    const productTitleEle = document.createElement('span');
    productTitleEle.textContent = item.title
    productTitleEle.classList.add('product-title')
    productEle.appendChild(productImgEle)
    productEle.appendChild(productTitleEle)
    return productEle
}

function createPaginationElements(){
    const totalPages = Math.ceil(products.length/PAGE_SIZE)
    const pageNumberFragment = document.createDocumentFragment()
    Array.from({length:totalPages},(v,ind)=>{
        const pageNumberEle = document.createElement('span')
        pageNumberEle.classList.add('page-number')
        pageNumberEle.textContent = ind+1;
        
        return pageNumberEle
    }).forEach(element=>{
        pageNumberFragment.appendChild(element)
    })
    
    document.querySelector('.pagination-container').appendChild(pageNumberFragment)
}

function handlePageSelection(target){
    if(target.classList.contains("page-number")){
        const pageNumber = parseInt(target.textContent)-1
        console.log(pageNumber);
        
        const start = pageNumber*PAGE_SIZE
        const end = start + PAGE_SIZE
        if(selectedPage){
            selectedPage.classList.remove('selected')
        }
        target.classList.add('selected')
        selectedPage = target
        populateProducts(products.slice(start,end))
    }

}

function handleNoProducts(){
    const noProdFoundEle = document.createElement('h1');
    noProdFoundEle.textContent = "No Products Found"
    productContainerEle.replaceChildren(noProdFoundEle)
}


fetchProducts().then(data=>{
    createPaginationElements()
    handlePageSelection(document.querySelector('.pagination-container').firstChild)
}).catch(err=>{
    handleNoProducts()
})
