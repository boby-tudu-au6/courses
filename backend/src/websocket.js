import User from '../models/userModel'
import Course from '../models/courseSchema'
import Faculty from '../models/facultySchema'
import Mine from '../models/MineSchema'
const server = require('./index')
import jwt from 'jsonwebtoken'
import cloudinary from '../fileUpload/cloudinary/cloudinary'
import bufferToString from '../fileUpload/bufferToString/bufferToString'



// websocket functions
const io = require('socket.io')(server);

io.on('connection', socket => {
	console.log(`made socket connection at ${socket.id}`)

	socket.on('uregister',async ({name,email,pass})=>{
		try{
			console.log({name,email,pass})
			await User.create({name,email,pass})
			socket.emit('uregister',{status:"ok",msg:"register success"})
		}catch(err){
			return socket.emit("uregister",{status:"failed",msg:err.message})
		}
	})

	// login method
	socket.on("ulogin",async ({email,pass})=>{
		try{
			const user = await User.findOne({email,pass})
			if(user!==null){
				var token = jwt.sign({ user }, 'secret');
				return socket.emit('ulogin',{status:"ok",token})
			}else{
				return socket.emit('ulogin',{status:"failed",msg:"invalid credentials"})
			}
		}catch(err){
			console.log(err.message)
			socket.emit('ulogin',{status:'failed',message:err.message})
		}
	})

	socket.on('getprofile',async ({token})=>{
		try{
			const {user} = jwt.verify(token,'secret')
			const data = await User.findOne({_id:user._id})
			return socket.emit('getprofile',{status:"ok",data})
		}catch(err){
			console.log(err.message)
			socket.emit('getprofile',{state:"failed",msg:err.message})
		}
	})

	socket.on('profileupdate',async ({data,token})=>{
		try{
			console.log({...data})
			const {user} = jwt.verify(token,'secret')
			await User.updateOne({_id:user._id},{...data})
			socket.emit('profileupdate',{status:'ok',msg:"update success"})
		}catch(err){
			console.log(err.message)
			socket.emit('profileupdate',{status:"failed",msg:err.message})
		}
	})

//   checklogin
	socket.on("checkulogin",async ({token})=>{
		try{
			let decoded = jwt.verify(token, 'secret')
			if(decoded.user!==undefined){
				const user = await User.findOne({_id:decoded.user._id})
				return socket.emit('checklogin',{status:'ok',...user})
			}
			return socket.emit('checklogin',{status:'failed',msg:"invalid token"})
		}catch(err){
			return socket.emit('checklogin',{status:'failed',msg:err.message})
		}
	})

	socket.on('fregister',async ({name,email,pass})=>{
		try{
			console.log({name,email,pass})
			await Faculty.create({name,email,pass})
			socket.emit('fregister',{status:"ok",msg:"register success"})
		}catch(err){
			return socket.emit("fregister",{status:"failed",msg:err.message})
		}
	})

	socket.on("flogin",async ({email,pass})=>{
		try{
			const user = await Faculty.findOne({email,pass})
			if(user!==null){
				var token = jwt.sign({ user }, 'secret');
				return socket.emit('flogin',{status:"ok",token})
			}else{
				return socket.emit('flogin',{status:"failed",msg:"invalid credentials"})
			}
		}catch(err){
			console.log(err.message)
			socket.emit('flogin',{status:'failed',message:err.message})
		}
	})

	socket.on('createcourse',async ({data,token})=>{
		try{
			const {user} = jwt.verify(token,'secret')
			await Course.create({owner:user._id,...data})
			return socket.emit('createcourse',{status:"ok",msg:"created successfully"})
		}catch(err){
			return socket.emit('createcourse',{status:"failed",msg:err.message})
		}
	})

	socket.on('getfmycourse',async ({token})=>{
		try{
			const {user} = jwt.verify(token,'secret')
			const courses = await Course.find({owner:user._id})
			return socket.emit('getfmycourse',{status:'ok',courses})
		}catch(err){
			return socket.emit('getfmycourse',{status:"failed",msg:err.message})
		}
	})

	socket.on('getallcourse',async data=>{
		try{
			const courses = await Course.find()
			return socket.emit('getallcourse',{status:"ok",courses})
		}catch(err){
			return socket.emit('getallcourse',{status:'failed',msg:err.message})
		}
	})

	socket.on('buycourse',async ({_id,token})=>{
		try{
			const {user} = jwt.verify(token,'secret')
			const data = await Mine.findOne({userid:user._id,courseid:_id})
			if(data===null)await Mine.create({courseid:_id,userid:user._id})
			return socket.emit('buycourse',{status:'ok',msg:"buy success"})
		}catch(err){
			return socket.emit('buycourse',{status:"failed",msg:err.message})
		}
	})

	socket.on('getmine',async ({token})=>{
		try{
			const { user } = jwt.verify(token,'secret')
			const courses = await Mine.find({userid:user._id}).populate('courseid')
			return socket.emit('getmine',{status:'ok',courses})
		}catch(err){
			return socket.emit('getmine',{status:"failed",msg:err.message})
		}
	})

	socket.on('updateprofilepic',async ({token,file})=>{
		try{
			const {user} = jwt.verify(token,'secret')
			const imageContent = bufferToString(file.name, file.file);
			const { secure_url } = await cloudinary.uploader.upload(imageContent);
			console.log(secure_url)
			await User.updateOne({_id:user._id},{profilePic:secure_url})
			return socket.emit('updateprofilepic',{status:'ok',msg:"update success"})
		}catch(err){
			console.log(err)
			return socket.emit('updateprofilepic',{status:"failed",msg:err.message})
		}
		
	})

});

export default io