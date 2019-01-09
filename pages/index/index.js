//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    picUrl: "",   //当前图片路径
    current: 1,   //swiper当前current
    page: 1,      //图片页码
    numAll: 0,    //图片总数
  },
  _selData: {
    picListAll: [],  //存放所有图片
  },

  loadImg: function (index) {
    //调用数据接口
    wx.request({
      url: 'https://www.easy-mock.com/mock/5c341710ce6b9e71cf39d3a6/picList',
      success: (res) => {
        //console.log(res.data.data)
        let picArray = res.data.data; //得到图片数据
        let picListAll = [];          //存储图片数据变量

        for (let i = 0; i < picArray.length; i++) {//将图片数据存入数组
          picListAll.push(res.data.data[i].bigPath);
        }

        if (index && index != '') {//判断是否有带页码过来

          this._selData.picListAll = picListAll;  //不需要setData，提高性能

          //console.log(picListAll)
          this.setData({
            picUrl: picListAll[index],
            page: index + 1,
            numAll: picListAll.length
          })
        } else {//没有则直接渲染第一张图片
          //console.log(picListAll)
          this._selData.picListAll = picListAll;

          this.setData({
            picUrl: picListAll[0],
            page: 1,
            numAll: picListAll.length
          })
        }
      }
    })
  },

  swiperChange: function (e) {
    if (e.detail.source == 'touch') {//确保是手动切换的
      let current = e.detail.current;
      let picListAll = this._selData.picListAll;
      let page = this.data.page;  //当前页码
      console.log(current);

      if (current == 2) {//切换下一张时先判断是否是最后一张，是则始终保持当前状态
        if (this.data.page == this.data.numAll) {
          this.setData({
            current: 1
          })
        } else {
          this.setData({
            page: page + 1,
            picUrl: picListAll[page],
            current: 1
          })
        }
        console.log(this.data.picUrl);
      } else if (current == 0) {//切换上一张时先判断是否是第一张，是则始终保持当前状态
        if (this.data.page == 1) {
          this.setData({
            current: 1
          })
        } else {
          this.setData({
            page: page - 1,
            picUrl: picListAll[page - 2],
            current: 1
          })
        }
        console.log(this.data.picUrl);
      }

    }
  },
 
  onLoad: function () {
    this.loadImg(2);
  }

})
