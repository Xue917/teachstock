@echo off
chcp 65001 >nul
echo ========================================================
echo   正在推送「台股智勝寶典」至 GitHub 遠端倉庫...
echo   遠端倉庫: https://github.com/Xue917/teachstock.git
echo   作者: XUE917 (mengxueho0917@gmail.com)
echo ========================================================
echo.
git push -u origin main
echo.
if %ERRORLEVEL% equ 0 (
    echo [成功] 程式碼已成功推送到 GitHub！
) else (
    echo [提示] 若需要登入，請依瀏覽器彈跳視窗完成 GitHub 授權即可。
)
pause
