[
{
"name": "web",
"image": "${REPOSITORY_URL}/price-dashboard_web:latest",
"essential": false,
"cpu": 128,
"memory": 1024,
"portMappings": [
{
"containerPort": 8080,
"hostPort": 8080,
"protocol": "tcp"
}
],
"environmentFiles":[
{
"value":"arn:aws:s3:::${S3_BUCKET_NAME}/web/.env",
"type": "s3"
}
],
"environment": [
{
"name": "NODE_ENV",
"value": "production"
},
{
"name": "API_HOST_PRICES",
"value": "http://localhost"
},
{
"name": "API_HOST_PROMOTIONS",
"value": "http://localhost"
},
{
"name": "API_HOST_UPGRADERULES",
"value": "http://localhost"
},
{
"name": "API_PORT_PRICES",
"value": "5000"
},
{
"name": "API_PORT_PROMOTIONS",
"value": "5001"
},
{
"name": "API_PORT_UPGRADERULES",
"value": "5002"
}
]
},
{
"name": "user",
"image": "${REPOSITORY_URL}/price-dashboard_user:latest",
"essential": false,
"cpu": 128,
"memory": 1024,
"portMappings": [
{
"containerPort": 4999,
"hostPort": 4999,
"protocol": "tcp"
}
],
"environmentFiles":[
{
"value":"arn:aws:s3:::${S3_BUCKET_NAME}/user/.env",
"type": "s3"
}
],
"environment": [
{
"name": "NODE_ENV",
"value": "production"
}
]
},
{
"name": "prices",
"image": "${REPOSITORY_URL}/price-dashboard_prices:latest",
"essential": false,
"cpu": 128,
"memory": 1024,
"portMappings": [
{
"containerPort": 5000,
"hostPort": 5000,
"protocol": "tcp"
}
],
"environmentFiles":[
{
"value":"arn:aws:s3:::${S3_BUCKET_NAME}/prices/.env",
"type": "s3"
}
],
"environment": [
{
"name": "NODE_ENV",
"value": "production"
},{
"name": "REDIS_HOST_PROD",
"value": "${REDIS_HOST}"
},{
"name": "AUTH_HOST_PROD",
"value": "localhost"
}
]
},
{
"name": "promotions",
"image": "${REPOSITORY_URL}/price-dashboard_promotions:latest",
"essential": false,
"cpu": 128,
"memory": 1024,
"portMappings": [
{
"containerPort": 5001,
"hostPort": 5001,
"protocol": "tcp"
}
],
"environmentFiles":[
{
"value":"arn:aws:s3:::${S3_BUCKET_NAME}/promotions/.env",
"type": "s3"
}
],
"environment": [
{
"name": "NODE_ENV",
"value": "production"
},{
"name": "REDIS_HOST_PROD",
"value": "${REDIS_HOST}"
},{
"name": "AUTH_HOST_PROD",
"value": "localhost"
}
]
},
{
"name": "upgrade-rules",
"image": "${REPOSITORY_URL}/price-dashboard_upgrade-rules:latest",
"essential": false,
"cpu": 128,
"memory": 1024,
"portMappings": [
{
"containerPort": 5002,
"hostPort": 5002,
"protocol": "tcp"
}
],
"environmentFiles":[
{
"value":"arn:aws:s3:::${S3_BUCKET_NAME}/upgrade-rules/.env",
"type": "s3"
}
],
"environment": [
{
"name": "NODE_ENV",
"value": "production"
},{
"name": "REDIS_HOST_PROD",
"value": "${REDIS_HOST}"
},{
"name": "AUTH_HOST_PROD",
"value": "localhost"
}
]
},
{
"name": "nginx-stage",
"image": "${REPOSITORY_URL}/price-dashboard_nginx:latest",
"essential": true,
"cpu": 128,
"memory": 1024,
"portMappings": [
{
"hostPort": 80,
"containerPort": 80
}
]
}
]