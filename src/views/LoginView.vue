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
			<h1>LeadHit</h1>
			<input
				v-model="inputValue"
				type="text"
				placeholder="Введите id сайта"
				@input="limitInput"
			/>
			<div v-if="error">id сайта должен содержать 24 символа</div>
			<button @click="auth">Войти</button>
		</div>
	</div>
</template>
