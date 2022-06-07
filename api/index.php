<?php 


    function get_data($type){
        if(!file_exists($type.".json")){
            $ch = curl_init();
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
            curl_setopt($ch, CURLOPT_URL, "https://jsonplaceholder.typicode.com/".$type);
            $data = curl_exec($ch);
            $dataFile  = fopen($type.".json", "w");


 
            if($type=="photos"){
                $data = replace_to_real_images($data);
            }
    
    
            fwrite($dataFile,$data);
            fclose($dataFile);


            curl_close($ch);
        }else{
            $dataFile = fopen($type.".json", "r") or die("Unable to open file!");
            $data = fread($dataFile,filesize($type.".json"));
            fclose($dataFile);
        }




    
        return $data;
    }


    //Limited images to 10 images per album to make sure that have real image (in https://picsum.photos/) for image id
    function replace_to_real_images($images){


        $images = json_decode($images);
        $countImages = 0;
        $countNewImage = 1;
        $newImages = array();
        

          
            foreach ($images as  $key => $image) {
                    
                    if($key==0 || $image->albumId!==$images[$key-1]->albumId){
                        
                        for ($i = $countImages; $i < ($countImages+10); $i++) {
                            $images[$i]->id = $countNewImage;
                            $images[$i]->url = 'https://picsum.photos/id/'.$images[$i]->id.'/800/600';
                            $images[$i]->thumbnailUrl = 'https://picsum.photos/id/'.$images[$i]->id.'/180/230';

                            $newImages[] = $images[$i];

                            $countNewImage++;
                        }
                    }

                    $countImages++;
            }
                

        
        return json_encode($newImages);

    }





   



    $request = str_replace("/api" , "" ,$_SERVER['REQUEST_URI']);

    switch ($request) {
        case '/users' :
            echo get_data("users");
            break;
        case '/albums' :
            echo get_data("albums");
            break;
        case '/photos' :
            echo get_data("photos");
            break;
        default:
            http_response_code(404);
            break;
    }


    




