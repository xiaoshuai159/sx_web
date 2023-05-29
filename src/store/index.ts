import { defineStore } from 'pinia';

export const useMiningStore = defineStore('mining', {
	state: () => {
		const city:string = ''
		const area:string = ''
		return {
			city,
			area
		};
	},
	// getters: {},
	// actions: {
	// 	updatecity(val:string){
	// 		console.log(val);
			
	// 		this.city = val
	// 	}
	// }
});

