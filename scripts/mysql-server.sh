sudo yum update -y
sudo yum install https://dev.mysql.com/get/mysql80-community-release-el7-5.noarch.rpm -y
sudo amazon-linux-extras install epel -y
sudo yum -y install mysql-community-server
sudo systemctl enable --now mysqld

# ALTER USER 'root'@'localhost' IDENTIFIED BY 'my_super_secret_password';
