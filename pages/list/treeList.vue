<template>
	<view class="wrap">
		<view class="contents" >
			<view class="list-box" v-for="(item,index) in datalist" :key="index" @click="subordinate(item.no)" >
				<view class="topbox">
					<view class="titlebox" >
						<view class="">
							<view class="dots" style='background:#0BC99D' ></view>
							<view class="titltsfont" ref="afterdiv" >{{item.pr_name}}</view>
						</view>
						 <view class="dot" style='color:#0BC99D'>{{item.pr_status}}</view>
					</view>
					<view class="peoples">责任人：<text style="display: inline-block; width: 37px;text-align: left;">{{item._pr_executor_disp.split('/')[0]}}</text></view>
				</view>
				<view class="lineco"></view>
			</view>
		</view>
		<view class="undf">
			<uni-loading v-if="" :status="status" color="#888" />
		</view>
	</view>
</template>

<script>
	import uniLoading from '@/components/loading-more/loading.vue';
	export default{
		components:{uniLoading},
		data(){
			return{
				datalist:[],
				secondList:true,
				listLength:"",
				status:1,
				valno:true
			}
		},
		methods:{
			subordinate(val){
				this.secondList=false
				uni.showLoading({
				  title: '请稍等'
				});
				this.getlist(val).then(()=>{
					uni.hideLoading();
					if(this.listLength=='0'){
						uni.showToast({
							title: '没有下级目录',
							mask: false,
							icon:'none',
							duration: 1500
						})
					}else{
						uni.navigateTo({
							url:'./treeList?val='+val
						})
					}
				})
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
		 async getlist(value){
			 console.log(value)
				let url = this.getServiceUrl('oa', "srvoa_project_track_select", 'select');
				let proc_data_type= "wait"
				let req = {
					"serviceName":"srvoa_project_track_select",
					"colNames":["*"],
					"condition":[{colName: "parent_no", ruleType: "isnull","value":''}],
					"page":{pageNo:1,
					rownumber: 10},
					"order":[]
					// 'proc_data_type':this.listindex[this.index]
				}
				if(value){
					req.page=null
					req.condition=[{colName: "parent_no", ruleType: "eq","value":value}]
				}
				let	response= await this.$http.post(url, req)
				this.listLength=response.data.data.length
				if(this.secondList){
					this.datalist=(response.data.data)
					this.loadingStatus(this.listLength)
				}
			},
				
		},
		onLoad(option){
			this.getlist(option.val)
		},
	}
</script>

<style>
	.wrap{
		width: 100%;
	}
	.topbox{
		padding: 18upx 30upx 0px 30upx;
	}
	.contents{
		padding: 0 30upx;
	}
	.list-box{
		height: 70px;
		width: 100%;
		box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
		margin: 20px 0;
		border-radius: 5px;
		position: relative;
		box-sizing: border-box;
	}
	.peoples{
		font-size: 25upx;
		color:#888 ;
		text-align: right;
		margin: 10px 0;
		white-space: nowrap;
	}
	.lineco{
		width: 100%;
		height: 8upx;
		background: linear-gradient(to right,rgba(30,210,168,.3),rgba(54,60,243,.3));
		position: absolute;
		bottom: 0;
		border-bottom-right-radius: 3px;
		border-bottom-left-radius:3px ;
		border-top-right-radius: 3px;
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
	.dots{
		display:inline-block; 
		width: 25upx;
		height: 25upx;
		border-radius: 50%;
		margin-right:14px; 
		vertical-align: middle;
	}
</style>
