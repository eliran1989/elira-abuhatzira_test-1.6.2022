
const Carousel = { 
    initCarousel:async function(albumId){
        this.currentIndex = 0;
        this.position = 0;
        this.albumImages = (await images).filter((image)=>image.albumId==albumId);

       const imagesNode = document.createElement("div");
       const imagesWrap = document.createElement("div");



        const nextArrowNode = document.createElement("i");
        nextArrowNode.className ='fa-solid fa-chevron-right';
        nextArrowNode.addEventListener("click" , ()=>this.changeImage("next"))
        const prevArrowNode = document.createElement("i");
        prevArrowNode.className ='fa-solid fa-chevron-left';
        prevArrowNode.addEventListener("click" , ()=>this.changeImage("prev"))
        

    
       imagesNode.className = "images";
       imagesWrap.className = "wrap_images";


       const modalNode = document.querySelector(".modal");
       modalNode.className+=' carousel';

      


       this.albumImages.forEach(image => {
            const imageNode = document.createElement("img");
            imageNode.src = image.url;
            imageNode.title = image.title;
            imagesNode.appendChild(imageNode);
       });


       imagesWrap.appendChild(imagesNode);

       modalNode.append(imagesWrap , nextArrowNode ,prevArrowNode)

       this.width = modalNode.offsetWidth;

    
       this.imagesNode = imagesNode;





       this.start();

    },
    start:function(){

        this.interval = setInterval(() => {
            this.changeImage("next")
        }, 4000);
        
    },
    changeImage:function(direction ){
    
        if(direction=="next"){

            if(this.currentIndex==(this.albumImages.length-1)){
                this.position = 0;
                this.currentIndex = 0;
            }else{
                this.position -= this.width;
                this.currentIndex++;
            }

        }else{

            if(this.currentIndex==0){
                this.position = -this.width*(this.albumImages.length-1);
                this.currentIndex = (this.albumImages.length-1);
            }else{
                this.position += this.width;
                this.currentIndex--;
            }
        }
        
        this.imagesNode.style.left = this.position+"px"

       

        clearInterval(this.interval);

        this.start();


    },
    imagesNode:null,
    albumImages:[],
    position:0,
    width:0,
    currentIndex:0,
}






