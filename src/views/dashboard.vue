<template>
	<div>
		<div style="margin-bottom:10px;padding: 5px;" >
			<div style="display: flex; justify-content: space-between;">
				<div>
					时间：<el-date-picker
						v-model="value1"
						type="datetimerange"
						range-separator="To"
						start-placeholder="Start date"
						end-placeholder="End date"
						
						/>
				</div>
				<div>
					<el-button type="primary" >查询</el-button>
					<el-button type="primary" >重置</el-button>
				</div>
			</div>
		</div>	
	<el-row :gutter="10">
		<el-col :span="4">
			<el-card shadow="hover" :body-style="{ padding: '0px' }">
				<div class="grid-content grid-con-1">
					<el-icon class="grid-con-icon"><Aim /></el-icon>
					<div class="grid-cont-right">
						<div class="grid-num">10267</div>
						<div>数据库密码爆破</div>
					</div>
				</div>
			</el-card>
		</el-col>
		<el-col :span="4">
			<el-card shadow="hover" :body-style="{ padding: '0px' }">
				<div class="grid-content grid-con-2">
					<el-icon class="grid-con-icon"><svg t="1676435735844" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="10885" width="200" height="200"><path d="M264 801.25H68.41v-674.9h541.07v148.39a16.7 16.7 0 0 0 33.4 0V109.66A16.7 16.7 0 0 0 626.18 93H51.71A16.7 16.7 0 0 0 35 109.66V818a16.7 16.7 0 0 0 16.69 16.69H264a16.7 16.7 0 0 0 0-33.39zM984.09 292.49a16.69 16.69 0 0 0-23.61 0l-52.27 52.28c-1.37-62.16-25-191.2-197.24-191.2a16.7 16.7 0 0 0 0 33.4c131.72 0 162.25 84.26 163.85 157.66l-52.14-52.14a16.69 16.69 0 1 0-23.61 23.61l80.71 80.71a16.67 16.67 0 0 0 23.61 0l80.7-80.71a16.69 16.69 0 0 0 0-23.61z" fill="#ffffff" p-id="10886"></path><path d="M583.51 328h-1.07c-166 0.29-301 135.45-301 301.54C281.42 795.77 416.7 931 583 931s301.51-135.23 301.51-301.5c0-166.09-134.98-301.25-301-301.5z m215.16 142.38H717c-19-46.49-44.76-78.92-68.19-100.86a268.93 268.93 0 0 1 149.86 100.86z m21.08 284.85h-91.14c9.1-31 15.19-67.11 16.48-109h105.49a266.08 266.08 0 0 1-30.83 109z m-504.4-109h105.5c1.29 41.92 7.38 78 16.48 109h-91.15a266.24 266.24 0 0 1-30.83-109.03z m30.82-142.42h91.16c-9.1 31-15.19 67.11-16.48 109h-105.5a266.18 266.18 0 0 1 30.82-109.03z m253.5-33.4v-97.28c22 15 55.65 44.72 80.37 97.25z m93.67 33.4c10 30.18 16.9 66.22 18.34 109h-112v-109zM566.27 372.85v97.53h-80.78c24.72-53.05 58.56-82.67 80.78-97.53z m0 130.93v109h-112c1.41-42.85 8.2-78.87 18.07-109z m-112 142.42h112v109H472.6c-10-30.2-16.9-66.2-18.34-109z m112 142.42v97.25c-22-15-55.65-44.72-80.37-97.25z m33.4 97.53v-97.53h80.79c-24.74 53.07-58.58 82.68-80.79 97.53z m0-130.92v-109h112c-1.42 42.85-8.21 78.88-18.08 109zM745.09 612.8c-1.29-41.91-7.38-78-16.48-109h91.15a266.18 266.18 0 0 1 30.82 109z m-227.9-243.28C493.76 391.46 468 423.89 449 470.38h-81.74a268.89 268.89 0 0 1 149.93-100.86z m-149.92 419.1H449c19 46.49 44.76 78.91 68.19 100.85a268.91 268.91 0 0 1-149.92-100.85z m281.49 100.85c23.43-21.94 49.17-54.36 68.19-100.85h81.71a268.85 268.85 0 0 1-149.9 100.85zM540.34 224.32a16.7 16.7 0 0 0-16.7-16.7H154.25a16.7 16.7 0 0 0 0 33.39h369.39a16.7 16.7 0 0 0 16.7-16.69zM361.74 342.25a8.35 8.35 0 0 0-8.35-8.35H154.25a8.35 8.35 0 1 0 0 16.69h199.14a8.34 8.34 0 0 0 8.35-8.34zM304.61 405.37a8.35 8.35 0 0 0-8.35-8.35h-142a8.35 8.35 0 1 0 0 16.7h142a8.35 8.35 0 0 0 8.35-8.35zM258 468.48a8.35 8.35 0 0 0-8.35-8.35h-95.4a8.35 8.35 0 1 0 0 16.7h95.38a8.35 8.35 0 0 0 8.37-8.35zM226.31 523.26h-72.06a8.35 8.35 0 1 0 0 16.69h72.06a8.35 8.35 0 1 0 0-16.69zM226.31 586.37h-72.06a8.35 8.35 0 1 0 0 16.69h72.06a8.35 8.35 0 1 0 0-16.69zM226.31 649.49h-72.06a8.35 8.35 0 1 0 0 16.7h72.06a8.35 8.35 0 0 0 0-16.7zM226.31 712.6h-72.06a8.35 8.35 0 0 0 0 16.7h72.06a8.35 8.35 0 1 0 0-16.7z" fill="#ffffff" p-id="10887"></path></svg></el-icon>
					<div class="grid-cont-right">
						<div class="grid-num">5892</div>
						<div>数据库勒索攻击</div>
					</div>
				</div>
			</el-card>
		</el-col>
		
		<el-col :span="4">
			<el-card shadow="hover" :body-style="{ padding: '0px' }">
				<div class="grid-content grid-con-3">
					<el-icon class="grid-con-icon"><svg t="1676435471647" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9689" width="200" height="200"><path d="M466.752 164.16a32.128 32.128 0 0 1 27.648-15.808l39.808 0.128a32 32 0 0 1 27.712 16.128l76.032 133.12L711.04 256 610.752 80.448a32 32 0 0 0-27.648-16.128L445.44 64a32.128 32.128 0 0 0-27.712 15.808L310.72 262.336 384 305.152l82.752-140.992zM958.464 381.248l-89.344-56.64-4.736-105.984-211.456 230.144zM158.208 217.216l-4.672 106.752-89.984 56.96 307.584 68.544zM427.008 960l83.904-43.776L595.264 960l-84.352-267.52zM843.904 491.776l-73.536 42.432 81.344 141.76a32 32 0 0 1 0 31.872l-19.84 34.496a32.064 32.064 0 0 1-27.776 16.064h-153.344v84.16h202.112a32 32 0 0 0 27.712-16.064l68.608-119.36a31.872 31.872 0 0 0 0-31.872l-105.28-183.488zM189.056 742.912l-28.992-51.008 90.496-156.288-73.536-42.432-105.344 182.784a32 32 0 0 0 0 31.936l68.544 119.296a32.064 32.064 0 0 0 27.776 16.064h204.928v-84.16H216.832a31.872 31.872 0 0 1-27.776-16.192z" fill="" p-id="9690"></path><path d="M510.08 430.144m-81.472 0a81.472 81.472 0 1 0 162.944 0 81.472 81.472 0 1 0-162.944 0Z" fill="" p-id="9691"></path><path d="M348.608 670.848h326.592c-2.624-88.128-74.496-158.912-163.264-158.912s-160.64 70.784-163.328 158.912z" fill="" p-id="9692"></path></svg></el-icon>
					<div class="grid-cont-right">
						<div class="grid-num">4890</div>
						<div>数据库挖矿攻击</div>
					</div>
				</div>
			</el-card>
		</el-col>
		<el-col :span="4">
			<el-card shadow="hover" :body-style="{ padding: '0px' }">
				<div class="grid-content grid-con-4">
					<el-icon class="grid-con-icon"><svg t="1676435839630" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="11236" width="200" height="200"><path d="M533.2 928.4c-217.7 0-394.8-177.1-394.8-394.8l0.1-8c0.7-36.9 6.6-73.3 17.3-108.2 5.1-16.7 22.8-26 39.5-20.9 16.7 5.1 26 22.8 20.9 39.5-9 29.3-13.9 59.9-14.6 90.9l-0.1 6.8c0 182.9 148.8 331.7 331.7 331.7s331.7-148.8 331.7-331.7S716 201.9 533.2 201.9h-5.4c-26.5 0.4-52.9 4-78.4 10.6-16.9 4.4-34.1-5.7-38.5-22.6-4.4-16.9 5.7-34.1 22.6-38.5 30.4-7.9 61.8-12.2 93.4-12.7l6.4-0.1c217.7 0 394.8 177.1 394.8 394.8s-177.2 395-394.9 395z" p-id="11237" fill="#ffffff"></path><path d="M533.2 767.7C404 767.7 299 662.7 299 533.6c0-2.9 0.1-5.7 0.1-8.5 0.8-23.3 5.1-46.3 12.7-68.2 5.7-16.5 23.7-25.2 40.2-19.5 16.5 5.7 25.2 23.7 19.5 40.2-5.5 16-8.6 32.7-9.3 49.7-0.1 2.1-0.1 4.2-0.1 6.3 0 94.3 76.7 171 171 171s171-76.7 171-171-76.7-171-171-171l-5 0.1c-12.6 0.4-25.1 2.1-37.3 5.2-16.9 4.3-34.1-5.9-38.4-22.8-4.3-16.9 5.9-34.1 22.8-38.4 16.6-4.2 33.8-6.6 51.1-7.1 2.3-0.1 4.5-0.1 6.8-0.1 129.1 0 234.2 105 234.2 234.2s-105 234-234.1 234z" p-id="11238" fill="#ffffff"></path><path d="M533.2 533.6m-55.3 0a55.3 55.3 0 1 0 110.6 0 55.3 55.3 0 1 0-110.6 0Z" p-id="11239" fill="#ffffff"></path><path d="M533.5 533.9c-12.3 12.3-32.4 12.3-44.7 0l-268-268c-12.3-12.3-12.3-32.4 0-44.7 12.3-12.3 32.4-12.3 44.7 0l268 268c12.3 12.3 12.3 32.4 0 44.7z" p-id="11240" fill="#ffffff"></path><path d="M304.4 304.8l-84.9 15.6L98 198.9l85-15.5zM304.2 304.6l15.6-84.9L198.3 98.2l-15.5 85" p-id="11241" fill="#ffffff"></path></svg></el-icon>
					<div class="grid-cont-right">
						<div class="grid-num">2315</div>
						<div>数据库拖库攻击</div>
					</div>
				</div>
			</el-card>
		</el-col>
		<el-col :span="4">
			<el-card shadow="hover" :body-style="{ padding: '0px' }">
				<div class="grid-content grid-con-5">
					<el-icon class="grid-con-icon"><svg t="1676435895410" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="12371" width="200" height="200"><path d="M168.23 482a16.7 16.7 0 0 0-16.7 16.7v79.88a16.7 16.7 0 0 0 33.4 0v-79.87a16.7 16.7 0 0 0-16.7-16.71z" fill="#ffffff" p-id="12372"></path><path d="M982.8 586a16.7 16.7 0 0 0-13.23-6.51h-70.45v-93.2a16.7 16.7 0 0 0-16.7-16.7H674.79l0.28-62.54a16.7 16.7 0 0 0-16.69-16.78H358.8A16.7 16.7 0 0 0 342.1 407v314.65h-88.9v-513.9a16.69 16.69 0 0 0-6.65-13.34l-38.91-29.31H484V320a16.7 16.7 0 0 0 33.39 0V148.4a16.7 16.7 0 0 0-16.69-16.7H163.31l-59-44.42h457.46V320a16.7 16.7 0 0 0 33.4 0V70.58a16.7 16.7 0 0 0-16.7-16.7H54.25c-0.45 0-0.9 0-1.34 0.07h-0.26c-0.48 0.05-1 0.13-1.44 0.22l-0.41 0.09-1 0.27-0.43 0.13q-0.66 0.21-1.32 0.48l-0.29 0.13c-0.24 0.11-0.49 0.21-0.72 0.33l-0.32 0.18-0.38 0.2c-0.37 0.21-0.73 0.43-1.09 0.66l-0.13 0.09c-0.42 0.28-0.83 0.59-1.21 0.9l-0.14 0.12q-0.51 0.44-1 0.9l-0.17 0.16a17.79 17.79 0 0 0-1.88 2.28l-0.2 0.3c-0.21 0.32-0.41 0.66-0.6 1l-0.17 0.29c-0.22 0.41-0.41 0.82-0.6 1.24-0.06 0.15-0.11 0.3-0.17 0.44-0.13 0.31-0.24 0.62-0.34 0.94-0.06 0.16-0.11 0.32-0.16 0.48-0.13 0.44-0.25 0.88-0.35 1.34 0 0.11 0 0.22-0.06 0.34-0.07 0.38-0.13 0.77-0.17 1.15v0.44c0 0.5-0.08 1-0.08 1.51v745.69a16.7 16.7 0 0 0 6.66 13.34l181.98 137.17a16.69 16.69 0 0 0 26.74-13.34V833h88.9v93.67c0 0.49 0.12 1 0.2 1.44 0 0.1 0 0.21 0.05 0.32a16.27 16.27 0 0 0 0.46 1.73c0 0.15 0.1 0.28 0.15 0.43 0.15 0.42 0.3 0.83 0.48 1.23 0.08 0.2 0.18 0.38 0.27 0.57q0.25 0.52 0.54 1l0.35 0.58q0.31 0.49 0.66 1a3.88 3.88 0 0 0 0.23 0.33c0.05 0.07 0.1 0.12 0.16 0.19 0.25 0.32 0.53 0.63 0.81 0.94 0.12 0.13 0.25 0.28 0.38 0.41a15.83 15.83 0 0 0 1.36 1.16l0.33 0.25c0.36 0.28 0.73 0.55 1.1 0.8l0.53 0.32c0.34 0.2 0.68 0.4 1 0.58l0.57 0.27c0.35 0.17 0.72 0.32 1.09 0.46l0.57 0.21a12.27 12.27 0 0 0 1.18 0.35l0.56 0.15c0.43 0.09 0.87 0.16 1.31 0.22l0.49 0.08a15.82 15.82 0 0 0 1.84 0.11h524a16.69 16.69 0 0 0 16.14-12.44l86.79-328.82a16.67 16.67 0 0 0-2.9-14.54zM375.49 423.71H641.6l-0.28 62.54A16.7 16.7 0 0 0 658 503h207.7v76.5H445.58a16.71 16.71 0 0 0-16.14 12.5l-53.95 204.4zM219.81 919.94l-148.68-112V104.06l148.68 112z m33.39-120.39V755h88.9v44.51z m616.72 108.8H380.47l78-295.43h489.42z" fill="#ffffff" p-id="12373"></path><path d="M422.68 505.35h170.77a8.35 8.35 0 0 0 8.35-8.35v-40.07a8.35 8.35 0 0 0-8.35-8.35H422.68a8.35 8.35 0 0 0-8.35 8.35V497a8.35 8.35 0 0 0 8.35 8.35z m8.32-40.08h154.1v23.39H431zM848 738.27H482.82a8.35 8.35 0 0 0 0 16.7L848 755a8.35 8.35 0 1 0 0-16.69zM858.05 698.48H492.87a8.35 8.35 0 0 0 0 16.7h365.18a8.35 8.35 0 1 0 0-16.7zM837.92 778.05H472.74a8.35 8.35 0 0 0 0 16.7h365.18a8.35 8.35 0 0 0 0-16.7zM827.85 817.84l-365.17-0.05a8.35 8.35 0 0 0 0 16.7h365.17a8.35 8.35 0 1 0 0-16.69zM817.8 857.62H452.62a8.35 8.35 0 1 0 0 16.69l365.18 0.05a8.35 8.35 0 0 0 0-16.7z" fill="#ffffff" p-id="12374"></path></svg></el-icon>
					<div class="grid-cont-right">
						<div class="grid-num">1036</div>
						<div>数据库植入后门攻击</div>
					</div>
				</div>
			</el-card>
		</el-col>
		<el-col :span="4">
			<el-card shadow="hover" :body-style="{ padding: '0px' }">
				<div class="grid-content grid-con-6">
					<el-icon class="grid-con-icon"><svg t="1676435636209" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="10529" width="200" height="200"><path d="M664.7 393l74.3-74.9 23.6 23.5-74.3 74.9-23.6-23.5z" p-id="10530" fill="#ffffff"></path><path d="M783.1 363.8c-35.9 0-64.9-29.1-64.9-64.9s29.1-64.9 64.9-64.9 64.9 29.1 64.9 64.9-29.1 64.9-64.9 64.9z m0-96.6c-17.4 0-31.6 14.2-31.6 31.6 0 17.4 14.2 31.6 31.6 31.6 17.4 0 31.6-14.2 31.6-31.6 0.1-17.4-14.1-31.6-31.6-31.6zM228.2 712.5l105.4-105.1 23.5 23.6-105.4 105.1-23.5-23.6z" p-id="10531" fill="#ffffff"></path><path d="M207.3 819.6h-1c-35.9-0.6-64.5-30.1-64-65.9 0.6-35.5 29.5-64 64.9-64h1c35.9 0.6 64.5 30.1 63.9 65.9-0.5 35.4-29.4 64-64.8 64zM159 753.9l16.7 0.2c-0.2 17.4 13.8 31.9 31.2 32.1 17.4 0.2 31.9-13.8 32.1-31.2 0.2-17.4-13.8-31.9-31.2-32.1-17.4-0.2-31.9 13.8-32.1 31.2-0.1 0-16.7-0.2-16.7-0.2zM636.4 646.3l23.5-23.5 95.8 95.8-23.5 23.5-95.8-95.8z" p-id="10532" fill="#ffffff"></path><path d="M772.8 824.2c-16.4 0-32-6.1-44.1-17.3-12.8-11.8-20.1-27.9-20.8-45.2-0.7-17.3 5.4-33.9 17.2-46.6 24.3-26.3 65.5-27.9 91.8-3.6 26.3 24.3 27.9 65.5 3.6 91.8-11.8 12.8-27.9 20.1-45.2 20.8-0.8 0.1-1.7 0.1-2.5 0.1z m0.1-96.5c-8.5 0-17 3.4-23.2 10.1-11.9 12.8-11.1 32.9 1.7 44.7 6.2 5.8 14.2 8.8 22.8 8.4 8.4-0.3 16.3-3.9 22-10.1 5.8-6.2 8.8-14.3 8.4-22.8-0.3-8.4-3.9-16.2-10.1-22-6.3-5.6-13.9-8.3-21.6-8.3zM240.4 320l23.4-23.7 96.3 95.3-23.4 23.7-96.3-95.3z" p-id="10533" fill="#ffffff"></path><path d="M223.1 344.3c-15.7 0-31.4-5.7-43.8-17.1-12.8-11.8-20.2-27.8-21-45.1s5.3-34 17-46.7c24.2-26.4 65.4-28.2 91.8-4 26.4 24.2 28.2 65.4 4 91.8-12.9 14-30.4 21.1-48 21.1z m0-96.6c-8.5 0-17.1 3.4-23.3 10.2-5.7 6.2-8.7 14.3-8.3 22.8 0.3 8.4 4 16.2 10.2 22 12.9 11.8 33 10.9 44.7-1.9 11.8-12.9 10.9-33-1.9-44.7-6-5.6-13.7-8.4-21.4-8.4zM703.9 506.2l68.7-0.6 0.3 33.3-68.7 0.6-0.3-33.3z" p-id="10534" fill="#ffffff"></path><path d="M822 577.8c-0.9 0-1.7 0-2.6-0.1-15-0.7-28.9-7.1-39-18.2-20.9-22.9-19.3-58.5 3.6-79.4s58.5-19.3 79.4 3.6c20.9 22.9 19.3 58.5-3.6 79.4-10.4 9.5-23.7 14.7-37.8 14.7z m0-79c-5.6 0-11.1 2-15.4 6-9.3 8.5-10 23-1.4 32.3 4.1 4.6 9.8 7.1 15.9 7.4 6.1 0.2 12-1.9 16.4-6 9.3-8.5 10-23 1.4-32.3-4.6-5-10.8-7.4-16.9-7.4zM251.6 504.9l73.6-1.5 0.7 33.3-73.6 1.5-0.7-33.3z" p-id="10535" fill="#ffffff"></path><path d="M215.7 573.9c-1.6 0-3.1-0.1-4.7-0.2-15-1.2-28.5-8.2-38.3-19.6-20.1-23.6-17.2-59.2 6.4-79.1 23.6-20.1 59.2-17.2 79.1 6.4 20.1 23.6 17.2 59.2-6.4 79.1-10.1 8.8-22.9 13.4-36.1 13.4z m-15-73.6c-9.7 8.2-10.8 22.6-2.7 32.2 4 4.7 9.4 7.5 15.5 8 6.1 0.6 12-1.4 16.7-5.3 9.7-8.2 10.8-22.6 2.7-32.2-8.1-9.7-22.5-10.9-32.2-2.7zM496.1 667.5l33.3-0.4 1.2 110.9-33.3 0.4-1.2-110.9z" p-id="10536" fill="#ffffff"></path><path d="M514.3 867.9c-29.7 0-54.6-23.4-56.1-53.4-1.6-31 22.4-57.4 53.4-58.8 31-1.6 57.4 22.4 58.8 53.4 1.4 31-22.4 57.4-53.4 58.8h-2.7z m1.2-33.3l0.8 16.7-0.8-16.7c6.1-0.3 11.8-3 15.9-7.4 4.1-4.6 6.2-10.4 5.9-16.4-0.7-12.5-11.3-22.3-24-21.8-12.5 0.7-22.3 11.3-21.8 24 0.6 12.2 10.8 21.8 22.9 21.8 0.3-0.2 0.7-0.2 1.1-0.2zM497.2 298.1l33.3-0.5 1.7 110.9-33.2 0.5-1.8-110.9z" p-id="10537" fill="#ffffff"></path><path d="M513.4 320.6c-29.6 0-54.5-23.2-56.1-53.2-1.7-31 22.2-57.4 53.1-59.1 15-0.8 29.4 4.2 40.5 14.3 11.2 10 17.8 23.8 18.5 38.7 0.8 15-4.2 29.4-14.3 40.5-10 11.2-23.8 17.8-38.7 18.5-1 0.3-2 0.3-3 0.3z m0.1-79h-1.2c-12.5 0.7-22.3 11.4-21.6 24.1 0.7 12.5 11.4 22.3 24.1 21.6 6.1-0.3 11.7-3 15.8-7.5 4.1-4.6 6.1-10.4 5.8-16.5-0.3-6.1-3-11.7-7.5-15.8-4.4-3.9-9.7-5.9-15.4-5.9z" p-id="10538" fill="#ffffff"></path><path d="M712.7 645.9H313.9V377.8h398.6v268.1h0.2z m-365.5-33.3h332V411.1h-332v201.5z" fill="#ffffff" p-id="10539"></path><path d="M496.6 629.2h33.3v68.3h-33.3v-68.3z" fill="#ffffff" p-id="10540"></path><path d="M371.7 690.8H656v33.3H371.7v-33.3z" fill="#ffffff" p-id="10541"></path></svg></el-icon>
					<div class="grid-cont-right">
						<div class="grid-num">321</div>
						<div>其他</div>
					</div>
				</div>
			</el-card>
		</el-col>
	</el-row>
	<el-row :gutter="10">
		<el-col :span="12">
			<el-card shadow="hover" :body-style="{ padding: '0px',height:'280px' }">
				<span class="warningTop">预警信息TOP10</span>
				<el-table ref="tableRef" :data="tableData" style="width: 95%;margin: auto;">
					<el-table-column prop="eventID" label="事件id" width="70"/>
					<el-table-column prop="time" label="时间"/>
					<el-table-column prop="type" label="预警类型"  />
					<el-table-column prop="content" label="预警内容"  />
					<el-table-column prop="tag" label="优先级" width="100">
						<template #default="scope">
							<el-tag
							:type="scope.row.tag === '中' ? '' : 'danger'"
							>{{ scope.row.tag }}</el-tag
							>
						</template>					
					</el-table-column>
				</el-table>
			</el-card>
		</el-col>
		<el-col :span="12">
			<el-card shadow="hover" :body-style="{ padding: '0px',height:'280px' }">
				<schart ref="bar" class="schart" canvasId="bar" :options="options"></schart>
			</el-card>
		</el-col>
	</el-row>
	<el-row :gutter="10">
		<el-col :span="12">
			<el-card shadow="hover" :body-style="{ padding: '0px',height:'285px' }">
				<!-- <span class="normalText">被攻击数据库ip排行</span> -->
				<div id="myChart" :style="{ width: '92%', height: '277px'}"></div>
			</el-card>
		</el-col>
		<el-col :span="12">
			<el-card shadow="hover" :body-style="{ padding: '0px',height:'285px' }">
				<div id="myChart2" :style="{ width: '98%', height: '277px'}"></div>
			</el-card>
		</el-col>
	</el-row>
	</div>
