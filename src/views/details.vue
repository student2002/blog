<template>
	<div class="inner-box">
		<div class="maxWidthView inner ">
			<div class="article-item">
				<aside class="title">
					<h4>WEB学习路线推荐</h4>
					<p>
						<small class="small">作者: <span>小刘</span> </small>
						<small class="small">更新于: 2023-01-25 11:20:00</small>
					</p>
				</aside>
				<div class="time hidden-xs-only">
					<span class="day">25</span>
					<span class="month">1月</span>
					<span class="year ">2023</span>
				</div>
				<div class="artiledetail">
					这篇文章是为了介绍自己自学用过的WEB视频资料。本套整合教程总共180+G，共450+小时。考虑到绝大部分视频至少要看两遍，
					而且视频总时长并不代表学习时长，所以零基础初学者总学习时间大约为：600小时视频时长 + 100小时理解 + 100小时练习，至少需要800小时。
					你可能觉得自己能一天学习8小时，实际上平均下来每天能学4小时都算厉害了。总会有各种原因，比如当天内容太难，公司聚会，要出差等等。
					如果周末你也是坚持学习，那么最理想状况下，6个半月就可以学完，达到工作后能被人带的水平。但我知道那其实基本不可能。我自己从完全零基础，
					到学C语言，到学Java，除去中间断开的两个月，已经学习10个月。当然，这和我边工作边学习，以及没有人帮我找资料有很大关系。
					很多时间花在找资料上了。如果你已经经历过JS的洗礼，会明白，我这篇回答对现在迷茫的你份量有多重，JS阶段，建议完全零基础的朋友，
					直接看刘意老师的，辅助看毕老师的。当然，也可以都试看一下再决定，每个人喜好不同。放心，完全零基础的朋友，一遍肯定学不会。
					所以同一套视频看两遍都算少了。另外，有时一个老师的观点是片面的，
					要结合不同老师的讲解才可能对一个知识点有更全面深刻的理解（前提是先把一个老师的讲解吃透）。
					所以我是建议刘意和毕向东的都至少看两遍。
					<div class="copyright ">
						<p class="f-toe">非特殊说明，本文版权归 ZQ个人博客 所有，转载请注明出处.</p>
						<p class="f-toe">本文标题：Java学习路线推荐</p>
						<p class="f-toe">本文网址：枕风</p>
					</div>
				</div>
				<fieldset class="field-title">
					<legend>发表评论</legend>
					<div class="textarea">
						<el-input v-model="textarea" :rows="2" type="textarea" placeholder="请输入" />
					</div>
					<el-button type="primary">提交留言</el-button>
				</fieldset>
			</div>
		</div>
	</div>

</template>

<script setup>
import { ref } from 'vue';
const textarea = ref('');
</script>

<style lang="scss" scoped>
.inner-box {
	padding: 0 5px;
	overflow: hidden;
}

.inner {
	.article-item {
		.field-title {
			.textarea{
				margin: 10px 0;
			}
			legend {
				margin-left: 20px;
				padding: 0 10px;
				font-size: 20px;
				font-weight: 300;
			}

			margin: 10px 0 20px;
			border-width: 1px 0 0;
			padding: 0;
			border-style: solid;
			border-color: #e6e6e6;
		}

		.artiledetail {


			.copyright {
				.f-toe {
					overflow: hidden;
					word-wrap: normal !important;
					white-space: nowrap;
					text-overflow: ellipsis;
				}

				p {
					color: #565755;
					font-size: 13px;
				}

				clear: both;
				background-color: #f8f9f7;
				padding: 15px 20px;
				line-height: 22px;
				text-shadow: 0 1px 0 rgba(255, 255, 255, .8);
				font-size: 12px;
				color: #787977;
				margin-top: 20px;
			}

			margin: 20px 0 0 0;
			line-height: 28px;
			position: relative;
			min-height: 200px;
			border-bottom: 1px solid #e1e2e0;
			padding-bottom: 20px;
			color: #6e6e6e;
			font-size: 15px;
		}

		.time {
			.year {
				margin-left: 10px;
			}

			.month,
			.year {
				color: #989997;
			}

			.day {
				display: block;
				text-align: center;
				font-weight: 700;
				font-size: 40px;
				color: #6bc30d;
			}

			line-height: 32px;
			background-color: #fff;
			padding: 0 0 5px 20px;
			position: absolute;
			right: 20px;
			top: 20px;
		}

		.title {
			h4 {
				font-weight: 500;
				color: #787977;
			}

			.small {
				span {
					color: #3e8bc7;
				}

				margin-right: 20px;
				color: #787977;
				font-size: 13px;
			}

			padding: 5px 0 5px 0;
			border-bottom: 1px solid #e8e9e7;
			font-size: 18px;
			font-weight: 400;
		}

		padding: 20px 30px 25px 30px;
		position: relative;
	}

	background-color: #ffffff;
	margin: 20px auto 0 auto;

}

p {
	margin: 0;
}
</style>