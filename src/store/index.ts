import { defineStore } from 'pinia';

export const useMiningStore = defineStore('mining', {
	state: () => {
		const city:string|null = ''||window.sessionStorage.getItem('curCity')
		const area:string|null = ''||window.sessionStorage.getItem('curArea')
		const province:string|null = ''||window.sessionStorage.getItem('curProvince')
		return {
			city,
			area,
			province
		};
	},
	// getters: {},
	actions: {
		updateprovince(val:string){
			this.province = val
			window.sessionStorage.setItem('curProvince',val)
		},
		updatecity(val:string){			
			this.city = val
			window.sessionStorage.setItem('curCity',val)
		},
		updatearea(val:string){			
			this.area = val
			window.sessionStorage.setItem('curArea',val)
		},
	}
});

