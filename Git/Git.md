# 信息配置

```
git config --global user.name "clin"
git config --global user.email "1962109568@qq.com"
```


# Git 命令

```
git init                          初始化 git

git log                           commit 日志

git status

git add demo.txt                  将 demo.txt 文件添加到暂存区

git commit -m "comment"           将 demo.txt 文件从缓存区提交到仓库

git reset HEAD demo.txt           将暂存区中的 demo.txt 文件恢复到最后一次 commit 的状态，本地不做修改

git checkout -- demo.txt   

git reset --hard ______            回滚到指定的时刻
```


# 远程仓库

### SSH KEY

```
ssh-keygen -t rsa -C "1962109568@qq.com"              创建 ssh key

ssh -T git@github.com                                 判断 ssh 是否设置成功
```

### 添加远程仓库

```
git remote add origin git@github.com:tylerdemo/demo4.git

git pull origin master --allow-unrelated-histories

git push -u origin master
```


### 拉取仓库代码

```
git clone git@github*************************
```


# 标签管理

```
git tag                           获取当前所有的标签

git tag v0.0.1                    创建 v0.0.1 标签

git tag -a v0.0.1 -m "comment"    创建 v0.0.1 标签并添加描述信息

git tag -d v0.0.1                 删除 v0.0.1 标签

git push origin v0.0.1            发布标签（将 v0.0.1 标签上传到仓库）
```


# 分支管理

```
git branch                        查看所有分支

git branch dev                    创建 dev 分支

git checkout master               切换到 master 分支

get merge dev                     把 dev 分支代码合并到 master 分支

get branch -d dev                 删除 dev 分支
```