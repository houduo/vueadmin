<template>
	<div>
		<header>
			<el-row>
				<el-col :span="12">
					<ul>
						<li v-for="(menu,index) in menus" :class="{active:active==index}" @click="jump(index)">{{menu}}</li>
					</ul>
				</el-col>
				<el-col :span="12">
					<el-button @click="handleHide()" style=" margin-top: -10px;">返回线路列表</el-button>
				</el-col>
			</el-row>
		</header>
		<section>

			<el-form :model="baseForm" ref="baseForm" label-width="100px" class="demo-baseForm">
				<h2 class="d_jump">基本信息</h2>
				<div class="baseinfo">
					<el-row>
						<el-col :span="20">

							<el-form-item label="选择线路分类">
								<el-select v-model="baseForm.categorytype" placeholder="请选择" @change="checkline">
									<el-option v-for="item in categoryids" :key="item.value" :label="item.label" :value="item.value">
									</el-option>
								</el-select>
								<el-select v-model="baseForm.categoryid" placeholder="请选择">
									<el-option v-for="item in categorytypes" :key="item.id" :label="item.name" :value="item.id">
									</el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="线路名称" prop="name">
								<el-input v-model="baseForm.name"></el-input>
							</el-form-item>
							<el-form-item label="团号代码" prop="teamno">
								<el-input v-model="baseForm.teamno"></el-input>
							</el-form-item>
							<el-form-item label="出行方式" prop="type">
								<el-radio-group v-model="baseForm.type">
									<el-radio label="2">自由行</el-radio>
									<el-radio label="1">跟团游</el-radio>
								</el-radio-group>
							</el-form-item>
							<el-form-item label="收客类型">
								<el-checkbox label="成人" prop="isadult" v-model="baseForm.isadult"></el-checkbox>
								<el-checkbox label="儿童" prop="ischild" v-model="baseForm.ischild"></el-checkbox>
								<el-checkbox label="老人" prop="isbaby" v-model="baseForm.isbaby"></el-checkbox>
							</el-form-item>
							<el-form-item label="出港地">
								<el-col :span="5">
									<el-form-item prop="fromprovinceid">
										<el-select v-model="baseForm.fromprovinceid" placeholder="请选择" @change="changecityfrom">
											<el-option v-for="item in province" :key="item.name" :label="item.name" :value="item.id">
											</el-option>
										</el-select>
									</el-form-item>

								</el-col>
								<el-col :span="1">
									&nbsp;
								</el-col>
								<el-col :span="5">
									<el-form-item prop="fromcityid">
										<el-select v-model="baseForm.fromcityid" placeholder="请选择" @change="changecityfrom">
											<el-option v-for="item in city" :key="item.name" :label="item.name" :value="item.id">
											</el-option>
										</el-select>
									</el-form-item>
								</el-col>
								<el-col :span="1">
									&nbsp;
								</el-col>
								<el-col :span="5">
									<el-form-item prop="fromdistrictid">
										<el-select v-model="baseForm.fromdistrictid" placeholder="请选择">
											<el-option v-for="item in district" :key="item.name" :label="item.name" :value="item.id">
											</el-option>
										</el-select>
									</el-form-item>
								</el-col>
							</el-form-item>
							<el-form-item label="目的地">
								<el-col :span="5">
									<el-form-item prop="toprovinceid">
										<el-select v-model="baseForm.toprovinceid" placeholder="请选择" @change="changecityback">
											<el-option v-for="item in province" :key="item.name" :label="item.name" :value="item.id">
											</el-option>
										</el-select>
									</el-form-item>
								</el-col>
								<el-col :span="1">
									&nbsp;
								</el-col>
								<el-col :span="5">
									<el-form-item prop="tocityid">
										<el-select v-model="baseForm.tocityid" placeholder="请选择" @change="changecityback">
											<el-option v-for="item in city" :key="item.name" :label="item.name" :value="item.id">
											</el-option>
										</el-select>
									</el-form-item>
								</el-col>
								<el-col :span="1">
									&nbsp;
								</el-col>
								<el-col :span="5">
									<el-form-item prop="todistrictid">
										<el-select v-model="baseForm.todistrictid" placeholder="请选择">
											<el-option v-for="item in district" :key="item.name" :label="item.name" :value="item.id">
											</el-option>
										</el-select>
									</el-form-item>
								</el-col>
							</el-form-item>
							<el-form-item label="交通工具">
								<el-col :span="2">
									去程
								</el-col>
								<el-col :span="4">
									<el-form-item prop="trafficgo">
										<el-select v-model="baseForm.trafficgo" placeholder="请选择">
											<el-option v-for="item in traffics" :key="item.value" :label="item.label" :value="item.value">
											</el-option>
										</el-select>
									</el-form-item>
								</el-col>
								<el-col :span="2">
									&nbsp;
								</el-col>
								<el-col :span="2">
									返程
								</el-col>
								<el-col :span="4">
									<el-form-item prop="trafficreturn">
										<el-select v-model="baseForm.trafficreturn" placeholder="请选择">
											<el-option v-for="item in traffics" :key="item.value" :label="item.label" :value="item.value">
											</el-option>
										</el-select>
									</el-form-item>
								</el-col>

							</el-form-item>
							<el-form-item label="线路说明" prop="remark">
								<el-input type="textarea" v-model="baseForm.remark"></el-input>
							</el-form-item>
							<el-form-item label="集合地点" prop="station">
								<el-input v-model="baseForm.station"></el-input>
							</el-form-item>
							<el-form-item label="上传图片" prop="images">
								<el-upload class="upload-demo" action="http://172.17.9.13:3001/api/images" :on-preview="handlePreview" :on-remove="handleRemove" :file-list="fileList">
									<el-button size="small" type="primary">点击上传</el-button>
									<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
								</el-upload>
							</el-form-item>

						</el-col>
					</el-row>
				</div>

				<h2 class="d_jump">编辑行程</h2>

				<div class="tablemenu">
					<el-button style="float: left;" @click="editor = false; menucheck1=true; menucheck2=false; basetype()">普通方式录入<i :class="[{'el-icon-check': menucheck1},'el-icon--right']"></i></el-button>
					<el-button style="float: left;" @click="editor = true; menucheck1=false; menucheck2=true; selftype()">自定义录入<i :class="[{'el-icon-check': menucheck2},'el-icon--right']"></i></el-button>
				
					<el-form-item label="行程天数" style="float: left; margin-bottom: 0;">
								<el-input v-model="baseForm.days" v-if="editor"></el-input>
								<div class="el-input-number" v-else>
						<!--is-disabled-->
								<span class="el-input-number__decrease" @click="minuday"><i class="el-icon-minus"></i></span>
								<span class="el-input-number__increase" @click="addday"><i class="el-icon-plus"></i></span>
								<div class="el-input"><input v-model="baseForm.days" autocomplete="off" type="text" rows="2" max="10" min="1" validateevent="true" class="el-input__inner">
		
								</div>
							</div>
							</el-form-item>
					<div style="clear: both;"></div>
					
					
					
				</div>
				<div class="baseinfo" v-if="editor">
					<div class="editor-container">
						<UE v-model="customtext" :defaultMsg=editorhtml :config=config ref="ue"></UE>
					</div>
				</div>
				<div class="base" v-else ref="baseday" id="baseday">
					<ul>
						<li class="daylist" v-for="(route,index) in baseForm.routes">
							<div class="day">
								第<span v-model="route.number">{{index+1}}</span>天
							</div>
							<el-row>
								<el-col :span="7">
									<el-form-item label="标题">
										<el-input v-model="route.title" class="insertinput"></el-input>

									</el-form-item>
								</el-col>
								<el-col :span="7">
									<div class="linetype">
										<ul>
											<li @click="inserttype('飞机')"></li>
											<li @click="inserttype('火车')"></li>
											<li @click="inserttype('汽车')"></li>
											<li @click="inserttype('轮船')"></li>
											<li @click="inserttype('动车')"></li>
											<li @click="inserttype('高铁')"></li>
											<li @click="inserttype('待定')"></li>

										</ul>
									</div>
								</el-col>
							</el-row>
							<el-row>
								<el-col :span="7">
									<el-form-item label="三餐">
										<el-checkbox v-model="route.isbreakfast">早</el-checkbox>
										<el-checkbox v-model="route.islunch">中</el-checkbox>
										<el-checkbox v-model="route.isdinner">晚</el-checkbox>

									</el-form-item>
								</el-col>
								<el-col :span="7">
									<el-form-item label="住宿" prop="hotel">
										<el-input v-model="route.hotel"></el-input>
									</el-form-item>
								</el-col>
							</el-row>
							<el-row>
								<el-col :span="14">
									<el-form-item label="行程" prop="content">
										<el-input type="textarea" v-model="route.content"></el-input>
									</el-form-item>
								</el-col>

							</el-row>

							<el-row>
								<el-col :span="14">
									<el-form-item label="备注" prop="remark">
										<el-input type="textarea" v-model="route.remark"></el-input>
									</el-form-item>
								</el-col>

							</el-row>
							<el-row>
								<el-col :span="14">
									<el-form-item label="图片" prop="titleimages">
										<el-upload action="http://172.17.9.13:3001/api/titleimages" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
											<i class="el-icon-plus"></i>
										</el-upload>
										<el-dialog v-model="dialogVisible" size="tiny">
											<img width="100%" :src="dialogImageUrl" alt="">
										</el-dialog>
									</el-form-item>
								</el-col>

							</el-row>

						</li>
					</ul>
					<!--<div class="daylist" v-for="route in baseForm.routes" >
						
					</div>-->
				</div>
				<h2 class="d_jump">备注说明</h2>
				<div class="baseinfo">
					<el-row>
						<el-col :span="20">
							<el-form-item label="购物安排" prop="shopping">
								<el-input type="textarea" v-model="baseForm.shopping"></el-input>
							</el-form-item>
							<el-row>
								<el-col :span="12">
									<el-form-item label="包含项目" prop="includePkg">
										<el-input type="textarea" v-model="baseForm.includePkg"></el-input>
									</el-form-item>
								</el-col>
								<el-col :span="12">
									<el-form-item label="不含项目" prop="excludePkg">
										<el-input type="textarea" v-model="baseForm.excludePkg"></el-input>
									</el-form-item>
								</el-col>
							</el-row>
							<el-row>
								<el-col :span="12">
									<el-form-item label="温馨提示" prop="reminder">
										<el-input type="textarea" v-model="baseForm.reminder"></el-input>
									</el-form-item>
								</el-col>
								<el-col :span="12">
									<el-form-item label="儿童/老人" prop="childolder">
										<el-input type="textarea" v-model="baseForm.childolder"></el-input>
									</el-form-item>
								</el-col>
							</el-row>
							<el-form-item label="对外备注" prop="outremark">
								<el-input type="textarea" v-model="baseForm.outremark"></el-input>
							</el-form-item>
							<el-form-item label="内部备注" prop="innerremark">
								<el-input type="textarea" v-model="baseForm.innerremark"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
				</div>

				<div class="button">
					<el-form-item>
						<el-button size="large" type="primary" @click="submitForm('baseForm')">保存</el-button>
						<el-button size="large" @click="handleHide">取消</el-button>
					</el-form-item>
				</div>

			</el-form>

		</section>
	</div>