</template>

<script setup lang="ts" name="dashboard">
import Schart from 'vue-schart';
import { onMounted, reactive,ref } from 'vue';
import imgurl from '../assets/img/img.jpg';
import { sample } from 'lodash';
import * as echarts from 'echarts'
const name = localStorage.getItem('ms_username');
const role: string = name === 'admin' ? '超级管理员' : '普通用户';
const value1 = ref<[Date,Date]>([
  new Date(2023, 1, 14, 10, 10),
  new Date(2023, 1, 15, 10, 10),
])
const tableData = [
  {
    eventID: '1645',
    time: '2022-02-14 12:10:00',
    type: '数据库勒索攻击',
	content:'......',
	tag:'高'
  },
  {
    eventID: '1648',
    time: '2022-02-14 12:15:00',
    type: '数据库密码爆破',
	content:'......',
	tag:'高'
  },
  {
    eventID: '1648',
    time: '2022-02-14 12:20:00',
    type: '数据库挖矿攻击',
	content:'......',
	tag:'中'
  },
]
const shortcuts = [
  {
    text: 'Last week',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
      return [start, end]
    },
  },
  {
    text: 'Last month',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
      return [start, end]
    },
  },
  {
    text: 'Last 3 months',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
      return [start, end]
    },
  },
]
const options = {
	type: 'pie',
	title: {
		text: '运营商占比'
	},
	legend: {
		position: 'left'
	},
	bgColor: '#fbfbfb',
	labels: ['政府', '公检法', '高校', '医院', '其他'],
	datasets: [
		{
			data: [334, 278, 190, 235, 90]
		}
	]
};
function initOption1(){
	type EChartsOption = echarts.EChartsOption;
	const myChart1 = echarts.init(document.getElementById('myChart'));
        let option:EChartsOption = {
			title:{
				text:'被攻击数据库ip排行',
				x:'2%',
				y:'2%',
				textStyle:{
					color:'#666666'
				}
			},
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          legend: {},
          grid: {
            top:'15%',
            left: '3%',
            right: '4%',
            bottom:'1%',
            containLabel: true
          },
          xAxis: {
            type: 'value',
            boundaryGap: [0, 0.01]
          },
          yAxis: {
            type: 'category',
            data: ['172.31.6.54','172.8.66.13','172.25.65.52','172.68.5.96','172.21.65.3','172.9.64.2','172.86.5.2','172.57.55.1','172.7.53.2','172.8.12.3']
          },
          series: [
            {              
              type: 'bar',
              data: [242,156,128,96,85,65,50,44,32,10].reverse()
            }
          ]
        }
        option && myChart1.setOption(option);
        myChart1.resize();
}
function initOption2(){
	type EChartsOption = echarts.EChartsOption;
	const myChart2 = echarts.init(document.getElementById('myChart2'));
	let option:EChartsOption = {
		title: {
			text: '事件趋势分析',
			x:'2%',
			y:'2%',
			textStyle:{
				color:'#666666'
			}
		},
		tooltip: {
			trigger: 'axis',
			axisPointer: {
			type: 'cross',
			label: {
				backgroundColor: '#6a7985'
			}
			}
		},
		legend: {
			data: ['密码爆破', '勒索攻击', '挖矿攻击', '拖库攻击', '后门植入攻击'],
			top:'13%'
		},
		toolbox: {
			feature: {
			saveAsImage: {}
			}
		},
		grid: {
			top:'30%',
			left: '3%',
			right: '4%',
			bottom: '3%',
			containLabel: true
		},
		xAxis: [
			{
			type: 'category',
			boundaryGap: false,
			data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
			}
		],
		yAxis: [
			{
			type: 'value'
			}
		],
		series: [
			{
			name: '密码爆破',
			type: 'line',
			stack: 'Total',
			areaStyle: {},
			emphasis: {
				focus: 'series'
			},
			data: [120, 132, 101, 134, 90, 230, 210]
			},
			{
			name: '勒索攻击',
			type: 'line',
			stack: 'Total',
			areaStyle: {},
			emphasis: {
				focus: 'series'
			},
			data: [220, 182, 191, 234, 290, 330, 310]
			},
			{
			name: '挖矿攻击',
			type: 'line',
			stack: 'Total',
			areaStyle: {},
			emphasis: {
				focus: 'series'
			},
			data: [150, 232, 201, 154, 190, 330, 410]
			},
			{
			name: '拖库攻击',
			type: 'line',
			stack: 'Total',
			areaStyle: {},
			emphasis: {
				focus: 'series'
			},
			data: [320, 332, 301, 334, 390, 330, 320]
			},
			{
			name: '后门植入攻击',
			type: 'line',
			stack: 'Total',
			label: {
				show: true,
				position: 'top'
			},
			areaStyle: {},
			emphasis: {
				focus: 'series'
			},
			data: [820, 932, 901, 934, 1290, 1330, 1320]
			}
		]
	}
	option && myChart2.setOption(option);
}
onMounted(()=>{
	initOption1()
	initOption2()
})
// onUnmounted(() => {
// 	myChart1.dispose;
//     });
</script>

