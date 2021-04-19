<template>
  <div>
    <div>
      <!-- <header class="banner">
      <img
        src="static/img/bilibili-banner.png"
        alt=""
      />
    </header> -->

      <el-input
        v-model="input"
        style="width: 200px"
        placeholder="请输入关键字"
      ></el-input>
      <el-button
        icon="el-icon-search"
        circle
        @click="searchVideoAndJump(1, 6)"
      ></el-button>

      <el-button type="primary" @click="upload"
        >上传<i class="el-icon-upload el-icon--right"></i
      ></el-button>
    </div>

    <br />
    <br />
    <br />
    <br />
    <el-row id="videoContainer" :gutter="100"> </el-row>
    <div class="block" style="float: right; margin-top: 15px">
      <el-pagination
        layout="prev, pager, next"
        :page-size="pageSize"
        background
        :page-count="pageCount"
        :total="totalCount"
        @current-change="handleCurrentChange"
      ></el-pagination>
    </div>

    <!-- <el-row :gutter="20">
      <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
      <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
      <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
      <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
    </el-row> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: "index",
      input: "",
      curVersion: "",
      resourcePath: "",
      videoList: [],
      curPage: 1, //默认在第一页
      pageSize: 6, //默认每页显示6条数据
      totalCount: 1, //默认总条数为一条
      pageCount:1,//页数
      searched:0,
    };
  },
  created() {
    this.axios({
      method: "get",
      url: "http://localhost:9090/init/getParam",
    }).then((res) => {
      console.log(this.curVersion);
      this.curVersion = res.data.curVersion;
    });
    this.getAllVideo(this.curPage,this.pageSize);
  },
  methods: {
    //没有搜索操作时 分页显示所有视频
    getAllVideo(page,size){
      this.axios({
        method: "get",
        url:
          "http://81.69.3.91:9090/v1/" +
          "video/getVideo?" +
          "page=" +
          page +
          "&size=" +
          size,
      }).then((result) => {
        console.log(result);
        document.getElementById('videoContainer').innerHTML = '';
        this.videoList = result.data.videos;

        this.totalCount = result.data.total;
        this.pageCount = this.totalCount/this.pageSize;

        var i;
        for (i in this.videoList) {
          console.log(this.videoList[i].id + "=====");

          var video =
            "<video width='500px' height='600px' id=\"video" +
            this.videoList[i].id +
            "\"  controls=true src='http://81.69.3.91:8080/mp4/" +
            this.videoList[i].id +
            ".mp4'></video>";

          let col = document.createElement("el-col");

          col.setAttribute("style", "margin-right:30px");
          col.innerHTML = video;
          document.getElementById("videoContainer").appendChild(col);
        }
      });
    },
    searchVideoAndJump(page, size) {
      if(this.searched==0)
        this.curPage=1;//重置页码
      this.searched = 1;
      this.axios({
        method: "get",
        url:
          "http://81.69.3.91:9090/v1/" +
          "/video/jump?keyword=" +
          this.input +
          "&page=" +
          page +
          "&size=" +
          size,
      }).then((result) => {
        console.log(result);
        document.getElementById('videoContainer').innerHTML = '';
        this.videoList = result.data.videos;

        this.totalCount = result.data.total;
        this.pageCount = this.totalCount/this.pageSize;
        console.log("this.totalCount"+this.totalCount)

        var i;
        for (i in this.videoList) {
          console.log(this.videoList[i].id + "=====");

          var video =
            "<video width='500px' height='600px' id=\"video" +
            this.videoList[i].id +
            "\"  controls=true src='http://81.69.3.91:8080/mp4/" +
            this.videoList[i].id +
            ".mp4'></video>";

          let col = document.createElement("el-col");

          col.setAttribute("style", "margin-right:30px");
          col.innerHTML = video;
          document.getElementById("videoContainer").appendChild(col);

          var id = "video" + this.videoList[i].id;
          var v = document.getElementById(id);
          console.log(this.videoList[i].bg / 1000);
          v.currentTime = this.videoList[i].bg / 1000;
          // $(id).play();
        }
      });
    },
    jump(vid) {
      console.log("vid" + vid);
      var id = "video" + vid;
      var v = document.getElementById(vid);
      console.log(v);
      console.log(this.videoList[vid - 1].bg / 1000);
      v.currentTime = this.videoList[vid - 1].bg / 1000;
    },
    //跳转上传界面
    upload() {
      this.$router.push("/upload");
    },
    //换页
    handleCurrentChange(val){
      if(this.searched==0)
        this.getAllVideo(val,this.pageSize);
      else
        this.searchVideoAndJump(val,this.pageSize);
    }
  },
};
</script>
