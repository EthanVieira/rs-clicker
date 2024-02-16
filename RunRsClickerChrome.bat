@echo off
START /B python -m http.server

Set url=http://127.0.0.1:8000
Start chrome --incognito %url%