<style scoped>
.el-row {
	margin-bottom: 10px;
}

.grid-content {
	display: flex;
	align-items: center;
	height: 80px;
}

.grid-cont-right {
	flex: 1;
	text-align: center;
	font-size: 14px;
	color: #999;
}

.grid-num {
	font-size: 26px;
	font-weight: bold;
}

.grid-con-icon {
	font-size: 50px;
	width: 80px;
	height: 80px;
	text-align: center;
	line-height: 100px;
	color: #fff;
}

.grid-con-1 .grid-con-icon {
	background: rgb(45, 140, 240);
}

.grid-con-1 .grid-num {
	color: rgb(45, 140, 240);
}

.grid-con-2 .grid-con-icon {
	background: rgb(238, 38, 2);
}

.grid-con-2 .grid-num {
	color: rgb(238, 38, 2);
}

.grid-con-3 .grid-con-icon {
	background: rgb(71, 175, 235);
}

.grid-con-3 .grid-num {
	color: rgb(71, 175, 235);
}

.grid-con-4 .grid-con-icon {
	background: rgb(235, 111, 89);
}

.grid-con-4 .grid-num {
	color: rgb(235, 111, 89);
}
.grid-con-5 .grid-con-icon {
	background: rgb(242, 172, 67);
}

.grid-con-5 .grid-num {
	color: rgb(242, 172, 67);
}
.grid-con-6 .grid-con-icon {
	background: rgb(118, 123, 124);
}

.grid-con-6 .grid-num {
	color: rgb(118, 123, 124);
}
.user-info {
	display: flex;
	align-items: center;
	padding-bottom: 20px;
	border-bottom: 2px solid #ccc;
	margin-bottom: 20px;
}

.user-info-cont {
	padding-left: 50px;
	flex: 1;
	font-size: 14px;
	color: #999;
}

.user-info-cont div:first-child {
	font-size: 30px;
	color: #222;
}

.user-info-list {
	font-size: 14px;
	color: #999;
	line-height: 25px;
}

.user-info-list span {
	margin-left: 70px;
}

.mgb20 {
	margin-bottom: 20px;
}

.todo-item {
	font-size: 14px;
}

.todo-item-del {
	text-decoration: line-through;
	color: #999;
}

.schart {
	width: 100%;
	height: 300px;
}
.warningTop{
	display: inline-block;
	color: red;
	font-size: 22px;
	margin: 8px 15px;
}
.operator{
	display: inline-block;
	font-size: 18px;
	margin: 8px 15px;
}
.normalText{
	display: inline-block;
	font-size: 18px;
	margin-top: 3px;
	margin-left: 15px;
}
</style>
