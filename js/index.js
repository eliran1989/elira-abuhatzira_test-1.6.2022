
let images;


const fetchData = async (type) =>{
    
    //const response = await fetch(`/api/${type}.json`);
    const response = await fetch(`/api/${type}`);


    if(response.status!==200){
        document.body.innerHTML +=`<div class="errorMsg"><div>Can't get ${(type==="photos") ? "images" :type} data</div></div>`;
        throw Error(response.statusText);

    }



    const data = await response.json();
    return data;

}




const openModalhandler = (e) =>{

    const modalWrap = document.createElement('div');
    const modal = document.createElement('div');
    const close = document.createElement('div');
    
    modalWrap.className ='modal_wrap';
    modal.className ='modal';
    close.className ='close_button';

    close.innerHTML = `<i class="fa-solid fa-xmark"></i>`;

    modalWrap.addEventListener("click" , (e)=>{
        if(e.target.className == "modal_wrap" || e.target.className == "fa-solid fa-xmark"){
            document.body.style.overflow = "inherit";
            modalWrap.remove();
            clearInterval(Carousel.interval)
        
        }
    })


    modalWrap.appendChild(close);
    modalWrap.appendChild(modal);


    document.body.appendChild(modalWrap);


    if(e.target.className=="carousel_button"){
        Carousel.initCarousel(e.target.closest('.album').id);
     }
    if(e.target.className=="gallery_button"){
        
        document.body.style.overflow = "hidden";

        Gallery.initGallery(e.target.closest('.album').id);
     }


}



function User(id , name , userName , email ){
    this.id = id
    this.name = name;
    this.userName = userName;
    this.email = email;
}

 function Album(userId , id , title){
    this.userId = userId
    this.id = id;
    this.title = title ;
 }


 


        fetchData("users").then((usersData) => {

            let users = [];

                usersData.map((user)=>{
                    users.push(new User(user.id , user.name , user.username , user.email)) 
                })



            fetchData("albums").then((albumsData) => {
                users.map((user)=>{
                    user.albums = albumsData.
                    filter((album) => album.userId === user.id ).
                    map((album) => new Album(album.userId , album.id , album.title));
            })




            users.map((user)=>{

                const  newNode = document.createElement('div');
                newNode.className = 'user';
    
                newNode.innerHTML = `
                        <div class='name'>${user.name}</div>
                        <div class='albums'>
                            ${user.albums.map((album)=>{
                                return `<div class='album' id='${album.id}'>
                                            <div class='album_buttons'>
                                                <div class='gallery_button'>Gallery</div>
                                                <div class='carousel_button'>Carousel</div>
                                            </div>
                                        </div>` 
                                }).join("")}
                            </div>
                        </div>
                `;
    
                document.getElementsByClassName('container')[0].appendChild(newNode);



                Array.from( document.querySelectorAll('.album_buttons > div')).forEach((button)=>{
        
                    button.addEventListener("click" , openModalhandler)
                    
                })

    
            })



        })




        images = fetchData("photos").then((images)=>{


    
            const albumsNodes =  document.getElementsByClassName("album");

            Array.from(albumsNodes).forEach((el) => {

                const image = images.find((image)=>image.albumId==el.id);
                const imageNode = document.createElement('img');
                const titleNode = document.createElement('div');

                titleNode.textContent = image.title;
                titleNode.className = 'title';

                imageNode.src = image.thumbnailUrl;
                imageNode.title = image.title;


                albumsNodes[el.id-1].appendChild(imageNode);
                albumsNodes[el.id-1].appendChild(titleNode);

            });

            return images;
        })



});



