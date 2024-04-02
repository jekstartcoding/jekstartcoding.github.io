const mntoggle = document.querySelector('#hamburger-menu input');
const nav = document.querySelector('#navbar-item-wrapper');
const main = document.querySelector('#main-content');

mntoggle.addEventListener('click',function(){
    nav.classList.toggle('menushow');
    main.classList.toggle('darkenMain');
    mntoggle.classList.toggle('checked');
})

var featureType = 1;
//start function slideshow
function slideshow(x){
    if(x==1){
        featureType=featureType-1;
        if(featureType<1){
            featureType=5;
        }
    }else if(x==2){
        featureType=featureType+1;
        if(featureType>5){
            featureType=1;
        } 
    }

    if(featureType==1){
        document.getElementById("portfolio-slideshow").src="img/tictactoe-home.jpg";
        document.getElementById("fdesc-title").innerHTML="Main Menu";
        document.getElementById("fdesc-content").innerHTML="Pada menu ini, anda bisa melanjutkan untuk masuk dan bermain gamenya, ataupun keluar dari program";

        document.getElementById("circle-1").style.backgroundColor="white"
        document.getElementById("circle-2").style.backgroundColor="rgba(255, 255, 255, 0.2)"
        document.getElementById("circle-3").style.backgroundColor="rgba(255, 255, 255, 0.2)"
        document.getElementById("circle-4").style.backgroundColor="rgba(255, 255, 255, 0.2)"
        document.getElementById("circle-5").style.backgroundColor="rgba(255, 255, 255, 0.2)"
    }

    if(featureType==2){
        document.getElementById("portfolio-slideshow").src="img/tictactoe-dimension.jpg";
        document.getElementById("fdesc-title").innerHTML="Dimension Menu";
        document.getElementById("fdesc-content").innerHTML="Pada menu ini, anda bisa memilih opsi dimensi papan, ada 3 opsi dimensi papan";

        document.getElementById("circle-1").style.backgroundColor="rgba(255, 255, 255, 0.2)"
        document.getElementById("circle-2").style.backgroundColor="white"
        document.getElementById("circle-3").style.backgroundColor="rgba(255, 255, 255, 0.2)"
        document.getElementById("circle-4").style.backgroundColor="rgba(255, 255, 255, 0.2)"
        document.getElementById("circle-5").style.backgroundColor="rgba(255, 255, 255, 0.2)"
    }

    if(featureType==3){
        document.getElementById("portfolio-slideshow").src="img/tictactoe-modes.jpg";
        document.getElementById("fdesc-title").innerHTML="Gamemode Menu";
        document.getElementById("fdesc-content").innerHTML="Dalam menu ini, anda bisa memilih mode game, bisa human vs human ataupun human vs com";

        document.getElementById("circle-1").style.backgroundColor="rgba(255, 255, 255, 0.2)"
        document.getElementById("circle-2").style.backgroundColor="rgba(255, 255, 255, 0.2)"
        document.getElementById("circle-3").style.backgroundColor="white"
        document.getElementById("circle-4").style.backgroundColor="rgba(255, 255, 255, 0.2)"
        document.getElementById("circle-5").style.backgroundColor="rgba(255, 255, 255, 0.2)"
    }
    
    if(featureType==4){
        document.getElementById("portfolio-slideshow").src="img/tictactoe-board.jpg";
        document.getElementById("fdesc-title").innerHTML="Game Board";
        document.getElementById("fdesc-content").innerHTML="Ini adalah interface dari papan 3x3, anda bisa memainkan dengan key WASD dan spasi";

        document.getElementById("circle-1").style.backgroundColor="rgba(255, 255, 255, 0.2)"
        document.getElementById("circle-2").style.backgroundColor="rgba(255, 255, 255, 0.2)"
        document.getElementById("circle-3").style.backgroundColor="rgba(255, 255, 255, 0.2)"
        document.getElementById("circle-4").style.backgroundColor="white"
        document.getElementById("circle-5").style.backgroundColor="rgba(255, 255, 255, 0.2)"
    }

    if(featureType==5){
        document.getElementById("portfolio-slideshow").src="img/tictactoe-result.jpg";
        document.getElementById("fdesc-title").innerHTML="Game Result";
        document.getElementById("fdesc-content").innerHTML="Ini adalah interface setelah salah satu pemain berhasil menang, kalah, ataupun seri";

        document.getElementById("circle-1").style.backgroundColor="rgba(255, 255, 255, 0.2)"
        document.getElementById("circle-2").style.backgroundColor="rgba(255, 255, 255, 0.2)"
        document.getElementById("circle-3").style.backgroundColor="rgba(255, 255, 255, 0.2)"
        document.getElementById("circle-4").style.backgroundColor="rgba(255, 255, 255, 0.2)"
        document.getElementById("circle-5").style.backgroundColor="white"
    }
}
//end function slideshow


//Mengambil tabel web-scrapping-table untuk dijadikan sebagai DataTable dengan library DataTable
var table = $('#web-scrapping-table').DataTable({
    columnDefs: [
        { targets: [3], orderable: false }
    ],
    order:[]
});

//start function web scrapping table
function webScrap(){

    //Mengambil data dari file data_web.json
    fetch('data_web.json')
        //Mengubah data yang diambil dari fetch menjadi format JSON (Javascript Object Notation)
        .then(response => response.json())
        //Setelah JSON didapat dengan formatnya (hasil konversi), kemudian parameter data ini merepresentasikan data yang sudah diubah formatnya
        .then(data => {
            //Mengambil data satu per satu dari data yang sudah diubah formatnya
            data.forEach((obj, index) => {
                //Menambahkan data ke dalam tabel yang sudah dibuat sebelumnya dengan data satu per satu dari hasil fetch dan konversi tadi
                var row = table.row.add([
                    index + 1,
                    obj.judul,
                    obj.kategori,
                    obj.waktu_publish,
                    obj.waktu_scrapping
                ]).
                //Menggambar tabel yang sudah ditambahkan datanya
                draw();
            });
        })
        //Menangkap error jika terjadi error
        .catch(error => {
            console.error('Error:', error);
        });
}
//end function web scrapping table

//Menjalankan fungsi webScrap() ketika DOM sudah selesai dimuat
document.addEventListener('DOMContentLoaded', webScrap);

$('#web-scrapping-table').on('draw.dt', function() {
    $('#web-scrapping-table td').css('text-align', 'center');
  });