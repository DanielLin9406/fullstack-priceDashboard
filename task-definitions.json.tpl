[
{
"name": "web",
"image": "${REPOSITORY_URL}/price-dashboard_web:latest",
"hostname": "web",
"essential": false,
"memory": 128
},
{
"name": "user",
"image": "${REPOSITORY_URL}/price-dashboard_user:latest",
"hostname": "user",
"essential": false,
"memory": 128
},
{
"name": "prices",
"image": "${REPOSITORY_URL}/price-dashboard_prices:latest",
"hostname": "prices",
"essential": false,
"memory": 128
},
{
"name": "promotions",
"image": "${REPOSITORY_URL}/price-dashboard_promotions:latest",
"hostname": "promotions",
"essential": false,
"memory": 128
},
{
"name": "upgrade-rules",
"image": "${REPOSITORY_URL}/price-dashboard_upgrade-rules:latest",
"hostname": "upgrade-rules",
"essential": false,
"memory": 128
},
{
"name": "nginx-stage",
"image": "${REPOSITORY_URL}/price-dashboard_nginx:latest",
"essential": true,
"portMappings": [
{
"hostPort": 80,
"containerPort": 80
}
],
"links": ["web", "user", "prices", "promotions", "upgrade-rules"],
"memory": 128
}
]