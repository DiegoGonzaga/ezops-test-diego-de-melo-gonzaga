git pull
docker stop ezops-test1
docker rm ezops-test1
docker build . -t=ezops-test
docker run -d -p  3000:3000 --name=ezops-test1 ezops-test 
