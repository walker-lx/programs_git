<template>
  <div id="app">
	  <div class="result">
		  <div class="rel">{{ relvalue }}</div>
		  <div class="inputvalue">{{ inputvalue }}</div>
		  <div class="input">{{ value }}</div>
	  </div>
	  <div class="userinput">
		  <!-- <div class="chooseitem" v-for="item in chooseValue">{{ item.text ? item.text : '' }}</div> -->
		  <div class="chooseitem" data-val='丈夫' id="clickel1">夫</div>
		  <div class="chooseitem" data-val='妻子' id="clickel2">妻</div>
		  <div class="chooseitem dl" @click="cut">
			  <img class="delete" src="./assets/delete-icon@2x.png" v-if="deletedown"></img>
			  <img class="delete" src="./assets/delete2-icon@2x.png" v-if="deleteup"></img>
		  </div>
		  <div class="chooseitem cl" @click="clear">
			<img class="ac" src="./assets/AC@2x.png" v-if="acdown"></img>
			<img class="ac" src="./assets/AC2@2x.png" v-if="acup"></img>
		  </div>
		  <div class="chooseitem" data-val='爸爸' id="clickel3">父</div>
		  <div class="chooseitem" data-val='妈妈' id="clickel4">母</div>
		  <div class="chooseitem" data-val='哥哥' id="clickel5">兄</div>
		  <div class="chooseitem" data-val='弟弟' id="clickel6">弟</div>
		  <div class="chooseitem" data-val='姐姐' id="clickel7">姐</div>
		  <div class="chooseitem" data-val='妹妹' id="clickel8">妹</div>
		  <div class="chooseitem" data-val='儿子' id="clickel9">子</div>
		  <div class="chooseitem" data-val='女儿' id="clickel10">女</div>
		  <div class="btn">
			  <div class="hc" @click="hc">互查</div>
				<div class="equal" @click="getRel">
					<!-- <img class="equalimg" src="./assets/equal-icon@2x.png" alt=""> -->
				</div>
		  </div>
	  </div>
  </div>
</template>

