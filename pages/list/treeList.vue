<template>
	<view class="wrap">
		<view class="contents" >
			<view class="list-box" v-for="(item,index) in datalist" :key="index" >
				<view class="topbox">
					<view class="titlebox" >
						<view class="">
							<view class="dots" :style=" 'background:'+colortitle(item.pr_status)" ></view>
							<view class="titltsfont" ref="afterdiv" >{{item.pr_name}}</view>
						</view>
						 <view class="dot" :style=" 'color:'+colortitle(item.pr_status)">{{item.pr_status}}</view>
					</view>
					<view class="lineunder"></view>
					
					<view class="double fontdouble" style="">
						<view class="back"><text>重要程度：</text><text>重要</text></view>
						<view class="back"><text>紧急程度：</text><text>紧急</text></view>
					</view>
					<view class="" style="display: flex;justify-content: space-between;">
						<view class="fontdouble" style="text-align:left;">编码：OAPT20200114101</view>
						<view class="buttonin">
							<text style="background: rgba(24,125,234,.46);"  @click="listDetail(item)">详情</text>
							<text style="background: rgba(28,230,43,.46);"  @click="subordinate(item)">下级</text>
						</view>
					</view>
					
					<view class="peoples">责任人：<text style="display: inline-block; width: 37px;text-align: left;">{{item._pr_executor_disp.split('/')[0]}}</text></view>
				</view>
					<view class="linsed">
						<view class="cu-progress  round sm " :class="item.pr_status=='进行中'?'active striped':''">
							<view class="bg-green" :style="[{ width:true?'60%':''}]"></view>
						</view>
					</view>
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
				valno:true,
				menu_v2:{},
				option:{},
				service_name:''
			}
		},
		methods:{
			// rgb(11, 201, 157);
			colortitle(val){
				switch (val){
					case '进行中':
						return 'rgb(11, 201, 157)'
						break;
					case "完成":
						return '#46B6FE'
						break;
					case "沟通中":
						return 'rgb(230, 176, 17);'
						break;
					default:
						return '#ADADAD'
						break;
				}
			},
			subordinate(val){
				uni.showLoading({
				  title: '请稍等'
				});
				let index =this.menu_v2.no_col
					this.secondList=false
					let vals = val[index]
					this.getlist(vals).then(()=>{
						console.log(vals)
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
								url:'./treeList?Listval='+vals+'&val='+this.service_name
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
				let url = this.getServiceUrl('oa', this.service_name, 'select');
				let proc_data_type= "wait"
				let req = {
					"serviceName":this.service_name,
					"colNames":["*"],
					"condition":[{colName: this.menu_v2.parent_no_col, ruleType: "isnull","value":''}],
					"page":{pageNo:1,
					rownumber: 10},
					"order":[]
					// 'proc_data_type':this.listindex[this.index]
				}
				if(value){
					req.page=null
					req.condition=[{colName: this.menu_v2.parent_no_col, ruleType: "eq","value":value}]
				}
				let	response= await this.$http.post(url, req)
				console.error(response)
				this.listLength=response.data.data.length
				if(this.secondList){
					this.datalist=(response.data.data)
					this.loadingStatus(this.listLength)
				}
				console.clear()
			},
		async getmenu(){
				let url = this.getServiceUrl('oa', `srvsys_service_columnex_v2_select?colsel_v2=${this.service_name}`, 'select');
				let req = {
					"serviceName":"srvsys_service_columnex_v2_select",
					"colNames":["*"],
					"condition":[
						{"colName":"service_name","value":this.service_name,"ruleType":"eq"},
						{"colName":"use_type","value":"treelist","ruleType":"eq"},
					],
					"order":[{"colName":"seq","orderType":"asc"}]}
					console.log("???????????",this.option.Listval)
						let res =await this.$http.post(url, req)
							console.log(res.data.data)
							this.menu_v2=(res.data.data)
							this.getlist(this.option.Listval)
			},
			listDetail(item){
				uni.navigateTo({
					url:'../steps/procDetail?sName='+this.service_name+'&id='+item.id
				})
			}
		},
		onLoad(option){
			this.service_name=option.val
			console.log('%c 执行onload','color:green')
			this.option=option
			this.getmenu()
		}
	
	}
</script>

<style>
	.wrap{
		width: 100%;
		background: #FFFFFF;
	}
	.back{
		/* background: #666666; */
		    /*  width: 440px;
		      padding: 30px; */
		      /* font: bold 55px/100% "微软雅黑", "Lucida Grande", "Lucida Sans", Helvetica, Arial, Sans;; */
		      color: #000;
			  /*  text-shadow: 0 0 7px red;
		      text-transform: uppercase; */
	}
	.fontdouble{
		font-size: 25upx;
		line-height: 45upx;
	}
	.double{
		display: flex;justify-content:space-between;
	}
	.topbox{
		padding: 18upx 30upx 0px 30upx;
	}
	.contents{
		padding: 0 30upx;
		background: #FFFFFF;
	}
	.buttonin text{
		display: inline-block;
		font-size: 25upx;
		line-height: 17px;
		height: 17px;
		width: 80upx;
		text-align: center;
		margin-left: 5px;
		border-radius: 4px;
		color: #FFFFFF;
	}
	.lineunder{
		margin: 10px 0;
		height: 1px;
		width: ;
		background: #e8e8e8;
	}
	.list-box{
		width: 100%;
		box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
		margin: 20px 0;
		border-radius: 5px;
		box-sizing: border-box;
		padding-bottom: 0px;
	}
	.peoples{
		font-size: 25upx;
		color:#888 ;
		text-align: right;
		/* margin: 10px 0 5px 0; */
		white-space: nowrap;
	}
	.linsed{
		position: relative;
		bottom: 0;
		height:26upx;
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
