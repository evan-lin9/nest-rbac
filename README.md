## 安装本地数据库
> tips: 首先你需要安装 docker, 如果不会可以去搜一下教程

```bash
docker pull postgres
```
确认安装成功
```bash
docker images
```
运行后得到以下内容
```bash
REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
postgres            latest              4ea2949e4cb8        10 days ago         314MB
```

启动一个 PostgreSQL 容器
```bash
docker run --name rbac-postgres  -e POSTGRES_PASSWORD=123456 -p 5432:5432 -d postgres
```
运行后得到以下内容
```bash
ffd2f2e8f64aefa2b2cdf78d74e66f4e55df792fc4e2658e961d0774ea276714
```

> 如果你需要持久化数据，则可以这样启动
```bash
docker volume create postgres-data
docker run -d --name rbac-postgres -p 5432:5432 -v postgres-data:/var/lib/postgresql/data -e "POSTGRES_PASSWORD=123456" postgres
```

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