</template>

<script>
	import UE from '../../common/ue.vue';
	import { province, city, district, categoryall, linecategorytype, templatupdate, templatdetail,token } from '../../../common/js/config';
	export default {
		components: {
			UE
		},
		props: ['lineid', 'scope'],
		data() {
			return {
				traffics: [{
					value: '1',
					label: '飞机'
				}, {
					value: '2',
					label: '动车'
				}, {
					value: '3',
					label: '火车'
				}, {
					value: '4',
					label: '高铁'
				}, {
					value: '5',
					label: '大巴'
				}, {
					value: '6',
					label: '轮船'
				}], //出行方式
				categoryids: [{
					value: '0',
					label: '全部'
				}, {
					value: '1',
					label: '国内游'
				}, {
					value: '2',
					label: '出境游'
				}, {
					value: '3',
					label: '周边游'
				}], //线路分类
				categorytypes: [],
				daylists: [],
				dialogImageUrl: '',
				dialogVisible: false,
				menucheck1: true,
				menucheck2: false,
				num1: 1, //天数选择
				defaultMsg: this.editorhtml,
				editor: false,
				config: {
					initialFrameWidth: null,
					initialFrameHeight: 350
				},
				menus: ['基本信息', '编辑行程', '备注说明'],
				active: 0,
				fileList: [],
				customtext: '', //自定义文本内容

				baseForm: {
					token: token,
					id: this.lineid,
					categoryid: '',
					categorytype: '',
					name: '',
					teamno: '',
					type: " 1",
					isadult: false,
					ischild: false,
					isbaby: false,
					fromprovinceid: '',
					fromcityid: '',
					fromdistrictid: '',
					toprovinceid: '',
					tocityid: '',
					todistrictid: '',
					trafficgo: '',
					trafficreturn: '',
					edittype: 0,
					days: 1,
					remark: '',
					station: '',
					images: '',
					shopping: '',
					includePkg: '',
					excludePkg: '',
					reminder: '',
					childolder: '',
					outremark: '',
					innerremark: '',
					includePkg: '',
					routes: [{
						'number': 1,
						'title': '',
						'titleimages': '',
						'isbreakfast': false,
						'islunch': false,
						'isdinner': false,
						'content': '',
						'hotel': '',
						'remark': ''

					}]
				},
				rules: {
					name: [{
							required: true,
							message: '请输入活动名称',
							trigger: 'blur'
						},
						{
							min: 3,
							max: 5,
							message: '长度在 3 到 5 个字符',
							trigger: 'blur'
						}
					],
					region: [{
						required: true,
						message: '请选择活动区域',
						trigger: 'change'
					}],
					date1: [{
						type: 'date',
						required: true,
						message: '请选择日期',
						trigger: 'change'
					}],
					date2: [{
						type: 'date',
						required: true,
						message: '请选择时间',
						trigger: 'change'
					}],
					type: [{
						type: 'array',
						required: true,
						message: '请至少选择一个活动性质',
						trigger: 'change'
					}],
					resource: [{
						required: true,
						message: '请选择活动资源',
						trigger: 'change'
					}],
					desc: [{
						required: true,
						message: '请填写活动形式',
						trigger: 'blur'
					}]
				},
				province: [],
				city: [],
				district: [],
				editor:'',
				editorhtml:'',
				oldday:''
			
			}
		},
		mounted: function() {
			this.getlineinfo()
			this.getprovince()
		
		},
		methods: {
		
			getlineinfo() {
				let para = {
					token: token,
					id: this.lineid
				}
				templatdetail(para).then((res) => {
					this.baseForm = res.data.obj
					res.data.obj.type == 1 ? this.baseForm.type = "1" : this.baseForm.type = "2"
					this.oldday = res.data.obj.days
					if(res.data.obj.edittype == 0){
						this.editor = false
						
					}else{
						this.editor = true
						this.editorhtml = res.data.obj.routes[0].content
						console.log(this.editorhtml)
						
					}
					let categorytype = res.data.obj.categorytype
					switch(categorytype) {
						case 0:
							this.baseForm.categorytype = "全部";
							break;
						case 1:
							this.baseForm.categorytype = "国内游";
							break;
						case 2:
							this.baseForm.categorytype = "出境游";
							break;
						case 3:
							this.baseForm.categorytype = "周边游";
							break;
					}
					let day = res.data.obj.trafficgo
					switch(day) {
						case 1:
							this.baseForm.trafficgo = "飞机";
							break;
						case 2:
							this.baseForm.trafficgo = "动车";
							break;
						case 3:
							this.baseForm.trafficgo = "火车";
							break;
						case 4:
							this.baseForm.trafficgo = "高铁";
							break;
						case 5:
							this.baseForm.trafficgo = "大巴";
							break;
						case 6:
							this.baseForm.trafficgo = "轮船";
							break;
					}
					let trafficback = res.data.obj.trafficreturn
					switch(trafficback) {
						case 1:
							this.baseForm.trafficreturn = "飞机";
							break;
						case 2:
							this.baseForm.trafficreturn = "动车";
							break;
						case 3:
							this.baseForm.trafficreturn = "火车";
							break;
						case 4:
							this.baseForm.trafficreturn = "高铁";
							break;
						case 5:
							this.baseForm.trafficreturn = "大巴";
							break;
						case 6:
							this.baseForm.detail = "轮船";
							break;
					}

				})

			},
			jump(index) {
				this.active = index

				// 用 class="d_jump" 添加锚点
				let jump = document.querySelectorAll('.d_jump')
				let total = jump[index].offsetTop
				let distance = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop
				// 平滑滚动，时长500ms，每10ms一跳，共50跳
				let step = total / 50
				if(total > distance) {
					smoothDown()
				} else {
					let newTotal = distance - total
					step = newTotal / 50
					smoothUp()
				}

				function smoothDown() {
					if(distance < total) {
						distance += step　　　　　　　
						document.body.scrollTop = distance
						document.documentElement.scrollTop = distance
						window.pageYOffset = distance
						setTimeout(smoothDown, 10)
					} else {
						document.body.scrollTop = total
						document.documentElement.scrollTop = total
						window.pageYOffset = total
					}
				}

				function smoothUp() {
					if(distance > total) {
						distance -= step　　　　　　　
						document.body.scrollTop = distance
						document.documentElement.scrollTop = distance
						window.pageYOffset = distance
						setTimeout(smoothUp, 10)
					} else {
						document.body.scrollTop = total
						document.documentElement.scrollTop = total
						window.pageYOffset = total
					}
				}
			},
			//选择分类
			checkline() {
				let para = {
					token: token,
					type: this.baseForm.categorytype
				}
				linecategorytype(para).then((res) => {
					this.categorytypes = res.data.obj
				})
			},
			//返回线路列表
			handleHide: function() {
				this.$emit('setMode', 'linelist');
				this.$emit('getlinelist')
			},
			//保存表单
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if(valid) {
						let para = this.baseForm
						
						let categorytype = para.categorytype
					switch(categorytype) {
						case "全部":
							this.baseForm.categorytype = 0 ;
							break;
						case "国内游":
							this.baseForm.categorytype = 1;
							break;
						case "出境游":
							this.baseForm.categorytype = 2;
							break;
						case "周边游":
							this.baseForm.categorytype = 3;
							break;
					}
					let day = para.trafficgo
					switch(day) {
						case "飞机":
							this.baseForm.trafficgo = 1;
							break;
						case "动车":
							this.baseForm.trafficgo = 2;
							break;
						case "火车":
							this.baseForm.trafficgo = 3;
							break;
						case "高铁":
							this.baseForm.trafficgo = 4;
							break;
						case "大巴":
							this.baseForm.trafficgo = 5;
							break;
						case "轮船":
							this.baseForm.trafficgo = 6;
							break;
					}
					let trafficback =para.trafficreturn
					switch(trafficback) {
						case "飞机":
							this.baseForm.trafficreturn = 1;
							break;
						case "动车":
							this.baseForm.trafficreturn = 2;
							break;
						case "火车":
							this.baseForm.trafficreturn = 3;
							break;
						case "高铁":
							this.baseForm.trafficreturn = 4;
							break;
						case "大巴":
							this.baseForm.trafficreturn = 5;
							break;
						case "轮船":
							this.baseForm.trafficreturn = 6;
							break;
					}
					
						if(this.editor == false) {
							//基本录入
							para.routes = this.baseForm.routes
							para.edittype = 0
						} else {
							//自定义录入
							let html = this.$refs.ue.getUEContent()
							para.routes[0].content = html
							para.edittype = 1
						}
						templatupdate(para).then((res) => {
							console.log(para)
							if(res.data.error == 1) {
								
								this.$message({
									showClose: true,
									message: res.data.message,
									type: 'error'
								});
							} else {
								this.handleHide()
								this.$message({
									showClose: true,
									message: "编辑成功！",
									type: 'success'
								});
							}

						})
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			//重置表单
			resetForm(formName) {
				this.$refs[formName].resetFields();
			},
			handleRemove(file, fileList) {
				console.log(file, fileList);
			},
			handlePreview(file) {
				console.log(file);
			},
			//天数减少
			minuday() {
				let index = this.baseForm.length
				if(this.baseForm.days <= 1) {
					this.baseForm.days == 1
					index = 1
				} else {
					this.baseForm.days -= 1
					this.baseForm.routes.splice(index, 1)
				}

			},
			//天数增加
			addday() {
				this.baseForm.days += 1
				this.baseForm.routes.push({
					'number': this.baseForm.days,
					'title': '',
					'titleimages': '',
					'isbreakfast': false,
					'islunch': false,
					'isdinner': false,
					'content': '',
					'hotel': '',
					'remark': ''	
				})
				

			},
			//早中晚
			handlecheckedeat() {},
			//图片上传
			handleRemove(file, fileList) {
				console.log(file, fileList);
			},
			handlePictureCardPreview(file) {
				this.dialogImageUrl = file.url;
				this.dialogVisible = true;
			},
			//普通方式录入
			basetype(){
				this.baseForm.routes[0].content = ""
				for(let i = 0 ; i <this.baseForm.routes.length;i++){
					this.baseForm.days = i+1
				}
					
			},
			//自定义录入
			selftype(){
				this.baseForm.days = this.oldday
			},
			//获取省级列表
			getprovince() {
				let count = "fb0828b148bc48afbab8ef03c55d153b"
				let para = {
					id: count,
					token:token
				}
				province(para).then((res) => {
					this.province = res.data.obj

				}).catch(function(err) {
					console.log("连接错误")
				})
			},
			//获取市列表
			getcity(pro) {
				city(pro).then((res) => {
					this.city = res.data.obj

				}).catch(function(err) {
					console.log("连接错误")
				})
			},
			//获取区列表
			getdistrict(city) {
				district(city).then((res) => {
					this.district = res.data.obj

				}).catch(function(err) {
					console.log("连接错误")
				})
			},
			//选择去程城市
			changecityfrom() {
				let pro = {
					id: this.baseForm.fromprovinceid
				}
				this.getcity(pro)
				let city = {
					id: this.baseForm.fromcityid
				}
				this.getdistrict(city)

			},
			//选择返程城市
			changecityback() {
				let pro = {
					id: this.baseForm.toprovinceid
				}
				this.getcity(pro)
				let city = {
					id: this.baseForm.tocityid
				}
				this.getdistrict(city)
			},
			//插入交通工具
			inserttype(str) {
				let tc = event.currentTarget.parentNode.parentNode.parentNode.parentNode.getElementsByClassName("insertinput")[0]
				console.log(tc)
				let ts = tc.getElementsByTagName("input")[0];
				let tclen = ts.value.length
				tc.focus();
				if(typeof document.selection != "undefined") {
					document.selection.createRange().text = str;
				} else {
					ts.value = ts.value.substr(0, ts.selectionStart) + str + ts.value.substring(ts.selectionStart, tclen);
				}
			}

		}
	}
</script>

<style scoped lang="scss">
	header {
		height: 40px;
		padding: 20px 30px 0 30px;
		background: #fff;
		position: fixed;
		z-index: 1105;
		top: 0;
		width: 90%;
		.el-row {
			li {
				float: left;
				height: 37px;
				border-top: 3px solid transparent;
				padding: 0 25px;
				line-height: 37px;
				font-size: 14px;
				cursor: pointer;
			}
			.active {
				background: #eef1f6;
				border-top: 3px solid #3ec3c8;
				border-top-left-radius: 5px;
				border-top-right-radius: 5px;
			}
		}
	}
	
	section {
		margin-top: 60px;
		padding: 0 30px;
		text-align: left;
		h2 {
			color: #2cb1b6;
			font-size: 24px;
			padding-top: 20px;
			line-height: 60px;
		}
		.baseinfo {
			background: #fff;
			padding: 20px 30px;
		}
		.button {
			margin-top: 40px;
			margin-bottom: 80px;
		}
		.tablemenu {
			padding: 20px 50px;
			background: #fff;
			margin-bottom: 10px;
			span {
				font-size: 14px;
				color: #666;
				margin: 0 10px 0 50px;
			}
		}
		.base {
			.daylist {
				border-left: 3px solid #fbcd9f;
				padding: 30px 60px 10px 104px;
				background: #fff url(../../../assets/images/circle.png) repeat-y 48px;
				position: relative;
				min-height: 100px;
				margin-bottom: 20px;
				.day {
					position: absolute;
					left: 20px;
					top: 15px;
					background: #ff780b;
					width: 55px;
					height: 55px;
					display: block;
					border-radius: 50%;
					color: #fff;
					font-size: 14px;
					line-height: 55px;
					text-align: center;
					span {
						font-size: 20px;
					}
				}
				.linetype {
					border: 1px solid #bfcbda;
					height: 34px;
					width: 251px;
					border-radius: 5px;
					margin-left: 10px;
					background: url(../../../assets/images/linetype.png) no-repeat;
					overflow: hidden;
					li {
						width: 35px;
						border-right: 1px solid #dee5ec;
						float: left;
						height: 34px;
						display: block;
						cursor: pointer;
						color: transparent;
						font-size: 12px;
					}
				}
			}
		}
	}
	
	.linetype li:last-child {
		border-right: 0!important;
	}
</style>