<script>
// import _filter from '../static/_fileter.js'
// import _data from '../static/data.js'
// import relationship from 'relationship.js'
let valarr = ['我']
let n = 0
let disbtn = 0
let obj = {
	text: this.value,
	sex: -1,
	type: 'default',
	reverse: false
}
export default {
	name: 'app',
	mounted () {
		function setBtn () {
			for (let j = 1; j < 11; j++) {
				document.querySelector('#clickel' + j).className = 'chooseitem disable'
			}
		}
		document.querySelector('.input').className = 'input inputrel'
		let that = this
		if (disbtn === 0) {
			for (let i = 1; i < 11; i++) {
				document.querySelector('#clickel' + i).addEventListener('contextmenu', function (e) {
					e.preventDefault();
				});
				document.querySelector('#clickel' + i).ontouchstart = function (e) {
					that.relvalue = ''
					if (that.getSameSex()) {
						setBtn()
					}
					else if (valarr.length >= 10) {
						setBtn()
					}
					else if (that.value === '再玩就坏了') {
						setBtn()
					}
					else {
						e.currentTarget.className = 'chooseitem clickstatus'
					}
				}
				document.querySelector('#clickel' + i).ontouchend = function (e) {
					e.currentTarget.className = 'chooseitem'
					that.click = ''
					let elvalue = e.currentTarget.dataset.val
					if (that.getSameSex()) {
						that.relvalue = valarr.join('的')
						setBtn()
						that.inputvalue = ''
						that.value = '暂不支持同性婚姻称呼查询，怎么称呼你决定'
					}
					else if (valarr.length >= 9) {
						that.inputvalue = valarr.join('的')
						that.value = '再玩就坏了'
						setBtn()
					}
					else if (that.value === '再玩就坏了') {
						that.relvalue = ''
						that.inputvalue = valarr.join('的')
						setBtn()
					}
					else {
						document.querySelector('.input').className = 'input'
						that.getInput(1, 0, 0, elvalue)
						// console.log(valarr, 'valarr')
						// console.log(that.value, 'value')
						obj.text = that.value
						that.relvalue = ''
						let value1 = valarr.join('的')
						let rel
						// that.relvalue = valarr.join('的')
						that.inputvalue = valarr.join('的')
						obj.text = value1
						obj.reverse = false
						rel = window.relationship(obj)
						if (rel.length > 1) {
							that.value = rel.reverse().join('/')
						}
						else if (rel.length === 1) {
							that.value = rel[0]
						}
						else if (that.getSameSex()) {
							that.value = '暂不支持同性婚姻称呼查询，怎么称呼你决定'
						}
						else {
							that.value = '再玩就坏了'
						}
					}
				}
			}
		}
		document.querySelector('.hc').ontouchstart = function (e) {
			if (n === 0) {
				e.currentTarget.className = 'hc disbtn'
			}
			else if (that.getSameSex()) {
				e.currentTarget.className = 'hc disbtn'
			}
			else if (valarr.length >= 10) {
				e.currentTarget.className = 'hc disbtn'
			}
			else if (that.value === '再玩就坏了') {
				e.currentTarget.className = 'hc disbtn'
			}
			else {
				e.currentTarget.className = 'hc clickstatus'
			}
		}
		document.querySelector('.hc').ontouchend = function (e) {
			if (n === 0) {
				e.currentTarget.className = 'hc disbtn'
			}
			else if (that.getSameSex()) {
				e.currentTarget.className = 'hc disbtn'
			}
			else if (valarr.length >= 10) {
				e.currentTarget.className = 'hc disbtn'
			}
			else if (that.value === '再玩就坏了') {
				e.currentTarget.className = 'hc disbtn'
			}
			else {
				e.currentTarget.className = 'hc'
			}
		}
		document.querySelector('.dl').ontouchstart = function (e) {
			e.currentTarget.className = 'chooseitem clickstatus'
			that.deletedown = false
			that.deleteup = true
		}
		document.querySelector('.dl').ontouchend = function (e) {
			e.currentTarget.className = 'chooseitem'
			that.deletedown = true
			that.deleteup = false
		}
		document.querySelector('.cl').ontouchstart = function (e) {
			e.currentTarget.className = 'chooseitem clickstatus'
			that.acdown = false
			that.acup = true
		}
		document.querySelector('.cl').ontouchend = function (e) {
			e.currentTarget.className = 'chooseitem'
			that.acdown = true
			that.acup = false
		}
	},
	data () {
		return {
			value: '我',
			relvalue: '',
			click: '',
			deletedown: true,
			deleteup: false,
			acup: false,
			acdown: true,
			inputvalue: ''
		}
	},
	methods: {
		setBtn (status) {
			for (let j = 1; j < 11; j++) {
				document.querySelector('#clickel' + j).className = 'chooseitem ' + status
			}
		},
		getInput (add, del, cle, el) {
			let inc = add || 0
			let dec = del || 0
			let cl = cle || 0
			if (inc === 1 && el) {
				valarr.push(el)
			}
			if (dec === 1) {
				if (valarr.length > 1) {
					valarr.pop()
				}
				else {
					valarr = valarr.slice(0)
				}
			}
			if (cl === 1) {
				valarr = ['我']
			}
			// this.value = valarr.join('的')
		},
		cut () { // 删除上一次输入
			this.relvalue = ''
			this.getInput(0, 1, 0)
			this.inputvalue = valarr.join('的')
			obj.text = this.inputvalue
			let rel = window.relationship(obj)
			document.querySelector('.input').className = 'input'
			if (valarr.length <= 1) {
				this.inputvalue = ''
				this.relvalue = ''
				this.value = '我'
				document.querySelector('.input').className = 'input inputrel'
			}
			else if (rel.length > 1) {
				this.value = rel.reverse().join('/')
				// document.querySelector('.input').className = 'input inputrel'
				this.setBtn('')
			}
			else if (rel.length === 1) {
				this.value = rel[0]
				// document.querySelector('.input').className = 'input inputrel'
				this.setBtn('')
			}
			else if (this.getSameSex()) {
				this.value = '暂不支持同性婚姻称呼查询，怎么称呼你决定'
			}
			else {
				this.value = '再玩就坏了'
			}
		},
		clear () { // 清除所有
			this.getInput(0, 0, 1)
			valarr = ['我']
			this.relvalue = ''
			this.inputvalue = ''
			this.value = '我'
			document.querySelector('.input').className = 'input inputrel'
			this.setBtn('')
		},
		findName (name) {
			if (valarr.indexOf(name) > -1) {
				return true
			}
			return false
		},
		getSameSex () {
			let mailarr = ['丈夫', '爸爸', '哥哥', '弟弟', '儿子']
			let femailarr = ['妻子', '妈妈', '姐姐', '妹妹', '女儿']
			let pos
			for (let i = 0; i < mailarr.length; i++) {
				if (this.findName(mailarr[i])) {
					pos = valarr.indexOf(mailarr[i])
					if (valarr[pos + 1] === '丈夫') {
						return true
					}
				}
			}
			for (let i = 0; i < femailarr.length; i++) {
				if (this.findName('妻子') && this.findName(femailarr[i])) {
					pos = valarr.indexOf(femailarr[i])
					if (valarr[pos + 1] === '妻子') {
						return true
					}
				}
			}
			return false
		},
		getRel () { // 获得结果
			// console.log(window.relationship({
			// 	text: '我的爸爸的哥哥的儿子',
			// 	sex: 0,
			// 	type: 'default',
			// 	reverse: true
			// }))
			n = 1
			this.inputvalue = ''
			let value1 = valarr.join('的')
			let rel
			this.relvalue = valarr.join('的')
			obj.text = value1
			obj.reverse = false
			rel = window.relationship(obj)
			document.querySelector('.input').className = 'input inputrel'
			if (valarr.length <= 1) {
				this.inputvalue = ''
				this.relvalue = ''
				this.value = '我'
			}
			else if (this.getSameSex()) {
				this.value = '暂不支持同性婚姻称呼查询，怎么称呼你决定'
				// document.querySelector('.input').className = 'input'
			}
			else if (valarr.length >= 10) {
				document.querySelector('.hc').className = 'hc disbtn'
				this.value = '再玩就坏了'
			}
			else if (this.value === '再玩就坏了') {
				this.value = '再玩就坏了'
			}
			else if (rel.length > 1) {
				this.value = rel.reverse().join('/')
			}
			else if (rel.length === 1) {
				this.value = rel[0]
				// document.querySelector('.input').className = 'input inputrel'
			}
			else {
				this.value = '再玩就坏了'
			}
		},
		hc () {
			// console.log(window.relationship({
			// 	text: '我的老公的妈妈的妈妈的哥哥的儿子',
			// 	sex: 0,
			// 	type: 'default',
			// 	reverse: true
			// }))
			let rel
			let value1 = valarr.join('的')
			if (n === 0) {
				console.log(0)
			}
			else if (valarr.length <= 1) {
				this.inputvalue = ''
				this.relvalue = ''
				this.value = '我'
			}
			else if (this.getSameSex()) {
				document.querySelector('.hc').className = 'hc disbtn'
			}
			// else if (valarr.length >= 10) {
			// 	document.querySelector('.hc').className = 'hc disbtn'
			// }
			else if (this.value.indexOf('再玩就坏了') > -1) {
				document.querySelector('.hc').className = 'hc disbtn'
			}
			else {
				this.inputvalue = ''
				this.relvalue = 'TA称呼我'
				let rel1
				obj.text = value1
				obj.reverse = true
				// if (valarr[1] === '丈夫') {
				// 	obj.sex = 0
				// 	obj.text = value1
				// 	obj.reverse = true
				// 	rel = window.relationship(obj)
				// 	rel1 = window.relationship({
				// 		text: value1,
				// 		sex: 1,
				// 		type: 'default',
				// 		reverse: true
				// 	})
				// }
				// else if (valarr[1] === '妻子') {
				// 	obj.sex = 1
				// 	obj.text = value1
				// 	obj.reverse = true
				// 	rel = window.relationship(obj)
				// 	rel1 = window.relationship({
				// 		text: value1,
				// 		sex: 0,
				// 		type: 'default',
				// 		reverse: true
				// 	})
				// }
				// else {
				// obj.sex = -1
				// obj.text = value1
				// obj.reverse = true
				// console.log(obj)
				rel = window.relationship(obj)
				rel1 = window.relationship({
					text: value1,
					sex: 0,
					type: 'default',
					reverse: true
				})
				// }
				// console.log(rel)
				if (rel.length <= 2 && (rel.indexOf('老婆') < 0) && (rel.indexOf('老公') < 0) && (rel.indexOf('自己') < 0) && rel1.length > 0) {
					rel.push(rel1[0])
					rel.push(rel1[1])
				}
				let getval = rel.join('/')
				// console.log(obj.sex)
				// console.log(rel1, 'rel1')
				if (getval[getval.length - 1] === '/') {
					getval = getval.slice(0, getval.length - 1)
				}
				if (getval === '') {
					getval = '关系有点远，就叫美女或者帅哥吧'
				}
				this.value = getval
				n = 0
				document.querySelector('.hc').className = 'hc'
				obj.sex = -1
				// console.log(rel)
			}
		}
	}
}
</script>

