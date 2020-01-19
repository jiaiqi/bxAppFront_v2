<template>
	<view class="wrap">  
		<view class="topslerr">
			<liuyuno-tabs :tabData="tabs" :defaultIndex="defaultIndex" @tabClick='tabClick' />
		</view>
		<view class="underhei"></view>
		<view class="content-box">
			<view @click="detial(item.proc_instance_no)" class="wrap-headlist" v-for="(item,index) in list" :key="index">
				<view class="twocontent">
					<view class="titlebox" >
						<view class="">
							<view class="dots" :style="'background:'+(colortitle(item.proc_status)).split('/')[0]" ></view>
							<view class="titltsfont" ref="afterdiv" >{{item.issue_type}}任务</view>
						</view>
						 <view class="dot" :style="'color:'+(colortitle(item.proc_status)).split('/')[0]">{{(colortitle(item.proc_status)).split('/')[1]}}</view>
					</view>
					<view class="lineunder"></view>
					<view class="fotsize">
						<text class="" >任务描述：</text>
						<text class="" style="line-height: 22px;">{{item.issue_name}}</text>
						<view class="bottombar">
							<text>发起时间：{{item.modify_time.substring(0,10)}}</text><text style="opacity: 0;">.........</text><text>发起人：{{(item.modify_user_disp.split('/'))[0]}}</text>
						</view>
					</view>
					
				</view>
			</view>
			<uni-loading v-if="" :status="status" color="#888" />
		</view>
			
	</view>
</template>

<script>
	import liuyunoTabs from "@/components/tablist/navTab.vue";
	import uniLoading from '@/components/loading-more/loading.vue';
	export default{
		components:{liuyunoTabs,uniLoading},
		data(){
			return{
				pro_text:'',
				tabs: ['待我处理', '我的全部', '我的申请','我已处理'],
				defaultIndex:0, //默认显示列
				status:1, //默认状态
				list:[],//数据列表
				valno:true,
				pageNo: 1,
				index:0, //当前列表下表
				rownumber: 10,
				listindex:['wait','myall','mine','processed'],
				service_name:''
			}
		},
		methods:{
			tabClick(e) {
				this.index=e
				this.list=[]
				this.status=this.pageNo= 1
				this.getlist(true,'pull-down').then(()=>{
					this.loadingStatus(this.list.length)
				})
			},
			colortitle(val){
				switch (val){
					case '完成':
						return '#46B6FE/已完成'
						break;
					case "待业务开发实施":
						return '#09F175/待实施'
						break;
					case "待业务分析":
						return '#e6b011/待分析'
						break;
					case "待业务审核":
						return '#9de65acc/待审核'
						break;
					default:
						return `#e2a06c/${val}`
						break;
				}
			},
			loadingStatus(value) {
				switch (value) {
					case 0:
						if(this.valno){
							this.status = 3
						}else{
							this.status = 2
						}
						break;
					case 10:
						this.status = 0
						break;
					default:
						this.status = 2;
						break;
				}
			},
			//下拉刷新
			// pull-down
			onPullDownRefresh() {
					let _self =this
					_self.pageNo=1
					setTimeout(function() {
						uni.stopPullDownRefresh();
						_self.getlist(true,'pull-down')
					}, 1000);
				},
				// pull-up
			onReachBottom() {
					let _self = this
					_self.status = 1
					_self.pageNo++
					uni.showNavigationBarLoading()
					setTimeout(function() {
						_self.getlist(false,'pull-up')
						uni.hideNavigationBarLoading()
					}, 1000);
				},
			//流程类列表
		async getlist(value,status){
			console.log( this.service_name)
				let url = this.getServiceUrl('oa', this.service_name, 'select');
				let proc_data_type= "wait"
				let req = {
					"serviceName":this.service_name,
					"colNames":["*"],
					"condition":[],
					"page":{pageNo: this.pageNo,
					rownumber: this.rownumber},
					"order":[],
					'proc_data_type':this.listindex[this.index]
				}
				let	response= await this.$http.post(url, req)
					let item =response.data.data
					console.log(item)
					if(status=="pull-down"){
						this.list=item
					}else{
						this.valno=false
						this.loadingStatus(item.length)
						this.list=this.list.concat(item)
					}
					if(value){
						this.valno=true
						this.loadingStatus(item.length)
					}
			},
			detial(val){
				uni.navigateTo({
					url:'../steps/procDetail?pro='+val
				})
			}
		},
		onLoad(option){
			this.service_name=(option.val)
			this.getlist(true,'pull-down')
		},
		mounted() {
		}
	}
</script>

<style>
	.wrap {
		width: 100%;
		/* height: 100%; */
		background: #FFFFFF !important;
	}
	.bottombar{
		margin: 10px 0 2px 0;
		text-align: right;
		white-space: nowrap;
	}
	.titlebox{
		font-size: 28upx;
		display: flex;
		justify-content: space-between;
	}
	.titltsfont{
		display: inline-block; 
		vertical-align: middle;
	}
	.topslerr {
		position: fixed;
		left: 0;
		right: 0;
		z-index: 1;
	}
	.fotsize{
		font-size: 25upx;
		color:#888 ;
	}
	.lineunder{
		margin: 10px 0;
		height: 1px;
		width: ;
		background: #e8e8e8;
	}
	.underhei {
		height: 110upx;
	}
	.content-box{
		padding: 0 30upx;
	}
	.wrap-headlist{
		width: 100%;
		border-radius: 5px;
		margin: 40upx 0;
		box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1); 
		padding: 18upx;
		box-sizing: border-box;
	}
	.dots{
		display:inline-block; 
		width: 25upx;
		height: 25upx;
		border-radius: 50%;
		margin-right:14px; 
		vertical-align: middle;
	}
</style>