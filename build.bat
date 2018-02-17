cd ./source
gutenberg build
rmdir /q /s ..\public 
xcopy /E .\public ..\public
rmdir /q /s .\public
cd ..