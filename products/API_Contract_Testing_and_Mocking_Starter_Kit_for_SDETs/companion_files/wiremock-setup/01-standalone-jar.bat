@echo off
REM WireMock Setup — Script 01: Standalone JAR (Windows)
REM What: Starts WireMock mock server via standalone JAR at http://localhost:8080
REM Why: For SDETs without Docker — direct Java run, no container.
REM Where: companion_files\wiremock-setup\ — run from this folder
REM How: 01-standalone-jar.bat  (double-click or run in PowerShell/cmd)
REM Expected: "WireMock started on port 8080"
REM What if: Java not found → winget install EclipseAdoptium.Temurin.17.JDK

setlocal
set WIREMOCK_VERSION=3.13.2
set WIREMOCK_JAR=wiremock-standalone-%WIREMOCK_VERSION%.jar
set WIREMOCK_URL=https://repo1.maven.org/maven2/org/wiremock/wiremock-standalone/%WIREMOCK_VERSION%/%WIREMOCK_JAR%
if "%PORT%"=="" set PORT=8080

echo [WireMock] Standalone JAR setup — version %WIREMOCK_VERSION%

java -version >nul 2>&1
if errorlevel 1 (
  echo [ERROR] Java not found. Install Eclipse Temurin 17:
  echo   winget install EclipseAdoptium.Temurin.17.JDK
  echo   Download: https://adoptium.net/temurin/releases/
  echo   Verify: java -version  (need 11+)
  exit /b 1
)
echo [OK] Java found

if not exist "%WIREMOCK_JAR%" (
  echo [INFO] Downloading %WIREMOCK_JAR%...
  echo   URL: %WIREMOCK_URL%
  powershell -Command "Invoke-WebRequest -Uri '%WIREMOCK_URL%' -OutFile '%WIREMOCK_JAR%'"
  if errorlevel 1 (
    echo [ERROR] Download failed. Get it manually: %WIREMOCK_URL%
    exit /b 1
  )
  echo [OK] Downloaded %WIREMOCK_JAR%
) else (
  echo [OK] Found %WIREMOCK_JAR%
)

if not exist "wiremock\mappings" mkdir wiremock\mappings
if not exist "wiremock\__files" mkdir wiremock\__files
if exist "03-mappings\mappings\get-user.json" (
  echo [INFO] Copying example mappings...
  copy /Y "03-mappings\mappings\*.json" "wiremock\mappings\" >nul 2>&1
  copy /Y "03-mappings\__files\*.*" "wiremock\__files\" >nul 2>&1
)

echo [INFO] Starting WireMock on port %PORT%...
echo   Flags: --global-response-templating --enable-stub-cors --verbose
echo   Root:  .\wiremock
echo   Admin: http://localhost:%PORT%/__admin/mappings
echo   Stop:  Ctrl+C
echo.

java -jar "%WIREMOCK_JAR%" --port %PORT% --global-response-templating --enable-stub-cors --root-dir ./wiremock --verbose
