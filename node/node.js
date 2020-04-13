
linux安装node：
	cd /usr/local
	wget https://nodejs.org/dist/v8.11.4/node-v8.11.4-linux-x64.tar.xz 
	tar -xvf node-*** node
	
	vim /etc/profile
	export PATH=$PATH:/usr/local/node/bin
	source /etc/profile
	或
	ln -s /usr/local/node/bin/node /usr/local/bin/node
	ln -s /usr/local/node/bin/npm /usr/local/bin/npm
	
安装脚手架：
	npm install -g @vue/cli
	cnpm i -g @vue/cli
	yarn global add @vue/cli
	
创建vue项目：
	vue create fremall

启动UI
	vue ui
	yarn serve