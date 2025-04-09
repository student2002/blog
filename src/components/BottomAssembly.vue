<template>
    <div class="bottom-box">
        <div class="content">
            <el-row :gutter="20">
                <el-col :xs="24" :sm="24 / 3" :md="24 / 3" :lg="24 / 3" :xl="24 / 3">
                    <div>
                        <div class="single-widget">枕风个人博客</div>
                        <p>世界那么大，我想去看看</p>
                        <el-button type="primary">About Me</el-button>
                    </div>
                </el-col>
                <el-col :xs="24" :sm="24 / 3" :md="24 / 3" :lg="24 / 3" :xl="24 / 3">
                    <div>
                        <div class="single-widget">相关连接</div>
                        <div class="flex center left_elastic txt-l">
                            <Share size="22" class="icont" />
                            <div>
                                <a href="https://beian.miit.gov.cn" target="_blank">许可证编号：皖ICP备2025081195号</a>
                            </div>
                        </div>
                        <div class="flex center left_elastic txt-l">
                            <StarFilled size="22" class="icont" />
                            <div>
                                <a href="https://gitee.com/martins_coachman/blog-vue3-b.git" target="_blank">博客开源Git模板</a>
                            </div>
                        </div>
                    </div>
                </el-col>
                <el-col :xs="24" :sm="24 / 3" :md="24 / 3" :lg="24 / 3" :xl="24 / 3">
                    <div>
                        <div class="single-widget">联系我</div>
                        <div class="flex center left_elastic txt-l">
                            <Location size="22" class="icont" />
                            <div>
                                <span>地址:地球</span>
                            </div>
                        </div>
                        <div class="flex center left_elastic txt-l">
                            <ChatLineSquare size="22" class="icont" />
                            <div>
                                <span>QQ: 3249889831</span>
                            </div>
                        </div>
                        <div class="flex center left_elastic txt-l">
                            <Avatar size="22" class="icont" />
                            <div>
                                <span>邮箱: 3249889831@qq.com</span>
                            </div>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.bottom-box {
    .content {
        .txt-l {
            .icont {
                width: 20px;
                margin-right: 10px;
            }
            a{
                color: #fff;
            }
            margin-bottom: 10px;
        }

        .single-widget {
            color: #fff;
            font-size: 18px;
            margin-bottom: 20px;
            margin-top: 20px;
        }

        color: #ffffff;
        font-size: 13px;
        padding: 60px 85px;
        margin: 0 auto;
        max-width: 1200px;
    }

    background-color: #232328;
}
</style>