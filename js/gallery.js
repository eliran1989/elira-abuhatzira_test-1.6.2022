const Gallery = {
    initGallery:async function(albumId){
        this.albumImages = (await images).filter((image)=>image.albumId==albumId);

        const modalNode = document.querySelector(".modal");

        modalNode.className += " gallery";

        this.albumImages.forEach(image => {

            const imageWrapNode = document.createElement("div");
            const imageNode = document.createElement("img");
            imageWrapNode.className = "image";
            imageNode.src = image.url;


            imageWrapNode.innerHTML = `<div class="resize"><i class="fa-solid fa-magnifying-glass-plus"></i></div>`;

            imageWrapNode.addEventListener("click" , ()=>this.clickImageHandler(image.url));

            imageWrapNode.appendChild(imageNode);

             modalNode.appendChild(imageWrapNode);




        })

   

    },
    albumImages:[],
    clickImageHandler:function(url){


        const imageWrapNode = document.createElement("div");
        const imageNode = document.createElement("img");
        imageWrapNode.className = "big_image";


        imageWrapNode.innerHTML = `<i class="fa-solid fa-xmark"></i>`;

        imageWrapNode.addEventListener("click" , (e)=>{
            if(e.target.nodeName !== "IMG"){
                e.target.closest(".big_image").remove();
            }

        })

        imageNode.src = url;


        imageWrapNode.appendChild(imageNode);

        document.body.appendChild(imageWrapNode);



    }
}