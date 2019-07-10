# Backend API server
This is an API server to be used with any app, written in express.js and using MariaDB as the database. It allows users to Create/Delete worker data, allows work orders to be created, fetched, and assigned to different workers. 

## Pre-req for API server
1. Make sure mariaDB is installed on the system
2. Please see `utils/db.js` to change server connection credentials
3. Please create the database you are going to use
4. See `utils/sqlUtils.js` for the mySQL statements to initialize the database

## How to run
1. run `npm i` to install dependencies
2. run `node sample_be` in the console

## Demo server
### Add a worker
POST : https://aws.koumakan.work/sample_be/api/workers

Format:
```
{
	"name": "Jacky LI",
	"company_name" : "Koumakan.work",
	"email": "jacky.li@koumakan.work"
}
```
### Delete a worker 
DELETE : https://aws.koumakan.work/sample_be/api/workers/:workerId

### Add an order
POST : https://aws.koumakan.work/sample_be/api/orders/add

Format: 
```
{
	"title":"yeet",
	"description" : "some order",
	"deadline" : "2019-07-11 16:46:06" // FORMAT IS IMPORTANT
}
```

### Get all orders 

GET : https://aws.koumakan.work/sample_be/api/orders/all

### Assign a worker to an order 

PUT : https://aws.koumakan.work/sample_be/api/orders/assign/:orderId/:workerId
