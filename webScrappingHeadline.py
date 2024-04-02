#import library yang dibutuhkan untuk melakukan web scrapping, seperti requests, BeatifulSoup, dan juga library lain seperti datetime dan json
import requests
from bs4 import BeautifulSoup
import datetime
import json

#membuat header untuk request agar bisa dilakukan requests, tanpa headers tidak bisa dilakukan requests
Headers = {'User-Agent': "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36 Edge/12.246"}

#mengambil url web yang akan dilakukan scrapping
URL = "https://www.republika.co.id/"

#mengambil data dari web yang akan dilakukan scrapping
page = requests.get(url=URL, headers=Headers)

#menggunakan library BeautifulSoup untuk mendapatkan data yang sudah di parse/extract
soup = BeautifulSoup(page.content, 'html.parser')

#mencari data yang akan diambil , dalam hal ini data yang akan diambil adalah data yang berada di dalam tag ul dengan class wrap-latest (terkini)
data = soup.find('ul', attrs = {'class':'wrap-latest'})

#list yang akan dijadikan tempat untuk menyimpan data yang sudah diambil
information = []

#melakukan iterasi untuk mendapatkan data yang akan diambil, dalam hal ini data yang akan diambil adalah data yang berada di dalam tag li dengan class conten1
for info in data.findAll('li', attrs={'class': 'conten1'}):
    #membuat dictionary untuk menyimpan data yang sudah diambil
    headline = {}

    #mengambil data dari tag h3 yang merupakan judul dari berita
    headline['judul'] = info.find('h3').text.strip().replace('"', '')

    #membuat sebuah field dalam dictionary bernama category dengan nilai awal string kosong
    headline['kategori'] = ''

    #mengambil data dari tag span dengan class kanal-info
    headline['kategori'] = info.find('span', class_='kanal-info').text

    #jika data yang diambil kosong (tidak ada span dengan class "kanal-info", seperti pada iklan), maka akan dilanjutkan ke data selanjutnya
    if headline['kategori'] == '':
        continue

    #mengambil data dari tag div dengan class date
    publish = info.find('div', class_='date').text.strip()

    #memecah data yang sudah diambil menjadi beberapa bagian (list), dengan pemisah spasi
    publish = publish.split(' ')

    #jika data yang sudah dipecah lebih dari 2, maka field publish akan berisi data publish tadi dari indeks pertama hingga ke 4 terakhir (yang akan berisi .... menit/detik/jam yang lalu)
    if(len(publish) > 2):
        headline['waktu_publish'] = publish[-4] + ' ' + publish[-3] + ' ' + publish[-2] + ' ' + publish[-1]

    #menambahkan data scrapping_time yang berisi kapan waktu scrapping dilakukan
    headline['waktu_scrapping'] = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    #menambahkan data yang sudah diambil ke dalam list information
    information.append(headline)

#nama file json yang nantinya akan disimpan data dari information kesana
filename = 'data_web.json'

#menyimpan data yang sudah diambil ke dalam file json
with open(filename, "w") as f:
    json.dump(information, f, indent=4)
