# create a temp directory for buildinoang
mkdir package

# install dependencies into the package directory
pip3 install -r requirements.txt -t ./package

# copy your actual code into the package directory
cp -r handler.py src ./package/

# zip everything from inside the package directory
cd package
zip -r ../python-searching.zip .

# clean up
cd ..
rm -rf package