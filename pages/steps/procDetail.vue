<template>
	<view>
		<!-- 流程页详情 -->
		<view class="">
			<view class="" v-if="oneListBoole">
				<uni-section title="当前进度" type="line"></uni-section>
				<view class="bg-white padding">
					<view class="cu-steps">
						<view class="cu-item" :class="index>num?'':'text-blue'" v-for="(item,index) in numList" :key="index">
							<text class="num"  :data-index="index + 1"></text> {{item.step_name}}
							<view class="">
								<text>{{item.state}}</text>
								<view>{{(item._approval_user==''||item._approval_user==null?'':('('+item._approval_user.split('/')[0])+')')}}</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		
			<!-- <view class="word-btn" hover-class="word-btn--hover" :hover-start-time="20" :hover-stay-time="70" @click="change"><text class="word-btn-white">下一步</text></view> -->
			<view class="cu-form-group margin-top" v-for="(item,index) in list" :key="index">
				<view class="title">{{item.title}}</view>
				<input disabled="disabled" :value="item.content==''||item.content==null?'未录入':item.content " name="input"></input>
			</view>
			<view class="cu-form-group align-start">
				<view class="title">{{oneListBoole?'需求问题描述':'描述'}}</view>
			</view>
			<view class="contentquess">
				<rich-text  :nodes='contentquess'></rich-text>
			</view>
		</view>
	</view>
</template>

<script>
	import uniSteps from '@/components/sectiob-steps/uni-steps/uni-steps.vue'
	import uniSection from '@/components/sectiob-steps/uni-section/uni-section.vue'
	export default {
		components: {
			uniSection,
			uniSteps
		},
		data() {
			return {
				oneListBoole:true,
				contentquess:'',
				num:2,
				numList: [{
					name: '申请'
				}, {
					name: '业务分析'
				}, {
					name: '业务开发实施'
				}, {
					name: '业务审核'
				}, {
					name: '提交人确认'
				} ],
				list:[
					{'title':'编号','content':''},
					{'title':'名称','content':''},
					{'title':'类型','content':''},
					{'title':'重要程度','content':''},
					{'title':'紧急程度','content':''},
					{'title':'期望发布时间','content':''},
					{'title':'需求问题附件','content':''},
					{'title':'创建人','content':''},
					{'title':'创建时间','content':''},
					{'title':'修改人','content':''},
					{'title':'修改时间','content':''}
				],
				active: 1,
				serviceNames:'srvoa_issue_info_select',
				proc_instance_no:'proc_instance_no'
			}
		},
		methods: {
			getdetail(val){
				let url = this.getServiceUrl('oa', this.serviceNames, 'select');
				let req = {"serviceName":this.serviceNames,
				"condition":[
					{"colName":this.proc_instance_no,"ruleType":"eq","value":val},
				 ],
				"colNames":["*"]
				}
				this.$http.post(url, req).then(res=>{
					console.log(res)
					let item = res.data.data[0]
					if(this.oneListBoole){
						this.contentquess=item.issue_desc.replace(/\<img/gi,"<img width='100%' ")
						this.list=[
							{'title':'编号','content':item.issue_no},
							{'title':'名称','content':item.issue_name},
							{'title':'类型','content':item.issue_type},
							// {'title':'项目','content':''},
							// {'title':'特性','content':item.issue_source},
							{'title':'重要程度','content':item.issue_level},
							{'title':'紧急程度','content':item.issue_pri},
							{'title':'期望发布时间','content':item.expected_time},
							{'title':'需求问题附件','content':''},
							{'title':'创建人','content':item.modify_user_disp},
							{'title':'创建时间','content':item.create_time},
							{'title':'修改人','content':item.create_user_disp},
							{'title':'修改时间','content':item.modify_time},
							]
						}else{
							// this.contentquess=item.pr_content.replace(/\<img/gi,"<img width='100%' ")
						this.list=[
						{'title':'编码','content':item.no},
						{'title':'项目/任务名称','content':item.pr_name},
						{'title':'序号','content':item.seq},
						{'title':'附件','content':item.issue_source},
						{'title':'状态','content':item.pr_status},
						{'title':'阶段','content':item.stage},
						{'title':'重要程度','content':item.pr_impt_level},
						{'title':'紧急程度','content':item.pr_priority},
						{'title':'优先级','content':item.priority},
						{'title':'责任人','content':item._pr_executor_disp},
						{'title':'进度(%)','content':item.pr_progress},
						{'title':'父编号','content':item.parent_no},
						{'title':'创建人','content':item.create_user_disp},
						{'title':'创建时间','content':item.create_time},
						{'title':'修改人','content':item.create_time},
						{'title':'修改时间','content':item.modify_user},
						]
						console.log(this.list)
					}
				
				})
			},
			//查询流程详情
			getsetaus(val){
				let url = this.getServiceUrl('oa', "srvprocess_basic_cfg_select", 'select');
				let req = {
					"serviceName":"srvprocess_basic_cfg_select",
					"colNames":["*"],
					"condition":[{colName: "proc_instance_no", ruleType: "eq", value: val}],
				}
				this.$http.post(url, req).then(res=>{
					this.numList=(res.data.proCharData)
					this.num=(res.data.proHanleData.step_no.slice(-1))
				})
			}
		},
		onLoad(option){
			if(option.id){
				// console.log("|||||||||||||||||||||")
				this.serviceNames=option.sName
				this.proc_instance_no='id'
				this.getdetail(option.id)
				this.oneListBoole=false
			}else{
				this.getdetail(option.pro)
				this.getsetaus(option.pro)
			}
			
		}
	}
</script>

<style>
	/* 头条小程序组件内不能引入字体 */
	/* #ifdef MP-TOUTIAO */
/* 	@font-face {
		font-family: uniicons;
		font-weight: normal;
		font-style: normal;
		src: url('~@/static/uni.ttf') format('truetype');
	} */

	/* #endif */

	/* #ifndef APP-NVUE */
	page {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		background-color: #efeff4;
		min-height: 100%;
		height: auto;
	}

	view {
		font-size: 28rpx;
		line-height: inherit;
	}
	.contentquess{
		padding: 10px 15px;
		background: #FFFFFF !important;
	}
	.example {
		padding: 0 30rpx 30rpx;
	}

	.example-info {
		padding: 30rpx;
		color: #3b4144;
		background: #ffffff;
	}

	.example-body {
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
		padding: 0;
		font-size: 14rpx;
		background-color: #ffffff;
	}

	/* #endif */
	.example {
		padding: 0 30rpx;
	}

	.example-info {
		/* #ifndef APP-NVUE */
		display: block;
		/* #endif */
		padding: 30rpx;
		color: #3b4144;
		background-color: #ffffff;
		font-size: 30rpx;
	}

	.example-info-text {
		font-size: 28rpx;
		line-height: 36rpx;
	}


	.example-body {
		flex-direction: column;
		padding: 30rpx;
		background-color: #ffffff;
	}

	.word-btn-white {
		font-size: 18px;
		color: #FFFFFF;
	}

	.word-btn {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		align-items: center;
		justify-content: center;
		border-radius: 6px;
		height: 48px;
		margin: 15px;
		background-color: #007AFF;
	}

	.word-btn--hover {
		background-color: #4ca2ff;
	}


	.status-btn {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		align-items: center;
		justify-content: center;
		height: 92rpx;
		margin: 30rpx;
		background-color: #007AFF;
	}

	.example-body {
		/* #ifndef APP-NVUE */
		display: block;
		/* #endif */
		padding: 15px;
		flex-direction: row;
	}
</style>