<template>

    <div class="maxWidthView doc-container ">
        <div class="box">
            <div class="Message ">
                <h1>留言板</h1>
                <p>沟通交流，拉近你我！</p>
                <el-input v-model="textarea" :autosize="{
                    minRows: 5,
                    maxRows: 5
                }" type="textarea" placeholder="请输入" resize="none" />
                <p>
                    <el-button type="primary">提交留言</el-button>
                </p>
            </div>
            <div class="message-list">
                <ul>
                    <!-- <li class="zoomIn" v-for="i in 3" :key="i">
                        <div class="comment-parent flex">
                            <img src="https://img0.baidu.com/it/u=3101216502,1482995783&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=495"
                                alt="">
                            <div class="flex_equally">
                                <span class="name">马丁</span>
                                <div class="Comment-cont">带带我大佬</div>
                                <div class="info-footer">
                                    <el-icon style="margin-right: 8px;">
                                        <LocationInformation />
                                    </el-icon>
                                    <span style="padding-right: 5px;">成都</span>
                                    <span style="padding-right: 5px;">2023-01-25</span>
                                    <span class="reply">回复</span>
                                </div>
                                <hr>
                            </div>
                        </div>
                        <div class="comment-child flex">
                            <img src="https://img0.baidu.com/it/u=3101216502,1482995783&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=495"
                                alt="">
                            <div class="flex_equally">
                                <div class="info">
                                    <span class="username">小刘</span>
                                    <span>回复</span>
                                    <span class="username">吴老板</span>
                                    <span>去旅游啊</span>
                                </div>
                                <div class="info">
                                    <el-icon style="margin-right: 8px;" size="13">
                                        <LocationInformation />
                                    </el-icon>
                                    <span>成都</span>
                                    <span class="comment-time">2023-01-25</span>
                                    <span class="reply">回复</span>
                                </div>
                            </div>
                        </div>
                    </li> -->
                </ul>
            </div>
        </div>
    </div>

</template>

<script setup>
import { ref } from 'vue';
const textarea = ref('');
</script>

<style lang="scss" scoped>
.doc-container {
    .box {
        .message-list {
            .zoomIn {
                .comment-child {
                    .info {
                        .reply {
                            color: #009688;
                            cursor: pointer;
                        }

                        .username {
                            color: #01AAED;
                            font-size: 12px;
                        }

                        span {
                            margin-right: 5px;
                        }

                        font-size: 12px;
                        line-height: 20px;
                    }

                    img {
                        width: 40px;
                        height: 40px;
                        border-radius: 50%;
                        margin: 0 5px 5px 0;
                    }

                    margin-left: 53px;
                    min-height: 50px;
                }

                .comment-parent {
                    hr {
                        margin-left: 53px;
                        background-color: #e6e6e6;
                        height: 1px;
                        margin: 10px 0;
                        border: 0;
                        clear: both;

                    }

                    .info-footer {
                        .reply {
                            color: #009688;
                            cursor: pointer;
                        }

                        padding-top: 5px;
                    }

                    .Comment-cont {
                        padding: 8px 0 5px 0;
                        min-height: 30px;
                        word-break: break-all;
                    }

                    .name {
                        color: #01AAED;
                        margin-right: 10px;
                        margin-top: 5px;
                        display: block;
                    }

                    img {
                        width: 45px;
                        height: 45px;
                        border-radius: 50%;
                        margin: 0 5px 5px 0;
                    }

                    // padding: 15px 15px 0 15px;
                    font-size: 13px;
                }
                border-bottom: 1px dotted  #888585;
                padding: 15px;
                background-color: #ffffff;
                
            }

            li:first-child {
                border-top: 0;
            }

            // background-color: #ffffff;
            position: relative;
            // margin-bottom: 10px;
            margin-top: 20px;
        }

        .Message {
            h1 {
                font-weight: 700;
                font-size: 2rem;
                color: #515250;
            }

            p {
                font-size: 1.25rem;
                margin: 1rem 0;
                color: #515250;
            }

            background-color: #ffffff;
            padding: 15px;
            text-align: center;
        }

        margin: 0 5px;
    }

    
    margin: 20px auto 0 auto;
}
</style>