<style lang="scss">
@import url('../static/reset.css');
* {
	padding: 0;
	margin: 0;
}
#app {
  font-family: -apple-system, "SF Pro SC", "HanHei SC", "SF Pro Text", "Myriad Set Pro", "SF Pro Icons", "Apple Legacy Chevron", "PingFang SC", "Helvetica Neue", "Helvetica", "Arial", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  padding-top: 15px;
  background: url('./assets/BG@2x.jpg') no-repeat center;
  width: 100vw;
  min-height: 100vh;
  background-size: cover;
  user-select: none;
  .result {
	  position: relative;
	  width: calc(100vw - 30px);
	  height: calc((100vw - 30px) * (195 / 345));
	  background-color: #fff;
	  border-radius: 4px;
	  padding: 15px;
  	  margin: 0 15px;
	  overflow: scroll;
	  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.1);
	  .inputvalue {
		  position: absolute;
		  bottom: 56px;
		  right: 15px;
		  left: 15px;
		  font-size: 30px;
		  text-align: right;
		  &.small {
			  font-size: 22px;
		  }
		  @media screen and (max-width: 355px) {
			bottom: 60px;
			font-size: 24px;
		}
	  }
	  .input, .rel {
		  text-align: right;
		  @media screen and (max-width: 355px) {
			font-size: 18px;
		}
	  }
	  .input {
		  position: absolute;
		  bottom: 7px;
		  right: 15px;
		  left: 15px;
		  color: #777;
		  font-size: 17px;
		  @media screen and (max-width: 355px) {
			font-size: 16px;
		}
		  &.inputrel {
			  font-size: 30px;
			  @media screen and (max-width: 355px) {
				font-size: 20px;
			}
		  }
	  }
	  .rel {
		  color: #999;
		  height: calc(100% - 74px);
		  overflow: hidden;
		  font-size: 20px;
		  @media screen and (max-width: 355px) {
			font-size: 14px;
		}
	  }
  }
  .userinput {
	  position: relative;
	  display: flex;
	  flex-wrap: wrap;
	  margin: 15px 15px 0;
	  padding: 0;
	  font-size: 0;
	  background-color: antiquewhite;
	  @media screen and (device-height: 480px) {
		margin: 5px 15px 0;
	  }
	  .btn {
		  display: flex;
		  justify-content: space-between;
		  font-size: 0;
		  padding: 0;
		  margin-top: 2px;
	  }
	  .chooseitem {
		//   display: inline-block;
		  margin: 0;
		  width: calc(((100vw - 30px) / 4) - 1.5px);
		  height: calc((((100vw - 30px) / 4) - 1.5px) / (42.5 / 45));
		  text-align: center;
		  line-height: calc((((100vw - 30px) / 4) - 1.5px) / (42.5 / 45));
		  color: #777;
		  background-color: #fff;
		  border-radius: 4px;
		//   border-right: 2px solid antiquewhite;
		//   border-bottom: 2px solid antiquewhite;
		  font-size: 20px;
		  &.clickstatus {
			  color: #fff;
			  background-color: rgb(255, 140, 57);
		  }
		  &.disable {
			  color: #999;
		  }
		  .delete {
			  width: 26px;
			  height: 16px;
		  }
		  .ac {
			  width: 27px;
			  height: 16px;
		  }
	  }
	  .chooseitem:nth-child(2),
	  .chooseitem:nth-child(3),
	  .chooseitem:nth-child(4),
	  .chooseitem:nth-child(6),
	  .chooseitem:nth-child(7),
	  .chooseitem:nth-child(8),
	  .chooseitem:nth-child(10),
	  .chooseitem:nth-child(11),
	  .chooseitem:nth-child(12) {
		  margin-left: 2px;
	  }
	  .chooseitem:nth-child(5),
	  .chooseitem:nth-child(6),
	  .chooseitem:nth-child(7),
	  .chooseitem:nth-child(8),
	  .chooseitem:nth-child(9),
	  .chooseitem:nth-child(10),
	  .chooseitem:nth-child(11),
	  .chooseitem:nth-child(12) {
		  margin-top: 2px;
	  }

	  .hc, .equal {
		  width: -webkit-calc(((100vw - 30px) / 2 - 1px));
		  height: -webkit-calc((((100vw - 30px) / 2 - 1px)) * (45 / 86));
		  border-radius: 4px;
		  text-align: center;
		  @media screen and (device-height: 480px) {
			height: -webkit-calc(((100vw - 30px) / 2) * (35 / 86))
		  }
	  }
	  .hc {
		  font-size: 20px;
		  color: #777;
		  text-align: center;
		  line-height: -webkit-calc((((100vw - 30px) / 2 - 1px)) * (45 / 86));
		//   border-right: 2px solid antiquewhite;
		  background-color: #fff;
		  &.clickstatus {
			  color: #fff;
			  background-color: #FF8C39;
		  }
		  &.disbtn {
			  color: #999;
		  }
		  @media screen and (device-height: 480px) {
			line-height: calc(((100vw - 30px) / 2) * (35 / 86))
		  }
	  }
	  .equal {
		background: url('./assets/equal-icon@2x.png') no-repeat center;
		background-size: 21px 12px;
		background-color: #FF8C39;
		margin-left: 2px;
		img {
			width: 21px;
			height: 12px;
		}
	  }
  }
}
</style>
