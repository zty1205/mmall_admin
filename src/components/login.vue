<template>
<div>
    <Row id="container" type="flex">
         <Col span="8" offset="8" class="loginCol">
            <Form ref="formInfo" :model="formInfo" :rules="ruleInline">
                <FormItem prop="username">
                    <Input type="text" v-model="formInfo.username" placeholder="Username">
                        <Icon type="android-person" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <FormItem prop="password">
                    <Input type="password" v-model="formInfo.password" placeholder="Password">
                        <Icon type="android-lock" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="handleSubmit">SignIn</Button>
                    <Button type="ghost" @click="handleReset('formInfo')" style="margin-left: 8px">Reset</Button>
                </FormItem>
            </Form>
        </Col>
        <canvas id="canvas" class="canvas"></canvas>
    </Row>
</div>

</template>

<script>
export default {
  data () {
        return {
            formInfo: {
                username: '',
                password: ''
            },
            ruleInline: {
                user: [
                    { required: true, message: 'Please fill in the user name', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: 'Please fill in the password.', trigger: 'blur' },
                    { type: 'string', min: 5, message: 'The password length cannot be less than 5 bits', trigger: 'blur' }
                ]
			}
        }
    },
    methods: {
      handleSubmit() {

        const formInfo = {
          username: this.formInfo.username,
          password: this.formInfo.password
        }

			  this.$store.dispatch('SIGN_BY_USERNAME', formInfo).then((data) => {
				//接收到了 axios返回的数据

				// console.log('login.vue: data:'+data)
				// this.$router.push({path: '/home'})

				// console.log(data.status === 0)
				if(data.status === 0){
					this.$Message.success('登录成功')
					this.$router.push({path: '/home'})

				}else{
					this.$store.state.msg = '用户登录失败'
					this.$Message.error('用户登录失败,请重新登录')
				}

			}).catch(err => {
				this.$store.state.msg = '用户登录失败'
				this.$Message.error('用户登录失败,请重新登录')

			})

			// console.log(this.$store.state.msg) actions 是异步方法 这时候得不到

            // this.$refs[name].validate((valid) => {
            //     if (valid) {
            //         this.$Message.success('Success!');
            //     } else {
            //         this.$Message.error('Fail!');
            //     }
			// })

			// let url = 'http://localhost:8080/user/login.do?username='+this.formInfo.user+'&password='+this.formInfo.password
			// this.$http.get(url)
			// .then(response=>{
			// 	const res = response.data
			// 	console.log(res)
			// 	if(res){

			// 	}
			// })
			// .catch(error =>{
			// 	console.log(error)
			// })
        },
        handleReset (name) {
                this.$refs[name].resetFields();
            }
    },
    mounted() {
      var canvas = document.querySelector('canvas'),
      ctx = canvas.getContext('2d')
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      ctx.lineWidth = .3;
      ctx.strokeStyle = (new Color(150)).style;
      var mousePosition = {
        x:  canvas.width - 100,
        y:  canvas.height - 60
      };
      var dots = {
        nb: 250,
        distance: 100,
        d_radius: 150,
        array: []
      };
      function colorValue(min) {
        return Math.floor(Math.random() * 255 + min);
      }
      function createColorStyle(r,g,b) {
        return 'rgba(' + r + ',' + g + ',' + b + ', 0.8)';
      }
      function mixComponents(comp1, weight1, comp2, weight2) {
        return (comp1 * weight1 + comp2 * weight2) / (weight1 + weight2);
      }
      function averageColorStyles(dot1, dot2) {
        var color1 = dot1.color,
        color2 = dot2.color;
        var r = mixComponents(color1.r, dot1.radius, color2.r, dot2.radius),
        g = mixComponents(color1.g, dot1.radius, color2.g, dot2.radius),
        b = mixComponents(color1.b, dot1.radius, color2.b, dot2.radius);
        return createColorStyle(Math.floor(r), Math.floor(g), Math.floor(b));
      }
      function Color(min) {
        min = min || 0;
        this.r = colorValue(min);
        this.g = colorValue(min);
        this.b = colorValue(min);
        this.style = createColorStyle(this.r, this.g, this.b);
      }
      function Dot(){
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = -.5 + Math.random();
        this.vy = -.5 + Math.random();
        this.radius = Math.random() * 2;
        this.color = new Color();
      }
      Dot.prototype = {
        draw: function(){
          ctx.beginPath();
          ctx.fillStyle = this.color.style;
          ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
          ctx.fill();
        }
      };
      function createDots(){
        for(var i = 0; i < dots.nb; i++){
          dots.array.push(new Dot());
        }
      }
      function moveDots() {
        for(var i = 0; i < dots.nb; i++){
          var dot = dots.array[i];
          if(dot.y < 0 || dot.y > canvas.height){
            dot.vx = dot.vx;
            dot.vy = - dot.vy;
          }
          else if(dot.x < 0 || dot.x > canvas.width){
            dot.vx = - dot.vx;
            dot.vy = dot.vy;
          }
          dot.x += dot.vx;
          dot.y += dot.vy;
        }
      }
      function connectDots() {
        for(var i = 0; i < dots.nb; i++){
          for(var j = 0; j < dots.nb; j++){
            var i_dot = dots.array[i];
            var j_dot = dots.array[j];
            if((i_dot.x - j_dot.x) < dots.distance && (i_dot.y - j_dot.y) < dots.distance && (i_dot.x - j_dot.x) > - dots.distance && (i_dot.y - j_dot.y) > - dots.distance){
              if((i_dot.x - mousePosition.x) < dots.d_radius && (i_dot.y - mousePosition.y) < dots.d_radius && (i_dot.x - mousePosition.x) > - dots.d_radius && (i_dot.y - mousePosition.y) > - dots.d_radius){
                ctx.beginPath();
                ctx.strokeStyle = averageColorStyles(i_dot, j_dot);
                ctx.moveTo(i_dot.x, i_dot.y);
                ctx.lineTo(j_dot.x, j_dot.y);
                ctx.stroke();
                ctx.closePath();
              }
            }
          }
        }
      }
      function drawDots() {
        for(var i = 0; i < dots.nb; i++){
          var dot = dots.array[i];
          dot.draw();
        }
      }
      function animateDots() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        moveDots();
        connectDots();
        drawDots();
        requestAnimationFrame(animateDots);
      }

      //----------------------跟着鼠标动--------------------
      document.getElementById('container').addEventListener('mousemove', function(e){
        mousePosition.x = e.pageX;
        mousePosition.y = e.pageY;
      });
      document.getElementById('container').addEventListener('mouseleave', function(e){
        mousePosition.x = canvas.width / 2;
        mousePosition.y = canvas.height / 2;
      });


      //----------------------跟着鼠标动--------------------
      // createDots();
      // requestAnimationFrame(animateDots);
	},
}
</script>

<style scoped>

#container{
	position: relative;
    width: 100%;
	/* box-sizing: border-box; */
	overflow-x: hidden;
	background: rgba(7,17,27,0.95);
}
.canvas {
    position: fixed;
    z-index: 1;
}
.loginCol{
    width: 100%;
    height: 600px;
    display:flex;/*Flex布局*/
    display: -webkit-flex; /* Safari */
    align-items:center;/*指定垂直居中*/
    justify-content:center;
    z-index: 3;
}
</style>
