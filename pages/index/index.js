//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    picUrl: "",
    current: 1,
    page: 1,
    numAll: 0,
  },
  _selData: {
    picListAll: [],  //存放所有图片
  },

  loadImg: function (index) {
    wx.request({
      url: 'https://www.easy-mock.com/mock/5c341710ce6b9e71cf39d3a6/picList',
      success: (res) => {
        //console.log(res.data.data)
        let picArray = res.data.data;
        let picListAll = [];

        for (let i = 0; i < picArray.length; i++) {
          picListAll.push(res.data.data[i].bigPath);
        }

        if (index && index != '') {

          this._selData.picListAll = picListAll;

          //console.log(picListAll)
          this.setData({
            picUrl: picListAll[index],
            page: index + 1,
            numAll: picListAll.length
          })
        } else {
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
      let page = this.data.page;
      console.log(current);

      if (current == 2) {
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
      } else if (current == 0) {
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
