# Simple Node.js Application on AWS EC2

## Overview
A simple Node.js web application built with Express.js and hosted on an Ubuntu AWS EC2 instance.

## Technologies
- AWS EC2
- Ubuntu Linux
- Node.js
- Express.js
- Git Bash / SSH

## Steps

### 1. Connect to EC2
```bash
ssh -i "your-key.pem" ubuntu@<EC2-Public-IP>
```

### 2. Install Node.js and npm
```bash
sudo apt update
sudo apt install nodejs npm -y
```

### 3. Create Project
```bash
mkdir nodeapp
cd nodeapp
npm init -y
npm install express
```

### 4. Create `app.js`
```bash
vim app.js
```





### 5. Run Application
```bash
node app.js
```

### 6. Access Website
Allow **TCP port 3000** in the EC2 Security Group and open:

```text
http://<EC2-Public-IP>:3000
```

## Result
Successfully deployed and accessed a Node.js + Express.js application on AWS EC2.
