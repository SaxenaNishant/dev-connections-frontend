# Deployment

    - AWS signup
    - Launch EC2 instance
    - chmod 400<secret>.pem
    - ssh -i "dev-connections-secrets.pem" ec2-user@ec2-13-61-146-203.eu-north-1.compute.amazonaws.com
    - Install node version 20.13.1
    - Git clone
    - Frontend
        - npm install -----> Dependencies installed
        - npm run build
        - sudo yum update
        - sudo yum install nginx
        - sudo systemctl start nginx
        - sudo systemctl enable nginx
        - Copy code from dist folder(build files) of frontend repo to /usr/share/nginx/html/
        - sudo scp -r dist/* /usr/share/nginx/html/
        - Enable port 80 of your instance
