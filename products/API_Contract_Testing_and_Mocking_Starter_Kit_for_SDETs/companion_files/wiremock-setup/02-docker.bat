@echo off
REM WireMock Setup — Script 02: Docker (Windows, no Java needed)
REM What: Starts WireMock via Docker at http://localhost:8080
REM Why: No Java install, reproducible, one command.
REM Where: companion_files\wiremock-setup\ — run from this folder
REM How: 02-docker.bat  (double-click or run in PowerShell/cmd)
REM Expected: "WireMock started on port 8080"
REM What if: Docker not found → install Docker Desktop from https://www.docker.com/products/docker-desktop/

setlocal
set WIREMOCK_IMAGE=wiremock/wiremock:3.13.2
if "%PORT%"=="" set PORT=8080
set CONTAINER_NAME=wiremock-contract-mock

echo [WireMock] Docker setup — image %WIREMOCK_IMAGE%

docker --version >nul 2>&1
if errorlevel 1 (
  echo [ERROR] Docker not found. Install Docker Desktop:
  echo   Download: https://www.docker.com/products/docker-desktop/
  echo   Verify: docker --version
  exit /b 1
)
echo [OK] Docker found

if not exist "03-mappings\mappings\get-user.json" (
  echo [WARN] Example mappings not found at 03-mappings\mappings\ — WireMock will start empty.
)

REM Stop existing container if running
docker ps -q -f name="%CONTAINER_NAME%" | findstr . >nul 2>&1
if not errorlevel 1 (
  echo [INFO] Stopping existing container %CONTAINER_NAME%...
  docker stop %CONTAINER_NAME% >nul 2>&1
  docker rm %CONTAINER_NAME% >nul 2>&1
)

echo [INFO] Starting WireMock via Docker on port %PORT%...
echo   Image: %WIREMOCK_IMAGE%
echo   Flags: --global-response-templating --enable-stub-cors --verbose
echo   Mount: .\03-mappings -^> /home/wiremock
echo   Admin: http://localhost:%PORT%/__admin/mappings
echo   Stop:  docker stop %CONTAINER_NAME%
echo.

REM PowerShell needs ${PWD}, cmd needs %cd% — try both
docker run -it --rm -p %PORT%:8080 -v "%cd%\03-mappings:/home/wiremock" --name %CONTAINER_NAME% %WIREMOCK_IMAGE% --global-response-templating --enable-stub-cors --verbose
