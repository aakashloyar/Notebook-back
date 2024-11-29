//now we are practicing aws
//so first create a instance
//now go to security in instance
//there are inbound and outbound rules
//-> inbound is which ip can access your website
//-> outbound is whcih ip your website can access

//there is one default ssh port-> by which you are talking to your website



//-> to connect
ssh -i notebook-aws-kp.pem ubuntu@ec2-13-51-178-88.eu-north-1.compute.amazonaws.com


//->
//it will not work as in aws the permission are very restrictive 
//it means who can read write with your project
ls -ltr notebook-aws-kp.pem
to see who have which permission


chmod 600 ./notebook-aws-kp.pem
//this command remove read permission for some of the users

//now run this command
ssh -i notebook-aws-kp.pem ubuntu@ec2-13-51-178-88.eu-north-1.compute.amazonaws.com
