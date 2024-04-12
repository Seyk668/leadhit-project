<script lang="ts">
import axios from 'axios';
import { defineComponent } from 'vue';

export default defineComponent({
	data() {
		return {
			inputValue: '' as string,
			error: false,
		};
	},
	watch: {
		inputValue() {
			if (this.inputValue.length > 0) {
				this.error = false;
			}
		},
	},
	methods: {
		limitInput() {
			if (this.inputValue.length > 24) {
				this.inputValue = this.inputValue.slice(0, 24);
			}
		},
		async auth() {
			const headers: Record<string, string> = {
				'Api-Key': '5f8475902b0be670555f1bb3:eEZn8u05G3bzRpdL7RiHCvrYAYo',
			};
			headers['Leadhit-Site-Id'] = '5f8475902b0be670555f1bb3';
			// headers['Leadhit-Site-Id'] = this.inputValue;
			if (this.inputValue.length && this.inputValue.length !== 24) {
				this.error = true;
				this.inputValue = '';
				return;
			}

			try {
				const response = await axios.get(
					'https://track-api.leadhit.io/client/test_auth',
					{ headers }
				);
				if (response.data.message === 'ok') {
					localStorage.setItem('leadhit-site-id', '5f8475902b0be670555f1bb3');
					this.$router.push({ name: 'analytics' });
				}
			} catch (error) {
				console.error('Failed: ', error);
			}
		},
	},
});
</script>

<template>
	<div class="auth">
		<div class="container">
			<h1 class="title">LeadHit</h1>
			<input
				v-model="inputValue"
				type="text"
				placeholder="Введите id сайта"
				@input="limitInput"
			/>
			<div v-if="error">id сайта должен содержать 24 символа</div>
			<button @click="auth" class="btn">Войти</button>
		</div>
	</div>
</template>

<style scoped>
.auth {
	width: 100%;
	height: 100dvh;
	display: flex;
	align-items: center;
	justify-content: center;
}
.container {
	width: 300px;
	padding: 40px;
	background-color: #2c3e50;
	display: flex;
	flex-direction: column;
	align-items: center;
	border-radius: 12px;
}
.title {
	font-family: Helvetica, sans-serif;
	color: #fff;
	margin-bottom: 20px;
}
input {
	padding: 8px 20px;
	border-radius: 10px;
	border: none;
	font-size: 14px;
	margin-bottom: 20px;
}
input::placeholder {
	color: #2c3e50;
	font-size: 14px;
	font-style: italic;
}
.btn {
	padding: 10px;
	border-radius: 10px;
	border: none;
	cursor: pointer;
	background-color: #d3d3d3;
	font-size: 14px;
	font-weight: 600;
	transition: all 0.4s ease-in-out;
}
.btn:hover {
	background-color: #a9a9a9;
}
</style>
