<template>
   <div>
    <h1>Chat Room</h1>
    <div v-if="!isLoggedIn">
      <!-- Form đăng nhập -->
      <h2>Đăng nhập</h2>
      <input v-model="loginEmail" placeholder="Email" />
      <input v-model="loginPassword" type="password" placeholder="Mật khẩu" />
      <button @click="login">Đăng nhập</button>
    </div>

    <div v-else>
      <div>
        <input v-model="nickname" placeholder="Nhập nickname của bạn..." />
      </div>
      <input v-model="message" @keyup.enter="sendMessage" placeholder="Nhập tin nhắn..." />
      <ul>
        <li v-for="(msg, index) in messages" :key="index">{{ msg }}</li>
      </ul>
      <button @click="logout">Đăng xuất</button>
    </div>

    <!-- Form đăng ký -->
    <h2>Đăng ký</h2>
    <input v-model="registerEmail" placeholder="Email" />
    <input v-model="registerPassword" type="password" placeholder="Mật khẩu" />
    <input v-model="registerNickname" placeholder="Nickname">
    <button @click="register">Đăng ký</button>
  </div>
</template>

<script>
import { io } from 'socket.io-client';
import { auth, db } from '@/plugins/firebase'; // Import auth từ firebase
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut  } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

export default {
  data() {
    return {
      socket: null,
      message: '',
      messages: [],
      registerEmail: '',
      registerPassword: '',
      registerNickname:'',
      loginEmail: '',
      loginPassword: '',
      nickname:'',
      isLoggedIn: false, //Trạng thái hoạt động
    };
  },
  mounted() {
    this.socket = io('http://localhost:3001'); // Kết nối tới server

    this.socket.on('message', (msg) => {
      this.messages.push(msg); // Nhận tin nhắn và thêm vào danh sách
    });
  },
  methods: {
    async register() {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, this.registerEmail, this.registerPassword);
        const user = userCredential.user;

        // Lưu nickname vào Firestore
        await setDoc(doc(db, "users", user.uid), {
          nickname: this.registerNickname
        });

        alert('Đăng ký thành công!');
      } catch (error) {
        console.error("Lỗi đăng ký:", error);
        alert('Đăng ký thất bại: ' + error.message);
      }
    },
    async login() {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, this.loginEmail, this.loginPassword);
        this.isLoggedIn = true; // Cập nhật trạng thái đăng nhập
        alert('Đăng nhập thành công!');

        // Lấy nickname từ Firestore
        const user = userCredential.user;
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          this.nickname = userDoc.data().nickname; // Lưu nickname vào biến
        }
      } catch (error) {
        console.error("Lỗi đăng nhập:", error);
        alert('Đăng nhập thất bại: ' + error.message);
      }
    },
    async logout() {
      try {
        await signOut(auth);
        this.isLoggedIn = false; // Cập nhật trạng thái đăng xuất
        this.nickname = ''; // Xóa nickname khi đăng xuất
        alert('Đăng xuất thành công!');
      } catch (error) {
        console.error("Lỗi đăng xuất:", error);
        alert('Đăng xuất thất bại: ' + error.message);
      }
    },
    sendMessage() {
      if (this.message && this.nickname) {
        // Gửi tin nhắn kèm theo nickname
        const msg = `${this.nickname}: ${this.message}`;
        this.socket.emit('message', msg);
        this.message = ''; // Xóa input
      } else {
        alert('Vui lòng nhập tin nhắn và nickname!');
      }
    }
  },
};

</script>

<style scoped>
/* Thêm style nếu cần */
</style>
