$(function(){
    // json data
    fetch('./assets/js/data.json')
    .then(res=>res.json())

    // 카테고리 선택
    .then(json=>{
      data = json.items;
      sortData = data.filter(function(item){
        return item.catagory.indexOf("스킨케어") >= 0;
    })

    // 상품 리스트 출력
    let skin = ``;
    let rank = 1;
            sortData.forEach(element => {
                skin+=`<li class="swiper-slide">
                <a href="#none">
                    <div class="img-area">
                        <em class="ranking">${rank}<span class="blind">랭킹</span></em>
                        <div class="img-box"><img src=${element.url} alt=""></div>
                    </div>
                    <div class="flex-area">
                        <div class="desc-box">
                            <h3 class="title">${element.brand}</h3>
                            <p class="desc">${element.name}</p>
                        </div>
                        <div class="price-box">
                            <div class="sale-group">
                                <em class="sale">${element.rate}<i>${element.cost_usd}</i></em>
                                <strong class="price">${element.price_usd}<i>${element.price_krw}</i></strong>
                            </div>
                        </div>
                    </div>
                </a>
            </li>`;
            rank++;
            });
            // 출력될 리스트 기준
            $('.sc-popul .list-swiper.skin .swiper-wrapper').html(skin)
    });
}) //end